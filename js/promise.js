// promise简单实例：
function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    });
}
//   为什么done就能给到resolve
//   这是因为 setTimeout 通过 bind 方法实现了额外参数的支持。
timeout(100).then((value) => {
    console.log(value);
});

// 执行顺序：
//   then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行
let promise = new Promise(function(resolve, reject) {
    console.log('Promise');
    resolve();
});

promise.then(function() {
    console.log('resolved.');
});

console.log('Hi!');
  
// Promise
// Hi!
// resolved

// promise的 嵌套
// 当p1的状态返回为拒绝后，p2的6秒就不等了，而是直接把p1的拒绝状态让其往下走，到then最后打印
const p1 = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('fail')), 3000)
})
const p2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(p1), 6000)
})
p2
.then(result => console.log(result,'result'))
.catch(error => console.log(error,'error'))





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