var recycleHtml=require("../temps/welcome.string");
SPA.defineView("welcome",{
	html:recycleHtml,
	plugins: ['delegated'],
	bindEvents: {
    'show': function (){
	    var mySwiper = new Swiper('#w-swiper', {
        	loop: false,
        	pagination : '.swiper-pagination',
	    });
	   	var timer=setTimeout(function(){
	   		$(".whello").css("display","none");
	   		clearTimeout(timer);
	   	},3000);
	   	
	   }
	},
	bindActions:{
		'tabs':function(){
    		SPA.open("index");
//  		this.hide();
    	}
	}
});  