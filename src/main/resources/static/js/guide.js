/* Guide.js */

function guideInsert(){
   if(document.guideInsertForm.guideTitle.value == ""){
      alert("제목을 입력하세요~");
      document.guideInsertForm.guideTitle.focus();
   }
   else if(document.guideInsertForm.guideContents.value == ""){
      alert("내용을 입력하세요~");
      document.guideInsertForm.guideContents.focus();
   }
   else {
      document.guideInsertForm.submit();
   }
}

function guideUpdate(){
   if(document.guideUpdateForm.guideTitle.value == ""){
      alert("제목을 입력하세요~");
      document.guideUpdateForm.guideTitle.focus();
   }
   else if(document.guideUpdateForm.guideContents.value == ""){
      alert("내용을 입력하세요~");
      document.guideUpdateForm.guideContents.focus();
   }
   else {
      document.guideUpdateForm.submit();
   }
}

function characterGuideInsert(){
      if(document.characterGuideInsertForm.characterGuideName.value == ""){
      alert("제목을 입력하세요~");
      document.characterGuideInsertForm.characterGuideName.focus();
   }
   else if(document.characterGuideInsertForm.characterGuideContents.value == ""){
      alert("내용을 입력하세요~");
      document.characterGuideInsertForm.characterGuideContents.focus();
   }
   else {
      document.characterGuideInsertForm.submit();
   }
}

function characterUpdate(){
      if(document.characterUpdateForm.characterGuideName.value == ""){
      alert("제목을 입력하세요~");
      document.characterGuideInsertForm.characterGuideName.focus();
   }
   else if(document.characterUpdateForm.characterGuideContents.value == ""){
      alert("내용을 입력하세요~");
      document.characterUpdateForm.characterGuideContents.focus();
   }
   else {
      document.characterUpdateForm.submit();
   }
}