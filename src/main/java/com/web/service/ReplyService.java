package com.web.service;


import java.util.HashMap;
import java.util.List;

import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.web.domain.Reply;


public interface ReplyService {
//	public Reply save(HashMap<String, Object> map) ;
	
	//댓글 목록
	public void replyList(Model model, Long boardSeq);
	
	// 댓글 쓰기 
	public void replyWrite(Reply reply, Long boardSeq);
	
	// 댓글 수정 폼에 값 넣기 
	public void replyModify(Long replySeq, Model model);
	
	// 댓글 삭제 
	public void replyDelete(Long replySeq, RedirectAttributes ra);
	
	// 댓글 수정 
	public void replyModify2(Reply reply);
}
