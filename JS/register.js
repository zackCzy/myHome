/**
 * 
 */

windowLoad(load);

function load(){
	$Base(".cus-sel-opt-panel span").event("click", function(evt){
		window.spanFlag=true;
		var temp=$Base(this).getNext();		
		if(temp.css("display")=="none"){
			$Base(".cus-sel-opt-panel ul").hide();
			temp.show();
		}else{
			$Base(this).getNext().hide();
		}
	});
	$Base("body").event("click", function(evt){
		
		if(!window.spanFlag){
			$Base(".cus-sel-opt-panel ul").hide();
		}
		window.spanFlag=false;
	});
	$Base("#year").myCreateNode("li", 1970,new Date().getFullYear()-1970, function(op,int){
		 op.innerHTML=int.toString();
	});
	$Base("#month").myCreateNode("li",1,11,function(op,int){
		 op.innerHTML=int.toString();
	});
	//日期动态创建
	$Base("#day").getPrevious().event("click", function(){		
		that=$Base(this).getNext(true)[0];
		var month=$Base("#month").getPrevious().innerHTML().isEmpty();
		var year=$Base("#year").getPrevious().innerHTML().isEmpty();
		if(month=="月")month="1";
		if(year=="年")year="1970";
		var nowday=(month==1||month==3||month==5||month==7||month==8||month==10||month==12) ? 31:month==2 ? 28: 30;	
		if(month==2&&((year%4==0&&year%100!=0)||(year%100==0&&year%400==0))){
			nowday= 29;			
		}	
		var day=that.children.length;
		if(day-1<nowday){
			$Base(that).myCreateNode("li",day,nowday-day,function(op,int){
				addEvent(op,"click",clickSelect);
				 op.innerHTML=int.toString();
			});
		}else if(day-1!=nowday){
			$Base(that).myRemoveNode(nowday,day-nowday-1,function(node){
				removeEvent(node,"click",clickSelect);
			});
		}
	});
	//月份切换时 回位day
	$Base(".cus-sel-opt-ctn li").event("click", clickSelect);	
	$Base("#month li").removeEvent("click", clickSelect).event("click", function(){		
		if(this.innerHTML!=$Base(this.parentNode).getPrevious().innerHTML()){
			$Base("#day").getPrevious().innerHTML("日");		
		}
		clickSelect.call(this);
	});

	$Base("#province").event("click", function(evt){	
		if(this.innerHTML!=$Base(this).getParent().getPrevious().innerHTML()){
			var arr=City[	getEvtObj(evt).id];		
			var node=document.getElementById("city");
			var mynodes=node.children;
			var n=mynodes.length;
			for ( var i = 0; i < n; i++) {
				removeEvent(mynodes[0], "click", clickSelect);
				node.removeChild(mynodes[0]);
			}
			for ( var i = 0; i < arr.length; i++) {
				var newEL=document.createElement("li");
				newEL.innerHTML=arr[i];
				node.appendChild(newEL);
				addEvent(newEL, "click", clickSelect);
			}
			$Base(node).getPrevious().innerHTML(arr[0]);		
		}
	});
	
	$Base("#register_previous").event("click", function(){
		var that=this;
		if(that.value=="完善信息"){
			window.location.href=BASE_PATH+"/user/user_dails";
			return;
		}else if(that.value=="重新注册"){
			window.location.href=BASE_PATH+"/application";
			return;
		}
		 if($Base(".user_base_dails").css("display")=="none"){
			
				var temp=$Base(".user_base_datum").show().active({
					step:10,
					t:30,
					async:{
						h:550
					},fn:function(){
						$Base("#register_next").value("下一步");
					}
				});
		}else if($Base(".mini_user_base_datum").css("display")=="none"){
			$Base(".user_base_dails").css({"display":"none"});
			var temp=$Base(".mini_user_base_datum").show().active({
				step:10,
				t:30,
				async:{
					h:550
				},fn:function(){
					$Base("#register_next").value("下一步");		
				}
			});
		}else if($Base(".mini_rules").css("display")=="none"){
			 $Base(".mini_user_base_datum").css({"display":"none"});
			 $Base(".user_base_dails").css({"display":"none"});
			var temp=$Base(".mini_rules").show().active({
				step:10,
				t:30,
				async:{
					h:550
				},fn:function(){
					$Base(that).hide();
					$Base("#register_next").value("确认");
				}
			});
		}
	});
	$Base("#register_next").event("click", function(){
		var that=this;
		
		if(that.value=="返回首页"){
			window.location.href=BASE_PATH;
			return;
		}
		if($Base(".mini_rules").css("display")=="block"){
			$Base(".mini_user_base_datum").css({"display":"block"});
			$Base("#register_two b").css({"background":"#FF4700"});
			$Base("#register_two").css({"color":"#FF4700"});
			var temp=$Base(".mini_rules").active({
				step:10,
				t:30,
				async:{
					h:0
				},fn:function(){
					temp.hide();
					$Base("#register_previous").show();
					that.value="下一步";
				}
			});
		}else if($Base(".mini_user_base_datum").css("display")=="block"){
			
			if($Base("#user_account").get(0,true).alt!="true"){
				$Base("#user_account").get(0,true).focus();
				return;
			}else if($Base("#user_email").get(0,true).alt!="true"){
				$Base("#user_email").get(0,true).focus();
				return;
			}else if($Base("#user_possword").get(0,true).alt!="true"){
				$Base("#user_possword").get(0,true).focus();
				return;
			}else if($Base("#user_possword_fixwrod").get(0,true).alt!="true"){
				$Base("#user_possword_fixwrod").get(0,true).focus();
				return;
			}else if($Base("#user_code").get(0,true).alt!="true"){
				$Base("#user_code").get(0,true).focus();
				return;
			}
			$Base(".user_base_dails").css({"display":"block"});
			$Base("#register_three b").css({"background":"#FF4700"});
			$Base("#register_three").css({"color":"#FF4700"});
			var temp=$Base(".mini_user_base_datum").active({
				step:10,
				t:30,
				async:{
					h:0
				},fn:function(){
					temp.hide();
					that.value="注册";
				}
			});
		}else if($Base(".user_base_dails").css("display")=="block"){
			$Base(".load_register").css({"display":"block"});
			$Base("#register_four b").css({"background":"#FF4700"});
			$Base("#register_four").css({"color":"#FF4700"});
			$Base("#register_previous").hide();
			var temp=$Base(".user_base_dails").active({
				step:10,
				t:30,
				async:{
					h:0
				},fn:function(){
					temp.hide();
				}
			});
			var province=$Base("#user_province").innerHTML()+","+$Base("#user_city").innerHTML();
			stateAjax({
				url : BASE_PATH+"/user/check_register",
				method : 'post',
				async : true,
				message : {
					code :document.getElementById("user_code").value.toUpperCase(),
					token :$Base("#registerToken").innerHTML(),
					'user.name' :document.getElementById("user_account").value,		
					'user.password' : document.getElementById("user_possword").value,
					'user.email': document.getElementById("user_email").value,
					'ubm.addr' :province,
					'ubm.name':document.getElementById("noc_name").value,		
					'ubm.bloodGroup' : $Base("#user_blood_group").innerHTML(),		
					'ubm.sex' :$Base("#user_sex").innerHTML(),
					'ubm.birthday':$Base("#user_year").innerHTML()+"-"+$Base("#user_month").innerHTML()+"-"+$Base("#user_day").innerHTML(),	
					'ubm.info':$Base("#user_info").innerHTML()
				},
				run : function(text) {
					if (text.isEmpty() == "register is ok"){
						$Base("#register_next").value("返回首页");
						$Base("#register_previous").show().value("完善信息");
						$Base("#userMss").innerHTML("您的账号名为"+document.getElementById("user_account").value+ "已经注册成功！");
						
					}else{
						$Base("#statusMss").innerHTML("注册失败");
						$Base("#userMss").innerHTML("很抱歉！服务器繁忙，请稍后再试！");
						$Base("#pointMss").innerHTML("注册网站会员，您将拥有更高的权限和专属特权");	
						$Base(".register_state").css({background:" url('"+BASE_PATH+"/image/no.png') 130px 70px no-repeat"});
						$Base("#register_next").value("返回首页");
						$Base("#register_previous").show().value("重新注册");
					}
					$Base(".register_state").css({"display":"block"});
					var temp=$Base(".load_register").active({
						step:10,
						t:30,
						async:{
							h:0
						},fn:function(){
							temp.hide();
						}
					});
				}
			});

		}
	});
	$Base("#user_code_img").event("click", function(){
		this.src=BASE_PATH+"/user/check_mycode?ran"+Math.random();
		$Base("#user_code").get(0, true).flag=false;
		$Base(this).getNext().setAttribute("alt","true");
	}).get(0, true).src=BASE_PATH+"/user/check_mycode";
	
	$Base(".mini_user_base_datum input").empty();
	$Base("#user_account").event("blur", function(){
		if(!this.flag){
			checkAccount.call(this,this.value);
			this.flag=true;
		}
	}).event("change",function(){
		this.flag=false;
	});
	$Base("#user_possword").getLost( function(){
		$Base("#poss_point_info").show();
		$Base("#poss_point_info2").hide();
	},function(){
		if(this.isOk==undefined){
			this.isOk="请输入需要设置的密码";
		}
		var temp1=$Base("#poss_point_info2");
		if(this.isOk==""){			
			temp1.innerHTML(this.isOk).css({"background":"url('"+BASE_PATH+"/image/pointYes.png') 2px 7px no-repeat"});
			this.alt="true";
		}else{
			temp1.innerHTML(this.isOk).css({"background":"url('"+BASE_PATH+"/image/reg_error.png')  no-repeat"});
			this.alt="false";
		}	
		temp1.show();
		$Base("#poss_point_info").hide();

	}).event("keyup",function(){
		this.isOk=checkPassWord(this.value);		
	});
	$Base("#user_possword_fixwrod").event("blur", function(){
		var str=checkPassWordFix(this.value);
		if(str==""){
			$Base(this).getNext().show().css({"background":"url('"+BASE_PATH+"/image/pointYes.png') 2px 7px no-repeat"}).innerHTML("");
			this.alt="true";
		}else{
			$Base(this).getNext().show().css({"background":"url('"+BASE_PATH+"/image/reg_error.png')  no-repeat"}).innerHTML(str);
			this.alt="false";
		}	
	});
	$Base("#user_email").event("blur", function(){
		if(!this.flag){
			checkEmail.call(this,this.value);
			this.flag=true;
		}
	}).event("change",function(){
		this.flag=false;
	});
	$Base("#user_code").event("blur", function(){
		if(!this.flag){
			checkCode.call(this,this.value);
			this.flag=true;
		}
	}).event("change",function(){
		this.flag=false;
	});
	City={
			beijing:["东城区","西城区","崇文区","宣武区","朝阳区","海淀区","丰台区","门头沟区","房山县","大兴县","顷义县","平谷县","密云县","怀柔县","昌平县","延庆县","通县"],
			tianjing:["和平区","河北区","河东区","河西区","南开区","红桥区","东丽区","西青区","津南区","北辰区","塘沽区","汉沽区","大港区","蓟县","宝坻县","武清县","静海县","宁河县"],
			shanghai:["上海黄浦区","卢湾区","金山区","徐汇区","长宁区","静安区","普陀区","闸北区","虹口区","杨浦区","闵行区","宝山区","嘉定区","浦东新区","松江区","青浦区","南汇区","奉贤区","崇明区"],
			chongqing:["渝中区","大渡口区","江北区","沙坪坝区","九龙坡区","南岸区","北碚区","万盛区","双桥区","渝北区","巴南区","万州区","涪陵区","黔江区","长寿区","江津区","永川区","合川区","南川区","綦江县","潼南县","荣昌县","璧山县","大足县","铜梁县","梁平县","城口县","垫江县","武隆县","丰都县","奉节县","开县","云阳县","忠县","巫溪县","巫山县","石柱土家族自治县","秀山土家族苗族自治县","酉阳土家族苗族自治县","彭水苗族土家族自治县"],
			liaoning:["沈阳市","大连市","鞍山市","抚顺市","本溪市","丹东市","锦州市","葫芦岛市","营口市","盘锦市","阜新市","辽阳市","铁岭市","朝阳市","凌源市","北票市"],
			jiling:["长春市","吉林市","四平市","辽源市","通化市","白山市","延边朝鲜族自治州","白城市","松原市"],
			heilongjiang:["哈尔滨市","齐齐哈尔市","鹤岗市","双鸭山市","鸡西市","大庆市","伊春市","牡丹江市","佳木斯市","台河市","黑河市","绥化市","大兴安岭地区"],
			hebei:["石家庄市","唐山市","秦皇岛市","邯郸市","邢台市","保定市","张家口市","承德市","廊坊市","衡水市","沧州市"],
			shanxi:["太原市","大同市","阳泉市","长治市","晋城市","朔州市","晋中市","运城市","忻州市","临汾市","吕梁地区"],
			henan:["郑州市","开封市","洛阳市","平顶山市","焦作市","鹤壁市","新乡市","安阳市","濮阳市","许昌市","漯河市","三门峡市","南阳市","商丘市","信阳市","周口市","驻马店市","济源市"],
			shandong:["济南市","青岛市","淄博市","枣庄市","东营市","潍坊市","烟台市","威海市","济宁市","泰安市","日照市","莱芜市","临沂市","德州市","聊城市","滨州市","菏泽市"],
			jiangsu:["南京市","徐州市","连云港市","淮安市","宿迁市","盐城市","扬州市","泰州市","南通市","镇江市","常州市","无锡市","苏州市"],
			anhui:["合肥市","芜湖市","蚌埠市","淮南市","马鞍山市","淮北市","铜陵市","安庆市","黄山市","滁州市","阜阳市","宿州市","巢湖市","六安市","亳州市","池州市","宣城市"],
		    jiangxi:["南昌市","萍乡市","九江市","新余市","鹰潭市","赣州市","吉安市","宜春市","抚州市","上饶市"],
			zhejiang:["杭州市","宁波市","温州市","嘉兴市","绍兴市","金华市","衢州市","舟山市","台州市","丽水市"],
			fujian:["福州市","厦门市","三明市","莆田市","泉州市","漳州市","南平市","龙岩市","宁德市"],
			guandong:["广州市","深圳市","珠海市","汕头市","韶关市","惠州市","河源市","梅州市","汕尾市","东莞市","中山市","江门市","佛山市","阳江市","湛江市","茂名市","肇庆市","清远市","潮州市","揭阳市","云浮市"],
			hainan:["海口市","三亚市","其他"],
			guizhou:["贵阳市","六盘水市","遵义市","安顺市","铜仁地区","毕节地区","黔西南布依族苗族自治州","黔东南南苗族侗族自治州","黔南布依族苗族自治州"],
			yunnan:["昆明市","玉溪市","保山市","昭通市","思茅地区","临沧地区","丽江地区","文山壮族苗族自治州","红河哈尼族彝族自治州","西双版纳傣族自治州","楚雄彝族自治州","大理白族自治州","德宏傣族景颇族自治州","怒江傈僳族自治州","迪庆藏族自治州"],
			sichuan:["成都市","自贡市","攀枝花市","泸州市","德阳市","绵阳市","广元市","遂宁市","内江市","乐山市","南充市","宜宾市","广安市","达州市","眉山市","雅安市","巴中市","资阳市","阿坝藏族羌族自治州","甘孜藏族自治州","凉山彝族自治州"],
			hunan:["长沙市","株洲市","湘潭市","衡阳市","邵阳市","岳阳市","常德市","张家界市","益阳市","郴州市","永市","怀化市","娄底市","湘西土家族苗族自治州"],
			hubei:["武汉市","黄石市","襄樊市","十堰市","荆州市","宜昌市","荆门市","鄂州市","孝感市","黄冈市","咸宁市","随州市","恩施土家族苗族自治州","仙桃市","天门市","潜江市","神农架林区"],
			shanxi2:["西安市","铜川市","宝鸡市","咸阳市","渭南市","延安市","汉中市","榆林市","安康市","商洛市"],
			ganshu:["兰州市","金昌市","白银市","天水市","嘉峪关市","武威市","张掖市","平凉市","酒泉市","庆阳市","定西地区","陇南地区","甘南藏族自治州","临夏回族自治州"],
			qinghai:["西宁市","海东地区","海北藏族自治州","黄南藏族自治州","海南藏族自治州","果洛藏族自治州","玉树藏族自治州","海西蒙古族藏族自治州"],
			neimenggu:["呼和浩特市","包头市","乌海市","赤峰市","鄂尔多斯市","呼伦贝尔市","乌兰察布盟","锡林郭勒盟","巴彦淖尔盟","阿拉善盟","兴安盟"],
			xizang:["拉萨市","昌都地区","山南地区","日喀则地区","阿里地区","林芝地区"],
			xingjiang:["乌鲁木齐市","克拉玛依市","吐鲁番地区","哈密地区","和田地区","阿克苏地区","喀什地区","克孜勒苏柯尔克孜自治州","巴音郭楞州","昌吉州","博尔塔拉州","伊犁哈萨克自治州","塔城地区","阿勒泰州","石河子市","阿拉尔市","图木舒克市","五家渠市"],
			guangxi:["南宁市","柳州市","桂林市","梧州市","北海市","防城港市","钦州市","贵港市","玉林市","百色市","贺州市","河池市","来宾市","崇左市"],
			ningxia:["银川市","石嘴山市","吴忠市","固原市"],
			xianggang:["香港"],
			aomen:["澳门"],
		 taiwang:["台湾"]
	};
}
function checkAccount(value){
	var that=this;
	var temp=$Base(this).getNext().show().css({"background":"url('"+BASE_PATH+"/image/loading2.gif') 2px 7px no-repeat"}).innerHTML("");
	var str= value.length>13? Point.USER_LENGTH_ERROR:
							  new RegExp("([^0-9A-Za-z]+)", "igm").test(value) ? Point.USER_UNLAWFUL_ERROR: 
							  value.replace(new RegExp('\\s*', "img"), "") == "" ? Point.USER_EMPTY_ERROR: 
							  value.length < 8 ? Point.USER_NUMBER_ERROR: 
							  new RegExp("([A-Za-z]+[0-9]+)|([0-9]+[A-Za-z])", "igm").test(value) ? "" : 
							  Point.USER_ACCOUNT_ERROR;
	if(str!=""){
		temp.show().css({"background":"url('"+BASE_PATH+"/image/reg_error.png')  no-repeat"}).innerHTML(str).setAttribute("alt","false");
		return;
	}
	stateAjax({
		url : BASE_PATH+"/user/check_account",
		method : 'get',
		async : true,
		message : {name: value},
		run : function(text) {
			if (text.isEmpty() == "username is exsit") {
				str = Point.USER_ACCOUNT_EXEISTS;
			}
			if(str==""){
				temp.show().css({"background":"url('"+BASE_PATH+"/image/pointYes.png') 2px 7px no-repeat"}).innerHTML("");
				that.alt="true";
			}else{
				that.alt="false";
				temp.show().css({"background":"url('"+BASE_PATH+"/image/reg_error.png')  no-repeat"}).innerHTML(str).setAttribute("alt","false");
			}	
		}
	});
	
}
function checkPassWord(value){
	var obj={};
	obj.num=value.length>=8&&value.length<=20;
	obj.grade=grade(value);
	obj.format=value.length > 0 && !/\s/.test(value);
	var flag="";
	if(obj.num){
		$Base("#number_ok").innerHTML("●").css({"color":"#00a000"});
		
	}else {
		$Base("#number_ok").innerHTML("○").css({"color":"#666666"});
		flag=Point.PASS_NUMBER_ERROR;
	}
	if(obj.format){
		$Base("#format_ok").innerHTML("●").css({"color":"#00a000"});
	}else {
		$Base("#format_ok").innerHTML("○").css({"color":"#666666"});
		flag=Point.PASS_FORMAT_ERROR;
	}
	if(obj.grade==3){
		$Base(".poss_point_info b").css({"background":"#00A000"});
		$Base(".poss_point_info em").innerHTML("高");
	}else if(obj.grade==2){
		$Base("#grade_one").css({"background":"#FF6600"});
		$Base("#grade_two").css({"background":"#FF6600"});
		$Base("#grade_three").css({"background":"#cccccc"});
		$Base(".poss_point_info em").innerHTML("中");
	}else if(obj.grade==1){
		$Base("#grade_one").css({"background":"#800000"});
		$Base("#grade_two").css({"background":"#cccccc"});
		$Base("#grade_three").css({"background":"#cccccc"});
		$Base(".poss_point_info em").innerHTML("低");
	}else {
		flag=Point.PASS_EMPTY_ERROR;
		$Base("#grade_one").css({"background":"#cccccc"});
		$Base("#grade_two").css({"background":"#cccccc"});
		$Base("#grade_three").css({"background":"#cccccc"});
		$Base(".poss_point_info em").innerHTML("");
	}
	return flag;
}
function checkPassWordFix(value){
	return  value == "" ? Point.PASS_EMPTY_ERROR :value !=document.getElementById("user_possword").value ? Point.PASS_DIFFER_ERROR : "";
}
function grade(value){
	var value_length = value.length;
	var code_length = 0;
	if (/[\d]/.test(value)) {
		code_length++;
	}
	
	if (/[a-z]/.test(value)) {
		code_length++;
	}
	
	if (/[A-Z]/.test(value)) {
		code_length++;
	}
	
	if (/[^\w]/.test(value)) {
		code_length++;
	}
	if (value_length >= 10 && code_length >= 3) {
		return 3;
	} else if (value_length >= 8 && code_length >= 2) {
		return 2;
	} else if (value_length >= 1) {
		return 1;
	} else {
		return 0;
	}
}

