package com.test.java.dto;

import com.test.java.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

	private String username;
	private String password;
	private String role;
	private String name;
	private String email;
	
	//Entity > DTO
	public static UserDto fromEntity(User user) {
		if (user == null) return null;
		
		return new UserDto(
			user.getUsername(),
			user.getPassword(),
			user.getRole(),
			user.getName(),
			user.getEmail()
		);
	}
	
	//DTO > Entity
	public User toEntity() {
		return new User(
			this.username,
			this.password,
			this.role,
			this.name,
			this.email
		);
	}
}











