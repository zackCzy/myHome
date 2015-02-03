/**
 * 
 */

windowLoad(load);

function load(){
	var ul=document.getElementById("display_box");
	var li,s,b,span;
	var search;
	for ( var i = 0; i <6; i++) {	
		li=document.createElement("li");
		s=document.createElement("strong");
		b=document.createElement("b");
		span=document.createElement("span");
		li.appendChild(s);
		li.appendChild(b);
		li.appendChild(span);
		ul.appendChild(li);
	}
	
	$Base("#seav_internation_music").event("click", function(){
		stateAjax({
			url:"/myHome/user/music_addInternationMusic",
			method : 'post',
			head:{"Accept-Charset":"UTF-8"},
			async : true,
			message : {
				'myMusic.song':encodeURIComponent(document.getElementById("song_name").value.isEmpty()),
				'myMusic.singer':encodeURIComponent(document.getElementById("singer_name").value.isEmpty()),
				'myMusic.musicId':encodeURIComponent(document.getElementById("song_url").value.isEmpty())
			},
			run:function(text){	
				if(text=="you login has expired"){
					notice("登录过期");
				}
				else if(text.isEmpty()==""){
					notice("添加成功,刷新后显示");
				}else{
					notice("添加成功,刷新后显示");
				}
			}
		});
	});
	$Base('.make_music li a').event('click', function() {
		var that=this;
		stateAjax({
			url:"/myHome/user/music_removeMusic",
			method : 'get',
			head:{"Accept-Charset":"UTF-8"},
			async : true,
			message : {id:that.getAttribute("alt")},
			run:function(text){	
				if(text=="you login has expired"){
					notice("登录过期");
				}
				else if(text.isEmpty()==""){
					notice("删除成功,刷新后显示");
				}else{
					notice("删除成功,刷新后显示");
				}
			}
		});	
	});
	$Base('#mini_music_data').event('click', function() {
		if(document.body.scrollTop){
			document.body.scrollTop=0;
		}else{
			document.documentElement.scrollTop=0;
		}
		$Base('#lock_music').lock().active({
			attr : 'o',target : 60,t : 30,step : 10});
		$Base('.pick_music_box').center().show();
	});
	$Base('#internation_music').event('click', function() {
		if(document.body.scrollTop){
			document.body.scrollTop=0;
		}else{
			document.documentElement.scrollTop=0;
		}
		$Base('#lock_music').lock().active({
			attr : 'o',target : 60,t : 30,step : 10});
		$Base('.add_pick_music_box').center().show();
	});
	$Base('.pick_music_box').resizeCenter().Move(document.getElementById("box_move"));
	$Base('.add_pick_music_box').resizeCenter().Move(document.getElementById("add_box_move"));
	
	$Base('.box_close').event('click', function() {
		$Base('#lock_music').active({
			attr : 'o',target : 0,t : 30,step : 10,
			fn : function() {$Base('#lock_music').unlock();}});
		$Base(this).getParent().getParent().hide();
	});

	$Base('#bt_search').event('click', function() {
		search=document.getElementById("bt_search_text").value;
		box(search,1);
	});
	$Base('#displayPage i').event('click', function() {
		var temp=this.innerHTML.isEmpty();
		if(temp=="")return;	
		if(parseInt(temp)==window.current||parseInt(temp)>window.count)return;		
		box(search,parseInt(temp));
	});
	$Base('#endpage').event('click', function() {
		box(search,window.count);
	});
	$Base('#display_box strong').event('click', function() {
		if(this.innerHTML.isEmpty()!=""){
			search=this.innerHTML.isEmpty();
			box(search,1);
		}
	});
	$Base('#display_box b').event('click', function() {
		if(this.innerHTML.isEmpty()!=""){
			search=this.innerHTML.isEmpty().slice(1);
			box(search,1);
		}
	});
	$Base('#display_box span').event('click', function() {	
		var that=this;
		if(this.innerHTML.isEmpty()!=""){
			stateAjax({
				url:"/myHome/user/music_addMusic",
				method : 'get',
				head:{"Accept-Charset":"UTF-8"},
				async : true,
				message : {id:that.getAttribute("alt")},
				run:function(text){	
					if(text=="you login has expired"){
						notice("登录过期");
					}
					else if(text.isEmpty()==""){
						notice("添加成功,刷新后显示");
					}else{
						notice("添加成功,刷新后显示");
					}
				}
			});	
		}
	});
}

function box(name,index){
	stateAjax({
		url:"/myHome/user/music_searchMusic",
		method : 'post',
		head:{"Accept-Charset":"UTF-8"},
		async : true,
		message : {
			pageIndex:index,searchName:name},
		run:function(text){
			var json;
			try {
				json=JSON.parse(text);
				document.getElementById("pageNum").innerHTML="共为您搜索到["+json[json.length-1]["pagecount"]+"]条记录";
				window.current=parseInt(json[json.length-1]["currentpage"]);
				window.count=Math.ceil(parseInt(json[json.length-1]["pagecount"])/6);
				var j=window.count-4==window.current?  (window.current-window.count+7) :window.count-5<window.current? (window.current-window.count+5): window.current<=1 ? 1 :2;
				
				if(window.count){
					var nodes=document.getElementById("displayPage").children;
					for ( var i = 0; i <nodes.length; i++) {
						if(count >=5){
							nodes[i].innerHTML= i==0?"尾页":window.current+nodes.length-i-j;
						}else if(i>count){
							nodes[i].innerHTML= i==0?"尾页":"";
						}else {
							nodes[i].innerHTML= i==0?"尾页":window.current+nodes.length-i-j;
						}
					}	
				}
			} catch (e) {}
			
			var ul=document.getElementById("display_box");
			var nodes=ul.children;
			var s,b;
			for ( var i = 0; i < nodes.length; i++) {
				s=nodes[i].getElementsByTagName("strong")[0];
				b=nodes[i].getElementsByTagName("b")[0];
				span=nodes[i].getElementsByTagName("span")[0];
				s.innerHTML="";
				s.className="";			
				b.innerHTML="";
				b.className="";
				span.innerHTML="";
				try {	
					if(json[i]["song"]){
						s.innerHTML=json[i]["song"];
						s.className="underline";			
						b.innerHTML="-"+json[i]["singer"];
						b.className="underline";
						span.innerHTML="加入背景音乐";
						span.setAttribute("alt",json[i]["id"]);
						span.className="underline";	
					}
				} catch (e) {}
			}		
		}
	});	
}