console.log('//0009//////////////////////////////');

// 1. map
var arr = [1, 2, 3, 5];
arr.map(function(value, key, arr) {
    // ...
});

[2, 3, 4, 5].map(function(val, key) {
    return val > 3;
})

// 运行结果
// [false, false, true, true]

[2, 3, 4, 5].map(function(val, key) {
    return val - 1;
})

// 运行结果
// [1, 2, 3, 4]

var data = [
    {
        name: 'tom',
        age: 22
    },
    {
        name: 'link',
        age: 19
    }
]

data.map(function(item, index) {
    return item.age += 20
})

console.log(data);



// 2. filter

arr = [2, 3, 4, 5, 6].filter(function(item, index) {
    return item > 2;
})

// 运行结果
//arr: [3, 4, 5, 6]

var person = [
    {
        name: 'tom',
        age: 20,
    },
    {
        name: 'jake',
        age: 25
    },
    {
        name: 'bis',
        age: 32
    },
    {
        name: 'alex',
        age: 28
    }
]

var aaa = person.filter(function(item, index) {
    return item.age < 26
})

console.log(person, aaa);



// 3. reduce

var arr = [2, 3, 4, 5, 6];

var res = arr.reduce(function(res, cur, index, arr) {
    return res + cur
})

console.log(arr, res);

// res为 20 所有项的和

var thing = [
    {
        name: 'xiaom',
        price: 1999
    },
    {
        name: 'apple',
        price: 6666,
    },
    {
        name: 'huawei',
        price: 2999
    }
]

var acount = thing.reduce(function(res, cur) {
    return cur.price + res
}, 0)

console.log(acount);




// 4. sort

var arr = [2, 6, 3, 9, 1, 6];

arr.sort(function(cur, nex) {
    return cur - nex
})

console.log(arr);
// [1, 2, 3, 6, 6, 9]

var arr = [2, 6, 3, 9, 1, 6];

arr.sort(function(cur, nex) {
    return nex - cur
});

var produts = [
    {
        name: 'xssg',
        price: 10,
    },
    {
        name: 'xssg',
        price: 20,
    },
    {
        name: 'xssg',
        price: 8,
    },
    {
        name: 'xssg',
        price: 4,
    },
    {
        name: 'xssg',
        price: 7,
    },
    {
        name: 'xssg',
        price: 1,
    }
]

//试试看运行结果
produts.sort(function(cur, nex) {
    return cur.price - nex.price;
});


console.log('////////////////////////////////////');
