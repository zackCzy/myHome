/**
 * 
 */

var INITIAL_TIME="00:00";

function playArgs(obj){
	$("#playTime_right").text(obj.playTime);
	$("#bufferBar").css({width:obj.loadBar+"%"});
}
function playJd(obj){
	$("#playTime_left").text(obj.playTime);
	$("#currTimeBar #bar").css({width:(obj.percent<3.3? 3.3:obj.percent)+"%"});
}
function playfinish(){
	$("#playTime_left").text(INITIAL_TIME);
	$("#bufferBar").css({width:"0%"});
	$("#currTimeBar #bar").css({width:"0%"});
	document.getElementById("play_music").className="play_music";
	$("#next_music").trigger("click");
	noRotate();
}
function rotate(){
	$(".singer_photo").addClass("rotate");
}
function noRotate(){
	$(".singer_photo").removeClass("rotate");
}
function playError(evt){
	$.notice("Viki提醒您！","音乐地址失效",1500);
	playfinish();
}
function completeHandler(){
	console.log("completeHandler");
}
$.ajaxSetup({
	accepts: {
		"Accept-Charset": "UTF-8"
	}
});

$(function(){
	
	$.texi({
		title:"Viki提醒您",
		body:"目前仅支持歌曲搜索播放功能，请见谅!",
		time:3000
	});
	$("#music_img_bg").css({
		height:viewInner().height+"px",
		width:viewInner().width+"px"
	});	
	$(".nav_singer").click(function(){
		$(".mini_music_content_right").html(window.singerListHTML).find(".singer_list li").click(function(){
			window.searchMessage.index=1;
			if(window.searchFlag===false){
				window.searchFlag=true;
				window.searchMessage.flag=false;
				searchMusic(1,$("img",this).attr("alt").isEmpty(),window.searchMessage.index);	
			}	
		});
	});
	$("#download_music").click(downloadMusic);
	window.singerListHTML=$(".mini_music_content_right").html();
	
	var miniMusic=new MiniMusicBox();
	var isSginOk=$("input[name='h_userId']").val();

	//从cookie得到临时音乐列表
	var musicTempArr=$.getCookies('musicMessage');
	if(musicTempArr.length<=0){
		$(".temp .list_ul_point_wrap").css("display","block");
	}
	$(".vikiMusic .list_ul_point_wrap").css("display","block");
	for ( var int = 0; int <musicTempArr.length; int++) {	
		(function(initMusicJson,i){
			miniMusic.addCookieMusic({
				'songName':initMusicJson.songName,
				'singerName':initMusicJson.singername,
				'musicId':initMusicJson.musicId,
				'id':initMusicJson.cookieId
			});
			JQAddDom(initMusicJson.singername,initMusicJson.songName,initMusicJson.musicId,initMusicJson.cookieId,".temp",false,i);
		})(JSON.parse(musicTempArr[int]),int);
	}
	
	//如果用户登陆 获取用户歌曲列表
	if(isSginOk.isEmpty().length>=0){
		$.ajax({
			url:"/myHome/user/music_getVikiMusic",
			data:{},
			type:"GET",
			dataType:"JSON",
			success:function(json){
				if(json.length>=0){
					$(".vikiMusic .list_ul_point_wrap").css("display","none");
				}
				for ( var int = 0; int < json.length; int++) {	
					(function(initMusicJson,i){
						var songName=initMusicJson[int].song;
						var singerName=initMusicJson[int].singer;
						var musicId=initMusicJson[int].musicId;
						var id=initMusicJson[int].id;
						miniMusic.addVikiMusic({
							'songName':songName,
							'singerName':singerName,
							'musicId':musicId,
							'id':id
						});
						JQAddDom(singerName,songName,musicId,id,".vikiMusic",false,i);
					})(json,int);
				}
			}
		});
	}

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
	 $("#next_music").click(function(){
		 var Obj=miniMusic.next();
		 if(obj)
			 playMusicFn(Obj.singerName,Obj.songName,Obj.musicId,Obj.cookieId);
	 });
	 $("#previous_music").click(function(){
		 var Obj=miniMusic.previous();
		 if(obj)
			 playMusicFn(Obj.singerName,Obj.songName,Obj.musicId,Obj.cookieId);
	 });
	 $(".list_title ul li").click(function(){
		var value = this.getAttribute("value");
		miniMusic.setPlayType(value==0? 2:1);
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
	$("#searchText").on("keypress", keySearch);
	$("#searchButton").on("click", keySearch);
	$(".singer_list li").click(function(){
		window.searchMessage.index=1;
		if(window.searchFlag===false){
			window.searchFlag=true;
			window.searchMessage.flag=false;
			searchMusic(1,$("img",this).attr("alt").isEmpty(),window.searchMessage.index);	
		}	
	});
	$("#music_list").on("click",function(){	
		var musicBox=$(".mini_music_box");
		if(musicBox.css("display")=="none"){
			musicBox.stop(true).show(300);
		}else{
			musicBox.stop(true).hide(300);
		}
	});
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
	$("#play_music").on("click", function(){
		if(this.className=="play_music"){
			this.className="pause_music";
			miniMusic.play(null,rotate);
		}else{
			this.className="play_music";
			miniMusic.pause(noRotate);
		}
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
		var _singerName=this.getElementsByTagName("span")[7].innerHTML;
		var _songName=this.getElementsByTagName("span")[6].innerHTML;
		var _musicId=this.getAttribute("alt");
		playMusicFn(_singerName,_songName,_musicId);
	}
	function playMusicFn(singerName,songName,musicId,cookieId){
		document.getElementById("play_music").className="pause_music";
		$("#singer_photo").attr("src", "/myHome/load/download_singerPhoto?singerName="+encodeURI(encodeURI(singerName)));
		miniMusic.play(musicId,rotate);
		$("#p_songName").text(songName);
		$("#p_singerName").text(singerName);
		$("#download_music").attr("alt",musicId);
		$("#like_music").attr("alt",cookieId);
	}
	function searchMusic(index,name,method){
		if(name.isEmpty().length<=0){
			$.texi({
				title:"Viki提醒您",
				body:"请输入要搜索的内容",
				time:3000
			});
			return false;
		}
		$("#lock").lock();
		$.ajax({
			url:"/myHome/search/search_music",
			type : 'post',
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
				var rowResults,rowControll,stateIco,likeIco,appendIco,downloadIco;
				var resultState,resultMessage,resultSongName,resultSingerName;
				var _doc=document;
				for ( var i = 0; i < json.length-1; i++) {
				    rowResults=_doc.createElement("li");
				    rowControll=_doc.createElement("a");
				    rowControll.className="search_result_li_area_hover";
				    stateIco=_doc.createElement("span");
				    stateIco.setAttribute("id","search_result_state");
				    likeIco=_doc.createElement("span");
				    likeIco.className="song_like_ico";
				    $(likeIco).click(addVikiMusic);
				    appendIco=_doc.createElement("span");
				    appendIco.className="song_append_ico";
				    $(appendIco).click(addMusic);
				    downloadIco=_doc.createElement("span");
				    downloadIco.className="song_download_ico";
				    downloadIco.setAttribute("alt",json[i].musicId);
				    $(downloadIco).click(downloadMusic);
				    rowControll.appendChild(stateIco);
				    rowControll.appendChild(likeIco);
				    rowControll.appendChild(appendIco);
				    rowControll.appendChild(downloadIco);
				    
				    resultState=_doc.createElement("span");
				    resultState.className="search_result_state";
			    
				    resultMessage=_doc.createElement("span");
				    resultMessage.className="search_result_li_area";
				    resultSongName=_doc.createElement("span");
				    resultSongName.className="search_result_songname";
				    resultSongName.innerHTML=json[i].song;
				    resultSongName.setAttribute("alt",json[i].special);
				    resultSingerName=_doc.createElement("span");
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
	function downloadMusic(){
		var musicId=this.getAttribute("alt");
		if(musicId==null)return false;
		window.open("http://tsmusic24.tc.qq.com/"+musicId+".mp3","_blank");
	}
	function removeMusic(mark){
		var $this=$(this);
		var id=$this.attr("alt");
		var musicId=$this.parent().attr("alt");
		var tempArr=$this.prev().text().split("--");
		var songName=tempArr[0];
		var singerName=tempArr[1];
		$.ajax({
			url:"/myHome/user/music_removeVikiMusic",
			type:"GET",
			data:{'id':id},
			success:function(msg){
				if(msg!="remove vikiMusic is error"){
					miniMusic.removeVikiMusic({
						'songName':songName,
						'singerName':singerName,
						'musicId':musicId,
						'id':id
					});
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
		var musicId=$this.parent().attr("alt");
		var tempArr=$this.prev().text().split("--");
		var songName=tempArr[0];
		var singerName=tempArr[1];
		var id=cookieId;
		if($.removeCookie(cookieId,"/myHome/music")){
			miniMusic.removeCookieMusic({
				'songName':songName,
				'singerName':singerName,
				'musicId':musicId,
				'id':id
			});
			$(this.parentNode).slideUp(300,function(){
				$(this).remove();
			});
		}else{
			$.notice("VikiMusic 提醒您！","音乐删除失败！");
		}
	}
	function exitLogin(){
		$.ajax({
			url:"/myHome/exitLogin",
			type : 'get',
			success:function(text){
				if(text=="exit is ok"){
					window.location.href=window.location.href;
				}
			}
		});
	};
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
	function addMusic(){
		var that=this;
		var $parent=$(that.parentNode.parentNode);
		var _musicId=$parent.attr("alt");
		var _songName=$(".search_result_songname",$parent).text();
		var _singername=$(".search_result_singername",$parent).text();
		var _musicTempArr=$.getCookies('musicMessage');
		var _cookieId="musicMessage"+new Date().getTime();
		var strJson=JSON.stringify({
			"songName":_songName,
			"singername":_singername,
			"musicId":_musicId,
			"cookieId":_cookieId
		});
		for ( var int = 0; int < _musicTempArr.length; int++) {	
			if(_musicId==JSON.parse(_musicTempArr[int]).musicId){
				strJson=null;
				break;
			}
		}
		if(strJson==null){
			$.notice("Viki 音乐","您已经添加过该音乐了！",1500);
			return false;
		}
		$(".temp .list_ul_point_wrap").css("display","none");
		miniMusic.addCookieMusic({
			'songName':_songName,
			'singerName':_singername,
			'musicId':_musicId,
			'id':_cookieId
		});
		$.cookie(_cookieId,strJson, {expires: 7, path: '/myHome/music'});
		JQAddDom(_singername,_songName,_musicId,_cookieId,".temp",true,miniMusic.getCookieMusicLength());
	};
	
	function JQAddDom(singername,songName,musicId,cookieId,select,mark,index){
		if(mark)$.notice("Viki 音乐","音乐添加成功！",1500);
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
			miniMusic.setIndex(index);
			$("#p_songName").html(songName);
			$("#p_singerName").html(singername);
		}).append(
				$("<span class='music_intro'></span>").text(songName+"--"+singername)
		).append(
				$("<span class='removeMusic'></span>").click((select==".temp" ? removeCokieMusic : removeMusic)).attr("alt",cookieId)
		).appendTo(select);
	}
	function addVikiMusic(){
		if(isSginOk.isEmpty()<=0){//判断用户是否已经登录
			$("#headLogin").trigger("click");
			return false;
		}
		$("#lock").lock(0.6);
		var that=this;
		var $parent=$(that.parentNode.parentNode);
		
		var musicId=$parent.attr("alt");
		var songName=$(".search_result_songname",$parent).text();
		var singername=$(".search_result_singername",$parent).text();
		$.ajax({
			url:"/myHome/user/music_addVikiMusic",
			data:{
				"musicId":musicId,
				"typeName":("默认")
			},
			type:"GET",
			success:function(msg){
				if(msg!="add vikiMusic is error"){
					$(that).attr("alt",msg);
					miniMusic.addVikiMusic({
						'songName':singername,
						'singerName':songName,
						'musicId':musicId,
						'id':msg
					});
					if(that.className.indexOf("love_ico")==-1){
						$(that).addClass("love_ico");
					}else{
						removeMusic.call(that);
						$(that).removeClass("love_ico");
						$("#lock").unlock();
						return false;
					}
					$(".vikiMusic .list_ul_point_wrap").css("display","none");
					JQAddDom(singername,songName,musicId,msg,".vikiMusic",false,miniMusic.getVikiMusicLength());
				}else{
					$.notice("Viki 音乐","音乐添加失败！",1500);
				}
				$("#lock").unlock();
			}
		});
	};
});

function MiniMusicBox(){
	var timeStr="00:00";
	var BufferBar=0;
	var progressBar=0;
	var volume=1;
	var position=0;
	var _that=this;
	this.playType=2;// 1代表 viki列表，2代表cookie列表
	this.playModel=1; //1代表循环播放 //2代表单曲轮播 //3代表 随机播放//4代表全列表循播
	this.musicListHandle=new MusicPlayList();
	this.cookieListHandle=new MusicPlayList();
	try {
		_that.playBox=document.getElementById("Externa");
		if(_that.playBox==null){
			_that.playBox=document.getElementById("Externa1");
		}
	} catch (e) {
		_that.playBox=document.getElementById("Externa1");
		
	}
	this.setState=function(state,index,length){
		var _index=index;//state 1代表next 2代表 prev
		switch (this.playModel) {
			case 1:
				_index=state==1 ? ((index+1 >=length) ? 0 : ++index):((index-1<0) ? length-1 :--index);
				break;
			case 2:
				_index=index;
				break;
			case 3:
				_index=Math.floor(Math.random()*(length-1));
				break;	
			default:
				_index=state==1 ? ((index+1 >=length) ? 0 : ++index):((index-1<0) ? length-1 :--index);
				break;
		}
		return _index;
	};
}
MiniMusicBox.prototype={
	setPlayModel:function(playModel){
		this.playModel=playModel;
	},
	getPlayModel:function(){
		return this.playModel;
	},
	setPlayType:function(playType){
		this.playType=playType;
	},
	getPlayType:function(){
		return this.playType;
	},
	setIndex:function(index){
		if(this.playType==1){
			this.musicListHandle.setCurrentMusic(index);
		}else if(this.playType==2){
			this.cookieListHandle.setCurrentMusic(index);
		}
	},
	addVikiMusic:function(musicObj){
		this.musicListHandle.addMusic(musicObj);
	},
	addCookieMusic:function(musicObj){
		this.cookieListHandle.addMusic(musicObj);
	},
	removeVikiMusic:function(musicObj){
		this.musicListHandle.removeMusic(musicObj);
	},
	removeCookieMusic:function(musicObj){
		this.cookieListHandle.removeMusic(musicObj);
	},
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
	getVikiMusicLength:function(){
		return this.musicListHandle.length();
	},
	getCookieMusicLength:function(){
		return this.cookieListHandle.length();
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
		var index;
		var musicObj;
		if(this.playType==1){
			index=this.musicListHandle.getCurrentIndex();
			var _index=this.setState(2,index,this.musicListHandle.length());
			this.musicListHandle.setCurrentMusic(_index);
			musicObj=this.musicListHandle.getCurrentMusic();
		}else{
			index=this.cookieListHandle.getCurrentIndex();
			var _index=this.setState(2,index,this.cookieListHandle.length());
			this.cookieListHandle.setCurrentMusic(_index);
			musicObj=this.cookieListHandle.getCurrentMusic();
		}
		return musicObj;
	},
	next:function (){
		var index;
		var musicObj;
		if(this.playType==1){
			index=this.musicListHandle.getCurrentIndex();
			var _index=this.setState(1,index,this.musicListHandle.length());
			this.musicListHandle.setCurrentMusic(_index);
			musicObj=this.musicListHandle.getCurrentMusic();
		}else{
			index=this.cookieListHandle.getCurrentIndex();
			var _index=this.setState(1,index,this.cookieListHandle.length());
			this.cookieListHandle.setCurrentMusic(_index);
			musicObj=this.cookieListHandle.getCurrentMusic();
		}
		return musicObj;
	}
};
function MusicPlayList(){
	this.List=[];
	this.index=0;
	return this;
}
MusicPlayList.prototype={
	addMusic:function(musicObj){
		this.List.push(musicObj);
	},
	removeMusic:function(musicObj){
		var tempArr=[];
		for ( var int = 0; int < this.List.length; int++) {
			if(this.List[int].id!=musicObj.id){
				tempArr.push(this.List[int]);
			}
		}
		this.List=tempArr;
	},
	getCurrentMusic:function(){
		return this.List[this.index];
	},
	setCurrentMusic:function(index){
		this.index=index;
	},
	getCurrentIndex:function(){
		return this.index;
	},
	length:function(){
		return this.List.length;
	}
};