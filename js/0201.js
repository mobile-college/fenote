console.log('//0201//////////////////////////////');
console.log('JavaScript OOP');

/*
 * BOOK
 * chapter: Objects
 *

```javascript
```

 */

var mikhail = Object.create(null);
Object.defineProperty(mikhail, 'name', { value:        'Mikhail'
                                       , writable:     true
                                       , configurable: true
                                       , enumerable:   true });

Object.defineProperty(mikhail, 'age', { value:        19
                                      , writable:     true
                                      , configurable: true
                                      , enumerable:   true });

Object.defineProperty(mikhail, 'gender', { value:        'Male'
                                         , writable:     true
                                         , configurable: true
                                         , enumerable:   true });

// Object.defineProperties(mikhail, { name:   { value:        'Mikhail'
//                                            , writable:     true
//                                            , configurable: true
//                                            , enumerable:   true }

//                                  , age:    { value:        19
//                                            , writable:     true
//                                            , configurable: true
//                                            , enumerable:   true }

//                                  , gender: { value:        'Male'
//                                            , writable:     true
//                                            , configurable: true
//                                            , enumerable:   true }});

// mikhail['name']   = 'Mikhail';
// mikhail['age']    = 19;
// mikhail['gender'] = 'Male';

// mikhail.name   = 'Mikhail';
// mikhail.age    = 19;
// mikhail.gender = 'Male';


// Accessing
mikhail['age'];
// => 19
mikhail['address']
// => undefined


// Removing
delete mikhail['gender']
// => true
mikhail['gender']
// => undefined


// Getters and setters
// () → String
// Returns the full name of object.
function get_full_name() {
    return this.first_name + ' ' + this.last_name
}

// (new_name:String) → undefined
// Sets the name components of the object, from a full name.
function set_full_name(new_name) { var names
    names = new_name.trim().split(/\s+/)
    this.first_name = names[⁣'0'] || ''
    this.last_name  = names['1'] || ''
}

Object.defineProperty(mikhail, 'name', { get: get_full_name
                                       , set: set_full_name
                                       , configurable: true
                                       , enumerable:   true });

// () → String
// Returns the full name of object.
function get_full_name() {
    return this.first_name + ' ' + this.last_name
}

// (new_name:String) → undefined
// Sets the name components of the object, from a full name.
function set_full_name(new_name) { var names
    names = new_name.trim().split(/\s+/)
    this.first_name = names[⁣'0'] || ''
    this.last_name  = names['1'] || ''
}

Object.defineProperty(mikhail, 'name', { get: get_full_name
                                       , set: set_full_name
                                       , configurable: true
                                       , enumerable:   true });


// Listing
Object.getOwnPropertyNames(mikhail);
// => [ 'name', 'age', 'gender', 'first_name', 'last_name' ]
Object.keys(mikhail);
// => [ 'name', 'age', 'gender' ]


// Object literals
var mikhail = { first_name: 'Mikhail'
              , last_name:  'Weiß'
              , age:        19
              , gender:     'Male'

              // () → String
              // Returns the full name of object.
              , get name() {
                    return this.first_name + ' ' + this.last_name }

              // (new_name:String) → undefined
              // Sets the name components of the object,
              // from a full name.
              , set name(new_name) { var names
                    names = new_name.trim().split(/\s+/)
                    this.first_name = names['0'] || ''
                    this.last_name  = names['1'] || '' }
              }


/*
 * BOOK
 * chapter: Methods
 *

```javascript
```

 */

// (person:String) → String
// Greets a random person
mikhail.greet = function(person) {
    return this.name + ': Why, hello there, ' + person + '.'
}

mikhail.greet('you')
// => 'Michael White: Why, hello there, you.'
mikhail.greet('Kristin')
// => 'Michael White: Why, hello there, Kristin.'


// Dynamic this



// How this is resolved
// (other:Number[, yet_another:Number]) → Number
// Returns the sum of the object's value with the given Number
function add(other, yet_another) {
    return this.value + other + (yet_another || 0)
}
var one = { value: 1, add: add };
var two = { value: 2, add: add };

// CALLED AS A METHOD
one.add(two.value); // this === one
// => 3
two.add(3);         // this === two
// => 5
one['add'](two.value); // brackets are cool too
// => 3

// CALLED DIRECTLY
add(two.value);  // this === global
// => NaN
// The global object still has no `value' property, let's fix that.
value = 2;
add(two.value);  // this === global
// => 4

