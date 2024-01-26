package com.web.service;

import org.springframework.data.domain.Pageable;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.web.domain.Notice;

public interface NoticeService {
	
	public void getNoticeList(Model model, Pageable pageable, String searchKeyword, String searchCode,  Long noticeChoice); // 공지 목록(전체)
	
	public int getNoticeView(Model model, Long noticeSeq); // 공지 상세보기
	
	public void insertNotice(MultipartHttpServletRequest mul); // 공지 등록
	
	public void updateNotice(MultipartHttpServletRequest mul); // 공지 수정
	
	public void deleteNotice(Notice notice);// 공지 삭제
	
	// 인덱스용 이벤트 불러오기(리스트)
	public void recentNotice(Model model);

}
