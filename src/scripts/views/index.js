var initHtml=require("../temps/index.string");
var ajson=require("../until/commonFn.js");
SPA.defineView("index",{
	html:initHtml, 
	plugins: ['delegated'],
	modules: [{
	    name: 'content', // 子视图的名字，用作后边引用的句柄
	    views: ['recycle', 'shop', 'lifeServer',"my"], // 定义子视图的列表数组
	    defaultTag: 'recycle', // 定义默认视图
	    container: '.i-wrapper' // 子视图的容器
	  }],
	 bindActions: {
	    'myTabs': function (e, data) {
	    	ajson.highLight(e.el);
	    	this.modules.content.launch(data.tag);
	    }
	  }  
})
