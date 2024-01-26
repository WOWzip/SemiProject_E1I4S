var idx = 0;  //idx瑜� �닿퀬 �덈뒗 �꾩뿭蹂���
var active = 0;  //class �� �� �닿퀬 �덈뒗 �꾩뿭蹂���
var search_onoff = 0; //search_onoff 瑜� �섍린�꾪븳 蹂���
var max_h = 0;
var max_h2 = 0;
$(function(){
	/*Custom Select �덉쇅 遺꾧린 泥섎━*/
	$("html").click(function(e){
		if(!$(e.target).hasClass("cus_sel_a")){
			$(".sort_wrap").find("ul").hide();
			$(".sort_wrap2").find("ul").hide();
			$(".g_m_name").removeClass("on");
			$(".g_m_deps2").hide();
			$(".custom_search_wrap02").find("ul").hide();
		}
	});
	$(".gm_str_main_wrap a").mouseover(function(){
		gm_str_idx = 0;
		$(".main_str_btn").css("left","-234px");
	});
	$(".gm_str_main_wrap a").mouseout(function(){
		gm_str_idx = 0;
		$(".main_str_btn").css("left","0px");
	});
	cus_sel(); //�먮룞 而ㅼ뒪��
	cody_scroll_custom(); /*肄붾뵒 �섏씠吏� 而ㅼ뒪�� �⑥닔*/
    
    show_btn_top(); // TOP 踰꾪듉
	$(".rank_sort li").click(function(){
		var idx = $(this).index();
		$(this).find("a").addClass("active");
		$(this).siblings().find("a").removeClass("active");
		$(this).siblings().find("a").mouseout();
		$(this).find("input").prop("checked",true);
		if(idx == 1){
			$(".reboot_world").show();
			$(".live_world").hide();
			$(".w_server_list_wrap").css("height","86px");
		}else{
			$(".reboot_world").hide();
			$(".live_world").show();
			$(".w_server_list_wrap").css("height","126px");
		}
	});
	$(".artwrok_board_wrap ul li").mouseover(function(){
      $(this).find("span").stop().fadeIn(300);
    });
    $(".artwrok_board_wrap ul li").mouseout(function(){
      $(this).find("span").stop().fadeOut(300);
    });
    $(window).resize(function(){
        art_work_size();
        movie_size();
    });
    /* �좊줎寃뚯떆�� �듬�
    $(".debate_top .btn_view").click(function(){
       $(this).hide();
       $(".debate_top .lst_view").fadeIn();
    });
    */
    $(".debate_top .btn_view_close").click(function(){
       $(".debate_top .lst_view").hide();
       $(".debate_top .btn_view").show();
    });
	 
    $(".star_input li").click(function(){
       var idx = $(this).index() + 1;
       var el = $(this).parents("ul").prev("span.star_count");
       el.animate({"width":idx*20 + "%"},300);
    });
    $(".app_wr_btn").click(function(){
       var insert_btn = $(this).next(".repley_insert_btn");
       var text_area_wrap = $(this).parents(".app_write_wrap").find(".app_write_pop");
        $(this).hide();
       insert_btn.show();
        text_area_wrap.fadeIn();

    });
    $(".cancle_repley").click(function(){
       var a = $(this).parents(".repley_insert_btn");
       var b = a.prev(".app_wr_btn");
       var c = a.next(".app_write_pop");
        a.hide();
        b.show();
        c.fadeOut();
    });
	/*RNB �④낵*/
	$(".menu_wrap > li").mouseover(function(){
		$(this).addClass("on");
		$(this).siblings().removeClass("on");
		//$(this).find(".deps3").show();
		/*if($(this).find(".deps3").css("display") == "none"){
			var src = $(this).find("img").attr("src");
			$(this).find("img").attr("src",src.replace("_off.png","_on.png"));
		}*/
	});
	$(".menu_wrap > li").mouseout(function(){
		$(this).removeClass("on");
		//$(this).find(".deps3").hide();
		var src = $(this).find("img").attr("src");
		var cl = $(this).attr("class");
		if(cl != "active"){
			/*if($(this).find(".deps3").css("display") == "none"){
				$(this).find("img").attr("src",src.replace("_on.png","_off.png"));
			}*/
		}

	});
	$(".menu_wrap > li > span").click(function(){
		if($(this).next(".deps3").css("display") == "none"){
			$(this).next(".deps3").show();
			var src = $(this).find("img").attr("src");
			$(this).find("img").attr("src",src.replace("_off.png","_on.png"));
		}else{
			$(this).next(".deps3").hide();
			var src = $(this).find("img").attr("src");
			if($(this).parents("li").attr("class") != "active on"){
				$(this).find("img").attr("src",src.replace("_on.png","_off.png"));
			}
		}
	});
	/* top_menu bg onoff str */
	$(".top_menu > li").mouseover(function(){
		var dis = $(".top_menu_bg").css("display");
		if(dis == "none"){
			$(".top_menu").stop().animate({"top":"49px"},300);
			$(".top_menu").find(" > li > ul").stop().fadeIn(300);
			$(".top_menu_bg").stop().fadeIn(100);
		}
	});
	$(".top_menu").mouseleave(function(){
		$(".top_menu").stop().animate({"top":"57px"},300);
		$(".top_menu").find(" > li > ul").stop().fadeOut(100);
		$(".top_menu_bg").stop().fadeOut(300);
	});
	/* top_menu bg onoff end */

	/* �대깽�� �꾩껜蹂닿린 留덉쭊媛� 而⑦듃濡�, slide str */
	var event_move = 1200;
	var event_len = $(".event_all_banner").find("li").length;
	for(var i = 0; i < event_len;){
		i = i + 4;
		$(".event_all_banner").find("li").eq(i).css("margin-left","0px")
	}
	$(".event_all_pos").find("li").click(function(){
		idx = $(this).index();
		$(".event_all_banner").animate({"left": -event_move * idx +"px"},500);
	});
	/* �대깽�� �꾩껜蹂닿린 留덉쭊媛� 而⑦듃濡�, slide end */

	/* search select �띿뒪�� 諛붽퓞, select 而⑦듃濡� str */
	$(".condition_list").find("li").click(function(){
		idx = $(this).index();
		var select_text = $(this).find("a").text();
		$(this).parents(".condition_list").parents(".search_condition").find("> a").html(select_text +"<img src='https://ssl.nexon.com/s2/game/maplestory/renewal/common/arrow_on.png' alt=''>");
		$(this).parents(".condition_list").hide();
        $(this).parents(".condition_list").next(".select_custom").find("option").eq(idx).prop("selected",true);
		$(this).parents(".condition_list").next(".select_custom").find("option").eq(idx).siblings().prop("selected",false);
        $(this).parents(".condition_list").parents(".search_condition").removeClass("on");
		$(this).parents(".condition_list").next(".select_custom").find("select").change();
	});
	/* search select �띿뒪�� 諛붽퓞, select 而⑦듃濡� end */

	/* server select �띿뒪�� �놁쑝硫� li background-color 蹂�寃� (�먯쑀寃뚯떆��) str */
	var server_len = $(".server_list").find("li").length;
	for(var i = 0; i < server_len; i++){
		var server_text = $(".server_list").find("li").eq(i).text();
		if(server_text == ""){
			$(".server_list").find("li").eq(i).css("background-color","#eff1f4");
		}
	}
	/* server select �띿뒪�� �놁쑝硫� li background-color 蹂�寃� (�먯쑀寃뚯떆��) end */

	/* server select 而ㅼ뒪�� */
	$(".server_list").find("li").click(function(){
		idx = $(this).index();
		$(".free_select").find("select option").eq(idx).attr("selected",true);
		var server_select_onoff = $(".free_select").find("select option").eq(idx).attr("selected");
		$(".free_select").find("select option").eq(idx).siblings().removeAttr("selected","selected");
		var server_text = $(".server_list").find("li").eq(idx).find("a").html();
		$(".server_select > a").html(server_text +"<a href='#' onclick='server_select()'><img src='https://ssl.nexon.com/s2/game/maplestory/renewal/common/server_arrow.png' alt='' class='server_arrow'/></a>");
		if(server_select_onoff =="selected"){
			$(".server_list").hide();
			search_onoff = 0;
		}
		$(".free_select").find("select").change();
	});
	/* server select 而ㅼ뒪�� */

	/* 寃뚯떆�� list mouse on over str */
	$(".bulletin_list_wrap").find("ul li a").mouseover(function(){
		idx = $(this).parent("li").index();
		$(".bulletin_list_wrap").find("ul li").eq(idx).addClass("bulletin_select");
	});
	$(".bulletin_list_wrap").find("ul li").mouseout(function(){
		idx = $(this).index();
		var active = $(".bulletin_list_wrap").find("ul li").eq(idx).find(".bulletin_line").attr("class");
		if(active != "bulletin_line"){
			$(".bulletin_list_wrap").find("ul li").eq(idx).removeClass("bulletin_select");
		}
	});
	/* 寃뚯떆�� list mouse on over end */

	/* �명꽣 familt_site �띿뒪�� �꾨��� slideUp str */
	$(".familysite_list").find("ul li").click(function(){
		$(".familysite_list").slideUp(500);
		family_onoff = 0;
	});
	/* �명꽣 familt_site �띿뒪�� �꾨��� slideUp end */
	/*0706*/
    $(".char_chk").click(function(){
        var chk = $(this).find("input").prop("checked");
        if(chk == false){
            $(this).addClass("on");
            $(this).find("input").prop("checked",true);
        }else{
            $(this).removeClass("on");
            $(this).find("input").prop("checked",false);
        }
    });
	$(".my_page_tb4 tr td p.char_chk").click(function(){
		$(this).addClass("on");
		$(this).parents("td").parents("tr").siblings().find("td").find("p.char_chk").removeClass("on");
	});
    $(".add_file_btn a").click(function(){
        $(".seal_file").click();
    });
	$(".agree_chk").click(function(){
        var chk = $(this).find("input").prop("checked");
        if(chk == false){
            $(this).addClass("on");
            $(this).find("input").prop("checked",true);
        }else{
            $(this).removeClass("on");
            $(this).find("input").prop("checked",false);
        }
    });
	$(".gd_main_list .list_top01 ul li").click(function(){
	  var i_cl = $(this).hasClass("active");
	   if(i_cl == true){
		   
	   }else{
		   $(this).addClass("active");
		   $(this).siblings().removeClass("active");
		   $(this).find("> a").addClass("active");
		   $(this).siblings().find("> a").removeClass("active");
		   $(this).parents(".list_top01").siblings().removeClass("active")
		   $(this).parents(".list_top01").siblings().find("ul li").removeClass("active")
		   $(this).parents(".list_top01").siblings().find("ul li > a").removeClass("active")
		   $(".list_top01 .gd_list_item").removeAttr("style");
		   
	   }
	   resize_gd_h();
	   resize_gd_h2();
   });
	
	$(".gd_main_list .list_top02 ul li").click(function(){
	  var i_cl = $(this).hasClass("active");
	   if(i_cl == true){
		   
	   }else{
		   $(this).addClass("active");
		   $(this).siblings().removeClass("active");
		   $(this).find("> a").addClass("active");
		   $(this).siblings().find("> a").removeClass("active");
		   $(this).parents(".list_top02").siblings().removeClass("active")
		   $(this).parents(".list_top02").siblings().find("ul li").removeClass("active")
		   $(this).parents(".list_top02").siblings().find("ul li > a").removeClass("active")
		   $(".list_top02 .gd_list_item").removeAttr("style");
		   
	   }
	   resize_gd_h();
	   resize_gd_h2();
   });
   $(".list_top03 h1").click(function() {
		var i_cl = $(this).parents(".list_top03").hasClass("on");
		if (i_cl == true) {

			$(this).parents(".list_top03").removeClass("on");
		} else {
			$(this).parents(".list_top03").addClass("on");
			$(this).parents(".list_top03").siblings().removeClass("on");
			/*$(this).find("> a").addClass("active");
			$(this).siblings().find("> a").removeClass("active");
			$(this).parents(".list_top02").siblings().removeClass("active")
			$(this).parents(".list_top02").siblings().find("ul li").removeClass("active")
			$(this).parents(".list_top02").siblings().find("ul li > a").removeClass("active")
			$(".list_top02 .gd_list_item").removeAttr("style");*/
		}
	});

	$(".list_top03 ul li").click(function() {
		var i_cl = $(this).hasClass("on");
		if(i_cl == true){
			$(this).removeClass("on");
			$(this).find(">a").removeClass("active");
		}else{
			$(this).addClass("on");
			$(this).siblings().removeClass("on");
			$(this).find("> a").addClass("active");
			$(this).siblings().find("> a").removeClass("active");
			$(this).parents(".list_top03").siblings().removeClass("on")
			$(this).parents(".list_top03").siblings().find("ul li").removeClass("on")
			$(this).parents(".list_top03").siblings().find("ul li > a").removeClass("on")
		}
	});
});
function cody_scroll_custom(){
    $(".app_repley_con").mCustomScrollbar({
        autoHideScrollbar:false,
        autoDraggerLength:true
    });
}
/* 寃��됱갹 select str */
function magnifier(){
	$(".magnifier").hide();
	$(".search_input").show();
}
function search_select(i){
	var img_temp;
    var dis = $(i).next(".condition_list").css("display");
	if(dis == "block"){
		$(i).next(".condition_list").hide();
        $(i).parents(".search_condition").removeClass("on");
		img_temp = $(i).find("img").attr("src");
		img_temp = img_temp.replace("off.png","on.png");
		$(i).find("img").attr("src",img_temp);
		search_onoff = 0;
	}else{
		$(i).next(".condition_list").show();
        $(i).parents(".search_condition").addClass("on");
		img_temp = $(i).find("img").attr("src");
		img_temp = img_temp.replace("on.png","off.png");
		$(i).find("img").attr("src",img_temp);
        $(".condition_list").mCustomScrollbar({
            autoHideScrollbar:false,
            autoDraggerLength:true
        });
	}
}
/* 寃��됱갹 select end */

