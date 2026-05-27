package com.test.java.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tblUser")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User {
	
	@Id
	@Column(length = 50)
	private String username;
	
	@Column(nullable = false, length = 100)
	private String password;
	
	@Column(nullable = false, length = 50)
	private String role;
	
	@Column(nullable = false, length = 50)
	private String name;
	
	@Column(nullable = false, length = 100)
	private String email;

}