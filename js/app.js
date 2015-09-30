var JSan = (function(global) {
	var VALUE_OF_MOVE = 300;
	return {
		$: function(selector) {
		this.elem = document.querySelector(selector);
			return this;
		},
		addClass: function(selector, className) {
			(arguments.length < 2) ? this.elem.classList.add(arguments[0]) : this.$(selector).classList.add(className);
			return this;
		},
		rmClass: function(selector, className) {
			(arguments.length < 2) ? this.elem.classList.remove(arguments[0]) : this.$(selector).classList.remove(className);
			return this;
		},
		tglClass: function(selector, className) {
			(arguments.length < 2) ? this.elem.classList.toggle(arguments[0]) : this.$(selector).classList.toggle(className);
			return this;
		},
		catchMouse: function(e) {
			if(!this.elem) {
				console.log("Choose elem for animate");
				return false;
			}
			var throttled = this.throttle(this.setX.bind(this), 80);
			global.addEventListener("mousemove", throttled, false);
		},
		setX: function(e) {
			var mouse_x = e.pageX;
			console.log(mouse_x, Math.round(mouse_x*VALUE_OF_MOVE/global.screen.availWidth));
			this.posX = Math.round(mouse_x*VALUE_OF_MOVE/global.screen.availWidth);
			this.addMove.call(this, this.posX);
			return this;
		},
		addMove: function(size) {
			console.log(size);
			this.elem.style.cssText = "transform: translate(" + ~~size + "px);";
			return false;
		},
		throttle: function(func, wait, options) {
			var context, args, result;
			var timeout = null;
			var previous = 0;
			options || (options = {});
			var later = function() {
				previous = options.leading === false ? 0 : Date.now();
				timeout = null;
				result = func.apply(context, args);
				context = args = null;
			};
			return function() {
				var now = Date.now();
				if (!previous && options.leading === false) previous = now;
				var remaining = wait - (now - previous);
				context = this;
				args = arguments;
				if (remaining <= 0) {
					clearTimeout(timeout);
					timeout = null;
					previous = now;
					result = func.apply(context, args);
					context = args = null;
				} else if (!timeout && options.trailing !== false) {
					timeout = setTimeout(later, remaining);
				}
				return result;
			};
		},
		init: function() {
			this.catchMouse();
		}
	};
}(window));