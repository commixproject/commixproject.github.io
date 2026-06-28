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

	var fullHeight = function() {
		if (!isMobile.any()) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
			var container = $("#ubea-offcanvas, .js-ubea-nav-toggle");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ($('body').hasClass('offcanvas')) {
					$('body').removeClass('offcanvas');
					$('.js-ubea-nav-toggle').removeClass('active');
				}
			}
		});
	};

	var header = function() {
		$('.header-fixed').css('padding-top', $('.ubea-nav').height());
	};

	var navigation = function() {
		$('body').on(
			'click',
			'#ubea-offcanvas ul a:not([class="external"]), .main-nav a:not([class="external"])',
			function(event){
				var section = $(this).data('nav-section');

				if ($('[data-section="' + section + '"]').length) {
					$('html, body').animate({
						scrollTop: $('[data-section="' + section + '"]').offset().top - 55
					}, 500, 'easeInOutExpo');
				}

				if ($('body').hasClass('offcanvas')) {
					$('body').removeClass('offcanvas');
					$('.js-ubea-nav-toggle').removeClass('active');
				}

				event.preventDefault();
				return false;
			}
		);
	};

	var offcanvasMenu = function() {

		$('body').prepend('<div id="ubea-offcanvas" />');
		$('body').prepend('<a href="#" class="js-ubea-nav-toggle ubea-nav-toggle"><i></i></a>');

		var clone1 = $('.menu-1 > ul').clone();
		$('#ubea-offcanvas').append(clone1);

		var clone2 = $('.menu-2 > ul').clone();
		$('#ubea-offcanvas').append(clone2);

		$('#ubea-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#ubea-offcanvas').find('li').removeClass('has-dropdown');

		$('.offcanvas-has-dropdown')
			.mouseenter(function(){
				$(this).addClass('active')
					.find('ul')
					.slideDown(500, 'easeOutExpo');
			})
			.mouseleave(function(){
				$(this).removeClass('active')
					.find('ul')
					.slideUp(500, 'easeOutExpo');
			});

		$(window).resize(function(){
			if ($('body').hasClass('offcanvas')) {
				$('body').removeClass('offcanvas');
				$('.js-ubea-nav-toggle').removeClass('active');
			}
		});
	};

	var navActive = function(section) {
		var $el = $('.main-nav > ul');
		$el.find('li').removeClass('active');

		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]')
				.closest('li')
				.addClass('active');
		});
	};

	var navigationSection = function() {
		var $section = $('div[data-section]');

		$section.waypoint(function(direction){
			if (direction === 'down') {
				navActive($(this.element).data('section'));
			}
		}, { offset: '150px' });

		$section.waypoint(function(direction){
			if (direction === 'up') {
				navActive($(this.element).data('section'));
			}
		}, {
			offset: function() {
				return -$(this.element).height() + 155;
			}
		});
	};

	var burgerMenu = function() {
		$('body').on('click', '.js-ubea-nav-toggle', function(event){
			if ($('body').hasClass('offcanvas')) {
				$('body').removeClass('offcanvas');
			} else {
				$('body').addClass('offcanvas');
			}

			$(this).toggleClass('active');
			event.preventDefault();
		});
	};

	var contentWayPoint = function() {
		var i = 0;

		$('.animate-box').waypoint(function(direction){
			if (direction === 'down' && !$(this.element).hasClass('animated-fast')) {

				i++;

				$(this.element).addClass('item-animate');

				setTimeout(function(){
					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);

						setTimeout(function(){
							var effect = el.data('animate-effect');

							if (effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						}, k * 200);
					});
				}, 100);
			}
		}, { offset: '85%' });
	};

	var dropdown = function() {
		$('.has-dropdown')
			.mouseenter(function(){
				$(this).find('.dropdown')
					.css('display', 'block')
					.addClass('animated-fast fadeInUpMenu');
			})
			.mouseleave(function(){
				$(this).find('.dropdown')
					.css('display', 'none')
					.removeClass('animated-fast fadeInUpMenu');
			});
	};

	var owlCarousel = function(){
		
		$('.owl-carousel-carousel').owlCarousel({
			items: 3,
			loop: true,
			margin: 20,
			nav: true,
			dots: true,
			smartSpeed: 800,
			navText: [
				"<i class='ti-arrow-left owl-direction'></i>",
				"<i class='ti-arrow-right owl-direction'></i>"
			],
			responsive:{
				0:{ items:1 },
				600:{ items:2 },
				1000:{ items:3 }
			}
		});

		$('.owl-carousel-fullwidth').owlCarousel({
			items: 1,
			loop: true,
			margin: 20,
			nav: true,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
			navText: [
				"<i class='ti-arrow-left owl-direction'></i>",
				"<i class='ti-arrow-right owl-direction'></i>"
			]
		});
	};

	var goToTop = function() {
		$('.js-gotop').on('click', function(event){
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');

			return false;
		});

		$(window).scroll(function(){
			if ($(window).scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}
		});
	};

	var loaderPage = function() {
		$(".ubea-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo();
	};

	var counterWayPoint = function() {
		if ($('#ubea-counter').length > 0) {
			$('#ubea-counter').waypoint(function(direction){
				if (direction === 'down' && !$(this.element).hasClass('animated')) {
					setTimeout(counter, 400);
					$(this.element).addClass('animated');
				}
			}, { offset: '90%' });
		}
	};

	var accordion = function() {
		$('.ubea-accordion-heading').on('click', function(event){
			var $this = $(this);

			$this.closest('.ubea-accordion')
				.find('.ubea-accordion-content')
				.slideToggle(400, 'easeInOutExpo');

			$this.closest('.ubea-accordion')
				.toggleClass('active');

			event.preventDefault();
		});
	};

	var sliderMain = function() {
		$('#ubea-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true
		});
	};

	// 🔥 FIX FOR MOBILE + CLONED MENU (IMPORTANT PART)
	var bindSpreadModal = function () {
		$('body').on('click', '#spreadTrigger', function (e) {
			e.preventDefault();

			if (window.jQuery && $.fn.modal) {
				$('#spreadModal').modal('show');
			} else {
				var modal = document.getElementById('spreadModal');
				if (modal) {
					modal.style.display = 'block';
					modal.classList.add('in');
				}
			}
		});
	};

	$(function(){
		fullHeight();
		mobileMenuOutsideClick();
		header();
		navigation();
		offcanvasMenu();
		burgerMenu();
		navigationSection();
		contentWayPoint();
		dropdown();
		owlCarousel();
		goToTop();
		loaderPage();
		counterWayPoint();
		accordion();
		sliderMain();
		bindSpreadModal();
	});

}());

(function(i,s,o,g,r,a,m){
	i['GoogleAnalyticsObject']=r;
	i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)
	},i[r].l=1*new Date();
	a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];
	a.async=1;
	a.src=g;
	m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-10146041-21', 'auto');
ga('send', 'pageview');