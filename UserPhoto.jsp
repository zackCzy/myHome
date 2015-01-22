<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Mini_头像上传</title>
		<script type="text/javascript" src="/myHome/JS/tool/base.js"></script>
		<script type="text/javascript" src="/myHome/JS/tool/span.js"></script>
		<script type="text/javascript" src="/myHome/JS/tool/active_Base.js"></script>

	</head>
	<body>
		<img src="/myHome/image/ok.png" onClick="box(this)" style="position: relative;top:100px;left:300px"/>
	</body>
	<script type="text/javascript">
	
	function SimpleDateFormat(format){
		this.format=format;
		SimpleDateFormat.prototype.myFormat=function(date,method){
			var o = {
					"M+" : date.getMonth() + 1,
					"d+" :date.getDate(), 
					"h+" :date.getHours(), 
					"m+" :date.getMinutes(),
					"s+" :date.getSeconds(), 
					"q+" :Math.floor((date.getMonth() + 3) / 3), 
					"S" : date.getMilliseconds()
				};
			var flag=true;
			if(method=="cn"){
				flag=false;
			}
			var year=flag? date.getFullYear()+"" :toCn(date.getFullYear());
			if (/(y+)/.test(this.format))
				this.format = this.format.replace(RegExp.$1, (year).substr(4 - RegExp.$1.length));
			for ( var k in o){
				//判断是否小于十为中文转换准备
				var compare=(!flag&&o[k]<10);
				o[k]=flag?o[k]+"":toCn(o[k]);
		
				if (new RegExp("(" + k + ")").test(this.format)){
					this.format =this.format.replace(
							//判断占位符个数 以及一占位数且小于10的中文转换
							RegExp.$1, RegExp.$1.length == 1? compare&&o[k].length==1 ?o[k]:o[k].substr(1)
							: (flag?"00":"零零"+ o[k]).substr(o[k].length>2?o[k].length-1:o[k].length));
				}
			}
			return this.format;
		};
		function toCn(num){
			num+="";		
			var timeArr=['零','一','二','三','四','五','六','七','八','九','十'];
			var stime="";
			for(var i=0;i<num.length;i++){
				if(i==1&&num.length==2){
					stime+='十';
				}
				if(num.length==1){
					stime+='零';
				}
				stime+=timeArr[num.charAt(i)];
			}
			stime=stime.replace("十零","十");
			return stime;
		}
	}
	//var mat=new SimpleDateFormat('yyyy年M月dd日h时mm分ss秒');
	//alert(mat.myFormat(new Date(),"cn"));
	var mat1=new SimpleDateFormat('yyyy-MM-dd hh:mm:ss');
	alert(mat1.myFormat(new Date(),"en"));
	</script>

</html>