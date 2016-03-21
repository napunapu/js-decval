# js-decval
Simple JavaScript decimal number validator.

Currently the decimal separator is a period (`.`).

## Usage

```javascript
validate(numberString[, maxIntegralCount[, fractionalCount]])
```

## Examples

The function retuns a `boolean`, in the following cases a `true`. In the following example the library has been `require`d using Node.js's syntax:

```javascript
var decval = require('../index');
var ok = decval.validate('123.4');
var ok = decval.validate('123.45');
var ok = decval.validate('123.45', 3);
var ok = decval.validate('123.45', 3, 2);
```

## Running tests

Prerequisites: Node.js (including `npm`)

Install dependencies:

```sh
npm install
```

And run tests:

```sh
make test
```