var recycleHtml=require("../temps/recycle.string");
SPA.defineView("recycle",{
	html:recycleHtml,
	bindEvents: {
    'show': function () {
	    var mySwiper = new Swiper('.swiper-container', {
        	loop: true,
        	pagination : '.swiper-pagination',
        	autoplay: 5000
	      });
	    var myScroll=new IScroll(".i-scroll");
	   
	   }
	}
});