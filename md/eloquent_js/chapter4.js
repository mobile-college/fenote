// Question 1: Write a range function that takes two arguments, start and end, and returns an array containing all the numbers from start up to (and including) end.
// Part 2: Next, write a sum function that takes an array of numbers and returns the sum of these numbers. Run the previous program and see whether it does indeed return 55.

function range(begin, end, step) {
  collection = [];
  if(!step)
    step = 1;
  if(begin < end)
    for(var i = begin; i <= end; i = i + step)
        collection.push(i);
    else if(begin > end)
        for(var i = begin; i >= end; i = i + step)
            collection.push(i);
  return collection;
}

function sum(collection) {
  sum = 0;
  for (var i = 0; i < collection.length; i++)
    sum += collection[i];
  return sum;
}

// Question 2: Reversing and Array

function reverseArray(collection) {
  reversed = [];
  for(var i = collection.length - 1; i >= 0; i--) {
    reversed.push(collection[i]);
  }
  return reversed;
}

function reverseArrayInPlace(collection) {
  length = collection.length - 1;
  for(var i = 0; i < length / 2); i++) {
    temp = collection[i];
    collection[i] = collection[length - i];
    collection[length - i] = temp;
  }
}

// Question 3: Write a function arrayToList that builds up a data structure like the previous one when given [1, 2, 3] as argument, and write a listToArray function that produces an array from a list.
function arrayToList(array) {
  var list = null;
  for (var i = array.length - 1; i >= 0; i--)
    list = {value: array[i], rest: list};
  return list;
}

function listToArray(list) {
  var array = [];
  for (var node = list; node; node = node.rest)
    array.push(node.value);
  return array;
}

function prepend(value, list) {
  return {value: value, rest: list};
}

function nth(list, n) {
  if (!list)
    return undefined;
  else if (n == 0)
    return list.value;
  else
    return nth(list.rest, n - 1);
}

console.log(arrayToList([10, 20])); // {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30]))); // [10, 20, 30]
console.log(prepend(10, prepend(20, null))); // {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1)); // 20

// Question 4: Deep Comparison
function deepEqual(a, b) {
  if (a === b) return true;

  if (a == null || typeof a != "object" ||
      b == null || typeof b != "object")
    return false;

  var propsInA = 0, propsInB = 0;

  for (var prop in a)
    propsInA += 1;

  for (var prop in b) {
    propsInB += 1;
    if (!(prop in a) || !deepEqual(a[prop], b[prop]))
      return false;
  }
  
  return propsInA == propsInB;
}

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj)); // true
console.log(deepEqual(obj, {here: 1, object: 2})); // false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2})); // true
