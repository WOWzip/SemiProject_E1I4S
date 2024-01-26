package com.web.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

/*
-- 공지( 공지 (0) + 점검 (1) )
CREATE TABLE NOTICE(                  
 NOTICE_SEQ NUMBER(10) CONSTRAINT NOTICE_SEQ_PK PRIMARY KEY,              		--공지 글번호
 NOTICE_WRITER VARCHAR2(50) NOT NULL CONSTRAINT NOTICE_WRITER_FK FOREIGN KEY,	--작성자(관리자)
 NOTICE_TITLE VARCHAR2(50) NOT NULL,                              				--제목
 NOTICE_CONTENTS VARCHAR2(1000) NOT NULL,                         			    --내용
 NOTICE_DATE DATE SYSDATE NOT NULL,                          				    --작성일자(SYSDATE)
 NOTICE_CHOICE NUMBER(1) NOT NULL, 											    -- 공지 선택 ( 1:공지, 2: 점검 ) *****새로추가
 NOTICE_COMMENT VARCHAR2(20)                                    				--댓글
);
*/

@Data
@Entity
@Table(name = "NOTICE_TB")
public class Notice {

		@Id
		@GeneratedValue
		@Column(name = "NOTICE_SEQ")
		private Long noticeSeq; // 공지 글번호
		
		@Column(name = "NOTICE_WRITER", nullable = false, updatable = false)// 외래키(관리자ID)
		private String noticeWriter; // 작성자(관리자)
		
		@Column(name = "NOTICE_TITLE", nullable = false)
		private String noticeTitle; // 제목
		
		@Column(name = "NOTICE_CONTENTS", nullable = false)
		private String noticeContents; // 내용
		
		@Column(name = "NOTICE_IMAGENAME")
		private String noticeImageName; // 이미지
		
		@Column(name = "NOTICE_DATE", insertable = false, updatable = false, columnDefinition = "date default sysdate")
		private Date noticeDate; // 작성일자
		
		@Column(name = "NOTICE_CHOICE", nullable = false, columnDefinition = "number default 1" )
		private Long noticeChoice; // 공지 선택 ( 1:공지, 2:점검 ) -- 추가
		
		
}
