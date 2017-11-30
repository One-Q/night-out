exports.ids = [3];
exports.modules = {

/***/ 115:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(1);
	
	var _reactHelmet = __webpack_require__(9);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _reactIntl = __webpack_require__(3);
	
	var _EventMap = __webpack_require__(56);
	
	var _EventMap2 = _interopRequireDefault(_EventMap);
	
	var _EventActions = __webpack_require__(12);
	
	var _EventReducer = __webpack_require__(25);
	
	var _reactRouter = __webpack_require__(2);
	
	var _Grid = __webpack_require__(24);
	
	var _Grid2 = _interopRequireDefault(_Grid);
	
	var _Event = {
	  "event-div": "_3fl747I65Xpc6c63zqiz4Z",
	  "single-event": "_2Ucm-nXTucrLpyqmK0mwTG",
	  "event-title": "_30rZWoSelktXziNHZ4AzL2",
	  "location": "_1HqoozAZAb5aV33rF3QoLs",
	  "event-desc": "gwBvdLZTvuaxj0oPJULOD",
	  "eevnt-detail": "_3rhf2hynhbItVf-i1861_E",
	  "event-detail": "XPAFlXEDc4knjbIR_hMeQ"
	};
	
	var _Event2 = _interopRequireDefault(_Event);
	
	var _App = {
	  "container": "_4uEyKcd5WHob5qPzotT7",
	  "div-grid": "urzBuF0xs36Cke5HaO92a",
	  "container-grid": "SVHoARiEkb2pLgRURsTQw"
	};
	
	var _App2 = _interopRequireDefault(_App);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// Import Actions
	
	
	// Import CSS
	
	
	var _ref = _jsx(_reactIntl.FormattedMessage, {
	  id: 'Location'
	});
	
	var EventDetails = function (_Component) {
	  _inherits(EventDetails, _Component);
	
	  function EventDetails() {
	    _classCallCheck(this, EventDetails);
	
	    return _possibleConstructorReturn(this, (EventDetails.__proto__ || Object.getPrototypeOf(EventDetails)).apply(this, arguments));
	  }
	
	  _createClass(EventDetails, [{
	    key: 'render',
	    value: function render() {
	      if (this.props.event === '') {
	        return _jsx('div', {}, void 0, _jsx('h3', {
	          className: _Event2.default['event-title']
	        }, void 0, 'Pas d\'\xE9v\xE9nement correspondant'));
	      }
	      return _jsx('div', {}, void 0, _jsx('div', {
	        className: _App2.default.container
	      }, void 0, _jsx(_Grid2.default, {
	        container: true,
	        spacing: 24,
	        style: { width: '100%' }
	      }, void 0, _jsx(_Grid2.default, {
	        item: true,
	        md: 6
	      }, void 0, _jsx('h3', {
	        className: _Event2.default['event-title']
	      }, void 0, this.props.event.name), _jsx('p', {
	        className: _Event2.default['location']
	      }, void 0, _ref, ' : ', this.props.event.location.city, ', ', this.props.event.location.street), _jsx('p', {
	        className: _Event2.default['event-desc']
	      }, void 0, this.props.event.description)), _jsx(_Grid2.default, {
	        item: true,
	        md: 6
	      }, void 0, _jsx('div', {
	        style: { width: '100%', height: 600 }
	      }, void 0, _jsx(_EventMap2.default, {
	        location: { lat: this.props.event.location.latitude, lng: this.props.event.location.longitude },
	        isMarkerShown: true,
	        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDC2e4a98PMQ3zw4PGUNTsUr8K9iolhlA8&v=3.exp&libraries=geometry,drawing,places',
	        loadingElement: _jsx('div', {
	          style: { height: '100%' }
	        }),
	        containerElement: _jsx('div', {
	          style: { height: '400px' }
	        }),
	        mapElement: _jsx('div', {
	          style: { height: '100%' }
	        }),
	        markers: [{ lat: this.props.event.location.latitude, lng: this.props.event.location.longitude }]
	      }))))));
	    }
	  }]);
	
	  return EventDetails;
	}(_react.Component);
	
	// Actions required to provide data for this component to render in sever side.
	
	
	EventDetails.need = [function (params) {
	  return (0, _EventActions.fetchEvent)(params.slug);
	}];
	
	// Retrieve data from store as props
	function mapStateToProps(state, props) {
	  return {
	    event: (0, _EventReducer.getEvent)(state, props.params.slug)
	  };
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(EventDetails);

/***/ }

};;