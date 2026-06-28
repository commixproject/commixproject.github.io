;(function () {

	'use strict';

	var isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
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
	   FIX 1: SAFE FULLHEIGHT
	   ========================= */
	var fullHeight = function () {
		var setHeight = function () {
			if (!isMobile.any()) {
				$('.js-fullheight').css('height', window.innerHeight);
			} else {
				// IMPORTANT: do NOT force 100vh on mobile (fixes missing hero text)
				$('.js-fullheight').css('height', 'auto');
			}
		};

		setHeight();
		$(window).on('resize orientationchange', function () {
			setHeight();
		});
	};

	var mobileMenuOutsideClick = function () {
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

	var header = function () {
		if ($('.ubea-nav').length) {
			$('.header-fixed').css('padding-top', $('.ubea-nav').outerHeight());
		}
	};

	var navigation = function () {
		$('body').on(
			'click',
			'#ubea-offcanvas ul a:not(.external), .main-nav a:not(.external)',
			function (event) {

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

	var offcanvasMenu = function () {
		$('body').prepend('<div id="ubea-offcanvas" />');
		$('body').prepend('<a href="#" class="js-ubea-nav-toggle ubea-nav-toggle"><i></i></a>');

		var clone1 = $('.menu-1 > ul').clone();
		var clone2 = $('.menu-2 > ul').clone();

		$('#ubea-offcanvas').append(clone1);
		$('#ubea-offcanvas').append(clone2);
	};

	var burgerMenu = function () {
		$('body').on('click', '.js-ubea-nav-toggle', function (event) {
			event.preventDefault();
			$('body').toggleClass('offcanvas');
			$(this).toggleClass('active');
		});
	};

	var navActive = function (section) {
		$('.main-nav li').removeClass('active');
		$('.main-nav a[data-nav-section="' + section + '"]')
			.closest('li')
			.addClass('active');
	};

	var navigationSection = function () {
		var $section = $('div[data-section]');

		if (!$section.length) return;

		$section.waypoint(function (direction) {
			if (direction === 'down') {
				navActive($(this.element).data('section'));
			}
		}, { offset: '150px' });

		$section.waypoint(function (direction) {
			if (direction === 'up') {
				navActive($(this.element).data('section'));
			}
		}, {
			offset: function () {
				return -$(this.element).height() + 155;
			}
		});
	};

	var sliderMain = function () {

		// FIX 2: wait DOM + images ready (this fixes missing hero text)
		setTimeout(function () {

			var $flex = $('#ubea-hero .flexslider');

			if (!$flex.length) return;

			$flex.flexslider({
				animation: "fade",
				slideshowSpeed: 5000,
				directionNav: true,
				start: function () {
					$('.slider-text').addClass('animated fadeInUp');
				},
				before: function () {
					$('.slider-text').removeClass('animated fadeInUp');
				}
			});

			// FIX 3: proper mobile height handling for slider
			var setHeroHeight = function () {
				$('#ubea-hero .flexslider .slides > li').css(
					'height',
					window.innerHeight
				);
			};

			setHeroHeight();
			$(window).on('resize orientationchange', setHeroHeight);

		}, 200);
	};

	/* =========================
	   FIX 4: SAFE MODAL (MOBILE + CLONES)
	   ========================= */
	var bindSpreadModal = function () {
		$('body').on('click', '#spreadTrigger', function (e) {
			e.preventDefault();

			if (window.jQuery && $.fn.modal) {
				$('#spreadModal').modal('show');
			} else {
				$('#spreadModal').css({
					display: 'block',
					opacity: 1
				});
			}
		});
	};

	var loaderPage = function () {
		$(".ubea-loader").fadeOut("slow");
	};

	$(function () {
		fullHeight();
		mobileMenuOutsideClick();
		header();
		navigation();
		offcanvasMenu();
		burgerMenu();
		navigationSection();
		sliderMain();
		bindSpreadModal();
		loaderPage();
	});

}());