// EXPLICITLY APPLIED
add.call(two, 2, 2);      // this === two
// => 6
add.call(window, 4);      // this === global
// => 6
add.call(one, one.value); // this === one
// => 2

add.apply(two, [2, 2]);       // equivalent to two.add(2, 2)
// => 6
add.apply(window, [ 4 ]);       // equivalent to add(4)
// => 6
add.apply(one, [one.value]);  // equivalent to one.add(one.value)
// => 2

window.value = 2;
add.call(undefined, 1) // this === window
// => 3
void function() {
  "use strict"
  add.call(undefined, 1) // this === undefined
  // => NaN
  // Since primitives can't hold properties.
}();


// Bound methods
var one_add = add.bind(one);
one_add(2); // this === one
// => 3
two.one_adder = one_add;
two.one_adder(2); // this === one
// => 3
one_add.call(two, 2); // this === one
// => 3




/*
 * BOOK
 * chapter: Inheritance
 *

```javascript
```

 */

// Prototypes
var person = Object.create(null)

// Here we are reusing the previous getter/setter functions
Object.defineProperty(person, 'name', { get: get_full_name
                                      , set: set_full_name
                                      , configurable: true
                                      , enumerable:   true })

// And adding the `greet' function
person.greet = function (person) {
    return this.name + ': Why, hello there, ' + person + '.'
}

// Then we can share those behaviours with Mikhail
// By creating a new object that has it's [[Prototype]] property
// pointing to `person'.
var mikhail = Object.create(person)
mikhail.first_name = 'Mikhail'
mikhail.last_name  = 'Weiß'
mikhail.age        = 19
mikhail.gender     = 'Male'

// And we can test whether things are actually working.
// First, `name' should be looked on `person'
mikhail.name
// => 'Mikhail Weiß'

// Setting `name' should trigger the setter
mikhail.name = 'Michael White'

// Such that `first_name' and `last_name' now reflect the
// previously name setting.
mikhail.first_name
// => 'Michael'
mikhail.last_name
// => 'White'

// `greet' is also inherited from `person'.
mikhail.greet('you');
// => 'Michael White: Why, hello there, you.'

// And just to be sure, we can check which properties actually
// belong to `mikhail'
Object.keys(mikhail);
// => [ 'first_name', 'last_name', 'age', 'gender' ]


// How [⁣[Prototype]⁣] works
// (person:String) → String
// Greets the given person
person.greet = function(person) {
    return this.name + ': Harro, ' + person + '.'
}

mikhail.greet('you');
// => 'Michael White: Harro, you.'


// Overriding properties
// Here we set up the greeting for a generic person

// (person:String) → String
// Greets the given person, formally
person.greet = function(person) {
    return this.name + ': Hello, ' + (person || 'you');
}

// And a greeting for our protagonist, Mikhail

// (person:String) → String
// Greets the given person, like a bro
mikhail.greet = function(person) {
    return this.name + ': \'sup, ' + (person || 'dude');
}

// And define our new protagonist, Kristin
var kristin = Object.create(person);
kristin.first_name = 'Kristin'
kristin.last_name  = 'Weiß'
kristin.age        = 19
kristin.gender     = 'Female'

// Alongside with her specific greeting manners

// (person:String) → String
// Greets the given person, sweetly
kristin.greet = function(person) {
    return this.name + ': \'ello, ' + (person || 'sweetie')
}

// Finally, we test if everything works according to the expected

mikhail.greet(kristin.first_name)
// => 'Michael White: \'sup, Kristin'

mikhail.greet()
// => 'Michael White: \'sup, dude'

kristin.greet(mikhail.first_name)
// => 'Kristin Weiß: \'ello, Michael'

// And just so we check how cool this [[Prototype]] thing is,
// let's get Kristin back to the generic behaviour

delete kristin.greet
// => true

kristin.greet(mikhail.first_name)
// => 'Kristin Weiß: Hello, Michael'



// Mixins
// Aliases for the rather verbose methods on ES5
var descriptor  = Object.getOwnPropertyDescriptor
  , properties  = Object.getOwnPropertyNames
  , define_prop = Object.defineProperty

// (target:Object, source:Object) → Object
// Copies properties from `source' to `target'
function extend(target, source) {
    properties(source).forEach(function(key) {
        define_prop(target, key, descriptor(source, key)) })

    return target
}


// A pianist is someone who can `play' the piano
var pianist = Object.create(null)
pianist.play = function() {
    return this.name + ' starts playing the piano.'
}

