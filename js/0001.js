console.log('//0001//////////////////////////////');
console.log(a);   // undefined
var a = 20;
console.log(a);   // 20


var b;
console.log(b);   // undefined
var b = 20;
console.log(b);   // 20


var aa = 20;
var bb = aa;
bb = 30;
// 这时a的值是多少？

var m = { a: 10, b: 20 }
var n = m;
n.a = 15;
// 这时m.a的值是多少

console.log(aa);   // 20
console.log(m.a);  // 15

var oa = {
  'x' : 1
}
var ob = oa;
console.log(oa);
console.log(ob);
oa.x = 2;
oa.x = 22;
oa = null;
console.log(oa);
console.log(ob);
oa = {
  'x' : 3
}
console.log(oa);
console.log(ob);
oa.x = 4;
console.log(oa);
console.log(ob);

console.log('////////////////////////////////////');