$('.triple-menu__btn').click(function(){
    var menu =  $('triple-menu__body');
	if (menu.is(':hidden')){
	    menu.slideDown(400);
	}
	else{
		menu.slideUp(400);
	}
});