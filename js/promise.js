// promise :

// allSettled 和 all 的区别
// all:遇到reject 时 ,会立即 reject，并且不再等待其他的 Promises  直接得到一个错误
// allSettled:遇到reject 时, 会等待所有的 Promises 完成，不论是 resolve 还是 reject，都会在返回的数组中
// 数组里的每个对象解构大概是这样的  status 和 value/reason

// 1 Promise 会吃掉错误:
// const someAsyncThing = function() {
//     return new Promise(function(resolve, reject) {
//       // 下面一行会报错，因为x没有声明
//       resolve(x + 2);
//     });
//   };
  
//   someAsyncThing().then(function() {
//     console.log('everything is great');
//   });
  
//   setTimeout(() => { console.log(123) }, 2000);
//   // Uncaught (in promise) ReferenceError: x is not defined
//   // 123

// 会打印出错误提示ReferenceError: x is not defined，但是不会退出进程、终止脚本执行
// 2 秒之后还是会输出123 Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”


// 2 promise简单实例：
// function timeout(ms) {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, ms, 'done');
//     });
// }
// //   为什么done就能给到resolve
// //   这是因为 setTimeout 通过 bind 方法实现了额外参数的支持。
// timeout(100).then((value) => {
//     console.log(value);
// });


// 3 执行顺序：
//   then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行
// let promise = new Promise(function(resolve, reject) {
//     console.log('Promise');
//     resolve();
// });
// promise.then(function() {
//     console.log('resolved.');
// });
// console.log('Hi!');
  
// Promise
// Hi!
// resolved


// 4 promise的 嵌套
// 当p1的状态返回为拒绝后，p2的6秒就不等了，而是直接把p1的拒绝状态让其往下走，到then最后打印
// const p1 = new Promise(function (resolve, reject) {
//     setTimeout(() => reject(new Error('fail')), 3000)
// })
// const p2 = new Promise(function (resolve, reject) {
//     setTimeout(() => resolve(p1), 6000)
// })
// p2
// .then(result => console.log(result,'result'))
// .catch(error => console.log(error,'error'))


// 5 Promise.prototype.catch：
// bad
// promise
//   .then(function(data) {
//     // success
//   }, function(err) {
//     // error
//   });

// good
// promise
//   .then(function(data) { //cb
//     // success
//   })
//   .catch(function(err) {
//     // error
//   });
// 第二种写法可以捕获前面then方法执行中的错误，也更接近同步的写法（try/catch）。
// 因此，建议总是使用catch()方法，而不使用then()方法的第二个参数

// getJSON('/posts.json').then(function(posts) {
// // ...xxx
// }).catch(function(error) {
//     // 处理 getJSON 和 前一个回调函数运行时发生的错误
//     console.log('发生错误！', error);
// });
// getJSON返回的状态是rejected或then指定的回调函数运行抛出错误都会被catch方法捕获

// p.then((val) => console.log('fulfilled:', val))
//   .catch((err) => console.log('rejected', err));
// // 等同于
// p.then((val) => console.log('fulfilled:', val))
//   .then(null, (err) => console.log("rejected:", err));

//如果 Promise 状态已经变成resolved，再抛出错误是无效的
// const promise = new Promise(function(resolve, reject) {
//     resolve('ok');
//     throw new Error('test');
//   });
//   promise
//     .then(function(value) { console.log(value) })
//     .catch(function(error) { console.log(error) });
// ok
// !!! Promise 的状态一旦改变，就永久保持该状态，不会再变了
// !!! pp所以es6推荐 在resolve 和reject前面加上return 防止不必要的 代码执行下去


// const promise = new Promise(function (resolve, reject) {
//     resolve('ok');
//     setTimeout(function () { throw new Error('test') }, 0)
//   });
//   promise.then(function (value) { console.log(value) })
//   .catch(function (value) { console.log('oh no',value) })
// 之所以不走catch 因为 promise 状态已经确定了

// Promise.prototype.finally :
// promise
// .finally(() => {
//   // 语句
// });

// // 等同于
// promise
// .then(
//   result => {
//     // 语句
//     return result;
//   },
//   error => {
//     // 语句
//     throw error;
//   }
// );


// Promise.all()：
// （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
// （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

// const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
//   return getJSON('/post/' + id + ".json");
// });

// Promise.all(promises).then(function (posts) {
//   // ...
// }).catch(function(reason){
//   // ...
// });
// promises是包含 6 个 Promise 实例的数组，只有这 6 个实例的状态都变成fulfilled，或者其中有一个变为rejected，才会调用Promise.all方法后面的回调函数

// const p1 = new Promise((resolve, reject) => {
//   resolve('hello');
// })
// .then(result => result)  //resolved
// .catch(e => e);

