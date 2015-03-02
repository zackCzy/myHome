<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String basePath = request.getContextPath();
	String path=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+basePath; 
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@include file="../meta/indexMeta.jsp"%>
		<meta http-equiv="Cache-Control" content="max-age=7200"/>
		<link rel="stylesheet" type="text/css"
			href="<%=path%>/CSS/public/main.css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/CSS/register.css" />
		<script type="text/javascript">
			BASE_PATH="<%=path %>";
		</script>
		<script type="text/javascript" src="<%=path%>/JS/tool/span.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/tool/base.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/tool/plug_Base.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/tool/active_Base.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/tool/Ajax.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/register.js"></script>
		<title>Viki_注册</title>
	</head>
	<body>
		<div class="register_head">
			<a href="<%=path%>" target="_parent"><img alt="" src="<%=path%>/image/vikilogo.png" id="logo"> 
			</a>
			<h1>
				账号注册
			</h1>
		</div>
		<div style="margin: 30px auto; width: 1000px;">
			
			<div class="register_box">
				<div class="register_nav">
					<ul>
						<li id="register_one">
							<b>1</b>确认用户协议
						</li>
						<li id="register_two">
							<b>2</b>设置登录账号
						</li>
						<li id="register_three">
							<b>3</b>填写基本信息
						</li>
						<li id="register_four">
							<b>4</b>注册账号成功
						</li>
					</ul>
				</div>
				<div style="margin:14px 0;height: 547px; width: 3px; float: left;border-right: 2px dashed #CCC;">

				</div>
				<div class="mini_register_rm">
					<div class="mini_rules">
						<br>
						<h3 style="text-align: center;">《 VIKI服务使用协议 》</h3>	<br>
						<p>
						&nbsp;&nbsp;本产品仅用户学习交流只用，用户必须同意不使用本产品进行非法，获利活动。<br/>对于VIKI向用户提供的下列产品或者服务的质量缺陷本身及其引发的任何损失，作者无需承担任何责任。
						</p>
					</div>
					
					
					<div class="mini_user_base_datum" >
						<span style="height:0;width:0;display: none;" id="registerToken">${token}</span>
						<table style="margin:70px 100px;" width=350px height=300px>
							<tr>
								<td style="text-align: right;">登录账号<b>*</b></td>
								<td style="position: relative;">
									<input type="text" id="user_account"/>
									<div class="point_info"></div>
								</td>
							</tr>
							<tr>
								<td style="text-align: right;">电子邮箱<b>*</b></td>
								<td style="position: relative;">
									<input type="text" id="user_email"/>
									<div class="point_info"></div>
								</td>
							</tr>
							<tr>
								<td style="text-align: right;">密码<b>*</b></td>
								<td style="position: relative;">
									<input type="text" id="user_possword"/>
									<div class="poss_point_info" id="poss_point_info">
										<span>安全级别</span><b id="grade_one"></b><b id="grade_two"></b><b id="grade_three"></b><em></em><br>
										<strong style="width:16px;height:16px;margin:5px 0 0 15px;color:#666;" id="number_ok">○</strong><strong style="margin-top:5px;">8-20个字符</strong><br>
										<strong style="width:16px;height:16px;margin:5px 0 0 15px;color:#666;" id="format_ok">○</strong><strong style="margin-top:5px;">包含字母和数字组成和非空字符</strong>
									</div>
									<div class="point_info" id="poss_point_info2"></div>
								</td>
							</tr>
							<tr>
								<td style="text-align: right;">确认密码<b>*</b></td>
								<td  style="position: relative;">
									<input type="text" id="user_possword_fixwrod"/>
									<div class="point_info"></div>
								</td>
							</tr>
							<tr>
								<td style="text-align: right;">验证码<b>*</b></td>
								<td  style="position: relative;"width=80px>
									<input type="text" style="width:80px;float: left;" id="user_code"/>
									<img  width=100px height=35px style="cursor:pointer;margin:-5px 0 0 15px;background: #ff0000;display: block;float: left;" src=""  alt="点击刷新" id="user_code_img"/>
									<div class="point_info"></div>
								</td>
							</tr>
						</table>
					</div>
					
					<div class="user_base_dails">
						<div class="row_box">
							<span>我是:</span>
							<div class="cus-sel-opt-panel" >
								<span id="user_sex">
									保密
								</span>
								<ul class="cus-sel-opt-ctn">
									<li>男</li>
									<li>女</li>
									<li>保密</li>
								</ul>
							</div>
						</div>
						<div class="row_box">
							<span >血型:</span>
							<div class="cus-sel-opt-panel" >
								<span id="user_blood_group">
									A型
								</span>
								<ul class="cus-sel-opt-ctn">
									<li>A型</li>
									<li>B型</li>
									<li>AB型</li>
									<li>O型</li>
									<li>其它</li>
								</ul>
							</div>
						</div>
						<div class="row_box">
							<span >昵称:</span>
							<input type="text" id="noc_name" maxLength="12">
						</div>
						<div class="row_box">
							<span>我在:</span>
							<div class="cus-sel-opt-panel" >
								<span id="user_province">
									请选择
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
									请选择
								</span>
								<ul class="cus-sel-opt-ctn" id="city">

								</ul>
							</div>							
						</div>
						
						
						<div class="row_box">
							<span>我的生日:</span>
							<div class="cus-sel-opt-panel" >
								<span id="user_year">
									年
								</span>
								<ul class="cus-sel-opt-ctn"  id="year">
									<li >年</li>
								</ul>
							</div>
							<div class="cus-sel-opt-panel" >
								<span id="user_month">月						
								</span>
								<ul class="cus-sel-opt-ctn" id="month">
									<li >月</li>
								</ul>
							</div>
							<div class="cus-sel-opt-panel" >
								<span id="user_day">
									日
								</span>
								<ul class="cus-sel-opt-ctn" id="day">
									<li >日</li>
								</ul>
							</div>				
						</div>
						<div class="row_box" style="height:153px">
							<span>个人说明:</span>
							<textarea maxLength=250 id="user_info" rows="5" cols="35" style="margin:12px 0 0 -30px;padding:10px;resize:none;width:230px height:150px;border:1px solid #DCDCDC"></textarea>
						</div>
					</div>
					
					<div class="load_register">
						<h1>正在注册请稍等……</h1>
					</div>
					<div class="register_state">
						<p style="font-size:28px;margin:135px 0 0 270px;" id="statusMss">恭喜，您注册成功！</p>
						<p style="font-size:20px;margin:60px  0 0 160px;"  id="userMss"><p>
						<p style="font-size:16px;margin:30px 0 0 160px;" id="pointMss">请尽快登陆邮箱激活账号，否则账号将处于冻结状态。<p>
					</div>
				</div>
				<div class="register_bt" >			
					<input type="button" value="确认" id="register_next"/>
					<input type="button" value="上一步" id="register_previous" style="display: none;"/>
				</div>
			</div>
		</div>
	</body>
</html>