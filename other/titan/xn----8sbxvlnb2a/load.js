


function psent(class_name){
	if($('.ptel','.'+class_name).val()!=""){
		console.log(location.href);
		$.post('http://xn----8sbxvlnb2a.xn--p1ai/sys/modules/panels/command.php',{
			com:class_name,name:$('#pname','.'+class_name).val(),
			phone:$('.ptel','.'+class_name).val(),
			link:location.href
		},function(data){
			if(data=="ok"){
				$('.pinfo','.'+class_name).removeClass('err').addClass('ok').text('Запрос успешно отправлен!');
				$('#pname, .ptel','.'+class_name).val("");
			}else{
				$('.pinfo','.'+class_name).removeClass('ok').addClass('err').text('Не заполнены обязательные поля!');
			}
		});
	}else{
		$('.pinfo','.'+class_name).removeClass('ok').addClass('err').text('Не заполнены обязательные поля!');
	}
}

function likes(id){
	$.post('http://xn----8sbxvlnb2a.xn--p1ai/sys/modules/gallery/ajax.php',{com:"likes",id:id},function(res){
		//console.log("l",res);
		if(res=="ok"){
			$("a.likes[data-id='"+id+"'] span").text(parseInt($("a.likes[data-id='"+id+"'] span").text())+1);
		}
	});
}

function views(id){
	$.post('http://xn----8sbxvlnb2a.xn--p1ai/sys/modules/gallery/ajax.php',{com:"views",id:id},function(res){
		//console.log("v",res);
		if(res=="ok"){
			$("a.views[data-id='"+id+"'] span").text(parseInt($("a.views[data-id='"+id+"'] span").text())+1);
		}
	});
}
$(document).ready(function(){
	$('.dropdown-button').dropdown({
      hover: true, // Activate on hover
    });

	// Плавный скролл
	$('.scrollspy').scrollSpy();

	// Табы
	$('http://xn----8sbxvlnb2a.xn--p1ai/themes/default/js/ul.tabs').tabs();

	// Параллакс
	 $('.parallax').parallax();

	 $('[href$=".jpg"],[href$=".jpeg"],[href$=".png"],[href$=".gif"]').addClass('gallery');
	
  	// $('.slick').slick({
  	//    setting-name: setting-value
  	// });

// Инизиализация слайдера в подробном описании товара
$('.good_image_slider').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  arrows: false,
	  fade: true,
	  asNavFor: '.goods_images_min_slider'
	});

	$('.goods_images_min_slider').slick({
	arrows: true,
	  slidesToShow: 3,
	  slidesToScroll: 1,
	  asNavFor: '.good_image_slider',
	  dots: false,
	  centerPadding: '60px',
	  centerMode: true,
	  focusOnSelect: true,
	  responsive: [
    	{
    	  breakpoint: 1024,
    	  settings: {
    	    slidesToShow: 3,
    	    slidesToScroll: 3,

    	  }
    	},
    	{
    	  breakpoint: 600,
    	  settings: {
    	    slidesToShow: 2,
    	    slidesToScroll: 2
    	  }
    	},
    	{
    	  breakpoint: 480,
    	  settings: {
    	    slidesToShow: 1,
    	    slidesToScroll: 1
    	  }
    	}
 	 ]
	});

 	
});



