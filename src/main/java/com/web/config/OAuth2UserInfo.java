package com.web.config;


public interface OAuth2UserInfo {

	String getProviderId();
	String getProvider();
	String getEmail();
	String getName();
}

