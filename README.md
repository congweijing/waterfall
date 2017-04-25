### 效果
    瀑布流布局
### 运用知识
    JavaScript/CSS/HTML
### 中心思想
    用原生JS计算每个图片的位置然后进行绝对定位
### 思路
    1、计算页面所能承载图片的列数：页面总宽度除以每个图片盒子的宽度</br>
    2、将第一行的图片高度用数组存放起来</br>
    3、计算每一列高度的最小值，获取其索引号，获取其offsetLeft;那么下一张图片绝对定位的位置Top就是高度的最小值，Left就是所获取的offsetLeft</br>
    4、预先加载n张图片，最好超过浏览器的可视高度，其余图片用JS创建新的节点进行加载；当屏幕滚动时触发加载图片的函数，为了不频繁触发该函数，可以设置一个条件加以限制，此例子中触发条件是最后一张图片的高度露出一半时触发加载函数。</br>
  
