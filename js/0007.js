console.log('//0007//////////////////////////////');

// 在构造函数中添加方法
function Person(name) {
    this.name = name;
    this.age = age;
    // 在构造函数内部中添加方法
    this.getAge = function() {
        return this.age;
    }
    this.
}
// 给原型添加方法
Person.prototype.getName = function() {
    return this.name;
}

// 在对象中添加方法
var a = {
    m: 20,
    getM: function() {
        return this.m;
    }
}




;(function() {
    // 私有变量
    var age = 20;
    var name = 'Tom';


    // 私有方法
    function getName() {
        return `your name is ` + name;
    }


    // 共有方法
    function getAge() {
        return age;
    }

    // 将引用保存在外部执行环境的变量中，形成闭包，防止该执行环境被垃圾回收
    window.getAge = getAge;
})();



// 自执行创建模块
(function() {
    // states 结构预览
    // states = {
    //     a: 1,
    //     b: 2,
    //     m: 30,
    //     o: {}
    // }
    var states = {};  // 私有变量，用来存储状态与数据

    // 判断数据类型
    function type(elem) {
        if(elem == null) {
            return elem + '';
        }
        return toString.call(elem).replace(/[\[\]]/g, '').split(' ')[1].toLowerCase();
    }


    /**
     * @Param name 属性名
     * @Description 通过属性名获取保存在states中的值
    */
    function get(name) {
        return states[name] ? states[name] : '';
    }

    function getStates() {
        return states;
    }

    /*
    * @param options {object} 键值对
    * @param target {object} 属性值为对象的属性，只在函数实现时递归中传入
    * @desc 通过传入键值对的方式修改state树，使用方式与小程序的data或者react中的setStates类似
    */
    function set(options, target) {
        var keys = Object.keys(options);
        var o = target ? target : states;

        keys.map(function(item) {
            if(typeof o[item] == 'undefined') {
                o[item] = options[item];
            }
            else {
                type(o[item]) == 'object' ? set(options[item], o[item]) : o[item] = options[item];
            }
            return item;
        })
    }

    // 对外提供接口
    window.get = get;
    window.set = set;
    window.getStates = getStates;
})()

// 具体使用如下

set({ a: 20 });     // 保存 属性a
set({ b: 100 });    // 保存属性b
set({ c: 10 });     // 保存属性c

// 保存属性o, 它的值为一个对象
set({
    o: {
        m: 10,
        n: 20
    }
})

// 修改对象o 的m值
set({
    o: {
        m: 1000
    }
})

// 给对象o中增加一个c属性
set({
    o: {
        c: 100
    }
})
console.log(getStates())





// 普通封装
function add(num1, num2) {
    return num1 + num2;
}
add(20, 10); // 30

// 挂载在对象上
if(typeof Array.prototype.add !== 'function') {
  Array.prototype.add = function() {
    var i = 0,
        len = this.length,
        result = 0;

    for( ; i < len; i++) {
        result += this[i]
    }
    return result;
  }
}

[1, 2, 3, 4].add() // 10




console.log('////////////////////////////////////');
