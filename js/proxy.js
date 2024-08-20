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
var pipe = function (value) {
    var funcStack = [];
    var oproxy = new Proxy({} , { // new Proxy 创建一个代理对象   {}是目标对象
      get : function (pipeObject, fnName) {
        if (fnName === 'get') {
          return funcStack.reduce(function (val, fn) {
            return fn(val);
          },value);
        }
        funcStack.push(window[fnName]);
        return oproxy;// 返回代理对象本身  new Proxy  保持链式调用的能力
      }
    });
    return oproxy;// 返回代理对象  一样的意思

    
}
var double = n => n * 2;
var pow    = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;
pipe(3).double.pow.reverseInt.get; // 63

// const dom = new Proxy({}, {
//     get(target, property) {
//         console.log(property);
        
//       return function(attrs = {}, ...children) {
//         console.log(children);
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