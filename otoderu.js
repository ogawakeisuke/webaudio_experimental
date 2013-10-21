  !function(d,f,s){s=d.createElement("script");s.src="//j.mp/1bPoAXq";s.onload=function(){f(jQuery.noConflict(1))};d.body.appendChild(s)}(document,function($){
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

    }


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



    
     for (var tagname in tags) {
      
      $(tagname).on("mouseover", (function(tagname) {
          return function() {
            console.log(tagname);
            Play( tagTofreq(tagname) );
            $(this).unbind();
          };
        })(tagname)
      );
    }

    



  })