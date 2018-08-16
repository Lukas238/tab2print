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
            //   return clean_input(this.source_tab).split('\n\n');
            var output = plainTab2tex.parse(this.source_tab.split(/\r\n|\r|\n/g)).join('</br>').split('</br></br>');
              return console.log(output) || output;
          },
          chords: function(){
            return get_chords(this.source_tab);
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
    return chords;
  }

  /*
    Source: https://github.com/oliverpool/guitar-tabs_songtex.js/blob/master/guitar-tabs_songtex.js
 */
  function extract_tabs(line) {
      var reg = /^ *[A-Ga-g](#|b|&)?m?(sus|add|maj|aug|dim)?[0-9]?( *(-|\/) *[A-G](#|b)?)?( +[A-Ga-g](#|b|&)?m?(sus|add|maj|aug|dim)?[0-9]?( *(-|\/) *[A-G](#|b|&)?)? *)* *$/,
          reguniq = /[A-Ga-g](#|b|&)?m?(sus|add|maj|aug|dim)?[0-9]?( *(-|\/) *[A-G](#|b|&)?)? *$/,
          i,
          tab;

      if (line.match(reg)) {
          i = line.search(reguniq);
          tab = extract_tabs(line.substr(0, i - 1));
          tab[i] = line.substr(i).trim().replace('b', '&').toLowerCase();
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