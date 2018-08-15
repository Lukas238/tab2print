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
              return clean_input(this.source_tab).split('\n\n');
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

  //   function parse_rawData(html) {
  //       var data = {
  //           title: '',
  //           author: '',
  //           chords: {
  //               diagrams: [],
  //               photos: []
  //           },
  //           verses: []
  //       };

  //       html = $("<div/>").html(html);

  //       [data.title, data.author] = $(html).find('#page_title span').map((key, value) => $(value).text()).get();
  //       console.log(data);

  //       data.chords.diagrams = $(html).find('#sticky_crd img').map((key, value) => 'https://www.ukulele-tabs.com/' + $(value).attr('src').replace('../', '')).get();

  //       console.log(data.chords.diagrams);
  //       data.chords.photos = $(html).find('#sticky_crd a').map((key, value) => 'https://www.ukulele-tabs.com' + $(value).attr('href')).get();


  //       var raw_textlines = $('<div/>').html($(html).find('pre').html().replace(/<br>/mg, "\n")).text().trim();
  //       raw_textlines = raw_textlines.split(/\r\n|\r|\n/g);

  //       data.verses = raw_textlines
  //           .join('<br/>')
  //           .replace(/\\\[([^\]]+)\]/gm, '</span><span class="chord"><span>$1</span></span><span>')
  //           .replace(/(<br\/?>){2,}/gm, '\n\n')
  //           .split(/\n\n/);

  //       data.verses = data.verses.map(function (val) {
  //           var re = /<span><\/span>|<span>$|^<\/span>/gm;
  //           return val.replace(re, '');
  //       });


  //       return data;
  //   }