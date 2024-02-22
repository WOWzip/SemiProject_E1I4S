# [프로젝트명] E1I4S 
- 커뮤니티 활성화를 주목적으로 한 게임 홈페이지 제작
<br/>

---

## 선정 배경 : 온라인 커뮤니티와 상호작용의 중요성
- 10-30대의 주요 사용자층은 소셜 및 온라인 상호작용에 큰 관심을 가지고 있습니다.
- 게임을 통한 소셜 경험과 다른 유저들과의 소통을 강화하는 플랫폼이 사용자들에게 높은 인기를 얻을 것으로 기대됩니다.
<br/>

## 컨셉 
- 룰렛 랜덤 게임을 할 수 있는 홈페이지를 구현
- 홈페이지 내 유저들에게 이벤트 및 공지사항 등 정보 제공
- 유저들간 소통을 할 수 있는 커뮤니티 제공
- 포인트 상점 기능을 구현하여 게임활동 및 커뮤니티 활성화
- 홈페이지 이용 및 불만사항 개선을 위한 고객센터 구현
<br/>


## 개발 도구 및 기술
- Java / SpringToolSuite4(Spring Boot) 
- Oracle DB / AWS(Amazon Web Service)
- JPA(Java Persistence API) (DB)
- HTML / Thymeleaf / JavaScript / CSS / AJAX
- OpenAPI(Google, Kakao, Daum, CoolSMS, Email)
- Security(Oauth2)

![기술아키텍쳐](https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/08e1f065-3ce1-4d24-844b-8bc5198b170b)
<br/>
<br/>

## 프로젝트 기간 : 2023.11.27(월) ~ 2023.12.22(금) <br/>
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/8a36ad04-8d68-4aff-9939-1afea5bea0c0" width="80%" alt="스케줄"></img> <br/><br/>


## 주요기능
### 1. 로그인 <br/>
 <ul>
  <li>
   AJAX 를 활용하여 ID, 비밀번호를 확인하여 로그인
  </li>
  <li>
   로그인을 Security로 구현하면서 비밀번호 값을 암호화 했기 때문에 받아온 비밀번호 값을 컨트롤러에서 암호화해서 값을 확인
  </li>
  <li>
   소셜 로그인 구현 
  </li>
   >> Case1. 최초 로그인 시 <br/>
     - 회원가입 동의 페이지 이동 <br/>
     - 홈페이지 양식에 필요한 필수정보 입력 페이지 이동 <br/>
     - 상세정보 미입력시 메인페이지 이동 불가 <br/>

 >> Case2. 동의 완료 후 로그인 시 <br/>
     - 추가 정보 입력 없이 바로 로그인 <br/>
 <li>
  구글 혹은 카카오에서 넘어온 email 정보를 ID 값으로 구현 (임의로 변경 불가)
 </li>
 </ul>
 <img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/328fd432-786e-4212-b4d1-63233d99c8a8" width="40%" height="30%" alt="로그인"></img> <br/>



   
### 2. 회원가입 <br/>
<ul>
 <li>
  약관 동의 후 회원가입 폼으로 이동
 </li>
</ul>
 <img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/aa2e9bf0-b382-4c7a-b7cf-4f462b29296f" width="40%" height="30%" alt="약관동의"></img> <br/> 
 
<ul>
 <li>
  회원가입 폼은 기본 정보 및 상세 정보 폼으로 구성되어 있음   
 </li>
 <li>
  기본 정보 확인 폼에서는 주민번호와 휴대폰번호의 중복성 체크 후 다음 페이지로 이동
 </li>
</ul> 
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/b2eaedad-9491-4035-91a1-550af8ed29c6" width="40%" height="30%" alt="기본정보확인"></img> <br/>
 
<ul>
 <li>
  상세 정보 입력 폼에서는 아이디 중복 체크 및 비밀번호 입력
 </li>
 <li>
  확인한 정보 받아서 현재 페이지에 뿌려주고 다시 변경할 수 없게 비활성화
 </li>
  <li>
  Daum API 를 이용하여 우편번호 찾기
 </li>
</ul>
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/6bd67959-89f7-4760-9ed2-3537661d65ce" width="40%" height="30%" alt="상세정보입력"></img> <br/>




 


