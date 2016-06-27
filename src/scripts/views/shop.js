var recycleHtml=require("../temps/shop.string");
//require("../shopCarFly/fly.js");
//require("../shopCarFly/jquery.fly.min.js");
SPA.defineView("shop",{
	html:recycleHtml,
	plugins: ['delegated',{
		name:'avalon',
		options:function(vm){
			vm.livelist=[];
		}
	}],
	init:{
		vmArr:[],
		shopMes:{},
		shopnum:0,
		storeNum:{},
		compareI:0
	},
	 bindActions: {
	    'shopTabs': function (e){
	    	$(e.el).val("");
	    },
	    "clickShop":function(e){
	    	var liIndex=$(e.el).parent().index();
	    	if(this.compareI!==liIndex){
	    		this.shopnum=0;
	    	}
	    	if(sessionStorage.getItem("shopCar")){
	    		this.shopMes=JSON.parse(sessionStorage.getItem("shopCar"));
	    		this.shopMes[liIndex]=this.vmArr[liIndex];
	    		this.shopnum++;
		    	this.storeNum[liIndex]=this.shopnum;
		    	this.shopMes["totalNum"]=this.storeNum;
		    	this.compareI=liIndex;
		    	sessionStorage.setItem("shopCar",JSON.stringify(this.shopMes));
	    	}
	    	else{
	    		this.shopMes[liIndex]=this.vmArr[liIndex];
		    	this.shopnum++;
		    	this.storeNum[liIndex]=this.shopnum;
		    	this.shopMes["totalNum"]=this.storeNum;
		    	this.compareI=liIndex;
		    	sessionStorage.setItem("shopCar",JSON.stringify(this.shopMes));
	    	}
	    	
//	    	var offset = $("#end").offset();
//			console.log(offset);
//			$(".addcar").click(function(event){
//				var addcar = $(this);
//				var img = addcar.parent().find('img').attr('src');
//				console.log(img);
//				var flyer = $('<img class="u-flyer" src="'+img+'">');
//				flyer.fly({
//					start: {
//						left: event.pageX,
//						top: event.pageY
//					},
//					end: {
//						left: offset.left+10,
//						top: offset.top+10,
//						width: 0,
//						height: 0
//					},
//					onEnd: function(){
//						this.destory();
//					}
//				});
//			});
	    	
	    	var initnum=0;
	    	for(var i in this.shopMes["totalNum"]){
	    		initnum=initnum+parseInt(this.shopMes["totalNum"][i]);
	    	}
	    	$(".shop-num").text(initnum);
//  		console.log(JSON.parse(sessionStorage.getItem("shopCar")));
		},
		"shopCar":function(e){
			
		}
	  },
  	bindEvents: {
  	 'beforeShow': function () {
     	var that=this;
     	var vm=this.getVM();
     	$.ajax({
	        url: '/api/getLivelist.php',
	        type: 'get',
	        data:{
	          rtype: 'start'
	        },
	        success: function (rs) {
	        	that.vmArr=rs.data;
				vm.livelist=rs.data;
	        }
      	});
     },	
    'show': function () {
	    var mySwiper = new Swiper('.swiper-container', {
        	loop: true,
        	pagination : '.swiper-pagination',
        	autoplay: 5000
	     });
	     var self=this;
	     var scrollSize=40;
	     var vm=this.getVM();
	     //下拉刷新，上拉加载
			setTimeout(function(){
				var myScroll=new IScroll(".s-scroll",{probeType:3}); //probeType表示可以监听scroll事件		
					myScroll.scrollBy(0, -scrollSize);
					myScroll.on("scrollEnd",function(){
						var sizeY=this.maxScrollY-this.y;
						if(sizeY>=0){
							$.ajax({
								type:"get",
								url:"/api/getLivelist.php",
								async:true,
								data:{
									rtype:"load"
								},
								success:function(res){
									var newArr=self.vmArr.concat(res.data);
									vm.livelist=newArr;
									self.vmArr=newArr;
									myScroll.refresh();
//									 myScroll.scrollTo(0, this.y + scrollSize);
									myScroll.scrollTo(0,myScroll.maxScrollY+scrollSize);
								}
							});
						}else if(this.y>= -scrollSize&&this.y<0){
							myScroll.scrollTo(0, myScroll.maxScrollY + scrollSize);
						}
						if(this.y >= -scrollSize && this.y < 0)
						{
							myScroll.scrollTo(0, -scrollSize);
						}
						else if (this.y >= 0)
						{
							$.ajax({
								type:"get",
								url:"/api/getLivelist.php",
								async:true,
								data:{
									rtype:"refresh"
								},
								success:function(res){
									self.vmArr=res.data;
									vm.livelist=res.data;
									myScroll.refresh();
									myScroll.scrollTo(0, -scrollSize);
								}
							});
						}
				});
			},100);
	   }
   }
});