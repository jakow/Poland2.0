var nav = responsiveNav('#nav-mobile', {
	animate: true, 
	transition: 284, 
	label: "Menu", 
	insert: "before", 
	customToggle: "#nav-toggle", 
	closeOnNavClick: false, 
	openPos: "relative", 
	navClass: "nav-collapse", 
	navActiveClass: "js-nav-active", 
	jsClass: "js",
 	init: function(){this.isOpen = false; console.log('init')}, // Function: Init callback
 	open: function(){this.isOpen = true;console.log('open')}, // Function: Open callback
 	close: function(){this.isOpen = false; console.log('close')} // Function: Close callback
 });

var $doc = $(document);
$doc.foundation();


$doc.ready(function() {
	$('#banner.content').addClass('animate-content');
	$('.team-grid').addClass('animate-content');
	//hack to close toggle menu	
	var navWrapper = $(nav.wrapper);
	$('#body, footer').click(function(event) {
		if(navWrapper.hasClass('opened')) {
			event.preventDefault();
			nav.close();
		}
	})



});

$doc.ready(function() {
	console.log($('.newsletter-signup').children('button'));
	$('.newsletter-signup button').click(function(ev) {
		ev.preventDefault();
	})
})
// $doc.ready(function() {
// 	console.log($('.team-member .photo'))
// 	$('.team-member .photo').children().on('load', function() {
// 		console.log('loaded!!!');
// 	})

// });

// $doc.ready(function() {

// 	//debouncedresize
// 	var $event = $.event,
// 	$special,
// 	resizeTimeout;

// 	$special = $event.special.debouncedresize = {
// 		setup: function() {
// 			$( this ).on( "resize", $special.handler );
// 		},
// 		teardown: function() {
// 			$( this ).off( "resize", $special.handler );
// 		},
// 		handler: function( event, execAsap ) {
// 			// Save the context
// 			var context = this,
// 			args = arguments,
// 			dispatch = function() {
// 					// set correct event type
// 					event.type = "debouncedresize";
// 					$event.dispatch.apply( context, args );
// 				};

// 				if ( resizeTimeout ) {
// 					clearTimeout( resizeTimeout );
// 				}

// 				execAsap ?
// 				dispatch() :
// 				resizeTimeout = setTimeout( dispatch, $special.threshold );
// 			},
// 			threshold: 250
// 		};



// 		var $grid = $('.team-grid'),
// 		$items = $grid.children('.team-member'),
// 		currentIdx = -1,
// 		activePreview = null,
// 		previewPos = -1,
// 		scrollExtra = 0,
// 		marginExpanded = 0,
		
// 		$window = $(window),
// 		winsize,
// 		$body = $('html, body'),
// 		transEndEventNames = {
// 			'WebkitTransition' : 'webkitTransitionEnd',
// 			'MozTransition' : 'transitionend',
// 			'OTransition' : 'oTransitionEnd',
// 			'msTransition' : 'MSTransitionEnd',
// 			'transition' : 'transitionend'
// 		},
// 		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
// 	// support for csstransitions
// 	support = Modernizr.csstransitions,
// 	// default settings
// 	settings = {
// 		minHeight : 500,
// 		speed : 350,
// 		easing : 'ease'
// 	};

// 	function init(config) {
// 		settings = $.extend(true, {}, settings, config);
// 		$grid.imagesLoaded( function() {
// 			// save item´s size and offset
// 			saveItemInfo( true );
// 			// get window´s size
// 			getWinSize();
// 			// initialize some events
// 			initEvents();

// 			attachPreviews();
// 		})
// 	}

// 			// saves the item´s offset top and height (if saveheight is true)
// 	function saveItemInfo( saveheight ) {
// 		$items.each( function() {
// 			var $item = $( this );
// 			$item.data( 'offsetTop', $item.offset().top );
// 			if( saveheight ) {
// 				$item.data( 'height', $item.height() );
// 			}
// 		} );
// 	}

// 	function getWinSize() {
// 		winsize = { width : $window.width(), height : $window.height() };
// 	}

// 	function initEvents() {

// 		// when clicking an item, show the preview with the item´s info and large image;
// 		// close the item if already expanded.
// 		// also close if clicking on the item´s cross
// 			console.log($items.children('.preview'));
// 			$items.on( 'click', '.close-button', function() {
// 				hidePreview();
// 				return false;
// 			} ).children( '.preview-activate').on( 'click', function(e) {

// 				var $item = $( this ).parent();
// 				// check if item already opened
// 				currentIdx === $item.index() ? hidePreview() : showPreview( $item );
// 				return false;

// 		} );

// 		// on window resize get the window´s size again
// 		// reset some values..
// 		$window.on( 'debouncedresize', function() {
			
// 			scrollExtra = 0;
// 			previewPos = -1;
// 			// save item´s offset
// 			saveItemInfo();
// 			getWinSize();
// 			console.log(this);
// 			var preview = $.data( this, 'preview' );
// 			if(activePreview !== null ) {
// 				hidePreview();
// 			}
// 		} );

