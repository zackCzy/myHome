<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
  <%@taglib uri="/struts-tags"  prefix="s" %>
	<div class="baseMess">
		<h2>基本资料</h2>
		<!-- 性别 -->
		<div class="messArea">
			<div class="messAreaLeft">性别:</div>
			<div class="messAreaRight">
				<div class="sex">	
					<s:radio list="{'男','女','保密'}" name="sex" cssStyle="margin:0 0 0 10px" value="#UserBaseDatum.sex"/>
				</div>
			</div>		
		</div>
		<!-- 生日 -->
		
		<div class="messArea">
			<div class="messAreaLeft">生日:</div>
			<div class="messAreaRight">
				<div class="cus-sel-opt-panel">
					<span><s:property value="#UserBaseDatum.birthday.getYear()+1900" default="年"/></span>
					<ul class="cus-sel-opt-ctn" id="year">
						<li >年</li>
					</ul>
				</div>
				<div class="cus-sel-opt-panel">
					<span><s:property value="#UserBaseDatum.birthday.getMonth()+1" default="月"/></span>
					<ul class="cus-sel-opt-ctn" id="month">
						<li >月</li>
					</ul>
				</div>
				<div class="cus-sel-opt-panel">
					<span><s:property value="#UserBaseDatum.birthday.getDate()" default="日"/></span>
					<ul class="cus-sel-opt-ctn" id="day">
						<li >日</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 血型 -->
		<div class="messArea">
			<div class="messAreaLeft">血型</div>
			<div class="messAreaRight">
				<div class="cus-sel-opt-panel" id="blood">
					<span>
						<s:property value="#UserBaseDatum.bloodGroup" default="未知"/>
					</span>
					<ul class="cus-sel-opt-ctn">
						<li>未知</li>
						<li>A型</li>
						<li>B型</li>
						<li>O型</li>
						<li>AB型</li>
						<li>其他</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 住址 -->
		
		<div class="messArea">
			<div class="messAreaLeft">我在：</div>
			<div class="messAreaRight">
				<div class="cus-sel-opt-panel" >
					<span id="user_province">
						<s:property value="#UserBaseDatum.addr.split(',')[0]" default="请选择"/>
					</span>
					<ul class="cus-sel-opt-ctn" id="province">
						<li id="beijing">北京市</li>
						<li id="tianjing">天津市</li>
						<li id="shanghai">上海市</li>
						<li id="chongqing">重庆市</li>
						<li id="hebei">河北省</li>
						<li id="shanxi">山西省</li>
						<li id="jiling">吉林省</li>
						<li id="liaoning">辽宁省</li>
						<li id="heilongjiang">黑龙江省</li>
						<li id="shanxi2">陕西省</li>
						<li id="ganshu">甘肃省</li>
						<li id="qinghai">青海省</li>
						<li id="shandong">山东省</li>
						<li id="fujian">福建省</li>
						<li id="zhejiang">浙江省</li>
						<li id="hubei">湖北省</li>
						<li id="henan">河南省</li>
						<li id="hunan">湖南省</li>
						<li id="jiangxi">江西省</li>
						<li id="jiangsu">江苏省</li>
						<li id="anhui">安徽省</li>
						<li id="guandong">广东省</li>
						<li id="hainan">海南省</li>
						<li id="sichuan">四川省</li>
						<li id="guizhou">贵州省</li>
						<li id="yunnan">云南省</li>
						<li id="neimenggu">内蒙</li>								
						<li id="ningxia">宁夏</li>
						<li id="guangxi">广西</li>
						<li id="xizang">西藏</li>
						<li id="xizang">新疆</li>
						<li id="taiwang">台湾</li>
						<li id="xianggang">香港</li>
						<li id="aomen">澳门</li>
					</ul>
				</div>
				<div class="cus-sel-opt-panel" >
					<span id="user_city">
						<s:property value="#UserBaseDatum.addr.split(',')[1]" default="请选择"/>
					</span>
					<ul class="cus-sel-opt-ctn" id="city"></ul>
				</div>	
			</div>
		</div>
		<!-- 简介 -->
		<div class="messArea">
			<div class="messAreaLeft">个人简介</div>
			<div class="messAreaRight">
					<textarea rows="9" cols="50" id="infoMess" maxlength=400>${UserBaseDatum.info}</textarea>	
			</div>
		</div>
		
		<div class="messArea" style="margin:170px auto 0;">
			<div class="messAreaLeft" style="width:360px">
				<input type="button" value="保  存"  class="save">
				</div>
			<div class="messAreaRight" style="width:420px ;background:;">
				<div class="savePoint"></div>
			</div>
		</div>
	</div>
	<script type="text/javascript">
		$Base("#year").myCreateNode("li", 1970,new Date().getFullYear()-1970, function(op,int){
			 op.innerHTML=int.toString();
		});
		$Base("#month").myCreateNode("li",1,11,function(op,int){
			 op.innerHTML=int.toString();
		});
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
		$Base("#month li").removeEvent("click", clickSelect).event("click", function(){	
			if(this.innerHTML!=$Base(this.parentNode).getPrevious().innerHTML()){
				$Base("#day").getPrevious().innerHTML("日");		
			}
			clickSelect.call(this);
		});
		function clickSelect() {
			$Base(this.parentNode).getPrevious().innerHTML(this.innerHTML);
			$Base(this.parentNode).hide();
		}
		function getObj(){
			var sexValue;
			for ( var int = 0; int < document.forms['myform'].sex.length; int++) {
				if(document.forms['myform'].sex[int].checked){
					sexValue=document.forms['myform'].sex[int].value;
					break;
				}
			}
			return {
				'ubm.name':"",
				'ubm.sex':sexValue,
				'ubm.birthday':$Base("#year").getPrevious().innerHTML()+"-"+$Base("#month").getPrevious().innerHTML()+"-"+$Base("#day").getPrevious().innerHTML(),
				'ubm.bloodGroup':encodeURIComponent($Base("#blood span").innerHTML()),
				'ubm.addr':encodeURIComponent($Base("#user_province").innerHTML()+","+$Base("#user_city").innerHTML()),
				'ubm.info':encodeURIComponent($Base("#infoMess").get(0, true).value)
			};
		}
		$Base("#province").event("click", function(evt){			
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
	   </script>