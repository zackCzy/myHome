/**
 * 
 */
windowLoad(load);

function load() {


	$Base("body").css({height:viewInner().height+130+'px'});
	try {
		$Base("#add_friend").event("click", function(){
			send("/myHome/friends/friends_addFirend",{addUserId:document.getElementById("user_slef_id").rel},
				"{'add':'ok'}","关注成功","关注失败"
			);
		});
	} catch (e) {}
	try {
		$Base(".smallCom").hover(function(){
			$Base(this.getElementsByTagName("a")[0]).show();
		}, function(){
			$Base(this.getElementsByTagName("a")[0]).hide();
		});		
	} catch (e) {}
	
	$Base(".smallCom a").event("click", function(){
		var that=this;
		send("/myHome/user/comment_remove",{
			'id':this.getAttribute("title")
		},'remove is ok',"删除成功","删除失败",function(){			
			var temp=$Base(that).getParent().getParent().active({
				step:10,t:10,async:{h:0,o:0,mt:0},fn:function(){		
					var count=$Base(that).getParent().getParent().getParent().getParent().getParent().getPrevious().get(0,true).getElementsByTagName("b")[1];
					$Base(count).innerHTML(parseInt($Base(count).innerHTML())-1);
					temp.remove();
				}
			});
		});
	});
	
	$Base(".sendComment").event("click",function(){
		var that=this;
		if($Base(that).getPrevious().innerText().length<=0){
			notice("评论内容不能为空");
			return;
		}
		send("/myHome/user/comment_save",{
			'c.content':encodeURIComponent($Base(that).getPrevious().innerText()),
			'id':$Base(that).getPrevious().getPrevious().getPrevious().value()
		},'save is ok',"评论成功","评论失败",function(){

			var date=new Date();
			var element=document.createElement('div');
			element.setAttribute("class", 'smallCom');
			var span=document.createElement('span');
			var img=document.createElement('img');
			img.src="/myHome/load/download_getSmallPhoto?id="+$Base('#space_user_id').value();
			span.appendChild(img);
			element.appendChild(span);
			var bo=document.createElement('b');			
			bo.innerHTML=$Base('#space_user_name').value();
			element.appendChild(bo);
			var divo=document.createElement('div');
			divo.innerHTML=$Base(that).getPrevious().innerText();
			element.appendChild(divo);
			var stron=document.createElement('strong');
			stron.innerHTML=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'&nbsp'+date.getHours()+':'+date.getMinutes();
			element.appendChild(stron);			
			var parent=$Base(that).getNext().get(0,true);
			parent.insertBefore(element,parent.firstChild);
			var count=$Base(that).getParent().getPrevious().get(0,true).getElementsByTagName("b")[0];
			$Base(count).innerHTML(parseInt($Base(count).innerHTML())+1);
		});
	});
	
	$Base(".mycomment").event("click", function(){
		var that=$Base(this).getParent().getNext();
		if(that.css("display")=="none"){
			that.show();
			var heights=that.css('height');
			that.css({'height':'0px'}).active({
				step:10,t:30,async:{o:100,h:parseInt(heights)},fn:function(){
					that.css({height:"auto"});
				}
			});
		}else {
			that.active({
				step:10,t:30,async:{o:0,h:0},fn:function(){
					that.css({height:"auto"}).hide();
				}
			});
		}
	});

	$Base(".cut_out").event('click', function(){
		var that=$Base(this).getParent();
		that.active({
			step:10,t:30,async:{o:0,h:0},fn:function(){
				that.css({height:"auto"}).hide();
			}
		});
	});
	
	addEvent(window, 'scroll', function(evt) {
		var a = document.documentElement.scrollTop==0? document.body.clientHeight : document.documentElement.clientHeight;

		if(getScroll().top>a*2){
			$Base("#returnHead").css({
				bottom:'30px'
			}).active({step:10,t:30,async:{o:100}}).show();
		}else{
			$Base("#returnHead").active({step:50,t:10,async:{o:0}}).hide();
		}

	});
	$Base("#returnHead").event("click", function(){
		$Base("body").active({
			step:10,
			t:30,
			attr:'s',
			target:0
		});		
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