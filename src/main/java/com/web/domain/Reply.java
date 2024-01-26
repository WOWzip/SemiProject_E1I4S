package com.web.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "REPLY_TB")
public class Reply {
	
	@Id
	@GeneratedValue
	@Column(name = "REPLY_SEQ")
	private Long replySeq;
	
	@JoinColumn(name = "BOARD_SEQ")
	private Long boardSeq; // 글번호
	
	@Column(name = "REPLY_CONTENT",nullable = false)
	private String content;
	
	@Column(name = "MEMBER_NICKNAME")
	private String nickName;
	
	@Column(name = "REPLY_DATE", insertable = false, updatable = false, columnDefinition = "date default sysdate")
	private Date replyDate; // 작성날짜(SYSDATE)

}
