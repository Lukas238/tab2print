  var vm = new Vue({
      el: '#wrapper',
      data: {
          editor_html: '',
          editor_data: '',
          tab: {
              title: '',
              author: '',
              chords: {
                  diagrams: [],
                  photos: []
              },
              verses: [],
              verses_text: ''
          }
      },
      methods: {
          parse_rawHTML: function () {
              var result = parse_rawData(this.editor_html);
              this.tab = result;
              this.tab.verses_text =  result.verses;
          },
          parse_data: function () {
            this.tab.verses = this.tab.verses_text.replace('<br/>', '\n').split('\n\n');
          }
      },
      watch: {
        tab: function(){
            document.title = this.tab.title + (this.tab.author ? '_'+this.tab.author : '');
        }

      }
  });


  function parse_rawData(html) {
      var data = {
          title: '',
          author: '',
          chords: {
              diagrams: [],
              photos: []
          },
          verses: []
      };

      html = $("<div/>").html(html);

      [data.title, data.author] = $(html).find('#page_title span').map((key, value) => $(value).text()).get();
      console.log(data);

      data.chords.diagrams = $(html).find('#sticky_crd img').map((key, value) => 'https://www.ukulele-tabs.com/' + $(value).attr('src').replace('../', '')).get();

      console.log(data.chords.diagrams);
      data.chords.photos = $(html).find('#sticky_crd a').map((key, value) => 'https://www.ukulele-tabs.com' + $(value).attr('href')).get();


      var raw_textlines = $('<div/>').html($(html).find('pre').html().replace(/<br>/mg, "\n")).text().trim();
      raw_textlines = raw_textlines.split(/\r\n|\r|\n/g);

      data.verses = raw_textlines
          .join('<br/>')
          .replace(/\\\[([^\]]+)\]/gm, '</span><span class="chord"><span>$1</span></span><span>')
          .replace(/(<br\/?>){2,}/gm, '\n\n')
          .split(/\n\n/);

      data.verses = data.verses.map(function (val) {
          var re = /<span><\/span>|<span>$|^<\/span>/gm;
          return val.replace(re, '');
      });


      return data;
  }