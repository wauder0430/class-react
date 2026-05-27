package com.test.java.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tblBoard")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Board {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seqBoard")
	@SequenceGenerator(name = "seqBoard", sequenceName = "seqBoard", allocationSize = 1)	
	private Long seq;
	
	@Column(nullable = false, length = 500)
	private String subject;
	
	@Column(nullable = false, length = 4000)
	private String content;
	
	@CreationTimestamp
	@Column(nullable = false, updatable = false)
	private LocalDateTime regdate;
	
	
	//@나To상대방
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "username", nullable = false)
	//private String username; //DB 기준으로 FK > JPA에서는 사용 안함
	private User user; //FK 대신 부모 엔티티를 참조

}










