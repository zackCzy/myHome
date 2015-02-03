<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
	<div class="workUnitsMess"> 
		<h2>我在空间</h2>
		<div class="messArea">
			<div class="messAreaLeft">空间昵称</div>
			<div class="messAreaRight">
				<input type="text" id="nickName" value="<s:property value='#UserBaseDatum.nickName' />" maxlength=12>
			</div>
		</div>
		<div class="messArea">
			<div class="messAreaLeft">空间权限</div>
			<div class="messAreaRight">
				<div class="cus-sel-opt-panel">
					<span id="visible">
						<s:property value="#UserBaseDatum.visible ? '设置密码':'所有人'" default="所有人"/>
					</span>
					<ul class="cus-sel-opt-ctn" >
							<li onclick="showPossWord(this,false)">所有人</li>
							<li onclick="showPossWord(this,true)">设置密码</li>
					</ul>
				</div>
			</div>
		</div>
		<script type="text/javascript">
			function showPossWord(evt,flag){
				if(flag){
					$Base("#show_possword_area").show();
				}else {
					$Base("#show_possword_area").hide();
				}
				
			}
		</script>
		
		<div class="messArea" id="show_possword_area" style="display: <s:property value="#UserBaseDatum.visible ? 'block':'none'" default="none"/>;">
			<div class="messAreaLeft">空间密码</div>
			<div class="messAreaRight">
				<input type="text" id="posswordSpace" value="<s:property value='#UserBaseDatum.spacePassWord' />" maxlength=12>
			</div>
		</div>
		<div class="messArea" style="margin:100px auto 0;">
				<div class="messAreaLeft" style="width:360px">
					<input type="button" value="保  存"  class="save">
				</div>
				<div class="messAreaRight" style="width:420px ;background:;">
					<div class="savePoint"></div>
				</div>
			</div>		
	</div>
		<script type="text/javascript">
			function getObj(){
				return {
					'spd.nickName':encodeURIComponent($Base("#nickName").value()),				
					'spd.visible':$Base("#visible").innerHTML()=="所有人"? false:true,
					'spd.spacePassWord':$Base("#visible").innerHTML()=="所有人"?"":$Base("#posswordSpace").value()
				};
			}
		</script>