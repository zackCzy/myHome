/**
 * 
 */
function MiniMusicBox(){
	var _that=this;
	this.playType=2;// 1代表 viki列表，2代表cookie列表
	this.playModel=1; //1代表循环播放 //2代表单曲轮播 //3代表 随机播放//4代表全列表循播
	this.volume=1;
	this.position=0;
	this.musicListHandle=new MusicPlayList();
	this.cookieListHandle=new MusicPlayList();
	try {
		_that.playBox=document.getElementById("Externa");
		if(_that.playBox==null){
			_that.playBox=document.getElementById("Externa1");
		}
	} catch (e) {
		_that.playBox=document.getElementById("Externa1");
		
	}
	this.setState=function(state,index,length){
		var _index=index;//state 1代表next 2代表 prev
		switch (this.playModel) {
			case 1:
				_index=state==1 ? ((index+1 >=length) ? 0 : ++index):((index-1<0) ? length-1 :--index);
				break;
			case 2:
				_index=index;
				break;
			case 3:
				_index=Math.floor(Math.random()*(length-1));
				break;	
			default:
				_index=state==1 ? ((index+1 >=length) ? 0 : ++index):((index-1<0) ? length-1 :--index);
				break;
		}
		return _index;
	};
}
MiniMusicBox.prototype={
	setPlayModel:function(playModel){
		this.playModel=playModel;
	},
	getPlayModel:function(){
		return this.playModel;
	},
	setPlayType:function(playType){
		this.playType=playType;
	},
	getPlayType:function(){
		return this.playType;
	},
	setIndex:function(index){
		if(this.playType==1){
			this.musicListHandle.setCurrentMusic(index);
		}else if(this.playType==2){
			this.cookieListHandle.setCurrentMusic(index);
		}
	},
	addVikiMusic:function(musicObj){
		this.musicListHandle.addMusic(musicObj);
	},
	addCookieMusic:function(musicObj){
		this.cookieListHandle.addMusic(musicObj);
	},
	removeVikiMusic:function(musicObj){
		this.musicListHandle.removeMusic(musicObj);
	},
	removeCookieMusic:function(musicObj){
		this.cookieListHandle.removeMusic(musicObj);
	},
	getPosition:function(){
		return this.position;
	},
	setPosition:function(num){
		this.position=num;
		this.playBox.position(num);
	},
	getVolume:function(num){
		return this.volume;
	},
	setVolume:function(num){
		this.volume=num;
		this.playBox.volume(num);
	},
	setAddMusicFn:function(addMusicFn){
		this.addMusicFn=addMusicFn;
	},
	addMusic:function(){
		this.addMusicFn();
	},
	getVikiMusicLength:function(){
		return this.musicListHandle.length();
	},
	getCookieMusicLength:function(){
		return this.cookieListHandle.length();
	},
	play:function(url,fn){
		this.playBox.playMusic(url);
		if(typeof fn =='function'){
			fn.call(this);
		}
	},
	pause:function (fn){
		this.playBox.pauseMusic();
		if(typeof fn =='function'){
			fn.call(this);
		}
	},
	previous:function (){
		var index;
		var musicObj=null;
		if(this.playType==1){
			index=this.musicListHandle.getCurrentIndex();
			var _index=this.setState(2,index,this.musicListHandle.length());
			this.musicListHandle.setCurrentMusic(_index);
			musicObj=this.musicListHandle.getCurrentMusic();
		}else{
			index=this.cookieListHandle.getCurrentIndex();
			var _index=this.setState(2,index,this.cookieListHandle.length());
			this.cookieListHandle.setCurrentMusic(_index);
			musicObj=this.cookieListHandle.getCurrentMusic();
		}
		return musicObj;
	},
	next:function (){
		var index;
		var musicObj=null;
		if(this.playType==1){
			index=this.musicListHandle.getCurrentIndex();
			var _index=this.setState(1,index,this.musicListHandle.length());
			this.musicListHandle.setCurrentMusic(_index);
			musicObj=this.musicListHandle.getCurrentMusic();
		}else{
			index=this.cookieListHandle.getCurrentIndex();
			var _index=this.setState(1,index,this.cookieListHandle.length());
			this.cookieListHandle.setCurrentMusic(_index);
			musicObj=this.cookieListHandle.getCurrentMusic();
		}
		return musicObj;
	}
};
function MusicPlayList(){
	this.List=[];
	this.index=0;
	return this;
}
MusicPlayList.prototype={
	addMusic:function(musicObj){
		this.List.push(musicObj);
	},
	removeMusic:function(musicObj){
		var tempArr=[];
		for ( var int = 0; int < this.List.length; int++) {
			if(this.List[int].id!=musicObj.id){
				tempArr.push(this.List[int]);
			}
		}
		this.List=tempArr;
	},
	getCurrentMusic:function(){
		return this.List[this.index];
	},
	setCurrentMusic:function(_index){
		this.index=_index;
	},
	getCurrentIndex:function(){
		return this.index;
	},
	length:function(){
		return this.List.length;
	}
};