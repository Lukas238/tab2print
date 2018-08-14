  var vm = new Vue({
      el: '#wrapper',
      data: {
          source_tab: '',
          title: 'Song title',
          album: 'Album title',
          author: 'Author name',
          chords: []
      },
      computed: {
        print_title: function () {
            var titles_items = [this.tab.author, this.tab.album, this.tab.title].filter(Boolean);
            document.title = titles_items.length ? titles_items.join(' - ') : 'Tab2Print';
        },
        verses: function () {
            this.chords = get_chords(this.source_tab);
            return clean_input(this.source_tab).split('\n\n');
        }
      }
  });


    function get_chords(str){
        
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