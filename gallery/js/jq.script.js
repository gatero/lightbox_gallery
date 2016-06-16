/*
	@Author: Daniel Ortega
	@coffee Name: imgzoom
	@Version: 1.0
*/


(function() {
  var imgzoom;

  imgzoom = (function() {
    function imgzoom(tar) {
      this.tar = tar;
      this.html = {
        ini: "<div class='iz-ini' id='iz-bg'></div>\n<div class='iz-ini' id='iz-img'></div>\n\n<div class='iz-ini' id='iz-foot'></div>\n<div class='iz-ini' id='iz-head'></div>",
        menu: "<div class='navbar navbar-default' id='iz-menu' role='navigation'>\n  <div class='navbar-header'>\n    <button type='button' class='navbar-toggle' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1'>\n      <span class='sr-only'>Toggle navigation</span>\n      <span class='icon-bar'></span>\n      <span class='icon-bar'></span>\n      <span class='icon-bar'></span>\n    </button>							    \n		<a class='navbar-brand' href='#'> <img id='logo' src='./img/png/logo.png'/> </a>\n  </div>\n\n  <div class='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>\n    <ul class='nav navbar-nav navbar-right'>\n      <li class='active'>\n      	<a href='#'>\n      		<span class='glyphicon glyphicon-zoom-in'></span>\n      	</a>\n      </li>\n      <li>\n      	<a href='#'>\n      		<span class='glyphicon glyphicon-zoom-out'></span>\n      	</a>\n      </li>\n      <li>\n      	<a href='#'>\n      		<span class='glyphicon glyphicon-comment'></span>\n      	</a>\n      </li>\n      <li class='dropdown'>\n        <a href='#' class='dropdown-toggle' data-toggle='dropdown'><span class='glyphicon glyphicon-eye-open'></span> <b class='caret'></b></a>\n        <ul class='dropdown-menu'>\n          <li><a href='#'><span class='glyphicon glyphicon-download-alt'></span>&nbsp;Descargar</a></li>\n          <li><a href='#'><span class='glyphicon glyphicon-th'></span>&nbsp;Agregar a colecci&oacute;n</a></li>\n          <li><a href='#'><span class='glyphicon glyphicon-link'></span>&nbsp;Enviar enlace</a></li>\n          <li class='divider'></li>\n          <li><a href='#'><span class='glyphicon glyphicon-pencil'></span>&nbsp;Editar Infomaci&oacute;n</a></li>\n          <li class='divider'></li>\n          <li><a href='#'><span class='glyphicon glyphicon-trash'></span>&nbsp;Borrar</a></li>\n        </ul>\n      </li>\n      <li>\n      	<a href='#' id='close'>\n      		<span class='glyphicon glyphicon-remove'></span>\n      	</a>\n      </li>\n    </ul>\n  </div> <!-- /.navbar-collapse -->\n\n</div>",
        src: function(src, target) {
          var img;
          img = $("<div class='img-responsive'>\n	<img class='img-thumbnail' src='" + src + "'/>\n</div>");
          if (target !== '') {
            return img.appendTo($(target));
          } else {
            return img;
          }
        }
      };
    }

    imgzoom.prototype.vars = function(_attr, _array) {
      var i, imp, temp, _i, _ref, _results;
      _attr = _attr.split('&#');
      _results = [];
      for (i = _i = 0, _ref = _attr.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        temp = _attr[i];
        imp = temp.split("=");
        eval("temp2={" + imp[0] + ":'" + imp[1] + "'}");
        _results.push($.extend(eval(_array), temp2));
      }
      return _results;
    };

    imgzoom.prototype.menu = function() {
      var x;
      x = this;
      $(this.html.menu).appendTo('#iz-head');
      $('div#iz-head').animate({
        'top': '0px'
      });
      return x.cerrar();
    };

    imgzoom.prototype.cerrar = function() {
      return $('a#close').click(function(e) {
        e.preventDefault();
        return $('div.iz-ini').fadeOut('fast', function() {
          $('body').css({
            'overflow': 'default'
          });
          return $('div.iz-ini').remove();
        });
      });
    };

    imgzoom.prototype.izhead = function() {
      this.menu();
      return this.cerrar();
    };

    imgzoom.prototype.imgzoom = function() {
      var x;
      x = this;
      return $(x.tar.item).click(function() {
        var v;
        v = {};
        $('html,body').css({
          'overflow': 'hidden'
        });
        if (x.tar._attr !== '') {
          x.vars(x.tar._attr, v);
        }
        $(x.html.ini).appendTo('body');
        $('div.iz-ini').fadeIn('fast');
        x.izhead();
        x.html.src($(this).attr('src'), 'div#iz-img');
        $("#iz-img > div").draggable();
        return $('div#iz-foot').animate({
          'bottom': '0px'
        });
      });
    };

    imgzoom.prototype.out = function() {
      return this.imgzoom();
    };

    return imgzoom;

  })();

  imgzoom = new imgzoom({
    item: '.iz-zoom',
    _attr: ''
  });

  imgzoom.out();

}).call(this);
