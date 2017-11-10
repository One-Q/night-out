exports.ids = [1];
exports.modules = {

/***/ 95:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	// Import Actions
	
	
	// Import CSS
	
	
	exports.EventDetails = EventDetails;
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(2);
	
	var _reactHelmet = __webpack_require__(6);
	
	var _reactHelmet2 = _interopRequireDefault(_reactHelmet);
	
	var _reactIntl = __webpack_require__(1);
	
	var _EventMap = __webpack_require__(96);
	
	var _EventMap2 = _interopRequireDefault(_EventMap);
	
	var _EventActions = __webpack_require__(9);
	
	var _EventReducer = __webpack_require__(10);
	
	var _reactRouter = __webpack_require__(3);
	
	var _Event = {
	  "event-div": "_1bsciJyhVFuLam1kjvDFnO",
	  "single-event": "_3JBZgC0ed2h9y2WFzKlGM0",
	  "event-title": "_65jErK1rcXdpCOGzYVGKK",
	  "location": "_3jSMkUOX_4JFP9zMRZjoic",
	  "event-desc": "_1e2qla6Si7eA8kaWJXIIsD",
	  "eevnt-detail": "_3-8RyBjXKvuyqqn1i2DkTO",
	  "event-detail": "_3MhQ_-bBzfu4nygtz_iNQ7"
	};
	
	var _Event2 = _interopRequireDefault(_Event);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _ref = _jsx(_reactIntl.FormattedMessage, {
	  id: 'Location'
	});
	
	function EventDetails(props) {
	  console.log(props);
	  if (props.event == '') {
	    return _jsx('div', {}, void 0, _jsx('h3', {
	      className: _Event2.default['event-title']
	    }, void 0, 'Pas d\'\xE9v\xE9nement correspondant'));
	  }
	  return _jsx('div', {}, void 0, _jsx(_reactHelmet2.default, {
	    title: props.event.name
	  }), _jsx('div', {
	    className: _Event2.default['single-post'] + ' ' + _Event2.default['event-detail']
	  }, void 0, _jsx('h3', {
	    className: _Event2.default['event-title']
	  }, void 0, props.event.name), _jsx('p', {
	    className: _Event2.default['location']
	  }, void 0, _ref, ' : ', props.event.location.city, ', ', props.event.location.street), _jsx('p', {
	    className: _Event2.default['event-desc']
	  }, void 0, props.event.description)), _jsx('div', {
	    style: { width: 600, height: 600 }
	  }, void 0, _jsx(_EventMap2.default, {
	    location: { lat: props.event.location.latitude, lng: props.event.location.longitude },
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
	    })
	  })));
	}
	
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

/***/ },

/***/ 96:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();
	
	var _react = __webpack_require__(0);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactGoogleMaps = __webpack_require__(97);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var EventMap = (0, _reactGoogleMaps.withScriptjs)((0, _reactGoogleMaps.withGoogleMap)(function (props) {
	  return _jsx(_reactGoogleMaps.GoogleMap, {
	    defaultZoom: 10,
	    defaultCenter: props.location
	  }, void 0, _jsx(_reactGoogleMaps.Marker, {
	    position: props.location
	  }, void 0));
	}));
	
	exports.default = EventMap;

/***/ }

};;