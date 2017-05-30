console.log('//0005//////////////////////////////');

// demo01
var a = 20;
function fn1 () {
    console.log(this.a);
}
fn1(); // 20

// demo02
var aa = 20;
function fn2 () {
    function foo () {
        console.log(this.aa);
    }
    foo();
}
fn2(); // 20

// demo03
var aaa = 20;
var obj = {
    aaa: 10,
    c: this.aaa + 20,
    fn3: function () {
        return this.aaa;
    }
}

console.log(obj.c);     // 40
console.log(obj.fn3()); // 10



// 定义父级的构造函数
var Person = function(name, age) {
    this.name = name;
    this.age  = age;
    this.gender = ['man', 'woman'];
}

// 定义子类的构造函数
var Student = function(name, age, high) {

    // use call
    Person.call(this, name, age);
    this.high = high;
}
Student.prototype.message = function() {
    console.log('name:'+this.name+', age:'+this.age+', high:'+this.high+', gender:'+this.gender[0]+';');
}

new Student('xiaom', 12, '150cm').message();

// result
// ----------
// name:xiaom, age:12, high:150cm, gender:man;

/*
var Student = function(name, age, high) {
    this.name = name;
    this.age  = age;
    this.gender = ['man', 'woman'];
    // Person.call(this, name, age); 这一句话，相当于上面三句话，因此实现了继承
    this.high = high;
}
 */

// 借助闭包与apply方法，封装一个bind方法。
function bind(fn, obj) {
    return function() {
        return fn.apply(obj, arguments);
    }
}

var obj = {
    a: 20,
    getA: function() {
        setTimeout(bind(function() {
            console.log(this.a)
        }, this), 1000)
    }
}

obj.getA();

// 使用ES5中已经自带的bind方法。
var obj = {
    a: 20,
    getA: function() {
        setTimeout(function() {
            console.log(this.a)
        }.bind(this), 1000)
    }
}



// 构造函数与原型方法上的this
/*
 创建一个新的对象；
 将构造函数的this指向这个新对象；
 指向构造函数的代码，为这个对象添加属性，方法等；
 返回新对象。

 因此，当new操作符调用构造函数时，this其实指向的是这个新创建的对象，最后又将新的对象返回出来，
 被实例对象p1接收。因此，我们可以说，这个时候，构造函数的this，指向了新的实例对象，p1。

 而原型方法上的this就好理解多了，根据上边对函数中this的定义，
 p1.getName()中的getName为调用者，他被p1所拥有，因此getName中的this，也是指向了p1。

 */
function Person(name, age) {
    // 这里的this指向了谁?
    console.log(this); // name:xiaom, age:12, high:150cm, gender:man;
    this.name = name;
    this.age = age;
}

Person.prototype.getName = function() {
    // 这里的this又指向了谁？
    console.log(this); // Person {name: "Nick", age: 20, gender: Array[2]}
    return this.name;
}

// 上面的2个this，是同一个吗，他们是否指向了原型对象？

var p1 = new Person('Nick', 20);
p1.getName();





// JavaScript中的this陷阱
// global this
/*

在浏览器里，在全局范围内，this等价于window对象。
1 <script type="text/javascript">
2     console.log(this === window); //true
3 </script>

 */

/*

在浏览器里，在全局范围内，用var声明一个变量和给this或者window添加属性是等价的。
1 <script type="text/javascript">
2     var foo = "bar";
3     console.log(this.foo); //logs "bar"
4     console.log(window.foo); //logs "bar"
5 </script>

 */

/*

如果你在声明一个变量的时候没有使用var或者let(ECMAScript 6),你就是在给全局的this添加或者改变属性值。
 1 <script type="text/javascript">
 2     foo = "bar";
 3
 4     function testThis() {
 5       foo = "foo";
 6     }
 7
 8     console.log(this.foo); //logs "bar"
 9     testThis();
10     console.log(this.foo); //logs "foo"
11 </script>

 */

