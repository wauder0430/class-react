package com.test.java;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.test.java.entity.User;
import com.test.java.repository.BoardRepository;
import com.test.java.repository.UserRepository;

@SpringBootTest
class DBTests {

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private BoardRepository boardRepo;
	
	@Autowired
	private BCryptPasswordEncoder encoder;

	@Test
	void test() {
		assertNotNull(userRepo);
		assertNotNull(boardRepo);
		
		System.out.println(userRepo.count());
		System.out.println(boardRepo.count());
	}
	
	@Test
	void register() {
		
		User u1 = new User("hong", encoder.encode("1111"), "ROLE_MEMBER", "홍길동", "hong@test.com");
		System.out.println(userRepo.save(u1));
		
		User u2 = new User("dog", encoder.encode("1111"), "ROLE_MEMBER", "강아지", "dog@test.com");
		System.out.println(userRepo.save(u2));
		
		User u3 = new User("cat", encoder.encode("1111"), "ROLE_ADMIN", "고양이", "cat@test.com");
		System.out.println(userRepo.save(u3));		
		
	}

	
}















