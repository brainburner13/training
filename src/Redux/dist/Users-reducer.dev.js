"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.setIsFetchingt = exports.setTotalUsersCount = exports.setCurrentPage = exports.setUsers = exports.unfollow = exports.follow = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FOLLOW = 'FOLLOW';
var UNFOLLOW = 'UNFOLLOW';
var SET_USERS = 'SET-USERS';
var SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
var SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';
var TOOGLE_IS_FETCHING = 'TOOGLE-IS-FETCHING';
var initialState = {
  users: [//{id: 1, photoURL: '', followed: false, fullName: 'Pidor', status: 'true', location: {city: 'Hole', cauntry: 'Black'}},
    //{id: 1, photoURL: '', followed: true, fullName: 'Loh', status: 'Lox', location: {city: 'Nigga', cauntry: 'Black'}}
  ],
  pageSize: 100,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false
};

var usersReducer = function usersReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case FOLLOW:
      return _objectSpread({}, state, {
        users: state.users.map(function (u) {
          if (u.id === action.userId) {
            return _objectSpread({}, u, {
              followed: true
            });
          } else {
            return u;
          }
        })
      });

    case UNFOLLOW:
      return _objectSpread({}, state, {
        users: state.users.map(function (u) {
          if (u.id === action.userId) {
            return _objectSpread({}, u, {
              followed: false
            });
          } else {
            return u;
          }
        })
      });

    case SET_CURRENT_PAGE:
      return _objectSpread({}, state, {
        currentPage: action.currentPage
      });

    case SET_USERS:
      return _objectSpread({}, state, {
        users: action.users
      });

    case SET_TOTAL_USERS_COUNT:
      return _objectSpread({}, state, {
        totalUsersCount: action.totalCount
      });

    case TOOGLE_IS_FETCHING:
      return _objectSpread({}, state, {
        isFetching: action.isFetching
      });

    default:
      {
        return _objectSpread({}, state);
      }
      ;
  }

  ;
};

var follow = function follow(userId) {
  return {
    type: FOLLOW,
    userId: userId
  };
};

exports.follow = follow;

var unfollow = function unfollow(userId) {
  return {
    type: UNFOLLOW,
    userId: userId
  };
};

exports.unfollow = unfollow;

var setUsers = function setUsers(users) {
  return {
    type: SET_USERS,
    users: users
  };
};

exports.setUsers = setUsers;

var setCurrentPage = function setCurrentPage(currentPage) {
  return {
    type: SET_CURRENT_PAGE,
    currentPage: currentPage
  };
};

exports.setCurrentPage = setCurrentPage;

var setTotalUsersCount = function setTotalUsersCount(totalCount) {
  return {
    type: SET_TOTAL_USERS_COUNT,
    totalCount: totalCount
  };
};

exports.setTotalUsersCount = setTotalUsersCount;

var setIsFetchingt = function setIsFetchingt(isFetching) {
  return {
    type: TOOGLE_IS_FETCHING,
    isFetching: isFetching
  };
};

exports.setIsFetchingt = setIsFetchingt;
var _default = usersReducer;
exports["default"] = _default;