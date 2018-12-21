
var plainTab2tex = (function () {
    'use strict';

    var module = {};

    // Used to replace tabulations with spaces
    function repeatString(str, num) {
        return new Array( num + 1 ).join(str);
    }

    // replaces the tabulations with spaces
    function clean_tabu(line) {
        var res = line.replace(/^\t/g, repeatString(" ", 10)),
            i = res.search(/\t/);
        while (i >= 0) {
            res = res.substr(0, i) + repeatString(" ", 8 - ((i + 6) % 8)) + res.substr(i + 1);
            i = res.search(/\t/);
        }
        return res;
    }

    // some cleaning of the output text
    function capitaliseFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function remove_trailing_punctuation(string) {
        return string.replace(/(,|;|\.)*$/g, "");
    }
    function clean_string(line) {
        var res = line;
        res = capitaliseFirstLetter(res);
        res = remove_trailing_punctuation(res);
        return res;
    }


    // insert the guitar tabs into the current line
    function insert_tabs_in_line(cur_line, cur_tabs) {
        var j = cur_tabs.length,// index amoung the cur_tabs
            l = cur_line.length;
        while (j > 0) {
            j -= 1;
            if (cur_tabs[j] !== undefined) {
                l = Math.min(j, l);//if the tabs are after the end of the text line, we insert them at the end
                cur_line = cur_line.substr(0, l) + "<span class='chord'><span>" + cur_tabs[j] + "</span></span>" + cur_line.substr(l);
            }
        }
        return cur_line;
    }

    // extract the tabs of the line into an array where the index is the position of the tab in the line
    function extract_tabs(line) {
        var reg = /^ *[A-Ga-g](#|b|&|\d)?m?\/?(sus|add|maj)?[0-9]?( *(-|\/) *[A-G](#|b|&)?)?( +[A-Ga-g](#|b|&)?m?(sus|add|maj)?[0-9]?( *(-|\/) *[A-G](#|b|&)?)? *)* *$/,
            reguniq = /[A-Ga-g](#|b|&)?m?\/?(sus|add|maj)?[0-9]?( *(-|\/) *[A-G](#|b|&)?)? *$/,
            i,
            tab;

        if (line.match(reg)) {
            i = line.search(reguniq);
            tab = extract_tabs(line.substr(0, i - 1));
            // tab[i] = line.substr(i).trim().replace('b', '&');
            tab[i] = line.substr(i).trim();
            return tab;
        }
        return [];
    }

    // inserts the tabs into the raw_lines according to the "patacrep formatting"
    // input and output are arrays
    module.parse = function (raw_lines) {
        var i = raw_lines.length - 1,    // index amoung the lines of the raw text (we start with the last line)

            cur_line = raw_lines[i],    // line where we currently insert the tabs

            parsed_lines = [],          // lines that are already parsed
            cur_tabs;

        while (i > 0) {
            i -= 1;
            // for every "next line", we try to extract some guitar tabs
            cur_tabs = extract_tabs(clean_tabu(raw_lines[i]));

            if (cur_tabs.length > 0) {
                // if we were able to parse, we insert the guitar tabs into the current line
                cur_line = insert_tabs_in_line(cur_line, cur_tabs);
            } else {
                // else we just move on
                parsed_lines.unshift(cur_line);
                cur_line = clean_string(raw_lines[i]);
            }
            if (i === 0) {
                // for the last iteration
                parsed_lines.unshift(cur_line);
            }
        }
        return parsed_lines;
    };
    return module;
}());
