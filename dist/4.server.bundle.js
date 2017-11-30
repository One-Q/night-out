exports.ids = [4];
exports.modules = {

/***/ 114:
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
	
	var _EventActions = __webpack_require__(12);
	
	var _Grid = __webpack_require__(24);
	
	var _Grid2 = _interopRequireDefault(_Grid);
	
	var _TextField = __webpack_require__(26);
	
	var _TextField2 = _interopRequireDefault(_TextField);
	
	var _Form = __webpack_require__(13);
	
	var _Input = __webpack_require__(57);
	
	var _Input2 = _interopRequireDefault(_Input);
	
	var _Select = __webpack_require__(59);
	
	var _Select2 = _interopRequireDefault(_Select);
	
	var _Button = __webpack_require__(7);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _Send = __webpack_require__(118);
	
	var _Send2 = _interopRequireDefault(_Send);
	
	var _Menu = __webpack_require__(58);
	
	var _App = {
	  "container": "_4uEyKcd5WHob5qPzotT7",
	  "div-grid": "urzBuF0xs36Cke5HaO92a",
	  "container-grid": "SVHoARiEkb2pLgRURsTQw"
	};
	
	var _App2 = _interopRequireDefault(_App);
	
	var _EventAdd = {
	  "textField": "_1Jyucy9GGrI6KrQsHD9JpP"
	};
	
	var _EventAdd2 = _interopRequireDefault(_EventAdd);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var categories = [{
	  name: 'Musique',
	  value: 'MUSIC'
	}, {
	  name: 'Danse',
	  value: 'DANCE'
	}];
	
	var _ref = _jsx('h2', {}, void 0, 'Ajouter un \xE9v\xE9nement');
	
	var _ref2 = _jsx(_Input.InputLabel, {
	  htmlFor: 'category'
	}, void 0, 'Categorie');
	
	var _ref3 = _jsx(_Input2.default, {
	  id: 'category',
	  name: 'category'
	});
	
	var EventAdd = function (_Component) {
	  _inherits(EventAdd, _Component);
	
	  function EventAdd(props) {
	    _classCallCheck(this, EventAdd);
	
	    var _this = _possibleConstructorReturn(this, (EventAdd.__proto__ || Object.getPrototypeOf(EventAdd)).call(this, props));
	
	    _this.handleChange = function (name) {
	      return function (event) {
	        console.log(name, event);
	        _this.setState(_defineProperty({}, name, event.target.value));
	        console.log(_this.state);
	      };
	    };
	
	    _this.state = {
	      name: '',
	      description: '',
	      category: 'MUSIC',
	      date: '',
	      city: '',
	      street: '',
	      error: {}
	    };
	    _this.handleChange = _this.handleChange.bind(_this);
	    _this.handleSubmit = _this.handleSubmit.bind(_this);
	    return _this;
	  }
	
	  _createClass(EventAdd, [{
	    key: 'handleSubmit',
	    value: function handleSubmit(event) {
	      var _this2 = this;
	
	      event.preventDefault();
	      var adresse = this.state.street.replace(/ /g, '-') + '+' + this.state.city.replace(/ /g, '-');
	      var lat = void 0;
	      var lng = void 0;
	      // Do the checks
	      fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + adresse + '&key=AIzaSyDC2e4a98PMQ3zw4PGUNTsUr8K9iolhlA8').then(function (res) {
	        return res.json();
	      }).then(function (res) {
	        if (res.status === 'OK') {
	          lat = res.results[0].geometry.location.lat;
	          lng = res.results[0].geometry.location.lng;
	          _this2.props.dispatch((0, _EventActions.createEvent)(_this2.state.name, _this2.state.description, _this2.state.category, _this2.state.city, _this2.state.street, lat, lng, _this2.state.date));
	        } else {
	          console.log(res);
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _jsx('div', {
	        style: { marginTop: '20px' }
	      }, void 0, _jsx('div', {
	        className: _App2.default.container
	      }, void 0, _jsx(_Grid2.default, {
	        container: true,
	        spacing: 24,
	        style: { width: '100%' }
	      }, void 0, _jsx(_Grid2.default, {
	        item: true,
	        md: 6
	      }, void 0, _ref, _jsx('form', {
	        style: { paddingTop: '20px', paddingBottom: '30px' },
	        onSubmit: this.handleSubmit
	      }, void 0, _jsx(_TextField2.default, {
	        required: true,
	        id: 'name',
	        label: 'Titre',
	        name: 'name',
	        style: { marginBottom: '20px' },
	        value: this.state.name,
	        fullWidth: true,
	        onChange: this.handleChange('name')
	      }), _jsx(_TextField2.default, {
	        required: true,
	        id: 'description',
	        label: 'Description',
	        name: 'description',
	        fullWidth: true,
	        style: { marginBottom: '20px' },
	        className: _EventAdd2.default.textField,
	        value: this.state.description,
	        onChange: this.handleChange('description')
	      }), _jsx(_Form.FormControl, {
	        style: { marginBottom: '20px', display: 'block' }
	      }, void 0, _ref2, _jsx(_Select2.default, {
	        value: this.state.category,
	        onChange: this.handleChange('category'),
	        input: _ref3
	      }, void 0, categories.map(function (cat) {
	        return _jsx(_Menu.MenuItem, {
	          value: cat.value
	        }, void 0, cat.name);
	      }))), _jsx(_TextField2.default, {
	        required: true,
	        id: 'date',
	        label: 'Date',
	        name: 'date',
	        fullWidth: true,
	        style: { marginBottom: '20px' },
	        className: _EventAdd2.default.textField,
	        type: 'date',
	        placeholder: 'jj/mm/aaaa',
	        value: this.state.date,
	        onChange: this.handleChange('date')
	      }), _jsx(_TextField2.default, {
	        required: true,
	        id: 'city',
	        label: 'Ville',
	        name: 'city',
	        fullWidth: true,
	        style: { marginBottom: '20px' },
	        className: _EventAdd2.default.textField,
	        value: this.state.city,
	        onChange: this.handleChange('city')
	      }), _jsx(_TextField2.default, {
	        required: true,
	        id: 'street',
	        label: 'Rue',
	        name: 'street',
	        fullWidth: true,
	        style: { marginBottom: '20px' },
	        className: _EventAdd2.default.textField,
	        value: this.state.street,
	        onChange: this.handleChange('street')
	      }), _jsx(_Button2.default, {
	        raised: true,
	        color: 'primary',
	        style: { marginTop: '20px' },
	        type: 'submit'
	      }, void 0, 'Send', _jsx(_Send2.default, {
	        style: { marginLeft: '20px' }
	      })))))));
	    }
	  }]);
	
	  return EventAdd;
	}(_react.Component);
	
	function mapStateToProps(state) {
	  return {};
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps)(EventAdd);

/***/ }

};;