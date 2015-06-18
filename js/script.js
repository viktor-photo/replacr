// Main JS

var App = {
	init: function() {

		$(document).foundation();

		this.fancySelect();				// Fancy select init
		this.menuToggle();				// Sidebar menu toggle
		this.settingsMenuTrigger();		// Settings menu trigger
		this.sidebarHeight();			// Sidebar full height fix
		this.headerForm();				// Shorten URL header form
		this.headerAccountLinks();		// Header account link class toggle
		this.browserWidth();			// Check browser width and apply corresponding class to sidebar
		this.tabs();					// Tabs driver
		this.tooltip();					// Tooltips init
		this.editBillingAddress();		// Function to edit billing address fields
		this.choosePaymentMethod();		// Choose payment method on account settings page
		this.closeSection();			// Function to close section
		this.equalHeights();			// Equal heights divs
		this.tiers();					// Tiers
		this.subheader();				// Sub-header
		this.slider();					// Slider's init
	},


	// Custom select
	fancySelect: function(){
		if($('.fancy-select').length){
			$('.fancy-select').fancySelect();
		}

		// Customized list output for language select
		if($('select#language').length){
			$('#language').fancySelect({
				optionTemplate: function(optionEl) {
					return '<span><i class="lang-icon icon-' + optionEl.data('icon') + '"></i>' + optionEl.text() + '</span>';
				}
			})
		}

		// Customized list output for withdraw metod form
		if($('select#withdraw-method').length){
			$('#withdraw-method').fancySelect({
				optionTemplate: function(optionEl) {
					return '<span><i class="method-icon icon-' + optionEl.data('method') + '"></i>' + optionEl.text() + '</span>';
				}
			})
		}
	},


	// Menu Toggle
	menuToggle: function(){
		var trigger = $('#menu-trigger-wrap'),
			sidebar = $('#sidebar');

		trigger.on('click', function(){
			// $(this).toggleClass('active');
			if(sidebar.hasClass('narrow')){
				sidebar.removeClass('narrow').addClass('wide');
			} else {
				sidebar.removeClass('wide').addClass('narrow');
			}
		});
	},


	// Settings Menu Trigger
	settingsMenuTrigger: function(){
		var trigger = $('#settings-link');

		trigger.on('click', function(){
			$(this).toggleClass('active');
		});
	},


	// Full height sidebar
	sidebarHeight: function(){
		function resize(){
			$('#sidebar').height($('main').outerHeight());
		}

		$(window).resize(resize);

		resize();

		setTimeout(resize, 300);
	},


	// Header shorten url form
	headerForm: function(){
		var base = $('#shorten-url-form'),
			input = base.find('input');

		base.on('click', function(){
			$(this).addClass('active');

			setTimeout(function() {
				input.focus();
			}, 100);
		});

		input.on('blur', function(){
			if(!(input.val()).length){
				base.removeClass('active');
			}
		});
	},


	// Header account link class toggle
	headerAccountLinks: function(){
		var link = $('header .account-settings a');

		link.on('click', function(){
			$(this).closest('div').toggleClass('active');
		});
	},


	// Check browser width and apply corresponding class to sidebar
	browserWidth: function(){
		function resize() {
			if ($(window).width() < 768) {
				$('#sidebar').removeClass('wide').addClass('narrow');
			}
			else {
				$('#sidebar').removeClass('narrow').addClass('wide');
			}
		}
		$(window).resize(resize);
		resize();
	},

	// Tabs driver
	tabs: function(){

		var tabToggler = $('.tab-triggers span');

		$('.tab.active').show().siblings().hide();

		$(tabToggler).on('click', function(e) {
			e.preventDefault();
			var currentAttrValue = $(this).attr('data-tab');

			$('#'+currentAttrValue).addClass('active slideUp').show().siblings('.tab').hide().removeClass('active slideUp');
			$(tabToggler).not(this).removeClass('active');
			$(this).addClass('active');

			$('.tab-item-title').removeClass('active')
			$('.tab.active').prev('span').addClass('active');
		});

		// Convert tabs to accordeon
		function convertTabs(){
			var count = 1;

			$('.tab').each(function(index, el) {
				var tabText = $('.tab-triggers span:nth-child(' + count + ')').text();

				$(this).wrapInner('<div class="tab-item-wrap"></div>').before('<span class="tab-item-title">' + tabText + '</span>');

				count ++;
			});

			$('.tab.active').prev('span').addClass('active');

			$('.tab-item-title').off().on('click', function(){
				$('.tab').slideUp().removeClass('active');
				$(this).addClass('active').siblings('.tab-item-title').removeClass('active');
				$(this).next('.tab').slideDown().addClass('active');


				(function updateActiveTabTrigger(){
					var newActiveTab = $('.tab.active').attr('id');

					tabToggler.removeClass('active');
					$('span[data-tab="' + newActiveTab + '"]').addClass('active');

					// console.log('data-tab="' + newActiveTab + '"');
				})();

			});
		}
		convertTabs();
	},

	// Tooltip
	tooltip: function(){
		$('.tip').tipso({
			background: '#2ecc71',
		});
	},


	// Billing fields
	editBillingAddress: function(){
		var base = $('.billing-section'),
			fields = base.find('input[type="text"]'),
			button = $('#edit-billing-info');

		if(base.length){
			button.on('click', function(){
				fields.removeClass().removeAttr('disabled');
				fields.first().focus();
				return false;
			});
		}
	},


	// Choose payment method
	choosePaymentMethod: function(){
		var base = $('#payment-methods-form'),
			radio = base.find('.payment-methods input[type="radio"]'),
			forms = base.find('.payment-method-forms');

		radio.on('change', function(){

			var that = $(this).attr("id");

			forms.find('.row').hide();

			if(that=="method-1"){
				forms.find('.paypal-method').fadeIn();
			} else if(that=="method-2"){
				forms.find('.bitcoin-method').fadeIn();
			} else if(that=="method-3"){
				forms.find('.sepa-method').fadeIn();
			} else if(that=="method-4"){
				forms.find('.wire-method').fadeIn();
			}

			App.sidebarHeight();
		});


		$(document).on('ready', function(){

			var active = $('.payment-methods input[type="radio"]:checked').attr('id');

			if(active=="method-1"){
				forms.find('.paypal-method').fadeIn();
			} else if(active=="method-2"){
				forms.find('.bitcoin-method').fadeIn();
			} else if(active=="method-3"){
				forms.find('.sepa-method').fadeIn();
			} else if(active=="method-4"){
				forms.find('.wire-method').fadeIn();
			}

			App.sidebarHeight();
		});
	},


	// Function to close section
	closeSection: function(){
		var section = $('.has-close-btn'),
			close = section.find('.close-btn');

		if(section.length){
			close.on('click', function(){
				console.log('test');
				$(this).closest(section).slideUp();
			});
		}
	},


	// Equal heights divs
	equalHeights: function(){
		equalheight = function(container){

			var currentTallest = 0,
				currentRowStart = 0,
				rowDivs = new Array(),
				$el,
				topPosition = 0;
			$(container).each(function() {

				$el = $(this);
				$($el).height('auto')
				topPostion = $el.position().top;

				if (currentRowStart != topPostion) {
					for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
						rowDivs[currentDiv].height(currentTallest);
					}
					rowDivs.length = 0; // empty the array
					currentRowStart = topPostion;
					currentTallest = $el.height();
					rowDivs.push($el);
				} else {
					rowDivs.push($el);
					currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
				}

				for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
					rowDivs[currentDiv].height(currentTallest);
				}
			});
		}

		$(window).load(function() {
			equalheight('.equal');
			equalheight('.equal-1');
			equalheight('.equal-2');
			equalheight('.stats-widget');
		});


		$(window).resize(function(){
			equalheight('.equal');
			equalheight('.equal-1');
			equalheight('.equal-2');
			equalheight('.stats-widget');
		});
	},


	// Tiers
	tiers: function(){
		var tierTrigger = $('.tier-name'),
			tierContent = $('.tier-content'),
			input = tierContent.find('.t-row input[type="text"]');

		tierTrigger.on('click', function() {
			tierTrigger.removeClass('active');
			tierContent.slideUp('normal').removeClass('expanded');
			if($(this).next().is(':hidden') == true) {
				$(this).addClass('active');
				$(this).next().slideDown('normal').addClass('expanded');
			}

			// Check height of content and apply corresponding height to the sidebar
			App.sidebarHeight();
		});

		$('.tier-name.active').next().slideDown('normal').addClass('expanded');

		// Leave input field visible if it's not empty
		input.on('focus', function(){
			$(this).closest('.t-row').addClass('active');
		}).on('blur', function(){
			if($(this).val() == ''){
				$(this).closest('.t-row').removeClass('active');
			}
		});
	},


	// Subheader
	subheader: function(){
		var base = $('section.sub-header'),
			trigger = base.find('i.icon-menu'),
			menu = base.find('nav');


		function windowSize() {
    		windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
		}
		windowSize();

		$(window).resize(function() {
		    windowSize();

			if(windowWidth >= 641){
				menu.show();
			}

			if(windowWidth < 640 && !menu.hasClass('active')){
				menu.hide();
			}
		});

		trigger.on('click', function(){
			if(windowWidth < 640){
				menu.slideToggle().toggleClass('active');
			}
		});

		if(windowWidth >= 641){
			menu.show();
		}
	},


	slider: function(){

		$('.current-balance.widget').owlCarousel({
		    dots: true,
		    items: 1,
		    autoplay: true,
		    loop: true
		})
	}

};


$(function(){
	App.init();
});