/*

在node环境里，如果使用REPL(Read-Eval-Print Loop，简称REPL:读取-求值-输出,是一个简单的，
交互式的编程环境)来执行程序,this并不是最高级的命名空间，最高级的是global.
> this
{ ArrayBuffer: [Function: ArrayBuffer],
  Int8Array: { [Function: Int8Array] BYTES_PER_ELEMENT: 1 },
  Uint8Array: { [Function: Uint8Array] BYTES_PER_ELEMENT: 1 },
  ...
> global === this
true

 */

/*

在node环境里，如果执行一个js脚本，在全局范围内，this以一个空对象开始作为最高级的命名空间，这个时候，它和global不是等价的。
 1 test.js脚本内容：
 2
 3 console.log(this);
 4 console.log(this === global);
 5
 6 REPL运行脚本：
 7
 8 $ node test.js
 9 {}
10 false

 */

/*

在node环境里，在全局范围内，如果你用REPL执行一个脚本文件，用var声明一个变量并不会和在浏览器里面一样将这个变量添加给this。
1 test.js:
2
3 var foo = "bar";
4 console.log(this.foo);
5
6 $ node test.js
7 undefined

 */

/*

但是如果你不是用REPL执行脚本文件，而是直接执行代码，结果和在浏览器里面是一样的(神坑)
1 > var foo = "bar";
2 > this.foo
3 bar
4 > global.foo
5 bar

 */

/*

在node环境里，用REPL运行脚本文件的时候，如果在声明变量的时候没有使用var或者let，
这个变量会自动添加到global对象，但是不会自动添加给this对象。如果是直接执行代码，则会同时添加给global和this
1 test.js
2
3 foo = "bar";
4 console.log(this.foo);
5 console.log(global.foo);
6
7 $ node test.js
8 undefined
9 bar

 */

// function this
/*

 1 <script type="text/javascript">
 2     foo = "bar";
 3
 4     function testThis() {
 5       this.foo = "foo";
 6     }
 7
 8     console.log(this.foo); //logs "bar"
 9     testThis();
10     console.log(this.foo); //logs "foo"
11 </script>

 */

/*

test.js

foo = "bar";

function testThis () {
  this.foo = "foo";
}

console.log(global.foo);
testThis();
console.log(global.foo);
$ node test.js
bar
foo

 */

/*

 1 <script type="text/javascript">
 2     foo = "bar";
 3
 4     function testThis() {
 5       "use strict";
 6       this.foo = "foo";
 7     }
 8
 9     console.log(this.foo); //logs "bar"
10     testThis();  //Uncaught TypeError: Cannot set property 'foo' of undefined
11 </script>

 */

/*

1 <script type="text/javascript">
 2     foo = "bar";
 3
 4     function testThis() {
 5       this.foo = "foo";
 6     }
 7
 8     console.log(this.foo); //logs "bar"
 9     new testThis();
10     console.log(this.foo); //logs "bar"
11
12     console.log(new testThis().foo); //logs "foo"
13 </script>

 */


// prototype this
/*

1 function Thing() {
2       console.log(this.foo);
3 }
4
5 Thing.prototype.foo = "bar";
6
7 var thing = new Thing(); //logs "bar"
8 console.log(thing.foo);  //logs "bar"

 */

/*

 1 function Thing() {
 2 }
 3 Thing.prototype.foo = "bar";
 4 Thing.prototype.logFoo = function () {
 5     console.log(this.foo);
 6 }
 7 Thing.prototype.setFoo = function (newFoo) {
 8     this.foo = newFoo;
 9 }
10
11 var thing1 = new Thing();
12 var thing2 = new Thing();
13
14 thing1.logFoo(); //logs "bar"
15 thing2.logFoo(); //logs "bar"
16
17 thing1.setFoo("foo");
18 thing1.logFoo(); //logs "foo";
19 thing2.logFoo(); //logs "bar";
20
21 thing2.foo = "foobar";
22 thing1.logFoo(); //logs "foo";
23 thing2.logFoo(); //logs "foobar";

 */

