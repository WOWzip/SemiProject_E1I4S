package com.web.service;

import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.web.domain.Guide;

public interface GuideService {
	
	public void getGuideList(Model model, Guide guide); // 가이드 목록
	
	public void insertGuide(MultipartHttpServletRequest mul); // 가이드 등록

	public int getGuide(Model model, Long guideNum); // 가이드 보기

	public void updateGuide(MultipartHttpServletRequest mul); // 가이드 수정

	public void deleteGuide(Guide guide); // 가이드 삭제
	
}
