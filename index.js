"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.defineEvent = defineEvent;
function defineEvent(obj, name) {
	function event() {
		for (var i = 0; i < event._handlers.length; i++) {
			var _event$_handlers;

			(_event$_handlers = event._handlers)[i].apply(_event$_handlers, arguments);
		}
	};

	event._handlers = [];

	event.add = function (value) {
		if (Array.isArray(value)) {
			value.forEach(function (item) {
				return event.add(item);
			});
		} else {
			event._handlers.push(value);
		}
	};

	event.remove = function (value) {
		if (Array.isArray(value)) {
			value.forEach(function (item) {
				return event.remove(item);
			});
		} else {
			while (true) {
				var index = event._handlers.indexOf(value);
				if (index >= 0) event._handlers.splice(index, 1);else break;
			}
		}
	};

	event.on = event.add;
	event.off = event.remove;

	Object.defineProperty(obj, name, {
		configurable: true,
		enumerable: true,

		get: function get() {
			return event;
		},
		set: function set(value) {
			event.add(value);
		}
	});
}