$(function(){
	wow = new WOW(
    {
       boxClass:     'wow',      // default
       animateClass: 'animated', // default
       offset:       200,          // default
       mobile:       false,       // default
       live:         true        // default
    })
    wow.init();

	$(".button-collapse").sideNav();
	
	// $('.tabs').tabs();

	$(document).ready(function() {
		var i = 0;
		$('.news_node').map(function() {
			if ( i == 3 ) {
				$(this).css('clear', 'both');
				i = 0;
			}else {
				i++;
			}
		});
	});
	
	$(".bxslider").each(function(index){
		var option={
			pager: false
		};
		
		if($('li', this).size()>1)
			option.pager=true;
		

		if($(this).is('[pager]'))
			option.pager=($(this).attr('pager')=='false'? false: true);
		
		// прятать paper есть всё влезает на одну страницу
		if($(this).is('[maxslides]')){
			option.maxSlides=$(this).attr('maxslides');
			if($('li', this).size()<=$(this).attr('maxslides'))
				option.pager=false;
		}
		
		if($(">li",this).size()>1){	
			if($(this).is('[auto]'))
				option.auto=true;
		}else{
			option.auto=false;		
		}
		
		if($(this).is('[pause]'))
			option.pause=$(this).attr('pause');
		if($(this).is('[autohover]'))
			option.autoHover=true;
		if($(this).is('[mode]'))
			option.mode=$(this).attr('mode');
		if($(this).is('[minslides]'))
			option.minSlides=$(this).attr('minslides');
		if($(this).is('[moveslides]'))
			option.moveSlides=$(this).attr('moveslides');
		if($(this).is('[slidewidth]'))
			option.slideWidth=$(this).attr('slidewidth');
		if($(this).is('[slideheight]'))
			option.slideHeight=$(this).attr('slideheight');
		
		var slider = $(this).bxSlider(option);
		$(this).hover(function(){},function(){
			if(slider.getSlideCount()>1)
				slider.startAuto();
		});
		
	});
	
	$("a.gallery").fancybox({
		"padding"	  : 4,
		"afterShow":function(aaa){
			// console.log(this);
			if($(this.element.context)){
				views($(this.element.context).attr('dataid'));
			}
		}
	});
	
	// Ajax в модальное окно
	$('.modal_ajax').click(function(){
		var t=$(this);
		var link=t.attr('href');
		$.post(link,{
			// com:class_name,name
		},function(data){
			
			if(data!='' && data!='undefined'){
				$('#modal').openModal({
     					dismissible: true, // Modal can be dismissed by clicking outside of the modal
     					opacity: .5, // Opacity of modal background
     					in_duration: 300, // Transition in duration
     					out_duration: 200, // Transition out duration
     					ready: function() { $(".lighttabs").lightTabs(); }, // Callback for Modal open
     					complete: function() { $('#modal .modal-content').html(''); } // Callback for Modal close
    				}
    			);
				$('#modal .modal-content').html(data);
			} else {
				$('#modal1').openModal();
				$('#modal .modal-content').html('<h3>Не удалось загрузить данные!</h3>');
			}
		});
		return false;
	});

	// inline в модальное окно
	$('.modal_inline').click(function(){
		var t=$(this);
		var inline=$(t.attr('href'));
		var html=inline.html();
			
		if(html!='' && html!='undefined'){
			$('#modal').openModal({
     				dismissible: true, // Modal can be dismissed by clicking outside of the modal
     				opacity: .5, // Opacity of modal background
     				in_duration: 300, // Transition in duration
     				out_duration: 200, // Transition out duration
     				// ready: function() { $(".lighttabs").lightTabs(); }, // Callback for Modal open
     				complete: function() { $('#modal .modal-content').html(''); } // Callback for Modal close
    			}
    		);
			$('#modal .modal-content').html(html);
		} else {
			$('#modal1').openModal();
			$('#modal .modal-content').html('<h3>Не удалось загрузить данные!</h3>');
		}
		
		return false;
	});
	
	
	$(".search>input").focus(function(){
		if($(this).val()=="поиск по сайту"){
			$(this).val("");
		}
	}).blur(function(){
		if($(this).val()==""){
			$(this).val("поиск по сайту");
		}
	});
	
	if (navigator.userAgent.indexOf('MSIE')!= -1){
		$("[hidden]").hide();
	}
	

	
	$('.input-text input').focus(function(){
		$(this).parent().addClass('focus');
	});
	
	$('.input-text input').blur(function(){
		$(this).parent().removeClass('focus');
	});
	
	$('body').click(function(){
		$('.select').removeClass('focus');
	});
	
	$('.select').click(function(){
		$('.select').removeClass('focus');
		$(this).addClass('focus');
		return false;
	});
	
	$('.select .option').click(function(){
		console.log($(this).text());
		$(this).parents('.select').find("input").val($(this).attr("value"));
		$(this).parents('.select').removeClass('focus');
		$('#sort_form').submit();
		return false;
	});
	
	$('.ptel').mask('+7 (999) 999-99-99');
	
	$('#psent_click').click(function(){
		psent("click");
	});
	
	$('.inoneclick .inoneclick_send').click(function(){
		psent("inoneclick");
	});
	
	$('#psent_phone').click(function(){
		psent("phone");
	});
	
	
	


	$(window).load(function(){
		$('#content table:not(.cart)').map(function(){
			$(this).addClass('responsive-table');
		});

	// 	$('.goods-grid').map(function(){
	// 		var el = $('>li', this);
		
	// 		var goodsHeightMax=0, i=1;
	// 		var goodsCount=el.size();

	// 		var col = 3;
	// 		$(el).map(function(){
	// 			if(goodsHeightMax<$(this).height()){
	// 				goodsHeightMax=$(this).height();
	// 			}

	// 			if(i%col==0){
	// 				$(this)
	// 					.add(
	// 						$(this).prevAll().slice(0, col-1)
	// 					)
	// 					.height(goodsHeightMax);
	// 				goodsHeightMax=0;
	// 			}else if(i==goodsCount){
	// 				$(this)
	// 					.add(
	// 						$(this).prevAll().slice(0, (goodsCount%col? goodsCount%col: col)-1)
	// 					)
	// 					.height(goodsHeightMax);
	// 				goodsHeightMax=0;
	// 			}
	// 			i++;
	// 		});
	// 	});
	}); 
	
	$('http://xn----8sbxvlnb2a.xn--p1ai/themes/default/js/a.bi').hover(function(){
		$('.blik',this).stop(true,true);
		$('.blik',this).animate({
			left:'259px'
			//bottom:'-210px'
		},1100,function(){
			$(this).css({
				left:'-259px'
				//bottom:'-0'
			});
		});
	},function(){});
	
	// menuTop=$('.menu_wrapper').offset().top;	
	$(window).scroll(function(){
		posTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

		if(posTop>=100){
			$('.toper').fadeIn('slow');
		}else if(posTop<100){
			$('.toper').fadeOut('slow');
		}

	// 	if($('html').hasClass('cms-administration')){
	// 		posTop+=$('#admin_panel').height();
	// 	}

	// 	if($('html').hasClass('is-menu-fixed')){
	// 		if(menuTop < posTop && !$('.menu_wrapper').hasClass('fixed')){
	// 			$('.menu_wrapper').addClass('fixed');
	// 			$('#head2').css('margin-top', $('.menu_wrapper').height());
	// 		}else if(menuTop >= posTop && $('.menu_wrapper').hasClass('fixed')){
	// 			$('.menu_wrapper').removeClass('fixed');
	// 			$('#head2').css('margin-top','');
	// 		}
	// 	}
	});

	// fix галлереи в табах
	$('.tab>a').click(function(){
		var goal=$(this).attr('href');
		// console.log($(goal+' .slick-gallery'));
		setTimeout(function(){
		
		$(goal+' .slick-gallery').slick('unslick');

		var slick=$(goal+' .slick-gallery');
			slick.slick({
			  infinite: true,
			  speed: 300,
			  slidesToShow: 4,
			  slidesToScroll: 2,
			  dots: false,
			  responsive: [
			    {
			      breakpoint: 1024,
			      settings: {
			        slidesToShow: 3,
			        slidesToScroll: 3,
			        infinite: true,
			        dots: true
			      }
			    },
			    {
			      breakpoint: 600,
			      settings: {
			        slidesToShow: 2,
			        slidesToScroll: 2
			      }
			    },
			    {
			      breakpoint: 480,
			      settings: {
			        slidesToShow: 1,
			        slidesToScroll: 1
			      }
			    }
			  ]
			});
		},100);
	});
});

