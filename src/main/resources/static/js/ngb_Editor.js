
if (typeof (NgbBrowser) != 'object') {
    if (location.href.toLowerCase().split('://', 1)[0] == 'https')
        document.write("<scr" + "ipt src ='https://ssl.nexon.com/s1/global/ngb_util.js' type='text/javascript' charset='euc-kr'></scr" + "ipt>");
    else
        document.write("<scr" + "ipt src ='http://js.nexon.com/s1/global/ngb_util.js' type='text/javascript' charset='euc-kr'></scr" + "ipt>");
}

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function')
        window.onload = func;
    else {
        window.onload = function () {
            oldonload(); func();
        }
    }
}

function add_event(_element, kindof_event, fn) {
    if (_element.addEventListener) {
        _element.addEventListener(kindof_event, fn, false);
        return true;
    } else if (_element.attachEvent) {
        var r = _element.attachEvent('on' + kindof_event, fn);
        return r;
    } else {
        _element['on' + kindof_event] = fn;
    }
}

function popup(url, target, w, h) {
    var popPosW = (screen.width / 2) - (w / 2);
    var popPosH = (screen.height / 2) - (h / 2);
    var opt = 'top=' + popPosH + ',left=' + popPosW + ',width=' + w + ',height=' + h;
    return window.open(url, target, opt);
}
String.prototype.onlyNumber = function () {
    var strValue = this;
    if (strValue == "")
        return false;
    if (strValue.search(/[^0-9]/) == -1)
        return true;
    else
        return false;
}

String.prototype.HtmlTagFilter = function (codeWriterType) {
    var strValue = this;
    var _regExp_javaScript = /(javascript)/ig;
    var _regExp_onClick = /(onclick)/ig;
    var _regExp_class = /(class)/ig;
    var _regExp_form = /(form)/ig;
    var _regExp_object = /(object)/ig;
    var _regExp_embed = /(embed)/ig;
    var _regExp_bgsound = /(bgsound)/ig;
    var _regExp_input = /(input)/ig;
    var _regExp_styleSheet = /(?:<style.*?>)((\n|\r|.)*?)(?:<\/style>)/ig;
    var _regExp_script = /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig;
    var _regExp_ImageId = /(_IMAGE_)(.*)(_UPLOAD_)/ig;
    var _regExp_MovieId = /(_MOVIE_)(.*)(_UPLOAD_)/ig;
    var _regExp_EmoticonId = /(_EDITOR_EMOTICON_)/ig;
    var _regExp_IdPattem = /id=(.*._)/ig;
    var _regExp_linkrel = /(link)/ig;
    var _regExp_autolink = new RegExp("( http| https| ftp| telnet| news| irc)://([-/.a-zA-Z0-9_~#%$?&=:200-377()]+( |\n\r))", "gi");

    switch (codeWriterType) {
        case 1:
            strValue = strValue.replace(_regExp_javaScript, "**");
            strValue = strValue.replace(_regExp_styleSheet, "**");
            strValue = strValue.replace(_regExp_object, "**");
            strValue = strValue.replace(_regExp_onClick, "**");
            //strValue = strValue.replace( _regExp_class, "**" );
            strValue = strValue.replace(_regExp_form, "**");
            strValue = strValue.replace(_regExp_embed, "**");
            strValue = strValue.replace(_regExp_bgsound, "**");
            strValue = strValue.replace(_regExp_script, "**");
            strValue = strValue.replace(_regExp_input, "**");
            strValue = strValue.replace(_regExp_linkrel, "**");
            break;
        case 2:
            strValue = strValue.replace(_regExp_javaScript, "**");
            strValue = strValue.replace(_regExp_styleSheet, "**");
            strValue = strValue.replace(_regExp_object, "**");
            strValue = strValue.replace(_regExp_onClick, "**");
            //strValue = strValue.replace( _regExp_class, "**" );
            strValue = strValue.replace(_regExp_form, "**");
            strValue = strValue.replace(_regExp_embed, "**");
            strValue = strValue.replace(_regExp_bgsound, "**");
            strValue = strValue.replace(_regExp_script, "**");
            strValue = strValue.replace(_regExp_input, "**");
            strValue = strValue.replace(_regExp_linkrel, "**");
            break;
        case 3:
            strValue = strValue.replace(_regExp_form, "**");
            strValue = strValue.replace(_regExp_autolink, "<a href='$1://$2'>$1://$2</a>");
            break;
    }
    return strValue;
};

