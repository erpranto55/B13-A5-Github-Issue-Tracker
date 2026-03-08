# GitHub Issues Tracker

## Answers to The Questions

### 1️⃣ What is the difference between var, let, and const?

1. var- var is the oldest way to declare a variable.<br>
   Example: `var a = 10;`<br>
2. let- let is the smartest way to declare a variable and the value can be changed on the function again.<br>
   Example: `let b = 20;`<br>
3. const- const is the way to declare a fixed value variable. If we declare a variable and initialized it , the value can't be changed.<br>
   Example: `const c = 30;`<br>

### 2️⃣ What is the spread operator (...)?

The Spread operator(...) used to expand the value or elements of an array or an object.

### 3️⃣ What is the difference between map(), filter(), and forEach()?

1. map()- It creates a new array by traversing all the elements.'<br>
2. filter() - It creates a new array by filtering using the condition provided.<br>
3. forEach() - Its a loop that goes through an array but does not return anything.<br>

Example:`const numbers = [1,2,3,4];`<br>
`numbers.map(n => n * 2); // [2,4,6,8]`<br>
`numbers.filter(n => n > 2); // [3,4]`<br>
`numbers.forEach(n => console.log(n));`<br>

### 4️⃣ What is an arrow function?

It's a sorter way to write a function.<br>
Example: `const add = (a,b) => a + b;`<br>

### 5️⃣ What are template literals?

It's used to create strings with embedded variables. Need to use backticks(``) instead of quotes.<br>
Example: `const name = "John";`<br>`console.log(\`Hello \${name}\`);`<br>
