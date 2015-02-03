/**
 * 
 */


//windowLoad(loaded);
$(load);
function noporint(){
	$.texi({
		title:"Viki提醒您",
		body:"目前仅支持翻译功能，请见谅!",
		time:3000
	});
}
function load() {
	// 个人信息事件绑定
	$('.textA').val("");

	$("#sound").on("mouseover",function(){		
		var text=$('#searchResult').text().isEmpty();
		if(text=="")return;
		var res=$('#cut').attr("name");
		if(res=="")return;
		var str=res=="sp"? "http://tts.youdao.com/fanyivoice?keyfrom=fanyi%2Eweb%2Eindex&le=SP&word="+text:
		"http://tts.baidu.com/text2audio?lan="+res+"&pid=101&ie=UTF-8&text="+	text;			
		var play=document.getElementById("myPlayer");
		play.src=str;
		if(play.play)play.play();
	});
	$('#cut').on('click', cutShow);
	function cutShow() {// 显示语言选择
		var that=this;
		var $this=$(this);
		$('.language').show(300,function() {
				$this.off('click', cutShow);
				$this.on('click', cutHide);
		});
	}
	function cutHide() {// 隐藏语言选择
		var that=this;
		var $this=$(this);
		$('.language').hide(300,function() {
				$this.off('click', cutHide);
				$this.on('click', cutShow);
		});
	}

	// 选中语言
	$('.language li').on('click',function(evt) {
			var cut=document.getElementById("cut");
			cut.value=$(this).text().isEmpty();
			cut.name=this.id;
			cutHide.call(cut);
	});
	// 导航动画
	$('.trans_nav .blank').on('mouseout', function() {
		box($(this).attr("value"));
	}).find("li").on('mouseover', function() {
		box(this.offsetLeft + 64);
	}).on('click', function() {
		$('.trans_nav .blank').attr("value",this.offsetLeft + 64) ;
	});
	function box(target) {
		$('.trans_nav .nav_button').stop(true).animate({
			left : (target ? target : 84)}
			,function() {
				$('.block',this).stop(true).animate({
					left: -(target - 84)
				});
		});
	}

	$('#empty').on('click', function() {
		$('.textA').val("").css({
			height : "190px"
		}).parent().css({
			height : "222px"
		});
	});	
	$('#tranlster').on('click', function() {
		$('.trans_nav').css("display","none");
		$('#search').css("display","block").animate({
				width : document.documentElement.clientWidth,
				opacity : 1
			},550,function() {
				$(this).css({
					width : '100%'
				});
		});
	});
	$('#transRetuen').on("click", function() {
		$('#search').animate({
				opacity : 0,
				height : 0
			},550,function() {
				$(this).css({
					'height' : '600px',
					'width' : '0',
					display:"none"
				});
				$('.trans_nav').css("display","block");
		});
	});

	$('#query').on('click',trans);
}

function trans() {

	var lang = dol(document.getElementById('cut').value);
	var str =$('#searchText').text().isEmpty();
	if(str=="")return;
	var state=$('#sreachState').show(300);
	$.ajax({
		method : 'post',
		url :BASE_PATH+'/select_word.service',
		accept:{
				"Accept-Charset":"UTF-8"
		},
		data : {
			word : str,
			src : lang.src,
			res : lang.res
		},
		success : function(meg) {
			var $search=$('#searchResult');
			if(meg.isEmpty()=="no"){
				$search.text("数据查询失败请稍后再试！");
			}				
			try {
				var json=JSON.parse(meg);			
				$search.text(json.res? json.res:json.trans_result.data[0].dst);		
			} catch (e) {
				$search.text("数据查询失败请稍后再试！");
			}
			state.hide(300);
		}
	});
}
function dol(value) {
	return value=="自动检测" ? {src : "AUTO",res : "AUTO"}:value=="多→英" ? {src : "AUTO",res : "en"}:value=="多→汉" ? {src : "AUTO",res : "zh-CN"}:
		value=="多→日" ? {src : "AUTO",res : "ja"}: value=="多→韩" ? {src : "AUTO",res : "ko"} :
			value=="多→俄" ? {src : "AUTO",res : "ru"} :value=="多→法" ? {src : "AUTO",res : "fr"}:
				value=="多→西" ? {src : "AUTO",res : "es"} :value=="多→德" ? {src : "AUTO",res : "de"}:
					value=="多→意" ?{src : "AUTO",res : "it"}:value=="多→马" ? {src : "AUTO",res : "ms"} :value=="多→越" ? {src : "AUTO",res : "ms"}:
						value=="多→瑞" ?  {src : "AUTO",res : "sv"} :value=="多→泰" ?  {src : "AUTO",res : "ta"} :
							value=="汉→粤" ? {src : "zh",res : "yue"} :value=="粤→汉"? {src : "yue",res : "zh"}:
								value=="多→菲" ?{src : "AUTO",res : "tl"} :{src : "AUTO",res : "zh-CN"};

}