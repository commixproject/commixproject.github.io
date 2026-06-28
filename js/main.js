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
	   HEADER FIX (SAFE HEIGHT)
	   ========================= */
	var header = function() {
		if ($('.ubea-nav').length) {
			$('.header-fixed').css('padding-top', $('.ubea-nav').outerHeight());
		}
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
						scrollTop: $('[data-section="' + section + '"]').offset().top - 55
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
		var clone2 = $('.menu-2 > ul').clone();

		$('#ubea-offcanvas').empty().append(clone1).append(clone2);
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

			$(window).on('resize orientationchange', function(){
				setHero();
				$flex.resize();
			});

		}, 150);

	};

	/* =========================
	   DROPDOWN
	   ========================= */
	var dropdown = function() {

		$('.has-dropdown').hover(
			function(){
				$(this).find('.dropdown')
					.css('display','block')
					.addClass('animated-fast fadeInUpMenu');
			},
			function(){
				$(this).find('.dropdown')
					.css('display','none')
					.removeClass('animated-fast fadeInUpMenu');
			}
		);

	};

	/* =========================
	   OWL CAROUSEL
	   ========================= */
	var owlCarousel = function(){

		$('.owl-carousel-carousel').owlCarousel({
			items: 3,
			loop: true,
			margin: 20,
			nav: true,
			dots: true,
			smartSpeed: 800,
			responsive:{
				0:{items:1},
				600:{items:2},
				1000:{items:3}
			}
		});

		$('.owl-carousel-fullwidth').owlCarousel({
			items: 1,
			loop: true,
			nav: true,
			dots: true,
			smartSpeed: 800
		});

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
	   COUNTER
	   ========================= */
	var counterWayPoint = function() {
		if ($('#ubea-counter').length) {
			$('#ubea-counter').waypoint(function(direction){
				if (direction === 'down' && !$(this.element).hasClass('animated')) {
					$('.js-counter').countTo();
					$(this.element).addClass('animated');
				}
			}, { offset: '90%' });
		}
	};

	/* =========================
	   ACCORDION
	   ========================= */
	var accordion = function() {
		$('.ubea-accordion-heading').on('click', function(e){
			e.preventDefault();

			var $acc = $(this).closest('.ubea-accordion');

			$acc.find('.ubea-accordion-content').slideToggle(300);
			$acc.toggleClass('active');
		});
	};

	/* =========================
	   🔥 MODAL FIX (IMPORTANT)
	   ========================= */
	var bindSpreadModal = function () {

		$('body').on('click', '#spreadTrigger', function(e){
			e.preventDefault();

			var $modal = $('#spreadModal');

			if (!$modal.length) return;

			// Bootstrap modal if exists
			if (typeof $.fn.modal === 'function') {
				$modal.modal('show');
			} else {
				$modal.fadeIn(200).addClass('open');
			}
		});

	};

	/* =========================
	   INIT
	   ========================= */
	$(function(){
		fullHeight();
		mobileMenuOutsideClick();
		header();
		navigation();
		offcanvasMenu();
		burgerMenu();
		navigationSection();
		sliderMain();
		dropdown();
		owlCarousel();
		goToTop();
		loaderPage();
		counterWayPoint();
		accordion();
		bindSpreadModal();
	});

}());