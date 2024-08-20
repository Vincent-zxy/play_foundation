// 扩展运算符
// getPrototypeOf 
// super 关键字
// Object.is() 
// Object.assign()
// Object.getOwnPropertyDescriptors()
// Object.getOwnPropertyDescriptor()
// Object.defineProperties
// __proto__
// Object.setPrototypeOf()
// Object.hasOwnProperty()


// 简写：
// 属性的简写：
// const foo='123'
// const baz={foo}
// const baz={foo:foo}
// 方法的简写：
// const o = {
//     method() {
//         return "Hello!";
//     }
// };
// 等同于
// const o = {
//     method: function() {
//         return "Hello!";
//     }
// }; 

// 属性名表达式 说白了就是 []：
// let obj={}
// obj.foo = true;//Es5 定义对象属性
// obj['a' + 'bc'] = 123;//Es6 定义对象属性 
// console.log(obj);//{abc: 123}

// 属性的遍历 :
// let obj={
//     'a':1,
//     'b':2,
//     'c':3,                                    
//     'd':4,
// }
// for(let a in obj){
//     console.log(a);
//     console.log(obj[a]);
// }
// console.log(Object.keys(obj));
// console.log(Object.values(obj));
// console.log(Object.entries(obj));
// console.log(Object.getOwnPropertyNames(obj));
// console.log(Object.getOwnPropertySymbols(obj));
// console.log(Reflect.ownKeys(obj));

// super :
// this关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字super，指向当前对象的原型对象
// const proto = {
//     foo: 'hello'
// };
// const obj = {
//     foo: 'world',
//     find() {
//         return super.foo;
//     }
// };
// Object.setPrototypeOf(obj, proto);
// console.log(  obj.find() );

// let o1 = { a: 1 };
// let o2 = { b: 2 };
// o2.__proto__ = o1;
// let { ...o3 } = o2;
// console.log(o3.a); // undefined
// console.log(o2.a); // 1
// 扩展运算符的解构赋值，不能复制继承自原型对象的属性,不能复制它的原型对象的属性

// const o = Object.create({ x: 1, y: 2 });
// o.z = 3;
// console.log(o);
// let { x, ...newObj } = o;
// let { y, z } = newObj;
// x // 1
// y // undefined
// z // 3

// class C {
//     p = 12;
//     m() {}
// }
// let c = new C();
// console.log(c);
// let clone = { ...c };
// clone.p; // ok
// clone.m(); // 报错

// let aClone = { ...a };
// 等同于
// let aClone = Object.assign({}, a);

// 完整克隆一个对象：
// const obj= Object.create({ x: 1, y: 2 })
// obj.z=function() {
//     return 3
// }
// console.log(obj);
// // 错误示范 ： 只是拷贝了对象实例的属性
// let objs={...obj}
// console.log(Object.getPrototypeOf(obj));
// console.log(objs.x); //undefined
// console.log(objs.z());

// Object.create:如果只是有一个参数，那么他会把第一个参数（该对象）放到调用的对象的原型对象身上，如果有两个参数那就第二参数就是自身属性
// getPrototypeOf:获取原型对象的

// 方法一： 原型方法也能复制过来  __proto__属性在非浏览器的环境不一定部署 不推荐使用
// let objs= {
//     __proto__:Object.getPrototypeOf(obj),
//     ...obj
// }
// console.log(objs.x); //1
// console.log(objs.z());
// 写法二
// let a=Object.getPrototypeOf(obj)
// console.log(a);
// const objs = Object.assign(   
//     Object.create(Object.getPrototypeOf(obj)),
//     obj
// );
// console.log(objs);
// console.log(objs.x); //1
// console.log(objs.z())//3
// 写法三
// const objs = Object.create(
//     Object.getPrototypeOf(obj),//x,y
//     Object.getOwnPropertyDescriptors(obj)//z
// )
// console.log(objs);
// 对象的扩展运算符后面可以跟表达式
// const obj = {
//     ...(x > 1 ? {a: 1} : {}),
//     b: 2,
//   };

