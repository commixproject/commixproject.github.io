;(function () {

	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (
				isMobile.Android() ||
				isMobile.BlackBerry() ||
				isMobile.iOS() ||
				isMobile.Opera() ||
				isMobile.Windows()
			);
		}
	};

	/* =========================
	   FULL HEIGHT (SAFE)
	   ========================= */
	var fullHeight = function() {

		var setHeight = function () {
			if (!isMobile.any()) {
				$('.js-fullheight').css('height', $(window).height());
			} else {
				$('.js-fullheight').css('min-height', $(window).height());
			}
		};

		setHeight();
		$(window).on('resize orientationchange', setHeight);
	};

	/* =========================
	   OUTSIDE CLICK MENU FIX
	   ========================= */
	var mobileMenuOutsideClick = function() {

		$(document).on('click', function (e) {
			var container = $("#ubea-offcanvas, .js-ubea-nav-toggle");

			if (!container.is(e.target) && container.has(e.target).length === 0) {
				$('body').removeClass('offcanvas');
				$('.js-ubea-nav-toggle').removeClass('active');
			}
		});

	};

	/* =========================
	   NAVIGATION
	   ========================= */
	var navigation = function() {

		$('body').on('click',
			'#ubea-offcanvas ul a:not(.external), .main-nav a:not(.external)',
			function(event){

				var section = $(this).data('nav-section');

				if ($('[data-section="' + section + '"]').length) {
					$('html, body').animate({
						scrollTop: $('[data-section="' + section + '"]').offset().top - $('.ubea-nav').outerHeight()
					}, 500, 'easeInOutExpo');
				}

				$('body').removeClass('offcanvas');
				$('.js-ubea-nav-toggle').removeClass('active');

				event.preventDefault();
			}
		);

	};

	/* =========================
	   OFFCANVAS MENU (SAFE CLONE)
	   ========================= */
	var offcanvasMenu = function() {

		if ($('#ubea-offcanvas').length === 0) {
			$('body').prepend('<div id="ubea-offcanvas" />');
			$('body').prepend('<a href="#" class="js-ubea-nav-toggle ubea-nav-toggle"><i></i></a>');
		}

		var clone1 = $('.menu-1 > ul').clone();

		$('#ubea-offcanvas').empty().append(clone1);
	};

	/* =========================
	   BURGER MENU
	   ========================= */
	var burgerMenu = function() {

		$('body').on('click', '.js-ubea-nav-toggle', function(event){
			event.preventDefault();
			$('body').toggleClass('offcanvas');
			$(this).toggleClass('active');
		});

	};

	/* =========================
	   NAV ACTIVE
	   ========================= */
	var navActive = function(section) {

		$('.main-nav li').removeClass('active');

		$('.main-nav a[data-nav-section="'+section+'"]')
			.closest('li')
			.addClass('active');

	};

	/* =========================
	   SCROLL SECTION TRACKING
	   ========================= */
	var navigationSection = function() {

		var $section = $('div[data-section]');
		if (!$section.length) return;

		$section.waypoint(function(direction) {

			if (direction === 'down') {
				navActive($(this.element).data('section'));
			}

		}, { offset: '150px' });

		$section.waypoint(function(direction) {

			if (direction === 'up') {
				navActive($(this.element).data('section'));
			}

		}, {
			offset: function() {
				return -$(this.element).height() + 155;
			}
		});

	};

	/* =========================
	   FIXED FLEXSLIDER (IMPORTANT)
	   ========================= */
	var sliderMain = function() {

		setTimeout(function(){

			var $flex = $('#ubea-hero .flexslider');
			if (!$flex.length) return;

			var setHero = function () {
				var h = $(window).height();
				$('#ubea-hero').css('height', h);
				$('#ubea-hero .flexslider').css('height', h);
				$('#ubea-hero .slides > li').css('height', h);
			};

			setHero();

			$flex.flexslider({
				animation: "fade",
				slideshowSpeed: 5000,
				directionNav: true,
				smoothHeight: false,
				prevText: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
				nextText: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',

				start: function(){
					$('.slider-text').addClass('animated fadeInUp');
				},

				before: function(){
					$('.slider-text').removeClass('animated fadeInUp');
				},

				after: function(){
					$('.slider-text').addClass('animated fadeInUp');
				}
			});

			// flexslider rebinds its own metrics on resize: only the height is ours
			$(window).on('resize orientationchange', setHero);

		}, 150);

	};

	/* =========================
	   GO TOP
	   ========================= */
	var goToTop = function() {

		$('.js-gotop').on('click', function(e){
			e.preventDefault();
			$('html, body').animate({ scrollTop: 0 }, 500);
		});

		$(window).on('scroll', function(){
			$('.js-top').toggleClass('active', $(window).scrollTop() > 200);
		});

	};

	/* =========================
	   LOADER
	   ========================= */
	var loaderPage = function() {
		$(".ubea-loader").fadeOut("slow");
	};

	/* =========================
	   INIT
	   ========================= */
	$(function(){
		fullHeight();
		mobileMenuOutsideClick();
		navigation();
		offcanvasMenu();
		burgerMenu();
		navigationSection();
		sliderMain();
		goToTop();
		loaderPage();
	});

}());