### 3. 메인페이지 <br/>
 - 메인 페이지에서 이벤트 및 공지사항 등 정보 제공
 <img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/60708539-0183-41bd-b2a5-cac7767ff11b" width="50%" alt="메인페이지"></img>
 - 게임start버튼 클릭 시, 랜덤 룰렛으로 포인트 획득 가능<br/>
 <img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/cf9e2815-7e3b-407a-9aec-69ef0c64f1f4" width="50%" alt="룰렛1"></img> 
 - 이때, 20포인트 이상 보유해야 게임 스타트 가능 <br/>  
 <img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/9af1bc3a-1baf-4a1b-9bbe-91a975f3a99a" width="50%" alt="룰렛2"></img><br/>   




### 4. 마이페이지 <br/>
 <img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/41f1b0ed-7a22-4a1a-8141-57d403b2b44f" width="50%" alt="마이페이지"></img>   
 
 <ul>
 <li>
  개인정보 변경, 비밀번호 변경, 회원 탈퇴 페이지는 이동하려면 본인확인용 비밀번호 페이지로 먼저 이동
 </li>
</ul>
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/5f0ae465-3ffd-4735-b514-e2a483a231e2" width="40%" alt="내정보관리"></img>  
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/a5609723-fc1f-4fa5-982c-82e0cf3d6de2" width="40%" height="30%" alt="본인확인"></img> <br/>

<ul>
 <li>
 회원탈퇴 >> 회원정보 DB에서 삭제 후에 세션값을 날려 로그아웃 상태로 만들어 줌
</li>
<li>
 아이디 찾기 >> 입력값이 모두 일치하면 ID 를 해당 이메일로 전송
</li>
</ul>
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/714f542f-3f65-4eff-b568-f8ed102fe303" width="40%" height="30%" alt="아이디 찾기"></img>

<ul>
<li>
 비밀번호 찾기 >> 입력값이 모두 일치하면 ID 를 해당 이메일로 전송
</li>
</ul>
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/8199a660-858c-4ce8-bcb1-999a8b798eea" width="40%" height="30%" alt="비밀번호 찾기"></img>




### 5. 공지사항 <br/>
<ul>
 <li>
  공지사항을 전체, 공지, 점검으로 구분하여 CRUD 구현 
 </li>
  <li>
   검색기능 구현
 </li>
</ul>
 <img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/bb322fbb-11a8-4e06-b9aa-b11000de9be5" width="50%" alt="공지사항"></img>   
 <img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/3e7a727b-5453-4d15-b6bb-c3929d4171d0" width="50%" alt="공지사항 상세"></img>   

### 6. 이벤트 <br/>
<ul>
 <li>
   이벤트 항목 CRUD 구현
 </li>
 <li>
  진행 중인 이벤트와 종료된 이벤트 구분
 </li>
 <li>
  종료일이 지나면 자동으로 종료된 이벤트 목록으로 넘어가도록 구현
 </li>
  
  <li>
   검색기능 구현
 </li>
 <li>
  D-Day 표시
 </li>

</ul>
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/388e76b5-da95-4e7f-9838-9c92c07ef9c0" width="50%" alt="이벤트"></img> 
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/aabb54c7-8eb1-4d6f-80eb-2ec9686ea477" width="50%" alt="이벤트 상세"></img>   

### 7. 가이드 <br/>
<ul>
 <li>
  게임 기초 가이드 CRUD 구현
 </li>
</ul>
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/a31d2ea2-5037-42e9-9576-88a3c038a403" width="50%" alt="가이드"></img>   
  
### 8. 캐릭터 소개 <br/>
<li>
  게임 캐릭터 소개 CRUD 구현
 </li>
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/d68cda88-dfe6-46bd-9780-5e8d2c49c6dc" width="50%" alt="캐릭터 소개"></img>   
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/e220dd4c-af6e-425e-b717-ae1abc8ff68e" width="50%" alt="캐릭터 소개 상세"></img> 



### 9. 유저 랭킹 <br/>
<ul>
 <li>
  페이지 상단에는 누적 포인트 순으로 상위3명을 뽑아냄
 </li>
 <li>
  페이지 하단에는 누적 포인트 순으로 순위 리스트를 뽑아냄
 </li>
 <li>
  검색 기능 구현-정확한 닉네임에 대해서만 검색결과 출력. 존재하지 않을 경우 존재하지 않는 닉네임이라는 문구 출력 
 </li>
