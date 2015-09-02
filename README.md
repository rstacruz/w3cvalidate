# validator

Command-line access to https://validator.w3.org/nu/

```sh
$ validate index.html

index.html: The Content-Type was text/html. Using the HTML parser.
index.html: Using the schema for HTML with SVG 1.1, MathML 3.0, RDFa 1.1, and ITS 2.0 support.
index.html:124:7: info: Consider using the h1 element as a top-level heading only (all h1 elements are treated as top-level headings by many screen readers and other tools).
index.html:133:3: info: Section lacks heading. Consider using h2-h6 elements to add identifying headings to all sections.
```

<br>

## Programmatic access

via JavaScript:

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
