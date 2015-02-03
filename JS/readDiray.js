/**
 * 
 */
windowLoad(load);
function load(){
	try {
		$Base(".smallCom").hover(function(){
			$Base(this.getElementsByTagName("a")[1]).show();
		}, function(){
			$Base(this.getElementsByTagName("a")[1]).hide();
		});		
	} catch (e) {}
	$Base(".smallCom a").event("click", function(){
		var that=this;
		send("/myHome/user/comment_remove",{
			'id':this.getAttribute("rel")
		},'remove is ok',"删除成功","删除失败",function(){			
			var temp=$Base(that).getParent().getParent().active({
				step:10,t:10,async:{h:0,o:0,mt:0},fn:function(){
					temp.remove();
					$Base("#count").innerHTML(parseInt($Base("#count").innerHTML())-1);
				}
			});
		});
	});
	$Base("#sendComment").event("click",sendClick);
}
function sendClick(){
	var that=this;
	if($Base(that).getPrevious().innerText().length<=0){
		var temp=$Base(that).getPrevious().css({"border":"1px solid #ff4700"}).shake(function(){
			temp.css({"border":"1px solid #DEDEDE"});
		},1);
		return;
	}	
	var date=new Date();
	stateAjax({
		url:"/myHome/user/comment_save",
		method : 'post',
		head:{"Accept-Charset":"UTF-8"},
		async : true,
		message : {
			'c.content':encodeURIComponent($Base(that).getPrevious().innerText()),
			'id':$Base(that).get(0,true).alt
		},
		run:function(text){
			try {
				var json=JSON.parse(text);	

				var element=document.createElement('div');
				element.setAttribute("class", 'smallCom');
				var span=document.createElement('span');
				var img=document.createElement('img');
				img.src="/myHome/load/download_getSmallPhoto?id="+json.id;
				span.appendChild(img);
				element.appendChild(span);
				var bo=document.createElement('a');			
				bo.innerHTML=json.spaceName+":";
				bo.setAttribute("target","blank");
				bo.setAttribute("href","/myHome/user/space/"+json.name+"/");
				element.appendChild(bo);
				var divo=document.createElement('div');
				divo.innerHTML=$Base(that).getPrevious().innerText();
				element.appendChild(divo);
				
				var small_strong=document.createElement('strong');
				small_strong.innerHTML=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'&nbsp'+date.getHours()+':'+date.getMinutes();
				if(json.comId!=undefined){
					var small_remove=document.createElement("a");
					small_remove.setAttribute("alt",json.comId);
					small_remove.className="remove_com";
					small_remove.innerHTML="删除";
					addEvent(small_remove, "click", removeClick);
					small_strong.appendChild(small_remove);
				}
				
				element.appendChild(small_strong);			
				var parent=$Base(that).getNext().get(0,true);
				
				notice("评论成功!");
				parent.insertBefore(element,parent.firstChild);
				var count=$Base(that).getParent().getPrevious().get(0,true).getElementsByTagName("b")[0];
				$Base(count).innerHTML(parseInt($Base(count).innerHTML())+1);
			} catch (e) {
				notice("评论失败!");
			}
			
		}
	});	
}
function send(url,obj,cond,isok,iserror,fn){
	stateAjax({
		url:url,
		method : 'post',
		head:{"Accept-Charset":"UTF-8"},
		async : true,
		message : obj,
		run:function(text){
			if(text=="you login has expired"){
				notice("登录过期");
			}else if(text.isEmpty()==cond){	
				if(fn)fn();
				notice(isok);
			}else{
				notice(iserror);
			}
		}
	});	
}
function removeClick(){
	var that=this;
	stateAjax({
		url:"/myHome/user/comment_remove",
		method : 'get',
		head:{"Accept-Charset":"UTF-8"},
		async : true,
		message : {
			'id':this.getAttribute("alt")
		},
		run:function(text){
			if(text=="remove is ok"){
				notice("删除评论成功!");
				var temp=$Base(that).getParent().getParent().active({
					step:10,t:10,async:{h:0,o:0,mt:0},fn:function(){		
						var count=$Base(that).getParent().getParent().getParent().getParent().getPrevious().get(0,true).getElementsByTagName("b")[0];
						$Base(count).innerHTML(parseInt($Base(count).innerHTML())-1);
						temp.remove();
					}
				});
			}else{
				notice("删除评论失败!");
			}
		}
	});
}
function removeLog(acc,evt){
	stateAjax({
		url:"/myHome/user/function_removeDiary",
		method : 'get',
		head:{"Accept-Charset":"UTF-8"},
		async : true,
		message : {
			'userId':evt.getAttribute("rel")
		},
		run:function(text){
			if(text=="removeDiary is ok"){
				notice("删除日记成功，即将跳转！!",function(){
					window.open("/myHome/user/space/"+acc+"/diary","_self");
				});			
			}else{
				notice("删除日记失败!");
			}
		}
	});
}