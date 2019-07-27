
//面向对象做轮播图

class BannerPic1{
	//构造函数
	constructor(obj){
		//轮播图的属性
		//默认值：
		let defaultObj = {
			"boxDom":null,//轮播图的容器
			"imgDoms":[],//存放所有图片dom的数组(img标签)
			"width":"167",
			"height":"265",
			"imgs":[],//图片路径数组
// 			"douSize":12,//豆豆的大小
// 			"douSpace" : 10,//豆豆的间距
// 			"douColor" : "greenyellow",//豆豆的颜色
// 			"douHighColor":"red",//高亮颜色
// 			"douIsCircle":true,//是否是圆的
// 			"doudouDirection":"上",//"上"，"右"，"下"，"左"，

			"currOrd":0,//当前显示的图片序号
			"myTimer":null,
			"timeSpace":2000
		}

		//通过循环给轮播图对象的属性赋值
		for(let key in defaultObj){
			if(obj[key]!=undefined){//传入的对象中有，就用传入对象的值
				this[key] = obj[key];
			}else{//传入对象没有，就用默认值
				this[key] = defaultObj[key];
			}
		}
		this.createUI();
		this.autoPlay();
		this.addEvent();
	}

	//创建轮播图的DOM
	createUI(){
		this.boxDom.style.position = "relative";
		//1、创建图片
		for(let i in this.imgs){
			let imgDom = document.createElement("img");
			imgDom.src = this.imgs[i];
			imgDom.style.cssText = 
			   `position: absolute;
				left:0px;
				top:0px;
				width: ${this.width}px;
				height: ${this.height}px;	
				opacity: 1;`;
			if(i=="0"){
				imgDom.style.opacity = "1";
			}
			this.boxDom.appendChild(imgDom);
			this.imgDoms.push(imgDom);
		}
		//2、创建豆豆
		//1)、创建豆豆的容器
		let ulDom = document.createElement("ul");
		ulDom.style.cssText = `
				position: absolute;
				list-style: none;
				right:20px;
				// z-index: 3;`;
			if(this.doudouDirection=="上"){
				ulDom.style.top="20px";			
			}else if(this.doudouDirection=="下"){
				ulDom.style.bottom="20px";
			}
		this.boxDom.appendChild(ulDom);
		//2)、创建li（豆豆）
		for(let i in this.imgs){
			let liDom = document.createElement("li");
			liDom.style.cssText=`float:left;
				width:${this.douSize}px;
				height: ${this.douSize}px;
				margin-right: ${this.douSpace}px;
				background-color: ${this.douColor};`;

			if(this.douIsCircle){
				liDom.style.borderRadius = "50%";
			}
			if(i=="0"){
				liDom.style.backgroundColor=this.douHighColor;
			}
			ulDom.appendChild(liDom);
		}
	}
// 
	autoPlay(){
		let liDoms = this.boxDom.lastElementChild.children;
		if(this.myTimer!=null){
			return;
		}
		this.myTimer = setInterval(()=>{
			//一、数据处理
			//淡出的图片序号
			let outOrd = this.currOrd;		
			this.currOrd++;

			if(this.currOrd>this.imgs.length-1){
				this.currOrd = 0;
			}

			//二、改变外观

			fadeInOut(this.imgDoms[this.currOrd],this.imgDoms[outOrd],1000);
			//变豆豆
			for(let i=0;i<liDoms.length;i++){
				liDoms[i].style.backgroundColor = this.douColor;
			}
			liDoms[this.currOrd].style.backgroundColor = this.douHighColor;		
		},this.timeSpace);
	}

	stopPlay(){
		clearInterval(this.myTimer);
		this.myTimer = null;
	}

	goImg(ord){
		let liDoms = this.boxDom.lastElementChild.children;
		
		//一、数据处理
		//淡出的图片序号
		let outOrd = this.currOrd;

		this.currOrd = ord;

		if(this.currOrd>this.imgs.length-1){
			this.currOrd = 0;
		}

		//二、改变外观

		fadeInOut(this.imgDoms[this.currOrd],this.imgDoms[outOrd],1000);
		//变豆豆
		for(let i=0;i<liDoms.length;i++){
			liDoms[i].style.backgroundColor = this.douColor;
		}
		liDoms[this.currOrd].style.backgroundColor = this.douHighColor;
	}

	addEvent(){
		this.boxDom.onmouseenter =  ()=> {
			this.stopPlay();
		}

		this.boxDom.onmouseleave = ()=>{
			this.autoPlay();
		}

		let liDoms = this.boxDom.lastElementChild.children;
		for(let i=0;i<liDoms.length;i++){
			liDoms[i].onclick = ()=> {
				this.goImg(i);
			}
		}

	}

}