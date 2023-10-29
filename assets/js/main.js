(function ($) {
	"use strict";

	// custom js

	//responsive menu	
	const bars = document.querySelector('.res-bars')
	const resSearchBtn = document.querySelector('.res-search-btn')
	const filterOpen = document.querySelector('.filter-open')
	const resMenu = document.querySelector('.sidebar-menu')
	const searchBox = document.querySelector('.search-box')
	const galleryFilterBtn = document.querySelector('.gallery-filter-btn')

	togglActiveClass(bars, resMenu)
	togglActiveClass(resSearchBtn, searchBox)
	togglActiveClass(filterOpen, galleryFilterBtn)
	function togglActiveClass(btn, item) {
		btn.addEventListener('click', ()=>{
			item.classList.toggle('active')
			btn.classList.toggle('active')
		})
	}



	// custom input animation

	function searchBoxAnimation() {
	   const searchinput = document.querySelector('.search-input-item input')
	   const searchinputLabel = document.querySelector('.search-input-item label')
		let searchinputWidth = searchinput.clientWidth;

		if (window.matchMedia("(max-width: 1500px)").matches) {
			searchinputWidth = 100;
		}
		if (window.matchMedia("(min-width: 1500px)").matches) {
			searchinputWidth = 135;
		}
		searchinput.style.maxWidth = `${searchinputWidth}px`;
		searchinputLabel.style.width = `${searchinputWidth}px`;

		searchinput.addEventListener('focus', ()=>{
			searchinput.parentElement.previousElementSibling.classList.add('active');
			searchinput.style.maxWidth = '100%';
			searchinputLabel.style.width = '100%';
		})
		searchinput.addEventListener('focusout', ()=>{
			searchinput.parentElement.previousElementSibling.classList.remove('active');
			searchinput.style.maxWidth = `${searchinputWidth}px`;
			searchinputLabel.style.width = `${searchinputWidth}px`;
	
		})
	}




	//  btn click , hide parent div
	const galleryAllButtons = 	document.querySelectorAll('.gallery-filter-btn button')
	const menuLinks = 	document.querySelectorAll('.sidebar-menu .mainmenu ul li a')

	galleryAllButtons.forEach(btn => {
		btn.addEventListener('click', ()=>{
			filterOpen.classList.remove('active')
			galleryFilterBtn.classList.remove('active')
		})
	});

	menuLinks.forEach(link => {
		link.addEventListener('click', ()=>{
			bars.classList.remove('active')
			resMenu.classList.remove('active')
		})
	});

	// for about gallery img
	const about4thImg = document.querySelector('.about-upper-img-wrap img:nth-child(4)')
	const about5thImg = document.querySelector('.about-upper-img-wrap img:nth-child(5)')
	window.addEventListener('load', ()=>{
		PlaceImgs(about4thImg);
		searchBoxAnimation();
	})
	window.addEventListener('resize', ()=>{
		PlaceImgs(about4thImg);
		searchBoxAnimation();
	})
	function PlaceImgs(item) {
		let prevAll = [];
		let y = 0;
		let x = item;
		let z = item.getBoundingClientRect().width;
		while (item = item.previousElementSibling){
			prevAll.push(item);
		};
		for (let i = 0; i < prevAll.length; i++) {
			y += prevAll[i].getBoundingClientRect().width
		};
		x.style.left = `${y - z}px`;
		about5thImg.style.left = `${y}px`;
	}
	


	/*=========================
	PRELOADER JS
	===========================*/
	$(window).on('load', function (event) {
		$('.preloader').delay(500).fadeOut(500);
	});

	// One Page Nav
	var top_offset = $('.header-area').height() - 170;
	$('.mainmenu ul, .sidebar-menu ul, .footer-links ul').onePageNav({
		scrollOffset: top_offset,
	});


	// sticky
	var wind = $(window);
	var sticky = $('.header-area');
	wind.on('scroll', function () {
		var scroll = wind.scrollTop();
		if (scroll < 100) {
			sticky.removeClass('sticky');
		} else {
			sticky.addClass('sticky');
		}
	});

	/*=========================
	Hero-slider SLIDER JS
	===========================*/
	function heroSlider() {
		var BasicSlider = $('.hero-large-slider');
		BasicSlider.on('init', function (e, slick) {
			var $firstAnimatingElements = $('.single-hero-large:first-child').find('[data-animation]');
			doAnimations($firstAnimatingElements);
		});
		BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
			var $animatingElements = $('.single-hero-large[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
			doAnimations($animatingElements);
		});
		BasicSlider.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: false,
			autoplaySpeed: 10000,
			dots: false,
			fade: true,
			arrows: false,
			asNavFor: '.hero-tiny-slider',
		});

		function doAnimations(elements) {
			var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			elements.each(function () {
				var $this = $(this);
				var $animationDelay = $this.data('delay');
				var $animationType = 'animated ' + $this.data('animation');
				$this.css({
					'animation-delay': $animationDelay,
					'-webkit-animation-delay': $animationDelay
				});
				$this.addClass($animationType).one(animationEndEvents, function () {
					$this.removeClass($animationType);
				});
			});
		}
	}
	heroSlider();
	
	 $('.hero-tiny-slider').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		asNavFor: '.hero-large-slider',
		focusOnSelect: true,
		arrows: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-alt-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-alt-right"></i></button>',
		responsive: [{
			breakpoint: 1024,
			settings: {
				slidesToShow: 2,
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
				}
			}
		]
	 });




	/*=========================
	active-product-info-slider
	===========================*/

	function productSlider() {
		var BasicSlider = $('.active-product-info-slider');
		BasicSlider.on('init', function (e, slick) {
			var $firstAnimatingElements = $('.single-product-info-slider:first-child').find('[data-animation]');
			doAnimations($firstAnimatingElements);
		});
		BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
			var $animatingElements = $('.single-product-info-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
			doAnimations($animatingElements);
		});
		BasicSlider.slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			arrows: false,
			prevArrow: '<button type="button" class="slick-prev"><i class="far fa-arrow-left"></i></button>',
			nextArrow: '<button type="button" class="slick-next"><i class="far fa-arrow-right"></i></button>',
	
			responsive: [{
					breakpoint: 1024,
					settings: {
						slidesToShow: 1,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						arrows: false,
					}
				}
			]
		});

		function doAnimations(elements) {
			var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			elements.each(function () {
				var $this = $(this);
				var $animationDelay = $this.data('delay');
				var $animationType = 'animated ' + $this.data('animation');
				$this.css({
					'animation-delay': $animationDelay,
					'-webkit-animation-delay': $animationDelay
				});
				$this.addClass($animationType).one(animationEndEvents, function () {
					$this.removeClass($animationType);
				});
			});
		}
	}
	productSlider();



	/*=========================
	category-active-slider
	===========================*/
	$('.category-active-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
		prevArrow: '<button type="button" class="slick-prev"><i class="far fa-arrow-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="far fa-arrow-right"></i></button>',

		responsive: [{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 3,
					arrows: true,
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
					arrows: true,
				}
			}
		]
	});
	
	

	/*=========================
	res-offer-active-slider
	===========================*/
	$('.res-offer-active-slider').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="far fa-arrow-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="far fa-arrow-right"></i></button>',

		responsive: [{
			breakpoint: 991,
			settings: {
				slidesToShow: 3,
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 2,
			}
		}
	]

	});


	/*=========================
	active-shop-slider
	===========================*/
	$('.active-shop-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		prevArrow: '<button type="button" class="slick-prev"><i class="far fa-arrow-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="far fa-arrow-right"></i></button>',

		responsive: [{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
				}
			}
		]
	});

	/*=========================
	active-client-slider
	===========================*/
	$('.active-client-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		centerMode: true,
		centerPadding: '0',
		prevArrow: '<button type="button" class="slick-prev"><i class="far fa-arrow-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="far fa-arrow-right"></i></button>',

		responsive: [{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
				}
			}
		]
	});


	// counting date function
	// Set the date we're counting down to
		var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();
		const PreviewDate = document.querySelector('.date')
		const PreviewHour = document.querySelector('.hour')
		const PreviewMin = document.querySelector('.min')
		const PreviewSec = document.querySelector('.sec')

		// Update the count down every 1 second
		var x = setInterval(function() {

		// Get today's date and time
		var now = new Date().getTime();

		// Find the distance between now and the count down date
		var distance = countDownDate - now;

		// Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		// Display the result in the element with id="demo"
		PreviewDate.innerHTML = days;
		PreviewHour.innerHTML = hours;
		PreviewMin.innerHTML = minutes;
		PreviewSec.innerHTML = seconds;

		// If the count down is finished, write some text
		if (distance < 0) {
			clearInterval(x);
			PreviewDate.innerHTML = "00";
			PreviewHour.innerHTML = "00";
			PreviewMin.innerHTML = "00";
			PreviewSec.innerHTML = "00";
		}
		}, 1000);




	/*<===isotop==>*/
	//change the active class on btn
	$('.gallery-img-wrapper').imagesLoaded( function() {
		// init Isotope
		var $grid = $('.gallery-img-wrapper').isotope({
			itemSelector: '.gallery-item',
			layoutMode: 'fitRows'
		});
		// filter items on button click
		$('.gallery-filter-btn').on( 'click', 'button', function() {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({ filter: filterValue });
		})
	});
	const filterBtn = document.querySelectorAll('.gallery-filter-btn button')
	filterBtn.forEach(btn => {
		btn.addEventListener('click', ()=>{
			for (let i = 0; i < filterBtn.length; i++) {
				filterBtn[i].classList.remove('active')
			}
			btn.classList.add('active')
		})
	});









	/*=========================
	magnificPopup image JS
	===========================*/
	$('.work-process-video a, .video-btn, .video-icon').magnificPopup({
		type: 'iframe'
	});

	//magnificPopup img view 
	$(".quick-view").magnificPopup({
		type: "image",
		gallery: {
		enabled: true,
		},
	});

	    /*=========================
    NICE-SELECT JS
    ===========================*/
    $('select').niceSelect();



	/*=========================
	SCROLL-UP JS
	===========================*/
	$.scrollUp({
		scrollName: 'scrollUp', // Element ID
		topDistance: '300', // Distance from top before showing element (px)
		topSpeed: 300, // Speed back to top (ms)
		animation: 'fade', // Fade, slide, none
		animationInSpeed: 200, // Animation in speed (ms)
		animationOutSpeed: 200, // Animation out speed (ms)
		scrollText: '<i class="far fa-angle-up"></i>', // Text for element
		activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
	});

	/*=========================
	AOS JS
	===========================*/
	AOS.init({
		disable: "mobile", // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
		offset: 120, // offset (in px) from the original trigger point
		delay: 0, // values from 0 to 3000, with step 50ms
		duration: 1000, // values from 0 to 3000, with step 50ms
		easing: 'ease', // default easing for AOS animations
		once: true, // whether animation should happen only once - while scrolling down
	});

	
})(jQuery);