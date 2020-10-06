"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _ProfileReducer = _interopRequireDefault(require("./Profile-reducer"));

var _DialogsReducer = _interopRequireDefault(require("./Dialogs-reducer"));

var _SidebarReducer = _interopRequireDefault(require("./Sidebar-reducer"));

var _UsersReducer = _interopRequireDefault(require("./Users-reducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var reducers = (0, _redux.combineReducers)({
  profilePage: _ProfileReducer["default"],
  dialogsPage: _DialogsReducer["default"],
  sidebar: _SidebarReducer["default"],
  usersPage: _UsersReducer["default"]
});
var store = (0, _redux.createStore)(reducers);
var _default = store;
exports["default"] = _default;