// 	}

// 	function attachPreviews() {
// 		$items.each(function () {
// 			var $item = $(this);
// 			$item.data('preview', new Preview($item));
// 		});
// 	}

// 	function showPreview( $item ) {

// 		var preview = $item.data('preview'),
// 			// item´s offset top
// 			position = $item.data( 'offsetTop' );

// 			scrollExtra = 0;
// 		// if a preview exists and previewPos is different (different row) from item´s top, then close it
// 		if( activePreview !== null ) {
// 			// not in the same row
// 			if( previewPos !== position ) {
// 				// if position > previewPos then we need to take the currentIdx preview´s height in consideration when scrolling the window
// 				if( position > previewPos ) {
// 					scrollExtra = preview.height;
// 				}
// 				activePreview.close();
// 			}
// 			// same row
// 			else {
// 				activePreview.update(preview);
// 				return false;
// 			}
// 		}

// 		// update previewPos
// 		previewPos = position;
// 		// initialize new preview for the clicked item
// 		activePreview = preview;
// 		currentIdx = $item.index();
// 		// expand preview overlay
// 		preview.open();
// 	}

// 	function hidePreview () {
// 		activePreview.close();
// 		activePreview = null;
// 		currentIdx = -1;
// 		previewPos = -1;
// 	}

// 	/* Preview object definition */
// 	//preview's constructor
// 	function Preview( $item ) {
// 		this.$item = $item;
// 		this.expandedIdx = this.$item.index();
// 		this.create();
// 	}

// 	Preview.prototype = {
// 		create: function() {
// 			this.$previewEl = this.$item.children('.preview-container');
// 			this.$previewInner = this.$previewEl.children('.preview');
// 		},
// 	open : function() {
// 			this.$item.addClass('expanded');
// 			if (support) this.setTransition(settings.speed);
// 			setTimeout( $.proxy( function() {	
// 				// set the height for the preview and the item
// 				this.setHeights(this.calcHeight());
// 				// scroll to position the preview in the right place
// 				this.positionPreview();
// 				this.showContent();
// 			}, this ), 25 );

// 	},
// 	showContent: function () {
// 		/*if (!this.$previewInner.hasClass('show')) */ this.$previewInner.addClass('show');
// 	},
// 	hideContent: function() {
// 		if (this.$previewInner.hasClass('show'))  this.$previewInner.removeClass('show');
// 	},
// 	update : function( next ) {

// 		// update with new item´s details 
// 		// if( $item ) {
// 		// 	this.$item = $item;
// 		// }
		
// 		// if already expanded, remove class "og-expanded" from currentIdx item and add it to new item
// 		if( currentIdx !== -1 ) {
// 			var $currentItem = $items.eq( currentIdx );
// 			$currentItem.removeClass( 'expanded');
// 			this.$item.addClass( 'expanded' );
// 			// position the preview correctly
// 			this.positionPreview();
// 		}

// 		// update current value
// 		currentIdx = this.$item.index();

// 		// update preview´s content
// 		// var $itemEl = this.$item.children( 'a' ),
// 		// 	eldata = {
// 		// 		href : $itemEl.attr( 'href' ),
// 		// 		largesrc : $itemEl.data( 'largesrc' ),
// 		// 		title : $itemEl.data( 'title' ),
// 		// 		description : $itemEl.data( 'description' )
// 		// 	};

// 		// this.$title.html( eldata.title );
// 		// this.$description.html( eldata.description );
// 		// this.$href.attr( 'href', eldata.href );

// 		// var self = this;
		
// 		// remove the current image in the preview


// 		// preload large image and add it to the preview
// 		// for smaller screens we don´t display the large image (the last media query will hide the wrapper of the image)
// 		// if( self.$fullimage.is( ':visible' ) ) {
// 		// 	this.$loading.show();
// 		// 	$( '<img/>' ).load( function() {
// 		// 		self.$loading.hide();
// 		// 		self.$largeImg = $( this ).fadeIn( 350 );
// 		// 		self.$fullimage.append( self.$largeImg );
// 		// 	} ).attr( 'src', eldata.largesrc );	
// 		// }

// 	},

// 	close : function(animate) {
// 		animate = typeof(animate) === 'boolean' ? animate : true;
// 		var self = this,
// 		onEndFn = function() {
// 			if( support ) {
// 				$( this ).off( transEndEventName );
// 			}
// 			self.$item.removeClass( 'expanded' );
// 		};
// 		this.hideContent();
// 		setTimeout( $.proxy( function() {
// 			this.$previewEl.css( 'height', 0 );
// 				// the current expanded item (might be different from this.$item)
// 				var $expandedItem = $items.eq( this.expandedIdx );
// 				$expandedItem.css( 'height', $expandedItem.data( 'height' ) ).on( transEndEventName, onEndFn );

// 				if( !support ) {
// 					onEndFn.call();
// 				}

// 			}, this ), 25 );

