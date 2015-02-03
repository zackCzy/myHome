/**
 * 
 */
var ini = 0;
// 设置浏览器最小缩放尺寸

windowLoad(loaded);

function loaded() {
	// 个人信息事件绑定
	$Base('.textA').empty();
	minSize('body', 1000);
	$Base("#sound").event("mouseover",function(){		
		var text=$Base('#searchResult').get(0, true).value.isEmpty();
		if(text=="")return;
		var res=$Base('#cut').get(0, true).name;
		if(res=="")return;
		var str=res=="sp"? "http://tts.youdao.com/fanyivoice?keyfrom=fanyi%2Eweb%2Eindex&le=SP&word="+text:
		"http://tts.baidu.com/text2audio?lan="+res+"&pid=101&ie=UTF-8&text="+	text;			
		var play=$Base("#myPlayer").get(0,true);
		play.src=str;
		if(play.play)play.play();
	});
	$Base('#cut').event('click', cutShow);
	function cutShow() {// 显示语言选择
		var that=this;
		$Base('.language').show().active({
			t : 30,
			step : 20,
			async : {
				o : 100,
				h : 141
			},
			fn : function() {
				removeEvent(that, 'click', cutShow);
				addEvent(that, 'click', cutHide);
			}
		});
	}
	function cutHide() {// 隐藏语言选择
		var that=this;
		$Base('.language').active({
			t : 30,
			step : 20,
			async : {
				o : 0,
				h : 0
			},
			fn : function() {
				removeEvent(that, 'click', cutHide);
				addEvent(that, 'click', cutShow);
			}
		});
	}

	// 选中语言
	$Base('.language').event('click',function(evt) {
						var cut=$Base('#cut').get(0, true);
						cut.value=getEvtObj(evt).innerHTML.isEmpty();
						cut.name=getEvtObj(evt).id;
						cutHide.call(cut);
					});
	// 导航动画
	$Base('#nav .blank li').event('mouseover', function() {
		box(this.offsetLeft + 64);
	}).event('click', function() {
		$Base('#nav .blank').get(0, true).value = this.offsetLeft + 64;
	});
	$Base('#nav .blank').event('mouseout', function() {
		box(this.value);
	});
	function box(target) {
		$Base('#nav .nav_button').active({
			step : 10,
			t : 30,
			attr : 'x',
			target : target ? target : 84,
			fn : function() {
				$Base('.nav_button .block').active({
					step : 10,
					t : 20,
					attr : 'x',
					target : target ? -(target - 84) : 0
				});
			}
		});
	}

	$Base('#empty').event('click', function() {
		var that = $Base('.textA').empty().css({
			height : "190px"
		}).geParent().css({
			height : "222px"
		});
	});
	// 自动调节文本域大小
	$Base('.textA')
			.event(
					'keydown',
					function() {
						var str = this.value.split("\n");
						if(str.length>15)return;
						if (str.length > 7) {
							this.style.height = str.length * 28 + 'px';
						} else {
							this.style.height = 180 + 'px';
						}
						var h= parseInt(getStyle(this,'height'));
						this.parentNode.style.height =h+ 42+ 'px';
						document.getElementById("search").style.height=h+420+"px";
					});
	
	$Base('#tranlster').event('click', function() {
		$Base('#nav').hide();
		var that = $Base('#search').show().active({
			step : 10,
			t : 30,
			async : {
				w : document.documentElement.clientWidth,
				o : 100
			},
			fn : function() {
				that.css({
					width : '100%'
				});
			}
		});
	});
	$Base('#transRetuen').event("click", function() {
		var temp = $Base('#search').active({
			step : 10,
			t : 30,
			async : {
				o : 0,
				h : 0
			},
			fn : function() {
				temp.css({
					'height' : '600px',
					'width' : '0'
				}).hide();
				$Base('#nav').show();
			}
		});
	});

	$Base('#query').event('click',trans);
}

function trans() {

	var lang = DOL($Base('#cut').get(0, true).value);
	var str =encodeURIComponent($Base('#searchText').get(0, true).value.isEmpty());
	if(str=="")return;
	var state=$Base('#sreachState').show();
	stateAjax({
		method : 'post',
		url :'/myHome/select_word.service',
		head:{
				"Accept-Charset":"UTF-8"
		},
		message : {
			word : str,
			src : lang.src,
			res : lang.res
		},
		async : true,
		run : function(text) {
			var node=$Base('#searchResult').get(0, true);
			if(text.isEmpty()=="no"){
				node.value="数据查询失败请稍后再试！";
			}				
			try {
				var json=JSON.parse(text);			
				 node.value=json.res? json.res:json.trans_result.data[0].dst;		
			} catch (e) {
				node.value="数据查询失败请稍后再试！";
			}
			var str =node.value.split("\n");
			if (str.length > 6) {
				node.style.height = str.length * 28 + 'px';
			} else {
				node.style.height = 180 + 'px';
			}
			node.parentNode.style.height = parseInt(getStyle(node,'height'))+ 42 + 'px';
			state.hide();
		}
	});

}
function DOL(value) {
	return value=="自动检测" ? {src : "AUTO",res : "AUTO"}:value=="多→英" ? {src : "AUTO",res : "en"}:value=="多→汉" ? {src : "AUTO",res : "zh-CN"}:
		value=="多→日" ? {src : "AUTO",res : "ja"}: value=="多→韩" ? {src : "AUTO",res : "ko"} :
			value=="多→俄" ? {src : "AUTO",res : "ru"} :value=="多→法" ? {src : "AUTO",res : "fr"}:
				value=="多→西" ? {src : "AUTO",res : "es"} :value=="多→德" ? {src : "AUTO",res : "de"}:
					value=="多→意" ?{src : "AUTO",res : "it"}:value=="多→马" ? {src : "AUTO",res : "ms"} :value=="多→越" ? {src : "AUTO",res : "ms"}:
						value=="多→瑞" ?  {src : "AUTO",res : "sv"} :value=="多→泰" ?  {src : "AUTO",res : "ta"} :
							value=="汉→粤" ? {src : "zh",res : "yue"} :value=="粤→汉"? {src : "yue",res : "zh"}:
								value=="多→菲" ?{src : "AUTO",res : "tl"} :{src : "AUTO",res : "zh-CN"};

}