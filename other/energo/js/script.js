//menu
	var mobileMenuBtn = $('#mobile-btn');
    var headerContacts = $('#header__contacts');
	var headerNav = $('#header__nav');
        
//search
	var searchSend = $('#searchSend');
	var headerLogo = $('.header__logo');
	var searchForm = $('#search-form');
	var searchShow = $('#searchShow');
	
function initMobileMenu (mobileMenuBtn,headerContacts,headerNav ){
	mobileMenuBtn.click(function(){
	    headerContacts.toggleClass('header__hidden');
	    headerNav.toggleClass('header__hidden');
	    $('.header__lines').toggleClass('header__hidden');
		$('#btnClosed').toggleClass('header__hidden');
	});
}	

function initSearch(headerLogo,searchForm,searchSend){
	
    searchSend.click(function(){
	var winWidth = $('html, body').width();
	
	if(winWidth < 768){
		if(!textInpute){
			var textInpute = $('#searchValue').val();
			headerLogo.toggleClass('header__logo--hidden');
			searchForm.toggleClass('header__search--active');
			    return false;
		}else{
		    return true;
		}
		
		} else{
			return true;
		}
			    
				
	});	
	
	searchShow.click(function(){
		headerLogo.toggleClass('header__logo--hidden');
	    searchForm.toggleClass('header__search--active');
	});
}



//productMenu
    
function initProductMenu(){
    var productMenu = $('.productMenu');
	var currentMenu = 0;
	var items = productMenu.children('.productMenuItem').length;
	
	for(var i =0; i<items; i++ ){
		var u = $(productMenu.children('.productMenuItem')[i]);
		u.attr('id', 'productMenuItem'+i+'');
	}
	
	$('.productMenuItem').click(function(event){
		var el = $(event.target);
		var bufferMenu = $(this);
		
		if(el.hasClass('productMenuBtn') && currentMenu === 0){
			console.log(3);
			bufferMenu.children('.product-grid__menu').toggleClass('productMenuHide');
			$('.shadow__item').toggleClass('shadow--hide');
			currentMenu = bufferMenu;	
		}else if(el.hasClass('productMenuBtn') && currentMenu !=0){
			if(bufferMenu.attr('id') != currentMenu.attr('id')){
				console.log(1);
			    currentMenu.children('.product-grid__menu').toggleClass('productMenuHide');
                bufferMenu.children('.product-grid__menu').toggleClass('productMenuHide');
                currentMenu = bufferMenu;		
			}else if(bufferMenu.attr('id') === currentMenu.attr('id')){
				console.log(2);
				currentMenu.children('.product-grid__menu').toggleClass('productMenuHide');
				$('.shadow__item').toggleClass('shadow--hide');
				currentMenu = 0;
			}
		}
	
	});
	
	$(document).mouseup(function (e) {
        if (productMenu.has(e.target).length === 0){
            currentMenu.children('.product-grid__menu').toggleClass('productMenuHide');
			$('.shadow__item').toggleClass('shadow--hide');
			currentMenu=0;
		}
    });
	
		
}









