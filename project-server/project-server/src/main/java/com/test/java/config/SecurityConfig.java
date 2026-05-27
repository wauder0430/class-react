package com.test.java.config;

import java.io.PrintWriter;
import java.util.List;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Bean
	BCryptPasswordEncoder bCryptPasswordEncoder() {
		
		return new BCryptPasswordEncoder();
	}
	
	// 이전 방식
	// - 로그인 성공/실패 > redirect
	
	// 리액트 방식
	// - 서버와의 통신을 JSON으로만 한다.
	// - JSON 로그인 > AuthenticationManager.authenticate()
	@Bean
	AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {

		return config.getAuthenticationManager();
	}
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		
		// CSRF 비활성화 > 폼 로그인
		http.csrf(csrf -> csrf.disable());
		
		// CORS 활성화
		http.cors(cors -> {});
		
		// 스프링 시큐리티의 기본 >폼 로그인 방식
		// JSON 방식 로그인 > 폼 로그인 비활성화
		http.formLogin(form -> form.disable());
		
		// URL 허용
		http.authorizeHttpRequests(auth -> auth
				.requestMatchers("/", "/login", "/loginok").permitAll()
				// 정적 리소스 폴더 > 오픈 
				// - /css, /js, /image
				.requestMatchers(PathRequest.toStaticResources().atCommonLocations()).permitAll()
				.requestMatchers("/member").hasAnyRole("MEMBER", "ADMIN")
				.requestMatchers("/admin").hasRole("ADMIN")
				// 나중에 게시판 구현
				.requestMatchers("/board", "/board/list", "/board/view").permitAll()
				.requestMatchers("/board/add", "/board/del").hasAnyRole("MEMBER", "ADMIN")
				.anyRequest().authenticated()
				
		);
		
		http.logout(logout -> logout
				// React에서 /logout으로 요청하면 로그아웃 처리됨
				.logoutUrl("/logout")
				.logoutSuccessHandler((request, response, authentication) -> {
					response.setStatus(200);
					response.setContentType("application/json;charset=UTF-8");

					PrintWriter out = response.getWriter();
					out.print("{\"result\":\"logout\"}");
					out.flush();
				})
				.invalidateHttpSession(true)
				//세션 방식이면 JSON이어도 쿠키 필요
				.deleteCookies("JSESSIONID")
		);

		http.exceptionHandling(e -> e
				// 인증 실패 처리
				// 로그인하지 않은 사용자가 인증 필요한 URL에 접근하면 실행됨
				.authenticationEntryPoint((request, response, exception) -> {
					response.setStatus(401);
					response.setContentType("application/json;charset=UTF-8");

					PrintWriter out = response.getWriter();
					out.print("{\"error\":\"unauthorized\"}");
					out.flush();
				})
				// 권한 실패 처리
				// 로그인은 했지만 해당 URL에 필요한 Role이 없으면 실행됨
				.accessDeniedHandler((request, response, exception) -> {
					response.setStatus(403);
					response.setContentType("application/json;charset=UTF-8");

					PrintWriter out = response.getWriter();
					out.print("{\"error\":\"forbidden\"}");
					out.flush();
				})
		);
		
		
		
		return http.build();
	}
	
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();

		
		// 요청을 허용할 프론트엔드 Origin 지정
		// credentials를 사용할 때는 "*" 사용 불가 > 아무 사이트나 요청을 보내면 위험. 그래서 클라이언트를 지정
		config.setAllowedOrigins(List.of("http://localhost:5173"));
		
		config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		
		// 허용할 요청 Header 지정
		// Content-Type, Authorization 등 대부분 허용
		config.setAllowedHeaders(List.of("*"));
		
		// 쿠키, 세션, 인증 정보를 포함한 요청 허용
		// React fetch의 credentials: "include"
		// axios의 withCredentials: true 와 세트로 필요
		config.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);

		return source;
	}

}













