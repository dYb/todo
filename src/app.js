"use strict";
var jwt = require('koa-jwt');
var Koa = require("koa");
var koaBody = require("koa-body");
var routes_1 = require("./routes");
var app = new Koa();
app
    .use(koaBody())
    .use(jwt({
    secret: routes_1.SECRET_KEY,
    passthrough: true
}))
    .use(routes_1["default"].routes())
    .use(routes_1["default"].allowedMethods());
exports.__esModule = true;
exports["default"] = app;