</ul>
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/54d4e3dd-910e-4b17-a515-70446f9d13c0" width="50%" alt="유저 랭킹"></img>   
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/e0a4e880-62b1-4eb2-9122-59fbcc4e76ff" width="50%" alt="유저 랭킹2"></img>  



### 10. 커뮤니티 <br/>
<ul>
 <li>
  커뮤니티 카테고리는 자유 게시판, 거래 게시판, 팁&노하우 3가지로 구분 
 </li>
 <li>
    게시글 작성시 100 포인트 획득
 </li>
  <img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/68d369cf-8a88-4eb2-affe-ed4110133335" width="50%" alt="커뮤니티"></img>  
</ul>
<ul>
  <li>
   게시글 조회수 및 추천수 구현
 </li>
  <li>
   추천 받으면 50P, 추천 취소 가능
 </li>
  <img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/1af2a1e8-5a14-495b-ab31-23429bf9de30" width="50%" alt="조회수및추천수"></img>  
</ul>
<ul>
  <li>
   댓글 구현
 </li>
 <img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/1c39bc7f-3b51-4059-a2d9-e0c731499731" width="50%" alt="커뮤니티댓글"></img>  
</ul>

 

<ul>
<li>
 본인이 작성한 글만 따로 확인 가능
</li>
 <img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/9e0436a4-e922-48e4-8a9f-cb8e3114263e" width="50%" alt="커뮤니티"></img> 
</ul>



### 11. 포인트 상점 <br/>
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/1b97e5b1-d41c-4bf4-b184-12e7c3fe89a2" width="50%"  alt="포인트상점1"></img>
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/9faf20cd-fc2b-4749-82c6-073c99a7774f" width="50%"  alt="포인트상점2"></img>   
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/9dc84fea-335e-411d-97f8-e9c853b1c6f4" width="50%"  alt="포인트상점3"></img>  
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/264700e6-6020-48e7-a301-dac429f1cefd" width="50%"  alt="포인트상점 메일"></img>  



### 12. 고객지원 <br/>
- 문의내역 <br/>
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/440f310e-4147-4214-a502-6e808d9134fe" width="50%" alt="고객지원1"></img>
- 신고내역 <br/>
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/0661b1be-18f4-4ff1-aaf8-f8bcbf39d45c" width="50%" alt="고객지원2"></img>
- 답변된 문의내역 <br/>
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/5d6db887-86e7-4e52-834f-3baf55d70dfe" width="50%" alt="고객지원3"></img>   


### 13. 관리자 페이지 <br/>
- 관리자 코드입력 페이지 <br/>
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/ec95423e-50ac-486e-bee1-529235cf930c" width="50%" alt="관리자 코드입력"></img>   

- 관리자 메인페이지 <br/>
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/b734f371-7958-4f86-9881-1ced7eaf7f4e" width="50%" alt="관리자 메인"></img>   


### 14. 관리자 회원가입 <br/>
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/343abc44-b208-4eca-80bc-866b78c2bfd0" width="40%" height="30%" alt="관리자 회원가입"></img>   


### 15. 관리자 고객지원 페이지 <br/>
<img src="https://github.com/WOWzip/SemiProject_E1I4S/assets/142926896/916adacc-f6a5-43b7-9d29-f07b0c18c91d" width="70%" alt="관리자 고객지원원"></img>   
<br/>
<br/>


---


## 자체 평가
팀 프로젝트를 하면서 협업의 중요성을 깨달았습니다. 막힌 부분들을 함께 해결해가면서 새로운 접근 방식을 배울 수 있었습니다. 개인적으로 아쉬운 점은 속도가 느려서 더 구현하고 싶은 것들을 구현하지 못한 것입니다. 추후에  더 공부하여 스케줄 API등 여러 API를  활용해보고 싶습니다. 든든한 팀원들을 만나서 좋았고 다음에는 제가 더 보탬이 되는 팀원으로 함께하고 싶습니다.


## 역할 분담
|Role|Work|
|---|---|
|팀장|총괄, 고객지원, 관리자 페이지|
|나⭐|AWS 서버구축, 뉴스, 가이드, 랭킹 페이지|
|팀원|발표, 포인트 상점 페이지|
|팀원|회원가입, 로그인(security), 마이페이지|
|팀원|데이터 준비, 커뮤니티 페이지|

