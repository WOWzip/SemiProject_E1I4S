package com.web.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
/*
 이벤트
 CREATE TABLE EVENT(                  
 EVENT_SEQ NUMBER(10) CONSTRAINT EVENT_SEQ_PK PRIMARY KEY,                    -- 이벤트 글번호
 EVENT_WRITER VARCHAR2(50) NOT NULL CONSTRAINT EVENT_WRITER_FK FOREIGN KEY,   -- 작성자(관리자)
 EVENT_TITLE VARCHAR2(50) NOT NULL,                                           -- 제목
 EVENT_IMAGENAME VARCHAR2(100),                                               -- 이미지
 EVENT_IMAGEVIEWNAME VARCHAR2(100),                                           -- 상세 이미지
 EVENT_CONTENTS VARCHAR2(1000) NOT NULL,                                      -- 내용
 EVENT_DATE DATE SYSDATE NOT NULL,                                            -- 작성일자(SYSDATE)
 EVENT_STARTDATE DATE NOT NULL,					     						  -- 시작날짜
 EVENT_ENDDATE DATE NOT NULL,				       							  -- 종료날짜 
 EVENT_CHOICE VARCHAR2(1) NOT NULL, 				 						  -- 이벤트 선택 (0:진행중인 이벤트, 1:종료된 이벤트 ) 
 EVENT_COMMENT VARCHAR2(20)                           				          -- 댓글
);
*/

@Getter
@Setter
@ToString
@Entity
@Table(name="EVENT_TB")
public class Event {

	@Id
	@GeneratedValue
	@Column(name="EVENT_SEQ")
	private int eventSeq;
	

	// 작성자(관리자)
	@Column(name="EVENT_WRITER", nullable = false, updatable = false) 
	private String eventWriter; 
	
	// 제목
	@Column(name="EVENT_TITLE")
	private String eventTitle; 
	
	// 목록페이지에 보여지는 이미지(썸네일)
	@Column(name="EVENT_IMAGENAME")
	private String eventImageName; 
	
	// 상세 이미지
	@Column(name="EVENT_IMAGEVIEWNAME")
	private String eventImageViewName; 
	
	// 내용
	@Column(name="EVENT_CONTENTS")
	private String eventContents; 
	
	// 작성일자(SYSDATE)
	@Column(name="EVENT_DATE", insertable = false, updatable = false, columnDefinition = "date default sysdate")
	private Date eventDate; 
	
	// 시작날짜
	@Column(name="EVENT_STARTDATE", columnDefinition = "date default sysdate")
	private Date eventStartDate; 
	
	// 종료날짜
	@Column(name="EVENT_ENDDATE")
	private Date eventEndDate;
	
	// 이벤트 선택 (0:진행중인 이벤트, 1:종료된 이벤트 )
	@Column(name="EVENT_CHOICE", columnDefinition = "varchar(1) default '0'")
	private String eventChoice; 
	
	// 댓글 
	@Column(name="EVENT_COMMENT")
	private String eventComment;
	
}
