//menu
	var mobileMenuBtn = $('#mobile-btn');
    var headerContacts = $('#header__contacts');
	var headerNav = $('#header__nav');
        
//search
	var searchSend = $('#searchSend');
	var headerLogo = $('.header__logo');
	var searchForm = $('#search-form');
	var searchShow = $('#searchShow');
	
//productMenu
    var productMenu = $('.productMenu');
	
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



function initProductMenu(productMenu){
    
	productMenu.click(function(event){
		var el = $(event.target);
		if (el.hasClass('productMenuBtn')) {
			$(this).children('.product-grid__menu').toggleClass('productMenuHide');
			$('.shadow__item').toggleClass('shadow--hide');
		}
	});	
}









