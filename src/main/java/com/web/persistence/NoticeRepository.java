package com.web.persistence;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.web.domain.Board;
import com.web.domain.Notice;

public interface NoticeRepository extends JpaRepository<Notice, Long>{
	Page<Notice> findByNoticeTitleContaining(String searchKeyword, Pageable pageable); // 키워드 제목으로 검색 처리
	Page<Notice> findByNoticeContentsContaining(String searchKeyword, Pageable pageable); // 키워드 내용으로 검색 처리
	Page<Notice> findByNoticeChoice(Long noticeChoice, Pageable pageable); // 페이지(공지/점검)구분하여 페이지처리
	Page<Notice> findByNoticeTitleContainingAndNoticeChoice(String searchKeyword, Long noticeChoice,Pageable pageable);  // 페이지(공지/점검) 구분하여 제목 검색 처리
	Page<Notice> findByNoticeContentsContainingAndNoticeChoice(String searchKeyword, Long noticeChoice,Pageable pageable);  // 페이지(공지/점검) 구분하여 내용 검색 처리
	List<Notice> findTop4ByOrderByNoticeSeqDesc();
}
 