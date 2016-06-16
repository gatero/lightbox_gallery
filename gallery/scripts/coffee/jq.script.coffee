###
	@Author: Daniel Ortega
	@coffee Name: imgzoom
	@Version: 1.0
###
class imgzoom
#----------------------------------------
	constructor:(@tar)->
		#
		@html = 
			ini:  """
							<div class='iz-ini' id='iz-bg'></div>
							<div class='iz-ini' id='iz-img'></div>

							<div class='iz-ini' id='iz-foot'></div>
							<div class='iz-ini' id='iz-head'></div>
						"""
			menu: """
							<div class='navbar navbar-default' id='iz-menu' role='navigation'>
							  <div class='navbar-header'>
							    <button type='button' class='navbar-toggle' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1'>
							      <span class='sr-only'>Toggle navigation</span>
							      <span class='icon-bar'></span>
							      <span class='icon-bar'></span>
							      <span class='icon-bar'></span>
							    </button>							    
									<a class='navbar-brand' href='#'> <img id='logo' src='./img/png/logo.png'/> </a>
							  </div>

							  <div class='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
							    <ul class='nav navbar-nav navbar-right'>
							      <li class='active'>
							      	<a href='#'>
							      		<span class='glyphicon glyphicon-zoom-in'></span>
							      	</a>
							      </li>
							      <li>
							      	<a href='#'>
							      		<span class='glyphicon glyphicon-zoom-out'></span>
							      	</a>
							      </li>
							      <li>
							      	<a href='#'>
							      		<span class='glyphicon glyphicon-comment'></span>
							      	</a>
							      </li>
							      <li class='dropdown'>
							        <a href='#' class='dropdown-toggle' data-toggle='dropdown'><span class='glyphicon glyphicon-eye-open'></span> <b class='caret'></b></a>
							        <ul class='dropdown-menu'>
							          <li><a href='#'><span class='glyphicon glyphicon-download-alt'></span>&nbsp;Descargar</a></li>
							          <li><a href='#'><span class='glyphicon glyphicon-th'></span>&nbsp;Agregar a colecci&oacute;n</a></li>
							          <li><a href='#'><span class='glyphicon glyphicon-link'></span>&nbsp;Enviar enlace</a></li>
							          <li class='divider'></li>
							          <li><a href='#'><span class='glyphicon glyphicon-pencil'></span>&nbsp;Editar Infomaci&oacute;n</a></li>
							          <li class='divider'></li>
							          <li><a href='#'><span class='glyphicon glyphicon-trash'></span>&nbsp;Borrar</a></li>
							        </ul>
							      </li>
							      <li>
							      	<a href='#' id='close'>
							      		<span class='glyphicon glyphicon-remove'></span>
							      	</a>
							      </li>
							    </ul>
							  </div> <!-- /.navbar-collapse -->

							</div>
						"""
			src:(src,target)->
				img = $("""
									<div class='img-responsive'>
										<img class='img-thumbnail' src='#{src}'/>
									</div>
							 """)
				if target isnt '' then img.appendTo $(target) else img
# ---------------------------------- vars
	vars:(_attr,_array)->
		_attr = _attr.split '&#'
		for i in [0.._attr.length - 1]
			temp = _attr[i]
			imp = temp.split "="
			eval "temp2={"+imp[0]+":'"+imp[1]+"'}"
			$.extend eval(_array), temp2
#----------------------------------- menu
	menu:->
		x = @
		$(@html.menu).appendTo '#iz-head'
		$('div#iz-head').animate 'top':'0px'
		x.cerrar()
#-------------------------------- destroy
	cerrar:->
		$('a#close').click (e)->
			e.preventDefault()
			$('div.iz-ini').fadeOut 'fast',->
				$('body').css 'overflow':'default'
				$('div.iz-ini').remove()
#----------------------------------- head
	izhead:-> 
		@menu() 
		@cerrar()
#-------------------------------- imgzoom
	imgzoom:->
		x = @
		$(x.tar.item).click ->
			# vars
			v= {}
			$('html,body').css 'overflow':'hidden'
			if x.tar._attr isnt '' then x.vars x.tar._attr, v
			# inicio
			$(x.html.ini).appendTo 'body'
			$('div.iz-ini').fadeIn 'fast'
			# head
			x.izhead()
			# imagen
			x.html.src $(@).attr('src'), 'div#iz-img'
			$( "#iz-img > div" ).draggable();
			# footer
			$('div#iz-foot').animate 'bottom':'0px'
#----------------------------------------
	out:->
		@imgzoom()
#----------------------------------------
imgzoom = new imgzoom
	item: '.iz-zoom'
	_attr: ''
imgzoom.out()
#----------------------------------------
