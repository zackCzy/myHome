/**
 * 
 */
function Notice(){
	if(document.getElementById(this.DOM_ID)==null)this.init();
	return this;
}
Notice.prototype={
	contentPoint:{
		width: "220px",
		background: "#EFEFEF",
		border: "3px solid #58CAFA",
		"border-top": 0,
		display: "none",
		"text-align": "center",
		"line-height": "90px",
		height: "auto",
		display:"none",
		"z-index": 9999,
		"border-radius":"0 0 8px 8px",
		"text-shadow":"0 2px 3px #CFCFCF",
		"box-shadow": "3px 3px 2px rgba(0, 0, 0, 0.05), 5px 5px 3px rgba(0, 0, 0, 0.1)",
		"font-size":"14px",
		color: "#898989",
		"font-weight": "bold",
		position: "fixed",
		top: 0
	},
	DOM_ID:("notice_zack_20150119"),
	init:function(){
		var _that=this;
		$("body","html").append(
			$("<div id='"+_that.DOM_ID+"'></div>").append(
				$("<span id='"+_that.DOM_ID+"_title' style='color: #FF4700; margin: 25px 0 0; line-height: 20px; height: 20px; display: block;'></span>")
			).append(
				$("<div id='"+_that.DOM_ID+"_content'></div>")	
			).css(_that.contentPoint)
		);
	},
	show:function(title,content,time,fn){
		var _that=this;
		var $point=$(document.getElementById(this.DOM_ID));
		var t=time==null ? 4000 :time;
		$point.find("#"+_that.DOM_ID+"_title").text(title).end().find("#"+_that.DOM_ID+"_content").html(content);
		$point.setCenter().css("top","0");
		$point.slideDown(300);
		clearTimeout(_that.time);
		_that.time=setTimeout(function(){
			$point.slideUp(300);
			if(typeof fn =="function"){
				fn.call(_that);
			}
		},t);
	}
};