$(function(){

	$("#id_addr").change(function(){
		val=$(this).val();
		// console.log(val);
		$.post('http://xn----8sbxvlnb2a.xn--p1ai/sys/modules/lk/ajax/edit.php',{
			com: 'cart_addr_change',
			id: val
		},function(data){
			try{
				var result = JSON.parse(data);
			}catch(e){
				console.log('Ошибка разбора json: "' + data + '"');
			}
			if(result.stat='ok'){
				$('.list_addr').html(result.texti);
			}else{
				console.log('Ошибка: "' + result.mess + '"');
			}
		});
	});

	$(".cart_delete").click(function(){
		var node = $(this).closest('tr');
		$.post('http://xn----8sbxvlnb2a.xn--p1ai/sys/modules/cart/command.php', {
			com: 'del',
			id: $(this).data("id"),
		},function(data){
			node.remove();
			try{
				var result = JSON.parse(data);
			}catch(e){
				console.log('Ошибка разбора json: "' + data + '"');
			}
			$('#sum_price,#cart_price').text(number_format(result.sum_price, 2, '.', ' '));
			$('#cart_count').html(result.count);
			$('.all_price').val(result.sum_price);
			$('.text_all_sum').text(number_format(result.sum_price, 2, '.', ' '));
		});
	});

	$(".cart_count").change(function(){
		val=parseInt(str_replace(" ","",$(this).val()));
		$(this).val(val);
		if(isNaN(val) || val<1){
			val=1;
			$(this).val(1);
		}

		$.post('http://xn----8sbxvlnb2a.xn--p1ai/sys/modules/cart/command.php',{
			com: 'inc',
			id: $(this).data('id'),
			count: val,
		},function(data){
			try{
				var result = JSON.parse(data);
			}catch(e){
				console.log('Ошибка разбора json: "' + data + '"');
			}
			$('#sum_price,#cart_price').text(number_format(result.sum_price, 2, '.', ' '));
			$('#cart_count').html(result.count);
			$('.all_price').val(result.sum_price);
			$('.text_all_sum').text(number_format(result.sum_price, 2, '.', ' '));
		});
	});
	$(".cart_count").keyup(function(){
		$(this).change();
	});
	$(".cart_plus").click(function(){
		e=$(this).prev();

		val=parseInt(str_replace(" ","",e.val()));
		if(val<1){
			e.val(1);
		}else{
			e.val(val+1);
		}
		val=parseInt(str_replace(" ","",e.val()));
		e.change();
	});
	$(".cart_minus").click(function(){
		e=$(this).next();

		val=parseInt(str_replace(" ","",e.val()));
		if(val<=1){
			e.val(1);
		}else{
			e.val(val-1);
		}
		val=parseInt(str_replace(" ","",e.val()));
		e.change();
	});

});

function cartbuy(el, goods_id, count, price, property){
	if(count<=0){
		count = 1;
	}
	$.post('http://xn----8sbxvlnb2a.xn--p1ai/sys/modules/cart/command.php',
		{
			'com': 'add',
			'count': count,
			'item': goods_id,
			'property': property || '',
		},
		function(html){
			var i=JSON.parse(html);
			//el.html('<div></div>В корзине('+i.count+')');

			$('#cart_count').html(i.sum_count);
			$('#cart_count_text').html(i.sum_count_text);
			$('#cart_price').html(number_format(i.sum_price, 2, '.', ' '));
			
			var imgEl = el.parents('li').find('.good_img img');
			var imgPos = imgEl.offset();
			var cartPos  = $('#cart_count').offset();
			
			//console.log(imgPos,cartPos);
			$('body').prepend('<img src="' + imgEl.attr('src') + '" id="temp_goods_img" style="width :'+imgEl.width()+'px;height :'+imgEl.height()+'px;z-index:1000;opacity:0.6;position: absolute; top: ' + imgPos.top + 'px; left: ' + imgPos.left + 'px;" />');
			params = {
				top : cartPos.top + 'px',
				left : cartPos.left + 'px',
				opacity : 0.0,
				width : $('#cart_count').width(),
				height : $('#cart_count').height(),
			};

			$('#temp_goods_img').animate(params, 'slow', 'easeInBack', function(){
				$('#temp_goods_img').remove();
			});
		}
	);
}