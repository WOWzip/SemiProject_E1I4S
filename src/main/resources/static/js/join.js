
/* 회원가입 - 입력 정보 확인 */
function checkJoin() {
   /* id : 4 ~ 20자리, 첫글자 숫자 x */
   const regId = new RegExp(/^[A-Za-z]{1}[A-Za-z0-9]{3,19}$/);

   /* pw : 최소 8자리, 숫자,문자,특수문자 최소 1개 */
   const regPw = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/);

   /* 글자수만 제한 2~20 */
   const regNickName = new RegExp(/^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/);

   const regEmail = new RegExp(/^[a-z0-9\.\-_]/);
   const regDomain = new RegExp(/([a-z0-9\-]+\.)+[a-z]{2,6}$/);

   if(document.joinForm.id.value == ""){
      alert("아이디을 입력하세요~");
      document.joinForm.id.focus();
   } else if (regId.test(document.joinForm.id.value) != true){
      alert("아이디는 4 ~ 20자 이내입니다.")
      document.joinForm.id.focus();
   }  else if (document.joinForm.checkId1.style.display != "none"){
      alert("중복확인")
      document.joinForm.id.focus();
   }
   else if(document.joinForm.password.value == ""){
      alert("비밀번호를 입력하세요~");
      document.joinForm.password.focus();
   } else if (regPw.test(document.joinForm.password.value) != true){
      alert("비밀번호는 최소 8자리, 숫자,문자,특수문자를 최소 1개씩은 포함해야 합니다.")
      document.joinForm.password.focus();
   }
   else if(document.joinForm.password.value != document.joinForm.repassword.value){
      alert("비밀번호가 틀려요~");
      document.joinForm.repassword.focus();
   } else if(document.joinForm.nickName.value == ""){
      alert("닉네임을 입력하세요~");
      document.joinForm.name.focus();
   } else if (regNickName.test(document.joinForm.nickName.value) != true){
      alert("닉네임은 2 ~ 20글자")
      document.joinForm.nickName.focus();
   }
   else if(document.joinForm.email.value == ""){
      alert("이메일을 입력하세요~");
      document.joinForm.email.focus();
   } else if (regEmail.test(document.joinForm.email.value) != true){
      alert("이메일을 잘못입력했습니다.")
      document.joinForm.email.focus();
   }
   else if(document.joinForm.domain.value == ""){
      alert("도메인을 입력하세요~");
      document.joinForm.domain.focus();
   } else if (regDomain.test(document.joinForm.domain.value) != true){
      alert("도메인을 잘 입력하세요")
      document.joinForm.domain.focus();
   }
   else if(document.joinForm.postcode.value == ""){
      alert("우편번호를 입력하세요~");
      document.joinForm.detailAddress.focus();
   }else if(document.joinForm.address.value == ""){
      alert("주소를 입력하세요~");
      document.joinForm.detailAddress.focus();
   }else if(document.joinForm.detailAddress.value == ""){
      alert("상세 주소를 입력하세요~");
      document.joinForm.detailAddress.focus();
   } 
   else {
      document.joinForm.submit();
   }


}



/* 회원가입 - 입력 정보 확인 */
function checkSocialJoin() {

   /* pw : 최소 8자리, 숫자,문자,특수문자 최소 1개 */
   const regPw = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/);

   /* 글자수만 제한 2~20 */
   const regNickName = new RegExp(/^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/);

   if(document.socialJoinForm.password.value == ""){
      alert("비밀번호를 입력하세요~");
      document.socialJoinForm.password.focus();
   } else if (regPw.test(document.socialJoinForm.password.value) != true){
      alert("비밀번호는 최소 8자리, 숫자,문자,특수문자를 최소 1개씩은 포함해야 합니다.")
      document.socialJoinForm.password.focus();
   }
   else if(document.socialJoinForm.password.value != document.socialJoinForm.repassword.value){
      alert("비밀번호가 틀려요~");
      document.socialJoinForm.repassword.focus();
   } else if(document.socialJoinForm.nickName.value == ""){
      alert("닉네임을 입력하세요~");
      document.socialJoinForm.name.focus();
   } else if (regNickName.test(document.socialJoinForm.nickName.value) != true){
      alert("닉네임은 2 ~ 20글자")
      document.socialJoinForm.nickName.focus();
   } else if (document.socialJoinForm.checkPhoneNumber_btn.style.display != "none"){
      alert("전화번호 중복확인")
      document.socialJoinForm.phoneNumber.focus();
   } else if (document.socialJoinForm.checkSocialSecuNum_btn.style.display != "none"){
      alert("주민번호 중복확인")
      document.socialJoinForm.birth.focus();
   }
   else if(document.socialJoinForm.postcode.value == ""){
      alert("우편번호를 입력하세요~");
      document.socialJoinForm.detailAddress.focus();
   }else if(document.socialJoinForm.address.value == ""){
      alert("주소를 입력하세요~");
      document.socialJoinForm.detailAddress.focus();
   }else if(document.socialJoinForm.detailAddress.value == ""){
      alert("상세 주소를 입력하세요~");
      document.socialJoinForm.detailAddress.focus();
   } 
   else {
      document.socialJoinForm.submit();
   }


}