// Object.is() 比较两个值是否相等 ：
// == 会自动转换数据类型
// === NaN不等于自身
// 只要两个值是一样的，它们就应该相等
// 所以 Object.is() 弥补了这种运算
// === 和  Object.is 不同之处只有两个：一是+0不等于-0，二是NaN等于自身。
// console.log(Object.is(NaN,NaN));//true
// console.log(Object.is(1,'1'));//false

// Object.assign() 用于对象的合并 ：
// const target = { a: 1, b: 1 };
// const source1 = { b: 2, c: 2 };
// const source2 = { c: 3 };
// Object.assign(target, source1, source2);
// console.log(target); // {a:1, b:2, c:3}  覆盖前面的属性
// Object.assign(null || undefined) // 报错

// Object.getOwnPropertyDescriptors ：
// 主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题
// 该方法的底层就是由 getOwnPropertyDescriptor 实现的
// function getOwnPropertyDescriptors(obj) {
//   const result = {};
//   for (let key of Reflect.ownKeys(obj)) {
//     result[key] = Object.getOwnPropertyDescriptor(obj, key);
//   }
//   return result;
// }
// const obj = {
//   foo: 123,
//   get bar() { return 'abc' },
//   set baz(value) {
//     console.log(value);
//   }
// };
// console.log(obj);                                                                          
// console.log(Object.getOwnPropertyDescriptor(obj,'foo'));
// console.log(Object.getOwnPropertyDescriptors(obj));
// console.log(Reflect.ownKeys(obj));
// const source = {
//   set foo(value) {
//     console.log(value);
//   }
// };
// const target2 = {};
// console.log(Object.getOwnPropertyDescriptors(source));
// Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source))
// obj: 要在其上定义或修改属性的对象。
// props: 一个对象，其属性键是要添加到 obj 的属性名，其属性值是对应的描述符对象。
// console.log(target2);
// console.log(Object.getOwnPropertyDescriptor(target2, 'foo'));


// __proto__ :调用的是Object.prototype.__proto__

// Object.setPrototypeOf() ：用来设置一个对象的原型对象
// Object.getPrototypeOf() : 读取一个对象的原型对象
// 和 Object.create的区别 create是创建一个对象 并为设置该对象的原型，而setPrototypeOf是可以直接修改原型对象的
// let proto = {};
// let obj = { x: 10 };
// Object.setPrototypeOf(obj, proto);
// proto.y = 20;8
// proto.z = 40;
// console.log(obj);
// obj.x // 10
// obj.y // 20
// obj.z // 40
// console.log(Object.getPrototypeOf(obj));

// Object.keys()，Object.values()，Object.entries() 返回一个数组
// var obj = { foo: 'bar', baz: 42 };
// console.log(Object.keys(obj));
// console.log(Object.values(obj));
// console.log(Object.entries(obj));
// for (let key of Object.keys(obj)) {
//   console.log(key); // 'a', 'b', 'c'
//   // console.log(value); // 1, 2, 3
//   // console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
// }
// 如果参数不是对象 除了字符串被枚举剩下的转成空数组 Object.values(42) // []

// Object.fromEntries() ：是Object.entries()的逆操作，用于将一个键值对数组转为对象。

// console.log(Object.entries({ foo: "bar", baz: 42 }));// [ ['foo', 'bar'],['baz', 42] ]
// Object.fromEntries([
//   ['foo', 'bar'],
//   ['baz', 42]
// ])// { foo: "bar", baz: 42 }
  
// let a=Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))// { foo: "bar", baz: "qux" }

// Object.hasOwn()

// let proto = {};
// let obj = { x: 10 };
// Object.setPrototypeOf(obj, proto);
// proto.y = 20;8
// proto.z = 40;
// console.log(obj);
// console.log(Object.hasOwn(obj, 'x') );//true
// console.log(Object.hasOwn(obj, 'y') );//false
// console.log(Object.hasOwn(obj, 'z') );//false

// Object.hasOwnProperty:判断对象里是否有某个属性
// let obj={
//     'a':1,
//     'b':2
// }
// console.log(obj.hasOwnProperty('a'));//true
// console.log(obj.hasOwnProperty('b'));//true
// console.log(obj.hasOwnProperty('c'));//false


