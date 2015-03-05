/**
 * 
 */

$(load);

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
	
	$("#seav_internation_music").click(function(){
		$.ajax({
			url:BASE_PATH+"/user/music_addInternationMusic",
			method : 'post',
			data : {
				'myMusic.song':(document.getElementById("song_name").value.isEmpty()),
				'myMusic.singer':(document.getElementById("singer_name").value.isEmpty()),
				'myMusic.musicId':(document.getElementById("song_url").value.isEmpty())
			},
			success:function(text){	
				if(text=="you login has expired"){
					$.notice("Viki提醒您！","登录过期");
				}
				else if(text.isEmpty()==""){
					$.notice("Viki提醒您！","添加成功,刷新后显示");
				}else{
					$.notice("Viki提醒您！","添加成功,刷新后显示");
				}
			}
		});
	});
	$('.make_music li a').on('click', function() {
		var that=this;
		$.ajax({
			url:BASE_PATH+"/user/music_removeMusic",
			method : 'get',
			data : {id:that.getAttribute("alt")},
			success:function(text){	
				if(text=="you login has expired"){
					window.location.href=window.location.href;
				}
				else if(text.isEmpty()=="remove music is error"){
					$.notice("Viki提醒您！","删除失败");
				}else{
					$(that.parentNode).slideUp(300,function(){
						$(this).remove();
					});
					$.notice("Viki提醒您！","删除成功,刷新后显示");
				}
			}
		});	
	});
	$('#mini_music_data').on('click', function() {
		$('#lock_music').lock();
		$('.pick_music_box').setCenter().show(300);
	});
	$('#internation_music').on('click', function() {
		$('#lock_music').lock();
		$('.add_pick_music_box').setCenter().show(300);
	});
	$('.pick_music_box').move(document.getElementById("box_move"));
	$('.add_pick_music_box').move(document.getElementById("add_box_move"));
	
	$('.box_close').on('click', function() {
		$('#lock_music').unlock();
		$(this.parentNode.parentNode).hide(300);
	});

	$('#bt_search').on('click', function() {
		search=document.getElementById("bt_search_text").value;
		box(search,1);
	});
	$('#displayPage i').on('click', function() {
		var temp=this.innerHTML.isEmpty();
		if(temp=="")return;	
		if(parseInt(temp)==window.current||parseInt(temp)>window.count)return;		
		box(search,parseInt(temp));
	});
	$('#endpage').on('click', function() {
		box(search,window.count);
	});
	$('#display_box strong').on('click', function() {
		if(this.innerHTML.isEmpty()!=""){
			search=this.innerHTML.isEmpty();
			box(search,1);
		}
	});
	$('#display_box b').on('click', function() {
		if(this.innerHTML.isEmpty()!=""){
			search=this.innerHTML.isEmpty().slice(1);
			box(search,1);
		}
	});
	$('#display_box span').on('click', function() {	
		var that=this;
		if(this.innerHTML.isEmpty()!=""){
			$.ajax({
				url:BASE_PATH+"/user/music_addMusic",
				method : 'get',
				data : {id:that.getAttribute("alt")},
				success:function(text){	
					if(text=="you login has expired"){
						$.notice("Viki提醒您！","登录过期");
					}
					else if(text.isEmpty()==""){
						$.notice("Viki提醒您！","添加成功,刷新后显示");
					}else{
						$.notice("Viki提醒您！","添加成功,刷新后显示");
					}
				}
			});	
		}
	});
}

function box(name,index){
	$.ajax({
		url:BASE_PATH+"/user/music_searchMusic",
		method : 'post',
		data : {
			pageIndex:index,searchName:name},
		success:function(text){
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