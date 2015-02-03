/**
 * 
 */
function Texi(title,body,time,id,bt){
		this.title=title;
		this.body=body;
		this.time=time;
		this.id=id;
		this.bt=bt;
		if(this.id==null){
			this.id="zack_texi_plug";
		}
		return this;
}
Texi.prototype={
		TITLE_CSS:{
				padding:"7px",
				"line-height":"35px",
				width:"330px",
				height:"20px",
				background:"#E77166",
				display:"block",
				"text-align":"center",
				"padding-left":"10px",
				"padding-right":"10px",
				"border-bottom":"2px solid #8EBD21"
		},
		TLTLS_B_CSS:{
			"width":"300px",
			"height":"20px",
			"display":"block",
			"float":"left",
			"line-height":"20px",
			"text-align":"left",
			"text-overflow":"ellipsis",
			"white-space":"nowrap",
			color:"#423009"
		},
		BODY_CSS:{
			width:"310px",
			background:"#4CC1E9",
			display:"block",
			padding:"20px",
			"word-wrap":"break-word"
		},
		CLOSE_CSS:{
			width:"18px",
			height:"18px",
			"border-radius":"18px",
			background:"#FF4700",
			"float":"right",
			"line-height":"18px",
			border:"1px solid #333",
			cursor:"pointer",
			display:"block"
		},
		OPTION_CSS:{ 
			width:"350px",
			display:"none",
			border:"7px solid #FCFCFC",
			"-webkit-box-shadow":"3px 3px 3px #ccc",
			"box-shadow":"3px 3px 3px #ccc",
			"border-radius":"20px",
			overflow:"hidden",
			position:"fixed",
			id:"texi_zack_czy"
		},
		BT_CSS:{
			width:"80px",float:"left",height:"20px",corsor:"pointer"
		},
		init:function(){
			if(document.getElementById(this.id)!=undefined){
				return false;
			}
			var options,texi,title,title_b,title_close,body,bt;
			var _doc=document;
			var _that=this;
			texi=_doc.createElement("div");
			texi.id=this.id;
			title=_doc.createElement("span");
			title_b=_doc.createElement("b");
			title_close=_doc.createElement("strong");
			body=_doc.createElement("div");			
			$(texi).css(_that.OPTION_CSS).append(
					$(title).css(_that.TITLE_CSS).append(
						$(title_b).css(_that.TLTLS_B_CSS).html(_that.title)
					).append(
						$(title_close).css(_that.CLOSE_CSS).html("X").on("click",function(){
							$("#"+_that.id).hide(200);
						})
					)	
			).append(
					$(body).css(_that.BODY_CSS).append(bt)
			).appendTo($("body")).move(title);
		},
		show:function(){
			var that=document.getElementById(this.id),bt;
			var _that=this;
			if(_that.time!=undefined){
				clearInterval(_that.time);
			}
			if(_that.bt!=undefined){
				bt=$("<div style='width:80%;margin:20px auto 0;height:20px;background:#4CC1E9'></div>" ).append(
						$("<input type='button' />").css(_that.BT_CSS).val(_that.bt.okVal).click(function(){
							_that.bt.okFn.call(_that);
							$("#"+_that.id).hide(200);
						})
				).append(
						$("<input type='button' />").css(_that.BT_CSS).css("float","right").val(_that.bt.noVal).click(function(){
							_that.bt.noFn.call(_that);
							$("#"+_that.id).hide(200);
						})
				);
			}
			$(that).find("span:eq(0) b :eq(0)").html(_that.title).end().find("div:eq(0)").html(_that.body).append(bt);
			var top=($(window).height()-$("#"+_that.id).innerHeight())/2.5;
			var left=($(window).width()-$("#"+_that.id).innerWidth())/2;
			$(document.getElementById(this.id)).css({
				"top":top,
				"left":left
			}).show(300,function(){
				$(this).shake(function(){
					if(_that.time>0)
						that.time=setTimeout(function(){
							$(that).hide();that.time==null;
						},_that.time);
				});
			});
		}
};

