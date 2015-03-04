/**
 * 
 */

$(function(){
	stopScroll();
	window.count=1;
	var clientHeight =  parseInt($("#viki_scroll").css("height"));
	var scrollHeight = document.documentElement.scrollHeight|| document.body.scrollHeight ;
	var flag=true;
	$("#viki_bar").css({
		height:Math.min((clientHeight*clientHeight)/scrollHeight)+"px"
	});
	document.documentElement.scrollTop=0;
	document.body.scrollTop=0;
	$(window).on('scroll', function(evt) {
		var clientHeight = document.documentElement.clientHeight||document.body.clientHeight;
		var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
		var scrollHeight = document.documentElement.scrollHeight|| document.body.scrollHeight ;
		if(scrollTop<0||clientHeight+scrollTop+30>=scrollHeight){
			return false;
		}
		if(scrollTop>50){
			$(".display_info_bg").css({
				position:"fixed",
				top:"0",
				background:"#000",
				opacity:'0.8'
			});
		}else{
			$(".display_info_bg").css({
				position:"absolute",
				top:"50px",
				background:"#363636",
				opacity:'1'
			});
		}
		if(scrollTop>clientHeight+1700){
			
		}else if(scrollTop>clientHeight){	
			var n=Math.abs(Math.floor((scrollTop-clientHeight)/170-1));
			$(".divice-fea-left-grid").eq(n).fadeIn(1000).slideDown(1000);
		}
	});
	$("#music_display_ul img").hover(function(){
		clearInterval(window.timeMusic);
	}, function(){
		window.timeMusic=setInterval(function(){
			boxLeft();
		},6000);
	});
	$("#music_display_left").on("click",function(){
		clearInterval(window.timeMusic);
		boxLeft();
	});
	$("#music_display_right").on("click",function(){
		clearInterval(window.timeMusic);
		boxRight();
	});
	$(window).resize(function(){
		if(viewInner().width<858){
			$("#viki_info").css({
				width:858+"px"		
			});
		}else{
			$("#viki_info").css({
				height:viewInner().width/3.21+"px",
				width:100+"%"	
			});
		}
	});
	$("#viki_bar").on("mousedown", click);
	try {
		addEvent(document,"DOMMouseScroll",scrollF);
	} catch (e) {}
	try {
		addEvent(document,"mousewheel",scrollF);
	} catch (e) {}
	window.timeMusic=setInterval(function(){
		boxLeft();
	},6000);
	function boxRight(){
		if(!flag){
			return false;
		}
		flag=false;
		$("#music_display_ul li:first").animate({
			width:0,
			paddingLeft:0,
			paddingRight:0,
			height:0,
			borderBottom:0,
			marginTop:100
		},1300,function(){
			$(this).appendTo("#music_display_ul").css({
				"width":"330px",
				"padding":"0 10px",
				"height":"270px",
				"margin-top":0,
			    borderBottom:2
			});
			flag=true;
		});
	}
	function boxLeft(){
		if(!flag){
			return false;
		}
		flag=false;
		$("#music_display_ul li:last").insertBefore("#music_display_ul li:first").css({
			"width":0,
			"padding":0,
			"height":0,
			"marginTop":100,
			borderBottom:0
		}).animate({
			width:330,
			paddingLeft:10,
			paddingRight:10,
			height:270,
			marginTop:0,
			borderBottom:"2px"
		},1300,function(){
			flag=true;
		});
	}
	function click(e) {
		var that = this;
		var diffY = e.clientY - this.offsetTop;
		var scrollBarHeight=parseInt($("#viki_scroll").css("height"));
		var clientHeightM =  document.documentElement.clientHeight||document.body.clientHeight;
		
		function stop() {
			removeEvent(that, 'mousemove', move);
			removeEvent(that, 'mouseup', stop);
			if (typeof that.releaseCapture != 'undefined') {
				that.releaseCapture();
			}
		}
		function move(e) {
			var top = e.clientY - diffY;
			if (top < 0)
				top = 0;
			else if (top > scrollBarHeight - that.offsetHeight)
				top = scrollBarHeight - that.offsetHeight;
			that.style['top'] = top + "px";
			var temp=(top*clientHeightM/ scrollBarHeight)*((document.documentElement.scrollHeight||document.body.scrollHeight)/scrollBarHeight);
			document.documentElement.scrollTop= temp;
			document.body.scrollTop= temp;
			if (typeof that.setCapture != 'undefined') {
				that.setCapture();
			}
		}
		addEvent(that, 'mousemove', move);
		addEvent(that, 'mouseup', stop);
	}
	function scrollF(evt){
		var that=$("#viki_bar");
		var scrollBarHeight=parseInt($("#viki_scroll").css("height"));
		var clientHeightM =  document.documentElement.clientHeight||document.body.clientHeight;
		var top=parseInt(that.css("top"))+(-(evt.wheelDelta/40)*3||evt.detail*3);
		var height=that.get(0).offsetHeight;
		if (top < 0)
			top = 0;
		else if (top > clientHeightM -height){
			top = clientHeightM -height;
		}
		that.css({'top' :top+"px"});
		var temp=(top*clientHeightM/ scrollBarHeight)*((document.documentElement.scrollHeight||document.body.scrollHeight)/scrollBarHeight);
		document.documentElement.scrollTop= temp;
		document.body.scrollTop= temp;
	}
	
});


	



