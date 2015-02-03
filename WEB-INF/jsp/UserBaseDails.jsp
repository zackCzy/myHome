<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
  <%@taglib  uri="/struts-tags" prefix="s"%>
<div class="detailsMess" >
	<h2>详细资料</h2>
	<!-- 体型 -->
	<div class="messArea">
		<div class="messAreaLeft">体型</div>
		<div class="messAreaRight">
			<div class="cus-sel-opt-panel">
				<span id="figure">
					<s:property value="#UserBaseDatum.figure" default="未知"/>
				</span>
				<ul class="cus-sel-opt-ctn">
					<li>未知</li>
					<li>苗条</li>
					<li>丰满</li>
					<li>中等身材</li>
					<li>高大</li>
					<li>小巧</li>
					<li>运动型</li>
					<li>健美</li>
				</ul>
			</div>
		</div>
	</div>
	<!-- 婚姻状况 -->
	<div class="messArea">
		<div class="messAreaLeft">婚姻情况</div>
		<div class="messAreaRight">
			<div class="cus-sel-opt-panel">
				<span id="maritalStatus">
					<s:property value="#UserBaseDatum.maritalStatus" default="未知"/>
				</span>
				<ul class="cus-sel-opt-ctn">
					<li>未知</li>
					<li>单身</li>
					<li>恋爱</li>
					<li>已婚</li>
					<li>离异</li>
				</ul>
			</div>
		</div>
	</div>
	<!-- 个人习惯 -->
	<div class="messArea">
		<div class="messAreaLeft">个人习惯</div>
		<div class="messAreaRight">
			<div class="cus-sel-opt-panel">
				<span id="smokHabits">
					<s:property value="#UserBaseDatum.smokHabits" default="抽烟习惯"/>
				</span>
				<ul class="cus-sel-opt-ctn">
					<li>抽烟习惯</li>
					<li>憎恶抽烟</li>
					<li>从不抽烟</li>
					<li>偶尔抽烟</li>
					<li>已戒烟</li>
				</ul>
			</div>
			<div class="cus-sel-opt-panel">
				<span id="drinkHabits">
					<s:property value="#UserBaseDatum.drinkHabits" default="饮酒习惯"/>
				</span>
				<ul class="cus-sel-opt-ctn">
					<li>饮酒习惯</li>
					<li>憎恶饮酒</li>
					<li>从不饮酒</li>
					<li>偶尔饮酒</li>
					<li>已戒酒</li>
				</ul>
			</div>
			<div class="cus-sel-opt-panel">
				<span id="sleepHabits">
					<s:property value="#UserBaseDatum.sleepHabits" default="睡眠习惯"/>
				</span>
				<ul class="cus-sel-opt-ctn">
					<li>睡眠习惯</li>
					<li>早睡早起</li>
					<li>爱睡懒觉</li>
					<li>经常熬夜</li>
					<li>经常失眠</li>
				</ul>
			</div>
		</div>
	</div>
	<!-- 性格 -->
	<div class="messArea">
		<div class="messAreaLeft">性格</div>
		<div class="messAreaRight">
			<div id=char>
				<s:checkboxlist 
					list="{'温柔','沉默','开朗','稳重'}" 
					value="#UserBaseDatum.personality.split(',')" 
					name="char"			
				/><br>
				<s:checkboxlist 
					list="{'内向','粗犷','成熟','自卑'}" 
					value="#UserBaseDatum.personality.split(',')" 
					name="char"			
				/>
			</div>
		</div>
	</div>

	<div style="width: 100%; height: 60px;"></div>
	<!--教育程度 -->
	<div class="messArea">
		<div class="messAreaLeft">教育程度</div>
		<div class="messAreaRight">
			<div class="cus-sel-opt-panel">
				<span id="education">
					<s:property value="#UserBaseDatum.education" default="未知"/>
				</span>
				<ul class="cus-sel-opt-ctn" style="height:200px;overflow: auto;">
					<li>未知</li>
					<li>初中</li>
					<li>高中</li>
					<li>大学</li>
					<li>硕士</li>
					<li>小学</li>
					<li>中专/技校</li>
					<li>大专</li>
					<li>博士</li>
					<li>其他</li>
				</ul>
			</div>
		</div>
	</div>
				
	<!-- 职业 -->
	<div class="messArea">
		<div class="messAreaLeft">当前职业</div>
		<div class="messAreaRight">
			<div class="cus-sel-opt-panel">
				<span id="voc">	
					<s:property value="#UserBaseDatum.voc" default="未知"/>
				</span>
				<ul class="cus-sel-opt-ctn" style="height:150px;overflow: auto;">
					<li>未知</li>
					<li>白领</li>
					<li>医生</li>
					<li>IT人员</li>
					<li>学生</li>
					<li>服务</li>
					<li>旅游</li>
					<li>自由职业</li>
					<li>政府部门</li>
					<li>建筑</li>
					<li>其他</li>
				</ul>
			</div>
		</div>
	</div>
	<!-- 座右铭 -->
	<div class="messArea">
		<div class="messAreaLeft">座右铭</div>
		<div class="messAreaRight">
			<input type="text" id="Motto" value="<s:property value="#UserBaseDatum.motto"/>" maxlength=80>
		</div>
	</div>
	<div class="messArea" style="margin:10px auto 0;">
			<div class="messAreaLeft" style="width:360px">
				<input type="button" value="保  存"  class="save">
			</div>
			<div class="messAreaRight" style="width:420px;">
				<div class="savePoint"></div>
			</div>
	</div>
</div>
	<script type="text/javascript">
		function getObj(){
			var chra="";
			for ( var i = 0; i < document.forms['myform'].char.length; i++) {
				if(document.forms['myform'].char[i].checked){
					chra+=document.forms['myform'].char[i].value+",";
				}
			}
			return {
				'uda.figure':encodeURIComponent($Base("#figure").innerHTML()),
				'uda.maritalStatus':encodeURIComponent($Base("#maritalStatus").innerHTML()),
				'uda.smokHabits':encodeURIComponent($Base("#smokHabits").innerHTML()),
				'uda.drinkHabits':encodeURIComponent($Base("#drinkHabits").innerHTML()),
				'uda.sleepHabits':encodeURIComponent($Base("#sleepHabits").innerHTML()),
				'uda.voc':encodeURIComponent($Base("#voc").innerHTML()),
				'uda.motto':encodeURIComponent($Base("#Motto").get(0,true).value),
				'uda.personality':encodeURIComponent(chra),
				'uda.education':encodeURIComponent($Base("#education").innerHTML())		
			};
		}
	</script>