/* server select on off (�먯쑀寃뚯떆��) str */
function server_select(){
	search_onoff = search_onoff + 1;
	if(search_onoff == 2){
		$(".server_list").hide();
		search_onoff = 0;
	}else{
		$(".server_list").show();
	}
}
/* server select on off (�먯쑀寃뚯떆��) end */

/* 留덉슦�� �ㅻ쾭�� �꾩썐 �덈릺�붽린��, �대┃ on off 湲곕뒫 str */
var img_count = false;
function img_change(i){
	var img_temp;
	if(img_count == false){
		img_temp = $(i).find("img").attr("src");
		img_temp = img_temp.replace("off.png","on.png");
		img_temp = $(i).find("img").attr("src",img_temp);
		img_count = true;
		$(".comment_id").hide();
	}else{
		img_temp = $(i).find("img").attr("src");
		img_temp = img_temp.replace("on.png","off.png");
		img_temp = $(i).find("img").attr("src",img_temp);
		$(".comment_id").show();
		img_count = false;
	}
}
function img_click(i){
	$(i).find("img").addClass("click_img");
	img_temp = img_temp.replace("on.png","off.png");
	$(i).parent("li").siblings().find("img").attr("src",img_temp);
	$(i).parent("li").siblings().find("img").removeClass("click_img");
}
function img_on(i){
	img_temp = $(i).find("img").attr("src");
	img_temp = img_temp.replace("off.png","on.png");
	$(i).find("img").attr("src",img_temp);
}
function img_out(i){
	var img_select = $(i).find("img").attr("class");
	if(img_select != "click_img"){
		img_temp = img_temp.replace("on.png","off.png");
		$(i).find("img").attr("src",img_temp);
	}
}
/* 留덉슦�� �ㅻ쾭�� �꾩썐 �덈릺�붽린��, �대┃ on off 湲곕뒫 end */

/* �대깽�� �꾩껜蹂닿린 onoff str */
var event_view = 0;
function event_onoff(){
	event_view = event_view + 1;
	if(event_view == 2){
		$(".event_bg").hide();
		event_view = 0;
	}else{
		$(".event_bg").show();
	}
}
/* �대깽�� �꾩껜蹂닿린 onoff end */

/* login �� �� str */
/*function sub_login(){
	$(".cm_login").hide();
	$(".login_after").show();
}
function sub_logout(){
	$(".cm_login").show();
	$(".login_after").hide();
}*/
/* login �� �� end */

