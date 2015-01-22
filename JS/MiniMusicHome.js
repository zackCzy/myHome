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

$(function(){
	var miniMusic=new MiniMusicBox();
	window.musicTempArr=$.getCookies('musicMessage');
	var musicCount=window.musicTempArr==null? 0 : window.musicTempArr.length;
	function rotate(){
		$(".singer_photo").addClass("rotate");
	}
	function noRotate(){
		$(".singer_photo").removeClass("rotate");
	}
	for ( var int = 0; int < musicCount; int++) {	
		(function(initMusicJson){
			$("<li></li>").text(initMusicJson.songerName+"--"+initMusicJson.singername)
			.attr("alt",initMusicJson.musicId).click(function(){
				$("#play_music").get(0).className="pause_music";
				$("#singer_photo").attr("src", "/myHome/load/download_singerPhoto?singerName="+initMusicJson.singername);
				var musicId=this.getAttribute("alt");
				miniMusic.play(initMusicJson.musicId,rotate);
				$("#p_songName").html(initMusicJson.songerName);
				$("#p_singerName").html(initMusicJson.singername);
			}).appendTo(".list_ul");
		})(JSON.parse(window.musicTempArr[int]));
	}
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
				searchMusic(1,$("#searchText").val(),window.searchMessage.index);	
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
		if(_that.className=="song_append_ico"){
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
	function addMusic(){
		var that=this;
		var $parent=$(that.parentNode.parentNode);
		var musicId=$parent.attr("alt");
		var songerName=$(".search_result_songname",$parent).text();
		var singername=$(".search_result_singername",$parent).text();
		var _musicTempArr=$.getCookies('musicMessage');
		var _musicCount=_musicTempArr==null? 0 : _musicTempArr.length;
		var strJson=JSON.stringify({
			"songerName":songerName,
			"singername":singername,
			"musicId":musicId
		});
		for ( var int = 0; int < _musicCount; int++) {	
			if(strJson==_musicTempArr[int]){
				strJson=null;
				break;
			}
		}
		if(strJson==null){
			$.notice("Viki 音乐","您已经添加过改音乐了！",1500);
			return false;
		}
		$.notice("Viki 音乐","音乐添加成功！",1500);
		$.cookie('musicMessage'+(musicCount++),strJson, {expires: 7, path: '/'});
		$("<li></li>").text(songerName+"--"+singername).attr("alt",musicId).click(function(){
			$("#play_music").get(0).className="pause_music";
			$("#singer_photo").attr("src", "/myHome/load/download_singerPhoto?singerName="+singername);
			var musicId=this.getAttribute("alt");
			miniMusic.play(musicId,rotate);
			$("#p_songName").html(songerName);
			$("#p_singerName").html(singername);
		}).appendTo(".list_ul");
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
