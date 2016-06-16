$(document).ready(function(){

var x = 0;
var y = 0;

	jQuery.fn.Dimensions = function(){	
	
	var WinHeight=$(window).height();
	var WinWidth=$(window).width();
	$("div#GalleryHeader, div#GalleryContent, div#GalleryFooter").css("width",(WinWidth-4));
	$("div#GalleryContent").css("height",(WinHeight-132));
	$("div#GalleryFooter").css("top",(WinHeight-64));
	}
	$(window).resize(function() {
	jQuery.fn.Dimensions();
	});
		
	jQuery.fn.LightboxGallery = function(){	
	
		this.each(function(){
			var a = $(this);
			a.data('title',a.attr('title')).removeAttr("title");
			var appendVar = '<div id="lightboxBg" class="lightboxItem">Contenedor Funcionando</div>'+
			'<div id="GalleryHeader" class="lightboxItem">Header</div>'+
			'<div id="GalleryContent" class="lightboxItem"><div id="draggable"><img  src="imgs/'+jQuery.data(this, "title")+'1.jpg" id="ZoomImg"></div></div>'+
			'<div id="GalleryFooter" class="lightboxItem">Footer</div>';
			a.on('click',function(){
				$(appendVar).appendTo('body');
				$("#draggable").draggable({
					helper: function(){
						return $('<div></div>').css('opacity',0);
					},
					drag: function(event, ui){
						var p = ui.helper.position();
						$(this).stop().animate({
							top: p.top,
							left: p.left
						},2000,'easeOutCirc');
					}
				});
				jQuery.fn.Dimensions();
				var b= $('#ZoomImg');
				b.dblclick(function(e) {
					var increment=2;
					var w= b.width();
					var h= b.height();
					var w2=w*increment;
					var h2=h*increment;
					var contx=parseInt($("#draggable").css("left"));
					var conty=parseInt($("#draggable").css("top"));
					var mousex=e.pageX;
					var mousey=e.pageY;
					var xpos=mousex-contx;
					var ypos=mousey-conty-66;
					var xinc=((xpos/w)*w2)-xpos;
					var yinc=((ypos/h)*h2)-ypos;
					//alert("ContX = "+contx+" ContY = "+conty+"\n mousex = "+mousex+" mousey = "+mousey+"\n PosX = "+xpos+" PosY = "+ypos);
					//alert("PosX = "+xinc+" PosY = "+yinc);
					b.animate({
						width: w2,
						height: h2
					}, 600);
					$("#draggable").animate({
						left: contx-xinc,
						top: conty-yinc
					}, 600);
				});
				$('.lightboxItem').fadeIn('slow');
				$('#GalleryHeader,#GalleryFooter').on('click',function(){
					$('.lightboxItem').fadeOut('slow', function(){
						$(".lightboxItem").remove();
					});					
				})
			});
		});
	}
	
	// TRIGGER
	
	jQuery('.ImgTrigger').LightboxGallery();

})