/* �대え�곗퐯 on off str */
function emoticon(i){
	var img_temp;
	var emo_onoff = $(i).parent().find(">div").css("display");
	if(emo_onoff == "none"){
		img_temp = $(i).find("img").attr("src");
		img_temp = img_temp.replace("off.png","on.png");
		$(i).find("img").attr("src",img_temp);
		$(i).parent().find(">div").show();
	}else{
		img_temp = $(i).find("img").attr("src");
		img_temp = img_temp.replace("on.png","off.png");
		$(i).find("img").attr("src",img_temp);
		$(i).parent().find(">div").hide();
	}
}
function emoticon_close(){
	$(".small_emoticon2").hide();
}
/* �대え�곗퐯 on off end */

/* family_site �� �ㅽ봽 str */
var family_onoff = 0;
function family_site(){
	family_onoff = family_onoff + 1;
	if(family_onoff == 2){
		$(".familysite_list").slideUp(500);
		family_onoff = 0;
	}else{
		$(".familysite_list").slideDown(500);
	}
}
/* family_site �� �ㅽ봽 end */


function artist_pop(){
	var dis = $(".art_user_list_wrap").css("display");
	var src = $(".artist_list").find("img").attr("src");
	if(dis == "block"){
		$(".art_user_list_wrap").fadeOut(100);
		$(".artist_list").find("img").attr("src",src.replace("_on.png","_off.png"));
	}else{
		$(".art_user_list_wrap").fadeIn();
		$(".artist_list").find("img").attr("src",src.replace("_off.png","_on.png"));
	}
}
function close_artist_list(){
	var src = $(".artist_list").find("img").attr("src");
	$(".art_user_list_wrap").fadeOut(100);
	$(".artist_list").find("img").attr("src",src.replace("_on.png","_off.png"));
}


/*Select �먮룞 而ㅼ뒪��*/
function open_select(e){
	var dis = $(".select_wrap").eq(e).find("ul").css("display");
	if(dis == "none"){
		$(".select_wrap").eq(e).find("ul").show();
		$(".select_wrap").eq(e).find(".sel_txt").addClass("up");
	}else{
		$(".select_wrap").eq(e).find("ul").hide();
		$(".select_wrap").eq(e).find(".sel_txt").removeClass("up");
	}
}
function cus_sel(){
	var k = $(".custom_sel").length;
	for(var j = 0; j < k; j++){
		$(".custom_sel").eq(j).wrap("<div class='select_wrap' />")
		var a = $(".custom_sel").eq(j).attr("style");
		var b = $(".custom_sel").eq(j).find("option").length;
		var sl_txt = $(".custom_sel").eq(j).find("option:selected").text();
		$(".custom_sel").eq(j).parent(".select_wrap").attr("style",a);
		$(".custom_sel").eq(j).parent(".select_wrap").append("<span class='sel_txt' onclick='open_select("+j+");'><a href='#a' class='cus_sel_a'>"+sl_txt+"</a></span>")
		for(var i = 0; i < b; i++){
			var op_txt = $(".custom_sel").eq(j).find("option").eq(i).text();
			$(".custom_sel").eq(j).parent(".select_wrap").append("<li><a href='javascript:void(0)'>"+op_txt+"</a></li>");
		}
		$(".custom_sel").eq(j).parent(".select_wrap").find("li").wrapAll("<ul/>");
	}
	$(".select_wrap li").click(function(){
		var idx = $(this).index();
		var txt = $(this).text();
		$(this).parent("ul").parent(".select_wrap").find("span a").text(txt);
		$(this).parent("ul").hide();
		$(this).parent("ul").prev("span").removeClass("up");
		$(this).parent("ul").prev("span").prev(".custom_sel").find("option").eq(idx).attr("selected",true);
		$(this).parent("ul").prev("span").prev(".custom_sel").find("option").eq(idx).siblings().attr("selected",false);
		$(this).parent("ul").prev("span").prev(".custom_sel").change();
	});
}
function re_custom_sel(){
	$(".select_wrap").find("span").remove();
	$(".select_wrap").find("ul").remove();
	$(".custom_sel").unwrap("<div class='select_wrap' />");
	$(".select_wrap").find(".sel_txt").remove();
	cus_sel();
}

function open_select2(e){
    var dis = $(".custom_search_wrap02").eq(e).find("ul").css("display");
    if(dis == "none"){
        $(".custom_search_wrap02").eq(e).find("ul").show();
        $(".custom_search_wrap02").eq(e).find(".selected_txt").addClass("up");
		$(".custom_search_wrap02").eq(e).siblings(".custom_search_wrap02").find("ul").hide();
		$(".custom_search_wrap02").eq(e).siblings(".custom_search_wrap02").find(".selected_txt").removeClass("up");
    }else{
        $(".custom_search_wrap02").eq(e).find("ul").hide();
        $(".custom_search_wrap02").eq(e).find(".selected_txt").removeClass("up");
    }
}
function reset_custom_sel(){
	$(".custom_search_wrap02").find("span").remove();
	$(".custom_search_wrap02").find("ul").remove();
	$(".custom_sel2").unwrap("<div class='custom_search_wrap02' />");
	$(".custom_search_wrap02").find(".selected_txt").remove();
}
function reset_cus_sel2(){
	reset_custom_sel();
    cus_sel2();
}
function cus_sel2(){
    var k = $(".custom_sel2").length;
    for(var j = 0; j < k; j++){
        $(".custom_sel2").eq(j).wrap("<div class='custom_search_wrap02' />")
        var a = $(".custom_sel2").eq(j).attr("style");
        var b = $(".custom_sel2").eq(j).find("option").length;
        var sl_txt = $(".custom_sel2").eq(j).find("option:selected").text();
        $(".custom_sel2").eq(j).parent(".custom_search_wrap02").attr("style",a);
        $(".custom_sel2").eq(j).parent(".custom_search_wrap02").append("<span class='selected_txt' onclick='open_select2("+j+");'><a href='#a' class='cus_sel_a'>"+sl_txt+"</a></span>");
        for(var i = 0; i < b; i++){
            var op_txt = $(".custom_sel2").eq(j).find("option").eq(i).text();
            $(".custom_sel2").eq(j).parent(".custom_search_wrap02").append("<li><a href='javascript:void(0)'>"+op_txt+"</a></li>");
        }
        $(".custom_sel2").eq(j).parent(".custom_search_wrap02").find("li").wrapAll("<ul/>");
    }
    $(".custom_search_wrap02 li").click(function(){
        var idx = $(this).index();
        var txt = $(this).text();
        $(this).parent("ul").parent(".custom_search_wrap02").find("span a").text(txt);
        $(this).parent("ul").hide();
        $(this).parent("ul").prev("span").removeClass("up");
        $(this).parent("ul").prev("span").prev(".custom_sel2").find("option").eq(idx).attr("selected",true);
        $(this).parent("ul").prev("span").prev(".custom_sel2").find("option").eq(idx).siblings().attr("selected",false);
		$(this).parent("ul").prev("span").prev(".custom_sel2").change();
    });
}

