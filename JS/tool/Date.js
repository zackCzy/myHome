function SimpleDateFormat(format){
		this.format=format;
		SimpleDateFormat.prototype.myFormat=function(date,method){
			var o = {
					"M+" : date.getMonth() + 1,
					"d+" :date.getDate(), 
					"h+" :date.getHours(), 
					"m+" :date.getMinutes(),
					"s+" :date.getSeconds()
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
				//alert(((flag ? "00":"零零")+ o[k]))
				if (new RegExp("(" + k + ")").test(this.format)){
					//判断占位符个数 以及一占位数且小于10的中文转换
	
					this.format =this.format.replace(
							RegExp.$1, RegExp.$1.length == 1? compare&&o[k].length==1?o[k]:o[k].substr(1)
							: ((flag ? "00":"零零")+ o[k]).substr(o[k].length>2?o[k].length-1:o[k].length));
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