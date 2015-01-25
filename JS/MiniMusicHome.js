/**
 * 
 */

function playArgs(obj){
	$("#playTime_right").text(obj.playTime);
	$("#bufferBar").css({width:obj.loadBar+"%"});
}
function playJd(obj){
	$("#playTime_left").text(obj.playTime);
	$("#currTimeBar #bar").css({width:(obj.percent<3.3? 3.3:obj.percent)+"%"});
}
$.ajaxSetup({
	accepts: {
		"Accept-Charset": "UTF-8"
	}
});
$(function(){
	var miniMusic=new MiniMusicBox();
	var isSginOk=$("input[name='h_userId']").val();
	window.musicTempArr=$.getCookies('musicMessage');
	for ( var int = 0; int < window.musicTempArr.length; int++) {	
		(function(initMusicJson){
			$("<li></li>").attr("alt",initMusicJson.musicId).click(function(event){
				var _this=getEvtObj(event);
				if(_this.className=="removeMusic"){
					return false;
				}
				event.stopPropagation();
				$("#play_music").get(0).className="pause_music";
				$("#singer_photo").attr("src", "/myHome/load/download_singerPhoto?singerName="+initMusicJson.singername);
				var musicId=this.getAttribute("alt");
				miniMusic.play(initMusicJson.musicId,rotate);
				$("#p_songName").html(initMusicJson.songerName);
				$("#p_singerName").html(initMusicJson.singername);
			}).append(
					$("<span class='music_intro'></span>").text(initMusicJson.songerName+"--"+initMusicJson.singername)
			).append(
					$("<span class='removeMusic'></span>").click(removeMusic).click(removeCokieMusic).attr("alt",initMusicJson.cookieId)
			).appendTo(".temp");
		})(JSON.parse(window.musicTempArr[int]));
	}
	var addMusic=function (){
		var that=this;
		var $parent=$(that.parentNode.parentNode);
		var musicId=$parent.attr("alt");
		var songerName=$(".search_result_songname",$parent).text();
		var singername=$(".search_result_singername",$parent).text();
		var _musicTempArr=$.getCookies('musicMessage');
		var  cookieId="musicMessage"+new Date().getTime();
		var strJson=JSON.stringify({
			"songerName":songerName,
			"singername":singername,
			"musicId":musicId,
			"cookieId":cookieId
		});
		for ( var int = 0; int < _musicTempArr.length; int++) {	
			if(musicId==JSON.parse(_musicTempArr[int]).musicId){
				strJson=null;
				break;
			}
		}
		if(strJson==null){
			$.notice("Viki 音乐","您已经添加过该音乐了！",1500);
			return false;
		}
		$.notice("Viki 音乐","音乐添加成功！",1500);
		$.cookie(cookieId,strJson, {expires: 7, path: '/myHome/music'});
		$("<li></li>").attr("alt",musicId).click(function(event){
			event.stopPropagation();
			var _this=getEvtObj(event);
			if(_this.className=="removeMusic"){
				return false;
			}
			$("#play_music").get(0).className="pause_music";
			$("#singer_photo").attr("src", "/myHome/load/download_singerPhoto?singerName="+singername);
			var musicId=this.getAttribute("alt");
			miniMusic.play(musicId,rotate);
			$("#p_songName").html(songerName);
			$("#p_singerName").html(singername);
		}).append(
				$("<span class='music_intro'></span>").text(songerName+"--"+singername)
		).append(
				$("<span class='removeMusic'></span>").click(removeCokieMusic).attr("alt",cookieId)
		).appendTo(".temp");
	};
	var addVikiMusic=function (){
		if(isSginOk.isEmpty()<=0){
			$("#headLogin").trigger("click");
			return false;
		}
		$("#lock").lock(0.6);
		if(this.className.indexOf("love_ico")==-1){
			$(this).addClass("love_ico");
		}else{
			removeMusic.call(this,true);
			$(this).removeClass("love_ico");
			$("#lock").unlock();
			return false;
		}
		var that=this;
		var $parent=$(that.parentNode.parentNode);
		
		var musicId=$parent.attr("alt");
		var songerName=$(".search_result_songname",$parent).text();
		var singername=$(".search_result_singername",$parent).text();
		$.ajax({
			url:"/myHome/user/music_addVikiMusic",
			data:{
				"musicId":musicId,
				"typeName":("默认")
			},
			method:"GET",
			success:function(msg){
				if(msg!="add vikiMusic is error"){
					$(that).attr("alt",msg);
					$.notice("Viki 音乐","音乐添加成功！",1500);
					$("<li></li>").attr("alt",musicId).click(function(event){
						event.stopPropagation();
						var _this=getEvtObj(event);
						if(_this.className=="removeMusic"){
							return false;
						}
						$("#play_music").get(0).className="pause_music";
						$("#singer_photo").attr("src", "/myHome/load/download_singerPhoto?singerName="+singername);
						var musicId=this.getAttribute("alt");
						miniMusic.play(musicId,rotate);
						$("#p_songName").html(songerName);
						$("#p_singerName").html(singername);
					}).append(
							$("<span class='music_intro'></span>").text(songerName+"--"+singername)
					).append(
							$("<span class='removeMusic'></span>").click(removeMusic).attr("alt",msg)
					).appendTo(".vikiMusic");
				}else{
					$.notice("Viki 音乐","音乐添加失败！",1500);
				}
				$("#lock").unlock();
			}
		});
	};
	if(isSginOk.isEmpty().length>=0){
		$.ajax({
			url:"/myHome/user/music_getVikiMusic",
			data:{},
			method:"GET",
			dataType:"JSON",
			success:function(json){
				for ( var int = 0; int < json.length; int++) {	
					(function(initMusicJson){
						var songName=initMusicJson[int].song;
						var singerName=initMusicJson[int].singer;
						var musicId=initMusicJson[int].musicId;
						var id=initMusicJson[int].id;
						$("<li></li>").attr("alt",musicId).click(function(event){
							 event.stopPropagation();
							 var _this=getEvtObj(event);
								if(_this.className=="removeMusic"){
									return false;
								}
							$("#play_music").get(0).className="pause_music";
							$("#singer_photo").attr("src", "/myHome/load/download_singerPhoto?singerName="+singerName);
							var musicId=this.getAttribute("alt");
							miniMusic.play(musicId);
							$("#p_songName").html(songName);
							$("#p_singerName").html(singerName);
						}).append(
								$("<span class='music_intro'></span>").text(songName+"--"+singerName)
						).append(
								$("<span class='removeMusic'></span>").click(removeMusic).attr("alt",id)
						).appendTo(".vikiMusic");
					})(json);
				}
			}
		});
	}
	function removeMusic(mark){
		$this=$(this);
		var id=$this.attr("alt");
		$.ajax({
			url:"/myHome/user/music_removeVikiMusic",
			method:"GET",
			data:{'id':id},
			success:function(msg){
				if(msg!="remove vikiMusic is error"){
					if(mark==null){
						$this.parent().slideUp(300,function(){
							$(this).remove();
						});
					}else{
						$(".vikiMusic .removeMusic[alt="+id+"]").parent().slideUp(300,function(){
							$(this).remove();
						});
					}
				}else{
					$.notice("VikiMusic 提醒您！","音乐删除失败！");
				}
			}
		});
	}
	function removeCokieMusic(){
		$this=$(this);
		var cookieId=$this.attr("alt");
		if($.removeCookie(cookieId,"/myHome/music")){
			$(this.parentNode).slideUp(300,function(){
				$(this).remove();
			});
		}else{
			$.notice("VikiMusic 提醒您！","音乐删除失败！");
		}
	}
	function rotate(){
		$(".singer_photo").addClass("rotate");
	}
	function noRotate(){
		$(".singer_photo").removeClass("rotate");
	}
	$(".list_title ul li").click(function(){
		var value = this.getAttribute("value");
		$(".mini_music_box ol").eq(value).fadeIn(300).css("z-index:5");
		$(".mini_music_box ol").eq(value==1? 0:1).fadeOut(300).css("z-index:1");
	});
	try {
		$(".user_message_left").hover(function(){
			$(".user_message_left ul").stop().slideDown(300);	
		}, function(){
			$(".user_message_left ul").stop().slideUp(300);	
		});
		$("#exit_login").on("click", exitLogin);
	} catch (e) {}
	function exitLogin(){
		$.ajax({
			url:"/myHome/exitLogin",
			method : 'get',
			success:function(text){
				if(text=="exit is ok"){
					window.location.href=window.location.href;
				}
			}
		});
	};
	 window.myAngle=0;
	 window.searchMessage={
		name:null,
		index:1,
		flag:false
	 };
	 window.searchFlag=false;
	if(viewInner().height<626){
		var temp=145-(626-viewInner().height);
		$(".mini_music_lyric").css({height: temp<0 ? 0:temp+"px"});
	}else{
		$(".mini_music_lyric").css({height:150+(viewInner().height-626)+"px"});
	}
	 $(".mini_music_content_right").css({
		width:viewInner().width-338+"px" ,
		height:viewInner().height-40+"px"
	 });
	$("#searchText").on("keypress", keySearch);
	$("#searchButton").on("click", keySearch);
	$("#music_list").on("click",function(){	
		var musicBox=$(".mini_music_box");
		if(musicBox.css("display")=="none"){
			musicBox.stop(true).show(300);
		}else{
			musicBox.stop(true).hide(300);
		}
	});
	function keySearch(evt){
		if(evt.keyCode==undefined||(evt.keyCode!=undefined&&evt.keyCode==13||evt.charCode==13)){
			window.searchMessage.index=1;
			if(window.searchFlag===false){
				window.searchFlag=true;
				window.searchMessage.flag=false;
				searchMusic(1,$("#searchText").val().isEmpty(),window.searchMessage.index);	
			}	
		}
	}
	$("#cursor").on("mousedown", click);
	$("#volume_bar_cursor").on("mousedown", click2);
	$(".list_title i").click(function(){
		$(".mini_music_box").hide(300);
	});
	$("#volume_music").on("click", function(evt){
		var node=getEvtObj(evt);
		if(node.id!="volume_bar_cursor"){
			var _Dvolume=$("#volume_music").get(0);
			var volume=100;
			if(_Dvolume.className=="volume_music"){
				_Dvolume.className="volume_music_mute";
				volume=0;
			}else{
				_Dvolume.className="volume_music";
				volume=parseInt($("#volume_bar").css("width"))/60;
			}
			miniMusic.setVolume(volume);
		}
	});
	$(".progress").on("click", function(evt){
		document.getElementById("play_music").className="pause_music";
		$("#currTimeBar #bar").css({width:evt.clientX/320*100+"%"});
		miniMusic.setPosition(evt.clientX/320*100);
	});
	$("#music_img_bg").css({
		height:viewInner().height+"px",
		width:viewInner().width+"px"
	});	
	$(window).on("resize", function(){
	
		if(viewInner().height<626){
			var temp=145-(626-viewInner().height);
			$(".mini_music_lyric").css({height: temp<0 ? 0:temp+"px"});
		}else{
			$(".mini_music_lyric").css({height:150+(viewInner().height-626)+"px"});
		}
		 $(".mini_music_content_right").css({
				width:viewInner().width-338+"px" ,
				height:viewInner().height-40+"px"
			 });
		if(viewInner().height<500||viewInner().width<700){
			return;
		}	

		$("#music_img_bg").css({
			height:viewInner().height+"px",
			width:viewInner().width+"px"
		});	
	});	

	$("#play_music").on("click", function(){
		if(this.className=="play_music"){
			this.className="pause_music";
			miniMusic.play(null,rotate);
		}else{
			this.className="play_music";
			miniMusic.pause(noRotate);
			clearInterval(window.songTime);
		}
	});
	function click(e) {
		var that = this;
		var diffX =this.offsetLeft;
		var percent=0;
		function stop() {// 松开按键 停止默认行为
			$(document).off( 'mousemove', move);
			$(document).off( 'mouseup', stop);
			if (typeof that.releaseCapture != 'undefined') {
				that.releaseCapture();
			}
			miniMusic.setPosition(percent);
		}
		function move(evt) { // 鼠标移动
			var left = evt.clientX;
			if (left < 0)
				left = 0;
			else if (left > 330)
				left = 330;
			percent=left/330*100 ;
			$("#currTimeBar #bar").css({width:percent+ "%"});
		}
		$(document).on('mousemove', move);
		$(document).on( 'mouseup', stop);
	}
	function click2(e) {
		var that = this;
		var diffX =e.clientX-this.offsetLeft-13;
		var percent=0;
		var flag=false;
		function stop() {// 松开按键 停止默认行为
			$(document).off('mousemove', move);
			$(document).off( 'mouseup', stop);
			if (typeof that.releaseCapture != 'undefined') {
				that.releaseCapture();
			}
			miniMusic.setVolume(flag ? 0:percent/100);
		}
		function move(evt) { // 鼠标移动
			var left = evt.clientX-diffX;
			if(left<9){
				flag=true;
			}
			if (left < 9)
				left = 9;
			else if (left > 60)
				left = 60;
			percent=left/60*100 ;
			$("#volume_bar").css({width:percent+ "%"});
		}
		$(document).on( 'mousemove', move);
		$(document).on( 'mouseup', stop);
	}
	function resultScroll(evt){
		var clientHeight =parseInt($(".search_result").css("height")) ;
		var scrollTop = this.scrollTop;
		var scrollHeight =parseInt($(".search_result ul").css("height")) ;
		if(clientHeight+scrollTop+30>=scrollHeight){
			if(window.searchFlag===false&&window.searchMessage.flag===false){
				window.searchMessage.index+=1;
				window.searchFlag===true;
				searchMusic(window.searchMessage.index,window.searchMessage.name);
				this.scrollTop=scrollTop;
			}
		}
	}
	function playMusic(evt){
		var _that=getEvtObj(evt);
		if(_that.className=="song_append_ico"||_that.className.indexOf("song_like_ico")>=0||_that.className=="song_download_ico"){
			return false;
		}
		$("#play_music").get(0).className="pause_music";
		$("#singer_photo").attr("src", "/myHome/load/download_singerPhoto?singerName="+encodeURI(encodeURI(this.getElementsByTagName("span")[7].innerHTML)));
		miniMusic.play(this.getAttribute("alt"),rotate);
		$("#p_songName").html(this.getElementsByTagName("span")[6].innerHTML);
		$("#p_singerName").html(this.getElementsByTagName("span")[7].innerHTML);
	}
	function searchMusic(index,name,method){
		$("#lock").lock();
		$.ajax({
			url:"/myHome/search/search_music",
			method : 'post',
			data : {
				pageIndex:index,searchName:name,pageSize:20},
			success:function(text){
				$("#lock").unlock();
				var json;
				json=JSON.parse(text);
				if(json.length<=1){
					window.searchMessage.flag=true;
				}
				window.searchMessage.name=name;
				if(method==1){
					$(".mini_music_content_right").remove();
					var contentRight=document.createElement("div");
					contentRight.className="mini_music_content_right";
					var searchTitle=document.createElement("h2");
					searchTitle.innerHTML=name+"-"+"搜索结果 （共"+json[json.length-1]["pagecount"]+")条记录";
					var searchResults=document.createElement("div");
					searchResults.className="search_result";
					var searchResultsUl=document.createElement("ul");
					searchResults.appendChild(searchResultsUl);
					contentRight.appendChild(searchTitle);
					contentRight.appendChild(searchResults);
					$(".mini_music_component").append(contentRight);
					$(searchResults).on("scroll", resultScroll);
					$(contentRight).css({
							width:viewInner().width-338+"px" ,
							height:viewInner().height-40+"px"
						 });
				}
				var parent=$(".search_result ul");
				for ( var i = 0; i < json.length-1; i++) {
				    var rowResults=document.createElement("li");
				    var rowControll=document.createElement("a");
				    rowControll.className="search_result_li_area_hover";
				    var stateIco=document.createElement("span");
				    stateIco.setAttribute("id","search_result_state");
				    var likeIco=document.createElement("span");
				    likeIco.className="song_like_ico";
				    $(likeIco).click(addVikiMusic);
				    var appendIco=document.createElement("span");
				    appendIco.className="song_append_ico";
				    $(appendIco).click(addMusic);
				    var downloadIco=document.createElement("span");
				    downloadIco.className="song_download_ico";
				    rowControll.appendChild(stateIco);
				    rowControll.appendChild(likeIco);
				    rowControll.appendChild(appendIco);
				    rowControll.appendChild(downloadIco);
				    
				    var resultState=document.createElement("span");
				    resultState.className="search_result_state";
			    
				    var resultMessage=document.createElement("span");
				    resultMessage.className="search_result_li_area";
				    var resultSongName=document.createElement("span");
				    resultSongName.className="search_result_songname";
				    resultSongName.innerHTML=json[i].song;
				    resultSongName.setAttribute("alt",json[i].special);
				    var resultSingerName=document.createElement("span");
				    resultSingerName.className="search_result_singername";
				    resultSingerName.innerHTML=json[i].singer;
				    resultSingerName.setAttribute("alt",json[i].sex);
					resultMessage.appendChild(resultSongName);
					resultMessage.appendChild(resultSingerName);
					
					rowResults.setAttribute("alt",json[i].musicId);
					rowResults.appendChild(rowControll);
					rowResults.appendChild(resultState);
					rowResults.appendChild(resultMessage);
					$(rowResults).on("click", playMusic);	
					parent.append(rowResults);
				}
				window.searchFlag=false;
		}});
	}

});

function MiniMusicBox(){
	var timeStr="00:00";
	var BufferBar=0;
	var progressBar=0;
	var volume=1;
	var position=0;
	var _that=this;
	try {
		_that.playBox=document.getElementById("Externa");
	} catch (e) {
		_that.playBox=document.getElementById("Externa1");
	}
}
MiniMusicBox.prototype={
	getPosition:function(){
		return position;
	},
	setPosition:function(num){
		this.playBox.position(num);
	},
	getVolume:function(num){
		this.playBox.position(num);
	},
	setVolume:function(num){
		this.playBox.volume(num);
	},
	setAddMusicFn:function(addMusicFn){
		this.addMusicFn=addMusicFn;
	},
	addMusic:function(){
		this.addMusicFn();
	},
	play:function(url,fn){
		this.playBox.playMusic(url);
		if(typeof fn =='function'){
			fn.call(this);
		}
	},
	pause:function (fn){
		this.playBox.pauseMusic();
		if(typeof fn =='function'){
			fn.call(this);
		}
	},
	previous:function (){
		
		
	},
	next:function (){
		
		
	}
};