$(function(){
    
   ajax_reply();
   $(window).scroll(function(){
	  var s_top = $(window).scrollTop();
	  var a = $("#GNB_Wrapper").outerHeight();
	  var b = $(".global_wrap").outerHeight();
	  var d = $(".right_aside").height()+a+b+360;
      var e = 310 + a + b;
	  if(s_top > a+b){
		$(".top_menu_wrap").addClass("fix_menu");
		$(".top_menu").addClass("fix_top_menu");
		$(".top_menu_bg").addClass("fix_menu_bg");
		if(s_top > d/2){
			var f_h = $("#footer").height();
			$(".fix_toon_control").css("bottom",f_h+"px"); 
			top_fadein();
		}else{
			top_fadeout();
		}
        if(s_top > e-73){
           $(".mnb_wrap").addClass("fixed");
           $(".mnb_blank").show();
        }else{
           $(".mnb_wrap").removeClass("fixed");
           $(".mnb_blank").hide();
        }
	  }else{
		$(".top_menu_wrap").removeClass("fix_menu");
		$(".top_menu").removeClass("fix_top_menu");
		$(".top_menu_bg").removeClass("fix_menu_bg");
		top_fadeout();
		$(".mnb_wrap").removeClass("fixed");
        $(".mnb_blank").hide();
	  }
   });

});
function top_fadein(){
	$(".fix_toon_control").fadeIn();
}
function top_fadeout(){
	$(".fix_toon_control").fadeOut();
}
function ajax_reply(){
	/*�섏젙 踰꾪듉 �대┃��*/
	/*
    $(".modify_reply").click(function(){
        var modify_txt;
        var reply_btn = $(this).parent("li").parent("ul.reply_btn_wrap");
        var reply_txt = $(this).parent("li").parent("ul.reply_btn_wrap").prev(".reply_text");
        var reply_id = $(this).parent("li").parent("ul.reply_btn_wrap").prev(".reply_text").find(".reply_charid").text();
        var txt_area = $(this).parent("li").parent("ul.reply_btn_wrap").next(".txar_wrap");
        modify_txt = reply_txt.text().trim();
        modify_txt = modify_txt.replace(reply_id,"");
        txt_area.show();
		txt_area.find("textarea").attr("id","modify_reply");
        txt_area.find("textarea").text(modify_txt);
        reply_btn.hide();
        reply_txt.hide();
    });*/
	/*�듦� 痍⑥냼 踰꾪듉*/
	/*
    $(".reply_cancle").click(function(){
       var txt_area = $(this).parent("li").parent("ul").parent(".txar_right_btn").parent(".txar_btn").parent(".txar_wrap");
       txt_area.find("textarea").text("");
       txt_area.hide();
       txt_area.parent("div").find(".reply_text").show();
       txt_area.parent("div").find(".reply_btn_wrap").show();
    });
	*/
	/* �듦� �낅젰李� Str */
	/*
	$(".reply_btn").click(function(){
		var txar_display = $(this).parent("ul").next(".txar_wrap").css("display");
		if(txar_display == "none"){
			$(this).parent("ul").next(".txar_wrap").show();
		}else{
			$(this).parent("ul").next(".txar_wrap").find("textarea").text("");
			$(this).parent("ul").next(".txar_wrap").hide();
		}
	});
	$(".reply_btn_gray").click(function(){
		var gray_txar = $(this).parents(".reply_gray").next().find(".txar_wrap").css("display");
		if(gray_txar == "none"){
			$(this).parents(".reply_gray").next().find(".txar_wrap").show();
		}else{
			$(this).parents(".reply_gray").next().find(".txar_wrap").find("textarea").text("");
			$(this).parents(".reply_gray").next().find(".txar_wrap").hide();
		}
	});
	*/
	$(".txar").keyup(function(){
		var maxLength = (COMMON) ? COMMON.maxCommentLength : 200;
		var txar_len = $(this).val();
		txar_len = txar_len.length;
		$(this).next().find(".txar_right_btn").find("span em").text(txar_len);
		if(txar_len > maxLength){
			alert(maxLength + "�먮� 珥덇낵�섏��듬땲��.");
			$(this).next().find(".txar_right_btn").find("span em").text(maxLength);
            $(this).val($(this).val().substring(0,maxLength));
		}else if(txar_len <= maxLength){
			$(this).next().find(".txar_right_btn").find("span em").css("color","#666666");
		}
    });
	/* �듦� �낅젰李� End */

	/* �대え�곗퐯 on off 湲곕뒫 Str */
	$(".emoticon_btn > a").click(function(){
		var emt_display = $(this).parent().find(".emoticon_wrap").css("display");
		var img_temp = $(this).find("img").attr("src");
		img_temp = img_temp.replace("_on.png","_off.png");
		$(".emoticon_btn > a img").attr("src",img_temp);
		if(emt_display == "none"){
			$(".emoticon_wrap").hide();
			$(this).parent().find(".emoticon_wrap").show();
			img_temp = img_temp.replace("_off.png","_on.png");
			$(this).find("img").attr("src",img_temp);
			$(this).parents(".txar_btn").css("z-index",999);
		}else{
			$(this).parent().find(".emoticon_wrap").hide();
			img_temp = img_temp.replace("_on.png","_off.png");
			$(this).find("img").attr("src",img_temp);
			$(this).parents(".txar_btn").css("z-index",99);
		}
	});
	$(".emoticon_close").click(function(){
		$(this).parents(".emoticon_wrap").hide();
		var img_temp = $(this).parents(".emoticon_wrap").parents(".emoticon_btn").find(">a img").attr("src");
		img_temp = img_temp.replace("_on.png","_off.png");
		$(this).parents(".emoticon_wrap").parents(".emoticon_btn").find(">a img").attr("src",img_temp);
	});
	/* �대え�곗퐯 on off 湲곕뒫 End */

	/* �대え�곗퐯 over out click 湲곕뒫 Str */
	$(".emoticon_wrap ul li").mouseover(function(){
		$(this).addClass("emoticon_on");
	});
	$(".emoticon_wrap ul li").mouseout(function(){
		$(this).removeClass("emoticon_on");
	});
	$(".emoticon_wrap ul li").click(function(){
        var a = $(this).index();
        var add_html = "";
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
		$(this).siblings().mouseout();
        a = a+1;
        add_html = add_html + '<span class="emoticon_sum">';
        add_html = add_html + '<img src="https://ssl.nexon.com/s2/game/maplestory/renewal/common/sum_emoticon'+ a +'.png" alt="" />';
        add_html = add_html + '<em><a href="#a" onclick="del_emoticon(this)"><img src="https://ssl.nexon.com/s2/game/maplestory/renewal/common/sum_emoticon_del.png" alt="��젣" /></a></em>';
        add_html = add_html + '</span>';
        var append_wrap = $(this).parents("ul").parents(".emoticon_bg").parents(".emoticon_wrap").parents(".emoticon_btn").parents(".txar_btn");
        var append_wrap2 = $(this).parents("ul").parents(".emoticon_bg").parents(".emoticon_wrap").parents(".emoticon_btn").parents(".bottom_txar_btn");
        append_wrap.find(".emoticon_sum").remove();
        append_wrap.append(add_html);
        append_wrap.parents(".txar_wrap").find("input[name=emo]").val(a);

        append_wrap2.find(".emoticon_sum").remove();
        append_wrap2.append(add_html);
        append_wrap2.parents(".bottom_txar").find("input[name=emo]").val(a);
	});
	/* �대え�곗퐯 over out click 湲곕뒫 End */
}
function del_emoticon(i){
    $(i).parents("em").parents(".emoticon_sum").parents(".txar_btn").parents(".txar_wrap").find("input[name=emo]").val("0");
	$(i).parents("em").parents(".emoticon_sum").remove();
}
/* 怨듦컧�섍린�앹뾽 Str */
function popup_open(){
	$(".empathy_popup").show();
    $(".popup_scroll").mCustomScrollbar({
		autoHideScrollbar:false,
		autoDraggerLength:true
	});
}
function popup_close(){
	$(".empathy_popup").hide();
}
/* 怨듦컧�섍린�앹뾽 End */

