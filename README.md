# x-module
`x-module` is a light weight library for JavaScript modularization programming. You could use it in both browser and node.js/io.js.

[![Build Status](https://travis-ci.org/iMumuMua/x-module.svg?branch=master)](https://travis-ci.org/iMumuMua/x-module)

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

Define modules in a dir:
```
.
├── mods
│   ├── mod-a.js
│   └── sub
│       ├── mod-b.js
│       └── mod-c.js
└── main.js
```

mod-a.js:
```js
xModule.def('modA', ['modB', 'modC'], function(B, C) {
  return B + C;
});
```

mod-b.js:
```js
xModule.def('modB', function() {
  return 'B';
});
```

mod-c.js:
```js
xModule.def('modC', function() {
  return 'C';
});
```

Load modules and run:

main.js:
```js
var xModule = require('x-module');
var path = require('path');
xModule.load(path.join(__dirname, 'mods'));
xModule.run('modA', function(A) {
    console.log(A); // 'BC'
});
```

## Why x-module?
* **easy**: Just concat and uglify js files in browser, or require files in `node.js`/`io.js`. You don't need to care about the order or the path of files.
* **consistency**: The browser client and server side in the same way to define the module.

## License
[MIT](./LICENSE)
