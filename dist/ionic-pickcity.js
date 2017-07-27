/**
* 地区城市选择
* version 1.0.0
* options can be seted as:
{
	cssClass: //显示地区选择的样色类，默认'ionic-citypicker list'
	iconPosition：//图标显示位置
	iconClass：// 图标类，默认'ion-android-pin'
	title ：//显示的主题，默认'地址'
	closeText://取消按钮显示的文本,默认'取消'
	buttonText：//确定按钮的文本，默认'确定'

	backdrop：是否显示背景幕，默认是true

	isCache://该UI-router状态所对应的template是否是有缓存的，如果在状态中设置了cache:false,代表是没有缓存，那么必须设置该值iscache:false,如果路由状态中设置了cache:true或者没有设置（默认true),那么这个isCache可以不设置，利用默认的true就可以了。
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
	
}

*/
angular.module('bing.ionic.pickcity', ['ionic']);
(function (angular,undefined) {
	'use strict';
  	angular.module('bing.ionic.pickcity')
  	.directive('ionicPickCity',[
  		'$rootScope',
  		'$ionicModal',
  		'$timeout',
  		'CityPickerService',
  		'$ionicScrollDelegate',
  		function($rootScope, $ionicModal, $timeout, CityPickerService, $ionicScrollDelegate) {
	  		return {
	  			restrict: 'E',
	          	scope: {
	          		options:'=options'
	          		address:'=address'
	          	},
	          	template: '<div class="{{::vm.cssClass}}">'+
	          				'<a class="item {{::vm.iconPosition}}" href="#" ng-click="vm.showModal($event)">'+
	          				'<i class="icon {{::vm.iconClass}}"></i>{{::vm.title}}'+
	          				'<span class="item-note" ng-bind="vm.items">'+
							'</span>'+
	  					   	'</a>'+
	  					  '<div>',

	  			link: function(scope, element, attrs) {
	  				var vm = scope.vm = {},
	  					so = scope.options, 
	  					citypickerModel = null;

	  					vm.cssClass = 'ionic-citypicker list',
	  					vm.iconPosition = so.iconPosition || 'item-icon-left',
	  					vm.iconClass = so.iconClass || 'ion-android-pin',
	  					vm.title = so.title || '地址',
	  					vm.closeText = so.closeText || '取消',
	  					vm.buttonText = so.buttonText || '确定',
	  					vm.areaTitle = so.areaTitle || '所在区域';

	  					vm.backdrop = so.backdrop === undefined ? true :(Boolean(so.backdrop) ? true : false);
        				
        				vm.isCache = so.isCache === undefined ? true :(Boolean(so.isCache) ? true : false);

	  					vm.areaData1 = CityPickerService;
	  					vm.itemTab1 = true;
	  					vm.itemTab2 = false;
	  					vm.itemTab3 = false;
	  					vm.showItem1 = true;
	  					vm.showItem2 = false;
	  					vm.showItem3 = false;

	  					vm.itemText1 = "请选择";
	  					vm.itemText2 = "请选择";
	  					vm.itemText3 = "请选择";

	  					vm.item1 = null;
	  					vm.item2 = null;
	  					vm.item3 = null;

	  					vm.isHasChild = true;

	  					/**
	  					* 创建modal的实例服务
	  					* fromTemplateUrl的模板路径是一个绝对路径，在应用时可能需要更加自己的存放路径设置
	  					*/
						$ionicModal.fromTemplateUrl('/js/pickcity/src/template/ionic.citypicker.html', {
				            'scope': scope,
				            'animation': 'slide-in-up',
				         }).then(function(modal) {

						    scope.modal = modal;
						});

				        /**
				        * 滚动条回到顶部
				        *
				        */
				        var goScrollTop = function() {
				        	$ionicScrollDelegate.$getByHandle('item-area-select-modal').scrollTop();
				        }

				        /**
				        * 弹出modal框
				        */
	  					vm.showModal = function(event) {
	  						event.preventDefault();
  							if(scope.modal.isShown()) {
  								return;
  							}else {
  								scope.modal.show();
  							}
	  							

	  						
						}

						/**
						* 关闭弹出的modal框
						*/
						vm.returnCancel = function() {
		  					$timeout(function() {
					            scope.modal.hide();
					        },100)
		  				}

		  				/**
		  				* 确定选择保存地址
		  				*/
		  				vm.returnOk = function() {
		  					if(vm.isHasChild) {
		  						return false;
		  					}else {
		  						if(vm.item1 && vm.item2 && vm.item3) {
		  							vm.items = vm.item1+'-'+vm.item2+'-'+vm.item3;
		  						}
		  						if(vm.item1 && vm.item2 && !vm.item3) {
		  							vm.items = vm.item1+'-'+vm.item2;
		  						}
		  						if(vm.item1 && !vm.item2) {
		  							vm.items = vm.item1;
		  						}

		  						//指令的双向绑定，返回最终选择的地址
		  						scope.address = vm.items;
								//关闭操作板
								vm.returnCancel();
								
								vm.returnCancel();
								return;
  							}
		  				}

		  				/**
		  				* 关闭modal框
		  				*/
		  				vm.clickToClose = function() {
		  					vm.returnCancel();
		  				}

		  				/**
		  				* 选择一级选项
		  				*/
		  				vm.select1 = function(item) {

		  					goScrollTop();

		  					if(item.sub === undefined) {
		  						vm.itemText1 = item.name;
		  						vm.itemTab1 = true;
			  					vm.itemTab2 = true;
			  					vm.itemTab3 = false;
			  					vm.isHasChild = false;
		  						return false;
		  					}else {
		  						vm.itemText1 = item.name;
		  						vm.areaData2 = item.sub;
		  						vm.item1 = item.name;

		  						vm.itemTab1 = true;
			  					vm.itemTab2 = true;
			  					vm.itemTab3 = false;

			  					vm.showItem1 = false;
			  					vm.showItem2 = true;
			  					vm.showItem3 = false;

			  					vm.itemText2 = "请选择";
		  					}
		  				}

		  				/**
		  				* 选择二级选项
		  				*/
		  				vm.select2 = function(item) {

		  					goScrollTop();

		  					if(item.sub === undefined) {
		  						vm.itemText2 = item.name;
		  						vm.item2 = item.name;

		  						vm.itemTab1 = true;
			  					vm.itemTab2 = true;
			  					vm.itemTab3 = false;
			  					vm.isHasChild = false;
		  						return false;
		  					}else {
		  						vm.itemText2 = item.name;
		  						vm.areaData3 = item.sub;
		  						vm.item2 = item.name;

		  						vm.itemTab1 = true;
			  					vm.itemTab2 = true;
			  					vm.itemTab3 = true;

			  					vm.showItem1 = false;
			  					vm.showItem2 = false;
			  					vm.showItem3 = true;
			  					vm.itemText3 = "请选择";
		  					}
		  				}

		  				/**
		  				* 选择三级选项
		  				*/
		  				vm.select3 = function(item) {

		  					goScrollTop();

		  					if(item.sub === undefined) {
		  						vm.itemText3 = item.name;
		  						vm.item3 = item.name;

		  						vm.isHasChild = false;
		  						return false;
		  					}else {
		  						vm.itemText2 = item.name;
		  						vm.areaData3 = item.sub;
		  						vm.item3 = item.name;

		  						vm.itemTab1 = true;
			  					vm.itemTab2 = true;
			  					vm.itemTab3 = true;

			  					vm.showItem1 = false;
			  					vm.showItem2 = false;
			  					vm.showItem3 = true;
		  					}
		  				}

		  				/**
		  				* 一级选项菜单tab点击选择，切换内容区
		  				*/
		  				vm.tab1 = function() {

		  					goScrollTop();

		  					vm.showItem1 = true;
			  				vm.showItem2 = false;
			  				vm.showItem3 = false;

	  						vm.item2 = null;
	  						vm.item3 = null;

	  						vm.isHasChild = true;

		  				}
		  				/**
		  				* 二级选项菜单tab点击选择，切换内容区
		  				*/
		  				vm.tab2 = function() {
		  					goScrollTop();
		  					vm.showItem1 = false;
			  				vm.showItem2 = true;
			  				vm.showItem3 = false;

		  					vm.item3 = null;
		  					vm.isHasChild = true;
		  				}
		  				/**
		  				* 三级选项菜单tab点击选择，切换内容区
		  				*/
		  				vm.tab3 = function() {
		  					goScrollTop();
		  					vm.showItem1 = false;
			  				vm.showItem2 = false;
			  				vm.showItem3 = true;
		  				}

		  				/**
		  				* 销毁modal对象和scope对象
		  				*/
		  				if(!vm.isCache) {
		  					scope.$on('$destroy', function() {
		  						scope = vm = null;
	        				});

	        				//监听，状态改变时,删除。
				            $rootScope.$on('$stateChangeSuccess', function() {
				                scope.$destroy();
				            	scope.modal.remove();
				            });	
		  				}
		  				
	  			}
	  		};
  	}]);
})(angular);