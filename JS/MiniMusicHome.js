/**
 * 
 */

windowLoad(load);


function load(){
	try {
		// 进行登录	
		$Base('#headLogin').event('click', function() {
			$Base('#miniMusic_userName').empty();
			$Base('#miniMusic_password').empty();
			$Base('#lock').lock().active({
				attr : 'o',target : 30,t : 30,step : 10});
			$Base('#login_view').center().show();
		});
		// 浏览器大小被改变
		$Base('#login_view').resizeCenter(function() {
			$Base('#lock').css({
				'height' : (viewInner().height+getScroll().top + 'px'),
				'width' : (viewInner().width +getScroll().left+ 'px')
			});
		}).Move($Base('#login_view #login_move').get(0, true));
		// 取消登陆
		$Base('#close_login').event("click", function() {
			$Base('#lock').active({
				attr : 'o',target : 0,t : 30,step : 10,
				fn : function() {
					$Base('#lock').hide();
				}});
			$Base('#login_view').hide();
		});
		$Base("#login_button").event("click",function() {
			var that=this;		
			$Base(that).value("正在登录…");
			this.disabled=true;
			stateAjax({url : "/myHome/user/check_login",
			method : 'post',async : true,message : {'user.name' : $Base('#miniMusic_userName').value(),
			'user.password' : $Base('#miniMusic_password').value(),
			'expiry':document.getElementById("is_auto").checked ? 7:0
			},
			run : function(text) {		
				try {
					var json=JSON.parse(text);
					var temp=$Base(".user_message_area").removeAll();
					temp.innerHTML("");
					$Base(that).value("登录成功");
					var mess=document.createElement("div");
					mess.className="user_message_left";
					var userphoto=document.createElement("img");
					userphoto.setAttribute("width","25px");
					userphoto.setAttribute("height","25px");
					userphoto.setAttribute("src","/myHome/load/download_getSmallPhoto?id="+json.id);
					var username=document.createElement("strong");
					username.innerHTML=json.name;
					var ul=document.createElement("ul");
					var space=document.createElement("li");
					space.innerHTML="空间";
					var spaceA=document.createElement("a");
					spaceA.setAttribute("href", "/myHome/user/space/"+json.name+"/");
					space.appendChild(spaceA);
					var exit=document.createElement("li");
					exit.innerHTML="退出";
					exit.setAttribute("id","exit_login");
					ul.appendChild(space);
					ul.appendChild(exit);
					var span=document.createElement("a");
					span.setAttribute("id","miniindex");
					span.setAttribute("href","/myHome/");
					span.innerHTML="Mini首页";
					span.className="anav";
					mess.appendChild(userphoto);
					mess.appendChild(username);
					mess.appendChild(ul);
					temp.get(0,true).appendChild(mess);
					temp.get(0,true).appendChild(span);
					addEvent(exit, "click", exitLogin);
					$Base(".user_message_left").hover(function(){
						$Base(".user_message_left ul").active({
							step:10,t:30,async:{
								o:100,h:90}});	
					}, function(){
						$Base(".user_message_left ul").active({
							step:10,t:30,async:{
								o:0,h:0}});
					});
					$Base('#lock').active({
						attr : 'o',target : 0,t : 30,step : 10,
						fn : function() {
							$Base('#lock').hide();
						}});
					$Base('#login_view').hide();
				} catch (e) {
					$Base(that).value("登录失败");
				}
				that.disabled=false;
			}});
		});
	} catch (e) {
	}
	try {
		$Base("#exit_login").event("click", exitLogin);
	} catch (e) {
		// TODO: handle exception
	}
	
	function exitLogin(){
		stateAjax({
			url:"/myHome/exitLogin",
			method : 'get',
			head:{"Accept-Charset":"UTF-8"},
			async : true,
			message : {},
			run:function(text){
				if(text=="exit is ok"){
					var temp=$Base(".user_message_area").removeAll();
					temp.innerHTML("");
					var headLogin=document.createElement("a");
					headLogin.setAttribute("id","headLogin");
					headLogin.innerHTML="登录";
					addEvent(headLogin, "click", function() {
						$Base('#miniMusic_userName').empty();
						$Base('#miniMusic_password').empty();
						$Base('#lock').lock().active({
							attr : 'o',target : 30,t : 30,step : 10});
						$Base('#login_view').center().show();
					});
					var headApplication=document.createElement("a");
					headApplication.innerHTML="注册";
					headApplication.setAttribute("href","/myHome/application");
					var headMini=document.createElement("a");
					headMini.innerHTML="Mini首页";
					headMini.setAttribute("href","/myHome/");	
					headLogin.className="anav";
					headApplication.className="anav";
					headMini.className="anav";
					
					temp.appendChild(headLogin);
					temp.appendChild(document.createTextNode("| "));
					temp.appendChild(headApplication);
					temp.appendChild(document.createTextNode("| "));
					temp.appendChild(headMini);
				}
			}
		});
	};


	$Base(".minimusic_nav").css({
		width:viewInner().width+"px"
	});	
	 window.myAngle=0;
	 window.searchMessage={
		name:null,
		index:1,
		flag:false
	 };
		if(viewInner().height<626){
			var temp=145-(626-viewInner().height);
			$Base(".mini_music_lyric").css({height: temp<0 ? 0:temp+"px"});
		}else{
			$Base(".mini_music_lyric").css({height:150+(viewInner().height-626)+"px"});
		}
	 $Base(".mini_music_content_right").css({
		width:viewInner().width-338+"px" ,
		height:viewInner().height-40+"px"
	 });
	$Base("#searchText").event("keypress", keySearch);
	$Base("#searchButton").event("click", search);
	window.searchFlag=false;
	function keySearch(evt){
		if(evt.keyCode==13||evt.charCode==13){
			search();
		}
	}
	function search(){
		window.searchMessage.index=1;
		if(window.searchFlag===false){
			window.searchFlag=true;
			window.searchMessage.flag=false;
			searchMusic(1,$Base("#searchText").value(),window.searchMessage.index);	
		}	
	}
	$Base("#cursor").event("mousedown", click);
	$Base("#volume_bar_cursor").event("mousedown", click2);
	$Base("#volume_music").event("click", function(evt){
		var node=getEvtObj(evt);
		if(node.id!="volume_bar_cursor"){
			var className=$Base("#volume_music").get(0,true).className;
			var volume=100;
			if(className=="volume_music"){
				$Base("#volume_music").get(0,true).className="volume_music_mute";
				volume=0;
			}else{
				$Base("#volume_music").get(0,true).className="volume_music";
				volume=parseInt($Base("#volume_bar").css("width"))/60;
			}
			try {
				document.getElementById("Externa").volume(volume);		
			} catch (e) {
				document.getElementById("Externa1").volume(volume);
			}
		}
	});
	$Base(".progress").event("click", function(evt){
		$Base("#play_music").get(0,true).className="pause_music";
		$Base("#currTimeBar #bar").css({width:evt.clientX/320*100+"%"});
		try {
			document.getElementById("Externa").position(evt.clientX/320*100);
		} catch (e) {
			document.getElementById("Externa1").position(evt.clientX/320*100);
		}
	});
	$Base("#music_img_bg").css({
		height:viewInner().height+"px",
		width:viewInner().width+"px"
	});	
	$Base(window).event("resize", function(){
	
		if(viewInner().height<626){
			var temp=145-(626-viewInner().height);
			$Base(".mini_music_lyric").css({height: temp<0 ? 0:temp+"px"});
		}else{
			$Base(".mini_music_lyric").css({height:150+(viewInner().height-626)+"px"});
		}
		 $Base(".mini_music_content_right").css({
				width:viewInner().width-338+"px" ,
				height:viewInner().height-40+"px"
			 });
		if(viewInner().width>920){
			$Base(".minimusic_nav").css({
				width:viewInner().width+"px"
			});	
		}else{
			$Base(".minimusic_nav").css({
				width:920+"px"
			});	
		}
		if(viewInner().height<500||viewInner().width<700){
			return;
		}	

		$Base("#music_img_bg").css({
			height:viewInner().height+"px",
			width:viewInner().width+"px"
		});	
	});	
	var miniMusic=new MiniMusicBox();
	$Base("#play_music").event("click", function(){
		if(this.className=="play_music"){
			this.className="pause_music";
			//$Base("#singer_photo").setAttribute("src", "/myHome/load/download_singerPhoto?singerName="+encodeURI(encodeURI('阿杜')));
			try {
				document.getElementById("Externa").playMusic();
			} catch (e) {
				document.getElementById("Externa1").playMusic();
			}
			window.songTime=setInterval(function(){
				if( window.myAngle==360){
					window.myAngle=0;
				}
				$Base("#singer_photo").rotate( window.myAngle++);
			}, 30);
		}else{
			this.className="play_music";
			miniMusic.pause();
			clearInterval(window.songTime);
		}
	});

	function MiniMusicBox(){
		var timeStr="00:00";
		var BufferBar=0;
		var progressBar=0;
		var volume=1;
		var position=0;
		this.getPosiction=function(){
			return position;
		};
		this.setPosiction=function(num){
			try {
				document.getElementById("Externa").posiction(num);
			} catch (e) {
				document.getElementById("Externa1").posiction(num);
			}
		};
		this.getVolume=function(){
			return volume;
		};
		this.setVolume=function(num){
			try {
				document.getElementById("Externa").volume(num);
			} catch (e) {
				document.getElementById("Externa1").volume(num);
			}
		};
		this.play=function(url){
			try {
				document.getElementById("Externa").playMusic(url);
			} catch (e) {
				document.getElementById("Externa1").playMusic(url);
			}
		};
		this.pause=function (){
			try {
				document.getElementById("Externa").pauseMusic();
			} catch (e) {
				document.getElementById("Externa1").pauseMusic();
			}
		};
		this.previous=function (){
			
			
		};
		this.next=function (){
				
		};
	}
}
function click(e) {
	var that = this;
	var diffX =this.offsetLeft;
	var percent=0;
	function stop() {// 松开按键 停止默认行为
		removeEvent(document, 'mousemove', move);
		removeEvent(document, 'mouseup', stop);
		if (typeof that.releaseCapture != 'undefined') {
			that.releaseCapture();
		}
		try {
			document.getElementById("Externa").position(percent);
			
		} catch (e) {
			document.getElementById("Externa1").position(percent);
		}
	}
	function move(evt) { // 鼠标移动
		var left = evt.clientX;
		if (left < 0)
			left = 0;
		else if (left > 330)
			left = 330;
		percent=left/330*100 ;
		$Base("#currTimeBar #bar").css({width:percent+ "%"});
	}
	addEvent(document, 'mousemove', move);
	addEvent(document, 'mouseup', stop);
}
function click2(e) {
	var that = this;
	var diffX =e.clientX-this.offsetLeft-13;
	var percent=0;
	var flag=false;
	function stop() {// 松开按键 停止默认行为
		removeEvent(document, 'mousemove', move);
		removeEvent(document, 'mouseup', stop);
		if (typeof that.releaseCapture != 'undefined') {
			that.releaseCapture();
		}
		try {
			document.getElementById("Externa").volume(flag ? 0:percent/100);
			
		} catch (e) {
			document.getElementById("Externa1").volume(flag ? 0:percent/100);
		}
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
		$Base("#volume_bar").css({width:percent+ "%"});
	}
	addEvent(document, 'mousemove', move);
	addEvent(document, 'mouseup', stop);
}
function resultScroll(evt){
	var clientHeight =parseInt($Base(".search_result").css("height")) ;
	var scrollTop = this.scrollTop;
	var scrollHeight =parseInt($Base(".search_result ul").css("height")) ;
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
	$Base("#play_music").get(0, true).className="pause_music";
	$Base("#singer_photo").setAttribute("src", "/myHome/load/download_singerPhoto?singerName="+encodeURI(encodeURI(this.getElementsByTagName("span")[7].innerHTML)));
	try {
		document.getElementById("Externa").playMusic(this.getAttribute("alt"));	
	} catch (e) {
		document.getElementById("Externa1").playMusic(this.getAttribute("alt"));
	}
	clearInterval(window.songTime);
	window.songTime=setInterval(function(){
		if( window.myAngle==360){
			window.myAngle=0;
		}
		$Base("#singer_photo").rotate( window.myAngle++);
	}, 30);
	$Base("#p_songName").innerHTML(this.getElementsByTagName("span")[6].innerHTML);
	$Base("#p_singerName").innerHTML(this.getElementsByTagName("span")[7].innerHTML);
}
function searchMusic(index,name,method){
	stateAjax({
		url:"/myHome/search/search_music",
		method : 'post',
		head:{"Accept-Charset":"UTF-8"},
		async : true,
		message : {
			pageIndex:index,searchName:name,pageSize:20},
		run:function(text){
			var json;
			json=JSON.parse(text);
			if(json.length<=1){
				window.searchMessage.flag=true;
			}
			window.searchMessage.name=name;
			if(method==1){
				$Base(".mini_music_content_right").remove();
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
				$Base(".mini_music_component").appendChild(contentRight);
				$Base(searchResults).event("scroll", resultScroll);
				 $Base(contentRight).css({
						width:viewInner().width-338+"px" ,
						height:viewInner().height-40+"px"
					 });
			}
			var parent=$Base(".search_result ul");
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
				$Base(rowResults).event("click", playMusic);	
				parent.appendChild(rowResults);
			}
			window.searchFlag=false;
	}});
}
