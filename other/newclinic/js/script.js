var accordTabs = $('#accord-tabs');
var accordTabsTitle = ["обследование","детоксикация","восстановление организма","реабилитация"];
var mobile = 320;
var tablet = 750;
var desktop = 1100;
var thisWindow = $(window);

var navMenuIcon = $('#nav-menu__icon');
var navMenuBody = $('#nav-menu__body');
var navMenuBtn = $('#nav-menu__btn');
var navMenuName = $('#nav-menu__name');
var navMenuState = 0;
		
function createList(title){
	var ul = $("<ul id='tabs-list'></ul>");
	$.each(title,function(index,value){
		var t = $("<li><a href='#tab"+index+"'>"+value+"</a></li>").appendTo(ul);
	});
		return ul;
}
		
function addTabs(el,title){
	var list = createList(title);
    list.prependTo(el);
	$(el).tabs();
}
		
function removeTabs(el){
	$(el).tabs("destroy");
	$(el).children('#tabs-list').remove();
}
		
function addAccordion(el,title){
	$.each(title,function(index,value){
	    var el = "#tab"+index;
	    $(el).before("<h1 id='accordion-title' >"+value+"</h1>");
    });
	
	$(el).accordion({
		heightStyle: "content",
		active:"0"
	});
}
		
function removeAccordion(el){
    $(el).accordion("destroy");
	$(el).children('#accordion-title').remove();
}
		
function installStepWiget(el,title){
	var width = $(window).width();
	if(width > 749){
		addTabs(el,title);
	}
	else{
		addAccordion(el,title);
	}
}
		
function resizeStepWiget(el,title){
    var width = $(document).width();	
	var initAccord = typeof $(el).data("ui-accordion");
	var initTabs = typeof $(el).data("ui-tabs");
	
	if(initAccord != "undefined" && width > 749){
		removeAccordion(el);
		addTabs(el,title);
	}else if(initTabs != "undefined" && width < 749){
		removeTabs(el);
		addAccordion(el,title);
	}
}

function showMenu(navMenuState){
    $(navMenuBtn).addClass('nav-menu__btn--active');
	$(navMenuIcon).addClass('nav-menu__icon--active');
	$(navMenuName).addClass('nav-menu__name--active');
	$(navMenuBody).removeClass('nav-menu__body--off');
	$(navMenuBody).addClass('nav-menu__body--active');
	return navMenuState = 1;
}

function hideMenu(navMenuState){
    $(navMenuBtn).removeClass('nav-menu__btn--active');
	$(navMenuIcon).removeClass('nav-menu__icon--active');
	$(navMenuName).removeClass('nav-menu__name--active');
	$(navMenuBody).removeClass('nav-menu__body--active');
	$(navMenuBody).addClass('nav-menu__body--off');
	return navMenuState = 0;
}
