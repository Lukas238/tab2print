var vm = new Vue({
    el: '#wrapper',
    data: {
        source_tab: `
C                    Am                         
As I was goin' over the far famed Kerry mountains
    F                                C            Am     
I saw with Captain Farrell and his money he was countin # 17
    C                             Am                     
I first produced my pistol and then produced my rapier
        F                         C                 Am     
I said stand and deliver or the devil he may take ya

        G7               
Musha ring dum a do dum a dah
C            C7      
Whack for my daddy-o
F                    
Whack for my daddy-o
        C       G7     C   
There's whiskey in the jar-o
`,
        title: '',
        album: '',
        author: '',
        chords_visible: true
    },
    mounted: function(){
        this.$nextTick(function () {
        vm.hihglight_chordsInSingleLine();
        });
    },
    updated: function(){
        this.$nextTick(function () {
        vm.hihglight_chordsInSingleLine();
        });
    },
    computed: {
        print_title: function () {
            var titles_items = [this.author, this.album, this.title].filter(Boolean);
            document.title = titles_items.length ? titles_items.join(' - ') : 'Tab2Print';
        },
        verses: function () {

            if (!this.source_tab.trim().length) {
                return '';
            }

            var output = plainTab2tex.parse(clean_input(this.source_tab).split(/\r\n|\r|\n/g))
            output = ('<div class="line">'+ output.join('</div><div class="line">') + '</div>').split('<div class="line"></div>');
            console.log(output);
            return output;
        },
        chords: function () {
            return get_chords(this.source_tab);
        }
    },
    methods: {
        hihglight_chordsInSingleLine: function () {
            var css_class = '-inSingleLine';
            $('#verses .chord + .chord').delay(1000)
                .addClass(css_class)
                .prev()
                .addClass(css_class);
        }
    }
});


function get_chords(str) {
    var chords = [];
    str.split(/\n/).forEach(function (line, key) {
        chords = [...chords, ...extract_tabs(line)];
    });
    chords = [...new Set(chords)];
    chords = chords.filter(Boolean);

    // Split the chord in Root Chord note and Chord Type (ex.: Dm7 = [D, m7]), 
    chords = chords.map(function (chord) {
        var list = chord.split(/[-\/\|]+/); // This match dual chords like "D/A#" 

        return list.map(function (str) {
            var match = reg_chord.exec(str);
            // reg_chord.lastIndex = 0;
            // console.log(chord, match); 
            return [match[1], match[2]];
        });
    });

    chords = chords.flat();
    chords = chords.reduce((r, v) => (r[v] = v, r), {}); //Remove duplicated subarrays
    return chords;
}

/*
    Source: https://github.com/oliverpool/guitar-tabs_songtex.js/blob/master/guitar-tabs_songtex.js
 */
function extract_tabs(line) {
    var i,
        tab;

    if (line.match(reg)) {
        i = line.search(reguniq);
        tab = extract_tabs(line.substr(0, i - 1));
        tab[i] = line.substr(i).trim().toLowerCase();
        return tab;
    }
    return [];
}

function clean_input(str) {
    str = str.replace(/''/g, '"');
    str = str.replace('<br/>', '\n');
    str = str.replace('Source: www.ukulele-tabs.com', '');
    str = str.trim();

    return str;
}

plainTab2tex.insert_tabs_in_line = function (cur_line, cur_tabs) {
    var j = cur_tabs.length, // index amoung the cur_tabs
        l = cur_line.length;
    while (j > 0) {
        j -= 1;
        if (cur_tabs[j] !== undefined) {
            l = Math.min(j, l); //if the tabs are after the end of the text line, we insert them at the end
            cur_line = cur_line.substr(0, l) + "[" + cur_tabs[j] + "]" + cur_line.substr(l);
        }
    }
    return cur_line;
}