/* �듦� �붾낫湲� Str */
function reply_more(i){
	var more_display = $(".reply_ul > li").eq(i).find(".reply_gray_wrap .reply_gray_info").eq(0).siblings().css("display");
	if(more_display == "none"){
		$(".reply_ul > li").eq(i).find(".reply_gray_wrap .reply_gray_info").show();
		$(".reply_ul > li").eq(i).find(".reply_more a").html("<img src='https://ssl.nexon.com/s2/game/maplestory/renewal/common/reply_more_on.png' alt='�듦� �묎린'/>" +"�듦� �묎린");
	}else{
		$(".reply_ul > li").eq(i).find(".reply_gray_wrap .reply_gray_info").eq(0).siblings().hide();
		$(".reply_ul > li").eq(i).find(".reply_more a").html("<img src='https://ssl.nexon.com/s2/game/maplestory/renewal/common/reply_more_off.png' alt='�듦� �붾낫湲�'/>" +"�듦� �붾낫湲�");
	}
}
/* �듦� �붾낫湲� End */
function up_list_open(){
    $(".up_user_list_wrap").show();
}
function down_list_open(){
    $(".down_user_list_wrap").show();
}
function up_list_close(){
    $(".up_user_list_wrap").hide();
}
function down_list_close(){
    $(".down_user_list_wrap").hide();
}
function cody_wr_open(){
    $(".cody_write_wrap").fadeIn();
}
function cody_wr_close(){
    $(".cody_write_wrap").fadeOut();
}
function open_rank_pop(){
    $(".rank_popup_wrap").fadeIn();
}
function close_rank_pop(){
    $(".rank_popup_wrap").fadeOut();
}
function open_today_evt_list(){
    var cl = $(".today_event").attr("class");
    if(cl == "today_event"){
        $(".today_event").addClass("open");
        $(".today_btn").find("img").attr("src",$(".today_btn").find("img").attr("src").replace("_off.png","_on.png"));
    }else{
        $(".today_event").removeClass("open");
        $(".today_btn").find("img").attr("src",$(".today_btn").find("img").attr("src").replace("_on.png","_off.png"));
    }
}
/*2018.05.24*/
function toon_sel(){
	var k = $(".toon_sel").length;
	for(var j = 0; j < k; j++){
		$(".toon_sel").eq(j).wrap("<div class='toon_cus_sel_wrap' />")
		var a = $(".toon_sel").eq(j).attr("style");
		var b = $(".toon_sel").eq(j).find("option").length;
		var sl_txt = $(".toon_sel").eq(j).find("option:selected").text();
		$(".toon_sel").eq(j).parents(".toon_cus_sel_wrap").attr("style",a);
		$(".toon_sel").eq(j).parents(".toon_cus_sel_wrap").append("<span class='sel_txt' onclick='open_toon_select("+j+");'><a href='#a'>"+sl_txt+"</a></span>")
		for(var i = 0; i < b; i++){
			var op_txt = $(".toon_sel").eq(j).find("option").eq(i).text();
			$(".toon_sel").eq(j).parents(".toon_cus_sel_wrap").append("<li><a href='javascript:void(0)'>"+op_txt+"</a></li>");
		}
		$(".toon_sel").eq(j).parents(".toon_cus_sel_wrap").find("li").wrapAll("<ul/>");
        $(".toon_sel").eq(j).parents(".toon_cus_sel_wrap").css("min-width",$(".toon_sel").eq(j).siblings("ul").outerWidth());
	}
	$(".toon_veiw_select_wrap").find("ul").mCustomScrollbar({
        autoHideScrollbar:false,
        autoDraggerLength:true
    });
	$(".toon_cus_sel_wrap li").click(function(){
		var idx = $(this).index();
		var txt = $(this).text();
		$(this).parents("ul").parents(".toon_cus_sel_wrap").find("span a").text(txt);
		$(this).parents("ul").hide();
		$(this).parents("ul").prev("span").removeClass("up");
		$(this).parents("ul").prev("span").prev(".toon_sel").find("option").eq(idx).attr("selected",true);
		$(this).parents("ul").prev("span").prev(".toon_sel").find("option").eq(idx).siblings().attr("selected",false);
        $(this).parents("ul").prev("span").prev(".toon_sel").change();
	});
}
function open_toon_select(e){
	var dis = $(".toon_cus_sel_wrap").eq(e).find("ul").css("display");
	if(dis == "none"){
		$(".toon_cus_sel_wrap").eq(e).find("ul").show();
		$(".toon_cus_sel_wrap").eq(e).find(".sel_txt").addClass("up");
	}else{
		$(".toon_cus_sel_wrap").eq(e).find("ul").hide();
		$(".toon_cus_sel_wrap").eq(e).find(".sel_txt").removeClass("up");
	}
}
function top_move(){
    $("html,body").animate({"scrollTop":"0"},0);
	$(".mnb_wrap").removeClass("fixed");
	$(".mnb_blank").hide();
}
/*05.30*/
function ch_png_on(e){
	var a = $(e).find("img");
	var src = $(e).find("img").attr("src");
	var cl = $(e).attr("class");
	if(cl != "active"){
		var src_new = src.replace("_off.png","_on.png");
		a.attr("src",src_new);
	}

}
function ch_png_off(e){
	var a = $(e).find("img");
	var src = $(e).find("img").attr("src");
	var cl = $(e).attr("class");
	if(cl != "active"){
		var src_new = src.replace("_on.png","_off.png");
		a.attr("src",src_new);
	}
}

/*�뚯븙 �뚮젅�� 而⑦듃濡�*/
function ms_play_btn(i){
        var idx = $(i).parents("li").parents("ul").parents("dl").parents("li").index();
        var ms_idx = idx + 1;
        var len = $(".music_board_list > ul > li").length;
        $(".music_board_list > ul > li").eq(idx).addClass("on");
        $(".music_board_list > ul > li").eq(idx).siblings().removeClass("on");
        for(var j = 1; j < len+1; j++){
            if(ms_idx == j){
                document.getElementById("audio_play"+j).play();
                        $(i).parents("li").parents("ul").parents("dl").parents("li").find("span.play_info").find("img").attr("src",$(i).parents("li").parents("ul").parents("dl").parents("li").find("span.play_info").find("img").attr("src").replace("_off.png","_on.gif"));
            }else{
                document.getElementById("audio_play"+j).pause();
		        document.getElementById("audio_play"+j).currentTime = 0;
                $(i).parents("li").parents("ul").parents("dl").parents("li").siblings().find("span.play_info").find("img").attr("src",$(i).parents("li").parents("ul").parents("dl").parents("li").siblings().find("span.play_info").find("img").attr("src").replace("_on.gif","_off.png"));
            }
        }
    }
    function ms_pause_btn(i){
        var idx = $(i).parents("li").parents("ul").parents("dl").parents("li").index();
        var ms_idx = idx + 1;
        document.getElementById("audio_play"+ms_idx).pause();        $(i).parents("li").parents("ul").parents("dl").parents("li").find("span.play_info").find("img").attr("src",$(i).parents("li").parents("ul").parents("dl").parents("li").find("span.play_info").find("img").attr("src").replace("_on.gif","_off.png"));
    }
    function ms_stop_btn(i){
        var idx = $(i).parents("li").parents("ul").parents("dl").parents("li").index();
        var ms_idx = idx + 1;
        document.getElementById("audio_play"+ms_idx).pause();
		document.getElementById("audio_play"+ms_idx).currentTime = 0;
        $(i).parents("li").parents("ul").parents("dl").parents("li").find("span.play_info").find("img").attr("src",$(i).parents("li").parents("ul").parents("dl").parents("li").find("span.play_info").find("img").attr("src").replace("_on.gif","_off.png"));
    }
function art_work_size(){
    var w_h = $(window).height();
    var w_w = $(window).width();
    var margin_h = 0;
    if(w_w > 1280){
        $(".art_work_center").css({"width":"1000px","height":"625px"});
    }else{
        $(".art_work_center").css({"width":"700px","height":"437px"});
    }
    var img_h = $(".art_work_center").height();
    if(w_h > img_h){
        margin_h = (w_h - img_h-110)/2;
        $(".art_work_center").css("margin-top",margin_h+"px");
    }
}
function open_art_popup(){
    $(".art_wrok_layer").fadeIn();
    art_work_size();
}
function chg_art_img(i){
    $(".art_work_center").find("img").attr("src",i);
    art_work_size();
}
function close_art_popup(){
    $(".art_wrok_layer").fadeOut();
}
function movie_size(){
    var w_h = $(window).height();
    var w_w = $(window).width();
    var margin_h = 0;
    if(w_w > 1280){
        $(".movie_center").css({"width":"1000px","height":"625px"});
    }else{
        $(".movie_center").css({"width":"700px","height":"437px"});
    }
    var img_h = $(".movie_center").height();
    if(w_h > img_h){
        margin_h = (w_h - img_h-110)/2;
        $(".movie_center").css("margin-top",margin_h+"px");
    }
}
function open_move(i){
    $(".movie_wrap").fadeIn();
    movie_size();
	chg_movie(i);
    document.getElementById("video_con").play();
	var txt = $(".movie_board_list > ul > li").eq(i-1).find("dl").find("dd").eq(0).find("a").html();
    $(".movie_bottom em").html(txt);
}
function close_movie_popup(){
    document.getElementById("video_con").pause();
    document.getElementById("video_con").currentTime = 0;
    $(".movie_wrap").fadeOut();
}
function chg_movie(i){
    $("#video_con").attr("src","http://maplestory.vod.nexoncdn.co.kr/movie_"+i+".mp4");
}


/*�쒕툕�섏씠吏��먯꽌�� 怨꾩젙�좏깮李� �꾩슂 (KJW: 20180602)*/
function open_login_pop() {
    $(".login_popup_wrap").fadeIn();
    $(".sel_login_id ul li a").click(function () {
        $(this).addClass("on");
        $(this).parents("li").siblings().find("a").removeClass("on");
        $(this).next("input[type=radio]").click();
    });
}
function close_login_pop() {
    $(".login_popup_wrap").fadeOut();
}

