

/*
// オーディオ握る部分
*/
  var audioctx = new webkitAudioContext();

  var osc = audioctx.createOscillator();
  var gain = audioctx.createGain();

  gain.gain.value = 0;
  osc.connect(gain);
  gain.connect(audioctx.destination);


  function Play(freqVal) {
    osc.frequency.value = freqVal;
    osc.start(0);

    var t0 = audioctx.currentTime;
    var t1 = t0 + parseFloat("0.01");
    var d = parseFloat("0.05");
    var s = parseFloat("0.0");
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(1, t1);
    gain.gain.setTargetAtTime(s, t1, d);

  }





/*
// イベント握る部分(マウスオーバー用)
*/

  $("a").on("mouseover", function(){
    //console.log("a");
    Play(400);
  })

  $("ul").on("mouseover", function(){
    //console.log("div");
    Play(1200);
  })

  $("rect").on("mouseover", function(){
    
    var color = $(this).attr("style").substr(7,14);
    var intVal = parseInt(color, 16)
    Play(intVal * 0.0001);
  })



/*
// スクロール開発する
*/
      
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


  function tagTotype(tagname){
    if (tagname == "p"){
      return "sine";
    }
    if (tagname == "a"){
      return "square";
    }
    if (tagname == "rect"){
      return "sawtooth";
    }
    if (tagname == "span"){
      return "triangle";
    }
    if (tagname == "li"){
      return "sawtooth";
    }
    if (tagname == "div"){
      return "sine";
    }
  }



// });