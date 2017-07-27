### ionic-pickcity        
####
ionic-pickcity是一个基于ionic,利用angularjs实现的app的选择城市区域的组件功能,仿京东app的地址选择，使用了gulp和sass的前端开发工具，当然在实际的使用中，我们只需要用到dist文件下的css和js文件即可，也可以引入src下的js和css，（压缩文件在后来中没有更新，请不要引入min.css和min.js)。             
实现功能
------
### 实现功能    
1、自定义配置值            
2、操作方便，体验友好      

用法
------
(1)首先从src目录下引入js和css       
         
```
<link rel="stylesheet" type="text/css" href="path/src/css/ionic-pickcity.css">
<script type="text/javascript" src="path/src/js/ionic-pickcity.js"></script>              
<script type="text/javascript" src="path/src/js/ionic-pickcity-service.js"></script>       
```  
(2)在app的module包含依赖bing.ionic.pickcity                 
```   
angular.module('starter',['ionic','bing.ionic.pickcity'],function() {           

})
```	
(4)在模板中    
```
<ionic-pick-city options='CityPickData' address='address'></ionic-pick-city>
```
(4)在控制器中：
``` 
$scope.CityPickData = {      
       配置项
};
配置项：                
	cssClass: //显示地区选择的样色类，默认'ionic-citypicker list'       
	iconPosition：//图标显示位置       
	iconClass：// 图标类，默认'ion-android-pin'
	title ：//显示的主题，默认'地址'
	closeText://取消按钮显示的文本,默认'取消',可以是ionic图标
	buttonText：//确定按钮的文本，默认'确定',可以是ionic图标
	backdrop：是否显示背景幕，默认是true
	isCache://该UI-router状态所对应的template是否是有缓存的，如果在状态中设置了cache:false,代表是没有缓存，那么必须设置该值iscache:false,如果路由状态中设置了cache:true或者没有设置（默认true),那么这个isCache可以不设置，利用默认的true就可以了。

内部的代码的配置项：
	itemTab1 ： //代表是第一级的选择项，eg：省份，默认是true,显示出来;
	itemTab2 ： //代表是第二级的选择项，eg：城市，默认是false,在选择了一级的，才将二级显示出来;
	itemTab3 ： //代表是第三级的选择项，eg：区，默认是false,在选择了二级的，才将三级显示出来;

	showItem1 ： //一级的选项菜单对应着每一级的显示内容区，eg:省份内容显示区;
	showItem2 ： //二级的选项菜单对应着每一级的显示内容区，eg:城市内容显示区;
	showItem3 ： //三级的选项菜单对应着每一级的显示内容区，eg:区内容显示区;
	
	item1 ： //选中的一级的值;
	item2 ： //选中的二级的值;
	item3 ： //选中的三级的值;

	isHasChild：//判断是否有没有选择完整的地址，如果等于true，表明地址没有选择完整
```
获取最后选中的地址     

var address = $scope.address;

一般不用更改配置项即可使用    

下面是一个demo:     
![pickcity1](/demo/test1.gif "pickcity1")       
![pickcity2](/demo/test2.gif "pickcity2")         

         
     
