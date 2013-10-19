!function(d,f,s){s=d.createElement("script");s.src="//j.mp/1bPoAXq";s.onload=function(){f(jQuery.noConflict(1))};d.body.appendChild(s)}(document,function($){
  var audioctx = new webkitAudioContext();
  var osc = audioctx.createOscillator();    
  var gain = audioctx.createGain();

  function Play(freqVal, typeVal) {
    

    
    gain.gain.value = 0;
    osc.connect(gain);
    gain.connect(audioctx.destination);
    osc.frequency.value = freqVal;
    osc.type = typeVal;
    osc.start(0);

    var t0 = audioctx.currentTime;
    var t1 = t0 + parseFloat("0.01");
    var d = parseFloat("0.02");
    var s = parseFloat("0.0");
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(0.98, t1);
    gain.gain.setTargetAtTime(s, t1, d);

  }

      
  function scrolling() {
    var max = 100000;
    var count = 1;

    return function (){
      if( count > max ){
        return;
      } else {
        scroll(0, count);

      }
      count ++;
      return count;
    }
  }

  var scroll_func = scrolling()

  window.setInterval( function(){
    var count_val = scroll_func();

    var allTags = $("*:not(head, meta, title, link, script, body)" );  
    for (var i = 1 ; i <= allTags.length -1  ; i++){
      var off = allTags[i].offsetTop;
      if (off - count_val == 0){
        tagname = allTags[i].tagName.toLowerCase();
        console.log(tagname)
        Play(tagTofreq(tagname), "square");
        
      }

    }


  }, 10);

  var key = {
    "c1" : 60,
    "d1" : 62,
    "e1" : 64,
    "f1" : 65,
    "g1" : 67,
    "a1" : 69,
    "b1" : 71,
    "c2" : 60 + 12,
    "d2" : 62 + 12,
    "e2" : 64 + 12,
    "f2" : 65 + 12,
    "g2" : 67 + 12,
    "a2" : 69 + 12,
    "b2" : 71 + 12
  }

  function mtof(val) {
    return Math.floor(440*Math.pow(2, (val-69)/12));
  }


  function tagTofreq(tagname){
    if (tagname == "p"){
      return mtof(key.b2);
    }
    if (tagname == "a"){
      return mtof(key.e2);
    }
    if (tagname == "rect"){
      return mtof(key.f1);
    }
    if (tagname == "span"){
      return mtof(key.g2);
    }
    if (tagname == "li"){
      return mtof(key.a1);
    }
    if (tagname == "div"){
      return mtof(key.c1);
    }
  }



})