String.prototype.noneTagFilter = function () {
    var strValue = this;
    var _regExp_movietag1 = /(?:<div * class=editorMovieArea id=newMovieArea.*?>)((\n|\r|.)*?)(?:<\/div>)/ig;
    var _regExp_movietag2 = /(?:<div.* id=newMovieArea.*?>)((\n|\r|.)*?)(?:<\/div>)/ig;
    var _regExp_tag = /(?:<(\n|\r|.)*?>)/ig;
    var _regExp_script = /(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig;
    var _regExp_style = /(?:<style.*?>)((\n|\r|.)*?)(?:<\/style>)/ig;
    var _regExp_empty = /&nbsp;/ig;
    strValue = strValue.replace(_regExp_movietag1, "");
    strValue = strValue.replace(_regExp_movietag2, "");
    strValue = strValue.replace(_regExp_style, "");
    strValue = strValue.replace(_regExp_script, "");
    strValue = strValue.replace(_regExp_tag, "");
    strValue = strValue.replace(_regExp_empty, "");
    return strValue
};

function htmlEditor() {
    this.objObject = new String;/**/
    this.editWindow = new String;
    this.varGetSelection = new String;
    this.iframeID = new String; /**/
    this.iframeIDStatus = 0;
    this.iframeDom = new String;
    this.textareaID = new String; /**/
    this.textareaDom = new String;
    this.styleBar = "selectBar";
    this.cssUrl = new String;/**/
    this.selection = new String;
    this.boxWidth = new String;/**/
    this.tempEmoChecked = new String;
    this.focusStatus = 0;
    this.editorAreaStatus = 0; // 0. 에디터영역 1.textarea 영역
    this.codeWriterType = 1; // 1.유저 2.작가단 3.어드민 /**/
    this.emoticonSrc = "https://ssl.nexon.com/S2/Game/Common/Editor/Emoticon/Nexon/";
    this.emoticonMapleSrc = "https://ssl.nexon.com/S2/Game/Common/Editor/Emoticon/Maplestory/";
    this.tempResultCode = new String;
    this.oidBoard = new String;
    this.oidArticle = new String;
    this.useFocusOut = new String;/**/
    this.currentSelectText = {};

    this.pageXMLInfoURL = "/common/movieplayer/movieplayerarticleinfo.aspx";/**/
    this.favorateXMLInfoURL = "/common/movieplayer/movieplayerfavoritearticle.aspx";/**/
    this.movieURLInfoURL = "/NxFile/Download/MovieDownloader.aspx";/**/
    this.imageURL = "/NxFile/download/FileDownloader.aspx";/**/

    this.disableArticleInfoPanel = false; //기본값:false/**/
    this.disableMovieListPanel = false; //기본값:false/**/
    this.disableScrapButton = false; //기본값:false/**/
    this.disableOtherMovieButton = false; //기본값:false/**/
    this.disableImagePopupViewer = false; // 기본값:팝업Viewer사용/**/

    this.mediaPlayerWidth = 600; //윈도 미디어 플레이어 가로사이즈/**/
    this.mediaPlayerHeight = 448; //윈도 미디어 플레이어 세로사이즈/**/
    this.ajaxMovieURL = "/NxFile/Download/MovieAmlDownloader.aspx";/**/
    this.XAMLURL = "/js/NexonPlayer.xaml";/**/
    this.fontURL = "/js/malgun.zip";/**/

    this.disablePlayerHtmlMessage = new String; //동영상플레이 사용하지 않을경우 대체문구

    this.standardTop = 0; //레이어팝업 기준 위치 (기준위치에 보정값을 더해주면 레이어창 Top수치)
    for (var i = 0; i < $("#frmWrite > div").length; i++) {
        if ($("#frmWrite > div")[i].className == "editor_sec") break;
        this.standardTop += $("#frmWrite > div")[i].clientHeight;
    }
    this.standardTop += Number($(".editor_sec").css("padding-top").split("px")[0]);
    this.standardTop += Number($(".editor_sec").css("margin-top").split("px")[0]);

    this.init = function (iframeID, cssUrl) {
        if (document.getElementsByName("editMode").length == 2) document.getElementsByName("editMode")[0].checked = true;

        this.iframeDom = document.getElementById(this.iframeID); //Iframe Dom Object
        this.textareaDom = document.getElementById(this.textareaID); //TextArea Dom Object
        this.iframeDom.style.display = "block";
        this.textareaDom.style.display = "none";

        this.changeEditorType("editWindow");
        document.getElementById(this.styleBar).style.display = "block";

        this.editWindow = this.iframeDom.contentWindow;
        this.editWindow.document.designMode = "on";

        if (this.editWindow.document.designMode.toLowerCase() == "on") {
            this.editWindow.document.open("text/html");
            if (cssUrl != "")
                this.editWindow.document.write(this.defineIframeStyle(cssUrl));
            else
                this.editWindow.document.write(this.defineIframeStyle());

            this.editWindow.document.close();
        }
        else {
            this.iframeDom.style.display = "none";
            this.textareaDom.style.display = "block";
            if (document.getElementsByName("editMode").length == 2) document.getElementsByName("editMode")[1].checked = true;
        }

        //적용
        if (this.textareaDom.innerHTML != "") { this.applyHtmlToIframe(this.textareaDom.innerHTML); }
        $(".uploadImage").attr("onclick", "editorPopup.uploadImgFilePopup( '/Community/Common/Popup/ImageUploader?emFileGameCode=MapleStory', 457, 448 ); return false;");
        if (this.browerCkeck() == "Internet Explorer" && Number(navigator.userAgent.match(/Trident\/(\d)/i)[1]) < 6) {
            $(".uploadImage").attr("onclick", "editorPopup.uploadImgFilePopup( '/Community/Common/Popup/ImageUploader?emFileGameCode=MapleStory', 457, 448 ); return false;");
        } else {
			if($("#textEditorFrame").hasClass("edBugReport"))
				$(".uploadImage").attr("onclick", "editorEventHandler.imgUpload(editorProc01, 249, this); return false;");
			else
				$(".uploadImage").attr("onclick", "editorEventHandler.imgUpload(editorProc01, 373, this); return false;");
        }
    };

    this.browerCkeck = function () {
        var agt = navigator.userAgent.toLowerCase();
        if (agt.indexOf("chrome") != -1) return 'Chrome';
        if (agt.indexOf("opera") != -1) return 'Opera';
        if (agt.indexOf("staroffice") != -1) return 'Star Office';
        if (agt.indexOf("webtv") != -1) return 'WebTV';
        if (agt.indexOf("beonex") != -1) return 'Beonex';
        if (agt.indexOf("chimera") != -1) return 'Chimera';
        if (agt.indexOf("netpositive") != -1) return 'NetPositive';
        if (agt.indexOf("phoenix") != -1) return 'Phoenix';
        if (agt.indexOf("firefox") != -1) return 'Firefox';
        if (agt.indexOf("safari") != -1) return 'Safari';
        if (agt.indexOf("skipstone") != -1) return 'SkipStone';
        if (agt.indexOf("msie") != -1) return 'Internet Explorer';
        if (agt.indexOf("netscape") != -1) return 'Netscape';
        if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
    };




    this.applyHtmlToIframe = function (htmlString) {
        if (htmlString != '') {
            this.editWindow.document.body.innerHTML = htmlString;
        }
    };
    this.defineIframeStyle = function (cssUrl) {
        if (cssUrl)
            return "<html><head><link rel='stylesheet' type='text/css' href='" + cssUrl + "' /></head><body></body></html>";
        else
            return ["<html><head><style type='text/css'>",
                "@font-face {font-family:'Nanum Square';font-style:normal;font-weight:400;src:url(https://maplestory.nexon.com/fonts/NanumSquareR.eot);src:url(https://maplestory.nexon.com/fonts/NanumSquareR.eot?#iefix) format('embedded-opentype'), url(https://maplestory.nexon.com/fonts/NanumSquareR.woff2) format('woff2'), url(https://maplestory.nexon.com/fonts/NanumSquareR.woff) format('woff'), url(https://maplestory.nexon.com/fonts/NanumSquareR.ttf) format('truetype');}",
                "@font-face {font-family:'Nanum Square';font-style:bold;font-weight:700;src:url(https://maplestory.nexon.com/fonts/NanumSquareB.eot);src:url(https://maplestory.nexon.com/fonts/NanumSquareB.eot?#iefix) format('embedded-opentype'), url(https://maplestory.nexon.com/fonts/NanumSquareB.woff2) format('woff2'), url(https://maplestory.nexon.com/fonts/NanumSquareB.woff) format('woff'), url(https://maplestory.nexon.com/fonts/NanumSquareB.ttf) format('truetype');}",
                "* {margin:0;padding:0;list-style:none;border:0;text-decoration:none;font-family:'Malgun Gothic', sans-serif;letter-spacing:-0.06em;}",
                "table {border-collapse:collapse; border-spacing:0;}",
                "body {font-size:16px;line-height:32px;word-break: break-all;}",
                "a {text-decoration:none;}",
				"hr {display:block;unicode-bidi:isolate;margin-block-start:0.5em;margin-block-end:0.5em;margin-inline-start:auto;margin-inline-end:auto;overflow:hidden;border-style:inset;border-width:1px;}",
				"u {text-decoration:underline;}",
                "</style></head><body></body></html>"].join("");
    };
	
    this.applyTag = function (actions, values) {
        if (this.iframeIDStatus == "0") {
            if (typeof (values) == "undefined") {
                if (actions.toLowerCase() == "inserthorizontalrule" && NgbBrowser.msie()) this.getSelection();
                this.editWindow.document.execCommand(actions, false, null);
            }
            else
                this.editWindow.document.execCommand(actions, false, values);
            this.editWindow.focus();
        }
    };
    this.changeEditorType = function (editorType) {
        if (this.textareaID == editorType) {
            if (this.editorAreaStatus != 1) {
                this.editorAreaStatus = 1;
                this.tempResultCode = this.convertHtmlMode();
                this.textareaDom.value = this.tempResultCode;
                this.iframeDom.style.display = "none";
                this.textareaDom.style.display = "block";
                this.iframeIDStatus = 1;
            }
        }
        else if (this.iframeID == editorType) {
            if (this.editorAreaStatus != 0) {
                this.editorAreaStatus = 0;
                this.tempResultCode = this.convertEditMode();
                this.editWindow.document.body.innerHTML = this.tempResultCode;
                this.iframeDom.style.display = "block";
                this.textareaDom.style.display = "none";
                this.iframeIDStatus = 0;
            }
        }
    };
    this.getSelection = function () {
        if (this.varGetSelection == "") {
            this.editWindow.focus();
            if (this.editWindow.document.selection) this.varGetSelection = this.editWindow.document.selection.createRange();
            else this.varGetSelection = this.editWindow.getSelection().getRangeAt(0);
        }
        else {
            this.unlockEditorSec("editorLayerSec");
            this.editWindow.focus();
            if (this.editWindow.document.selection) this.varGetSelection = this.editWindow.document.selection.createRange();
            else this.varGetSelection = this.editWindow.getSelection().getRangeAt(0);
        }
        return this.varGetSelection;
    };
    this.setSelection = function () {
        this.editWindow.document.getElementsByTagName("Body")[0].focus();
        if (this.editWindow.document.selection) this.varGetSelection.select();
    };
    this.focusOut = function (target) {
        var domID = document.getElementById(target)
        domID.focus();
    };
    this.setColor = function (color) {
        document.getElementById("editorColorSelectionTempColor").style.backgroundColor = color;
        document.getElementById("editorColorSelectionTempColorText").value = color;

        //editorProc01.selectColor('editorLayerSec', 'foreColor', editorProc01);
    };
    this.setColorConfirm = function (color, action) {
        document.getElementById("editorColorSelectionTempColor").style.backgroundColor = color;
        document.getElementById("editorColorSelectionTempColorText").value = color;

        this.selectColor('editorLayerSec', action, this);
    };
    this.setSize = function (color) {
        document.getElementById("editorColorSelectionTempColor").style.backgroundColor = color;
        document.getElementById("editorColorSelectionTempColorText").value = color;

        //editorProc01.selectColor('editorLayerSec', 'foreColor', editorProc01);
    };
    this.setSizeConfirm = function (size) {
        //document.getElementById("editorColorSelectionTempColor").style.backgroundColor = color;
        //document.getElementById("editorColorSelectionTempColorText").value = color;
        //func.applyTag("fontsize", func.selectBoxHandler(selectId))

        editorLayer.clearLayer('editorLayerSec', editorProc01);
        this.setSelection();
        this.applyTag("fontsize", size);
    };
    this.selectColor = function (idValue, action, func) {
        if (document.getElementById("editorColorSelectionTempColorText").value == "") {
            alert("칼라가 선택되지 않았습니다.");
            return false;
        }
        else {
            var val = document.getElementById("editorColorSelectionTempColorText").value;
        }
        editorLayer.clearLayer(idValue, func);
        if (action == "backColor") {
            if (this.editWindow.document.selection) {
                this.setSelection();
                this.applyTag(action, val);
            }
            else {
                this.setSelection();
                this.applyTag("hilitecolor", val);
            }
        }
        else {
            this.setSelection();
            this.applyTag(action, val);
        }
    };
    this.selectLink = function (idValue, action, func) {
        var linkVal = document.getElementById("editorLinkInput").value;
        
        if (linkVal == "" || (linkVal + "").toLowerCase() == "http://" || (linkVal + "").toLowerCase() == "https://") {

            alert("링크주소(URL)를 입력해주세요.");
            return false;
        } else {
            if (linkVal.indexOf("://") == -1) {
                alert("\"http://\" 또는 \"https://\"로 시작하는 링크주소(URL)를 넣어주세요.");
                return false;
            }

            this.unlockEditorSec("editorLayerSec");
            editorLayer.clearLayer(idValue, func);

            this.currentSelectText.displayText = (this.currentSelectText.fullText != "" && this.currentSelectText.startOffset != this.currentSelectText.endOffset) ? this.currentSelectText.fullText.substring(this.currentSelectText.startOffset, this.currentSelectText.endOffset) : linkVal;
            this.setSelection();

            var innerLink = "<a href ='" + linkVal + "' target='_blank'>" + this.currentSelectText.displayText + "</a>";

			
			
            if (this.currentSelectText.startOffset == 0 && this.currentSelectText.endOffset == 0)
            {
                this.editWindow.document.getElementsByTagName('body')[0].innerHTML += innerLink;
            }
            else
            {
                this.varGetSelection.deleteContents();
                this.varGetSelection.insertNode(this.varGetSelection.createContextualFragment(innerLink));
            }
        }
    };
    this.itemSearchCall = function ()
    {
        if (!$("#editorSearchItemInput").val())
        {
            alert("검색어를 입력하세요.");
            $("#editorSearchItemInput").focus();
            return false;
        }
		if ($("#editorSearchItemInput").val().length < 2)
        {
            alert("검색어는 2자 이상 입력하세요.");
            $("#editorSearchItemInput").focus();
            return false;
        }
        $("#item-list").html("<img src='https://ssl.nexon.com/S2/Game/Common/Editor/images/ico_searching.gif' />").scrollTop(0);

        $.ajax({
            type: "get",
            url: "/common/resource/item/search/" + $("#editorSearchItemInput").val(),
            success: function (response)
            {
                $("#item-list").html(response).scrollTop(0);
				setTimeout(function(){
					if($("#item-list li").length < 1) {
						$("#item-list").html("<div>검색된 결과가 없습니다.</div>");
					}
				},50);
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                console.log(jqXHR.responseText);
            }
        });
    };
    this.selectBoxHandler = function (selectId) {
        var cursel = document.getElementById(selectId).selectedIndex;
        if (cursel != 0) {
            return document.getElementById(selectId).options[cursel].value;
        }
    };
    this.emoListByCate = function (category) {
        var count = 0;
        editorDataSet.tempEmoList = new Array; //배열 초기화(꽁수)
        for (var i = 0; i < editorDataSet.emoList.length; ++i) {
            if (editorDataSet.emoList[i].n1Category == category) {
                editorDataSet.tempEmoList[count] = {
                    strFileName: editorDataSet.emoList[i].strFileName,
                    strName: editorDataSet.emoList[i].strName,
                    n1Category: editorDataSet.emoList[i].n1Category
                }
                ++count;
            }
        }
    };

    this.addTempMapleItem = function (imgSrc) {
        this.tempEmoChecked = imgSrc;
        this.selectMapleItem('editorLayerSec', this);
    };
    this.selectMapleItem = function (idValue, func) {
        if (this.tempEmoChecked != "") {
			/*
			if ($(func.tempEmoChecked).find("img").attr("src").indexOf("ico_noimage.png") == -1){
				innerEmoticon = [
					'<img data-item-code="', $(func.tempEmoChecked).attr("data-item-code"), '" class="itembox" style="display:block;margin-top:5px;padding:', ((58 - $(func.tempEmoChecked).find("img").height()) / 2) + 'px ', ((58 - $(func.tempEmoChecked).find("img").width()) / 2) + 'px;background-color:#fbfdff;border:1px solid #d0d8e8;" onerror="this.src=\'https://ssl.nexon.com/S2/Game/Common/Editor/images/ico_noimage.png\'" alt="', $(func.tempEmoChecked).find(".item-title").html(), '" src="', $(func.tempEmoChecked).find("img").attr("src"),'"><input id="emofocus"/>'
				].join("");
			}else{
				innerEmoticon = [
					'<div contenteditable="false" data-item-code="', $(func.tempEmoChecked).attr("data-item-code"), '" class="itembox" style="width:145px;height:58px;margin-top:5px;padding:0 12px;line-height:58px;background-color:#fbfdff;border:1px solid #d0d8e8;overflow:hidden;text-overflow:ellipsis;word-break:break-all;white-space:nowrap;">', $(func.tempEmoChecked).find(".item-title").html(),'</div><input id="emofocus"/>'
				].join("");
			}
			'<a style="border: 1px solid rgb(208, 216, 232); border-image: none; width: 248px; height: 70px; text-align: center; color: rgb(53, 53, 53); line-height: 70px; font-size: 15px; display: block;" contenteditable="false" href="javascript:void(0);" data-item-code="', $(func.tempEmoChecked).attr("data-item-code"),'" clsaa="itembox">',
                '<span class="item-slot" style="width: 70px; height: 70px; text-align: center; margin-right: 15px; float: left; display: block; background-color: rgb(251, 253, 255);"><img style="margin-top: ', ((70 - $(func.tempEmoChecked).find("img").height()) / 2) + "px", ';" onerror="this.src=\'https://ssl.nexon.com/S2/Game/Common/Editor/images/ico_noimage.png\'" alt="', $(func.tempEmoChecked).find(".item-title").html(), '" src="', $(func.tempEmoChecked).find("img").attr("src"),'"></span>',
                '<span class="item-title" style="width: 145px; text-align: left; overflow: hidden; float: left; display: block; white-space: nowrap; -ms-word-break: break-all; -ms-text-overflow: ellipsis;">', $(func.tempEmoChecked).find(".item-title").html(),'</span>',
                '</a><div><input class="itemfocus_', $(func.tempEmoChecked).attr("data-item-code"),'" ></div>'
			*/
			
			innerEmoticon = [
					'<img data-item-code="', $(func.tempEmoChecked).attr("data-item-code"), '" class="itembox" style="/*display:block;*/margin:5px 5px 0 0;padding:', ((58 - $(func.tempEmoChecked).find("img").height()) / 2) + 'px ', ((58 - $(func.tempEmoChecked).find("img").width()) / 2) + 'px;background-color:#fbfdff;border:1px solid #d0d8e8;" onerror="this.src=\'https://ssl.nexon.com/S2/Game/Common/Editor/images/ico_noimage.png\'" alt="', $(func.tempEmoChecked).find(".item-title").html(), '" src="', $(func.tempEmoChecked).find("img").attr("src"),'"><input id="emofocus"/>'
				].join("");
            this.editWindow.focus();

            if (this.editWindow.document.selection) {
                this.varGetSelection.pasteHTML(innerEmoticon);
            }
            else {
                this.varGetSelection.deleteContents();
                this.varGetSelection.insertNode(this.varGetSelection.createContextualFragment(innerEmoticon));
                /* 
                if (this.varGetSelection.startOffset == 0) {
                    //$(this.editWindow.document.getElementsByTagName('body')[0]).append(innerEmoticon);
                    this.editWindow.document.getElementsByTagName('body')[0].innerHTML += innerEmoticon;
                }
                else {
                    this.varGetSelection.deleteContents();
                    this.varGetSelection.insertNode(this.varGetSelection.createContextualFragment(innerEmoticon));
                } */
            }

            editorLayer.clearLayer(idValue, func); //editWindow
            $(this.editWindow.document.getElementById('emofocus')).focus().remove();

        }
        else {
            alert("선택된 아이템이 없습니다.");
            return false;
        }
    };

    this.addTempEmoticon = function (imgSrc) {
        this.tempEmoChecked += "," + imgSrc;
        this.selectEmoticon('editorLayerSec', this);
    };
    this.addTempEmoticonMaple = function (imgSrc) {
        this.tempEmoChecked += "," + imgSrc;
        this.selectEmoticonMaple('editorLayerSec', this);
    };
    this.selectEmoticon = function (idValue, func) {
        if (this.tempEmoChecked != "") {
            func.tempEmoChecked = this.tempEmoChecked.substring(1);
            var imgSrcArray = this.tempEmoChecked.split(',');
            var innerEmoticon = "";

            for (var i = 0; i < imgSrcArray.length; ++i) {
                var emoTitle = imgSrcArray[i].toLocaleUpperCase().split(".")[0];
                emoTitle = emoTitle.split("-")[1];
                innerEmoticon += "<img src=\"" + this.emoticonSrc + imgSrcArray[i] + "\" border=\"0\" alt=\"" + emoTitle + "\" /><input id='emofocus'/>";
            }
            this.editWindow.focus();
            if (this.editWindow.document.selection) {
                this.varGetSelection.pasteHTML(innerEmoticon);
            }
            else {
                this.varGetSelection.deleteContents();
                this.varGetSelection.insertNode(this.varGetSelection.createContextualFragment(innerEmoticon));
                   /* 
                if (this.varGetSelection.startOffset == 0) {
                    this.editWindow.document.getElementsByTagName('body')[0].innerHTML += innerEmoticon;
                }
                else {
                    this.varGetSelection.deleteContents();
                    this.varGetSelection.insertNode(this.varGetSelection.createContextualFragment(innerEmoticon));
                }*/
            }
            editorLayer.clearLayer(idValue, func); //editWindow
			$(this.editWindow.document.getElementById('emofocus')).focus().remove();
        }
        else {
            alert("선택된 이모티콘이 없습니다.");
            return false;
        }
    };
    this.selectEmoticonMaple = function (idValue, func) {
        if (this.tempEmoChecked != "") {
            func.tempEmoChecked = this.tempEmoChecked.substring(1);
            var imgSrcArray = this.tempEmoChecked.split(',');
            var innerEmoticon = "";

            for (var i = 0; i < imgSrcArray.length; ++i) {
                var emoTitle = imgSrcArray[i].split(".")[0];
                innerEmoticon += "<img src=\"" + this.emoticonMapleSrc + imgSrcArray[i] + "\" border=\"0\" alt=\"" + emoTitle + "\" /><input id='emofocus'/>";
            }
            this.editWindow.focus();
            if (this.editWindow.document.selection) {
                this.varGetSelection.pasteHTML(innerEmoticon);
            }
            else {
                this.varGetSelection.deleteContents();
                this.varGetSelection.insertNode(this.varGetSelection.createContextualFragment(innerEmoticon));
                /*
                if (this.varGetSelection.startOffset == 0) {
                    this.editWindow.document.getElementsByTagName('body')[0].innerHTML += innerEmoticon;
                }
                else {
                    this.varGetSelection.deleteContents();
                    this.varGetSelection.insertNode(this.varGetSelection.createContextualFragment(innerEmoticon));
                }*/
            }
            editorLayer.clearLayer(idValue, func); //editWindow
			$(this.editWindow.document.getElementById('emofocus')).focus().remove();
        }
        else {
            alert("선택된 이모티콘이 없습니다.");
            return false;
        }
    };
    this.imageResizeClassSet = function () {
        var imgArray = this.editWindow.document.getElementsByTagName("img");
        if (imgArray.length > 0) {
            for (var i = 0 ; i < imgArray.length; ++i) {
                if (imgArray[i].width >= this.boxWidth) {
                    imgArray[i].className = "editorImgResize";
                }
            }
        }
    };
    this.imageResize = function (func, targetWidth, targetId) {
        if (!targetId && !targetWidth) {
            var imgArray = document.getElementsByTagName("img");
            if (imgArray.length > 0) {
                for (var i = 0 ; i < imgArray.length; ++i) {
                    if (imgArray[i].className == "editorImgResize") {
                        var imgSrc = imgArray[i].src;
                        var imgWidth = imgArray[i].width;
                        var imgHeight = imgArray[i].height;

                        imgArray[i].setAttribute("style", "cursor:pointer")
                        imgArray[i].width = this.boxWidth;
                        if (imgArray[i].width != this.boxWidth) imgArray[i].width = this.boxWidth;
                        if (!this.disableImagePopupViewer) {
                            if (NgbBrowser.msie()) {
                                imgArray[i].onclick = function () {
                                    eval(func).popupForResizeImage(this.src, imgWidth, imgHeight);
                                }
                            }
                            else {
                                imgArray[i].setAttribute("onclick", func + ".popupForResizeImage(\"" + imgArray[i].getAttribute('src') + "\"," + imgWidth + "," + imgHeight + ")");
                            }
                        }
                    }
                }
            }
        }
        else {
            if (!targetWidth) targetWidth = this.boxWidth;
            var imgArray = document.getElementById(targetId).getElementsByTagName("img");
            if (imgArray.length > 0) {
                for (var i = 0 ; i < imgArray.length; ++i) {
                    if (parseInt(imgArray[i].width) > parseInt(targetWidth)) {
                        var imgSrc = imgArray[i].src;
                        var imgWidth = imgArray[i].width;
                        var imgHeight = imgArray[i].height;

                        imgArray[i].setAttribute("style", "cursor:pointer");
                        imgArray[i].width = targetWidth;
                        if (imgArray[i].width != targetWidth) imgArray[i].width = targetWidth;
                        if (!this.disableImagePopupViewer) {
                            if (NgbBrowser.msie()) {
                                imgArray[i].onclick = function () {
                                    eval(func).popupForResizeImage(this.src, imgWidth, imgHeight)
                                }
                            }
                            else {
                                imgArray[i].setAttribute("onclick", func + ".popupForResizeImage(\"" + imgArray[i].getAttribute('src') + "\"," + imgWidth + "," + imgHeight + ")");
                            }
                        }
                    }
                }
            }
        }
    };
    this.movieViewSet = function (viewAreaId, playerType, disablePlayer) {
        var divArray = document.getElementById(viewAreaId).getElementsByTagName("div");
        if (divArray.length > 0) {
            var resultOidFile = "";
            var resultID = "";
            var countMovie = "0";
            var resultOidThumb = "";
            var playTime = "";
            var resultMovieThumbSNList = "";
            var resultMovieThumbPlayTimeList = "";

            for (var i = 0 ; i < divArray.length; i++) {
                var divID = divArray[i].id;
                if (divID.indexOf("_MOVIE_") != "-1") {

                    var startIndex = divID.indexOf("_MOVIE_") + 7;
                    resultOidFile = divID.substring(startIndex);
                    var endIndex = "";
                    var reg = /[^0-9]/gi;
                    if (resultOidFile.search(reg) != "-1") {
                        var endIndex = resultOidFile.search(reg);
                        resultOidFile = resultOidFile.substring(0, endIndex)
                    }
                    var vodThumbSrcString = resultID.split(":");
                    if (!vodThumbSrcString[3] || vodThumbSrcString[3] == "notThumb")
                        resultOidThumb = "https://ssl.nexon.com/S2/Portal/Nexon/Nexon2007/image/gch/img_none.jpg";
                    else
                        resultOidThumb = this.imageURL + "?oidFile=" + vodThumbSrcString[3];
                    playTime = "0";
                }
                else if (divID.indexOf("newMovieArea") != "-1") {
                    if (parseInt(disablePlayer) == 1) {
                        document.getElementById(divArray[i].id).style.backgroundImage = "none";
                        document.getElementById(divArray[i].id).style.height = "auto";
                        document.getElementById(divArray[i].id).innerHTML = this.disablePlayerHtmlMessage;
                    }
                    else {
                        var randVal = Math.round(Math.random() * 1000);
                        var getArraySpan = divArray[i].getElementsByTagName("span");
                        if (getArraySpan.length < 6) {
                            resultMovieThumbSNList = "";
                            resultMovieThumbPlayTimeList = "";
                        }
                        for (var j = 0; j < getArraySpan.length; j++) {
                            switch (getArraySpan[j].className) {
                                case "oidMovieFile":
                                    resultOidFile = getArraySpan[j].firstChild.nodeValue;
                                    break;
                                case "oidMovieThumb":
                                    resultOidThumb = this.imageURL + "?oidFile=" + getArraySpan[j].firstChild.nodeValue;
                                    break;
                                case "n4PlayTime":
                                    playTime = getArraySpan[j].firstChild.nodeValue;
                                    break;
                                case "strMovieThumbSNList":
                                    resultMovieThumbSNList = getArraySpan[j].firstChild.nodeValue;
                                    break;
                                case "MovieThumbPlayTimeList":
                                    resultMovieThumbPlayTimeList = getArraySpan[j].firstChild.nodeValue;
                                    break;
                                default:
                                    break;
                            }
                        }
                        divArray[i].id = "newMovieResult" + resultOidFile + "-" + randVal;
                    }
                }
                if (resultOidFile != "") {
                    document.getElementById(divArray[i].id).style.backgroundImage = "none";
                    document.getElementById(divArray[i].id).style.width = "auto";
                    document.getElementById(divArray[i].id).style.height = "auto";

                    if (!playerType || playerType == 0) {
                        //silverlight WiseLog
                        var pageXMLInfo = this.pageXMLInfoURL + "?oidBoard=" + this.oidBoard + "&oidArticle=" + this.oidArticle;
                        var favorateXMLInfo = this.favorateXMLInfoURL;
                        var movieURLInfo = this.movieURLInfoURL + "?oidFile=" + resultOidFile + "&oidBoard=" + this.oidBoard + "&oidArticle=" + this.oidArticle;
                        var movieFileInfo = resultOidFile;
                        var movieId = "silverlightAreaId" + resultOidFile;
                        var nexonPlayer1 = new SilverlightControl();

                        nexonPlayer1.articleXML = pageXMLInfo;
                        nexonPlayer1.recommandXML = favorateXMLInfo;

                        nexonPlayer1.movieURL = unescape(movieURLInfo);
                        nexonPlayer1.movieFileInfo = movieFileInfo;
                        nexonPlayer1.XAMLURL = this.XAMLURL;
                        nexonPlayer1.fontURL = this.fontURL;
                        nexonPlayer1.ID = movieId + "-" + Math.round(Math.random() * 1000);
                        nexonPlayer1.parentID = divArray[i].id;
                        nexonPlayer1.oidArticle = this.oidArticle;
                        nexonPlayer1.oidBoard = this.oidBoard;
                        if (resultMovieThumbSNList != "") {
                            var resultMovieThumbSNListArray = resultMovieThumbSNList.split(",");
                            if (resultMovieThumbSNListArray.length == 6) {
                                var _tempResultString = "";
                                for (var k = 0 ; k < resultMovieThumbSNListArray.length; k++) {
                                    _tempResultString += "," + this.imageURL + "?oidFile=" + resultMovieThumbSNListArray[k];
                                }
                                resultMovieThumbSNList = _tempResultString.substr(1);
                            }
                        }
                        nexonPlayer1.previewThumbList = resultMovieThumbSNList;
                        nexonPlayer1.previewPlayTimeList = resultMovieThumbPlayTimeList;

                        nexonPlayer1.disableArticleInfoPanel = this.disableArticleInfoPanel;
                        nexonPlayer1.disableMovieListPanel = this.disableMovieListPanel;
                        nexonPlayer1.disableScrapButton = this.disableScrapButton;
                        nexonPlayer1.disableOtherMovieButton = this.disableOtherMovieButton;

                        nexonPlayer1.bWindowless = true;
                        nexonPlayer1.mediaPlayerWidth = this.mediaPlayerWidth;
                        nexonPlayer1.mediaPlayerHeight = this.mediaPlayerHeight;
                        nexonPlayer1.ajaxMovieURL = this.ajaxMovieURL
                        try {
                            nexonPlayer1.thumbnailURL = resultOidThumb;
                            nexonPlayer1.playtime = parseInt(playTime);
                        }
                        catch (e) {
                            nexonPlayer1.thumbnailURL = "https://ssl.nexon.com/S2/Portal/Nexon/Nexon2007/image/gch/img_none.jpg";
                            nexonPlayer1.playtime = "0";
                        }
                        nexonPlayer1.footerURL = "https://ssl.nexon.com/S2/Portal/Nexon/Nexon2007/image/global/img_nexonplay.jpg";
                        nexonPlayer1.createControl();
                        resultOidFile = "";
                        resultOidThumb = "";
                        playTime = "";
                        resultMovieThumbSNList = "";
                        resultMovieThumbPlayTimeList = "";
                    }
                    else {
                        var MP = new MediaPlayer();
                        MP.ClientID = "silverlightAreaId" + resultOidFile + "-" + Math.round(Math.random() * 1000);
                        MP.n4Width = this.mediaPlayerWidth;
                        MP.n4Height = this.mediaPlayerHeight;
                        MP.ajaxMovieURL = this.ajaxMovieURL;
                        document.getElementById(divArray[i].id).innerHTML = MP.Write();
                        MP.versionCheck(MP.ClientID);
                        MP.LoadFile(resultOidFile, MP.ClientID);
                    }
                }
            }
        }
    };
    this.popupForResizeImage = function (imgUri, imgWidth, imgHeight) {
        var popOption = "left=0, top=0, width=" + imgWidth + ",height=" + imgHeight + ",toolbar=no,status=no,directories=no,scrollbars=no,location=no,resizable=no,menubar=no";
        var imgWin = window.open("", "", popOption);
        imgWin.document.write("<html><head><title>Nexon Image Viewer</title></head>");
        imgWin.document.write("<body topmargin=0 leftmargin=0>");
        imgWin.document.write("<img src='" + imgUri + "' onclick='self.close(); return false;' style='cursor:pointer;'>");
        imgWin.document.write("<scr" + "ipt>var imgDom = document.getElementsByTagName('img')[0];var imgWidth = imgDom.width + 4;var imgHeight = imgDom.height + 28;window.resizeTo (imgWidth,imgHeight)</sc" + "ript>");
        imgWin.document.write("</body>");
        imgWin.document.write("</head>");
    };
    this.lockEditorSec = function (idValue) {

        if (typeof (idValue) != "undefined") { document.getElementById(idValue).focus(); }
        if (NgbBrowser.msie())
            this.editWindow.document.getElementsByTagName("body")[0].disabled = true;
        else if (NgbBrowser.firefox())
            this.editWindow.document.execCommand("contentReadOnly", false, true);
        this.iframeIDStatus = 1;
    };
    this.unlockEditorSec = function () {
        if (NgbBrowser.msie())
            this.editWindow.document.getElementsByTagName("body")[0].disabled = false;
        else if (NgbBrowser.firefox())
            this.editWindow.document.execCommand("contentReadOnly", false, false);
        this.iframeIDStatus = 0;
        this.editWindow.focus();
    };
    this.convertHtmlMode = function () {
        var resultHtml = this.editWindow.document.getElementsByTagName('body')[0].innerHTML;
        resultHtml = resultHtml.HtmlTagFilter(this.codeWriterType);
        return resultHtml;
    };
    this.convertEditMode = function () {
        this.textareaDom.value = this.textareaDom.value.HtmlTagFilter(this.codeWriterType);
        return this.textareaDom.value;
    };


    this.returnResultThumb = function () {
        var resultHtml = this.editWindow.document.getElementsByTagName('body')[0].innerHTML;
        if (this.editorAreaStatus == 1) {
            this.tempResultCode = this.textareaDom.value;
        }
        else {
            this.tempResultCode = resultHtml;
        }
        resultHtml = this.tempResultCode;
        var imgArray = this.editWindow.document.getElementsByTagName('body')[0].getElementsByTagName('img');
        var returnImgOidFileCode = "";
        for (var i = 0; i < imgArray.length; ++i) {
            var imgSrcString = imgArray[i].src;
            if (returnImgOidFileCode == "" && imgSrcString.indexOf("oidFile=") != "-1") {
                var startIndex = imgSrcString.indexOf("oidFile=") + 8;
                imgSrcString = imgSrcString.substring(startIndex);
                var endIndex = "";
                var reg = /[^0-9]/gi;
                if (imgSrcString.search(reg) != "-1") {
                    var endIndex = imgSrcString.search(reg);
                    imgSrcString = imgSrcString.substring(0, endIndex)
                }
                returnImgOidFileCode = imgSrcString;
            }
        }
        return returnImgOidFileCode;
    };
    this.returnResultImageList = function () {
        var resultHtml = this.returnResultHtml();
        var imgArray = this.editWindow.document.getElementsByTagName('body')[0].getElementsByTagName('img');
        var returnImgOidFileCode = "";
        for (var i = 0; i < imgArray.length; ++i) {
            var imgSrcString = imgArray[i].src;
            if (imgSrcString.indexOf("oidFile=") != "-1") {
                var startIndex = imgSrcString.indexOf("oidFile=") + 8;
                imgSrcString = imgSrcString.substring(startIndex);
                var endIndex = "";
                var reg = /[^0-9]/gi;
                if (imgSrcString.search(reg) != "-1") {
                    var endIndex = imgSrcString.search(reg);
                    imgSrcString = imgSrcString.substring(0, endIndex)
                }
                if (returnImgOidFileCode != "") returnImgOidFileCode += ",";
                returnImgOidFileCode += imgSrcString;
            }
        }
        return returnImgOidFileCode;
    };
    this.returnResultImageCount = function () {
        var strImgList = this.returnResultImageList();
        return strImgList == '' ? 0 : strImgList.split(',').length;
    };
    this.returnResultVodThumbList = function () {
        var resultHtml = this.returnResultHtml();
        var vodThumbArray = this.editWindow.document.getElementsByTagName('body')[0].getElementsByTagName('div');
        var returnVodThumbOidFileCode = "";
        for (var i = 0; i < vodThumbArray.length; ++i) {
            var vodThumbSrcString = vodThumbArray[i].style.backgroundImage;
            var vodSrcString = vodThumbArray[i].id;
            if (vodThumbSrcString.indexOf("oidFile=") != "-1") {
                var startIndex = vodThumbSrcString.indexOf("oidFile=") + 8;
                vodThumbSrcString = vodThumbSrcString.substring(startIndex);
                var endIndex = "";
                var reg = /[^0-9]/gi;
                if (vodThumbSrcString.search(reg) != "-1") {
                    var endIndex = vodThumbSrcString.search(reg);
                    vodThumbSrcString = vodThumbSrcString.substring(0, endIndex)
                }
                if (returnVodThumbOidFileCode != "") returnVodThumbOidFileCode += ",";
                returnVodThumbOidFileCode += vodThumbSrcString;
            }
            else if (vodSrcString.indexOf("newMovieArea") != "-1") {
                if (returnVodThumbOidFileCode != "") returnVodThumbOidFileCode += ",";

                var spanArray = vodThumbArray[i].getElementsByTagName("span");
                for (var j = 0; j < spanArray.length; ++j) {
                    if (spanArray[j].className == "oidMovieThumb") {
                        returnVodThumbOidFileCode += spanArray[j].firstChild.nodeValue;
                    }
                }
            }
        }
        return returnVodThumbOidFileCode;
    };
    this.returnResultVodList = function () {
        var resultHtml = this.returnResultHtml();
        var vodArray = this.editWindow.document.getElementsByTagName('body')[0].getElementsByTagName('div');
        var returnVodOidFileCode = "";
        for (var i = 0; i < vodArray.length; ++i) {
            var vodSrcString = vodArray[i].id;
            if (vodSrcString.indexOf("_MOVIE_") != "-1") {
                var startIndex = vodSrcString.indexOf("_MOVIE_") + 7;
                vodSrcString = vodSrcString.substring(startIndex);
                var endIndex = "";
                var reg = /[^0-9]/gi;
                if (vodSrcString.search(reg) != "-1") {
                    var endIndex = vodSrcString.search(reg);
                    vodSrcString = vodSrcString.substring(0, endIndex)
                }
                if (returnVodOidFileCode != "") returnVodOidFileCode += ",";
                returnVodOidFileCode += vodSrcString;
            }
            else if (vodSrcString.indexOf("newMovieArea") != "-1") {
                var spanArray = vodArray[i].getElementsByTagName("span");
                for (var j = 0; j < spanArray.length; ++j) {
                    if (spanArray[j].className == "oidMovieFile") {
                        if (returnVodOidFileCode != "") returnVodOidFileCode += ",";
                        returnVodOidFileCode += spanArray[j].firstChild.nodeValue;
                    }
                }
            }
        }
        return returnVodOidFileCode;
    };
    this.returnResultVodCount = function () {
        var strVodList = this.returnResultVodList();
        return strVodList == '' ? 0 : strVodList.split(',').length;
    };
    this.returnResultVodTagList = function () {
        var resultHtml = this.returnResultHtml();
        var vodArray = this.editWindow.document.getElementsByTagName('body')[0].getElementsByTagName('div');
        var returnVodTagList = "";
        for (var i = 0; i < vodArray.length; ++i) {
            var vodSrcString = vodArray[i].id;
            if (vodSrcString.indexOf("_MOVIE_") != "-1") {
                if (returnVodTagList != "") returnVodTagList += ",";
                returnVodTagList += 0;
            }
            else if (vodSrcString.indexOf("newMovieArea") != "-1") {
                var spanArray = vodArray[i].getElementsByTagName("span");
                for (var j = 0; j < spanArray.length; ++j) {
                    if (spanArray[j].className == "movieTag") {
                        var spanText = spanArray[j].firstChild.nodeValue;
                        if (spanText.charAt(spanText.length - 1) == ",")
                            spanText = spanText.substring(0, spanText.length - 1);

                        if (returnVodTagList != "")
                            returnVodTagList += ",";
                        returnVodTagList += spanText;
                    }
                }
            }
        }
        return returnVodTagList;
    };
    this.returnResultVodPlayTimeList = function () {
        var resultHtml = this.returnResultHtml();
        var vodArray = this.editWindow.document.getElementsByTagName('body')[0].getElementsByTagName('div');
        var returnVodPlaytimeList = "";
        for (var i = 0; i < vodArray.length; ++i) {
            var vodSrcString = vodArray[i].id;
            if (vodSrcString.indexOf("_MOVIE_") != "-1") {
                if (returnVodPlaytimeList != "") returnVodPlaytimeList += ",";
                returnVodPlaytimeList += 0;
            }
            else if (vodSrcString.indexOf("newMovieArea") != "-1") {
                var spanArray = vodArray[i].getElementsByTagName("span");
                for (var j = 0; j < spanArray.length; ++j) {
                    if (spanArray[j].className == "n4PlayTime") {
                        if (returnVodPlaytimeList != "") returnVodPlaytimeList += ",";
                        returnVodPlaytimeList += spanArray[j].firstChild.nodeValue;
                    }
                }
            }
        }
        return returnVodPlaytimeList;
    };
    this.returnResultMovieThumbList = function () {
        var resultHtml = this.returnResultHtml();
        var vodArray = this.editWindow.document.getElementsByTagName('body')[0].getElementsByTagName('div');
        var returnMovieThumbList = "";
        for (var i = 0; i < vodArray.length; ++i) {
            var vodSrcString = vodArray[i].id;
            if (vodSrcString.indexOf("_MOVIE_") != "-1") {
                if (returnMovieThumbList != "") returnMovieThumbList += ",";
                returnMovieThumbList += 0;
            }
            else if (vodSrcString.indexOf("newMovieArea") != "-1") {
                var spanArray = vodArray[i].getElementsByTagName("span");
                for (var j = 0; j < spanArray.length; ++j) {
                    if (spanArray[j].className == "strMovieThumbSNList") {
                        if (returnMovieThumbList != "") returnMovieThumbList += ",";
                        if (spanArray[j].firstChild && spanArray[j].firstChild.nodeValue != "") { returnMovieThumbList += spanArray[j].firstChild.nodeValue };
                    }
                }
            }
        }
        return returnMovieThumbList;
    };
    this.returnResultMovieThumbPlayTimeList = function () {
        var resultHtml = this.returnResultHtml();
        var vodArray = this.editWindow.document.getElementsByTagName('body')[0].getElementsByTagName('div');
        var returnMovieThumbPlayTimeList = "";
        for (var i = 0; i < vodArray.length; ++i) {
            var vodSrcString = vodArray[i].id;
            if (vodSrcString.indexOf("_MOVIE_") != "-1") {
                if (returnMovieThumbPlayTimeList != "") returnMovieThumbPlayTimeList += ",";
                returnMovieThumbPlayTimeList += 0;
            }
            else if (vodSrcString.indexOf("newMovieArea") != "-1") {
                var spanArray = vodArray[i].getElementsByTagName("span");
                for (var j = 0; j < spanArray.length; ++j) {
                    if (spanArray[j].className == "MovieThumbPlayTimeList") {
                        if (returnMovieThumbPlayTimeList != "") returnMovieThumbPlayTimeList += ",";
                        if (spanArray[j].firstChild && spanArray[j].firstChild.nodeValue != "") { returnMovieThumbPlayTimeList += spanArray[j].firstChild.nodeValue };
                    }
                }
            }
        }
        return returnMovieThumbPlayTimeList;
    };
    this.returnResultText = function () {
        var resultHtml = this.editWindow.document.getElementsByTagName('body')[0].innerHTML;
        if (this.editorAreaStatus == 1) {
            this.tempResultCode = this.textareaDom.value;
        }
        else {
            this.tempResultCode = resultHtml;
        }
        this.tempResultCode = this.tempResultCode.noneTagFilter();

        if (this.tempResultCode == "&nbsp;")
            this.tempResultCode = "";

        return this.tempResultCode;
    };
    this.returnResultHtml = function () {
        this.imageResizeClassSet();
        var resultHtml = this.editWindow.document.getElementsByTagName('body')[0].innerHTML;

        if (this.editorAreaStatus == 1)
            this.tempResultCode = this.textareaDom.value.HtmlTagFilter(this.codeWriterType);
        else
            this.tempResultCode = resultHtml.HtmlTagFilter(this.codeWriterType);

        if (this.tempResultCode == "<P>&nbsp;</P>" || (NgbBrowser.firefox() && this.tempResultCode == "<br>"))
            this.tempResultCode = "";

        return this.tempResultCode;
    };
}

var editorEventHandler = new _editorEventHandler();
function _editorEventHandler() {
    //이벤트 등록
    //this.font = function (func, selectId) { func.applyTag("FontName", func.selectBoxHandler(selectId)) };
    //this.size = function (func, selectId) { func.applyTag("fontsize", func.selectBoxHandler(selectId)) };
    this.bold = function (func) { editorLayer.clearLayer('editorLayerSec', func); func.applyTag("bold"); };
    this.italic = function (func) { editorLayer.clearLayer('editorLayerSec', func); func.applyTag("italic"); };
    this.undeline = function (func) { editorLayer.clearLayer('editorLayerSec', func); func.applyTag("underline"); };
    this.underline = function (func) { editorLayer.clearLayer('editorLayerSec', func); func.applyTag("underline"); };
    this.alignLeft = function (func) { editorLayer.clearLayer('editorLayerSec', func); func.applyTag("justifyleft"); };
    this.alignCenter = function (func) { editorLayer.clearLayer('editorLayerSec', func); func.applyTag("JustifyCenter"); };
    this.alignRight = function (func) { editorLayer.clearLayer('editorLayerSec', func); func.applyTag("JustifyRight"); };
    this.hr = function (func) { editorLayer.clearLayer('editorLayerSec', func); func.applyTag("InsertHorizontalRule"); };
    this.size = function (func, osl, dom)
    {
        if (dom.style.backgroundPositionY != "-64px")
        {
            editorLayer.clearLayer('editorLayerSec', func);
            if (func.iframeIDStatus != 1) {
                func.getSelection();
                editorLayer.createLayer("editorLayerSec", func);
                editorLayer.moveToMouse("editorLayerSec", osl);
                func.lockEditorSec("editorLayerSec");
                editorLayer.selectSizeHtml("editorLayerSec", "fontsize", func);
                dom.style.backgroundPositionY = "-64px";
                func.focusOut(func.useFocusOut);
            }
        }
        else {
            editorLayer.clearLayer('editorLayerSec', func);
        }
    };
    this.color = function (func, osl, dom)
    {
        if (dom.style.backgroundPositionY != "-64px")
        {
            editorLayer.clearLayer('editorLayerSec', func);
            if (func.iframeIDStatus != 1) {
                func.getSelection();
                editorLayer.createLayer("editorLayerSec", func);
                editorLayer.moveToMouse("editorLayerSec", osl);
                func.lockEditorSec("editorLayerSec");
                editorLayer.selectColorHtml("editorLayerSec", "foreColor", func);
                var currentColor = editWindow.document.getSelection().anchorNode.parentNode.color || "#606060";
                func.setColor(currentColor.toLocaleUpperCase());
                dom.style.backgroundPositionY = "-64px";
                func.focusOut(func.useFocusOut);
            }
        }
        else {
            editorLayer.clearLayer('editorLayerSec', func);
        }
    };
    this.bgcolor = function (func, osl, dom)
    {
        if (dom.style.backgroundPositionY != "-64px")
        {
            editorLayer.clearLayer('editorLayerSec', func);
            if (func.iframeIDStatus != 1) {
                func.getSelection();
                editorLayer.createLayer("editorLayerSec", func);
                editorLayer.moveToMouse("editorLayerSec", osl);
                func.lockEditorSec("editorLayerSec");
                editorLayer.selectColorHtml("editorLayerSec", "backColor", func);
                dom.style.backgroundPositionY = "-64px";
                var currentColorRGB = [256, 256, 256];
                try
                {
                    currentColorRGB = editWindow.document.getSelection().anchorNode.parentNode.style.backgroundColor.toLocaleUpperCase().split("RGB(")[1].split(")")[0].split(", ");
                }
                catch (e)
                {
                    return false;
                }
                var currentColorHEX = '#' + ((0x1000000 + (currentColorRGB[2] | (currentColorRGB[1] << 8) | (currentColorRGB[0] << 16))).toString(16).slice(1)).toLocaleUpperCase();
                func.setColor(currentColorHEX);
                func.focusOut(func.useFocusOut);
            }
        }
        else {
            editorLayer.clearLayer('editorLayerSec', func);
        }
    };
    this.link = function (func, osl, dom)
    {
        if (dom.style.backgroundPositionY != "-64px")
        {
            editorLayer.clearLayer('editorLayerSec', func);
            if (func.iframeIDStatus != 1) {
                func.getSelection();
                editorLayer.createLayer("editorLayerSec", func);
                editorLayer.moveToMouse("editorLayerSec", osl);
                func.lockEditorSec("editorLayerSec");
                editorLayer.selectLinkHtml("editorLayerSec", "createLink", func);
                func.getSelection();
                
				var nodetype= 0;
				try {
					nodetype = editorProc01.varGetSelection.startContainer.nodeType;
				} catch (e) {
					nodetype = 0;
				}
				
                editorProc01.currentSelectText = {
                    startOffset: (editorProc01.varGetSelection.startOffset == undefined)? 0:editorProc01.varGetSelection.startOffset ,
                    endOffset: (editorProc01.varGetSelection.endOffset == undefined)? 0:editorProc01.varGetSelection.endOffset,
                    fullText: (nodetype == 3) ? editorProc01.varGetSelection.startContainer.data : "",
                    displayText: ""
                }
                dom.style.backgroundPositionY = "-64px";
                func.focusOut(func.useFocusOut);
            }
        }
        else
        {
            editorLayer.clearLayer('editorLayerSec', func);
        }
    };
    this.emoticon = function (func, osl, dom)
    {
        if (dom.style.backgroundPositionY != "-64px")
        {
            editorLayer.clearLayer('editorLayerSec', func);
            if (func.iframeIDStatus != 1) {
                func.getSelection();
                editorLayer.createLayer("editorLayerSec", func);
                editorLayer.moveToMouse("editorLayerSec", osl);
                func.lockEditorSec("editorLayerSec");
                editorLayer.selectEmoticonHtml("editorLayerSec", func);
                dom.style.backgroundPositionY = "-64px";
                func.focusOut(func.useFocusOut);
            }
        }
        else
        {
            editorLayer.clearLayer('editorLayerSec', func);
        }
    };
    this.emoticonMaple = function (func, osl, dom)
    {
        if (dom.style.backgroundPositionY != "-64px")
        {
            editorLayer.clearLayer('editorLayerSec', func);
            if (func.iframeIDStatus != 1) {
                func.getSelection();
                editorLayer.createLayer("editorLayerSec", func);
                editorLayer.moveToMouse("editorLayerSec", osl);
                func.lockEditorSec("editorLayerSec");
                dom.style.backgroundPositionY = "-64px";
                editorLayer.selectEmoticonMapleHtml("editorLayerSec", func);
                func.focusOut(func.useFocusOut);
            }
        }
        else
        {
            editorLayer.clearLayer('editorLayerSec', func);
        }
    };
    this.itemUpload = function (func, osl, dom) {
        if (dom.style.backgroundPositionY != "-72px") {
            editorLayer.clearLayer('editorLayerSec', func);
            if (func.iframeIDStatus != 1) {
                func.getSelection();
                editorLayer.createLayer("editorLayerSec", func);
                editorLayer.moveToMouse("editorLayerSec", osl);
                func.lockEditorSec("editorLayerSec");
                dom.style.backgroundPositionY = "-72px";
                editorLayer.selectItemHtml("editorLayerSec", func);
                func.focusOut(func.useFocusOut);
                $("#editorSearchItemInput").focus();

                $("#editorSearchItemInput").bind("keyup", function (e) {
                    if (e.which == 13) {
                        editorProc01.itemSearchCall();
                    }
                });
            }
        }
        else {
            editorLayer.clearLayer('editorLayerSec', func);
        }
    }; 
    this.imgUpload = function (func, osl, dom)
    {
        if (dom.style.backgroundPositionY != "-72px")
        {
            editorLayer.clearLayer('editorLayerSec', func);
            if (func.iframeIDStatus != 1) {
                func.getSelection();
                editorLayer.createLayer("editorLayerSec", func);
                editorLayer.moveToMouse("editorLayerSec", osl);
                func.lockEditorSec("editorLayerSec");
                dom.style.backgroundPositionY = "-72px";
                editorLayer.selectImageHtml("editorLayerSec", func);
                func.focusOut(func.useFocusOut);
            }
        }
        else
        {
            editorLayer.clearLayer('editorLayerSec', func);
        }
    };
    this.tempSave = function (func) {
        func.focusStatus = 1;
        func.tempResultCode = func.iframeDom.contentWindow.document.getElementsByTagName('body')[0].innerHTML;
        func.textareaDom.value = func.tempResultCode.HtmlTagFilter(func.codeWriterType);
    };
    this.onfocusStatus = function (func) {
        func.focusStatus = 0;
    }
}

//editor 에서 띄우는 레이어들을 관리함
editorLayer = new _editorLayer();
function _editorLayer() {
    this.setCreateLayer = new Object;
    this.createLayer = function (idValue, func) {
        var domIdElement = document.getElementById(idValue);
        if (domIdElement == null) {
            func.setCreateLayer = document.createElement("div");
            func.setCreateLayer.setAttribute("id", idValue);

            document.getElementById("textEditorFrame").appendChild(func.setCreateLayer);
            //document.getElementsByTagName("body")[0].appendChild(func.setCreateLayer);
            //document.getElementsByClassName("edSec")[0].appendChild(func.setCreateLayer);
        }
        else
        {
            func.setCreateLayer = domIdElement;
        }
        $(".editorBackboard").css("display","block");

        //document.getElementsByClassName("editorBackboard")[0].style.display = "block";
        //document.getElementsByClassName("editorBackboard")[1].style.display = "block";
    };
    this.clearLayer = function (idValue, func) {
        func.unlockEditorSec();
        var domIdElement = document.getElementById(idValue);
        if (domIdElement) {
            //document.getElementsByClassName("editorBackboard")[0].style.display = "none";
            //document.getElementsByClassName("editorBackboard")[1].style.display = "none";
            $(".editorBackboard").css("display", "none");
            domIdElement.innerHTML = "";
            var btn1s = document.querySelectorAll(".edFSec02 a");
            var btn2s = document.querySelectorAll(".edFSec03 a");
            for (var i = 1; i < btn1s.length; i++) {
                //not layer
                switch (i) {
                    case 2: 
                    case 3:
                    case 4:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                        continue;
                        break;
                }
                btn1s[i].removeAttribute("style");
            }
            for (var i = 0; i < btn2s.length; i++) {
                btn2s[i].removeAttribute("style");
            }
        }
    };
    this.moveToMouse = function (idValue, osl) {
        var domIdElement = document.getElementById(idValue);
		
		if ($("#textEditorFrame").hasClass("edBugReport"))
			domIdElement.style.top = "57px";
        else
			domIdElement.style.top = (300 + editorProc01.standardTop) + "px";
		
        if (osl > 0){
            osl += Number($(".editor_sec").css("padding-left").split("px")[0]);
            domIdElement.style.width = "1px";
            domIdElement.style.left = osl + "px";
        }
        else
        {
            osl -= Number($(".editor_sec").css("padding-right").split("px")[0]);
            domIdElement.style.width = "auto";
            domIdElement.style.left = "auto";
            domIdElement.style.right = -osl + "px";
        }
    },
    this.selectSizeHtml = function (idValue, action, func) {
        var domIdElement = document.getElementById(idValue);
        var charGenerateTag = "<div class=\"selectSize\">";
        charGenerateTag += "<div class=\"editorSizeSelectionCenterSec\">";
        charGenerateTag += "    <ul>";
        charGenerateTag += "        <li><a href=\"#\" onclick=\"editorProc01.setSizeConfirm(1); return false;\" title=\"8pt\"><span>8pt</span><span style=\"font-size:8pt;\">가나다라...</span></a></li>";
        charGenerateTag += "        <li><a href=\"#\" onclick=\"editorProc01.setSizeConfirm(2); return false;\" title=\"10pt\"><span>10pt</span><span style=\"font-size:10pt;\">가나다라...</span></a></li>";
        charGenerateTag += "        <li><a href=\"#\" onclick=\"editorProc01.setSizeConfirm(3); return false;\" title=\"12pt\"><span>12pt</span><span style=\"font-size:12pt;\">가나다라...</span></a></li>";
        charGenerateTag += "        <li><a href=\"#\" onclick=\"editorProc01.setSizeConfirm(4); return false;\" title=\"14pt\"><span>14pt</span><span style=\"font-size:14pt;\">가나다라...</span></a></li>";
        charGenerateTag += "        <li><a href=\"#\" onclick=\"editorProc01.setSizeConfirm(5); return false;\" title=\"18pt\"><span>18pt</span><span style=\"font-size:18pt;\">가나다라...</span></a></li>";
        charGenerateTag += "        <li><a href=\"#\" onclick=\"editorProc01.setSizeConfirm(6); return false;\" title=\"24pt\"><span>24pt</span><span style=\"font-size:24pt;\">가나다라...</span></a></li>";
        charGenerateTag += "        <li><a href=\"#\" onclick=\"editorProc01.setSizeConfirm(7); return false;\" title=\"36pt\"><span>36pt</span><span style=\"font-size:36pt;\">가나다라...</span></a></li>";
        charGenerateTag += "    </ul>";
        charGenerateTag += "</div>";
        charGenerateTag += "<p class=\"close\">";
        charGenerateTag += "    <a href=\"javascript:void(0);\" onclick=\"editorLayer.clearLayer('editorLayerSec',editorProc01); return false;\"></a>";
        charGenerateTag += "</p>";
        charGenerateTag += "<div class=\"editorSelectionPotion\"></div>";
        charGenerateTag += "</div>";
        
        domIdElement.innerHTML = charGenerateTag;
    };
	this.selectColorHtml = function (idValue, action, func) {

	    var domIdElement = document.getElementById(idValue);
	    var charGenerateTag = "<div class=\"selectColor\">";
	    charGenerateTag += "<div class=\"editorColorSelectionTopSec\">";
	    charGenerateTag += "	<span id=\"editorColorSelectionTempColor\">&nbsp;</span>";
	    charGenerateTag += "	<input type=\"text\" id=\"editorColorSelectionTempColorText\" value=\"#FFFFFF\"/>";
	    charGenerateTag += "</div>";
	    charGenerateTag += "<div class=\"editorColorSelectionCenterSec\">";
	    charGenerateTag += "<ul>";
	    for (var i = 0; i < editorDataSet.colorList.length; i++) {
	        charGenerateTag += "	<li style=\"background-color:" + editorDataSet.colorList[i].codeRgb + ";\"><a href=\"#\" onclick=\"" + func.objObject + ".setColorConfirm('" + editorDataSet.colorList[i].codeRgb + "', '" + action + "'); return false;\" title=\"" + editorDataSet.colorList[i].codeRgb + "\">&nbsp;</a></li>";
	    }
	    charGenerateTag += "</ul>";
	    charGenerateTag += "</div>";
	    charGenerateTag += "<div class=\"editorColorSelectionBottomSec\">";
	    //charGenerateTag += "	<span id=\"editorColorSelectionTempColor\">&nbsp;</span>";
	    //charGenerateTag += "	<input type=\"text\" id=\"editorColorSelectionTempColorText\" />";
	    //charGenerateTag += "	<a href=\"#\" onclick=\"" + func.objObject + ".selectColor('" + idValue + "','" + action + "'," + func.objObject + "); return false;\"><img src=\"https://ssl.nexon.com/S2/Portal/Nexon/Nexon2007/image/button/bt_cfm_s.gif\" alt=\"확인\" class=\"confirm\" /></a>";
	    charGenerateTag += "	<p class=\"close\"><a href=\"javascript:void(0);\" onclick=\"editorLayer.clearLayer('" + idValue + "'," + func.objObject + "); return false;\" title=\"닫기\"></a></p>";
	    charGenerateTag += "</div>";
	    charGenerateTag += "<div class=\"editorSelectionPotion\"></div>";
	    charGenerateTag += "</div>";
	    domIdElement.innerHTML = charGenerateTag;
	};
    this.selectLinkHtml = function (idValue, action, func) {
        var domIdElement = document.getElementById(idValue);
        var charGenerateTag = "<div class=\"selectLink\">";
        charGenerateTag += "	<p class=\"cmnt\">\"http://\" 또는 \"https://\"로 시작되는 링크주소(URL)를 넣어주세요.</p>";
        charGenerateTag += "	<fieldset>";
        charGenerateTag += "		<label>URL</label>";
        charGenerateTag += "		<input type=\"text\" class=\"link\" id=\"editorLinkInput\" value=\"http://\" />";
        charGenerateTag += "	    <a href=\"javascript:void(0);\" onclick=\"" + func.objObject + ".selectLink('" + idValue + "','" + action + "'," + func.objObject + "); return false;\" class=\"confirm\"></a>";
        charGenerateTag += "	</fieldset>";
        charGenerateTag += "	<p class=\"close\"><a href=\"javascript:void(0);\" onclick=\"editorLayer.clearLayer('" + idValue + "'," + func.objObject + "); return false;\" title=\"닫기\"></a></p>";
        charGenerateTag += "    <div class=\"editorSelectionPotion\"></div>";
        charGenerateTag += "</div>";
        domIdElement.innerHTML = charGenerateTag;
    };
    this.selectEmoticonHtml = function (idValue, func) {
        func.tempEmoChecked = "";
        var domIdElement = document.getElementById(idValue);
        var charGenerateTag = "<div class=\"selectEmoticon\">";
        charGenerateTag += "    <div class=\"emoList\">";
        charGenerateTag += "        <ul>";
        for (var i = 0; i < editorDataSet.emoList.length; i++) {
            if (editorDataSet.emoList[i].n1Category == 4) continue;
            var emoTitle = editorDataSet.emoList[i].strFileName.toLocaleUpperCase().split(".")[0];
            emoTitle = emoTitle.split("-")[1];
            charGenerateTag += "            <li id=\"emoCheck" + i + "\"><a href=\"javascript:void(0);\" onclick=\"editorProc01.addTempEmoticon('" + editorDataSet.emoList[i].strFileName + "')\" style=\"background-position:" + editorDataSet.emoList[i].strPosition + ";\" title=\"" + emoTitle + "\"></a></li>";
        }
        charGenerateTag += "        </ul>";
        charGenerateTag += "    </div>";
        charGenerateTag += "    <p class=\"close\"><a href=\"javascript:void(0);\" onclick=\"editorLayer.clearLayer('editorLayerSec',editorProc01); return false;\" title=\"닫기\"></a></p>";
        charGenerateTag += "    <div class=\"editorSelectionPotion\"></div>";
        charGenerateTag += "</div>";
        domIdElement.innerHTML = charGenerateTag;
    }
    this.selectEmoticonMapleHtml = function (idValue, func) {
        func.tempEmoChecked = "";
        var domIdElement = document.getElementById(idValue);
        var charGenerateTag = "<div class=\"selectEmoticonMaple\">";
        charGenerateTag += "    <div class=\"emoList\">";
        charGenerateTag += "        <ul>";
        for (var i = 0; i < editorDataSet.emoMapleList.length; i++) {
            var emoTitle = editorDataSet.emoMapleList[i].strFileName.split(".")[0];
            charGenerateTag += "            <li id=\"emoCheck" + i + "\"><a href=\"javascript:void(0);\" onclick=\"editorProc01.addTempEmoticonMaple('" + editorDataSet.emoMapleList[i].strFileName + "')\" style=\"background-position:" + editorDataSet.emoMapleList[i].strPosition + ";\" title=\"" + emoTitle + "\"></a></li>";
        }
        charGenerateTag += "        </ul>";
        charGenerateTag += "    </div>";
        charGenerateTag += "    <p class=\"close\"><a href=\"javascript:void(0);\" onclick=\"editorLayer.clearLayer('editorLayerSec',editorProc01); return false;\" title=\"닫기\"></a></p>";
        charGenerateTag += "    <div class=\"editorSelectionPotion\"></div>";
        charGenerateTag += "</div>";
        domIdElement.innerHTML = charGenerateTag;
    }
    this.selectItemHtml = function (idValue, func) {
        var domIdElement = document.getElementById(idValue);
        var charGenerateTag = "<div class=\"selectItem\">";
        charGenerateTag += "    <fieldset>";
        charGenerateTag += "        <label>URL</label>";
        charGenerateTag += "        <input type=\"text\" class=\"search-item\" id=\"editorSearchItemInput\" value=\"\" placeholder=\"아이템 이름을 입력해주세요.\">";
        charGenerateTag += "            <a href=\"javascript:void(0);\" onclick=\"editorProc01.itemSearchCall(); return false;\" class=\"confirm\"></a>";
        charGenerateTag += "    </fieldset>";
        charGenerateTag += "        <div id=\"item-list\"></div>";
        charGenerateTag += "        <p class=\"close\">";
        charGenerateTag += "            <a href=\"javascript:void(0);\" onclick=\"editorLayer.clearLayer('editorLayerSec',editorProc01); return false;\" title=\"닫기\"></a>";
        charGenerateTag += "        </p>";
        charGenerateTag += "        <div class=\"editorSelectionPotion\"></div>";
        charGenerateTag += "</div>";
        domIdElement.innerHTML = charGenerateTag;
    }
    this.selectImageHtml = function (idValue, func) {
        func.tempEmoChecked = "";
        var domIdElement = document.getElementById(idValue);
        var charGenerateTag = "<div class=\"selectImageuploader\">";
        charGenerateTag += "<div class=\"emoList\">";
        charGenerateTag += "<form name=\"m_form\" method=\"post\" id=\"m_form\" enctype=\"multipart/form-data\" onsubmit=\"return submitForm();\">";
        charGenerateTag += "<div id=\"middle\">";
        charGenerateTag += "<div id=\"cnts\">";
        charGenerateTag += "<ul id=\"txtUpload\">";
        charGenerateTag += "<li>이미지 파일은10개, 총합 5MB미만까지 올릴 수 있습니다.</li>";
        charGenerateTag += "<li>파일 확장자가 jpg, gif, png, bmp인 이미지만 올릴 수 있습니다.</li>";
        charGenerateTag += "</ul>";
        charGenerateTag += "<div id=\"fileFind\">";
        charGenerateTag += "<fieldset id=\"fileList\">";
        charGenerateTag += "<div id=\"liFile1\"><input type=\"file\" id=\"File1\" name=\"files\" size=\"32\" /></div>";
        for (var i = 2; i < 11; i++)
            charGenerateTag += "<div id=\"liFile" + i + "\"><input type=\"file\" id=\"File" + i + "\" name=\"files\" size=\"32\" /><a href=\"#\" onclick=\"NxImageUploader.Delete( " + i + " );\" title=\"삭제\"></a></div>";
        charGenerateTag += "</fieldset>";
        charGenerateTag += "</div>";
        charGenerateTag += "<div id=\"fileInfo\">";
        charGenerateTag += "<a href=\"javascript:void(0);\" id=\"clickHyperLink\" onclick=\"NxImageUploader.Add();\" title=\"파일추가\"></a>";
        charGenerateTag += "<div id=\"fileNum\"><span id=\"divFileCount\">3</span>/10</div>";
        charGenerateTag += "</div>";
        charGenerateTag += "<p id=\"txtWarning\">음란물, 저작권 침해 등의 불법적인 이미지를 올릴 경우 사전 경고 없이 삭제될 수 있으며, 동의하신 약관에 의거하여 서비스 이용이 제한됨은 물론 <span>사안에 따라 현행 법령에 의해 법적 처벌</span>까지 받을 수 있습니다.</p>";
        charGenerateTag += "<div id=\"btSec\"><a href=\"javascript:void(0);\" id=\"btnUpload\" onclick=\"submitForm();\" title=\"올리기\"></a></div>";
        charGenerateTag += "</div>";
        charGenerateTag += "</div>";
        charGenerateTag += "</form>";
        charGenerateTag += "</div>";
        charGenerateTag += "<p class=\"close\">";
        charGenerateTag += "<a href=\"javascript:void(0);\" onclick=\"editorLayer.clearLayer('editorLayerSec',editorProc01); return false;\" title=\"닫기\"></a>";
        charGenerateTag += "</p>";
        charGenerateTag += "<div class=\"editorSelectionPotion\"></div>";
        charGenerateTag += "</div>";
        console.log(charGenerateTag);
        domIdElement.innerHTML = charGenerateTag;
        NxImageUploader = new __ImageUploader();
        NxImageUploader.SetFileCount();
        for (var i = 0; i < NxImageUploader.n4FileMaxCount; i++) {
            document.getElementById("liFile" + (i + 1)).style.display = NxImageUploader.objFileCount[i].display;
        }
        NxImageUploader.objFileCount[i];
    }
}

// 각항목의 속성 값이 여러개인경우를 관리하는 변수
var editorDataSet =
{
    colorList: new Array,
    emoCategoryList: new Array,
    emoList: new Array,
    emoMapleList: new Array,
    tempEmoList: new Array
}

editorDataSet.colorList[0] = { codeRgb: "#FFFFFF" };
editorDataSet.colorList[1] = { codeRgb: "#FE9CF0" };
editorDataSet.colorList[2] = { codeRgb: "#EE89B5" };
editorDataSet.colorList[3] = { codeRgb: "#F69679" };
editorDataSet.colorList[4] = { codeRgb: "#FEBF7A" };
editorDataSet.colorList[5] = { codeRgb: "#FFF799" };
editorDataSet.colorList[6] = { codeRgb: "#D7E36F" };
editorDataSet.colorList[7] = { codeRgb: "#B1D56C" };
editorDataSet.colorList[8] = { codeRgb: "#8DDCA0" };
editorDataSet.colorList[9] = { codeRgb: "#70EFFA" };
editorDataSet.colorList[10] = { codeRgb: "#CCCCCC" };
editorDataSet.colorList[11] = { codeRgb: "#E122C5" };
editorDataSet.colorList[12] = { codeRgb: "#C90C72" };
editorDataSet.colorList[13] = { codeRgb: "#FF1100" };
editorDataSet.colorList[14] = { codeRgb: "#FD8A02" };
editorDataSet.colorList[15] = { codeRgb: "#FDD103" };
editorDataSet.colorList[16] = { codeRgb: "#A0B301" };
editorDataSet.colorList[17] = { codeRgb: "#699E01" };
editorDataSet.colorList[18] = { codeRgb: "#0C952C" };
editorDataSet.colorList[19] = { codeRgb: "#0CADC5" };
editorDataSet.colorList[20] = { codeRgb: "#999999" };
editorDataSet.colorList[21] = { codeRgb: "#93017E" };
editorDataSet.colorList[22] = { codeRgb: "#740340" };
editorDataSet.colorList[23] = { codeRgb: "#9F0C13" };
editorDataSet.colorList[24] = { codeRgb: "#7D4800" };
editorDataSet.colorList[25] = { codeRgb: "#AA8C00" };
editorDataSet.colorList[26] = { codeRgb: "#6C7900" };
editorDataSet.colorList[27] = { codeRgb: "#385500" };
editorDataSet.colorList[28] = { codeRgb: "#016418" };
editorDataSet.colorList[29] = { codeRgb: "#007283" };
editorDataSet.colorList[30] = { codeRgb: "#666666" };
editorDataSet.colorList[31] = { codeRgb: "#BBCEAE" };
editorDataSet.colorList[32] = { codeRgb: "#D0B283" };
editorDataSet.colorList[33] = { codeRgb: "#CCADA2" };
editorDataSet.colorList[34] = { codeRgb: "#DFA2A2" };
editorDataSet.colorList[35] = { codeRgb: "#CF8CC1" };
editorDataSet.colorList[36] = { codeRgb: "#CA8EFB" };
editorDataSet.colorList[37] = { codeRgb: "#AB93FB" };
editorDataSet.colorList[38] = { codeRgb: "#6CA9FC" };
editorDataSet.colorList[39] = { codeRgb: "#70D4FE" };
editorDataSet.colorList[40] = { codeRgb: "#333333" };
editorDataSet.colorList[41] = { codeRgb: "#7B916B" };
editorDataSet.colorList[42] = { codeRgb: "#AC803A" };
editorDataSet.colorList[43] = { codeRgb: "#B36A4F" };
editorDataSet.colorList[44] = { codeRgb: "#B85252" };
editorDataSet.colorList[45] = { codeRgb: "#A9328F" };
editorDataSet.colorList[46] = { codeRgb: "#A037F4" };
editorDataSet.colorList[47] = { codeRgb: "#7A56EF" };
editorDataSet.colorList[48] = { codeRgb: "#086AEF" };
editorDataSet.colorList[49] = { codeRgb: "#019CDD" };
editorDataSet.colorList[50] = { codeRgb: "#000000" };
editorDataSet.colorList[51] = { codeRgb: "#334228" };
editorDataSet.colorList[52] = { codeRgb: "#744B0A" };
editorDataSet.colorList[53] = { codeRgb: "#812F11" };
editorDataSet.colorList[54] = { codeRgb: "#800000" };
editorDataSet.colorList[55] = { codeRgb: "#4E003D" };
editorDataSet.colorList[56] = { codeRgb: "#530294" };
editorDataSet.colorList[57] = { codeRgb: "#360FB4" };
editorDataSet.colorList[58] = { codeRgb: "#052971" };
editorDataSet.colorList[59] = { codeRgb: "#004C81" };

editorDataSet.emoCategoryList[0] = { strCategoryName: "넥슨", codeCategory: 1 };
editorDataSet.emoList[0] = { strFileName: "a1-haha.gif", strPosition: "-1px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[1] = { strFileName: "a2-wink.gif", strPosition: "-32px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[2] = { strFileName: "a3-kiss.gif", strPosition: "-63px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[3] = { strFileName: "a4-loveyou.gif", strPosition: "-94px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[4] = { strFileName: "a5-shy.gif", strPosition: "-125px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[5] = { strFileName: "a6-kk.gif", strPosition: "-156px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[6] = { strFileName: "a7-aha.gif", strPosition: "-187px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[7] = { strFileName: "a8-joke.gif", strPosition: "-218px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[8] = { strFileName: "a9-good.gif", strPosition: "-249px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[9] = { strFileName: "b1-angry.gif", strPosition: "-280px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[10] = { strFileName: "b2-fire.gif", strPosition: "-311px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[11] = { strFileName: "b3-turn.gif", strPosition: "-342px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[12] = { strFileName: "b4-cry.gif", strPosition: "-373px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[13] = { strFileName: "b5-burning.gif", strPosition: "-404px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[14] = { strFileName: "b6-dontknow.gif", strPosition: "-435px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[15] = { strFileName: "b7-well.gif", strPosition: "-466px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[16] = { strFileName: "b8-disapair.gif", strPosition: "-497px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[17] = { strFileName: "b9-hate.gif", strPosition: "-528px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[18] = { strFileName: "c1-cold.gif", strPosition: "-559px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[19] = { strFileName: "c2-sick.gif", strPosition: "-590px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[20] = { strFileName: "c3-sleepy.gif", strPosition: "-621px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[21] = { strFileName: "c4-shock.gif", strPosition: "-652px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[22] = { strFileName: "c5-surprize.gif", strPosition: "-683px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[23] = { strFileName: "c6-wonder.gif", strPosition: "-714px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[24] = { strFileName: "c7-silent.gif", strPosition: "-745px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[25] = { strFileName: "d1-meal.gif", strPosition: "-776px -1px", strName: "", n1Category: 1 };
editorDataSet.emoList[26] = { strFileName: "d2-away.gif", strPosition: "-1px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[27] = { strFileName: "d3-busy.gif", strPosition: "-32px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[28] = { strFileName: "d4-game.gif", strPosition: "-63px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[29] = { strFileName: "d5-study.gif", strPosition: "-94px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[30] = { strFileName: "d6-dream.gif", strPosition: "-125px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[31] = { strFileName: "d7-diving.gif", strPosition: "-156px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[32] = { strFileName: "d8-toilet.gif", strPosition: "-187px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[33] = { strFileName: "e1-indian.gif", strPosition: "-218px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[34] = { strFileName: "e2-gloom.gif", strPosition: "-249px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[35] = { strFileName: "e3-bride.gif", strPosition: "-280px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[36] = { strFileName: "e4-betman.gif", strPosition: "-311px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[37] = { strFileName: "e5-superman.gif", strPosition: "-342px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[38] = { strFileName: "e6-chinese.gif", strPosition: "-373px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[39] = { strFileName: "e7-knight.gif", strPosition: "-404px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[40] = { strFileName: "e8-charisma.gif", strPosition: "-435px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[41] = { strFileName: "e9sunglass.gif", strPosition: "-466px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[42] = { strFileName: "f1-party.gif", strPosition: "-497px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[43] = { strFileName: "f2-music.gif", strPosition: "-528px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[44] = { strFileName: "f3-swim.gif", strPosition: "-559px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[45] = { strFileName: "f4-walk.gif", strPosition: "-590px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[46] = { strFileName: "f5-bike.gif", strPosition: "-621px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[47] = { strFileName: "f6-taxi.gif", strPosition: "-652px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[48] = { strFileName: "f7-car.gif", strPosition: "-683px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[49] = { strFileName: "f8-bus.gif", strPosition: "-714px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[50] = { strFileName: "f9-airplane.gif", strPosition: "-745px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[51] = { strFileName: "g1-mouse.gif", strPosition: "-776px -32px", strName: "", n1Category: 1 };
editorDataSet.emoList[52] = { strFileName: "g2-ox.gif", strPosition: "-1px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[53] = { strFileName: "g3-tiger.gif", strPosition: "-32px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[54] = { strFileName: "g4-rabbit.gif", strPosition: "-63px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[55] = { strFileName: "g5-dragon.gif", strPosition: "-94px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[56] = { strFileName: "g6-snake.gif", strPosition: "-125px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[57] = { strFileName: "g7-horse.gif", strPosition: "-156px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[58] = { strFileName: "g8-sheep.gif", strPosition: "-187px -63px", strName: "", n1Category: 4 };
editorDataSet.emoList[59] = { strFileName: "g9-monkey.gif", strPosition: "-218px -63px", strName: "", n1Category: 4 };
editorDataSet.emoList[60] = { strFileName: "h1-chicken.gif", strPosition: "-249px -63px", strName: "", n1Category: 4 };
editorDataSet.emoList[61] = { strFileName: "h2-dog.gif", strPosition: "-187px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[62] = { strFileName: "h3-pig.gif", strPosition: "-218px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[63] = { strFileName: "h4-chick.gif", strPosition: "-249px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[64] = { strFileName: "h5-frog.gif", strPosition: "-280px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[65] = { strFileName: "h6-fish.gif", strPosition: "-311px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[66] = { strFileName: "h7-cat.gif", strPosition: "-342px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[67] = { strFileName: "h8-snail.gif", strPosition: "-373px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[68] = { strFileName: "h9-penguin.gif", strPosition: "-404px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[69] = { strFileName: "i1-coffee.gif", strPosition: "-435px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[70] = { strFileName: "i2-milk.gif", strPosition: "-466px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[71] = { strFileName: "i3-cake.gif", strPosition: "-497px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[72] = { strFileName: "i4-crucianbread.gif", strPosition: "-528px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[73] = { strFileName: "i5-soju.gif", strPosition: "-559px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[74] = { strFileName: "i6-beer.gif", strPosition: "-590px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[75] = { strFileName: "i7-apple.gif", strPosition: "-621px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[76] = { strFileName: "i8-carrot.gif", strPosition: "-652px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[77] = { strFileName: "j1-pizza.gif", strPosition: "-683px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[78] = { strFileName: "j2-rice.gif", strPosition: "-714px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[79] = { strFileName: "j3-hamburger.gif", strPosition: "-745px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[80] = { strFileName: "j4-kimbob.gif", strPosition: "-776px -63px", strName: "", n1Category: 1 };
editorDataSet.emoList[81] = { strFileName: "j5-omelet.gif", strPosition: "-1px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[82] = { strFileName: "j6-cheese.gif", strPosition: "-32px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[83] = { strFileName: "j7-shrimpkkang.gif", strPosition: "-63px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[84] = { strFileName: "j8-icecream.gif", strPosition: "-94px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[85] = { strFileName: "k1-bomb.gif", strPosition: "-125px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[86] = { strFileName: "k2-trash.gif", strPosition: "-156px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[87] = { strFileName: "k3-dung.gif", strPosition: "-187px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[88] = { strFileName: "k4-light.gif", strPosition: "-218px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[89] = { strFileName: "k5-tree.gif", strPosition: "-249px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[90] = { strFileName: "k6-flower.gif", strPosition: "-280px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[91] = { strFileName: "k7-mobile.gif", strPosition: "-311px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[92] = { strFileName: "k8-pill.gif", strPosition: "-342px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[93] = { strFileName: "k9-notebook.gif", strPosition: "-373px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[94] = { strFileName: "l1-present.gif", strPosition: "-404px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[95] = { strFileName: "l2-camera.gif", strPosition: "-435px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[96] = { strFileName: "l3-money.gif", strPosition: "-466px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[97] = { strFileName: "l4-ring.gif", strPosition: "-497px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[98] = { strFileName: "l5-heart.gif", strPosition: "-528px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[99] = { strFileName: "l6-baloon.gif", strPosition: "-559px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[100] = { strFileName: "l7-tv.gif", strPosition: "-590px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[101] = { strFileName: "l8-cigar.gif", strPosition: "-621px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[102] = { strFileName: "l9-clock.gif", strPosition: "-652px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[103] = { strFileName: "m1-sun.gif", strPosition: "-683px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[104] = { strFileName: "m2-moon.gif", strPosition: "-714px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[105] = { strFileName: "m3-star.gif", strPosition: "-745px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[106] = { strFileName: "m4-cloud.gif", strPosition: "-776px -94px", strName: "", n1Category: 1 };
editorDataSet.emoList[107] = { strFileName: "m5-rain.gif", strPosition: "-1px -125px", strName: "", n1Category: 1 };
editorDataSet.emoList[108] = { strFileName: "m6-flash.gif", strPosition: "-32px -125px", strName: "", n1Category: 1 };
editorDataSet.emoList[109] = { strFileName: "m7-leaf.gif", strPosition: "-63px -125px", strName: "", n1Category: 1 };
editorDataSet.emoList[110] = { strFileName: "m8-snow.gif", strPosition: "-94px -125px", strName: "", n1Category: 1 };
editorDataSet.emoList[111] = { strFileName: "m9-rainbow.gif", strPosition: "-125px -125px", strName: "", n1Category: 1 };
//editorDataSet.emoList[112] = { strFileName : "c8-doubleface.gif", strName : "", n1Category : 1 };

editorDataSet.emoMapleList[0] = { strFileName: "ZZZ.jpg", strPosition: "-1px -1px", strName: "", n1Category: 1 };
editorDataSet.emoMapleList[1] = { strFileName: "DESPAIR.jpg", strPosition: "-84px -1px", strName: "", n1Category: 1 };
editorDataSet.emoMapleList[2] = { strFileName: "KK.jpg", strPosition: "-167px -1px", strName: "", n1Category: 1 };
editorDataSet.emoMapleList[3] = { strFileName: "ANGRY.jpg", strPosition: "-250px -1px", strName: "", n1Category: 1 };
editorDataSet.emoMapleList[4] = { strFileName: "HAPPY.jpg", strPosition: "-333px -1px", strName: "", n1Category: 1 };
editorDataSet.emoMapleList[5] = { strFileName: "AGREE.jpg", strPosition: "-416px -1px", strName: "", n1Category: 1 };
editorDataSet.emoMapleList[6] = { strFileName: "BORED.jpg", strPosition: "-499px -1px", strName: "", n1Category: 1 };
editorDataSet.emoMapleList[7] = { strFileName: "HAPPYBIRTHDAY.jpg", strPosition: "-582px -1px", strName: "", n1Category: 1 };
editorDataSet.emoMapleList[8] = { strFileName: "SHINE.jpg", strPosition: "-665px -1px", strName: "", n1Category: 1 };
editorDataSet.emoMapleList[9] = { strFileName: "WARM.jpg", strPosition: "-748px -1px", strName: "", n1Category: 1 };
editorDataSet.emoMapleList[10] = { strFileName: "FEAR.jpg", strPosition: "-1px -84px", strName: "", n1Category: 1 };
editorDataSet.emoMapleList[11] = { strFileName: "SORRY.jpg", strPosition: "-84px -84px", strName: "", n1Category: 1 };
editorDataSet.emoMapleList[12] = { strFileName: "HMPH.jpg", strPosition: "-167px -84px", strName: "", n1Category: 1 };
editorDataSet.emoMapleList[13] = { strFileName: "FIGHTING.jpg", strPosition: "-250px -84px", strName: "", n1Category: 1 };
editorDataSet.emoMapleList[14] = { strFileName: "PUP.jpg", strPosition: "-333px -84px", strName: "", n1Category: 1 };
editorDataSet.emoMapleList[15] = { strFileName: "HI.jpg", strPosition: "-416px -84px", strName: "", n1Category: 1 };
editorDataSet.emoMapleList[16] = { strFileName: "CRY.jpg", strPosition: "-499px -84px", strName: "", n1Category: 1 };
editorDataSet.emoMapleList[17] = { strFileName: "POOR.jpg", strPosition: "-582px -84px", strName: "", n1Category: 1 };
editorDataSet.emoMapleList[18] = { strFileName: "KISS.jpg", strPosition: "-665px -84px", strName: "", n1Category: 1 };