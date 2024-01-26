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
@Table(name="CHARACTER_GUIDE_TB")
public class CharacterGuide {
	
	@Id
	@GeneratedValue
	@Column(name="CHARACTER_GUIDE_NUM")
	private Long characterGuideNum; // 캐릭터 번호 -- 기본키
	
	@Column(name="CHARACTER_GUIDE_WRITER", nullable = false, updatable = false)
	private String characterGuideWriter; // 작성자(관리자) -- 외래키
	
	@Column(name="CHARACTER_GUIDE_IMAGENAME", nullable = false)
	private  String characterGuideImageName; // 캐릭터 사진
	
	@Column(name="CHARACTER_GUIDE_NAME", nullable = false)
	private  String characterGuideName; // 캐릭터 이름
	
	@Column(name="CHARACTER_GUIDE_CONTENTS", nullable = false)
	private String characterGuideContents; // 캐릭터 설명
	
	@Column(name="CHARACTER_GUIDE_DATE", insertable = false, updatable = false, columnDefinition = "date default sysdate")
	private Date characterGuideDate; // 작성일자
	

}
