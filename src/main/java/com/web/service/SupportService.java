package com.web.service;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.web.domain.Inquery;
import com.web.domain.Member;
import com.web.domain.Report;

public interface SupportService {
	// 문의 내용 작성시 정보를 받아 레코드 생성
	public void insertInquery(MultipartHttpServletRequest mul);
	public void insertReport(MultipartHttpServletRequest mul);
	// 문의 내역 html 을 열 때 자신이 작성한 문의 내역을 불러옴
	public void getInqueryList(Model model, Inquery inquery, Pageable pageable, Member member);
	public void getReportList(Model model, Report report, Pageable pageable, Member member);
	// 관리자페이지에서 문의 종류에 따라 페이징
	// 3개의 리스트를 html 에 추가
	public void find3List(Inquery inquery, Report report, Pageable pageable1, Pageable pageable2, Pageable pageable3, 
						  String searchKeyword1, String searchKeyword2, String searchKeyword3, Model model);
	// 고객센터 완료목록
	// 2개의 리스트를 html 에 추가
	public void find2List(Inquery inquery, Report report, Pageable pageable1, Pageable pageable3, String searchKeyword1, String searchKeyword3, Model model, Member member);
	// 문의 뷰 페이지에서 문의 번호(SEQ) 값으로 정보 띄우기
	public void getInqueryById(Long inquerySeq, Model model);
	public void getReportById(Long reportSeq, Model model);
	// 관리자 페이지에서 확인 클릭 시 자동 답변
	public void answerInq(Long inquerySeq);
	public void answerRep(Long reportSeq);
	// 관리자 페이지에서 확인 클릭 시 수동 답변
	public void answerInq2(Long inquerySeq, String inqueryAnswer);
	public void answerRep2(Long reportSeq, String reportAnswer);
	
}