/*0618*/
function my_maple_js1(){
    /*0614*/
    $(".char_list").mCustomScrollbar({
       autoHideScrollbar:false,
       autoDraggerLength:true
    });
    $(".ms_id_list").mCustomScrollbar({
       autoHideScrollbar:false,
       autoDraggerLength:true
    });
    $(".ms_id_list li").click(function(){
       $(this).addClass("on");
       $(this).siblings().removeClass("on");
       $(this).find("input").prop("checked",true).change();
       $(this).siblings().find("input").prop("checked",false);
    });
    $(".my_char_list li dl dd.char_chk").click(function(){
      $(this).addClass("on");
      $(this).parents("dl").parents("li").siblings().find("dd.char_chk").removeClass("on");
      $(this).find("input").prop("checked",true);
       $(this).parents("dl").parents("li").siblings().find("dd.char_chk").find("input").prop("checked",false);
    });
    $(".server_sel_txt").click(function(){
        var dis = $(".server_list2").css("display");
        if(dis == "none"){
            $(".server_list2").show();
        }else{
            $(".server_list2").hide();
        }
    });
    $(".server_list2 li").click(function(){
        var idx = $(this).index();
        var txt = $(this).html();
        $(".server_sel_txt").html(txt);
        $(".server_list2").hide();
        $(this).parents("ul").next("select").find("option").eq(idx).attr("selected",true);
        $(this).parents("ul").next("select").find("option").eq(idx).siblings().attr("selected",false);
        $(this).parents("ul").next("select").change();
    });
}
function my_maple_js2(){
    $(".ms_id_list").mCustomScrollbar({
       autoHideScrollbar:false,
       autoDraggerLength:true
    });
    $(".ms_id_list li").click(function(){
       var chk = $(this).find("input").prop("checked");
       if(chk == false){
        $(this).addClass("on");
        $(this).find("input").prop("checked",true);
       }else{
        $(this).removeClass("on");
        $(this).find("input").prop("checked",false);
       }
    });
}

function char_info_js(){
   $(".char_list2").mCustomScrollbar({
       autoHideScrollbar:false,
       autoDraggerLength:true
    });
    $(".ms_id_list").mCustomScrollbar({
       autoHideScrollbar:false,
       autoDraggerLength:true
    });
    $(".ms_id_list li").click(function(){
       $(this).addClass("on");
       $(this).siblings().removeClass("on");
       $(this).find("input").prop("checked",true);
       $(this).siblings().find("input").prop("checked",false);
    });
    $(".chk").click(function(){
       var chk = $(this).find("input").prop("checked");
        if(chk == false){
            $(this).addClass("on");
            $(this).find("input").prop("checked",true);
        }else{
            $(this).removeClass("on");
            $(this).find("input").prop("checked",false);
            $(".all_chk_char_info").removeClass("on");
        }
    });
    $(".all_chk_char_info").click(function(){
        if($(this).hasClass("on")){
            $(this).removeClass("on");
            $(".chk").removeClass("on").find("input").prop("checked",false);
        } else{
            $(this).addClass("on");
            $(".chk").addClass("on").find("input").prop("checked",true);
        }
    });
    $(".server_sel_txt").click(function(){
        var dis = $(".server_list2").css("display");
        if(dis == "none"){
            $(".server_list2").show();
        }else{
            $(".server_list2").hide();
        }
    });
    $(".server_list2 li").click(function(){
        var idx = $(this).index();
        var txt = $(this).html();
        $(".server_sel_txt").html(txt);
        $(".server_list2").hide();
        $(this).parents("ul").next("select").find("option").eq(idx).attr("selected",true);
        $(this).parents("ul").next("select").find("option").eq(idx).siblings().attr("selected",false);
        $(this).parents("ul").next("select").change();
    });
    $(".my_char_list li dl dd.char_chk").click(function(){
      var chk = $(this).find("input").prop("checked");
      if(chk == false){
        $(this).addClass("on");
        $(this).find("input").prop("checked",true);
      }else{
        $(".all_chk_char").removeClass("on");
        $(this).removeClass("on");
        $(this).find("input").prop("checked",false);
      }
    });
    $(".all_chk_char").click(function(){
        if($(this).hasClass("on")){
            $(this).removeClass("on");
            $(".char_chk").removeClass("on").find("input").prop("checked",false);
        } else{
            $(this).addClass("on");
            $(".char_chk").addClass("on").find("input").prop("checked",true);
        }
    });
}

function buy_search_list(){
    $(".buy_search_y > span > a").click(function(){
       var dis = $(this).next("ul").css("display");
       if(dis == "none"){
           $(this).next("ul").show();
		   $(".buy_search_m").find("ul").hide();
       }else{
           $(this).next("ul").hide();
       }
    });
    $(".buy_search_m > span > a").click(function(){
       var dis = $(this).next("ul").css("display");
       if(dis == "none"){
           $(this).next("ul").show();
		   $(".buy_search_y").find("ul").hide();
       }else{
           $(this).next("ul").hide();
       }
    });
    $(".buy_search_y span li a").click(function(){
        var idx = $(this).parents("li").index();
        var txt = $(this).text();
        $(".buy_search_y span > a").text(txt);
        $(".buy_search_y span").find("ul").hide();
        $(this).parents("li").parents("ul").next("select").find("option").eq(idx).prop("selected",true);
        $(this).parents("li").parents("ul").next("select").find("option").eq(idx).siblings().prop("selected",false);
        $(this).parents("li").parents("ul").next("select").change();
    });
    $(".buy_search_m span li a").click(function(){
        var idx = $(this).parents("li").index();
        var txt = $(this).text();
        $(".buy_search_m span > a").text(txt);
        $(".buy_search_m span").find("ul").hide();
        $(this).parents("li").parents("ul").next("select").find("option").eq(idx).prop("selected",true);
        $(this).parents("li").parents("ul").next("select").find("option").eq(idx).siblings().prop("selected",false);
        $(this).parents("li").parents("ul").next("select").change();
    });
}


function ser_sel_cus(){
	$(".server_list_wrap ul li a").click(function(){
		var idx = $(this).parents("li").index();
		var txt = $(this).html();
		$(this).parents("li").parents("ul").next("select").find("option").eq(idx).prop("selected",true);
		$(".server_name").find("a").html(txt);
		$(".server_name").removeClass("on");
		$(".server_list_wrap").hide();
		$(this).parents("li").parents("ul").next("select").change();
	});
	$(".server_name").click(function(){
		var dis =$(".server_list_wrap").css("display");
		if(dis == "block"){
			$(".server_name").removeClass("on");
			$(".server_list_wrap").hide();
		}else{
			$(".server_name").addClass("on");
			$(".server_list_wrap").show();
		}

	});
}


function ser_sel_cus2(){
	$(".w_server_list_wrap ul li a").click(function(){
		var idx = $(this).parents("li").index();
		var txt = $(this).html();
		$(this).parents("li").parents("ul").next("select").find("option").eq(idx).prop("selected",true);
		$(".w_server_name").find("a").html(txt);
		$(".w_server_name").removeClass("on");
		$(".w_server_list_wrap").hide();
		$(this).parents("li").parents("ul").next("select").change();
	});
	$(".w_server_name").click(function(){
		var dis =$(".w_server_list_wrap").css("display");
		if(dis == "block"){
			$(".w_server_name").removeClass("on");
			$(".w_server_list_wrap").hide();
			$(".rank_sort").show()
		}else{
			$(".w_server_name").addClass("on");
			$(".w_server_list_wrap").show();
			$(".rank_sort").hide()
		}

	});
}

function cl_ser_sel(){
	$(".server_name").removeClass("on");
	$(".server_list_wrap").hide();
}

