package com.test.java.dto;

import java.time.LocalDateTime;

import com.test.java.entity.Board;
import com.test.java.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BoardDto {
	
	private Long seq;
	private String subject;
	private String content;
	private LocalDateTime regdate;
	private String username;
	
	public static BoardDto fromEntity(Board board) {
		if (board == null) return null;
		
		return new BoardDto(
			board.getSeq(),
			board.getSubject(),
			board.getContent(),
			board.getRegdate(),
			board.getUser().getUsername()
		);
	}
	
	public Board toEntity() {
		
		User user = new User(
			this.username,
			null,
			null,
			null,
			null
		);
		
		return new Board(
			this.seq,
			this.subject,
			this.content,
			this.regdate,
			user
		);
	}

}















