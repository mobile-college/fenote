console.log('//0000//////////////////////////////');


// 常规写法
 $.ajax({
     url: '/api/test',
     type: 'POST',
     data: {...},
     success: function(res) {
         // dosomething
     },
     fail: function(res) {
         // dosomething
     },
     complete: function() {
         // dosomething
     }
 })

// 新的写法
$.ajax({
     url: '/api/test',
     type: 'POST',
     ...
 })
 .done(function(res) {
     // success and do something
 })
 .fail(function(res) {
     // fail and do something
 })
 .always(function() {});


var promise = $.getJSON('http://hipsterjesus.com/api/');

promise.done(function(data) {
  $('body').append(data.text);
});



var promise = $.getJSON('http://hipsterjesus.com/api/');

promise.done(function(data) {
  $('body').append(data.text);
});

promise.fail(function() {
  $('body').append('<p>Oh no, something went wrong!</p>');
});



// Multiple calls
var firstData = null;
var secondData = null;

var responseCallback = function() {

  if (!firstData || !secondData)
    return;

  // do something
}

$.get("http://example.com/first", function(data) {
  firstData = data;
  responseCallback();
});

$.get("http://example.com/second", function(data) {
  secondData = data;
  responseCallback();
});





console.log('////////////////////////////////////');
