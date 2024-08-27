// 指数运算符 幂
// console.log(2**4);// 4个2相乘 2*2*2*2 = 16 

// 链判断运算符ES2020  :  obj ?. xxx  原理 => obj == null ? undefined : obj.xxx
// 如果没有b 模拟接口里缺少某一字段 就会直接报错，所以链判断运算符 就是?.这么用的
// let obj={
//     a:{
//         // b:{
//             c:{
//                 d:123
//             }
//         // }
//     }
// }
// console.log(obj);
// let answer=obj?.a?.b?.c?.d ||'default'
// console.log(answer);

// let obj={
//     // method(){//注释掉method方法 模拟没有该方法时 则会立即报错
//     //     return 123
//     // }
// }
// console.log(obj.method?.());//undefined

// Null判断运算符: 
// ?? 只有运算符左侧的值为null或undefined时才会返回右侧的值, 而
// || 属性的值如果为空字符串或false或0 也会返回默认值 hello
// let obj={
//     a:{
//         b:false
//     }
// }
// let c=obj.a.b || 'hello'
// let d=obj.a.b ?? 'hello'
// console.log(c);//hello
// console.log(d);//false
// 官方表示有优先级问题 lhs ?? middle || rhs 多个逻辑运算符一起使用就会报错，所以必须加入表明优先级的括号

// 逻辑赋值运算符
// 老的写法
// user.id = user.id || 1;
// 新的写法
// user.id ||= 1;

// symbol 独一无二的值 
// 不能被实例化

// set : 它类似于数组，但是成员的值都是唯一的，没有重复的值。
// const s = new Set();
// [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
// console.log(s); //2 3 5 4
// const set = new Set(document.querySelectorAll('div'));
// console.log(set);
// Array.from()方法可以将 Set 结构转为数组。
// const items = new Set([1, 2, 3, 4, 5]);
// const array = Array.from(items);

// set的用处之一 去除数组重复成员的另一种方法
// function dedupe(array) {
// return Array.from(new Set(array));
// }
// dedupe([1, 1, 2, 3]) // [1, 2, 3]

// let aArr=["JavaScript", "HTML", "CSS"]
// let bArr=["Python", "Java", "JavaScript"]
// let cArr=[]
// cArr = bArr.filter(function(item) {
//     return !aArr.includes(item);
// });
// console.log(cArr);//["Python", "Java"]

// map: 是一种新的内置对象类型，用于存储键值对，允许使用任意类型的值作为键
// 1 size has get set 方法等
// 2 数组转map原理
// 3 内存地址不一样的键 即使名字相同 但在 Map 结构中被视为两个键
// 4 map和数组 对象 JSON 的互转
// 1 size has get set delete clear方法等
// const m = new Map();
// const o = {p: 'Hello World'};
// m.set(o, 'content')
// console.log(m);
// const map = new Map([
//     ['name', '张三'],
//     ['title', 'Author']
// ]);
// console.log(map);
// let arr=[...map]
// console.log(arr);

// console.log(arr.values());
// for (let [key, value] of map.entries()) {
//     console.log(key, value);
//   }

// map.size // 2
// map.has('name') // true
// map.get('name') // "张三"
// map.has('title') // true
// map.get('title') // "Author"
// map.delete('name')
// console.log(map.has('name'));
// console.log(map);
// 2 原理如下：
// const items = [
//  ['name', '张三'],
//  ['title', 'Author']
// ];
// const map = new Map();
// items.forEach(
//  ([key, value]) => map.set(key, value)
// );
// 3 内存地址不一样的键 即使名字相同 但在 Map 结构中被视为两个键
// const map = new Map();                                          
// const k1 = ['a'];
// const k2 = ['a'];
// map
// .set(k1, 111)
// .set(k2, 222);
// map.get(k1) // 111
// map.get(k2) // 222
// 4 map和数组的互转：
// 例子：结合数组的方法 例如filter方法
// const map0 = new Map()
//   .set(1, 'a')
//   .set(2, 'b')
//   .set(3, 'c');
// // 将数组传入 Map 构造函数，就可以转为 Map
// const map1 = new Map(
//     // [...map0] map转数组
//     [...map0].filter(([k, v]) => k < 3)
// );
// console.log([...map1]);
// Map 转为对象 JSON互转等等:
// let obj={}
// for (let [k,v] of map0) {
//     console.log(k,v);
//     obj[k] = v;
// }
// console.log(obj);


// WeakSet:
// WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
// 首先，WeakSet 的成员只能是对象和 Symbol 值，而不能是其他类型的值。
// 其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，
// 那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

// WeakMap:
// WeakMap与Map的区别有两点:
// 1 WeakMap只接受对象（null除外,数组也算是对象，所以数组可以）和 Symbol 值作为键名，不接受其他类型的值作为键名
// 2 WeakMap的键名所指向的对象，不计入垃圾回收机制
const map = new WeakMap();
const k1 = [1, 2, 3];
map.set(k1, 2)
console.log(map.get(k1));
// map.set(null, 2) // 报错 null不可以
// map.set(1, 2) // 报错  (除了数组对象Symbol，剩下的都会报错)



// WeakRef:
// WeakSet 和 WeakMap 是基于弱引用的数据结构，
// ES2021 更进一步，提供了 WeakRef 对象，用于直接创建对象的弱引用。

// WeakRef 实例对象有一个deref()方法如果原始对象存在，该方法返回原始对象；如果原始对象已经被垃圾回收机制清除，该方法返回undefined。
// 所以我个人认为他可以去判断 某些对象有没有被引用

// FinalizationRegistry  清理器注册表功能
// 用来指定目标对象被垃圾回收机制清除以后，所要执行的回调函数

