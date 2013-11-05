(function() {

  $(".playing").on("click", function(){
    
    var elmArray = [];
    jQuery.each($("*"), function() {
      var bounding = this.getBoundingClientRect();
      if ( parseInt(bounding.top) > 0 ) {
        var obj = {
          dom: this,
          val: bounding.top
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



    var hitbar = $("#hitbar")






  //-------------------------------------------------------------------//



  /*
  // オーディオ握る部分
  */
    var audioctx = new webkitAudioContext();


    var buffer = {
      node1: null,
      node2: null,
      node3: null,
      node4: null
    }
    

    LoadSample(audioctx, "src/kick.wav", "node1");
    LoadSample(audioctx, "src/clap.wav", "node2");
    LoadSample(audioctx, "src/massive.wav", "node3");
    LoadSample(audioctx, "src/massive2.wav", "node4");

    function LoadSample(ctx, url, bufferName) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";
    req.onload = function() {
      if(req.response) {
        ctx.decodeAudioData(req.response, function(b) { buffer[bufferName] = b; },function() { });
      }
      else
        buffer[bufferName] = ctx.createBuffer(VBArray(req.responseBody).toArray(), false);
      }
      req.send();
    }

    function Play(bufferName) {
      var src = audioctx.createBufferSource();
      src.buffer = buffer[bufferName];
      src.connect(audioctx.destination);
      src.start(0);
    }

  /*
  // スクロール開発する
  */
        
    function scrolling() {
      
      var count = 1;

      return function (){
        if( count > max +42 ){
          count = 0;
        } else {
          scroll(0, count);
          hitbar.css("top", count);
        }
        count += 3;
        return count;
      }
    }

    function highLight(target) {
      var originColor = $(target).css("background-color");
      $(target).css("background-color", "green");
      
        $(target).animate({ "opacity": 0 }, 0, function(){
          console.log(this);
          $(this).animate({ "opacity":　1 }, 150);
        });
      
    }



    function countUp() {
      var count_val = scroll_func();
      var ret_vals = fetchSequenceVal(count_val);


      if (ret_vals.length > 0) {
        jQuery.each(ret_vals, function() {
          //console.log(ret_vals[i].tagName)
          //highLight(this);
          if (tagToBuf($(this).attr("class")) != false) {
            //console.log(this.tagName);
            highLight(this);
            Play( tagToBuf($(this).attr("class")) );
          }
        })
          
      }
    }


    /*
    // イージングで漏れたタグを検出するためのひどい実装メソッド
    */
    function fetchSequenceVal(index) {
      if (sequence[index].length > 0){
        return sequence[index]
      }
      var expect_index = index + 1
      if (sequence[expect_index].length > 0){
        return sequence[expect_index]
      }

      expect_index = expect_index + 1
      if (sequence[expect_index].length > 0){
        return sequence[expect_index]
      }

      // なにもなければもうそのまま返す
      return sequence[index]

    }

    var scroll_func = scrolling();





    /* 注意　グローバル変数*/
    clock = setInterval(countUp, 12);

    // $(window).mousedown(function() {
    //   clearInterval(clock);
    // });

    // $(window).mouseup(function() {
    //   clock = setInterval(countUp, 0.1);
    // });



    /*
    // データとアクセサリ群
    */

    var tags = {
      "kick"    : { "note" : "drum", "noteNum" : "node1" },
      "clap" : { "note" : "snare", "noteNum" : "node2" },
      "synth_1"  : { "note" : "g", "noteNum" : "node3" },
      "synth_2"   : { "note" : "a", "noteNum" : "node4" }
    }


    function tagToBuf(tagname) {
      if (tagname in tags) {
        //console.log(tags[tagname].noteNum)
        return tags[tagname].noteNum
      } else {
        return false
      }
    }






  });



})()
  