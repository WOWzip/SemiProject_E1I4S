package com.web.persistence;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.web.domain.Event;
import com.web.domain.Notice;

public interface EventRepository extends JpaRepository<Event, Integer>{

	Page<Event> findByEventTitleContaining(String searchKeyword, Pageable pageable); // 키워드 제목으로 검색 처리
	Page<Event> findByEventContentsContaining(String searchKeyword, Pageable pageable); // 키워드 내용으로 검색 처리
	Page<Event> findByEventTitleContainingOrEventContentsContaining(String searchKeyword, String searchKeyword2, Pageable pageable); // 키워드 제목 및 내용으로 검색 처리
	
	Page<Event> findByEventChoice(String eventChoice, Pageable pageable); // 페이지(이벤트 진행/종료) 구분하여 페이지처리
	Page<Event> findByEventTitleContainingAndEventChoice(String searchKeyword, String eventChoice,Pageable pageable);  // 페이지(이벤트 진행/종료) 구분하여 제목 검색 처리
	Page<Event> findByEventContentsContainingAndEventChoice(String searchKeyword, String eventChoice,Pageable pageable);  // 페이지(이벤트 진행/종료) 구분하여 내용 검색 처리
	Page<Event> findByEventContentsContainingOrEventContentsContainingAndEventChoice(String searchKeyword, String searchKeyword2 , String eventChoice,Pageable pageable);  // 페이지(이벤트 진행/종료) 구분하여 제목 및 내용 검색 처리

	
	// D-Day계산. 종료날짜 불러오기
	Page<Event> findByEventEndDate(String endDate, Pageable pageable);
	// 진행중 이벤트 리스트(List)
	List<Event> findByEventEndDateAfter(Date date);
	// 진행중인 이벤트 리스트(Page)
	Page<Event> findByEventEndDateAfter(Pageable pageable, Date date);
	Page<Event> findByEventEndDateAfterAndEventTitleContaining(Pageable pageable, Date date, String searchKeyword);
	Page<Event> findByEventEndDateAfterAndEventContentsContaining(Pageable pageable, Date date, String searchKeyword);
	Page<Event> findByEventEndDateAfterAndEventContentsContainingOrEventTitleContaining(Pageable pageable, Date date, String searchKeyword1, String searchKeyword2);
	
	// 종료된 이벤트 리스트(Page)
	Page<Event> findByEventEndDateBefore(Pageable pageable, Date date);
	Page<Event> findByEventEndDateBeforeAndEventTitleContaining(Pageable pageable, Date date, String searchKeyword);
	Page<Event> findByEventEndDateBeforeAndEventContentsContaining(Pageable pageable, Date date, String searchKeyword);
	Page<Event> findByEventEndDateBeforeAndEventContentsContainingOrEventTitleContaining(Pageable pageable, Date date, String searchKeyword1, String searchKeyword2);
	
}
