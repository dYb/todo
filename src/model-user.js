"use strict";
var crypto = require("crypto");
var User = (function () {
    function User(name, password, todos) {
        this.name = name;
        this.todos = todos || [];
        this.password = password;
    }
    User.prototype.addTodo = function (todoId) {
        this.todos.push(todoId);
    };
    User.prototype.removeTodo = function (todoId) {
        this.todos = this.todos.filter(function (todo) { return todo !== todoId; });
    };
    return User;
}());
exports.User = User;
var fakeDatabase = {};
var Users = {
    create: function (user) {
        if (fakeDatabase[user.name]) {
            throw new Error('user exists');
        }
        fakeDatabase[user.name] = Object.assign({}, user, {
            password: crypto.createHash('md5').update(user.password).digest('hex')
        });
        return new User(user.name, user.password, user.todos);
    },
    getByName: function (_name) {
        var user = fakeDatabase[_name];
        if (user) {
            var name_1 = user.name, password = user.password, todos = user.todos;
            return new User(name_1, password, todos);
        }
        return null;
    },
    getAll: function () {
        return Object.keys(fakeDatabase).filter(function (name) { return fakeDatabase[name]; }).map(function (_name) {
            var _a = fakeDatabase[_name], name = _a.name, password = _a.password, todos = _a.todos;
            return new User(name, password, todos);
        });
    },
    "delete": function (name) {
        fakeDatabase[name] = null;
    },
    verify: function (_name, _password) {
        var user = Users.getByName(_name);
        return !!user && user.password === crypto.createHash('md5').update(_password).digest('hex');
    }
};
exports.__esModule = true;
exports["default"] = Users;
