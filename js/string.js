// 1 includes():
// 用途: 判断一个字符串是否包含另一个子字符串。
// 参数: 接受一个必需的子字符串参数，以及一个可选的起始搜索位置。
// 返回值: 如果找到子字符串，则返回true，否则返回false。
// 区分大小写: 是，区分大小写地进行匹配。
// 适用对象: 字符串和数组。

// 2 startsWith() 和 endsWith():
// 用途: 分别检查字符串是否以指定的子字符串开头或结尾。
// 参数: 都接受一个必需的子字符串参数，以及一个可选的搜索位置（对于startsWith）或长度（对于endsWith）。
// 返回值: 如果满足条件则返回true，否则返回false。
// 区分大小写: 是，区分大小写。

// 3 indexOf():
// 用途: 返回指定子字符串在字符串中第一次出现的索引位置。
// 参数: 接受一个必需的子字符串参数，以及一个可选的起始搜索位置参数。
// 返回值: 找到子字符串则返回其在原字符串中的索引位置，否则返回-1。
// 区分大小写: 是，区分大小写地进行匹配。
// 适用对象: 字符串和数组。

// 4 search():
// 用途: 类似于indexOf()，但接受正则表达式作为参数，允许更复杂的匹配规则。
// 参数: 接受一个正则表达式作为参数。
// 返回值: 返回匹配到的子字符串的索引位置，如果没有找到匹配项，则返回-1。
// 区分大小写: 可通过正则表达式的标志(i忽略大小写)控制。
// 适用对象: 仅限字符串。

// 5 at():
// 用途: 是较新的方法，用于获取字符串或数组中指定索引位置的元素。
// 参数: 接受一个索引值，可以是正数也可以是负数。
// 返回值: 直接返回指定位置的元素。
// 特别之处: 支持负索引来从尾部访问元素，如str.at(-1)返回最后一个字符。
// 适用对象: 字符串和数组（ES2022引入）。

// 6 raw的用处示例
console.log(String.raw`Hi\n${2+3}!`);
console.log(`Hi\n${2+3}!`);
console.log(String.raw`Hi\u000A!`);
console.log(`Hi\u000A!`);

// 7 repeat
console.log('na'.repeat(3));
console.log('abc'.padStart(5,'xxx'));
console.log('abc'.padEnd(5,'xxx'));

// 8 replaceAll
console.log('aabbcc'.replaceAll(/b/g, '_'));
// console.log('aabbcc'.replaceAll(/b/, '_')); //不带g 会报错  
console.log('aabbcc'.replace(/b/, '_')); //不带g 不会报错  
console.log('xxqwewq'.replaceAll('q', '$`'));//xxxxwewxxqwew
console.log('xxqwewq'.replaceAll('q', `$'`));//xxwewqwew
console.log('xxqwewq'.replaceAll(/(xq)(we)/g, `$2$1`));//用于调换字符串中的位置 找到xq 和 we 进行自然数之间的调换
console.log('abc'.replaceAll('b', '$$'));// 'a$c'
const str = '123abc456';
const regex = /(\d+)([a-z]+)(\d+)/g;
// 这是一个回调函数 p1,p2,p3 有多少个组匹配，就有多少个对应的参数
function replacer(match, p1, p2, p3, offset, string) {
  // match  捕捉到的匹配内容
  // string 原字符串
  // console.log(match, p1, p2, p3, offset, string);
  return [p1, p2, p3].join(' - ');
}
str.replaceAll(regex, replacer)

// 9  trimStart 和 trimEnd
const s = '  abc  ';
s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"

// Math.trunc(-3.2)会返回-3
// Math.floor(-3.2)会返回-4
// console.log(Math.sign(5));