$(document).ready(function(){
	$(function(){

		var lengthtText = $(".first_block .news_text").text().length;
		var fullText = $(".first_block .news_text").text();

		var ShortText = fullText.slice(0,350) + '...';

		if (lengthtText > 350) {
			console.log(ShortText);
			$(".first_block .news_text").text(ShortText);
		}
	});
});

// Слайдеры
$(document).ready(function(){


		$(".goods_slider").each(function(index){
			var slick=$(this);
			slick.slick({
			  infinite: false,
			  speed: 300,
			  slidesToShow: 3,
			  slidesToScroll: 3,
			  dots: false,
			  responsive: [
			    {
			      breakpoint: 1024,
			      settings: {
			        slidesToShow: 2,
			        slidesToScroll: 2,
			      }
			    },
			    {
			      breakpoint: 600,
			      settings: {
			        slidesToShow: 2,
			        slidesToScroll: 2
			      }
			    },
			    {
			      breakpoint: 480,
			      settings: {
			        slidesToShow: 1,
			        slidesToScroll: 1
			      }
			    }
			  ]
			});
		});

	$(".slick-news").each(function(index){
		var slick=$(this);
		slick.slick({
		  infinite: false,
		  speed: 300,
		  slidesToShow: 6,
		  slidesToScroll: 4,
		  dots: false,
		  responsive: [
		    {
		      breakpoint: 1024,
		      settings: {
		        slidesToShow: 4,
		        slidesToScroll: 2,
		        infinite: true,
		        dots: true
		      }
		    },
		    {
		      breakpoint: 600,
		      settings: {
		        slidesToShow: 3,
		        slidesToScroll: 1
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 1
		      }
		    }
		  ]
		});
	});
	// Слайдер галереи в табах
		$(".slick-gallery").each(function(index){
			var slick=$(this);
			slick.slick({
			  infinite: true,
			  speed: 300,
			  slidesToShow: 4,
			  slidesToScroll: 4,
			  dots: false,
			  responsive: [
			    {
			      breakpoint: 1024,
			      settings: {
			        slidesToShow: 3,
			        slidesToScroll: 3,
			        infinite: true,
			      
			      }
			    },
			    {
			      breakpoint: 600,
			      settings: {
			        slidesToShow: 2,
			        slidesToScroll: 2
			      }
			    },
			    {
			      breakpoint: 480,
			      settings: {
			        slidesToShow: 1,
			        slidesToScroll: 1
			      }
			    }
			  ]
			});
		});


});