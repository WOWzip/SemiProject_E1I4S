package com.web.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/*
CREATE TABLE BOARD(
 BOARD_SEQ NUMBER(10) CONSTRAINT BOARD_SEQ_PK PRIMARY KEY,               --글번호
 BOARD_USER_ID VARCHAR2(20) NOT NULL,                              --작성자(사용자)
 BOARD_TITLE VARCHAR2(50) NOT NULL,                                 --제목
 BOARD_CONTENTS VARCHAR2(1000) NOT NULL,                           --내용
 BOARD_VIEWS NUMBER(10) DEFAULT 0 NOT NULL,                           --조회수
 BOARD_RECOMMEND NUMBER(10) DEFAULT 0 NOT NULL,                        --추천수
 BOARD_DATE DATE NOT NULL,                                 --작성날짜(SYSDATE)
 BOARD_CHOICE NUMBER(1) NOT NULL                                  --게시판선택
);

 */
@Getter
@Setter
@ToString
@Entity
@Table(name = "BOARD_TB")
public class Board {
	
	@Id
	@GeneratedValue
	@Column(name = "BOARD_SEQ")
	private Long boardSeq; // 글번호
	
	@Column(updatable = false, name = "BOARD_WRITER")
	private String boardUserId; // 작성자(사용자)
	
	@Column(name = "BOARD_TITLE")
	private String boardTitle; // 제목
	
	@Column(name = "BOARD_CONTENTS")
	private String boardContents; // 내용
	
	@Column(name = "BOARD_VIEWS", insertable = false, columnDefinition = "number default 0")
	private int boardViews; // 조회수
	
	@Column(name = "BOARD_RECOMMEND",insertable = false,columnDefinition = "number default 0")
	private int boardRecommend; // 추천수
	
	@Column(name = "BOARD_DATE", insertable = false, updatable = false, columnDefinition = "date default sysdate")
	private Date boardDate; // 작성날짜(SYSDATE)
	
	@Column(name = "BOARD_CHOICE")
	private Long boardChoice; // 게시판선택
	
	@Column(name = "REPORT_FILENAME")
	private String file; 
}