function cl_ser_sel2(){
	$(".w_server_name").removeClass("on");
	$(".w_server_list_wrap").hide();
	$(".rank_sort").show();
}
function board_sort_sel(){
	$(".sort_wrap ul li").click(function(){
		var idx = $(this).index();
		var txt = $(this).find("a").text();
		$(this).parents("ul").next("select").find("option").eq(idx).prop("selected",true);
		$(this).parents("ul").prev("a").text(txt);
		$(this).parents("ul").hide();
		$(this).parents("ul").next("select").change();

	});
	$(".sort_wrap > a").click(function(){
		var dis = $(this).next("ul").css("display");
		$(this).parents(".sort_wrap").siblings(".sort_wrap").find("ul").css("display","none");
		if(dis == "none"){
			$(this).next("ul").show();
		}else{
			$(this).next("ul").hide();
		}
	});
}
/*0706*/
function chg_seal(){
	$(".sort_wrap2 ul li").click(function(){
		var idx = $(this).index();
		var txt = $(this).find("a").text();
		$(this).parents("ul").next("select").find("option").eq(idx).prop("selected",true);
		$(this).parents("ul").prev("a").text(txt);
		$(this).parents("ul").hide();
		$(this).parents("ul").next("select").change();
	});
	$(".sort_wrap2 > a").click(function(){
		var dis = $(this).next("ul").css("display");
		$(this).parents(".sort_wrap2").siblings(".sort_wrap2").find("ul").css("display","none");
		if(dis == "none"){
			$(this).next("ul").show();
		}else{
			$(this).next("ul").hide();
		}
	});
}
function add_file(){
    var txt = $(".seal_file").val();
    $(".file_addr").text(txt);
}
/*0717*/
function re_add_file(i){
    $(i).next("input").click();
}

function guid_sel(){
	$(".g_m_name > a").click(function(){
		var dis = $(this).parents(".g_m_name").find("ul.g_m_deps2").css("display");
		$(this).parents(".g_m_name").parents(".g_menu").siblings(".g_menu").find("ul").css("display","none");
		if(dis == "none"){
			$(this).parents(".g_m_name").addClass("on");
			$(this).parents(".g_m_name").find("ul.g_m_deps2").show();
		}else{
			$(this).parents(".g_m_name").removeClass("on");
			$(this).parents(".g_m_name").find("ul.g_m_deps2").hide();
		}
	});
	$(".g_m_deps2 li").click(function(){
		var txt = $(this).find("a").text();
		var idx = $(this).index();
		$(this).parents("ul").parents(".g_m_name").find(".g_m_title").text(txt);
		$(this).parents("ul").parents(".g_m_name").find("select").find("option").eq(idx).prop("selected",true).change();
		$(this).parents("ul").hide();
	});
}

var sub_ev_idx = 0;
var sub_ev_flag = false;
var auto_sub_ev_roll = setInterval(next_event_roll,3000);
function next_event_roll(){
	if(sub_ev_flag == false){
		sub_ev_flag = true;
		sub_ev_idx = sub_ev_idx + 1;
		var mv_len = 954;
		var len = $(".event_view_roll ul li").length;
		var mv_idx = Math.ceil(len / 3);
		if(mv_idx == sub_ev_idx){
			sub_ev_idx = 0;
		}
		$(".event_view_roll ul").animate({"left":sub_ev_idx * mv_len * -1 + "px"},500,function(){
			sub_ev_flag = false;
		});;
		$(".sub_ev_dot").find("a").eq(sub_ev_idx).mouseover();
		$(".sub_ev_dot").find("a").eq(sub_ev_idx).addClass("active");
		$(".sub_ev_dot").find("a").eq(sub_ev_idx).siblings().removeClass("active");
		$(".sub_ev_dot").find("a").eq(sub_ev_idx).siblings().mouseout();
	}
}
function pos_event_roll(i){
	clearInterval(auto_sub_ev_roll);
	if(sub_ev_flag == false){
		sub_ev_flag = true;
		sub_ev_idx = i;
		var mv_len = 954;
		$(".event_view_roll ul").animate({"left":i * mv_len * -1 + "px"},500,function(){
			sub_ev_flag = false;
			auto_sub_ev_roll = setInterval(next_event_roll,3000);
		});;
		$(".sub_ev_dot").find("a").eq(sub_ev_idx).mouseover();
		$(".sub_ev_dot").find("a").eq(sub_ev_idx).addClass("active");
		$(".sub_ev_dot").find("a").eq(sub_ev_idx).siblings().removeClass("active");
		$(".sub_ev_dot").find("a").eq(sub_ev_idx).siblings().mouseout();
	}
	
}
var gm_str_idx = 0;
var gm_str_effect = setInterval(gm_str_btn,50);
function gm_str_btn(){
	gm_str_idx = gm_str_idx + 1;
	if(gm_str_idx == 77){
		gm_str_idx = 0;
	}
	$(".main_str_btn").css("top",gm_str_idx*234*-1+"px");
}

function show_btn_top(){
    if($(".fix_toon_control").length > 0) { return false;}
    var bottom = parseInt($(".btn_top").css("bottom"));
    $(window).scroll(function(){
        var sct = $(window).scrollTop(),
            distance = $(document).height() - $("#footer").outerHeight() - $(window).height();
        if(sct>= $("#container").offset().top && !$(".btn_top").hasClass("show")){
            $(".btn_top").stop().addClass("show").fadeIn(300);
        } else if(sct < $("#container").offset().top && $(".btn_top").hasClass("show")){
            $(".btn_top").stop().removeClass("show").fadeOut(300);
        }
        if(sct >= distance){
            $(".btn_top").css({"bottom":sct - distance + bottom  + "px"});
        } else {
            $(".btn_top").css({"bottom":""});
        }
    });
}

/*2018.11.19*/
function mnb_setting(){
    var mnb_first_w = $(".mnb_list li.active").width();
    if(mnb_first_w > 0){
        var w_len_first = 0;
        var idx = $(".mnb_list li.active").index();
        for(var i = 0; i < idx; i++){
            w_len_first = w_len_first + $(".mnb_list li").eq(i).width()+54;
        }
        $(".mnb_line").stop().animate({"width":mnb_first_w+"px","left":w_len_first+"px"},500);
    }else{
        var w_len_first = 0;
        mnb_first_w = $(".mnb_list li").eq(0).width();
        $(".mnb_line").stop().animate({"width":mnb_first_w+"px","left":w_len_first+"px"},500);
    }
    $(".mnb_list li").mouseover(function(){
        var w_len = $(this).width();
        var mv_w = 0;
        var idx = $(this).index();
        for(var i = 0; i < idx; i++){
            mv_w = mv_w + $(".mnb_list li").eq(i).width()+54;
        }
        $(".mnb_line").stop().animate({"width":w_len+"px","left":mv_w+"px"},500);
    });
    $(".mnb_list li").mouseout(function(){
        var w_len = $(".mnb_list li.active").width();
        if(w_len > 0){
            var w_len_first = 0;
            var idx = $(".mnb_list li.active").index();
            for(var i = 0; i < idx; i++){
                w_len_first = w_len_first + $(".mnb_list li").eq(i).width()+54;
            }
            $(".mnb_line").stop().animate({"width":mnb_first_w+"px","left":w_len_first+"px"},500);
        }else{
            var mv_w = 0;
            w_len = $(".mnb_list li").eq(0).width();
            $(".mnb_line").stop().animate({"width":w_len+"px","left":mv_w+"px"},500);
        }
    });
}
var side_bn_flag = true;
var side_bn_idx = 0;
function next_side_bn(){
	clearInterval(side_bn_auto);
	if(side_bn_flag == true){
		side_bn_flag = false;
		var len = $(".side_bn_img_wrap ul li").length;
		len = len -1;
		if(side_bn_idx >= len){
			side_bn_idx = 0;    
		}else{
			side_bn_idx = side_bn_idx + 1;
		}
		$(".side_bn_img_wrap ul").animate({"left":230*side_bn_idx*-1+"px"},500,function(){
			side_bn_auto = setInterval(next_side_bn,3000);
			side_bn_flag = true;
		});;
		$(".side_bn_control span em").text(side_bn_idx+1);
		$("#event_current_text span").eq(side_bn_idx).show();
		$("#event_current_text span").eq(side_bn_idx).siblings().hide();
	}
    
}
function prev_side_bn(){
	clearInterval(side_bn_auto);
	if(side_bn_flag == true){
		side_bn_flag = false;
		var len = $(".side_bn_img_wrap ul li").length;
		len = len -1;
		if(side_bn_idx <= 0){
			side_bn_idx = len;    
		}else{
			side_bn_idx = side_bn_idx - 1;
		}
		$(".side_bn_img_wrap ul").animate({"left":230*side_bn_idx*-1+"px"},500,function(){
			side_bn_auto = setInterval(next_side_bn,3000);
			side_bn_flag = true;
		});;
		$(".side_bn_control span em").text(side_bn_idx+1);
		$("#event_current_text span").eq(side_bn_idx).show();
		$("#event_current_text span").eq(side_bn_idx).siblings().hide();
	}

    
}
function login_after_info(){
    var len = $(".sub_login_info_wrap span").length;
    $(".sub_login_info").animate({"opacity":"1","left":"180px"},500,function(){
        if(len != 1){
            $(".sub_user_name").animate({"opacity":"1","left":"163px"},300);
            $(".sub_user_word").animate({"opacity":"1","left":"128px"},500);
            $(".sub_user_job").animate({"opacity":"1","left":"93px"},700);    
        }else{
            $(".sub_user_nochar").animate({"opacity":"1","left":"163px"},300);
        }
        
    });
}
function world_radio_cus(){
    $(".word_chk_wrap li a").click(function(){
        $(this).next("input").prop("checked",true);
        $(this).parent("li").addClass("active");
        $(this).parent("li").siblings().removeClass("active");
    });
}
function rank_sel_ajax(){
	reset_rank_select();
	rank_select_custom();
	rank_select_custom();
}
var cus_option_len = 0;
function reset_rank_select(){
	var len = $(".rank_sel_custom").length;
	var cus_option;
	for(var i = 0; i < len; i++){
		$(".rank_sel_custom").eq(i).find("ul").find("li").remove();
		var k = $(".rank_sel_custom").eq(i).find("select").find("option").length;
		for(var j = 0; j < k; j++){
			var html_op = "<li><a href='#a'>"+$(".rank_sel_custom").eq(i).find("select").find("option").eq(j).text()+"</a></li>";
			$(".rank_sel_custom").eq(i).find("ul").append(html_op);
		}
	}
}
function rank_select_custom(){
    $(".rank_sel_custom > a").click(function(){
        var cl = $(this).parent("div.rank_sel_custom").attr("class");
        if(cl == "rank_sel_custom on"){
            $(this).parent("div.rank_sel_custom").removeClass("on");
        }else{
            $(this).parent("div.rank_sel_custom").addClass("on");
        }
    });
    $(".rank_sel_custom ul li").click(function(){
        var idx = $(this).index();
        var txt = $(this).find("a").text();
        $(this).parent("ul").parent("div.rank_sel_custom").removeClass("on");
        $(this).parent("ul").next("select").find("option").eq(idx).prop("selected",true);
        $(this).parent("ul").prev("a").text(txt);
        $(this).parent("ul").next("select").change();
    });
}
function open_guide_menu(e){
    var dis = $(".guide_all_menu").css("display");
    if (dis == "none"){
        $(".guide_all_menu").fadeIn();
        $(e).addClass("active");
    }else{
        $(".guide_all_menu").fadeOut();
        $(e).removeClass("active");
    }
}
function close_guide_menu(){
    $(".guide_all_menu").fadeOut();
    $(".guide_menu_btn02").removeClass("active");
}
var mv_clip = 0;
function befor_login_char(){
    mv_clip = mv_clip + 1;
    var h = $(".mv_clip").find("img").height();
    var cnt = h / 200;
    if(mv_clip == cnt){
        mv_clip = 0;
    }
    $(".mv_clip").find("img").css("top",mv_clip*-200+"px");

}


