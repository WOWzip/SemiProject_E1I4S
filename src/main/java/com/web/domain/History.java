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

@ToString
@Getter 
@Setter
@Entity
@Table(name="HISTORY_TB")
public class History {

	@Id
	@GeneratedValue
	@Column(name="HISTORY_SEQ")
	private Long historyNumber;
	
	@Column(name="HISTORY_ID")
	private String userId;
	@Column(name="HISTORY_NICKNAME")
	private String userNickName;
	@Column(name="HISTORY_NAME")
	private String productName;
	@Column(name="HISTORY_QUANTITY")
	private int productQuantity;
	@Column(name="HISTORY_POINT")
	private int productPoint;
	@Column(name="HISTORY_DATE", insertable = false, updatable = false, columnDefinition = "date default sysdate")
	private Date purchaseDate;
	
}
