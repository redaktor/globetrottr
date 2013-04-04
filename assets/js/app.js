/* TODO - goes to dojo :: //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TWITTER
jQuery.noConflict()(function($){
	jQuery(document).ready(function () {
		JQTWEET.loadTweets();
	});
})
*/
				var $win = $(window)
				  , $nav = $('.subnav')
				  , navTop = $('.subnav').length && $('.subnav').offset().top - 40
				  , isFixed = 0
				
				processScroll()
				
				// hack sad times - holdover until rewrite for 2.1
				$nav.on('click', function () {
				  if (!isFixed) setTimeout(function () {  $win.scrollTop($win.scrollTop() - 47) }, 10)
				})
				
				$win.on('scroll', processScroll)
				
				function processScroll() {
				  var i, scrollTop = $win.scrollTop()
				  if (scrollTop >= navTop && !isFixed) {
					isFixed = 1
					$nav.addClass('subnav-fixed')
				  } else if (scrollTop <= navTop && isFixed) {
					isFixed = 0
					$nav.removeClass('subnav-fixed')
				  }
				}

jQuery.noConflict()(function($){
	$(document).ready(function ()
	{ 	
		$("#ajax-contact-form").submit(function ()
		{
			var str = $(this).serialize();
			$.ajax(
			{
				type: "POST",
				url: "contact.php",
				data: str,
				success: function (msg)
				{
					$("#note").ajaxComplete(function (event, request, settings)
					{
						if (msg == 'OK')
						{
							result = '<div class="notification_ok">Message was sent to website administrator, thank you!</div>';
							$("#fields").hide();
						}
						else
						{
							result = msg;
						}
						$(this).html(result);
					});
				}
			});
			return false;
		});
		if(window.pageYOffset == 0){ $(".subnav").removeClass("subnav-fixed"); }
		$(document).one("scroll", function() { $(".subnav").addClass("subnav-fixed"); })
	});
});
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// end todo //
require([ 	"dojo/_base/declare", 
			"dojo/_base/lang", 
			"dojo/_base/fx",			 
			"dojox/mobile", 
			"dojox/mobile/compat",
			"dojox/mobile/parser", 
			"dojox/mobile/deviceTheme", 
			"dojox/mobile/View",
			"dojox/mobile/Button", 
			"dojox/mobile/RadioButton", 
			"dojox/mobile/Switch", 
			"dojox/mobile/CheckBox", 
			"dojo/fx", 
			"dojo/fx/easing", 
			"dojo/router", 
			"dojo/window", 
			"dojo/request", 
			"dojo/request/script", 
			"dojo/Deferred", 
			"dojo/DeferredList", 
			"dojo/dom", 
			"dojo/dom-construct", 
			"dojo/dom-geometry", 
			"dojo/dom-attr", 
			"dojo/dom-style", 
			"dojo/dom-class",
			"dojo/NodeList-dom", 
			"dojo/NodeList-fx", 
			"dojo/on", 
			"dojo/query", 
			"dojo/json",
			"dojo/keys", 
			"dojo/mouse", 
			
			"dojo/domReady!",
			//"http://maps.google.com/maps/api/js?sensor=false",
			_base+"assets/js/google-code-prettify/prettify.js", 
			_base+"assets/js/bootstrap-transition.js", 
			_base+"assets/js/bootstrap-alert.js", 
			_base+"assets/js/bootstrap-modal.js", 
			_base+"assets/js/bootstrap-dropdown.js", 
			_base+"assets/js/bootstrap-scrollspy.js", 
			_base+"assets/js/bootstrap-tab.js", 
			_base+"assets/js/bootstrap-tooltip.js", 
			_base+"assets/js/bootstrap-popover.js", 
			_base+"assets/js/bootstrap-button.js", 
			_base+"assets/js/bootstrap-collapse.js", 
			_base+"assets/js/bootstrap-carousel.js", 
			_base+"assets/js/bootstrap-typeahead.js", 
			_base+"assets/js/jquery.easing.1.3.js", 
			_base+"assets/js/jquery.nivo.slider.js", 
			_base+"assets/js/jquery.prettyPhoto.js", 
			_base+"assets/js/twitter.js", 
			_base+"assets/js/jquery.waitforimages.js", 
			_base+"assets/js/jquery.isotope.min.js", 
			_base+"assets/js/testimonialrotator.js", 
			_base+"assets/js/slides.min.jquery.js", 
			_base+"assets/js/jquery.preloader.js", 
	//		"assets/js/jquery.gmap.min.js", 
	//		"http://platform.twitter.com/widgets.js"

			],
    			function(
					declare, 
					lang, 
					baseFX,
					mobile, 
					mobileCompat,
					mobileParser, 
					mobileDeviceTheme, 
					mobileView, 
					mobileButton, 
					mobileRadioButton, 
					mobileSwitch, 
					mobileCheckBox,  
					fx, 
					fxe, 
					router, 
					win, 
					request, 
					script, 
					deferred, 
					deferredList, 
					dom, 
					domConstruct, 
					domGeo, 
					domAttr, 
					style, 
					css, 
					nl, 
					nlfx,
					on, 
					query, 
					json, 
					keys, 
					mouse
				) {
		
		declare('globe', [], {
			// summary:
			//	globetrottr website wrapped in a basic dojo module
			navcontainer:	{},
			navlinks:		[],
			views:			{},
			viewId:			'home',
			viewBefore:		{},
			viewActive:		{},
			
			constructor : 	function(){
				var that = this;

				this.navcontainer		= query('.container .subnav .nav')[0];
				this.navlinks 			= query('.container .subnav .nav li.n a');
				// Make pages
				query('.page').forEach(function(s,i){
					/* dynamic view */
					var _view = new mobileView({ id: s.id }, s);
					_view.startup();
					that.views[s.id] = _view;
				});
				
				
				// REGISTER OUR ROUTER TO SERVE AJAX LINKS, like 					http://.../#!/stories/
				var id = '';
				var hash = ''
				
				this.viewActive = this.views['home'];
				router.register("!/:id", function(evt){
					//query('.imgOut').style('opacity', 1).removeClass('imgOut');
					if(evt.params.id.indexOf('#')>-1){ var _ids = evt.params.id.split('#'); id = _ids[0]; hash = _ids[1]; } else { id = evt.params.id; hash = ''; }
					if(evt.params.id.indexOf('__')>-1){ var _ids = evt.params.id.split('__'); id = _ids[0]; hash = _ids[1]; } else { id = evt.params.id; hash = ''; }				
					if(evt.params.id==that.viewId){ return; }
					
					that.navchange(id);
					console.log( that.viewActive );
					var dir = 1
					if(that.viewBefore == that.views[id]){ dir = -1; }
					that.viewBefore = that.viewActive;
					that.viewActive.performTransition(id, dir,'fade',null);
					that.viewId = id;
					that.viewActive = that.views[id];
					
				});
				
								

				// REGISTER OUR ROUTER TO SERVE AJAX LINKS FOR GALLERIES, like 		http://.../#!/stories/01_Gun-City--Besuch-in-Darra-Adam-Khel/1
//				router.register("!/stories/:id/:pic", 	function(evt){ that.picId = evt.params.pic; that.galGOTO(evt.params, 'stories'); });
//				router.register("!/portraits/:id/:pic", function(evt){ that.picId = evt.params.pic; that.galGOTO(evt.params, 'portraits'); });
				router.startup();
				
				if (this.isHome() == true){ window.location.href = window.location.href+'#!/home'; }
				
				
				
				
				
					var captions = {
						tipi: '<h4><i class="icon-lightbulb icon-4x pull-left icon-muted"></i> smoke signals are enabled</h4>'+
                        '	<ul>'+
                        '    	<li><i class="green icon-ok-circle"></i> public stream aka blog</li>'+
                        '        <li><i class="green icon-ok-circle"></i> public messages</li>'+
                        '       <li><i class="green icon-ok-circle"></i> public profile</li>'+
                        '    </ul>',
						igloo: '<h4><i class="icon-lightbulb icon-4x pull-left icon-muted"></i> ... until the ice breaks</h4>'+
                        '	<ul>'+
                        '    	<li><i class="magenta icon-remove-circle"></i> no public stream aka blog</li>'+
                        '        <li><i class="magenta icon-remove-circle"></i> no public messages</li>'+
                        '       <li><i class="green icon-ok-circle"></i> public profile</li>'+
                        '    </ul>',
						camou: '<h4><i class="icon-lightbulb icon-4x pull-left icon-muted"></i> +++ classified +++</h4>'+
                        '	<ul>'+
                        '    	<li><i class="magenta icon-remove-circle"></i> private only, no public frontend</li>'+
						'		<li>&nbsp;</li><li>&nbsp;</li>'+
                        '    </ul>'
					};
					var pp = domConstruct.place(domConstruct.toDom('<div class="span5 settings"></div>'), dom.byId('settingsform'), 'last');
					var bp = domConstruct.place(domConstruct.toDom('<div class="btn-group">'), pp, 'last');
                    var b0 = domConstruct.place(domConstruct.toDom('<div class="btn btn-small btn-inverse tipi active"><i></i><h4>Tipi</h4></div>'), bp, 'last');
                    var b1 = domConstruct.place(domConstruct.toDom('<div class="btn btn-small btn-inverse igloo"><i></i><h4>Igloo</h4></div>'), bp, 'last');
                    var b2 = domConstruct.place(domConstruct.toDom('<div class="btn btn-small btn-inverse camou"><i></i><h4>Camou</h4></div>'), bp, 'last');
                    var caption = domConstruct.create("div", null, pp, 'last');
					domAttr.set(caption, "innerHTML", captions.tipi);
					
					on(b0, 'mouseover', function(){ domAttr.set(caption, "innerHTML", captions.tipi); });
					on(b1, 'mouseover', function(){ domAttr.set(caption, "innerHTML", captions.igloo); });
					on(b2, 'mouseover', function(){ domAttr.set(caption, "innerHTML", captions.camou); });
					
					pp = domConstruct.place(domConstruct.toDom('<div class="span4 options"></div>'), dom.byId('optionsform'), 'last');
					var cbp = domConstruct.place(domConstruct.toDom('<div class="pull-left"></div>'), pp, 'last');
					var cb = new dojox.mobile.CheckBox({ checked: true }, cbp);
					var l = domConstruct.place(domConstruct.toDom('<h4 class="cblabel">enable socialbots</h4>'), pp, 'last');
					domConstruct.place(domConstruct.toDom('<div class="clearboth">'), pp, 'last');

					var cbp = domConstruct.place(domConstruct.toDom('<div class="pull-left"></div>'), pp, 'last');
					var cb = new dojox.mobile.CheckBox({ checked: false }, cbp);
					var l = domConstruct.place(domConstruct.toDom('<h4 class="cblabel">do another foo</h4>'), pp, 'last');
					domConstruct.place(domConstruct.toDom('<div class="clearboth">'), pp, 'last');
									
					var se = domConstruct.place(domConstruct.toDom('<select><option value="fade">fade pages</option><option value="flip">flip pages</option><option value="none">no animation</option></select>'), 
											pp, 'last');
				
				// Parse the page for mobile widgets!
        		mobileParser.parse();
				query('.outercontainer').style('opacity', 1);
			},
			
			isHome : 		function(){
			// summary:
			//		normalize home path
				var p = router._currentPath;
				console.log(router);
				if (typeof(p) == 'undefined' || p == '' || p == '!/' || p == '!/home'){ 
					return true;
				} else {
					return false;
				}
			},

			navchange:		function(id){
				this.navlinks.removeClass('active');
				if( dom.byId('n_'+id) ){
					css.add(dom.byId('n_'+id), 'active');	
				} else {
					// TODO : send 404 request  ( or nice message + redirect )
					alert('page not found');
				}
			}
			
			
		});

		new globe();
		
		
		
		jQuery.noConflict()(function($){
			$(document).ready(function() {  
				$("a[rel^='prettyPhoto']").prettyPhoto({opacity:0.80,default_width:200,default_height:344,theme:'facebook',hideflash:false,modal:false});
				$('#slider').nivoSlider();
				$(".testimonialrotator").testimonialrotator({
					settings_slideshowTime:2
				});
				$('#slides').slides({
					preload: true,
					preloadImage: 'assets/img/spinner-trans.gif',
					next: 'next',
					prev: 'prev',
					generatePagination: false
					
				});
				// FILTERING - ISOTOPE
				//**********************************
				var $container = $('#portfolio');
						
				if($container.length) {
					$container.waitForImages(function() {
						
						// initialize isotope
				
					 $container.isotope({
					  itemSelector : '.block',
					  masonry : {
						//columnWidth : 120
						columnWidth : 1,
						gutterWidth: 1,
					  },
					  masonryHorizontal : {
						rowHeight: 120
					  },
					  cellsByRow : {
						columnWidth : 240,
						rowHeight : 240
					  },
					  cellsByColumn : {
						columnWidth : 240,
						rowHeight : 240
					  }});
						// filter items when filter link is clicked
						$('#filters button').click(function(){
						  var selector = $(this).attr('data-filter');
						  $container.isotope({ filter: selector });
						  $(this).removeClass('btn-inverse').addClass('btn-info').siblings().removeClass('btn-info').addClass('btn-inverse');
						  return false;
						});
						
					},null,true);
				}
			});
		});
    }
);