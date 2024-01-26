package com.web.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.domain.ReplyEvent;

public interface ReplyEventRepository extends JpaRepository<ReplyEvent, Long>{
	
	List<ReplyEvent> findByEventSeqOrderByReplyEventSeqDesc(int eventSeq); /*** 이벤트 댓글 ***/
	
}
