# Random string detection for node.js
random string detection in javascript for short and long string, initialy developped to detect random nickname and channel name on irc

## Installation

To install randomstring, use [npm](http://github.com/npm/npm):

```
npm install randomstring
```

## Usage

```javascript
var rsd = require("random-string-detection");
var score = rsd.detector("Hello i'am not a random string");
console.log(score);
```


## LICENSE

random_string_detection is licensed under the APACHE V2 license.