/*移대뱶�댁뒪 異붽�*/
var card_idx = 0;
function next_card(){
	var len = $(".card_news_list li").length;
	card_idx = card_idx + 1;
	if(card_idx > len-1){
		card_idx = len-1;
	}
	$(".card_news_list li").eq(card_idx).fadeIn();
	$(".card_news_list li").eq(card_idx).siblings().fadeOut();
	$(".card_bn_dot a").eq(card_idx).mouseover();
	$(".card_bn_dot a").eq(card_idx).addClass("active");
	$(".card_bn_dot a").eq(card_idx).siblings().removeClass("active");
	$(".card_bn_dot a").eq(card_idx).siblings().mouseout();
}
function prev_card(){
	var len = $(".card_news_list li").length;
	card_idx = card_idx - 1;
	if(card_idx < 0){
		card_idx = 0;
	}
	$(".card_news_list li").eq(card_idx).fadeIn();
	$(".card_news_list li").eq(card_idx).siblings().fadeOut();
	$(".card_bn_dot a").eq(card_idx).mouseover();
	$(".card_bn_dot a").eq(card_idx).addClass("active");
	$(".card_bn_dot a").eq(card_idx).siblings().removeClass("active");
	$(".card_bn_dot a").eq(card_idx).siblings().mouseout();
}
function card_news_pos(i){
	card_idx = i;
	$(".card_news_list li").eq(card_idx).fadeIn();
	$(".card_news_list li").eq(card_idx).siblings().fadeOut();
	$(".card_bn_dot a").eq(card_idx).mouseover();
	$(".card_bn_dot a").eq(card_idx).addClass("active");
	$(".card_bn_dot a").eq(card_idx).siblings().removeClass("active");
	$(".card_bn_dot a").eq(card_idx).siblings().mouseout();
}
function close_media_popup(){
	$(".media_layer").fadeOut();
	$(".media_pop_center").find("iframe").attr("src","");
}
function media_pop_size(){
	var w_h = $(window).height();
	var w_w = $(window).width();
	var margin_h = 0;
	if(w_w > 1280){
		$(".media_pop_center").css({"width":"1000px","height":"625px"});
	}else{
		$(".media_pop_center").css({"width":"700px","height":"437px"});
	}
	var img_h = $(".media_pop_center").height();
	if(w_h > img_h){
		margin_h = (w_h - img_h-110)/2;
		$(".media_pop_center").css("margin-top",margin_h+"px");
	}
}
function open_media_popup(){
	$(".media_layer").fadeIn();
	media_pop_size();
}
function chg_media_src(i){
	$(".media_pop_center").find("iframe").attr("src",i);
	media_pop_size();
}
function resize_gd_h(){
	max_h = 0;
	var len = $(".list_top01 .gd_list_item").length;
    $(".list_top01 .gd_list_item").attr("style","");
	for (var i = 0; i < len-1; i++){
		var h = $(".list_top01").eq(i).find(".gd_list_item").height();
		var h1 = $(".list_top01").eq(i+1).find(".gd_list_item").height();
		if(h < h1){
			if(max_h < h1){
				max_h = h1;
			}
		}else{
			if(max_h < h){
				max_h = h;
			}
		}
	}
	$(".list_top01 .gd_list_item").css("min-height",max_h+2+"px");
	max_h2 = 0;
	max_h = 0;
}
function resize_gd_h2(){
	max_h2 = 0;
	var len = $(".list_top02 .gd_list_item").length;
    $(".list_top02 .gd_list_item").attr("style","");
    $(".list_top02 .gd_list_item2").attr("style","");
	for (var i = 0; i < len-1; i++){
		var h = $(".list_top02").eq(i).find(".gd_list_item").height();
		var h1 = $(".list_top02").eq(i+1).find(".gd_list_item").height();
		if(h < h1){
			if(max_h2 < h1){
				max_h2 = h1;
			}
		}else{
			if(max_h2 < h){
				max_h2 = h;
			}
		}
	}
	$(".list_top02 .gd_list_item").css("min-height",max_h2+2+"px");
	$(".list_top02 .gd_list_item2").css("min-height",max_h2+2+"px");
	max_h2 = 0;
	max_h = 0;
}
function open_gd_pop(){
	$(".gd_list_pop").fadeIn();
	var h = $(window).height();
	var m;
	if(h < 970){
		$(".gd_list_center").height(h);
		$(".gd_list_center").css("margin-top","0px");
		$(".gd_pop_cl").css("top","0px");
		$(".gd_list_center").mCustomScrollbar({
			autoHideScrollbar:false,
			autoDraggerLength:true
		});
	}else{
		m = (h - 970)/2;
		$(".gd_list_center").height(970);
		$(".gd_list_center").css("margin-top",m+"px");
		$(".gd_pop_cl").css("top",m+"px");
	}
}
function close_gd_pop(){
	$(".gd_list_pop").fadeOut();
}
function stat_pop_open(){
	$(".stat_pop").fadeIn();
}
function stat_pop_close(){
	$(".stat_pop").fadeOut();
}
function more_board(e){
	$(e).toggleClass("on");
	if($(e).hasClass("on")){
		$(e).text("[�몃� �댁슜 蹂닿린 ��]");
		$(".more_con").css("height","3715px");
	}else{
		$(e).text("[�몃� �댁슜 蹂닿린 ��]");
		$(".more_con").css("height","0px");
	}
} 
function play_v(){
	var v = document.getElementById("char_info_v");
	v.play();
	$(".vedio_cover").fadeOut();
}