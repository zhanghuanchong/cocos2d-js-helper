# cocos2d-js-helper
Cocos2d-js helper classes/functions. 

Note: Developing with **Cocos2d-x 3.10**.

Download
===
Choose one of following methods:
* Download the dist/helper.js or dist/helper.min.js
* Use npm
```bash
    $ npm i cocos2d-js-helpers --save
```
* Use bower
```bash
    $ bower install cocos2d-js-helper --save
```
* Use git submodule
```bash
    $ git submodule add https://github.com/zhanghuanchong/cocos2d-js-helper.git vendor/helpers
    $ cd vendor/helpers
    $ npm install
    $ bower install
    $ gulp build
```
Then you will find the compiled helper.js and helper.min.js in the folder **src/vendor/helpers**. Include them and enjoy!

Install
===
Sample definition:
```javascript
var util = new (Cocos2dJsHelper.extend({
    // More properties

    // More methods
}))();
```

Sample usage:
```javascript
util.config(util.CONFIG_DEBUG, true);
```

Dependencies
===
* [lodash](https://lodash.com/): a modern JavaScript utility library delivering modularity, performance, & extras.
* [sylvester](http://sylvester.jcoglan.com/): a vector, matrix and geometry library for JavaScript.

Document
===
[http://zhanghuanchong.github.io/cocos2d-js-helper](http://zhanghuanchong.github.io/cocos2d-js-helper)

Contributing
===
Please create pull request.

License
===
The MIT License (MIT)

Copyright (c) 2016 Hans Zhang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
