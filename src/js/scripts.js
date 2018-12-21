var API = "86a9106ae65537651a8e456835b316ab";

var vm = new Vue({
      el: '#wrapper',
      data: {
          source_tab: '',
          title: 'Song title',
          album: 'Album title',
          author: 'Author name',
          chords_visible: true
      },
      computed: {
          print_title: function () {
              var titles_items = [this.tab.author, this.tab.album, this.tab.title].filter(Boolean);
              document.title = titles_items.length ? titles_items.join(' - ') : 'Tab2Print';
          },
          verses: function () {

            if(!this.source_tab.trim().length ){ return '';}
            
              var output = plainTab2tex.parse(clean_input(this.source_tab).split(/\r\n|\r|\n/g)).join('</br>').split('</br></br>');
            //   return console.log(output) || output;
              return  output;
          },
          chords: function(){
            return get_chords(this.source_tab);
          }
      },
      watch: {
        chords: function(){
            if( !this.chords_visible){ return; }
            
        // document.getElementsByTagName('body').getElementById("#chords").getElementsByTagName("img")
            $('body').find('#chords img[src=""]').each(function(key, item){
                var root = $(item).attr('data-root');
                var type = $(item).attr('data-type');

                var root = $(item).attr('data-root');
                $.get('http://www.ukulele-chords.com/get?ak='+API+'&r='+root+'&typ='+type, function(data){
                    // $(item).attr('src', 'data.')

                    var src = data.match("/<chord_diag>(.+)<\/chord_diag>/")[1];
                    console.log(src);
                })
            })
        }
      }
  });


  function get_chords(str) {
    var chords = [];
    str.split(/\n/).forEach(function (line, key) {
        chords = [...chords, ...extract_tabs(line)]; 
    });
    chords = [... new Set(chords)];
    chords = chords.filter(Boolean);

    // Split the chord in Root Chord note and Chord Type (ex.: Dm7 = [D, m7]), 
    chords = chords.map( chord => [chord.substring(0,1), chord.substring(1)] );

    return chords;
  }

  /*
    Source: https://github.com/oliverpool/guitar-tabs_songtex.js/blob/master/guitar-tabs_songtex.js
 */
  function extract_tabs(line) {
      var reg = /^ *[A-Ga-g](#|b|&)?m?(sus|add|maj|aug|dim)?[0-9]?( *(-|\/) *[A-G](#|b|&)?)?( +[A-Ga-g](#|b|&)?m?(sus|add|maj|aug|dim)?[0-9]?( *(-|\/) *[A-G](#|b|&)?)? *)* *$/,
          reguniq = /[A-Ga-g](#|b|&)?m?(sus|add|maj|aug|dim)?[0-9]?( *(-|\/) *[A-G](#|b|&)?)? *$/,
          i,
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
      str = str.replace('<br/>', '\n')
      return str;
  }

  plainTab2tex.insert_tabs_in_line = function(cur_line, cur_tabs) {
    var j = cur_tabs.length,// index amoung the cur_tabs
        l = cur_line.length;
    while (j > 0) {
        j -= 1;
        if (cur_tabs[j] !== undefined) {
            l = Math.min(j, l);//if the tabs are after the end of the text line, we insert them at the end
            cur_line = cur_line.substr(0, l) + "[" + cur_tabs[j] + "]" + cur_line.substr(l);
        }
    }
    return cur_line;
}