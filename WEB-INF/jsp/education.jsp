<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags"  prefix="s" %>
<div class="educationMess"> 
			<h2>教育背景</h2>
			<div class="messArea">
				<div class="messAreaLeft">学校类型</div>
				<div class="messAreaRight">
					<div class="cus-sel-opt-panel">
							<span id="schoolType">
								<s:property value="#UserBaseDatum.schoolType" default="请选择" />
							</span>
							<ul class="cus-sel-opt-ctn">
									<li>大学</li>
									<li>高中</li>
									<li>初中</li>
									<li>小学</li>
									<li>其他</li>
							</ul>
					</div>
				</div>
			</div>
							
			<div class="messArea">
				<div class="messAreaLeft">学校名称</div>
				<div class="messAreaRight">			
					<input type="text" id="schoolName" value=' <s:property value="#UserBaseDatum.schoolAddress"/>' maxlength=50>
				</div>
			</div>
			<div class="messArea">
				<div class="messAreaLeft">入学年份</div>
				<div class="messAreaRight">
					<div class="cus-sel-opt-panel">
						<span>
							<s:property value="#UserBaseDatum.schoolTime.getYear()+1900" default="请选择"/>
						</span>
						<ul class="cus-sel-opt-ctn" id="stuYear">
							<li >请选择</li>
						</ul>
					</div>
				</div>
			</div>	
			<div class="messArea" style="margin:50px auto 0;">
				<div class="messAreaLeft" style="width:360px">
					<input type="button" value="保  存"  class="save"></div>
				<div class="messAreaRight" style="width:420px ;background:;">
						<div class="savePoint"></div>
				</div>
			</div>							
		</div>
		<script type="text/javascript">
			$Base("#stuYear").myCreateNode("li",1970,new Date().getFullYear()-1970,function(op,int){
				 op.innerHTML=int.toString();
			});
			function getObj(){
				return {
					'udm.schoolType':encodeURIComponent($Base("#schoolType").innerHTML()),
					'udm.schoolAddress':encodeURIComponent($Base("#schoolName").value()),
					'udm.schoolTime':$Base("#stuYear").getPrevious().innerHTML()+"-1"+"-1"		
				};
			}
		</script>