// let:
// 存在暂时性死区
// 不能重复声明
// 不存在变量提升
// console.log(bar); // 报错ReferenceError
// let bar = 2;

// 暂时性死区： 定义（变量在还没有声明完成前使用  let和const 才会 有暂时性死区
// var x = x;// 不报错
// let x = x;// 报错

// 变量提升：
// 例子1：
// var tmp = new Date();
// function f() {
//   console.log(tmp,'xxxxxxxx');
//   if (false) {
//     var tmp = 'hello world';//这一行虽然不会执行，但tmp的声明已被提升  
//   }
// }
// f(); // undefined  
// 这里是因为变量tmp的声明（而不是赋值）会被提升到其所在作用域的最顶部，
// 这个声明会被提升到函数f的开始处，但赋值'hello world'不会被提升
// tmp变量被声明为一个未定义的变量。

// 例子2：
// function f() { console.log('I am outside!'); }

// (function () {
//   if (false) {
//     // 重复声明一次函数f
//     function f() { console.log('I am inside!'); }
//   }

//   f();
// }());
// // 这个是会报错的  f is not a function

// 在es5是不会报错的并打印 
// 但在es6会报错是他有自己遵守的行为：
    // 允许在块级作用域内声明函数。
    // 函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
    // 同时，函数声明还会提升到所在的块级作用域的头部。
// 报错的大概理解可以是如下演示（并不是原理，只供理解参考）
// function f() { console.log('I am outside!'); }

// (function () {
//   var f
//   if (false) {
//   }
//   f();//f is not a function
// }());
// 总结来说，第一段代码在ES6中抛出 f is not a function 的原因是因为在ES6中，
// f 函数具有块级作用域，并且由于条件 false，
// 该函数从未在当前作用域内被声明和“激活”。当尝试在块级作用域之外调用 f() 时，
// 它被解析为 undefined，进而引发错误，和例子1一样


// 变量提升：

// var x = 1;
// function foo(x, y = function() { x = 2; }) {
//     console.log(x);
//     var x = 3;//去掉var 就是 2
//     y();
//     console.log(x);
// }
// foo(1)
// console.log(x,'外');//1  去不去掉var 都是 1
// 意思如下：
// var xGlobal = 1; // 全局变量
// function foo(xParam, y = function() { xParam = 2; }) { // xParam 是函数 foo 的参数
//     console.log(xParam); // 第一次打印 xParam，此时为函数调用时传递的值或默认值
//     var xLocal = 3; // 局部变量，只在 foo 函数作用域内可见
//     y(); // 调用 y 函数
//     console.log(xLocal); // 打印 xLocal，值为 3
// }
// foo(1); // 调用 foo 函数，传递参数值为 1
// console.log(xGlobal, '外'); // 打印全局变量 xGlobal，值为 1


// let a=1
// function b(a){
//   console.log(a);
// }
// b()//undefined

// let a=1
// function b(){
//   console.log(a);
// }
// b()//1

// 应用：
// function throwIfMissing() {
//   throw new Error('Missing parameter');
// }

// function foo(mustBeProvided = throwIfMissing()) {
//   return mustBeProvided;
// }

// foo(1)


// let [x2, y2 = 'b'] = ['a', null]; // x='a', y='b'
// console.log(x2,y2);
// let [x1, y1 = 'b1'] = ['a1', undefined]; // x1='a', y1='b'
// console.log(x1,y1);

// console.log([2][0]);

// let [o=1,p1]=[undefined,2]
// console.log(o,p1);

// let obj = {
//   p: [
//     'Hello',
//     { y: 'World' }
//   ]
// };

// let { p, p: [x, { y }] } = obj;
// x // "Hello"
// y // "World"
// p // ["Hello", {y: "World"}]


// const obj1 = {};
// const obj2 = { foo: 'bar' };
// Object.setPrototypeOf(obj1, obj2);
// console.log(obj1.foo);
// console.log(obj2);
// const { foo } = obj1;
// foo // "bar"

// function move({x, y } = {}) {
//   console.log([x,y]);
//   return [x, y];
// }

// move({x: 3, y: 8}); // [3, 8]
// move({x: 3}); // [3, 0]
// move({}); // [0, 0]
// move(); // [0, 0]


// 模版字符串：

// let str=`
// <ul>
//   <li>first</li>
//   <li>second</li>
// </ul>`.trim()
// document.querySelector('#box').innerHTML=str
// console.log(str);

// let div=document.querySelector('#box')
// div.style.background='pink'
// div.style.width='100px'
// div.style.height='100px'

// let template = `
// <ul>
//   <% for(let i=0; i < data.supplies.length; i++) { %>
//     <li><%= data.supplies[i] %></li>
//   <% } %>
// </ul>
// `;

// const evalExpr = /<%=(.+?)%>/g;
// const expr = /<%([\s\S]+?)%>/g;
// console.log(template
//   .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`'));
// console.log(template.replace(expr, '`); \n $1 \n  echo(`'));

// 自定义的模板编译函数
// function compile(template){
//   const evalExpr = /<%=(.+?)%>/g;
//   const expr = /<%([\s\S]+?)%>/g;

//   template = template
//     .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
//     .replace(expr, '`); \n $1 \n  echo(`');

//   template = 'echo(`' + template + '`);';

//   let script =
//   `(function parse(data){
//     let output = "";

//     function echo(html){
//       output += html;
//     }

//     ${ template }

//     return output;
//   })`;

//   return script;
// }
// let parse = eval(compile(template));//eval处理 返回的JavaScript代码字符串  现在parse就是 一个函数
// div.innerHTML = parse({ supplies: [ "broom", "mop", "cleaner" ] });//正常往parse里 传参

