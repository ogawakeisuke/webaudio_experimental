

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

    var t0 = audioctx.currentTime;
    var t1 = t0 + parseFloat("0.01");
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
  // データとアクセサリ群
  */

  var tags = {
    "div"  : { "note" : "c", "noteNum" : 60 },
    "p"    : { "note" : "d", "noteNum" : 62 },
    "span" : { "note" : "e", "noteNum" : 64 },
    "form" : { "note" : "f", "noteNum" : 65 },
    "img"  : { "note" : "g", "noteNum" : 67 },
    "a"    : { "note" : "a", "noteNum" : 69 },
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


/*
// イベント握る部分(マウスオーバー用)
*/

  // $("rect").on("mouseover", function(){    
  //   var color = $(this).attr("style").substr(7,14);
  //   var intVal = parseInt(color, 16)
  //   Play(intVal * 0.0001);
  // })
  
  function highLight(event) {
    console.log(event.target)
    var target = event.target;
    
    var originColor = $(target).css("background-color");
    $(target).css("background-color", "lightpink");  
    setTimeout(function(){$(target).css("background-color", originColor);}, 20)
  }

  
   for (var tagname in tags) {
    
    $(tagname).on("mouseover", (function(tagname) {
      
      return function(e) {
        Play( tagTofreq(tagname) );
        //highLight(e);
      };
      })(tagname)
    );
  }

  
