# validator

Command-line access to https://validator.w3.org/nu/

```sh
$ w3cvalidate index.html

index.html: The Content-Type was text/html. Using the HTML parser.
index.html: Using the schema for HTML with SVG 1.1, MathML 3.0, RDFa 1.1, and ITS 2.0 support.
index.html:124:7: info: Consider using the h1 element as a top-level heading only (all h1 elements are treated as top-level headings by many screen readers and other tools).
index.html:133:3: info: Section lacks heading. Consider using h2-h6 elements to add identifying headings to all sections.
```

<br>

## :warning: Deprecation notice

It's better to use `curl` with the validator.w3.org's `?out=gnu` setting.

```sh
alias w3cvalidate='curl -H "Content-Type: text/html; charset=utf-8" --data-binary @- "https://validator.w3.org/nu/?out=gnu"'

cat FILE_TO_VALIDATE.html | w3cvalidate
```

<br>

## Usage

Command-line via Node.js/iojs:

```
npm install -g w3cvalidate
w3cvalidate <FILE>
```

Programmatic usage via JavaScript:

```js
var validate = require('w3cvalidate')

validate('<!doctype html>...')
.then(function (res) {
  res.errors === 0
  res.warnings === 0
  res.results === [
    {
      type: 'info',
      line: 2,
      column: 3,
      message: 'Section lacks heading. Consider using h2-h6...'
    }
  ]
})
```

<br>

## Thanks

**w3cvalidate** © 2015+, Rico Sta. Cruz. Released under the [MIT] License.<br>
Authored and maintained by Rico Sta. Cruz with help from contributors ([list][contributors]).

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/w3cvalidate/contributors
