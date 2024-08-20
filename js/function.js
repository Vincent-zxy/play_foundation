// 1 函数的解构赋值默认值：

// function move({x = 0, y = 0} = {}) {
//     return [x, y];
// }

// move({x: 3, y: 8}); // [3, 8]
// move({x: 3}); // [3, 0]
// move({}); // [0, 0]
// move(); // [0, 0]

// function move({x, y} = { x: 0, y: 0 }) {
//     return [x, y];
//   }
  
// move({x: 3, y: 8}); // [3, 8]
// move({x: 3}); // [3, undefined]
// move({}); // [undefined, undefined]
// move(); // [0, 0]

// let x,y
// ({x}={x:1,y:2})
// console.log(x,y);
// 这和函数中的解构行为在逻辑上是一致的，都是因为没有为 y 提供值而导致其默认为 undefined

// function f(x, y = 5) {
//     return [x, y];  
// }
// f(,1) 为什么报错  JavaScript解析器无法正确解析这个语法，导致抛出错误

// var x = 1;

// function f(y = x) {
//   console.log(y);
// }

// f()//会向上寻找 打印 1

// var x = 1;

// function f(x, y = x) {
//   console.log(x,y);
// }

// f()// undefined,undefined  因为 f(x, 有了这个x，所以不会向上寻找，并且这个x的值是undefined


// 2 箭头函数和普通函数，对比它们内部的this指向：

// function foo() {
//   console.log(this.id);
//   setTimeout(function(){
//     console.log('id:', this.id);
//   }, 100);
// } 
// var id = 21;
// foo.call({ id: 42 });//21

// function foo() {
//   setTimeout(() => {
//     console.log('id:', this.id);
//   }, 100);
// }

// var id = 21;
// foo.call({ id: 42 });//42

// var s2=0
// function Timer() {
//   this.s1 = 0;
//   this.s2 = 0;
//   let _this=this
//   // 箭头函数
//   setInterval(() => this.s1++, 1000);
//   // 普通函数
//   setInterval(function () {
//     this.s2++;
//     _this.s2++
//   }, 1000);
// }

// var timer = new Timer();
// setTimeout(() => console.log('s1: ', timer.s1), 3100);//3
// setTimeout(() => console.log('s2: ', timer.s2), 3100);//3
// setTimeout(() => console.log('s3: ', s2), 3100);//3


// let user = {
//   name: "Bob",
//   printName: () => console.log(this),
// };
// user.printName(); // 这里的this指向 window

// let user = {
//   name: "Bob",
//   printName: function() {
//     console.log(this);
//     console.log(this.name);
//   },
// };
// user.printName();// 这里的this指向 user

// var handler = {
//   id: '123456',

//   init: function() {
//     document.addEventListener('click',
//       event => this.doSomething(event.type), false);
//   },

//   doSomething: function(type) {
//     console.log('Handling ' + type  + ' for ' + this.id);
//   }
// };

// function outer() {
//   this.outerVar = "outer context";
  
//   inner();
  
//   function inner() {
//     console.log(this);
//     const arrowFunc = () => {
//       console.log(this.outerVar);
//     };
//     arrowFunc();
//   }
// }
// outer()

// 第一个例子为什么是window: 
// 箭头函数的this指针会寻找上下文this,它会沿着作用域链向上查找，直到找到最近的一个非箭头函数的上下文
// 但是由于它没找到普通函数（非箭头函数），它就指向外层作用域，也就是window，所以log打印的就是window

// 第二个例子为什么是user：
// 普通函数有自己的this绑定规则，this会被自动绑定到那个对象上。说白了这个printName属性即方法函数，
// 谁调用，他这个函数里的this就指向谁，所以 user调用了，那this就指向user。
// 换句话说，this的值由函数调用的上下文决定

// 第三个例子this为什么能指向handle
// 它是一个箭头函数，沿着作用域链向上查找，直到找到最近的一个非箭头函数的上下文，那就是init，
// 而init则会被handler 调用，所以this就会指向handler

// 普通函数：谁调用我，我的this就指向谁
// 箭头函数：一直往上寻找，直到找到一个普通函数，我就会把你的this当成我的this了


// 箭头函数原理：
// 下面是 Babel 转箭头函数产生的 ES5 代码，就能清楚地说明this的指向
// ES6
// function foo() {
//   setTimeout(() => {
//     console.log('id:', this.id);
//   }, 100);
// }

// // ES5
// function foo() {
//   var _this = this;

//   setTimeout(function () {
//     console.log('id:', _this.id);
//   }, 100);
// }