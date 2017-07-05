# rest-url-parser
Parse a RESTful URL with javascript object.

Just copy javascript file to your project and require it.

`window.RestUrlParser = require('path/to/rest_url_parser.js');`

and you can parse a RESTful URL

```
var rest_url = "http://example.com/users/:id?foo=bar";
var user = {
    id: 1,
    name: 'User 1'
};

var rest_url_parser = new RestUrlParser(rest_url);

var url = rest_url_parser.parse(user);

console.log(url)
// http://example.com/users/1?foo=bar
```
