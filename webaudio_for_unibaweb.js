  (function(){
    var elmArray = [];
    jQuery.each($("*"), function() {
      var bounding = this.getBoundingClientRect();
      if ( parseInt(bounding.bottom) > 0 ) {
        var obj = {
          dom: this,
          val: bounding.bottom
        }
      elmArray.push(obj)
      }
    });

    var elm_vals = elmArray.map( function(elm){
      return elm.val
    })
    var max = parseInt(Math.max.apply(null, elm_vals) );
    console.log(max);  

    var sequence = new Array(max);

    jQuery.each(sequence, function(i) {
      var tags = []
      jQuery.each(elmArray, function() {
        if (this.val == i){
          tags.push(this.dom);
        }
      });
      sequence[i] = tags;
    });





  //-------------------------------------------------------------------//



  /*
  // オーディオ握る部分
  */
    var audioctx = new webkitAudioContext();

    function Play(freqVal) {
      var gain = audioctx.createGain();
      var osc = audioctx.createOscillator();
      osc.connect(gain);
      
      gain.connect(audioctx.destination);
      gain.gain.value = 0;
    
        
      

      osc.frequency.value = freqVal;
      osc.start(0);

      var releaseTime = 0.01

      var t0 = audioctx.currentTime;
      var t1 = t0 + parseFloat(releaseTime);
      var d = parseFloat("0.05");
      var s = parseFloat("0.0");
      gain.gain.setValueAtTime(0, t0);
      gain.gain.linearRampToValueAtTime(0.5, t1);
      gain.gain.setTargetAtTime(s, t1, d);

      /*
      // クリップおよびメモリリークさせないための苦肉の作
      // 仕様らしい 詳しくはwebで
      */
      setTimeout(function(){osc.stop(0);}, 200)
    }

  /*
  // スクロール開発する
  */
        
    function scrolling() {
      var max = 100000;
      var count = 1;

      return function (){
        if( count > max ){
          return;
        } else {
          scroll(0, count);

        }
        count += 1;
        return count;
      }
    }

    var scroll_func = scrolling()

    window.setInterval( function(){
      var count_val = scroll_func() + 15;

      var ret_vals = sequence[count_val]

      if (ret_vals.length > 0) {
        for (var i = 0; i < ret_vals.length; i ++) {
          //console.log(ret_vals[i].tagName)        
          Play(tagTofreq(ret_vals[i].tagName.toLowerCase()));
        }
          
      }

       



    }, 10);

    /*
    // データとアクセサリ群
    */

    var tags = {
      "a"    : { "note" : "c", "noteNum" : 60 },
      "p"    : { "note" : "d", "noteNum" : 62 },
      "span" : { "note" : "e", "noteNum" : 64 },
      "form" : { "note" : "f", "noteNum" : 65 },
      "img"  : { "note" : "g", "noteNum" : 67 },
      "h1"   : { "note" : "a", "noteNum" : 69 },
      "li"   : { "note" : "b", "noteNum" : 71 }
    }

    function key(noteNum, oct){
      if(typeof oct === 'undefined') oct = 1;
      return noteNum * oct;
    }

    function mtof(val) {
      return Math.floor(440*Math.pow(2, (val-69)/12));
    }


    function tagTofreq(tagname) {
      if (tagname in tags) {
        //console.log(tagname)
        var noteNum = tags[tagname].noteNum
        return mtof( key(noteNum) )
      } else {

      }
    }





  })()