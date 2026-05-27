package com.test.java.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.test.java.entity.User;
import com.test.java.repository.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RestController
@RequiredArgsConstructor
public class MemberController {
	
	private final UserRepository userRepository;
	private final BCryptPasswordEncoder passwordEncoder;
	
	//1. 시작 페이지
	@GetMapping("/")
	public ResponseEntity<Map<String,Object>> index() {
		
		//리액트 구현 전
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("result", "ok");
		result.put("path", "/");
		result.put("message", "public index");
		
		//ResponseEntity
		//- JSON 응답 객체
		//- 기존 반환하는 데이터 + 상태 코드(Status Code: 200)
		return ResponseEntity.ok(result);
	}
	
	//2. 로그인
	@GetMapping("/login")
	public ResponseEntity<Map<String,Object>> login() {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("result", "ok");
		result.put("path", "/login");
		result.put("message", "login page");
		
		return ResponseEntity.ok(result);
	}
	
	//3. 로그인 처리
	@PostMapping("/loginok")
	public ResponseEntity<Map<String,Object>> loginok(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
		
		User user = userRepository.findById(loginRequest.getUsername()).orElse(null);
		
		if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
			
			Map<String, Object> error = new HashMap<String, Object>();
			error.put("error", "bad_credentials");
			error.put("message", "username or password is invalid");
			
			//401 Unauthorized .
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED) //HTTP Header
								 .body(error);                    //HTTP Body
		}
		
		
		//인증 사용자
		//- ROLE
		List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(user.getRole()));
		
		//인증 객체
		Authentication authentication = new UsernamePasswordAuthenticationToken(
			user.getUsername(),
			null,
			authorities
		);
		
		//인증 객체 > 스프링 시큐리티 환경에 의해 통제를 당한다. > 인식
		SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
		securityContext.setAuthentication(authentication);
		SecurityContextHolder.setContext(securityContext);
		
		
		//리액트가 다시 요청 > JSESSIONID > 인증된 사용자
		request.getSession(true).setAttribute(
			HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
			securityContext
		);
		
		
		
		//리액트에게 완료 메시지
		Map<String,Object> result = new HashMap<String,Object>();
		result.put("result", "login");
		result.put("username", user.getUsername());
		result.put("role", user.getRole());
		
		return ResponseEntity.ok(result);
	}
	
	//4. 회원 전용 페이지
	@GetMapping("/member")
	public ResponseEntity<Map<String,Object>> member(Authentication authentication) {
		
		//업무: 개인 정보 반환
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("result", "ok");
		result.put("path", "/member");
		result.put("username", authentication.getName());
		result.put("authorities", authentication.getAuthorities());
		
		User user = userRepository.findById(authentication.getName()).orElse(null);
		result.put("name", user.getName());
		result.put("email", user.getEmail());
		
		return ResponseEntity.ok(result);				
	}
	
	//5. 관리자 전용 페이지(구현 X)
	@GetMapping("/admin")
	public ResponseEntity<Map<String,Object>> admin(Authentication authentication) {
		
		//업무: 개인 정보 반환
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("result", "ok");
		result.put("path", "/admin");
		result.put("username", authentication.getName());
		result.put("authorities", authentication.getAuthorities());
		
		return ResponseEntity.ok(result);				
	}
	
	//6. 로그아웃
	@GetMapping("/logout")
	public ResponseEntity<Map<String,Object>> logout() {
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("result", "ok");
		result.put("path", "/logout");
		result.put("message", "logout page");
		
		return ResponseEntity.ok(result);
	}
	
	
	
	//내장 클래스
	//- loginok
	@Getter
	@Setter
	public static class LoginRequest {
		
		private String username;
		private String password;
		
	}

}










