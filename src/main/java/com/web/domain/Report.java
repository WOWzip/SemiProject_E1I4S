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
@Table(name = "REPORT_TB")
@TableGenerator(name = "SUPPORT_SEQ_GENERATOR",	// 테이블 이름 
				table = "ALL_SEQUENCE", 		// 시퀀스 생성
				pkColumnValue = "REPORT_SEQ",	// 시퀀스 이름
				initialValue = 0,				// 시퀀스 시작 값
				allocationSize = 1)				// 시퀀스 증가 값
public class Report {
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "SUPPORT_SEQ_GENERATOR")
	@Column(name = "REPORT_SEQ") 
	private Long reportSeq;
	
	@Column(name = "MEMBER_ID")
	private String reportWriter;
	
	@Column(name = "REPORT_TITLE")
	private String reportTitle;
	
	@Column(name = "REPORT_CONTENT")
	private String reportContent;
	
	@Column(name = "REPORT_ANSWER",insertable = false)
	private String reportAnswer;
	
	@Column(name = "REPORT_SELECT")  
	private String reportSelect; // 1욕설, 2 부정거래
	
	// 추가나 수정 시 default 값 설정
	@Column(name = "REPORT_CREATEDATE", insertable = false, columnDefinition = "date default sysdate")
	private Date reportCreateDate;
	
	@Column(name = "REPORT_FILENAME")
	private String file; 
}
