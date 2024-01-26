package com.web.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.web.domain.ReplyEvent;
import com.web.persistence.ReplyEventRepository;

@Service
public class ReplyEventServiceImpl implements ReplyEventService{

	@Autowired
	private ReplyEventRepository replyEventRepo;

	
	/*** 이벤트 댓글 ***/
	// 댓글 목록 
	@Override
	public void replyEventList(Model model, int eventSeq) {
		List<ReplyEvent> replyEventList = replyEventRepo.findByEventSeqOrderByReplyEventSeqDesc(eventSeq);
		
		model.addAttribute("replyEventList",replyEventList);
	}
	
 
	// 댓글 등록  
	@Override
	public void replyEventWrite(ReplyEvent replyEvent, int eventSeq) {
	
		replyEventRepo.save(replyEvent);
	}

	// 댓글 수정 
	@Override
	public void replyEventModify(Long replyEventSeq, Model model) {
		ReplyEvent replyEvent = replyEventRepo.findById(replyEventSeq).get();
		model.addAttribute(replyEvent);
	}
	
	// 댓글 삭제
	@Override
	public void replyEventDelete(Long replyEventSeq, RedirectAttributes ra) {
		Optional<ReplyEvent> optional = replyEventRepo.findById(replyEventSeq);
		ReplyEvent replyEvent = new ReplyEvent();
		if(optional != null) {
			replyEvent = optional.get();
		} else {
			replyEvent = null;
		}
		ra.addAttribute("eventSeq", replyEvent.getEventSeq());
		replyEventRepo.deleteById(replyEventSeq);
	}

	@Override
	public void replyEventModify2(ReplyEvent replyEvent) {
		String content = replyEvent.getContent();
		Optional<ReplyEvent> optional = replyEventRepo.findById(replyEvent.getReplyEventSeq());
		if(optional != null) {
			replyEvent = optional.get();
			replyEvent.setContent(content);
			replyEventRepo.save(replyEvent);
		} else {
			System.out.println("수정 실패");
		}
	}

}
