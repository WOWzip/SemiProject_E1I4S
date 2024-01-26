package com.web.domain;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@ToString
@Getter 
@Setter
@Entity
@NoArgsConstructor
@Table(name = "MEMBER_TB")
public class Member {

	
	@Id
	@Column(name = "MEMBER_ID")
	private String id;
	@Column(name = "MEMBER_PASSWORD")
	private String password;
	@Column(name = "MEMBER_NAME")
	private String name;
	@Column(name = "MEMBER_NICKNAME")
	private String nickName;
	@Column(name = "MEMBER_PHONE_NUM")
	private String phoneNumber;
	@Column(name = "MEMBER_SOCIAL_NUM")
	private String socialSecuNum;	// 주민번호 전체
	@Column(name = "MEMBER_EMAIL")
	private String email;
	@Column(name = "MEMBER_DOMAIN")
	private String domain;
	@Column(name = "MEMBER_ADRESS")
	private String addr;
	@Column(name = "MEMBER_ROLE")
	@Enumerated(EnumType.STRING)
	private Role role;
	@Column(name = "MEMBER_POINT", columnDefinition = "number default 0")
	private int point;
	@Column(name = "MEMBER_TOTAL_POINT", columnDefinition = "number default 0")
	private int totalPoint;
	@Column(name = "ENABLED")
	private boolean enabled;
	@Column(name = "MEMBER_PROVIDER")
	private String provider; //어떤 OAuth인지(google, naver 등)
	@Column(name = "MEMBER_PROVIDER_ID")
	private String providerId; // 해당 OAuth 의 key(id)
	
	@Builder
	public Member(String id, String password, String name, String nickName, String phoneNumber, String socialSecuNum,
			String email, String domain, String addr, Role role, int point, int totalPoint, boolean enabled,
			String provider, String providerId) {
		super();
		this.id = id;
		this.password = password;
		this.name = name;
		this.nickName = nickName;
		this.phoneNumber = phoneNumber;
		this.socialSecuNum = socialSecuNum;
		this.email = email;
		this.domain = domain;
		this.addr = addr;
		this.role = role;
		this.point = point;
		this.totalPoint = totalPoint;
		this.enabled = enabled;
		this.provider = provider;
		this.providerId = providerId;
	}
	
}
