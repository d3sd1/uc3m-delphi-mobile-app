(function () {
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
    "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
    /*!**************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
      \**************************************************************************/

    /*! exports provided: default */

    /***/
    function node_modulesRawLoaderDistCjsJsSrcAppAppComponentHtml(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<ion-app>\n  <ion-router-outlet *ngIf=\"!appLoading\"></ion-router-outlet>\n  <delphi-splash-screen *ngIf=\"appLoading\"></delphi-splash-screen>\n</ion-app>\n";
      /***/
    },

    /***/
    "./node_modules/raw-loader/dist/cjs.js!./src/app/startup/splash-screen/splash-screen.component.html":
    /*!**********************************************************************************************************!*\
      !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/startup/splash-screen/splash-screen.component.html ***!
      \**********************************************************************************************************/

    /*! exports provided: default */

    /***/
    function node_modulesRawLoaderDistCjsJsSrcAppStartupSplashScreenSplashScreenComponentHtml(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "<div class=\"container\">\n  <div class=\"logo\">\n    <div class=\"dot-top\"></div>\n    <div class=\"dot-middle\"></div>\n    <div class=\"dot-bottom\"></div>\n  </div>\n  <p class=\"slogan\">\n    Delphi\n    <ion-progress-bar class=\"sub-slogan-loader\" type=\"indeterminate\"></ion-progress-bar>\n  </p>\n</div>\n";
      /***/
    },

    /***/
    "./src/app/app-routing.module.ts":
    /*!***************************************!*\
      !*** ./src/app/app-routing.module.ts ***!
      \***************************************/

    /*! exports provided: AppRoutingModule */

    /***/
    function srcAppAppRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
        return AppRoutingModule;
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
      /* harmony import */


      var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../guards/auth-guard */
      "./src/guards/auth-guard.ts");

      var routes = [
      /*{
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },*/
      {
        path: 'login',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | login-login-module */
          "login-login-module").then(__webpack_require__.bind(null,
          /*! ./login/login.module */
          "./src/app/login/login.module.ts")).then(function (m) {
            return m.LoginPageModule;
          });
        }
      }, {
        path: 'register',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | register-register-module */
          "register-register-module").then(__webpack_require__.bind(null,
          /*! ./register/register.module */
          "./src/app/register/register.module.ts")).then(function (m) {
            return m.RegisterPageModule;
          });
        }
      }, {
        path: 'home',
        canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]],
        canActivateChild: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"]],
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | home-home-module */
          "home-home-module").then(__webpack_require__.bind(null,
          /*! ./home/home.module */
          "./src/app/home/home.module.ts")).then(function (m) {
            return m.TabsPageModule;
          });
        }
      }, {
        path: 'login',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | login-login-module */
          "login-login-module").then(__webpack_require__.bind(null,
          /*! ./login/login.module */
          "./src/app/login/login.module.ts")).then(function (m) {
            return m.LoginPageModule;
          });
        }
      }, {
        path: 'register',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | register-register-module */
          "register-register-module").then(__webpack_require__.bind(null,
          /*! ./register/register.module */
          "./src/app/register/register.module.ts")).then(function (m) {
            return m.RegisterPageModule;
          });
        }
      }, {
        path: 'logout',
        loadChildren: function loadChildren() {
          return __webpack_require__.e(
          /*! import() | logout-logout-module */
          "logout-logout-module").then(__webpack_require__.bind(null,
          /*! ./logout/logout.module */
          "./src/app/logout/logout.module.ts")).then(function (m) {
            return m.LogoutPageModule;
          });
        }
      }];

      var AppRoutingModule = function AppRoutingModule() {
        _classCallCheck(this, AppRoutingModule);
      };

      AppRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes, {
          preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_2__["PreloadAllModules"]
        })],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
      })], AppRoutingModule);
      /***/
    },

    /***/
    "./src/app/app.component.scss":
    /*!************************************!*\
      !*** ./src/app/app.component.scss ***!
      \************************************/

    /*! exports provided: default */

    /***/
    function srcAppAppComponentScss(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "@media (prefers-color-scheme: light) {\n  ion-toolbar {\n    --background: white;\n    color: black;\n  }\n\n  .verticalScrollContainer {\n    background: white;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  ion-toolbar {\n    --background: black;\n    color: white;\n  }\n\n  .verticalScrollContainer {\n    background: black;\n  }\n}\nion-toolbar {\n  --background: var(--color-toolbar-background);\n  color: var(--color-toolbar-text);\n}\n.verticalScrollContainer {\n  background: var(--color-toolbar-background);\n}\n@media (prefers-color-scheme: light) {\n  :root {\n    --color-toolbar-background: white;\n    --color-toolbar-text: black;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  :root {\n    --color-toolbar-background: black;\n    --color-toolbar-text: white;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0U7SUFDRSxtQkFBQTtJQUNBLFlBQUE7RUFDRjs7RUFDQTtJQUNFLGlCQUFBO0VBRUY7QUFDRjtBQUNBO0VBQ0U7SUFDRSxtQkFBQTtJQUNBLFlBQUE7RUFDRjs7RUFDQTtJQUNFLGlCQUFBO0VBRUY7QUFDRjtBQUNBO0VBQ0UsNkNBQUE7RUFDQSxnQ0FBQTtBQUNGO0FBRUE7RUFDRSwyQ0FBQTtBQUNGO0FBRUE7RUFDRTtJQUNFLGlDQUFBO0lBQ0EsMkJBQUE7RUFDRjtBQUNGO0FBRUE7RUFDRTtJQUNFLGlDQUFBO0lBQ0EsMkJBQUE7RUFBRjtBQUNGIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpIHtcbiAgaW9uLXRvb2xiYXIge1xuICAgIC0tYmFja2dyb3VuZDogd2hpdGU7XG4gICAgY29sb3I6IGJsYWNrO1xuICB9XG4gIC52ZXJ0aWNhbFNjcm9sbENvbnRhaW5lciB7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gIH1cbn1cblxuQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykge1xuICBpb24tdG9vbGJhciB7XG4gICAgLS1iYWNrZ3JvdW5kOiBibGFjaztcbiAgICBjb2xvcjogd2hpdGU7XG4gIH1cbiAgLnZlcnRpY2FsU2Nyb2xsQ29udGFpbmVyIHtcbiAgICBiYWNrZ3JvdW5kOiBibGFjaztcbiAgfVxufVxuXG5pb24tdG9vbGJhciB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0tY29sb3ItdG9vbGJhci1iYWNrZ3JvdW5kKTtcbiAgY29sb3I6IHZhcigtLWNvbG9yLXRvb2xiYXItdGV4dCk7XG59XG5cbi52ZXJ0aWNhbFNjcm9sbENvbnRhaW5lciB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yLXRvb2xiYXItYmFja2dyb3VuZCk7XG59XG5cbkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KSB7XG4gIDpyb290IHtcbiAgICAtLWNvbG9yLXRvb2xiYXItYmFja2dyb3VuZDogd2hpdGU7XG4gICAgLS1jb2xvci10b29sYmFyLXRleHQ6IGJsYWNrO1xuICB9XG59XG5cbkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHtcbiAgOnJvb3Qge1xuICAgIC0tY29sb3ItdG9vbGJhci1iYWNrZ3JvdW5kOiBibGFjaztcbiAgICAtLWNvbG9yLXRvb2xiYXItdGV4dDogd2hpdGU7XG4gIH1cbn1cblxuIl19 */";
      /***/
    },

    /***/
    "./src/app/app.component.ts":
    /*!**********************************!*\
      !*** ./src/app/app.component.ts ***!
      \**********************************/

    /*! exports provided: AppComponent */

    /***/
    function srcAppAppComponentTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
        return AppComponent;
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


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @ionic/angular */
      "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
      /* harmony import */


      var _ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ionic-native/status-bar/ngx */
      "./node_modules/@ionic-native/status-bar/__ivy_ngcc__/ngx/index.js");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/router */
      "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
      /* harmony import */


      var _services_authentication_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../services/authentication-service */
      "./src/services/authentication-service.ts");
      /* harmony import */


      var _ionic_native_touch_id_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @ionic-native/touch-id/ngx */
      "./node_modules/@ionic-native/touch-id/__ivy_ngcc__/ngx/index.js");
      /* harmony import */


      var _services_init_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../services/init.service */
      "./src/services/init.service.ts");

      var AppComponent = /*#__PURE__*/function () {
        function AppComponent(platform, statusBar, authenticationService, router, touchId, initApp, loadingController) {
          _classCallCheck(this, AppComponent);

          this.platform = platform;
          this.statusBar = statusBar;
          this.authenticationService = authenticationService;
          this.router = router;
          this.touchId = touchId;
          this.initApp = initApp;
          this.loadingController = loadingController;
          this.appLoading = true;
          this.minLoadMs = 6000;
          this.initialMs = 0;
          this.endMs = 0; // Use matchMedia to check the user preference

          var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
          toggleDarkTheme(prefersDark.matches); // Listen for changes to the prefers-color-scheme media query

          prefersDark.addListener(function (mediaQuery) {
            return toggleDarkTheme(mediaQuery.matches);
          }); // Add or remove the "dark" class based on if the media query matches

          function toggleDarkTheme(shouldAdd) {
            document.body.classList.toggle('dark', shouldAdd);
          }

          this.initializeApp();
        }

        _createClass(AppComponent, [{
          key: "presentLoading",
          value: function presentLoading() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return this.loadingController.create({
                        cssClass: 'my-custom-class',
                        message: 'Un momento...',
                        duration: 2000
                      });

                    case 2:
                      this.loading = _context.sent;
                      _context.next = 5;
                      return this.loading.present();

                    case 5:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          }
        }, {
          key: "initializeApp",
          value: function initializeApp() {
            var _this = this;

            this.platform.ready().then(function () {
              _this.initialMs = new Date().getMilliseconds();

              _this.statusBar.styleDefault();

              _this.initApp.doInit().then(function (success) {
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (success) {
                            this.endMs = new Date().getMilliseconds();
                            this.sucessLoading();
                          }

                        case 1:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, this);
                }));
              });
            });
          }
        }, {
          key: "sucessLoading",
          value: function sucessLoading() {
            var _this2 = this;

            var remainingMs = this.minLoadMs;
            var msElapsed = this.endMs - this.initialMs;

            if (msElapsed > this.minLoadMs) {
              remainingMs = 0;
            } else if (msElapsed < this.minLoadMs) {
              remainingMs = this.minLoadMs - msElapsed;
            }

            setTimeout(function () {
              return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this2, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                var _this3 = this;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return this.presentLoading();

                      case 2:
                        this.appLoading = false;
                        this.router.navigate(['login']).then(function () {
                          _this3.loading.dismiss();
                        });

                      case 4:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, this);
              }));
            }, remainingMs);
          }
        }]);

        return AppComponent;
      }();

      AppComponent.ctorParameters = function () {
        return [{
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Platform"]
        }, {
          type: _ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_3__["StatusBar"]
        }, {
          type: _services_authentication_service__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
        }, {
          type: _ionic_native_touch_id_ngx__WEBPACK_IMPORTED_MODULE_6__["TouchID"]
        }, {
          type: _services_init_service__WEBPACK_IMPORTED_MODULE_7__["InitService"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["LoadingController"]
        }];
      };

      AppComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'delphi-root',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! raw-loader!./app.component.html */
        "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html"))["default"],
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! ./app.component.scss */
        "./src/app/app.component.scss"))["default"]]
      })], AppComponent);
      /***/
    },

    /***/
    "./src/app/app.module.ts":
    /*!*******************************!*\
      !*** ./src/app/app.module.ts ***!
      \*******************************/

    /*! exports provided: AppModule */

    /***/
    function srcAppAppModuleTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppModule", function () {
        return AppModule;
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


      var _ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @ionic-native/status-bar/ngx */
      "./node_modules/@ionic-native/status-bar/__ivy_ngcc__/ngx/index.js");
      /* harmony import */


      var _app_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! ./app-routing.module */
      "./src/app/app-routing.module.ts");
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ./app.component */
      "./src/app/app.component.ts");
      /* harmony import */


      var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/platform-browser/animations */
      "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
      /* harmony import */


      var _ionic_storage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @ionic/storage */
      "./node_modules/@ionic/storage/__ivy_ngcc__/fesm2015/ionic-storage.js");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/common/http */
      "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
      /* harmony import */


      var _ionic_native_touch_id_ngx__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @ionic-native/touch-id/ngx */
      "./node_modules/@ionic-native/touch-id/__ivy_ngcc__/ngx/index.js");
      /* harmony import */


      var _startup_splash_screen_splash_screen_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ./startup/splash-screen/splash-screen.component */
      "./src/app/startup/splash-screen/splash-screen.component.ts");
      /* harmony import */


      var _services_init_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! ../services/init.service */
      "./src/services/init.service.ts");
      /* harmony import */


      var _startup_initializer_api_api_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! ./startup/initializer/api/api.service */
      "./src/app/startup/initializer/api/api.service.ts");
      /* harmony import */


      var _services_authentication_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! ../services/authentication-service */
      "./src/services/authentication-service.ts");
      /* harmony import */


      var _interceptor_auth_interceptor__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! ../interceptor/auth.interceptor */
      "./src/interceptor/auth.interceptor.ts");

      var AppModule = function AppModule() {
        _classCallCheck(this, AppModule);
      };

      AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"], _startup_splash_screen_splash_screen_component__WEBPACK_IMPORTED_MODULE_12__["SplashScreenComponent"]],
        entryComponents: [],
        imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"].forRoot(), _app_routing_module__WEBPACK_IMPORTED_MODULE_6__["AppRoutingModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["BrowserAnimationsModule"], _angular_common_http__WEBPACK_IMPORTED_MODULE_10__["HttpClientModule"], _ionic_storage__WEBPACK_IMPORTED_MODULE_9__["IonicStorageModule"].forRoot()],
        providers: [_ionic_native_status_bar_ngx__WEBPACK_IMPORTED_MODULE_5__["StatusBar"], _startup_splash_screen_splash_screen_component__WEBPACK_IMPORTED_MODULE_12__["SplashScreenComponent"], _ionic_native_touch_id_ngx__WEBPACK_IMPORTED_MODULE_11__["TouchID"], _services_init_service__WEBPACK_IMPORTED_MODULE_13__["InitService"], _startup_initializer_api_api_service__WEBPACK_IMPORTED_MODULE_14__["ApiService"], _services_authentication_service__WEBPACK_IMPORTED_MODULE_15__["AuthenticationService"], {
          provide: _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouteReuseStrategy"],
          useClass: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicRouteStrategy"]
        }, {
          provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_10__["HTTP_INTERCEPTORS"],
          useClass: _interceptor_auth_interceptor__WEBPACK_IMPORTED_MODULE_16__["AuthInterceptor"],
          multi: true
        }],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]]
      })], AppModule);
      /***/
    },

    /***/
    "./src/app/startup/initializer/api/api.service.ts":
    /*!********************************************************!*\
      !*** ./src/app/startup/initializer/api/api.service.ts ***!
      \********************************************************/

    /*! exports provided: ApiService */

    /***/
    function srcAppStartupInitializerApiApiServiceTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ApiService", function () {
        return ApiService;
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


      var _initializer_checker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../initializer-checker */
      "./src/app/startup/initializer/initializer-checker.ts");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../../../../environments/environment */
      "./src/environments/environment.ts");

      var ApiService = /*#__PURE__*/function (_initializer_checker_) {
        _inherits(ApiService, _initializer_checker_);

        var _super = _createSuper(ApiService);

        function ApiService(httpClient, alertController, platorm) {
          var _this4;

          _classCallCheck(this, ApiService);

          _this4 = _super.call(this, alertController, platorm);
          _this4.httpClient = httpClient;
          _this4.alertController = alertController;
          _this4.platorm = platorm;
          return _this4;
        }

        _createClass(ApiService, [{
          key: "internalCheck",
          value: function internalCheck() {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
              console.log(_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].apiUrl + '/v1/version/current');

              _this5.httpClient.get(_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].apiUrl + '/v1/version/current').subscribe(function () {
                resolve();
              }, function (e) {
                console.error(e);
                reject();
              });
            });
          }
        }, {
          key: "errorMessage",
          value: function errorMessage() {
            return 'No se ha podido conectar a la api.';
          }
        }, {
          key: "stopLoadingOnError",
          value: function stopLoadingOnError() {
            return true;
          }
        }]);

        return ApiService;
      }(_initializer_checker__WEBPACK_IMPORTED_MODULE_3__["InitializerChecker"]);

      ApiService.ctorParameters = function () {
        return [{
          type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"]
        }];
      };

      ApiService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], ApiService);
      /***/
    },

    /***/
    "./src/app/startup/initializer/initializer-checker.ts":
    /*!************************************************************!*\
      !*** ./src/app/startup/initializer/initializer-checker.ts ***!
      \************************************************************/

    /*! exports provided: InitializerChecker */

    /***/
    function srcAppStartupInitializerInitializerCheckerTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "InitializerChecker", function () {
        return InitializerChecker;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _capacitor_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @capacitor/core */
      "./node_modules/@capacitor/core/dist/esm/index.js");

      var App = _capacitor_core__WEBPACK_IMPORTED_MODULE_1__["Plugins"].App;

      var InitializerChecker = /*#__PURE__*/function () {
        function InitializerChecker(alertController, platform) {
          _classCallCheck(this, InitializerChecker);

          this.alertController = alertController;
          this.platform = platform;
        }

        _createClass(InitializerChecker, [{
          key: "doCheck",
          value: function doCheck() {
            var _this6 = this;

            return new Promise(function (resolve, reject) {
              return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this6, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                var _this7 = this;

                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        this.internalCheck().then(function () {
                          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this7, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                              while (1) {
                                switch (_context4.prev = _context4.next) {
                                  case 0:
                                    resolve();

                                  case 1:
                                  case "end":
                                    return _context4.stop();
                                }
                              }
                            }, _callee4);
                          }));
                        })["catch"](function () {
                          return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(_this7, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                              while (1) {
                                switch (_context5.prev = _context5.next) {
                                  case 0:
                                    _context5.next = 2;
                                    return this.showMessage();

                                  case 2:
                                    if (this.stopLoadingOnError()) {
                                      reject();
                                    }

                                  case 3:
                                  case "end":
                                    return _context5.stop();
                                }
                              }
                            }, _callee5, this);
                          }));
                        });

                      case 1:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6, this);
              }));
            });
          }
        }, {
          key: "showMessage",
          value: function showMessage() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
              return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                  switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.next = 2;
                      return this.alertController.create({
                        cssClass: 'my-custom-class',
                        header: 'Error',
                        subHeader: 'Error en precarga de Delphi',
                        message: this.errorMessage(),
                        buttons: [this.stopLoadingOnError() ? {
                          text: 'Cerrar aplicación',
                          role: 'cancel',
                          cssClass: 'secondary',
                          handler: function handler() {
                            App.exitApp();
                          }
                        } : {
                          text: 'Continuar',
                          handler: function handler() {}
                        }]
                      });

                    case 2:
                      this.displayMessage = _context7.sent;
                      _context7.next = 5;
                      return this.displayMessage.present();

                    case 5:
                    case "end":
                      return _context7.stop();
                  }
                }
              }, _callee7, this);
            }));
          }
        }]);

        return InitializerChecker;
      }();
      /***/

    },

    /***/
    "./src/app/startup/splash-screen/splash-screen.component.scss":
    /*!********************************************************************!*\
      !*** ./src/app/startup/splash-screen/splash-screen.component.scss ***!
      \********************************************************************/

    /*! exports provided: default */

    /***/
    function srcAppStartupSplashScreenSplashScreenComponentScss(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony default export */


      __webpack_exports__["default"] = "@import 'https://fonts.googleapis.com/css?family=Raleway';\nbody {\n  margin: 0;\n}\n.container {\n  background: #ffffff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100vh;\n  width: 100vw;\n}\n.slogan {\n  color: #1c2051;\n  font-family: \"Raleway\", sans-serif;\n  font-size: 30px;\n  position: relative;\n  visibility: hidden;\n  -webkit-animation: scaleAndBounce 1s 2s ease-in-out, showUp 0.3s 2.1s forwards;\n          animation: scaleAndBounce 1s 2s ease-in-out, showUp 0.3s 2.1s forwards;\n}\n.slogan > .sub-slogan-loader {\n  visibility: hidden;\n  -webkit-animation: showUp 3s 4.2s forwards;\n          animation: showUp 3s 4.2s forwards;\n}\n.logo {\n  background: #1c2051;\n  border-radius: 50%;\n  display: -webkit-box;\n  width: 100px;\n  height: 100px;\n  position: relative;\n  left: 100px;\n  -webkit-animation: scaleAndBounce 1s ease-in-out, makeRectangle 0.3s 0.5s ease forwards, rotate 0.3s 1s ease-out, moveLeft 0.3s 1.5s ease forwards, scaleY 0.2s 3s forwards;\n          animation: scaleAndBounce 1s ease-in-out, makeRectangle 0.3s 0.5s ease forwards, rotate 0.3s 1s ease-out, moveLeft 0.3s 1.5s ease forwards, scaleY 0.2s 3s forwards;\n}\n.dot-bottom, .dot-middle, .dot-top {\n  background: #ffffff;\n  border-radius: 50%;\n  position: relative;\n  visibility: hidden;\n  -webkit-animation: scaleAndBounce 1s 2s ease-in-out, showUp 0.3s 2.1s forwards;\n          animation: scaleAndBounce 1s 2s ease-in-out, showUp 0.3s 2.1s forwards;\n}\n.dot-bottom::before, .dot-top::before {\n  content: \"\";\n  background: #ffffff;\n  width: 2px;\n  height: 40px;\n  position: absolute;\n  left: 17px;\n}\n.dot-top {\n  width: 20px;\n  height: 20px;\n  top: 12px;\n  left: 36px;\n}\n.dot-top::before {\n  transform: rotate(150deg);\n  bottom: -22px;\n}\n.dot-middle {\n  width: 10px;\n  height: 10px;\n  top: 50px;\n  left: 40px;\n}\n.dot-bottom {\n  width: 10px;\n  height: 10px;\n  top: 70px;\n}\n.dot-bottom::before {\n  transform: rotate(55deg);\n  bottom: -7px;\n}\n@-webkit-keyframes scaleAndBounce {\n  0% {\n    transform: scale(0);\n  }\n  50%, 80% {\n    transform: scale(1.2);\n  }\n  70%, 100% {\n    transform: scale(1);\n  }\n}\n@keyframes scaleAndBounce {\n  0% {\n    transform: scale(0);\n  }\n  50%, 80% {\n    transform: scale(1.2);\n  }\n  70%, 100% {\n    transform: scale(1);\n  }\n}\n@-webkit-keyframes makeRectangle {\n  0% {\n    border-radius: 50%;\n  }\n  100% {\n    border-radius: 25px;\n  }\n}\n@keyframes makeRectangle {\n  0% {\n    border-radius: 50%;\n  }\n  100% {\n    border-radius: 25px;\n  }\n}\n@-webkit-keyframes rotate {\n  0% {\n    transform: rotate(0);\n  }\n  100% {\n    transform: rotate(180deg);\n  }\n}\n@keyframes rotate {\n  0% {\n    transform: rotate(0);\n  }\n  100% {\n    transform: rotate(180deg);\n  }\n}\n@-webkit-keyframes moveLeft {\n  0% {\n    left: 100px;\n  }\n  100% {\n    left: -30px;\n  }\n}\n@keyframes moveLeft {\n  0% {\n    left: 100px;\n  }\n  100% {\n    left: -30px;\n  }\n}\n@-webkit-keyframes showUp {\n  0% {\n    visibility: hidden;\n  }\n  100% {\n    visibility: visible;\n  }\n}\n@keyframes showUp {\n  0% {\n    visibility: hidden;\n  }\n  100% {\n    visibility: visible;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc3RhcnR1cC9zcGxhc2gtc2NyZWVuL3NwbGFzaC1zY3JlZW4uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQVEseURBQUE7QUFRUjtFQUNFLFNBQUE7QUFORjtBQVNBO0VBQ0UsbUJBWFk7RUFZWixhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0FBTkY7QUFTQTtFQUNFLGNBbkJVO0VBb0JWLGtDQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSw4RUFBQTtVQUFBLHNFQUFBO0FBTkY7QUFVQTtFQUNFLGtCQUFBO0VBQ0EsMENBQUE7VUFBQSxrQ0FBQTtBQVBGO0FBVUE7RUFDRSxtQkFsQ1U7RUFtQ1Ysa0JBaENNO0VBaUNOLG9CQUFBO0VBQ0EsWUFwQ1U7RUFxQ1YsYUFyQ1U7RUFzQ1Ysa0JBQUE7RUFDQSxXQXZDVTtFQXdDViwyS0FBQTtVQUFBLG1LQUFBO0FBUEY7QUFjQTtFQUNFLG1CQWxEWTtFQW1EWixrQkEvQ007RUFnRE4sa0JBQUE7RUFDQSxrQkFBQTtFQUNBLDhFQUFBO1VBQUEsc0VBQUE7QUFYRjtBQWVBO0VBQ0UsV0FBQTtFQUNBLG1CQTVEWTtFQTZEWixVQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtBQVpGO0FBZUE7RUFFRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0FBYkY7QUFlRTtFQUVFLHlCQUFBO0VBQ0EsYUFBQTtBQWRKO0FBa0JBO0VBRUUsV0FoRlM7RUFpRlQsWUFqRlM7RUFrRlQsU0FBQTtFQUNBLFVBQUE7QUFoQkY7QUFtQkE7RUFFRSxXQXhGUztFQXlGVCxZQXpGUztFQTBGVCxTQUFBO0FBakJGO0FBbUJFO0VBRUUsd0JBQUE7RUFDQSxZQUFBO0FBbEJKO0FBdUJBO0VBQ0U7SUFDRSxtQkFBQTtFQXBCRjtFQXNCQTtJQUNFLHFCQUFBO0VBcEJGO0VBc0JBO0lBQ0UsbUJBQUE7RUFwQkY7QUFDRjtBQVdBO0VBQ0U7SUFDRSxtQkFBQTtFQXBCRjtFQXNCQTtJQUNFLHFCQUFBO0VBcEJGO0VBc0JBO0lBQ0UsbUJBQUE7RUFwQkY7QUFDRjtBQXVCQTtFQUNFO0lBQ0Usa0JBakhJO0VBNEZOO0VBdUJBO0lBQ0UsbUJBQUE7RUFyQkY7QUFDRjtBQWVBO0VBQ0U7SUFDRSxrQkFqSEk7RUE0Rk47RUF1QkE7SUFDRSxtQkFBQTtFQXJCRjtBQUNGO0FBd0JBO0VBQ0U7SUFDRSxvQkFBQTtFQXRCRjtFQXdCQTtJQUNFLHlCQUFBO0VBdEJGO0FBQ0Y7QUFnQkE7RUFDRTtJQUNFLG9CQUFBO0VBdEJGO0VBd0JBO0lBQ0UseUJBQUE7RUF0QkY7QUFDRjtBQXlCQTtFQUNFO0lBQ0UsV0FBQTtFQXZCRjtFQXlCQTtJQUNFLFdBQUE7RUF2QkY7QUFDRjtBQWlCQTtFQUNFO0lBQ0UsV0FBQTtFQXZCRjtFQXlCQTtJQUNFLFdBQUE7RUF2QkY7QUFDRjtBQTBCQTtFQUNFO0lBQ0Usa0JBQUE7RUF4QkY7RUEwQkE7SUFDRSxtQkFBQTtFQXhCRjtBQUNGO0FBa0JBO0VBQ0U7SUFDRSxrQkFBQTtFQXhCRjtFQTBCQTtJQUNFLG1CQUFBO0VBeEJGO0FBQ0YiLCJmaWxlIjoic3JjL2FwcC9zdGFydHVwL3NwbGFzaC1zY3JlZW4vc3BsYXNoLXNjcmVlbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1SYWxld2F5JztcblxuJGNvbG9yLWJyYW5kOiAjZmZmZmZmO1xuJGNvbG9yLWFsdDogIzFjMjA1MTtcbiRsb2dvLXNpemU6IDEwMHB4O1xuJGRvdC1zaXplOiAxMHB4O1xuJHJvdW5kOiA1MCU7XG5cbmJvZHkge1xuICBtYXJnaW46IDA7XG59XG5cbi5jb250YWluZXIge1xuICBiYWNrZ3JvdW5kOiAkY29sb3ItYnJhbmQ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBoZWlnaHQ6IDEwMHZoO1xuICB3aWR0aDogMTAwdnc7XG59XG5cbi5zbG9nYW4ge1xuICBjb2xvcjogJGNvbG9yLWFsdDtcbiAgZm9udC1mYW1pbHk6ICdSYWxld2F5Jywgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAzMHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgYW5pbWF0aW9uOiBzY2FsZUFuZEJvdW5jZSAxcyAycyBlYXNlLWluLW91dCxcbiAgc2hvd1VwIDAuM3MgMi4xcyBmb3J3YXJkcztcbn1cblxuLnNsb2dhbiA+IC5zdWItc2xvZ2FuLWxvYWRlciB7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgYW5pbWF0aW9uOiBzaG93VXAgM3MgNC4ycyBmb3J3YXJkcztcbn1cblxuLmxvZ28ge1xuICBiYWNrZ3JvdW5kOiAkY29sb3ItYWx0O1xuICBib3JkZXItcmFkaXVzOiAkcm91bmQ7XG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICB3aWR0aDogJGxvZ28tc2l6ZTtcbiAgaGVpZ2h0OiAkbG9nby1zaXplO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGxlZnQ6ICRsb2dvLXNpemU7XG4gIGFuaW1hdGlvbjogc2NhbGVBbmRCb3VuY2UgMXMgZWFzZS1pbi1vdXQsXG4gIG1ha2VSZWN0YW5nbGUgMC4zcyAwLjVzIGVhc2UgZm9yd2FyZHMsXG4gIHJvdGF0ZSAwLjNzIDFzIGVhc2Utb3V0LFxuICBtb3ZlTGVmdCAwLjNzIDEuNXMgZWFzZSBmb3J3YXJkcyxcbiAgc2NhbGVZIDAuMnMgM3MgZm9yd2FyZHM7XG59XG5cbiVkb3Qge1xuICBiYWNrZ3JvdW5kOiAkY29sb3ItYnJhbmQ7XG4gIGJvcmRlci1yYWRpdXM6ICRyb3VuZDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIGFuaW1hdGlvbjogc2NhbGVBbmRCb3VuY2UgMXMgMnMgZWFzZS1pbi1vdXQsXG4gIHNob3dVcCAwLjNzIDIuMXMgZm9yd2FyZHM7XG59XG5cbiVkb3QtbGluZSB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIGJhY2tncm91bmQ6ICRjb2xvci1icmFuZDtcbiAgd2lkdGg6IDJweDtcbiAgaGVpZ2h0OiA0MHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDE3cHg7XG59XG5cbi5kb3QtdG9wIHtcbiAgQGV4dGVuZCAlZG90O1xuICB3aWR0aDogJGRvdC1zaXplKiAyO1xuICBoZWlnaHQ6ICRkb3Qtc2l6ZSogMjtcbiAgdG9wOiAxMnB4O1xuICBsZWZ0OiAzNnB4O1xuXG4gICY6OmJlZm9yZSB7XG4gICAgQGV4dGVuZCAlZG90LWxpbmU7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTUwZGVnKTtcbiAgICBib3R0b206IC0yMnB4O1xuICB9XG59XG5cbi5kb3QtbWlkZGxlIHtcbiAgQGV4dGVuZCAlZG90O1xuICB3aWR0aDogJGRvdC1zaXplO1xuICBoZWlnaHQ6ICRkb3Qtc2l6ZTtcbiAgdG9wOiA1MHB4O1xuICBsZWZ0OiA0MHB4XG59XG5cbi5kb3QtYm90dG9tIHtcbiAgQGV4dGVuZCAlZG90O1xuICB3aWR0aDogJGRvdC1zaXplO1xuICBoZWlnaHQ6ICRkb3Qtc2l6ZTtcbiAgdG9wOiA3MHB4O1xuXG4gICY6OmJlZm9yZSB7XG4gICAgQGV4dGVuZCAlZG90LWxpbmU7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoNTVkZWcpO1xuICAgIGJvdHRvbTogLTdweDtcbiAgfVxufVxuXG5cbkBrZXlmcmFtZXMgc2NhbGVBbmRCb3VuY2Uge1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwKVxuICB9XG4gIDUwJSwgODAlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMilcbiAgfVxuICA3MCUsIDEwMCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSlcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIG1ha2VSZWN0YW5nbGUge1xuICAwJSB7XG4gICAgYm9yZGVyLXJhZGl1czogJHJvdW5kXG4gIH1cbiAgMTAwJSB7XG4gICAgYm9yZGVyLXJhZGl1czogMjVweFxuICB9XG59XG5cbkBrZXlmcmFtZXMgcm90YXRlIHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDApXG4gIH1cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKVxuICB9XG59XG5cbkBrZXlmcmFtZXMgbW92ZUxlZnQge1xuICAwJSB7XG4gICAgbGVmdDogMTAwcHg7XG4gIH1cbiAgMTAwJSB7XG4gICAgbGVmdDogLTMwcHg7XG4gIH1cbn1cblxuQGtleWZyYW1lcyBzaG93VXAge1xuICAwJSB7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICB9XG4gIDEwMCUge1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIH1cbn1cblxuIl19 */";
      /***/
    },

    /***/
    "./src/app/startup/splash-screen/splash-screen.component.ts":
    /*!******************************************************************!*\
      !*** ./src/app/startup/splash-screen/splash-screen.component.ts ***!
      \******************************************************************/

    /*! exports provided: SplashScreenComponent */

    /***/
    function srcAppStartupSplashScreenSplashScreenComponentTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "SplashScreenComponent", function () {
        return SplashScreenComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

      var SplashScreenComponent = /*#__PURE__*/function () {
        function SplashScreenComponent() {
          _classCallCheck(this, SplashScreenComponent);

          this.showSplash = true;
        }

        _createClass(SplashScreenComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            this.windowWidth = '-' + window.innerWidth + 'px';
            /*
                  setTimeout(() => {
                    this.showSplash = !this.showSplash;
                  }, 500);*/
          }
        }]);

        return SplashScreenComponent;
      }();

      SplashScreenComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'delphi-splash-screen',
        template: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! raw-loader!./splash-screen.component.html */
        "./node_modules/raw-loader/dist/cjs.js!./src/app/startup/splash-screen/splash-screen.component.html"))["default"],
        styles: [Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"])(__webpack_require__(
        /*! ./splash-screen.component.scss */
        "./src/app/startup/splash-screen/splash-screen.component.scss"))["default"]]
      })], SplashScreenComponent);
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
        apiUrl: 'http://127.0.0.1:8080'
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
    "./src/guards/auth-guard.ts":
    /*!**********************************!*\
      !*** ./src/guards/auth-guard.ts ***!
      \**********************************/

    /*! exports provided: AuthGuard */

    /***/
    function srcGuardsAuthGuardTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AuthGuard", function () {
        return AuthGuard;
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


      var _services_authentication_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../services/authentication-service */
      "./src/services/authentication-service.ts");

      var AuthGuard = /*#__PURE__*/function () {
        function AuthGuard(auth) {
          _classCallCheck(this, AuthGuard);

          this.auth = auth;
        }

        _createClass(AuthGuard, [{
          key: "canActivate",
          value: function canActivate() {
            return this.auth.isAuthenticated();
          }
        }, {
          key: "canActivateChild",
          value: function canActivateChild() {
            return this.canActivate();
          }
        }]);

        return AuthGuard;
      }();

      AuthGuard.ctorParameters = function () {
        return [{
          type: _services_authentication_service__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"]
        }];
      };

      AuthGuard = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], AuthGuard);
      /***/
    },

    /***/
    "./src/interceptor/auth.interceptor.ts":
    /*!*********************************************!*\
      !*** ./src/interceptor/auth.interceptor.ts ***!
      \*********************************************/

    /*! exports provided: AuthInterceptor */

    /***/
    function srcInterceptorAuthInterceptorTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AuthInterceptor", function () {
        return AuthInterceptor;
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


      var _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ../services/authentication-service */
      "./src/services/authentication-service.ts");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs/operators */
      "./node_modules/rxjs/_esm2015/operators/index.js");

      var AuthInterceptor = /*#__PURE__*/function () {
        function AuthInterceptor(authenticationService) {
          _classCallCheck(this, AuthInterceptor);

          this.authenticationService = authenticationService;
        }

        _createClass(AuthInterceptor, [{
          key: "intercept",
          value: function intercept(req, next) {
            return this.authenticationService.getJwt().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])(function (jwt) {
              var authReq = req.clone({
                headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + jwt
                })
              });
              return next.handle(authReq);
            }));
          }
        }]);

        return AuthInterceptor;
      }();

      AuthInterceptor.ctorParameters = function () {
        return [{
          type: _services_authentication_service__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"]
        }];
      };

      AuthInterceptor = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()], AuthInterceptor);
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


      var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app/app.module */
      "./src/app/app.module.ts");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./environments/environment */
      "./src/environments/environment.ts");

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
      }

      Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
        return console.log(err);
      });
      /***/
    },

    /***/
    "./src/services/authentication-service.ts":
    /*!************************************************!*\
      !*** ./src/services/authentication-service.ts ***!
      \************************************************/

    /*! exports provided: AuthenticationService */

    /***/
    function srcServicesAuthenticationServiceTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AuthenticationService", function () {
        return AuthenticationService;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "./node_modules/tslib/tslib.es6.js");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @ionic/angular */
      "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
      /* harmony import */


      var _ionic_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @ionic/storage */
      "./node_modules/@ionic/storage/__ivy_ngcc__/fesm2015/ionic-storage.js");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! rxjs */
      "./node_modules/rxjs/_esm2015/index.js");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/common/http */
      "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
      /* harmony import */


      var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @auth0/angular-jwt */
      "./node_modules/@auth0/angular-jwt/__ivy_ngcc__/fesm2015/auth0-angular-jwt.js");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../environments/environment */
      "./src/environments/environment.ts");

      var TOKEN_KEY = 'auth-token';

      var AuthenticationService = /*#__PURE__*/function () {
        function AuthenticationService(storage, plt, http, toastController) {
          var _this8 = this;

          _classCallCheck(this, AuthenticationService);

          this.storage = storage;
          this.plt = plt;
          this.http = http;
          this.toastController = toastController;
          this.authenticationState = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"](false);
          this.plt.ready().then(function () {
            _this8.checkToken();
          });
        }

        _createClass(AuthenticationService, [{
          key: "checkToken",
          value: function checkToken() {
            var _this9 = this;

            this.storage.get('JWT_TOKEN').then(function (jwt) {
              if (jwt !== '' && jwt !== null) {
                _this9.authenticationState.next(true);
              }
            });
          }
        }, {
          key: "getJwt",
          value: function getJwt() {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["from"])(this.storage.get('JWT_TOKEN'));
          }
        }, {
          key: "sendToast",
          value: function sendToast(msg) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
              var toast;
              return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.next = 2;
                      return this.toastController.create({
                        message: msg,
                        duration: 2000
                      });

                    case 2:
                      toast = _context8.sent;
                      _context8.next = 5;
                      return toast.present();

                    case 5:
                    case "end":
                      return _context8.stop();
                  }
                }
              }, _callee8, this);
            }));
          }
        }, {
          key: "login",
          value: function login(user) {
            var _this10 = this;

            return new Promise(function (resolve, reject) {
              _this10.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].apiUrl + '/v1/session/login', user).subscribe(function (userLogin) {
                _this10.storage.set('JWT_TOKEN', userLogin.jwt).then(function () {
                  _this10.authenticationState.next(true);

                  _this10.sendToast('Conexión satisfactoria').then(function (r) {
                    return resolve(userLogin);
                  });
                })["catch"](function (e) {
                  console.log('ERROR EN LOGIN -> ', e);
                  reject();
                });
              }, function (err) {
                if (err.status === 400 && err.error.message === 'INVALID_LOGIN') {
                  _this10.sendToast('Credenciales inválidas').then(function (r) {
                    return reject();
                  });
                } else if (err.status === 400 && err.error.message === 'USER_BLOCKED') {
                  _this10.sendToast('Usuario bloqueado').then(function (r) {
                    return reject();
                  });
                } else if (err.status === 400) {
                  _this10.sendToast('Error en la aplicación').then(function (r) {
                    return reject();
                  });
                } else if (err.status === 500) {
                  _this10.sendToast('Error en el servidor').then(function (r) {
                    return reject();
                  });
                } else {
                  _this10.sendToast('Error desconocido').then(function (r) {
                    return reject();
                  });
                }

                reject();
              });
            });
          }
        }, {
          key: "logout",
          value: function logout() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
              return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                  switch (_context9.prev = _context9.next) {
                    case 0:
                      _context9.next = 2;
                      return this.storage.set('JWT_TOKEN', null);

                    case 2:
                      this.authenticationState.next(false);

                    case 3:
                    case "end":
                      return _context9.stop();
                  }
                }
              }, _callee9, this);
            }));
          }
        }, {
          key: "isAuthenticated",
          value: function isAuthenticated() {
            var _this11 = this;

            return new Promise(function (resolve, reject) {
              _this11.storage.get('JWT_TOKEN').then(function (jwt) {
                if (jwt === null || jwt === '') {
                  resolve(false);
                }

                var helper = new _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_6__["JwtHelperService"]();
                var isExpired = helper.isTokenExpired(jwt);

                if (!isExpired) {
                  resolve(true);
                }

                resolve(false);
              })["catch"](function (e) {
                reject(false);
              });
            });
          }
        }, {
          key: "needsOnboard",
          value: function needsOnboard() {
            var _this12 = this;

            return new Promise(function (resolve, reject) {
              _this12.getUser().then(function (user) {
                resolve(user.needsOnboard);
              })["catch"](function () {
                reject();
              });
            });
          }
        }, {
          key: "getUser",
          value: function getUser() {
            var _this13 = this;

            return new Promise(function (resolve, reject) {
              _this13.storage.get('JWT_TOKEN').then(function (jwt) {
                if (jwt === null || jwt === '') {
                  resolve(null);
                }

                var helper = new _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_6__["JwtHelperService"]();
                var jwtData = helper.decodeToken(jwt);
                resolve(jwtData.user);
              })["catch"](function (e) {
                reject(false);
              });
            });
          }
        }]);

        return AuthenticationService;
      }();

      AuthenticationService.ctorParameters = function () {
        return [{
          type: _ionic_storage__WEBPACK_IMPORTED_MODULE_3__["Storage"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["Platform"]
        }, {
          type: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["ToastController"]
        }];
      };

      AuthenticationService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
        providedIn: 'root'
      })], AuthenticationService);
      /***/
    },

    /***/
    "./src/services/init.service.ts":
    /*!**************************************!*\
      !*** ./src/services/init.service.ts ***!
      \**************************************/

    /*! exports provided: InitService */

    /***/
    function srcServicesInitServiceTs(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "InitService", function () {
        return InitService;
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


      var _app_startup_initializer_api_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../app/startup/initializer/api/api.service */
      "./src/app/startup/initializer/api/api.service.ts");
      /* harmony import */


      var _capacitor_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @capacitor/core */
      "./node_modules/@capacitor/core/dist/esm/index.js");
      /* harmony import */


      var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @ionic/angular */
      "./node_modules/@ionic/angular/__ivy_ngcc__/fesm2015/ionic-angular.js");

      var App = _capacitor_core__WEBPACK_IMPORTED_MODULE_3__["Plugins"].App;

      var InitService = /*#__PURE__*/function () {
        function InitService(apiService, platform) {
          _classCallCheck(this, InitService);

          this.apiService = apiService;
          this.platform = platform;
        }

        _createClass(InitService, [{
          key: "doInit",
          value: function doInit() {
            return this.initializeApi();
          }
        }, {
          key: "initializeApi",
          value: function initializeApi() {
            var _this14 = this;

            return new Promise(function (resolve) {
              _this14.apiService.doCheck().then(function () {
                resolve(true);
              })["catch"](function (e) {
                console.error('{INITIALIZE_API_ERR}', e);
                resolve(false);
              });
            });
          }
        }]);

        return InitService;
      }();

      InitService.ctorParameters = function () {
        return [{
          type: _app_startup_initializer_api_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]
        }, {
          type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["Platform"]
        }];
      };

      InitService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
      })], InitService);
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