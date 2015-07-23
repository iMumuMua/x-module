# x-module
`x-module` is a light weight library for JavaScript modularization programming. You could use it in both browser and node.js/io.js.

## Start
### In browser:
First step, add `<script>` tag for `x-module.js` in your web page, such as `index.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
    <!--content-->
    <script src="path/for/x-module/x-module.js"></script>
    <script src="module-a.js"></script>
    <script src="module-b.js"></script>
    <script src="main.js"></script>
</body>
</html>
```

And then add some modules:

module-a.js:
```js
xModule.def('moduleA', function() {
    return 'A';
});
```

module-b.js:
```js
xModule.def('moduleB', ['moduleA'], function(A) {
    return function(name) {
        return 'Hello, ' + name + "! I'm moduleB. The moduleA is " + A;
    };
});
```

Run the module:

main.js:
```js
xModule.run('moduleB', function(B) {
    B('world'); // Hello, world! I'm moduleB. The moduleA is A
});
```

### In node.js or io.js:

Define modules:

module-a.js:
```js
xModule = require('x-module');
xModule.def('moduleA', function() {
    return 'A';
});
```

Run:

main.js:
```js
xModule = require('x-module');
require('./module-a.js');
xModule.run('moduleA', function(A) {
    console.log(A); // 'A'
});
```

## Why x-module?
* **easy**: Just concat and uglify js files in browser, or require files in `node.js`/`io.js`. You don't need to care about the order of files.
* **consistency**: The browser client and server side in the same way to define the module.

## License
[MIT](./LICENSE)
