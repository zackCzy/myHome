<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@taglib uri="/struts-tags"  prefix="s" %>
<div class="workUnitsMess"> 
			<h2>工作信息</h2>
			<div class="messArea">
				<div class="messAreaLeft">工作单位</div>
				<div class="messAreaRight">
						<input type="text" id="workInfo" value="<s:property value='#UserBaseDatum.workUnit' />" maxlength=50>
				</div>
			</div>	
			<div class="messArea">
				<div class="messAreaLeft">工作时间</div>
				<div class="messAreaRight">
					<div class="cus-sel-opt-panel">
						<span>
							<s:property value="#UserBaseDatum.workTime.getYear()+1900" default="年"/>
						</span>
						<ul class="cus-sel-opt-ctn" id="workYear">
								<li >年</li>
						</ul>
					</div>
					<div class="cus-sel-opt-panel">
						<span>
							<s:property value="#UserBaseDatum.workTime.getMonth()+1" default="月"/>
						</span>
						<ul class="cus-sel-opt-ctn" id="workMonth">
							<li >月</li>
						</ul>
					</div>
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
			$Base("#workYear").myCreateNode("li",1970,new Date().getFullYear()-1970,function(op,int){
				 op.innerHTML=int.toString();
			});
			$Base("#workMonth").myCreateNode("li",1,11,function(op,int){
				 op.innerHTML=int.toString();
			});
			function getObj(){
				return {
					'udm.workUnit':encodeURIComponent($Base("#workInfo").get(0,true).value),				
					'udm.workTime':$Base("#workYear").getPrevious().innerHTML()+"-"+$Base("#workMonth").getPrevious().innerHTML()+"-1"	
				}
			}
		</script>
		