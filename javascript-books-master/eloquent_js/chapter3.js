//---- QUESTION 1 ----//
console.log("Question 1: Write a function min that takes two arguments and returns their minimum.");
var min = function(a, b) {
  if (a > b) {
    return b;
  } else {
    return a;
  }
}
console.log("min(0, 10)");
console.log(min(0, 10)); // 0
console.log("min(0, -10)");
console.log(min(0, -10)); // -10

//---- QUESTION 2 ----//
console.log("Question 2: Define a recursive function isEven corresponding to this description. The function should accept a number parameter and return a Boolean.");
function isEven(number) {
  if (number < 0) {
    return isEven(-number);
  } else if (number == 1) {
    return false;
  } else if  (number == 0) {
    return true;
  } else {
    return isEven(number - 2);
  }
}
console.log("isEven(50)");
console.log(isEven(50)); // true
console.log("isEven(75)");
console.log(isEven(75)); // false
console.log("isEven(-1)");
console.log(isEven(-1)); // false

//---- QUESTION 3 ----//
console.log("Question 3: Write a function countBs that takes a string as its only argument and returns a number that indicates how many uppercase “B” characters are in the string. Next, write a function called countChar that behaves like countBs, except it takes a second argument that indicates the character that is to be counted (rather than counting only uppercase “B” characters). Rewrite countBs to make use of this new function.");

function countBs(string) {
  var count = 0;
  for (var i = 0; string.length > i; i++) {
    if (string.charAt(i) == "B")
    count++;
  }
  return count;
}

function countChar(string, search) {
  var count = 0;
  for (var i = 0; string.length > i; i++) {
    if (string.charAt(i) == search)
    count++
  }
  return count;
}

console.log("(countBs('adBdasfBBBsdafB')")
console.log(countBs("adBdasfBBBsdafB"));
console.log('(countChar("Hello World! My name is Maury T. Lindo", "l"))');
console.log(countChar("Hello World! My name is Maury T. Lindo", "l"));
