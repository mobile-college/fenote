console.log('//0003//////////////////////////////');

// demo01
function test () {
    console.log(a);      // undefined
    console.log(foo());  // 2

    var a = 1;
    function foo() {
        return 2;
    }

    /*
    等价于
    function foo() {
        return 2;
    }
    var a;
    console.log(a);
    console.log(foo());
    a = 1;
     */
}

// test();

// demo2
function test2() {
    console.log(foo);  // function foo() { return 'hello'; }
    console.log(bar);  // undefined

    var foo = 'Hello';
    console.log(foo);  // Hello
    var bar = function () {
        return 'world';
    }

    function foo() {
        return 'hello';
    }

    /*
    function 会被提前
    var 不会被提前
     */
}

test2();

console.log('////////////////////////////////////');

