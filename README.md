#### 1) What is the difference between var, let, and const?

#### 2) What is the difference between map(), forEach(), and filter()? 

#### 3) What are arrow functions in ES6?

#### 4) How does destructuring assignment work in ES6?

#### 5) Explain template literals in ES6. How are they different from string concatenation?


#### Answer:

### 1) var is Function-scoped or globally scoped if declared outside a function. It can be redeclared and updated. let is Block-scoped. It can be updated but not redeclared in the same scope. const is Block-scoped. It cannot be reassigned must be initialized at declaration.

### 2) forEach() executes a function for each array element. It does not return a new array (returns undefined). map() executes a function for each element. It returns a new array with transformed values. filter() executes a test function for each element. It returns a new array with elements that pass the condition. It is used for selection.
### 3) Arrow functions in ES6 is a shorter syntax for writing functions. They do not have their own this, arguments, or super, they inherit from enclosing scope.
### 4) Destructuring assignment in ES6 is a way to unpack values from arrays or properties from objects into variables. It makes code cleaner and avoids repetitive referencing.
### 5) Template literals in ES6 is a string enclosed by backticks (``) instead of quotes. It allows interpolation (${}) and multi-line strings without \n.