// const p2 = new Promise((resolve, reject) => {
//   throw new Error('报错了');
// })
// .then(result => result)
// .catch(e => e);//rejected   返回的是一个新的 Promise 实例  该实例执行完catch方法后，也会变成resolved

// Promise.all([p1, p2]) // 由于p2 catch之后变成resolve 导致Promise.all()方法参数里面的两个实例都会resolved
// .then(result => console.log(result)) // s因此会调用then方法指定的回调函数，而不会调用catch方法指定的回调函数
// .catch(e => console.log(e));  // 如果p2没有自己的catch方法，就会调用Promise.all()的catch方法。
// ["hello", Error: 报错了]


// Promise.race():
// const p = Promise.race([p1, p2, p3]); 
// 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变
// 那个率先改变的 Promise 实例的返回值，就传递给p的回调函数

// const p = Promise.race([
//   fetch('/resource-that-may-take-a-while'),
//   new Promise(function (resolve, reject) {
//     setTimeout(() => reject(new Error('request timeout')), 5000)
//   })
// ]);

// p
// .then(console.log)
// .catch(console.error);
// 上面代码中，如果 5 秒之内fetch方法无法返回结果，变量p的状态就会变为rejected，从而触发catch方法指定的回调函数


// Promise.allSettled()
// 只有等到参数数组的所有 Promise 对象都发生状态变更（不管是fulfilled还是rejected），返回的 Promise 对象才会发生状态变更
// 它的回调函数会接收到一个数组作为参数，该数组的每个成员对应前面数组的每个 Promise 对象

// 下面是返回值的用法例子:
// const promises = [ fetch('index.html'), fetch('https://does-not-exist/') ];
// const results = await Promise.allSettled(promises);
// results 包含所有承诺（promises）结果的数组，如果你去掉 await，那么 results 将会是一个 Promise 对象
// // 过滤出成功的请求
// const successfulPromises = results.filter(p => p.status === 'fulfilled');
// // 过滤出失败的请求，并输出原因
// const errors = results
//   .filter(p => p.status === 'rejected')
//   .map(p => p.reason);


// Promise.any():
// 只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；
// 如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态 跟 all 是正好相反的


// Promise.resolve():
// 有时需要将现有对象转为 Promise 对象，Promise.resolve()方法就起到这个作用
// Promise.resolve('foo')
// 等价于
// new Promise(resolve => resolve('foo'))

// Promise.resolve()方法的参数分成四种情况:

    // 1 参数是一个 Promise 实例:
// 如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例

    // 2 参数是一个thenable对象:
// let thenable ={
//     then: function(resolve, reject) {
//       resolve(42);
//     }
//   };
// 因为 thenable 有一个 then 方法，所以 Promise.resolve 会返回一个新的 Promise
// let p1 = Promise.resolve(thenable);
// console.log(p1);// 这个新的 Promise  会根据 thenable 的 then 方法的行为来决定它的状态
// p1.then(function (value) {
//   console.log(value);  // 42
// })

// 这就是当值为thenable时 返回的新promise 的大概样子
// let p1 = new Promise((resolve) => {
//     resolve(42);// 新的 Promise 会接管 thenable 的 then 方法中的逻辑
// });
    // 3 参数不是具有then()方法的对象，或根本就不是对象
// 如果参数是一个原始值，或者是一个不具有then()方法的对象，则Promise.resolve()方法返回一个新的 Promise 对象，状态为resolved
// const p = Promise.resolve('Hello');
// p.then(function (s) {
//   console.log(s)
// });
// Hello
    // 4 不带有任何参数
// 直接返回一个resolved状态的 Promise 对象


// Promise.reject()：














// 构造函数与原型
// 1 构造函数：
// 构造函数是一种特殊的函数，通常用于创建具有特定属性和方法的对象实例。
// 构造函数通常首字母大写，以区别于普通函数。
// 2 原型：
// 构造函数的 prototype 属性是一个对象，用于存放所有通过该构造函数创建的对象实例共享的属性和方法。
// 每个通过构造函数创建的对象实例都有一个 __proto__ 属性，指向构造函数的 prototype。

// 实例化过程
// 1 创建对象：
// 使用 new 关键字调用构造函数时，会创建一个新的空对象。
// 新对象的 __proto__ 属性指向构造函数的 prototype。
// 2 执行构造函数：
// 构造函数内部的代码被执行，可以为新对象添加属性和方法。
// 构造函数通常会使用 this 关键字来引用新创建的对象。
// 3 返回对象：
// 构造函数默认返回新创建的对象。
// 如果构造函数显式返回一个非 null 的对象，则返回该对象。

// 属性和方法的继承
// 1 属性：
// 构造函数内部通过 this 添加的属性会直接存在于实例对象上。
// 实例对象可以直接访问这些属性。
// 2 方法：
// 定义在构造函数的 prototype 上的方法会通过原型链被所有实例共享。
// 实例对象可以通过 __proto__ 访问这些方法