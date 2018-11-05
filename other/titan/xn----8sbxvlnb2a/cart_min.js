function cart_min_update(){
	$.post('http://xn----8sbxvlnb2a.xn--p1ai/sys/modules/cart/command.php',{
		com:'cart_min'
	},function(data){

		if(data.stat=="ok"){
			$('.cart_min_more').html(data.html);
			$(".scroller").delay(200).mCustomScrollbar({axis:"y",theme:"dark"});
		}else{
			$('.cart_min_more').html('<div class="valign-wrapper center-align"><p class="valign center-align">Ваша корзина пуста</p></div>');
		}
		$('#cart_count').html(data.count);
		$('#cart_price').html(number_format(data.sum, 2, '.', ' '));
	},'json');
}

function cart_min_del(id,el){
	$.post('http://xn----8sbxvlnb2a.xn--p1ai/sys/modules/cart/command.php',{
		com: 'del',
		id: id
	}, function(data){
		// console.log(data);
		el.parents('tr').remove();
		cart_min_update();
	});
}

$(function(){
	$('.cart_min').hover(function(){
		// $('.cart_min_more').show();
		cart_min_update();		
	},function(){
		$('.cart_min_more').html('<div class="progress"><div class="indeterminate"></div></div>');
	});
	
});