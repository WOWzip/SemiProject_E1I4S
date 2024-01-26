package com.web.service;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.web.domain.Board;
import com.web.domain.Reply;
import com.web.persistence.ReplyRepository;

@Service
public class ReplyServiceImpl implements ReplyService{

	@Autowired
	private ReplyRepository replyRepo;

	// 댓글 목록 
	@Override
	public void replyList(Model model, Long boardSeq) {
		// 댓글 객체에 저장된 게시판seq를 이용하여 조회 후 list에 담기
		List<Reply> replyList = replyRepo.findByBoardSeqOrderByReplySeqDesc(boardSeq);
		model.addAttribute("replyList",replyList);
	}
 
	// 댓글 등록  
	@Override
	public void replyWrite(Reply reply, Long boardSeq) {
		replyRepo.save(reply);
	}

	// 댓글 수정 폼에 정보 띄우기
	@Override
	public void replyModify(Long replySeq, Model model) {
		// 댓글 번호로 조회하여 폼에 띄우기
		Reply reply = replyRepo.findById(replySeq).get();
		model.addAttribute(reply);
	}
	
	// 댓글 수정 완료시 객체정보를 넘겨서 수정
	@Override
	public void replyModify2(Reply reply) {
		String content = reply.getContent();
		// replySeq에 맞게 window 창이 열리고 입력했었던 데이터들이 입력되어있음
		Optional<Reply> optional = replyRepo.findById(reply.getReplySeq());
		if (optional != null) {
			// 수정한 내용 담아서 저장
			reply = optional.get();
			reply.setContent(content);
			replyRepo.save(reply);
		} else {
			System.out.println("수정 실패");
		}
	}
	// 댓글 삭제
	@Override
	public void replyDelete(Long replySeq, RedirectAttributes ra) {
		// 댓글 seq로 조회 후 댓글 객체 삭제
		Optional<Reply> optional = replyRepo.findById(replySeq);
		Reply reply = new Reply();
		if(optional != null) {
			reply = optional.get();
		} else {
			reply = null;
		}
		ra.addAttribute("boardSeq", reply.getBoardSeq());
		replyRepo.deleteById(replySeq);
	}

	

	
}

















