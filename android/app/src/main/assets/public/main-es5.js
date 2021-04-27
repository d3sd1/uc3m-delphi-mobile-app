(function () {
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
    /***/
    "./$$_lazy_route_resource lazy recursive":
    /*!******************************************************!*\
      !*** ./$$_lazy_route_resource lazy namespace object ***!
      \******************************************************/

    /*! no static exports found */

    /***/
    function $$_lazy_route_resourceLazyRecursive(module, exports) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      module.exports = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";
      /***/
    },

    /***/
    "./node_modules/@ionic/core/dist/esm lazy recursive ^\\.\\/.*\\.entry\\.js$ include: \\.entry\\.js$ exclude: \\.system\\.entry\\.js$":
    /*!*****************************************************************************************************************************************!*\
      !*** ./node_modules/@ionic/core/dist/esm lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
      \*****************************************************************************************************************************************/

    /*! no static exports found */

    /***/
    function node_modulesIonicCoreDistEsmLazyRecursiveEntryJs$IncludeEntryJs$ExcludeSystemEntryJs$(module, exports, __webpack_require__) {
      var map = {
        "./ion-action-sheet.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-action-sheet.entry.js", "common", 0],
        "./ion-alert.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-alert.entry.js", "common", 1],
        "./ion-app_8.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-app_8.entry.js", "common", 2],
        "./ion-avatar_3.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-avatar_3.entry.js", "common", 3],
        "./ion-back-button.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-back-button.entry.js", "common", 4],
        "./ion-backdrop.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-backdrop.entry.js", 5],
        "./ion-button_2.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-button_2.entry.js", "common", 6],
        "./ion-card_5.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-card_5.entry.js", "common", 7],
        "./ion-checkbox.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-checkbox.entry.js", "common", 8],
        "./ion-chip.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-chip.entry.js", "common", 9],
        "./ion-col_3.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-col_3.entry.js", 10],
        "./ion-datetime_3.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-datetime_3.entry.js", "common", 11],
        "./ion-fab_3.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-fab_3.entry.js", "common", 12],
        "./ion-img.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-img.entry.js", 13],
        "./ion-infinite-scroll_2.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-infinite-scroll_2.entry.js", 14],
        "./ion-input.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-input.entry.js", "common", 15],
        "./ion-item-option_3.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-item-option_3.entry.js", "common", 16],
        "./ion-item_8.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-item_8.entry.js", "common", 17],
        "./ion-loading.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-loading.entry.js", "common", 18],
        "./ion-menu_3.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-menu_3.entry.js", "common", 19],
        "./ion-modal.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-modal.entry.js", "common", 20],
        "./ion-nav_2.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-nav_2.entry.js", "common", 21],
        "./ion-popover.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-popover.entry.js", "common", 22],
        "./ion-progress-bar.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-progress-bar.entry.js", "common", 23],
        "./ion-radio_2.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-radio_2.entry.js", "common", 24],
        "./ion-range.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-range.entry.js", "common", 25],
        "./ion-refresher_2.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-refresher_2.entry.js", "common", 26],
        "./ion-reorder_2.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-reorder_2.entry.js", "common", 27],
        "./ion-ripple-effect.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-ripple-effect.entry.js", 28],
        "./ion-route_4.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-route_4.entry.js", "common", 29],
        "./ion-searchbar.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-searchbar.entry.js", "common", 30],
        "./ion-segment_2.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-segment_2.entry.js", "common", 31],
        "./ion-select_3.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-select_3.entry.js", "common", 32],
        "./ion-slide_2.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-slide_2.entry.js", 33],
        "./ion-spinner.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-spinner.entry.js", "common", 34],
        "./ion-split-pane.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-split-pane.entry.js", 35],
        "./ion-tab-bar_2.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-tab-bar_2.entry.js", "common", 36],
        "./ion-tab_2.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-tab_2.entry.js", "common", 37],
        "./ion-text.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-text.entry.js", "common", 38],
        "./ion-textarea.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-textarea.entry.js", "common", 39],
        "./ion-toast.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-toast.entry.js", "common", 40],
        "./ion-toggle.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-toggle.entry.js", "common", 41],
        "./ion-virtual-scroll.entry.js": ["./node_modules/@ionic/core/dist/esm/ion-virtual-scroll.entry.js", 42]
      };

      function webpackAsyncContext(req) {
        if (!__webpack_require__.o(map, req)) {
          return Promise.resolve().then(function () {
            var e = new Error("Cannot find module '" + req + "'");
            e.code = 'MODULE_NOT_FOUND';
            throw e;
          });
        }

        var ids = map[req],
            id = ids[0];
        return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function () {
          return __webpack_require__(id);
        });
      }

      webpackAsyncContext.keys = function webpackAsyncContextKeys() {
        return Object.keys(map);
      };

      webpackAsyncContext.id = "./node_modules/@ionic/core/dist/esm lazy recursive ^\\.\\/.*\\.entry\\.js$ include: \\.entry\\.js$ exclude: \\.system\\.entry\\.js$";
      module.exports = webpackAsyncContext;
      /***/
    },

    /***/
    "./src/app/core/delphi-core.module.ts":
    /*!********************************************!*\
      !*** ./src/app/core/delphi-core.module.ts ***!
      \********************************************/

    /*! exports provided: DelphiCoreModule */

    /***/
    function srcAppCoreDelphiCoreModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "DelphiCoreModule", function () {
        return DelphiCoreModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common */
      "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");

      var DelphiCoreModule = function DelphiCoreModule() {
        _classCallCheck(this, DelphiCoreModule);
      };

      DelphiCoreModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]]
      })], DelphiCoreModule);
      /***/
    },

    /***/
    "./src/app/core/storage/user.storage.ts":
    /*!**********************************************!*\
      !*** ./src/app/core/storage/user.storage.ts ***!
      \**********************************************/

    /*! exports provided: UserStorage */

    /***/
    function srcAppCoreStorageUserStorageTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "UserStorage", function () {
        return UserStorage;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _ionic_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ionic/storage */
      "./node_modules/@ionic/storage/__ivy_ngcc__/fesm2015/ionic-storage.js");
      /* harmony import */


      var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @auth0/angular-jwt */
      "./node_modules/@auth0/angular-jwt/__ivy_ngcc__/fesm2015/auth0-angular-jwt.js");
      /* harmony import */


      var _ws_ws_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../ws/ws.service */
      "./src/app/core/ws/ws.service.ts");

      var UserStorage = /*#__PURE__*/function () {
        function UserStorage(storage, wsService) {
          _classCallCheck(this, UserStorage);

          this.storage = storage;
          this.wsService = wsService;
          this.JWT_KEY_NAME = 'JWT_TOKEN_STR';
          this.USER_KEY_NAME = 'USER_ENCODED';
          this.user = null;
        }

        _createClass(UserStorage, [{
          key: "getJwt",
          value: function getJwt() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              var _this = this;

              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      return _context2.abrupt("return", new Promise(function (resolve, reject) {
                        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                          return regeneratorRuntime.wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  _context.t0 = resolve;
                                  _context.next = 3;
                                  return this.storage.get(this.JWT_KEY_NAME);

                                case 3:
                                  _context.t1 = _context.sent;
                                  (0, _context.t0)(_context.t1);

                                case 5:
                                case "end":
                                  return _context.stop();
                              }
                            }
                          }, _callee, this);
                        }));
                      }));

                    case 1:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }));
          }
        }, {
          key: "getUser",
          value: function getUser() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
              return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this2, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.t0 = resolve;
                        _context3.t1 = JSON;
                        _context3.next = 4;
                        return this.storage.get(this.USER_KEY_NAME);

                      case 4:
                        _context3.t2 = _context3.sent;
                        _context3.t3 = _context3.t1.parse.call(_context3.t1, _context3.t2);
                        (0, _context3.t0)(_context3.t3);

                      case 7:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, this);
              }));
            });
          }
        }, {
          key: "setUser",
          value: function setUser(user) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      _context4.next = 2;
                      return this.storage.set(this.USER_KEY_NAME, JSON.stringify(user));

                    case 2:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, this);
            }));
          }
        }, {
          key: "setJwt",
          value: function setJwt(jwt) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
              return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                  switch (_context5.prev = _context5.next) {
                    case 0:
                      _context5.next = 2;
                      return this.storage.set(this.JWT_KEY_NAME, jwt);

                    case 2:
                    case "end":
                      return _context5.stop();
                  }
                }
              }, _callee5, this);
            }));
          }
        }, {
          key: "logout",
          value: function logout() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
              return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
                      return this.storage.clear();

                    case 2:
                      _context6.next = 4;
                      return this.setUser(null);

                    case 4:
                      _context6.next = 6;
                      return this.setJwt(null);

                    case 6:
                      _context6.next = 8;
                      return this.storage.remove(this.USER_KEY_NAME);

                    case 8:
                      _context6.next = 10;
                      return this.storage.remove(this.JWT_KEY_NAME);

                    case 10:
                      _context6.next = 12;
                      return this.wsService.disconnectWs();

                    case 12:
                    case "end":
                      return _context6.stop();
                  }
                }
              }, _callee6, this);
            }));
          }
        }, {
          key: "needsOnboard",
          value: function needsOnboard() {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
              _this3.getUser().then(function (user) {
                resolve(user.needsOnboard);
              })["catch"](function () {
                reject();
              });
            });
          }
        }, {
          key: "hasRole",
          value: function hasRole(roleName) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
              var user;
              return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.next = 2;
                      return this.getUser();

                    case 2:
                      user = _context7.sent;
                      return _context7.abrupt("return", false);

                    case 4:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _callee7, this);
            }));
          }
        }, {
          key: "isLoggedIn",
          value: function isLoggedIn() {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
              _this4.getJwt().then(function (jwt) {
                if (jwt === null || jwt === '') {
                  resolve(false);
                }

                var helper = new _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_3__["JwtHelperService"]();
                var isExpired = helper.isTokenExpired(jwt);
                resolve(!isExpired);
              })["catch"](function (e) {
                reject(e);
              });
            });
          }
        }]);

        return UserStorage;
      }();

      UserStorage.ctorParameters = function () {
        return [{
          type: _ionic_storage__WEBPACK_IMPORTED_MODULE_2__["Storage"]
        }, {
          type: _ws_ws_service__WEBPACK_IMPORTED_MODULE_4__["WsService"]
        }];
      };

      UserStorage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], UserStorage);
      /***/
    },

    /***/
    "./src/app/core/ws/ws.service.ts":
    /*!***************************************!*\
      !*** ./src/app/core/ws/ws.service.ts ***!
      \***************************************/

    /*! exports provided: WsService */

    /***/
    function srcAppCoreWsWsServiceTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "WsService", function () {
        return WsService;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var stompjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! stompjs */
      "./node_modules/stompjs/index.js");
      /* harmony import */


      var stompjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(stompjs__WEBPACK_IMPORTED_MODULE_2__);
      /* harmony import */


      var sockjs_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! sockjs-client */
      "./node_modules/sockjs-client/lib/entry.js");
      /* harmony import */


      var sockjs_client__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sockjs_client__WEBPACK_IMPORTED_MODULE_3__);
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs */
      "./node_modules/rxjs/_esm2015/index.js");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../../environments/environment */
      "./src/environments/environment.ts");

      var WsService = /*#__PURE__*/function () {
        function WsService() {
          _classCallCheck(this, WsService);

          this.stompClient = null;
        }

        _createClass(WsService, [{
          key: "connectWs",
          value: function connectWs(jwt) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
              var _this5 = this;

              var ws;
              return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      ws = new sockjs_client__WEBPACK_IMPORTED_MODULE_3__('http://localhost:8080/ws');
                      this.stompClient = stompjs__WEBPACK_IMPORTED_MODULE_2__["over"](ws);
                      this.stompClient.connect({
                        jwt: jwt
                      }, function (frame) {//_this.stompClient.reconnect_delay = 2000;
                      }, function (e) {
                        setTimeout(function () {
                          if (jwt !== null) {
                            _this5.connectWs(jwt);
                          }
                        }, _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].wsReconnectInterval);
                      });

                    case 3:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8, this);
            }));
          }
        }, {
          key: "publish",
          value: function publish(channel, body) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
              return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      this.stompClient.send('/ws/publisher/' + channel, {}, JSON.stringify(body)); // stringfify?

                    case 1:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, _callee9, this);
            }));
          }
        }, {
          key: "subscribe",
          value: function subscribe(channel, privateChannel) {
            var dataTransfer = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](null);
            this.stompClient.subscribe((privateChannel ? '/private' : '') + '/ws/subscribe/' + channel, function (message) {
              dataTransfer.next(JSON.parse(message.body));
            }); //TODO FUTURE: handle unsubcriptions
            //TODO FUTURE: re-structure chat system =)

            return dataTransfer;
          }
        }, {
          key: "disconnectWs",
          value: function disconnectWs() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
              return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                  switch (_context10.prev = _context10.next) {
                    case 0:
                      if (this.stompClient !== null) {
                        this.stompClient.disconnect();
                      }

                      this.stompClient = null;

                    case 2:
                    case "end":
                      return _context10.stop();
                  }
                }
              }, _callee10, this);
            }));
          }
        }]);

        return WsService;
      }();

      WsService.ctorParameters = function () {
        return [];
      };

      WsService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], WsService);
      /***/
    },

    /***/
    "./src/app/entrypoint-routing.module.ts":
    /*!**********************************************!*\
      !*** ./src/app/entrypoint-routing.module.ts ***!
      \**********************************************/

    /*! exports provided: EntrypointRoutingModule */

    /***/
    function srcAppEntrypointRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "EntrypointRoutingModule", function () {
        return EntrypointRoutingModule;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/router */
      "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");

      var routes = [{
        path: '',
        pathMatch: 'full',
        redirectTo: 'splash-screen'
      }, {
        path: 'splash-screen',
        loadChildren: function loadChildren() {
          return Promise.all(
          /*! import() | splash-screen-splash-screen-module */
          [__webpack_require__.e("default~processes-processes-module~splash-screen-splash-screen-module"), __webpack_require__.e("splash-screen-splash-screen-module")]).then(__webpack_require__.bind(null,
          /*! ./splash-screen/splash-screen.module */
          "./src/app/splash-screen/splash-screen.module.ts")).then(function (m) {
            return m.SplashScreenModule;
          });
        }
      }, {
        path: 'logged-in',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | logged-in-logged-in-module */
          "logged-in-logged-in-module").then(__webpack_require__.bind(null,
          /*! ./logged-in/logged-in.module */
          "./src/app/logged-in/logged-in.module.ts")).then(function (m) {
            return m.LoggedInModule;
          });
        }
      }, {
        path: 'logged-out',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | logged-out-logged-out-module */
          "logged-out-logged-out-module").then(__webpack_require__.bind(null,
          /*! ./logged-out/logged-out.module */
          "./src/app/logged-out/logged-out.module.ts")).then(function (m) {
            return m.LoggedOutModule;
          });
        }
      }];

      var EntrypointRoutingModule = function EntrypointRoutingModule() {
        _classCallCheck(this, EntrypointRoutingModule);
      };

      EntrypointRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes, {
          preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_2__["PreloadAllModules"]
        })],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], EntrypointRoutingModule);
      /***/
    },

    /***/
    "./src/app/entrypoint.component.ts":
    /*!*****************************************!*\
      !*** ./src/app/entrypoint.component.ts ***!
      \*****************************************/

    /*! exports provided: EntrypointComponent */

    /***/
    function srcAppEntrypointComponentTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "EntrypointComponent", function () {
        return EntrypointComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ngx-translate/core */
      "./node_modules/@ngx-translate/core/__ivy_ngcc__/fesm2015/ngx-translate-core.js");
      /* harmony import */


      var _capacitor_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @capacitor/core */
      "./node_modules/@capacitor/core/dist/esm/index.js");
      /* harmony import */


      var _logged_in_profile_lang_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ./logged-in/profile/lang.service */
      "./src/app/logged-in/profile/lang.service.ts");
      /* harmony import */


      var _core_storage_user_storage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./core/storage/user.storage */
      "./src/app/core/storage/user.storage.ts");
      /* harmony import */


      var _core_ws_ws_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./core/ws/ws.service */
      "./src/app/core/ws/ws.service.ts");

      var PushNotifications = _capacitor_core__WEBPACK_IMPORTED_MODULE_3__["Plugins"].PushNotifications;

      var EntrypointComponent = /*#__PURE__*/function () {
        /*
          constructor(
            private platform: Platform,
            private themeService: ThemeService,
            private loaderService: SplashScreenService
          ) {
            this.themeListenerInit();
            this.initializeApp();
          }
             private themeListenerInit() {
            this.themeService.addDarkThemeHandler();
            this.themeService.addLightThemeHandler();
          }
         
          initializeApp() {
           /* this.platform.ready().then(() => {
              this.loaderService.initialize();
            });
          }*/
        function EntrypointComponent(translate, langService, userStorage, ws) {
          _classCallCheck(this, EntrypointComponent);

          this.translate = translate;
          this.langService = langService;
          this.userStorage = userStorage;
          this.ws = ws;
        }

        _createClass(EntrypointComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            var _a;

            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
              var userLang, isPushNotificationsAvailable;
              return regeneratorRuntime.wrap(function _callee11$(_context11) {
                while (1) {
                  switch (_context11.prev = _context11.next) {
                    case 0:
                      _context11.t0 = this.ws;
                      _context11.next = 3;
                      return this.userStorage.getJwt();

                    case 3:
                      _context11.t1 = _context11.sent;
                      _context11.next = 6;
                      return _context11.t0.connectWs.call(_context11.t0, _context11.t1);

                    case 6:
                      this.translate.setDefaultLang('en');
                      this.translate.addLangs(['es', 'en']);
                      _context11.next = 10;
                      return this.userStorage.isLoggedIn();

                    case 10:
                      if (!_context11.sent) {
                        _context11.next = 24;
                        break;
                      }

                      _context11.next = 13;
                      return this.userStorage.getUser();

                    case 13:
                      _context11.t3 = _a = _context11.sent.language;
                      _context11.t2 = _context11.t3 === null;

                      if (_context11.t2) {
                        _context11.next = 17;
                        break;
                      }

                      _context11.t2 = _a === void 0;

                    case 17:
                      if (!_context11.t2) {
                        _context11.next = 21;
                        break;
                      }

                      _context11.t4 = void 0;
                      _context11.next = 22;
                      break;

                    case 21:
                      _context11.t4 = _a.keyName;

                    case 22:
                      userLang = _context11.t4;
                      this.translate.use(userLang === null || userLang === void 0 ? void 0 : userLang.toLowerCase());

                    case 24:
                      isPushNotificationsAvailable = _capacitor_core__WEBPACK_IMPORTED_MODULE_3__["Capacitor"].isPluginAvailable('PushNotifications');

                      if (isPushNotificationsAvailable) {
                        PushNotifications.requestPermission().then(function (result) {
                          if (result.granted) {
                            // Register with Apple / Google to receive push via APNS/FCM
                            PushNotifications.register();
                          } else {// Show some error
                          }
                        });
                        PushNotifications.addListener('registration', function (token) {
                          alert('Push registration success, token: ' + token.value);
                        });
                        PushNotifications.addListener('registrationError', function (error) {
                          alert('Error on registration: ' + JSON.stringify(error));
                        });
                        PushNotifications.addListener('pushNotificationReceived', function (notification) {
                          alert('Push received: ' + JSON.stringify(notification));
                        });
                        PushNotifications.addListener('pushNotificationActionPerformed', function (notification) {
                          alert('Push action performed: ' + JSON.stringify(notification));
                        });
                      }

                    case 26:
                    case "end":
                      return _context11.stop();
                  }
                }
              }, _callee11, this);
            }));
          }
        }]);

        return EntrypointComponent;
      }();

      EntrypointComponent.ctorParameters = function () {
        return [{
          type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"]
        }, {
          type: _logged_in_profile_lang_service__WEBPACK_IMPORTED_MODULE_4__["LangService"]
        }, {
          type: _core_storage_user_storage__WEBPACK_IMPORTED_MODULE_5__["UserStorage"]
        }, {
          type: _core_ws_ws_service__WEBPACK_IMPORTED_MODULE_6__["WsService"]
        }];
      };

      EntrypointComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'delphi-root',
        template: "\n    <ion-app>\n      <ion-router-outlet></ion-router-outlet>\n    </ion-app>"
      })], EntrypointComponent);
      /***/
    },

    /***/
    "./src/app/entrypoint.module.ts":
    /*!**************************************!*\
      !*** ./src/app/entrypoint.module.ts ***!
      \**************************************/

    /*! exports provided: EntrypointModule, HttpLoaderFactory */

    /***/
    function srcAppEntrypointModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "EntrypointModule", function () {
        return EntrypointModule;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "HttpLoaderFactory", function () {
        return HttpLoaderFactory;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/platform-browser */
      "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/router */
      "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
      /* harmony import */


      var _entrypoint_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ./entrypoint-routing.module */
      "./src/app/entrypoint-routing.module.ts");
      /* harmony import */


      var _entrypoint_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./entrypoint.component */
      "./src/app/entrypoint.component.ts");
      /* harmony import */


      var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/platform-browser/animations */
      "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
      /* harmony import */


      var _ionic_storage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @ionic/storage */
      "./node_modules/@ionic/storage/__ivy_ngcc__/fesm2015/ionic-storage.js");
      /* harmony import */


      var _core_delphi_core_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! ./core/delphi-core.module */
      "./src/app/core/delphi-core.module.ts");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/common/http */
      "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
      /* harmony import */


      var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @ngx-translate/core */
      "./node_modules/@ngx-translate/core/__ivy_ngcc__/fesm2015/ngx-translate-core.js");
      /* harmony import */


      var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @ngx-translate/http-loader */
      "./node_modules/@ngx-translate/http-loader/__ivy_ngcc__/fesm2015/ngx-translate-http-loader.js");

      var EntrypointModule = function EntrypointModule() {
        _classCallCheck(this, EntrypointModule);
      };

      EntrypointModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_entrypoint_component__WEBPACK_IMPORTED_MODULE_6__["EntrypointComponent"]],
        entryComponents: [],
        imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"].forRoot(), _entrypoint_routing_module__WEBPACK_IMPORTED_MODULE_5__["EntrypointRoutingModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"], _ionic_storage__WEBPACK_IMPORTED_MODULE_8__["IonicStorageModule"].forRoot(), _core_delphi_core_module__WEBPACK_IMPORTED_MODULE_9__["DelphiCoreModule"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__["TranslateModule"].forRoot({
          loader: {
            provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__["TranslateLoader"],
            useFactory: HttpLoaderFactory,
            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_10__["HttpClient"]]
          }
        }), _angular_common_http__WEBPACK_IMPORTED_MODULE_10__["HttpClientModule"]],
        providers: [{
          provide: _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouteReuseStrategy"],
          useClass: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicRouteStrategy"]
        }, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__["TranslateService"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__["TranslateStore"]],
        bootstrap: [_entrypoint_component__WEBPACK_IMPORTED_MODULE_6__["EntrypointComponent"]],
        exports: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__["TranslateModule"]]
      })], EntrypointModule); // required for AOT compilation

      function HttpLoaderFactory(http) {
        return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_12__["TranslateHttpLoader"](http);
      }
      /***/

    },

    /***/
    "./src/app/logged-in/profile/lang.service.ts":
    /*!***************************************************!*\
      !*** ./src/app/logged-in/profile/lang.service.ts ***!
      \***************************************************/

    /*! exports provided: LangService */

    /***/
    function srcAppLoggedInProfileLangServiceTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "LangService", function () {
        return LangService;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/common/http */
      "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../../../environments/environment */
      "./src/environments/environment.ts");

      var LangService = /*#__PURE__*/function () {
        function LangService(httpClient) {
          _classCallCheck(this, LangService);

          this.httpClient = httpClient;
        }

        _createClass(LangService, [{
          key: "getAvailableLangs",
          value: function getAvailableLangs() {
            return this.httpClient.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiUrl + '/v1/delphi/langs').toPromise();
          }
        }]);

        return LangService;
      }();

      LangService.ctorParameters = function () {
        return [{
          type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]
        }];
      };

      LangService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], LangService);
      /***/
    },

    /***/
    "./src/environments/environment.ts":
    /*!*****************************************!*\
      !*** ./src/environments/environment.ts ***!
      \*****************************************/

    /*! exports provided: environment */

    /***/
    function srcEnvironmentsEnvironmentTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "environment", function () {
        return environment;
      }); // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.


      var environment = {
        production: false,
        apiUrl: 'http://localhost:8080',
        debug: true,
        wsReconnectInterval: 1000
      };
      /*
       * For easier debugging in development mode, you can import the following file
       * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
       *
       * This import should be commented out in production mode because it will have a negative impact
       * on performance if an error is thrown.
       */
      // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

      /***/
    },

    /***/
    "./src/main.ts":
    /*!*********************!*\
      !*** ./src/main.ts ***!
      \*********************/

    /*! no exports provided */

    /***/
    function srcMainTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/platform-browser-dynamic */
      "./node_modules/@angular/platform-browser-dynamic/__ivy_ngcc__/fesm2015/platform-browser-dynamic.js");
      /* harmony import */


      var _app_entrypoint_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app/entrypoint.module */
      "./src/app/entrypoint.module.ts");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./environments/environment */
      "./src/environments/environment.ts");

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
      }

      Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_entrypoint_module__WEBPACK_IMPORTED_MODULE_2__["EntrypointModule"])["catch"](function (err) {
        return console.log(err);
      });
      /***/
    },

    /***/
    0:
    /*!***************************!*\
      !*** multi ./src/main.ts ***!
      \***************************/

    /*! no static exports found */

    /***/
    function _(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(
      /*! /Users/andreigarcia/WebstormProjects/delphi-app/src/main.ts */
      "./src/main.ts");
      /***/
    }
  }, [[0, "runtime", "vendor"]]]);
})();
//# sourceMappingURL=main-es5.js.map