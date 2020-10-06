"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.sendMessageCreater = exports.updateNewMessageBodyCreater = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
var SEND_MESSAGE = 'SEND-MESSAGE';
var initialState = {
  dialogs: [{
    id: 1,
    name: 'Huy'
  }, {
    id: 2,
    name: 'Pizda'
  }, {
    id: 3,
    name: 'Jgurda'
  }],
  messages: [{
    id: 1,
    message: 'Fuck you'
  }, {
    id: 2,
    message: 'Suck'
  }, {
    id: 3,
    message: 'Fucken idiot'
  }],
  newMessageBody: ''
};

var dialogsReducer = function dialogsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      return _objectSpread({}, state, {
        newMessageBody: action.body
      });

    case SEND_MESSAGE:
      var body = state.newMessageBody;
      return _objectSpread({}, state, {
        newMessageBody: '',
        messages: [].concat(_toConsumableArray(state.messages), [{
          id: 4,
          message: body
        }])
      });

    default:
      return _objectSpread({}, state);
  }
};

var updateNewMessageBodyCreater = function updateNewMessageBodyCreater(body) {
  return {
    type: UPDATE_NEW_MESSAGE_BODY,
    body: body
  };
};

exports.updateNewMessageBodyCreater = updateNewMessageBodyCreater;

var sendMessageCreater = function sendMessageCreater() {
  return {
    type: SEND_MESSAGE
  };
};

exports.sendMessageCreater = sendMessageCreater;
var _default = dialogsReducer;
exports["default"] = _default;