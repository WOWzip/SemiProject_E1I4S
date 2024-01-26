package com.web.service;

import org.springframework.data.domain.Pageable;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.web.domain.Event;


public interface EventService {
	
	// 이벤트 목록(전체)
	public void getEventList(Model model, Pageable pageable, String searchKeyword, String searchCode); 
	
	// 이벤트 상세페이지
	public int getEventView(Model model, int eventSeq); 

	// 이벤트 등록
	public void insertEvent(MultipartHttpServletRequest mul);
	
	// 이벤트 수정
	public void updateEvent(MultipartHttpServletRequest mul); 
	
	// 이벤트 삭제
	public void deleteEvent(Event event);
	
	// 인덱스용 이벤트 불러오기(리스트)
	public void wip_event(Model model);
}