/*

 1 function Thing() {
 2 }
 3 Thing.prototype.foo = "bar";
 4 Thing.prototype.logFoo = function () {
 5     console.log(this.foo);
 6 }
 7 Thing.prototype.setFoo = function (newFoo) {
 8     this.foo = newFoo;
 9 }
10 Thing.prototype.deleteFoo = function () {
11     delete this.foo;
12 }
13 var thing = new Thing();
14 thing.setFoo("foo");
15 thing.logFoo(); //logs "foo";
16 thing.deleteFoo();
17 thing.logFoo(); //logs "bar";
18 thing.foo = "foobar";
19 thing.logFoo(); //logs "foobar";
20 delete thing.foo;
21 thing.logFoo(); //logs "bar";

 */

/*

 1 function Thing() {
 2 }
 3 Thing.prototype.foo = "bar";
 4 Thing.prototype.logFoo = function () {
 5     console.log(this.foo, Thing.prototype.foo);
 6 }
 7
 8 var thing = new Thing();
 9 thing.foo = "foo";
10 thing.logFoo(); //logs "foo bar";

 */

/*

1 function Thing() {
2 }
3 Thing.prototype.things = [];
4
5
6 var thing1 = new Thing();
7 var thing2 = new Thing();
8 thing1.things.push("foo");
9 console.log(thing2.things); //logs ["foo"]

 */

/*

 1 function Thing() {
 2     this.things = [];
 3 }
 4
 5
 6 var thing1 = new Thing();
 7 var thing2 = new Thing();
 8 thing1.things.push("foo");
 9 console.log(thing1.things); //logs ["foo"]
10 console.log(thing2.things); //logs []

 */

/*

 1 function Thing1() {
 2 }
 3 Thing1.prototype.foo = "bar";
 4
 5 function Thing2() {
 6 }
 7 Thing2.prototype = new Thing1();
 8
 9
10 var thing = new Thing2();
11 console.log(thing.foo); //logs "bar"

 */

/*

 1 function Thing1() {
 2 }
 3 Thing1.prototype.foo = "bar";
 4
 5 function Thing2() {
 6     this.foo = "foo";
 7 }
 8 Thing2.prototype = new Thing1();
 9
10 function Thing3() {
11 }
12 Thing3.prototype = new Thing2();
13
14
15 var thing = new Thing3();
16 console.log(thing.foo); //logs "foo"

 */

/*

 1 function Thing1() {
 2 }
 3 Thing1.prototype.foo = "bar";
 4 Thing1.prototype.logFoo = function () {
 5     console.log(this.foo);
 6 }
 7
 8 function Thing2() {
 9     this.foo = "foo";
10 }
11 Thing2.prototype = new Thing1();
12
13
14 var thing = new Thing2();
15 thing.logFoo(); //logs "foo";

 */

/*

 1 function Thing() {
 2 }
 3 Thing.prototype.foo = "bar";
 4 Thing.prototype.logFoo = function () {
 5     var info = "attempting to log this.foo:";
 6     function doIt() {
 7         console.log(info, this.foo);
 8     }
 9     doIt();
10 }
11
12
13 var thing = new Thing();
14 thing.logFoo();  //logs "attempting to log this.foo: undefined"

 */

/*

 1 function Thing() {
 2 }
 3 Thing.prototype.foo = "bar";
 4 Thing.prototype.logFoo = function () {
 5     console.log(this.foo);
 6 }
 7
 8 function doIt(method) {
 9     method();
10 }
11
12
13 var thing = new Thing();
14 thing.logFoo(); //logs "bar"
15 doIt(thing.logFoo); //logs undefined

 */

/*

 1 function Thing() {
 2 }
 3 Thing.prototype.foo = "bar";
 4 Thing.prototype.logFoo = function () {
 5     var self = this;
 6     var info = "attempting to log this.foo:";
 7     function doIt() {
 8         console.log(info, self.foo);
 9     }
10     doIt();
11 }
12
13
14 var thing = new Thing();
15 thing.logFoo();  //logs "attempting to log this.foo: bar"

 */

