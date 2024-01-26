package com.web.service;


import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.web.domain.CharacterGuide;
import com.web.domain.Event;
import com.web.persistence.CharacterRepository;


@Service
public class CharacterServiceImpl implements CharacterService, FolderPathREPO{
	
	@Autowired
	private CharacterRepository characterRepo;
	
	// 캐릭터 목록
	@Override
	public void getCharacterList(Model model) {
		List<CharacterGuide> characterList =  (List<CharacterGuide>)characterRepo.findAll(); 
		model.addAttribute("characterList", characterList);
	}

	// 캐릭터 상세보기
	@Override
	public int getCharacter(Model model, Long characterGuideNum) {
		
		// 삭제된 값 찾는경우 에러 방지.
		Optional<CharacterGuide> optional = characterRepo.findById(characterGuideNum);
		
		if(optional.isPresent()) {
			// 찾음 >> 뷰페이지 띄움
			CharacterGuide characterGuide = optional.get();
			model.addAttribute("characterGuide", characterGuide);
			return 1; 
		} else {
			// 못찾음 >> 뷰페이지 띄우지 않고 리스트로 돌아감(event.html)
			return 0; 
		}
		
	}
	
	// 캐릭터 등록
	@Override
	public void insertCharacter(MultipartHttpServletRequest mul) {
		CharacterGuide characterGuide = new CharacterGuide();
		characterGuide.setCharacterGuideWriter(mul.getParameter("characterGuideWriter"));
		characterGuide.setCharacterGuideName(mul.getParameter("characterGuideName"));
		characterGuide.setCharacterGuideContents(mul.getParameter("characterGuideContents"));
		
		MultipartFile file = mul.getFile("file");
		
		if(file.getSize() !=0) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss-");
			Calendar calendar = Calendar.getInstance();
			String sysFileName = sdf.format(calendar.getTime());
			sysFileName += file.getOriginalFilename();
			File saveFile = new File(CHARACTER_IMAGE_REPO + "/" + sysFileName); 
			characterGuide.setCharacterGuideImageName(sysFileName);
			try {
				file.transferTo(saveFile);
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
		} else {
			characterGuide.setCharacterGuideImageName("nan");
		}
		characterRepo.save(characterGuide);
	}


	// 캐릭터 수정
	@Override
	public void updateCharacter(MultipartHttpServletRequest mul) {
		long characterGuideNum = Long.parseLong(mul.getParameter("characterGuideNum"));
		CharacterGuide findCharacterGuide = characterRepo.findById(characterGuideNum).get(); // 수정하기 전의 본래의 내용 가져옴(?)
		
		findCharacterGuide.setCharacterGuideName(mul.getParameter("characterGuideName")); // 수정한 캐릭터 이름을 가져와서 세팅함.
		findCharacterGuide.setCharacterGuideContents(mul.getParameter("characterGuideContents")); // 수정한 캐릭터 설명을 가져와서 세팅함.
		
		MultipartFile file = mul.getFile("file");
		
		if(file.getSize() !=0) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss-");
			Calendar calendar = Calendar.getInstance();
			String sysFileName = sdf.format(calendar.getTime());
			sysFileName += file.getOriginalFilename();
			File saveFile = new File(CHARACTER_IMAGE_REPO + "/" + sysFileName); 
			findCharacterGuide.setCharacterGuideImageName(sysFileName);
			try {
				file.transferTo(saveFile);
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
		} else {
			findCharacterGuide.setCharacterGuideImageName("nan");
		}
		
		characterRepo.save(findCharacterGuide); // DB에 반영시킴.
	}

	// 캐릭터 삭제
	@Override
	public void deleteCharacter(CharacterGuide characterGuide) {
		characterRepo.deleteById(characterGuide.getCharacterGuideNum()); 
	}
	
	
	
}