// 		return false;
// 	},
// 	setHeights : function(heights) {
// 		if (typeof(heights) !== 'object') return false;
// 		var self = this,
// 		onEndFn = function() {
// 			if( support ) {
// 				self.$item.off( transEndEventName );
// 			}
// 			self.$item.addClass( 'expanded' );
// 		};

// 		this.$previewEl.css( 'height', heights.height );
// 		this.$item.css( 'height', heights.itemHeight ).on( transEndEventName, onEndFn );

// 		if( !support ) {
// 			onEndFn.call();
// 		}

// 	},
// 	calcHeight : function() {

// 		var heightPreview = winsize.height - this.$item.data( 'height' ) - marginExpanded,
// 		itemHeight = winsize.height;

// 		if( heightPreview < settings.minHeight ) {
// 			heightPreview = settings.minHeight;
// 			itemHeight = settings.minHeight + this.$item.data( 'height' ) + marginExpanded;
// 		}

// 		return {height: heightPreview,
// 				itemHeight: itemHeight};

// 	},
// 	positionPreview : function() {
// 			// scroll page
// 			// case 1 : preview height + item height fits in window´s height
// 			// case 2 : preview height + item height does not fit in window´s height and preview height is smaller than window´s height
// 			// case 3 : preview height + item height does not fit in window´s height and preview height is bigger than window´s height
// 			var position = this.$item.data( 'offsetTop' ),
// 			previewOffsetT = this.$previewEl.offset().top - scrollExtra,
// 			scrollVal = this.height + this.$item.data( 'height' ) + marginExpanded <= winsize.height ? position : this.height < winsize.height ? previewOffsetT - ( winsize.height - this.height ) : previewOffsetT;
			
// 			$body.animate( { scrollTop : scrollVal }, settings.speed );
// 		},
// 		setTransition: function(speed) {
// 			if(support) {
// 			this.$previewEl.css( 'transition', 'height ' + speed + 'ms ' + settings.easing );
// 			this.$item.css( 'transition', 'height ' + speed + 'ms ' + settings.easing );
// 			}
// 		}
// 	}
// 	init();
// });


// // $(document).ready(function() {
// // 	$('.team-member').each(function(idx){
// // 		$(this).data('open', false);
// // 	});
// // 	$('.team-member').click(function() {
// // 		//compute 
// // 		var el = $(this);
// // 		var photo = el.children('.photo');
// // 		var details = el.children('.details-container');
// // 		var description = details.children();
// // 		var parent = el.parent();
// // 		var position = el.position();
// // 		var x = position.left;
// // 		var y = position.top;
// // 		var w = el.innerWidth();
// // 		var h = el.innerHeight();
// // 		var scaleX = w/details.innerWidth();
// // 		var scaleY = h/details.innerHeight();
// // 		//open
// // 		if(!el.data('open')) { 
// // 			el.data('open', true);
// // 			details.css({transform: ` translate(${x}, ${y}) scale(${scaleX}, ${scaleY})  ` });
// // 			el.addClass('active');
// // 			details.transition({opacity: 1, visibility: 'visible'}, 300);
// // 			details.transition({scale: 1, x: 0, y:0}, 300, 'ease-in-out');
// // 			photo.transition({x: -1 * x, y: -y, scale: 1.5, delay: 400}, 300, 'ease-in-out');
// // 			description.transition({opacity: 1, delay: 700});
// // 		}


// // 	});
// // });
classie = {
	add: function(element, cls) {
		element.className += cls;
	},
	remove: function(element, cls) {
		var regex = new RegExp('(?:^|\s)'+cls+'(?!\S)', 'g');
		element.className.replace( regex , '' );
	},
	has: function() {

	}
}

function morphingModal(sourceEl, contentEl) {
	this.sourceEl = sourceEl;
	this.contentEl = contentEl;
	this.modalEl = null;
	this.overlay = null;
	this.sourceEl.addEventListener('click', this.handleOpen.bind(this));
}

morphingModal.prototype.helloWorld = function() {
	console.log('Hello World');
};

morphingModal.prototype.handleOpen = function() {
	this.createOverlay();
	this.createModal();
	console.log('handleOpen');
};

morphingModal.prototype.handleClose = function() {
	this.removeModal();
	this.removeOverlay();
};

morphingModal.prototype.open =  function() {

};
morphingModal.prototype.createOverlay = function() {
	
};
morphingModal.prototype.createModal = function() {
	var modal = this.modalEl = document.createElement('div');
	var overlay = this.overlay = document.createElement('div');
	classie.add(modal, 'morph-modal');
	classie.add(overlay, 'morph-overlay');
	body.appendChild(overlay);
	body.appendChild(modal);
	classie.add(overlay, 'visible');
};

morphingModal.prototype.destroyModal = function() {
	this.modalEl.parent.removeChild(this.modalEl);
};

var teamMembers = Array.prototype.slice.call(document.querySelectorAll('.team-member'));
console.log(teamMembers);

var modals = teamMembers.map(function(el) {return new morphingModal(el, el.querySelectorAll('.preview-container')[0])});
console.log(modals);

