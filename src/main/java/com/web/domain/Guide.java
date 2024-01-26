package com.web.domain;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name="GUIDE_TB")
public class Guide {
	
	// 가이드 글 번호 - 기본키
	@Id
	@GeneratedValue
	@Column(name="GUIDE_SEQ")
	private Long guideNum; 
	
	// 외래키(관리자ID)
	@Column(name="GUIDE_WRITER", nullable = false, updatable = false) 
	private String guideWriter; // 작성자(관리자)
	
	// 제목
	@Column(name="GUIDE_TITLE", nullable = false)
	private  String guideTitle; 
	
	// 내용
	@Column(name="GUIDE_CONTENTS", nullable = false)
	private  String guideContents; 
	
	// 가이드 사진
	@Column(name="GUIDE_IMAGENAME")
	private String guideImageName;
	
	// 작성일자
	@Column(name="GUIDE_DATE", insertable = false, updatable = false, columnDefinition = "date default sysdate")
	private Date guideDate; 
	

}