/*

 1 function Thing() {
 2 }
 3 Thing.prototype.foo = "bar";
 4 Thing.prototype.logFoo = function () {
 5     var self = this;
 6     function doIt() {
 7         console.log(self.foo);
 8     }
 9     doIt();
10 }
11
12 function doItIndirectly(method) {
13     method();
14 }
15
16
17 var thing = new Thing();
18 thing.logFoo(); //logs "bar"
19 doItIndirectly(thing.logFoo); //logs undefined

 */

/*

 1 function Thing() {
 2 }
 3 Thing.prototype.foo = "bar";
 4 Thing.prototype.logFoo = function () {
 5     console.log(this.foo);
 6 }
 7
 8 function doIt(method) {
 9     method();
10 }
11
12
13 var thing = new Thing();
14 doIt(thing.logFoo.bind(thing)); //logs bar

 */

/*

 1 function Thing() {
 2 }
 3 Thing.prototype.foo = "bar";
 4 Thing.prototype.logFoo = function () {
 5     function doIt() {
 6         console.log(this.foo);
 7     }
 8     doIt.apply(this);
 9 }
10
11 function doItIndirectly(method) {
12     method();
13 }
14
15
16 var thing = new Thing();
17 doItIndirectly(thing.logFoo.bind(thing)); //logs bar

 */

/*

 1 function Thing() {
 2 }
 3 Thing.prototype.foo = "bar";
 4
 5
 6 function logFoo(aStr) {
 7     console.log(aStr, this.foo);
 8 }
 9
10
11 var thing = new Thing();
12 logFoo.bind(thing)("using bind"); //logs "using bind bar"
13 logFoo.apply(thing, ["using apply"]); //logs "using apply bar"
14 logFoo.call(thing, "using call"); //logs "using call bar"
15 logFoo("using nothing"); //logs "using nothing undefined"

 */

/*

 1 function Thing() {
 2     return {};
 3 }
 4 Thing.prototype.foo = "bar";
 5
 6
 7 Thing.prototype.logFoo = function () {
 8     console.log(this.foo);
 9 }
10
11
12 var thing = new Thing();
13 thing.logFoo(); //Uncaught TypeError: undefined is not a function

 */

/*

 1 function Thing() {
 2 }
 3 Thing.prototype.foo = "bar";
 4
 5
 6 Thing.prototype.logFoo = function () {
 7     console.log(this.foo);
 8 }
 9
10
11 var thing =  Object.create(Thing.prototype);
12 thing.logFoo(); //logs "bar"

 */

/*

 1 function Thing() {
 2     this.foo = "foo";
 3 }
 4 Thing.prototype.foo = "bar";
 5
 6
 7 Thing.prototype.logFoo = function () {
 8     console.log(this.foo);
 9 }
10
11
12 var thing =  Object.create(Thing.prototype);
13 thing.logFoo(); //logs "bar"

 */

/*

 1 function Thing1() {
 2     this.foo = "foo";
 3 }
 4 Thing1.prototype.foo = "bar";
 5
 6 function Thing2() {
 7     this.logFoo(); //logs "bar"
 8     Thing1.apply(this);
 9     this.logFoo(); //logs "foo"
10 }
11 Thing2.prototype = Object.create(Thing1.prototype);
12 Thing2.prototype.logFoo = function () {
13     console.log(this.foo);
14 }
15
16 var thing = new Thing2();

 */


// object this
/*

1 var obj = {
2     foo: "bar",
3     logFoo: function () {
4         console.log(this.foo);
5     }
6 };
7
8 obj.logFoo(); //logs "bar"

 */

/*

1 var obj = {
2     foo: "bar"
3 };
4
5 function logFoo() {
6     console.log(this.foo);
7 }
8
9 logFoo.apply(obj); //logs "bar"

 */

/*

 1 var obj = {
 2     foo: "bar",
 3     deeper: {
 4         logFoo: function () {
 5             console.log(this.foo);
 6         }
 7     }
 8 };
 9
10 obj.deeper.logFoo(); //logs undefined

 */

