exports.ids = [1];
exports.modules = {

/***/ 118:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	exports.NotFound = NotFound;
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactIntl = __webpack_require__(4);
	
	var _App = {
	  "container": "_4uEyKcd5WHob5qPzotT7",
	  "div-grid": "urzBuF0xs36Cke5HaO92a",
	  "container-grid": "SVHoARiEkb2pLgRURsTQw"
	};
	
	var _App2 = _interopRequireDefault(_App);
	
	var _notFound = '/' + "02789daec939fda59e3792fa289b9b11.jpg";
	
	var _notFound2 = _interopRequireDefault(_notFound);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _ref = _jsx('h1', {}, void 0, 'D\xE9sol\xE9');
	
	var _ref2 = _jsx('h2', {}, void 0, 'La page que vous cherchez n\'existe pas');
	
	function NotFound() {
	  return _jsx('div', {
	    style: { backgroundImage: 'url(' + _notFound2.default + ')', height: '550px', backgroundPosition: 'center', padding: '150px 0', textAlign: 'center', color: 'white' }
	  }, void 0, _jsx('h1', {
	    style: { fontSize: '100px' }
	  }, void 0, '404'), _ref, _ref2);
	}
	
	exports.default = NotFound;

/***/ }

};;