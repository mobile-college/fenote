console.log('//0000//////////////////////////////');

var element = document.documentElement;

if(element.scrollHeight > element.clientHeight) {
  // Overflow detected; force scroll bar
  element.style.overflow = 'scrollbar';
} else {
  // No overflow detected; prevent scroll bar
  element.style.overflow = 'hidden';
}


console.log('////////////////////////////////////');

