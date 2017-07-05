function RestUrl(url) {
    var base_url = url;
    var parser = document.createElement('a');
    parser.href = base_url;

    this.parse = function(obj, suffix = "") {
        parser.parameters = parser.pathname.split('/').filter(function (str) {
            return str.match(':');
        });
        var url = parser.protocol + "//" + parser.host;
        $.each(parser.parameters, function(i, key){
            parser.pathname = parser.pathname.replace(key, obj[key.replace(":", "")]);
        });
        url += parser.pathname + suffix + parser.search;

        return url;
    }

    this.get_query_string = function(name) {
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        var results = regex.exec(parser.search);
        if (!results) return '';
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    this.update_query_string = function(name, value) {
        var newParam = name + '=' + value

        if (parser.search) {
            var regex = new RegExp('([\?&])' + name + '[^&]*');
            if (parser.search.match(regex) !== null) {
                parser.search = parser.search.replace(regex, "$1" + newParam);
            } else {
                parser.search = parser.search + '&' + newParam;
            }
        }

        return parser.href
    }

    this.remove_query_string = function(name) {
        if (parser.search) {
            var splited_search = parser.search.substr(1, parser.search.length).split("&");
            for (var i = splited_search.length - 1; i >= 0; i -= 1) {
                param = splited_search[i].split("=")[0];
                if (param === name) {
                    splited_search.splice(i, 1);
                }
            }
            parser.search = "?" + splited_search.join("&");
        }

        return parser.href
    }
}

module.exports = RestUrl;
