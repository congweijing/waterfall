window.onload=function(){
    //waterfall(container,box);	/*box在main中呈瀑布排列*/
    waterfall("container","box");
    /*假装这是JSON文件*/
    var dataInt={'data':[{'src':'images/1.jpg'},{'src':'images/2.jpg'},{'src':'images/3.jpg'},{'src':'images/4.jpg'}]};
    /*当滚动屏幕时执行加载页面函数*/
    window.onscroll=function(){
	    if(checkLastPic()){
	    	var container=document.getElementById("container");
	    	for(var i=0;i<dataInt.data.length;i++){
	    		var newBox=document.createElement("div");
	    		newBox.className="box";
	    		container.appendChild(newBox);
	    		var newPic=document.createElement("div");
	    		newPic.className="pic";
	    		newBox.appendChild(newPic);
	    		var newImg=document.createElement("img");
	    		newImg.src=dataInt.data[i].src;
	    		newPic.appendChild(newImg);
	    	}
	    	waterfall("container","box");
	    }
	}

    
}
/*main是父盒子，box是每个图片外面的框*/
function waterfall(main,box){
	/*计算页面的宽度算出可以摆放几列图片*/	
	var container=document.getElementById(main);//获取父盒子节点
	var screenWidth=document.body.offsetWidth;//获得屏幕尺寸
	var boxArr=container.getElementsByClassName(box);//获取每一个box
	var boxWidth=boxArr[0].offsetWidth;//盒子宽度
	var wfcols=Math.floor(screenWidth/boxWidth);//计算列数
	container.style.cssText="width:"+boxWidth*wfcols;/*container设置宽度且在css样式表中margin：0 auto可以实现居中*/
	//把每一个盒子的高度存放在数组中
	var boxHeightArr=[];//存放所有盒子的高度，实际上是每一列的高度
	for(var i=0;i<boxArr.length;i++)
	{
		if(i<wfcols){//实际上boxHeightArr数组中只有wfcols个高度值
			boxHeightArr.push(boxArr[i].offsetHeight);
	    }
		else{
			var minHeight=Math.min.apply(null,boxHeightArr);//从数组中得到最小值
			var minIndex=getMinIndex(boxHeightArr,minHeight);
			boxArr[i].style.position='absolute';
			boxArr[i].style.top=minHeight;
			boxArr[i].style.left=boxArr[minIndex].offsetLeft+"px";
		    boxHeightArr[minIndex]+=boxArr[i].offsetHeight;//更新最小高度值
		}
		//boxArr[i].style.opacity=1;
	}


}
/*得到数组中最小值的索引号,arr为数组，minH为数组中最小的值*/
function getMinIndex(arr,minH){
	for(var i in arr){
		if(arr[i]==minH) return i;
	}
}
/*检测最后一张图片是否露出来一半*/
function checkLastPic(){
	var container=document.getElementById("container");
	var boxArr=container.getElementsByClassName("box");
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//考虑兼容性
	var checkHeight=boxArr[boxArr.length-1].offsetTop+Math.floor(boxArr[boxArr.length-1].offsetHeight/2);//最后一个图片的一般高度加上这一列的高度offsetHeight;
	var documentHeight=document.documentElement.clientHeight+scrollTop;//被卷起的高度加上用户可见的高度
	return (checkHeight<documentHeight)?true:false;
	
}