/*

var obj = {
    foo: "bar",
    deeper: {
        logFoo: function () {
            console.log(obj.foo);
        }
    }
};

obj.deeper.logFoo(); //logs "bar"

 */


// DOM event this
/*

 1 function Listener() {
 2     document.getElementById("foo").addEventListener("click",
 3        this.handleClick);
 4 }
 5 Listener.prototype.handleClick = function (event) {
 6     console.log(this); //logs "<div id="foo"></div>"
 7 }
 8
 9 var listener = new Listener();
10 document.getElementById("foo").click();

 */

/*

 1 function Listener() {
 2     document.getElementById("foo").addEventListener("click",
 3         this.handleClick.bind(this));
 4 }
 5 Listener.prototype.handleClick = function (event) {
 6     console.log(this); //logs Listener {handleClick: function}
 7 }
 8
 9 var listener = new Listener();
10 document.getElementById("foo").click();

 */


// HTML this
/*

 在HTML节点的属性里面，你可以放置JavaScript代码，this指向了这个元素
1 <div id="foo" onclick="console.log(this);"></div>
2 <script type="text/javascript">
3 document.getElementById("foo").click(); //logs <div id="foo"...
4 </script>

 */


// override this
/*

1 function test () {
2     var this = {};  // Uncaught SyntaxError: Unexpected token this
3 }
eval this

 */

/*

function Thing () {
}
Thing.prototype.foo = "bar";
Thing.prototype.logFoo = function () {
    eval("console.log(this.foo)"); //logs "bar"
}

var thing = new Thing();
thing.logFoo();

 */

/*

function Thing () {
}
Thing.prototype.foo = "bar";
Thing.prototype.logFoo = new Function("console.log(this.foo);");

var thing = new Thing();
thing.logFoo(); //logs "bar"

 */


// with this
/*

 1 function Thing () {
 2 }
 3 Thing.prototype.foo = "bar";
 4 Thing.prototype.logFoo = function () {
 5     with (this) {
 6         console.log(foo);
 7         foo = "foo";
 8     }
 9 }
10
11 var thing = new Thing();
12 thing.logFoo(); // logs "bar"
13 console.log(thing.foo); // logs "foo"

 */


// jQuery this
/*

 和HTML DOM元素节点的事件处理程序一样，在许多情况下JQuery的this都指向HTML元素节点。
 这在事件处理程序和一些方便的方法中都是管用的，比如$.each
 1 <div class="foo bar1"></div>
 2 <div class="foo bar2"></div>
 3 <script type="text/javascript">
 4 $(".foo").each(function () {
 5     console.log(this); //logs <div class="foo...
 6 });
 7 $(".foo").on("click", function () {
 8     console.log(this); //logs <div class="foo...
 9 });
10 $(".foo").each(function () {
11     this.click();
12 });
13 </script>

 */


// thisArg this
/*

 如果你用过underscore.js 或者 lo-dash 你可能知道许多类库的方法可以通过一个叫做thisArg 的函数参数来传递实例，
 这个函数参数会作为this的上下文。举个例子，这适用于_.each。原生的JavaScript在ECMAScript 5的时候也允许函数传递一个thisArg参数了，
 比如forEach。事实上，之前阐述的bind，apply和call的使用已经给你创造了传递thisArg参数给函数的机会。这个参数将this绑定为你所传递的对象。
 1 function Thing(type) {
 2     this.type = type;
 3 }
 4 Thing.prototype.log = function (thing) {
 5     console.log(this.type, thing);
 6 }
 7 Thing.prototype.logThings = function (arr) {
 8    arr.forEach(this.log, this); // logs "fruit apples..."
 9    _.each(arr, this.log, this); //logs "fruit apples..."
10 }
11
12 var thing = new Thing("fruit");
13 thing.logThings(["apples", "oranges", "strawberries", "bananas"]);

 */


console.log('////////////////////////////////////');
