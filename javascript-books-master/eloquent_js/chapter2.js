// CHAPTER 2 QUESTIONS //

// 7 triangle # loop
var input = "";
for ( i = 0; i <= 7; i++) {
  input += "#";
  console.log(input);
}

// FizzBuzz
for ( i = 1; i <= 100; i++) {
  if (i % 15 === 0) {
    console.log(i + " FizzBuzz!");
  } else if (i % 5 === 0) {
    console.log(i + " Buzz!");
  } else if (i % 3 === 0) {
    console.log(i + " Fizz!");
  } else {
    console.log(i);
  }
}

// Checker Board
var n = 8;
var line = ""

for (var i = 0; i < n; i++) {
  for (var j = 0; j < n; j++) {
    if( (i+j) % 2 === 0)
    line += "#";
    else
    line += " ";
  }
  console.log(line)
  line = "";
}
