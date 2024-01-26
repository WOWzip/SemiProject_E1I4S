/* 이벤트 댓글 */
package com.web.domain;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
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
@Table(name = "EVENT_REPLY_TB")
public class ReplyEvent {
	
	@Id
	@GeneratedValue
	@Column(name = "EVENT_REPLY_SEQ")
	private Long replyEventSeq;
	
	// 이벤트 번호
	@JoinColumn(name = "EVENT_SEQ")
	private int eventSeq; 
	
	// 댓글
	@Column(name = "EVENT_REPLY_CONTENT",nullable = false)
	private String content;
	
	// 멤버 닉네임
	@Column(name = "MEMBER_NICKNAME")
	private String nickName;
	
	// 작성날짜(SYSDATE)
	@Column(name = "EVENT_REPLY_DATE", insertable = false, updatable = false, columnDefinition = "date default sysdate")
	private Date replyDate; 

}