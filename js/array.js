// 数组：
// 1 ... 
// 2 from
// 3 of 
// 4 copyWithin
// 5 find 
// 6 findIndex
// 7 findLast
// 8 findLastIndex
// 9 fill
// 10 entries，keys , values
// 11 includes
// 12 flat
// 13 filter Es5
// 14 at
// 15 toReversed  toSorted  toSpliced  with
// 16 数组的空位
// 还有一些，es6之前的 ：
// push、unshift、pop、shift、splice、at、indexOf、lastIndexOf、includes、
// join、split、forEach、map、sort、reduce、concat、slice、reverse


// 1 ... 扩展运算符：
// 浅拷贝：concat 、 ... 
// 复制浅拷贝、合并数组、数组的解构赋值、字符串的解构赋值、解构iterator、解构Generator
// 应用：
// const [first, ...rest] = ["foo"]; 
// console.log(first,rest);//foo , []
// let map = new Map([
//   [1, 'one'],
//   [2, 'two'],
//   [3, 'three'],
// ]);
// console.log(map.keys());
// console.log(map.values());
// const go = function*(){
//   yield 1;
//   yield 2;
//   yield 3;
// };  

// 2 from 类对象转数组：
//  let obj={
//   '0': "a",
//   '1': "b",
//   length: 2
//  }
//  console.log(Array.from(obj));// ['a', 'b', ]
// Array.from('hello')// ['h', 'e', 'l', 'l', 'o']

// 应用：
// function add(...arg){
//   console.log(Array.from(arguments));
//   console.log(arg);
// }
// add(1,2,3)

// 3 of 将一组值，转换为数组:
// let a=Array.of(3, 11, 8) // [3,11,8]  

// 4 copyWithin 将指定位置的成员复制到其他位置（会覆盖原有成员）:
// console.log([1, 2, 3, 4, 5].copyWithin(0, 1, 2));// 2,2,3,4,5
// target 从该下标替换数据  start 开始位置 end结束位置

// 5 find 找出第一个符合条件的数组成员:
// 如果没有符合条件的成员，则返回undefined。
// let arr=[1, 4, -5, 10].find((n) => n < 0)
// console.log(arr);

// 6 findIndex 返回第一个符合条件的数组成员的位置x:
// 如果所有成员都不符合条件，则返回-1。
// [1, 5, 10, 15].findIndex(function(value, index, arr) {
//     // 当前的值、当前的位置和原数组 find也一样
//     return value > 9;
// }) // 2
// [NaN].indexOf(NaN)//-1  这是indexOf缺点 但是换成findIndex 就是 0

// 7 findLast 从数组的最后一个成员开始，依次向前检查，返回数组成员:
// 如果没有符合条件的成员，则返回undefined。
// let arr=[1, 4, -5, 10].find((n) => n < 0)
// console.log(arr);

// 8 findLastIndex 从数组的最后一个成员开始，依次向前检查，返回数组成员下标:
// 如果没有符合条件的成员，则返回-1。
// [1, 5, 10, 15].findLastIndex(function(value, index, arr) {
//     // 当前的值、当前的位置和原数组 find也一样
//     return value > 9;
// })// 3

// 9 fill 使用给定值，填充一个数组:
// 第二个和第三个参数,用于指定填充的起始位置和结束位置
// ['a', 'b', 'c'].fill(7, 1, 2)// ['a', 7, 'c']

// 10 entries，keys , values 
// 数组也有这三个方法 
// 它们都返回一个遍历器对象  用for...of循环进行遍历
// for (let elem of ['a', 'b'].values()) {
//     console.log(elem);//'0' '1'  keys
//     console.log(elem);//'a' 'b'  values
// }
// for (let [index, elem] of ['a', 'b'].entries()) {
//     console.log(index, elem);
//     // 0 "a"
//     // 1 "b"
// }
// let letter = ['a', 'b', 'c'];
// let entries = letter.entries();
// console.log(entries.next().value); // [0, 'a']
// console.log(entries.next().value); // [1, 'b']
// console.log(entries.next().value); // [2, 'c']

// 11 includes 返回一个布尔值
// 与字符串的includes方法类似
// [1, 2, 3].includes(2)     // true
// [1, 2, 3].includes(4)     // false
// [1, 2, NaN].includes(NaN) // true

// 12 flat 扁平化数组
// [1, 2, [3, 4]].flat()  //[1, 2, 3, 4] （）里可以填写数组 代表几层
// [1, [2, [3]]].flat(Infinity) // [1, 2, 3] 如果有很多层 加个 Infinity 参数

// 13 filter 
// console.log([1, 2,'', 4, 5].filter(Boolean));//过滤数组

// 14 at 
// const arr = [5, 12, 8, 130, 44];
// console.log(arr[arr.length-1]);//之前只能这么获取数组最后一位
// console.log(arr.at(-1));//现在用at直接获取
// 超过范围就undefined

// 15 toReversed  toSorted  toSpliced  with
//    reverse     sort      splice     splice
// 新的四个方法对应之前的方法实现的功能，并且新的4个方法都不改变原数组，而返回一个原数组的拷贝
// const sequence = [1, 2, 3];
// console.log(sequence.toReversed());// [3, 2, 1]
// sequence // [1, 2, 3] 不改变原数组

// const outOfOrder = [3, 1, 2];
// console.log(outOfOrder.toSorted()) // [1, 2, 3]

// const array = [1, 2, 3, 4];
// console.log(array.toSpliced(1, 2, 5, 6, 7)) // [1, 5, 6, 7, 4]
// 参数1：索引位置 参数2：删除的个数 参数3之后：要添加的值

// const correctionNeeded = [1, 1, 3];
// console.log(correctionNeeded.with(1, 2)) // [1, 2, 3]
// 参数1：索引位置 参数2：替换的值


// 16 数组的空位
// [ , , , ]
// 在Es5:
// 注意，空位不是undefined，某一个位置的值等于undefined，依然是有值的。空位是没有任何值
// forEach(), filter(), reduce(), every() 和some()都会跳过空位。
// map()会跳过空位，但会保留这个值
// join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。

// 在Es6:
// 明确将空位转为undefined
// entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。
// map()是会跳过的