function checkEmail(value){
	var that=this;
	var temp=$Base(this).getNext().show().css({"background":"url('"+BASE_PATH+"/image/loading2.gif') 2px 7px no-repeat"}).innerHTML("");
	var str=value == "" ? Point.USER_EMAIL_NULL: 
								!new RegExp("\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*").test(value)? Point.USER_EMAIL_ERROR:"";
	if(str!=""){
		temp.show().css({"background":"url('"+BASE_PATH+"/image/reg_error.png')  no-repeat"}).innerHTML(str);
		that.alt="false";
		return;
	}
	stateAjax({
		url : BASE_PATH+"/user/check_email",
		method : 'get',
		async : true,
		message : {email: value},
		run : function(text) {
			if (text.isEmpty() == "email is exsit") {
				str = Point.USER_EMAIL_EXEISTS;
			}
			if(str==""){
				temp.show().css({"background":"url('"+BASE_PATH+"/image/pointYes.png') 2px 7px no-repeat"}).innerHTML("");
				that.alt="true";
			}else{
				temp.show().css({"background":"url('"+BASE_PATH+"/image/reg_error.png')  no-repeat"}).innerHTML(str);
				that.alt="false";
			}	
		}
	});
}
function checkCode(value) {
	var that=this;
	var temp=$Base(this).getNext().getNext().show().css({"background":"url('"+BASE_PATH+"/image/loading2.gif') 2px 7px no-repeat"}).innerHTML("");
	var str=value==""? Point.CODE_POINT_INPUT : "";
	if(str!=""){
		temp.show().css({"background":"url('"+BASE_PATH+"/image/reg_error.png')  no-repeat"}).innerHTML(str).setAttribute("alt","false");
		that.alt="false";
		return;
	}
		stateAjax({
			url : BASE_PATH+"/user/check_code",
			method : 'get',
			async : true,
			message : {
				code: value.toUpperCase()
			},
			run : function(text) {
				if (text.isEmpty() != "code is yes") {
					str = Point.CODE_ERROR;
				}
				if(str==""){
					temp.show().css({"background":"url('"+BASE_PATH+"/image/pointYes.png') 2px 7px no-repeat"}).innerHTML("");
					that.alt="true";
				}else{
					temp.show().css({"background":"url('"+BASE_PATH+"/image/reg_error.png')  no-repeat"}).innerHTML(str);
					that.alt="false";
				}	
			}
		});
};
Point = {
		PASS_POINT_INPUT : "请输入你的密码",
		PASS_EMPTY_ERROR : '密码不能为空',
		PASS_NUMBER_ERROR : "密码不允许少于8个字",
		PASS_DIFFER_ERROR : "前后两次密码不一致",
		PASS_FORMAT_ERROR:"密码必须是少于16位的字母和数字组成",
		
		USER_EMPTY_ERROR : '账号不能为空',
		USER_NUMBER_ERROR : "账号不允许少于8个字",
		USER_UNLAWFUL_ERROR : '账号含有非法字符',
		USER_POINT_INPUT : "请输入你的账号",
		USER_ACCOUNT_ERROR : "必须由字母和数字组成",
		USER_ACCOUNT_EXEISTS : "用户已存在！",
		USER_LENGTH_ERROR:"请输入小于12个字的用户名",

		CODE_POINT_INPUT : "请输入验证码",
		CODE_ERROR : "验证码输入有误",
			
		SYSTEM_LOGIN_NO:"很抱歉！服务器繁忙，请稍后再试！",
		SYSTEM_LOGIN_OK: "可至账户设置中完善修改账户信息，完善后可用于登录，找回密码等！",
			
		USER_EMAIL_NULL:"电子邮箱不能为空",
		USER_EMAIL_ERROR:"您输入邮箱不合法",
		USER_EMAIL_INPUT : "请输入你邮箱地址",
		USER_EMAIL_EXEISTS : "该邮箱已被注册"
	};
function clickSelect() {
	$Base(this.parentNode).getPrevious().innerHTML(this.innerHTML);
	$Base(this.parentNode).hide();
}












