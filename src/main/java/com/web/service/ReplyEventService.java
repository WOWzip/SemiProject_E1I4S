package com.web.service;

import org.springframework.ui.Model;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.web.domain.ReplyEvent;

/*** 이벤트 댓글 ***/
public interface ReplyEventService {
	
	//댓글 목록
	public void replyEventList(Model model, int eventSeq);
	
	// 댓글 쓰기 
	public void replyEventWrite(ReplyEvent replyEvent, int eventSeq); 
	
	// 댓글 수정 폼에 값 넣기 
	public void replyEventModify(Long replyEventSeq, Model model); 
	
	// 댓글 삭제 
	public void replyEventDelete(Long replyEventSeq, RedirectAttributes ra); 
	
	// 댓글 수정 
	public void replyEventModify2(ReplyEvent replyEvent);
}