// A singer is someone who can `sing'
var singer = Object.create(null)
singer.sing = function() {
    return this.name + ' starts singing.'
}

// Then we can move on to adding those abilities to
// our main objects:
extend(mikhail, pianist)
mikhail.play()
// => 'Michael White starts playing the piano.'

// We can see that all that ends up as an own property of
// mikhail. It is not shared.
Object.keys(mikhail)
['first_name', 'last_name', 'age', 'gender', 'greet', 'play']

// Then we can define kristin as a singer
extend(kristin, singer)
kristin.sing()
// => 'Kristin Weiß starts singing.'

// Mikhail can't sing yet though
mikhail.sing()
// => TypeError: Object #<Object> has no method 'sing'

// But mikhail will inherit the `sing' method if we
// extend the Person prototype with it:
extend(person, singer)

mikhail.sing()
// => 'Michael White starts singing.'


// Accessing overwritten properties
Object.getPrototypeOf(mikhail).name    // same as `person.name'
// => 'undefined undefined'

// We can assert it's really being called on `person' by
// giving `person' a `first_name' and `last_name'
person.first_name = 'Random'
person.last_name  = 'Person'
Object.getPrototypeOf(mikhail).name
// => 'Random Person'

var proto = Object.getPrototypeOf

// (name:String) → String
// Greets someone intimately if we know them, otherwise use
// the generic greeting
mikhail.greet = function(name) {
    return name == 'Kristin Weiß'?  this.name + ': Heya, Kristty'
         : /* we dunno this guy */  proto(this).greet.call(this, name)
}

mikhail.greet(kristin.name)
// => 'Michael White: Heya, Kristty'

mikhail.greet('Margareth')
// => 'Michael White: Hello, Margareth'

var proto = Object.getPrototypeOf

// (name:String) → String
// Greets someone intimately if we know them, otherwise use
// the generic greeting.
//
// Note that now we explicitly state that the lookup should take
// the parent of `mikhail', so we can be assured the cyclic parent
// resolution above won't happen.
mikhail.greet = function(name) {
    return name == 'Kristin Weiß'?  this.name + ': Heya, Kristty'
         : /* we dunno this guy */  proto(mikhail).greet.call(this, name)
}

mikhail.greet(kristin.name)
// => 'Michael White: Heya, Kristty'

mikhail.greet('Margareth')
// => 'Michael White: Hello, Margareth'


// (object:Object, fun:Function) → Function
// Creates a method
function make_method(object, fun) {
    return function() { var args
        args = slice.call(arguments)
        args.unshift(object)        // insert `object' as first parameter
        fn.apply(this, args) }
}


// Now, all functions that are expected to be used as a method
// should remember to reserve the first parameter to the object
// where they're stored.
//
// Note that, however, this is a magical parameter introduced
// by the method function, so any function calling the method
// should pass only the usual arguments.
function message(self, message) { var parent
    parent = Object.getPrototypeOf(self)
    if (parent && parent.log)
        parent.log.call(this, message)

    console.log('-- At ' + self.name)
    console.log(this.name + ': ' + message)
}

// Here we define a prototype chain C -> B -> A
var A  = Object.create(null)
A.name = 'A'
A.log  = make_method(A, message)

var B  = Object.create(A)
B.name = 'B'
B.log  = make_method(B, message)

var C  = Object.create(B)
C.name = 'C'
C.log  = make_method(C, message)

// And we can test if it works by calling the methods:
A.log('foo')
// => '-- At A'
// => 'A: foo'

B.log('foo')
// => '-- At A'
// => 'B: foo'
// => '-- At B'
// => 'B: foo'

C.log('foo')
// => '-- At A'
// => 'C: foo'
// => '-- At B'
// => 'C: foo'
// => '-- At C'
// => 'C: foo'



// Constructors
// The new magic
// Constructs a new Person
function Person(first_name, last_name) {
    // If the function is called with `new', as we expect
    // `this' here will be the freshly created object
    // with the [[Prototype]] set to Person.prototype
    //
    // Of course, if someone omits new when calling the
    // function, the usual resolution of `this' — as
    // explained before — will take place.
    this.first_name = first_name
    this.last_name  = last_name
}

// (person:String) → String
// Greets the given person
Person.prototype.greet = function(person) {
    return this.name + ': Harro, ' + person + '.'
}

var person = new Person('Mikhail', 'Weiß')


// We could de-sugar the constructor pattern in the following
// Taking into account that `Person' here means the `prototype'
// property of the `Person' constructor.
var Person = Object.create(Object.prototype)

