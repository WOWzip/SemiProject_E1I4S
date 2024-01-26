package com.web.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.domain.Reply;


public interface ReplyRepository extends JpaRepository<Reply, Long> {
	List<Reply> findByBoardSeqOrderByReplySeqDesc(Long boardSeq);
	void deleteAllByBoardSeq(Long boardSeq);
//	List<Reply> findByBoardSeqAndReplySeq(Long boardSeq, Long replySeq);
}
     