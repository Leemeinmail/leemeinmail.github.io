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
	$('.accord-tabs__icon').css('display','block');
	$('.accord-tabs__content').addClass('accord-tabs__content--tabs');
    list.prependTo(el);
	$(el).tabs();
}
		
function removeTabs(el){
	$('.accord-tabs__icon').css('display','none');
	$('.accord-tabs__content').removeClass('accord-tabs__content--tabs');
	$(el).tabs("destroy");
	$(el).children('#tabs-list').remove();
}
		
function addAccordion(el,title){
	$.each(title,function(index,value){
	    var el = "#tab"+index;
		$('.accord-tabs__content').addClass('accord-tabs__content--accordion');
	    $(el).before("<h1 id='accordion-title' >"+value+"</h1>");
    });
	
	$(el).accordion({
		collapsible: "true",
		heightStyle: "content",
		activ:'0'
	});
}
		
function removeAccordion(el){
	$('.accord-tabs__content').removeClass('accord-tabs__content--accordion');
    $(el).accordion("destroy");
	$(el).children('#accordion-title').remove();
}
		
function installStepWiget(el,title){
	var width = $(window).width();
	console.log(width);
	if(width > tablet){
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
	
	if(initAccord != "undefined" && width > tablet){
		removeAccordion(el);
		addTabs(el,title);
	}else if(initTabs != "undefined" && width < tablet){
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
}

function hideMenu(navMenuState){
    $(navMenuBtn).removeClass('nav-menu__btn--active');
	$(navMenuIcon).removeClass('nav-menu__icon--active');
	$(navMenuName).removeClass('nav-menu__name--active');
	$(navMenuBody).removeClass('nav-menu__body--active');
	$(navMenuBody).addClass('nav-menu__body--off');
}
