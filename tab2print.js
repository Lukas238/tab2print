// var request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const handlebars = require('handlebars');
const Jimp = require("jimp");
const util = require('util');
eval(fs.readFileSync('./node_modules/guitar-tabs_songtex.js/guitar-tabs_songtex.js') + '');


// var url = 'http://localhost/ukulele-tabs-2-print/source.html';
// var url = 'https://www.ukulele-tabs.com/uke-songs/mumford-and-sons/the-cave-uke-tab-17047.html';
// var url = 'https://www.ukulele-tabs.com/uke-songs/queen/bohemian-rhapsody-uke-tab-54709.html';
var url = 'https://www.ukulele-tabs.com/uke-songs/israel-kamakawiwoole/somewhere-over-the-rainbowwhat-a-wonderful-world-uke-tab-12260.html';
// var url = 'https://www.ukulele-tabs.com/es/tablaturas/thin-lizzy/whiskey-in-the-jar-uke-tab-12187.html';
// var url = 'https://www.ukulele-tabs.com/es/tablaturas/jorge-drexler/sea-uke-tab-37544.html';
// var url = 'https://www.ukulele-tabs.com/es/tablaturas/folk-songs/you-are-my-sunshine-uke-tab-15237.html';
// var url = 'https://www.ukulele-tabs.com/uke-songs/mumford-and-sons/the-cave-super-easy-uke-tab-23983.html';
url = "hhttps://www.ukulele-tabs.com/uke-songs/sting/i-hung-my-head-uke-tab-4506.html";
url = "https://www.ukulele-tabs.com/uke-songs/sting/message-in-the-bottle-uke-tab-34870.html";


// Handlebars Helpers
handlebars.registerHelper('math', function (lvalue, operator, rvalue) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
});


// Functions

function init() {
    rp(url)
        .then(function (raw_html) {
            parse_data(raw_html);
        })
        .catch(function (err) {
            console.log('error');
        });
}

function save_output(html) {

    fs.writeFile("output.html", html, function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}

function get_tabs() {

    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            return html;
        }
    });

}

function parse_data(html) {
    var data = {
        title: '',
        author: '',
        chords: {
            diagrams: [],
            photos: []
        },
        verses: []
    };
    var $ = cheerio.load(html);

    [data.title, data.author] = $('#page_title span').map((key, value) => $(value).text()).get();

    var diagrams_URLs = $('#sticky_crd img').map((key, value) => 'https://www.ukulele-tabs.com/' + $(value).attr('src').replace('../', '')).get();

    // console.log(data.chords.diagrams);
    data.chords.photos = $('#sticky_crd a').map((key, value) => 'https://www.ukulele-tabs.com' + $(value).attr('href')).get();

    //Remove faux title
    // $('pre').contents().each(function (key, item) {
    //     if (item.name == "a") {
    //         return false;
    //     }
    //     $(item).remove();
    // });

    var raw_textlines = $('<div/>').html($('pre').html().replace(/<br>/mg, "\n")).text().trim();
    raw_textlines = raw_textlines.split(/\r\n|\r|\n/g);

    // data.verses = plainTab2tex
    //     .parse(raw_textlines)
    //     .join('<br/>')
    //     .replace(/\\\[([^\]]+)\]/gm, '</span><span class="chord"><span>$1</span></span><span>')
    //     .replace(/(<br\/?>){2,}/gm, '<br/><br/>')
    //     .split(/<br\/><br\/>/);
    data.verses = raw_textlines
        .join('<br/>')
        .replace(/\\\[([^\]]+)\]/gm, '</span><span class="chord"><span>$1</span></span><span>')
        .replace(/(<br\/?>){2,}/gm, '<br/><br/>')
        .split(/<br\/><br\/>/);


    data.verses = data.verses.map(function (val) {
        var re = /<span><\/span>|<span>$|^<\/span>/gm;
        return val.replace(re, '');
    });

    // diagrams_URLs.map((diagrams_URLs) => {
    //     proccess_url(diagrams_URLs).then(function (val) {
    //         data.chords.diagrams.push(val);
    //     });
    // });

    data.chords.diagrams = diagrams_URLs;
    // var requests = []
    // for(var i = 0; i < diagrams_URLs.length; i++){
    //     console.log(diagrams_URLs[i]);
    //     requests.push(get_image(diagrams_URLs[i]).then(function (res) {
    //         return res;
    //     }));
    // };

    // Promise.all(requests).then((dataAll) => {
    //     for (var i = 0; i < dataAll.length; i++) {
    //         console.log(dataAll[i]);
    //     }
    //     render_template(data);
    // });
    render_template(data);
}

function render_template(data) {

    var source = fs.readFileSync('./tab_page.hbs', 'utf-8');
    var template = handlebars.compile(source);
    save_output(template(data));
}

function get_image(url) {
    Jimp.read(url, function (err, img) {

        var output = '';
        console.log(url);
        // img
        //     .greyscale() // set greyscale 
        //     .getBase64(Jimp.MIME_PNG, function (base64_str) {
        //         output = base64_str;
        //     });
        return output;
    });
}


init();