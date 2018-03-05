// var request = require('request');
var rp = require('request-promise');
var cheerio = require('cheerio');
var fs = require('fs');
var handlebars = require('handlebars');
eval(fs.readFileSync('./node_modules/guitar-tabs_songtex.js/guitar-tabs_songtex.js')+'');


// var url = 'http://localhost/ukulele-tabs-2-print/source.html';
var url = 'https://www.ukulele-tabs.com/uke-songs/mumford-and-sons/the-cave-uke-tab-17047.html';
// var url = 'https://www.ukulele-tabs.com/uke-songs/thin-lizzy/whiskey-in-the-jar-uke-tab-12187.html';
// var url = 'https://www.ukulele-tabs.com/es/tablaturas/folk-songs/you-are-my-sunshine-uke-tab-15237.html';
// var url = 'https://www.ukulele-tabs.com/uke-songs/mumford-and-sons/the-cave-super-easy-uke-tab-23983.html';



function init() {
    rp(url)
        .then(function (raw_html) {
            save_output(render_template(parse_data(raw_html)));
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
        tab: ''
    };
    var $ = cheerio.load(html);

    [data.title, data.author] = $('#page_title span').map((key, value) => $(value).text()).get();

    data.chords.diagrams = $('#sticky_crd img').map((key, value) => 'https://www.ukulele-tabs.com/uke-songs/' + $(value).attr('src')).get();
    data.chords.photos = $('#sticky_crd a').map((key, value) => 'https://www.ukulele-tabs.com' + $(value).attr('href')).get();

    //Remove faux title
    // $('pre').contents().each(function (key, item) {
    //     if (item.name == "a") {
    //         return false;
    //     }
    //     $(item).remove();
    // });

    var raw_textlines = $('<div/>').html($('pre').html().replace(/<br>/mg,"\n")).text().split(/\r\n|\r|\n/g);
    data.tab = plainTab2tex.parse(raw_textlines).join('<br/>').replace(/\\\[([^\]]+)\]/mg, '<span class="chord"><span>$1</span></span>');

    return data;
}

function render_template(data) {

    var source = fs.readFileSync('./tab_page.hbs', 'utf-8');
    var template = handlebars.compile(source);
    return template(data);
}


init();