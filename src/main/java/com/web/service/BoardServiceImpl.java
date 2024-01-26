package com.web.service;


import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.web.domain.Board;
import com.web.domain.Member;
import com.web.domain.Recommend;
import com.web.domain.Reply;
import com.web.persistence.BoardRepository;
import com.web.persistence.MemberRepository;
import com.web.persistence.RecommendRepository;
import com.web.persistence.ReplyRepository;

@Service
public class BoardServiceImpl implements BoardService, FolderPathREPO {
	@Autowired
	private BoardRepository boardRepo;
	@Autowired
	private RecommendRepository recommendRepo;
	@Autowired 
	private ReplyRepository replyRepository;
	@Autowired
	private MemberRepository memberRepository;
	
	@Autowired
	private MemberService ms;
	
	
	
	// 게시글 목록 
	@Override
	public void board(Model model, Board board, Pageable pageable, 
					  String searchCode, String searchKeyword, Long boardChoice) {
		Page<Board> boardList;
		if(searchCode == null || searchCode == "") {
			boardList = boardRepo.findByBoardChoice(pageable, boardChoice);
		} else if ( searchCode.equals("title")) {
			boardList = boardRepo.findByBoardChoiceAndBoardTitleContaining(boardChoice, searchKeyword, pageable);
		} else {
			boardList = boardRepo.findByBoardChoiceAndBoardUserIdContaining(boardChoice, searchKeyword, pageable);
		}
		//제목으로 검색할 때
		// 현재 페이지 : Page 객체를 사용하여 현재 인덱스 추출 >> 1로 표시하기 위해 +1
		int nowPage = boardList.getPageable().getPageNumber() + 1;
		// 시작 페이지 : 현재 페이지의 -2 개
		int startPage = Math.max(nowPage - 2, 1);
		// 시작 페이지 : 현재 페이지의 +2 개
		int endPage = Math.min(nowPage + 2, boardList.getTotalPages());

		model.addAttribute("boardList", boardList);
		model.addAttribute("nowPage", nowPage);
		model.addAttribute("startPage", startPage);
		model.addAttribute("endPage", endPage);
	}

	// 게시글 글 쓰기 
	@Override
	public void board_write(MultipartHttpServletRequest mul) {
		Board board = new Board();
		board.setBoardTitle(mul.getParameter("boardTitle"));
		board.setBoardContents(mul.getParameter("boardContents"));
		board.setBoardUserId(mul.getParameter("boardUserId"));
		board.setBoardChoice(Long.parseLong(mul.getParameter("boardChoice")));
		MultipartFile file = mul.getFile("file");
		if(file.getSize() !=0) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss-");
			Calendar calendar = Calendar.getInstance();
			String sysFileName = sdf.format(calendar.getTime());
			sysFileName += file.getOriginalFilename();
			// 첨부파일이 들어오면 저장되는 위치
			File saveFile = new File(BOARD_IMAGE_REPO + "/" + sysFileName);
			board.setFile(sysFileName);
			try {
				file.transferTo(saveFile);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			// 파일이 존재하지 않을 시 DB에 nan으로 저장
			board.setFile("nan");
		}
		// 게시글이 추천을 받게 되면 100p 지급  (포인트, 누적 포인트 추가 )
		Member member = memberRepository.findById(board.getBoardUserId()).get();
		member.setPoint(member.getPoint() + 100);
		member.setTotalPoint(member.getTotalPoint() + 100 );
		
		boardRepo.save(board);
		memberRepository.save(member);

	}

	// 게시글 상세페이지 : 
	@Override
	public int board_view(Model model, Long boardSeq) {
		Optional<Board> optional = boardRepo.findById(boardSeq);
		if(optional.isPresent()) { 
			Board board = optional.get();
			board.setBoardViews(board.getBoardViews()+1);
			boardRepo.save(board);
			model.addAttribute("board",board);
			return 1; // 찾음 >> 뷰페이지 띄움
		} else {
			return 0; // 못찾음 >> 뷰페이지 띄우지 않고 리스트로 돌아감(board.html)
		}
	}
	
	// 게시글 글 수정 시 정보데이터 & seq 같이 보내기 + 페이징처리 
	@Override
	public void getBoard(Long boardSeq,Model model) {
		Board board = boardRepo.findById(boardSeq).get();
		model.addAttribute("board", board);
	}

	// 게시글 글 수정 
	@Override
	public void board_update(MultipartHttpServletRequest mul) {
		Long a  = Long.parseLong(mul.getParameter("boardSeq"));
		Board board = boardRepo.findById(a).get();
		board.setBoardTitle(mul.getParameter("boardTitle"));
		board.setBoardContents(mul.getParameter("boardContents"));
		board.setBoardChoice(Long.parseLong(mul.getParameter("boardChoice")));
		MultipartFile file = mul.getFile("file");
		
		if(file.getSize() !=0) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss-");
			Calendar calendar = Calendar.getInstance();
			String sysFileName = sdf.format(calendar.getTime());
			sysFileName += file.getOriginalFilename();
			File saveFile = new File(BOARD_IMAGE_REPO + "/" + sysFileName); 
			board.setFile(sysFileName);
			try {
				file.transferTo(saveFile);
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
		} else {
			board.setFile("nan");
		}
		boardRepo.save(board);
	}
	
	// 게시글 글 삭제 
	@Override
	public void board_delete(Board board) {
		List<Reply> replyList = replyRepository.findByBoardSeqOrderByReplySeqDesc(board.getBoardSeq());
		for(Reply reply : replyList) {
			replyRepository.delete(reply);
		}
		List<Recommend> recommendList = recommendRepo.findByBoardSeq(board.getBoardSeq());
		for(Recommend recommend : recommendList) {
			recommendRepo.delete(recommend);
		}
		boardRepo.deleteById(board.getBoardSeq());
	}

	// 게시글 공지사항
	@Override
	public void boardNotice(Model model) {
		// TODO Auto-generated method stub
		List<Board> noticeList = boardRepo.findByBoardChoice(3L);
		model.addAttribute("noticeList",noticeList);
	}
	
	// 추천 여부 확인
	@Override
	public void checkRecommend(Model model, Long boardSeq, Member member) {
		// TODO Auto-generated method stub
		// 로그인한 id 값과 게시판 seq를 이용하여 추천을 했는지 확인
		Recommend recommend = recommendRepo.findByUserIdAndBoardSeq(member.getId(), boardSeq);
		if(recommend ==null) { // 객체가 조회되지 않으면 추천하지 않음
			model.addAttribute("checkRecommend",1); // 추천 가능
		} else {
			model.addAttribute("checkRecommend",0); // 추천 불가능
		}
	}

	// 내가 쓴 글
	@Override
	public void myBoardList(Model model, Board board, Pageable pageable, Member member) {
		String userId = member.getId();
		Page<Board> boardList = boardRepo.findByBoardUserId(pageable, userId);
		int nowPage = boardList.getPageable().getPageNumber() + 1;

		int startPage = Math.max(nowPage - 4, 1);
		int endPage = Math.min(nowPage + 5, boardList.getTotalPages());

		model.addAttribute("boardList", boardList);
		model.addAttribute("nowPage", nowPage);
		model.addAttribute("startPage", startPage);
		model.addAttribute("endPage", endPage);
	}
	// 인덱스용 추천 top4 
	@Override
	public void top4_reco(Model model) {
		// TODO Auto-generated method stub
		List<Board> top4 = boardRepo.findTop4ByOrderByBoardRecommendDesc(); 
		model.addAttribute("topReco", top4);
	}
	
	
}

















