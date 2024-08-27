// Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”
// Proxy 可以理解成，在目标对象之前架设一层“拦截”


// var obj = new Proxy({}, {
//     get: function (target, propKey, receiver) {
//         console.log(`getting ${propKey}!`);
//         return Reflect.get(target, propKey, receiver);
//     },
//     set: function (target, propKey, value, receiver) {
//         console.log(`setting ${propKey}!`);
//         return Reflect.set(target, propKey, value, receiver);
//     }
// });
// obj.count = 1
//  setting count!
// ++obj.count
//  getting count!
//  setting count!

// Proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。其中，new Proxy()表示生成一个Proxy实例，
// target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。

// 一个技巧是将 Proxy 对象，设置到object.proxy属性，从而可以在object对象上调用。
// var object = { proxy: new Proxy(target, handler) };

// Proxy 实例也可以作为其他对象的原型对象
// var proxy = new Proxy({}, {
//     get: function(target, propKey) {
//       return 35;
//     }
// });

// let obj = Object.create(proxy);
// obj.time // 35

// 利用 Proxy，可以将读取属性的操作（get），转变为执行某个函数，从而实现属性的链式操作。
// 我调用谁 ，我就可以通过proxy读取 然后存到数组里，再用reduce进行操作计算  很棒的东西！！！
// var pipe = function (value) {
//     var funcStack = [];
//     var oproxy = new Proxy({} , { // new Proxy 创建一个代理对象   {}是目标对象
//       get : function (pipeObject, fnName) {
//         if (fnName === 'get') {
//           return funcStack.reduce(function (val, fn) {
//             return fn(val);
//           },value);
//         }

//         funcStack.push(window[fnName]);
//         return oproxy;// 返回代理对象本身  new Proxy  保持链式调用的能力
//       }
//     });
//     return oproxy;// 返回代理对象  一样的意思

    
// }
// var double = n => n * 2;
// var pow    = n => n * n;
// var reverseInt = n => n.toString().split("").reverse().join("") | 0;
// pipe(3).double.pow.reverseInt.get; // 63

// const dom = new Proxy({}, {
//     get(target, property) {
//       console.log(property,'property');
//       return function(attrs = {}, ...children) {
//         console.log(attrs,'attrs');
//         console.log(children,'children');
//         const el = document.createElement(property);
//         for (let prop of Object.keys(attrs)) {
//           el.setAttribute(prop, attrs[prop]);
//         }
//         for (let child of children) {
//           if (typeof child === 'string') {
//             child = document.createTextNode(child);
//           }
//           el.appendChild(child);
//         }
//         return el;
//       }
//     }
//   });
  
//   const el = dom.div({},
//     'Hello, my name is ',
//     dom.a({href: '//example.com'}, 'Mark'),
//     '. I like:',
//     dom.ul({},
//       dom.li({}, 'The web'),
//       dom.li({}, 'Food'),
//       dom.li({}, '…actually that\'s it')
//     )
//   );
  
//   document.body.appendChild(el);



// let validator = {
//   set: function(obj, prop, value) {
//     if (prop === 'age') {
//       if (!Number.isInteger(value)) {
//         throw new TypeError('The age is not an integer');
//       }
//       if (value > 200) {
//         throw new RangeError('The age seems invalid');
//       }
//     }

//     // 对于满足条件的 age 属性以及其他属性，直接保存
//     obj[prop] = value;
//     return true;
//   }
// };

// let person = new Proxy({}, validator);

// person.age = 100;

// person.age // 100
// person.age = 'young' // 报错
// person.age = 300 // 报错



// Reflect:与Proxy对象一样，也是 ES6 为了操作对象而提供的新 API。Reflect对象的设计目的有这样几个
// 1 将Object对象的一些明显属于语言内部的方法放到Reflect对象上未来的新方法将只部署在Reflect对象上
// 2 修改某些Object方法的返回结果 
    //比如defineProperty 是Object在无法定义属性时，会抛出一个错误，
// 3 让Object操作都变成函数行为
    // 老写法
    // 'assign' in Object // true
    // 新写法
    // Reflect.has(Object, 'assign') // true
// 4 Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法
// let obj={
//     a:1
// }

// var loggedObj = new Proxy(obj, {
//     get(target, name) {
//         console.log('get', target, name);
//         return Reflect.get(target, name);
//     },
//     deleteProperty(target, name) {
//         console.log('delete' + name);
//         return Reflect.deleteProperty(target, name);
//     },
//     has(target, name) {
//         console.log('has' + name);
//         return Reflect.has(target, name);
//     }
// });
// loggedObj.a
// console.log(loggedObj.a);


let obj={
    name:'张三',
    age:18
}
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  return result;
}