package com.web.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.hibernate.annotations.ColumnDefault;

import lombok.Data;

@Data
@Entity
@Table(name = "INQUERY_TB")
@TableGenerator(name = "SUPPORT_SEQ_GENERATOR",	// 테이블 이름  
				table = "ALL_SEQUENCE", 		// 시퀀스 생성
				pkColumnValue = "INQUERY_SEQ",	// 시퀀스 이름
				initialValue = 0,				// 시퀀스 시작 값
				allocationSize = 1)				// 시퀀스 증가 값
public class Inquery {
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "SUPPORT_SEQ_GENERATOR")
	@Column(name = "INQUERY_SEQ")
	private Long inquerySeq;
	
	@Column(name = "MEMBER_ID")
	private String inqueryWriter;
	 
	@Column(name = "INQUERY_TITLE")
	private String inqueryTitle;
	
	@Column(name = "INQUERY_CONTENT")
	private String inqueryContent;
	
	@Column(name = "INQUERY_ANSWER",insertable = false)
	private String inqueryAnswer;
	
	@Column(name = "INQUERY_SELECT") 
	private String inquerySelect; // 1. 1:1, 2. 상품관련
	
	// 추가나 수정 시 default 값 설정
	@Column(name = "INQUERY_CREATEDATE", insertable = false, columnDefinition = "date default sysdate")
	private Date inqueryCreateDate;
	
	@Column(name = "INQUERY_FILENAME")
	private String file; 
}
