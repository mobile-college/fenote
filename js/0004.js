console.log('//0004//////////////////////////////');

/*
 闭包
 简单来说，假设函数A在函数B的内部进行定义了，并且当函数A在执行时，访问了函数B内部的变量对象，那么B就是一个闭包。

 闭包是在函数被调用执行的时候才被确认创建的。
 闭包的形成，与作用域链的访问顺序有直接关系。
 只有内部函数访问了上层作用域链中的变量对象时，才会形成闭包，因此，我们可以利用闭包来访问函数内部的变量。
 chrome中理解的闭包，与《你不知道的js》与《JavaScript高级编程》中的闭包理解有很大不同，我个人更加倾向于相信chrome。这里就不妄下结论了，大家可以根据我的思路，探索后自行确认。在之前一篇文中我根据从书中学到的下了定义，应该是错了，目前已经修改，对不起大家了。

 */

var fn = null;
function foo () {
    var a = 2;
    function innnerFoo () {
        console.log(a);
    }
    fn = innnerFoo; // 将 innnerFoo的引用，赋值给全局变量中的fn
}

function bar () {
    fn(); // 此处的保留的innerFoo的引用
}

foo();
bar(); // 2



function fnt () {
    console.log('this is test.')
}

var timer =  setTimeout(fnt, 1000);
console.log(timer);



;(function () {
    var aa = 10;
    var bb = 20;

    function add(num1, num2) {
        var num1 = !!num1 ? num1 : aa;
        var num2 = !!num2 ? num2 : bb;

        return num1 + num2;
    }

    window.add = add;
})();

add(10, 20);



for (var i = 1;i <= 5;i++) {
    setTimeout( function timer () {
        console.log(i);
    }, i*1000 );
}

console.log('////////////////////////////////////');
