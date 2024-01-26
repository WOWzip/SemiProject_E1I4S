package com.web.service;

import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.web.domain.CharacterGuide;

public interface CharacterService {
	
	public void getCharacterList(Model model); // 캐릭터 목록
	
	public int getCharacter(Model model, Long characterGuideNum); // 캐릭터 보기

	public void insertCharacter(MultipartHttpServletRequest mul); // 캐릭터 등록

	public void updateCharacter(MultipartHttpServletRequest mul); // 캐릭터 수정

	public void deleteCharacter(CharacterGuide characterGuide); // 캐릭터 삭제

}