// (person:String) → String
// Greets the given person
Person.greet = function(person) {
    return this.name + ': Harro, ' + person + '.'
}

// Here's what the constructor does when called with `new'
var person = Object.create(Person)
person.first_name = 'Mikhail'
person.last_name  = 'Weiß'
function Foo() {
    this.foo = 'bar'
}
new Foo();
// => { foo: 'bar' }
function Foo() {
    this.foo = 'bar'
    return Foo
}
new Foo();
// => [Function: Foo]


// Inheritance with constructors
// new Person (first_name:String, last_name:String)
// Initialises a Person object
function Person(first_name, last_name) {
    this.first_name = first_name
    this.last_name  = last_name
}

// Defines the `name' getter/setter
Object.defineProperty(Person.prototype, 'name', { get: get_full_name
                                                , set: set_full_name
                                                , configurable: true
                                                , enumerable:   true });
// (person:String) → String
// Greets the given person
Person.prototype.greet = function(person) {
    return this.name + ': Hello, ' + (person || 'you')
}

var proto = Object.getPrototypeOf;

// new Mikhail (age:Number, gender:String)
function Mikhail(age, gender) {
    // Find the parent of this object and invoke its constructor
    // with the current this. We could have used:
    //   Person.call(this, 'Mikhail', 'Weiß')
    // But we'd lose some flexibility with that.
    proto(Mikhail.prototype).constructor.call(this, 'Mikhail', 'Weiß');
}

// Inherits the properties from Person.prototype
Mikhail.prototype = Object.create(Person.prototype);

// Resets the `constructor' property of the prototype object
Mikhail.prototype.constructor = Mikhail;

// (person:String) → String
Mikhail.prototype.greet = function(person) {
    return this.name + ': \'sup, ' + (person || 'dude');
}


// Instances are created with the `new' operator, as previously
// discussed:
var mikhail = new Mikhail(19, 'Male');
mikhail.greet('Kristin');
// => 'Mikhail Weiß: \'sup, Kristin'



// 5.Considerations and compatibility
// 5.1. Creating objects
// (proto:Object) → Object
// Constructs an object and sets the [[Prototype]] to `proto'.
function clone(proto) {
    function Dummy() { }

    Dummy.prototype             = proto
    Dummy.prototype.constructor = Dummy

    return new Dummy()
}

var mikhail = clone(person)
// Equivalent to `var mikhail = Object.create(person)'

// 5.2. Defining properties
// (target:Object, key:String, descriptor:Object) → Object
// Defines a property in the target object.
// Getters and Setters are handled through the fallback
// calls, whereas values are set directly. Tags are
// ignored.
function defineProperty(target, key, descriptor) {
    if (descriptor.value)
        target[key] = descriptor.value
    else {
        descriptor.get && target.__defineGetter__(key, descriptor.get)
        descriptor.set && target.__defineSetter__(key, descriptor.set) }

    return target
}


var x = { }
defineProperty(x, 'foo', { value: 'bar' })
defineProperty(x, 'bar', { get: function() { return this.foo }
                         , set: function(v){ this.foo = v    }});
x.foo
// => 'bar'
x.bar
// => 'bar'
x.bar = 'foo'
x.foo
// => 'foo'
x.bar
// => 'foo'


// 5.3. Listing properties
// (object:Object) → Array
// Lists all the own enumerable properties of an object
function keys(object) { var result, key
    result = []
    for (key in object)
        if (object.hasOwnProperty(key))  result.push(key)

    return result
}

// Taking the mikhail object whose [[Prototype]] is person...
keys(mikhail)
// => [ 'first_name', 'last_name', 'age', 'gender' ]
keys(person)
// => [ 'greet', 'name' ]


// 5.4. Bound methods
var slice = [].slice;

// (fun:Function, bound_this:Object, args...) → Function
//  --> (args...) → *mixed*
// Creates a bound method from the function `fn'
function bind(fn, bound_this) { var bound_args
    bound_args = slice.call(arguments, 2)
    return function() { var args
        args = bound_args.concat(slice.call(arguments))
        return fn.apply(bound_this, args) }
}

// 5.5. Getting the [⁣[Prototype]⁣]
function proto(object) {
    return object?            object.__proto__
         : /* not object? */  null
}

function proto(object) {
    return !object?                null
         : '__proto__' in object?  object.__proto__
         : /* not exposed? */      object.constructor.prototype
}


// 5.6. Libraries that provide fallbacks


console.log('////////////////////////////////////');
