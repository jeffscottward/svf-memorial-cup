$(document).ready(function() {

  $cache = {};
  $cache.triggers = {
    photoBG: $('#photoBG'),
    bracketContainer: $('#bracket')
  };

  if($cache.triggers.photoBG.length > 0){
    var bean = new Bean({
      imageUrls: [
        'img/8128_645461083814_508964_n.jpg',
        'img/24474_1243095561422_2426049_n.jpg',
        'img/31425_435337745738_1721678_n.jpg',
        'img/33889_439728283924_2472719_n.jpg',
        'img/306198_10101077801987979_1134062638_n.jpg',
        'img/535596_10101077919297889_62444509_n.jpg'
      ],
      canvasId : $cache.triggers.photoBG.attr('id'),
      fillBody : true
    });

    // bean.onReady(function(bean) {
    //   setTimeout(function() {bean.start();}, 1000);
    // });

  }

  if($cache.triggers.bracketContainer.length > 0){
    var bigData = {
      teams : [
        ["Team 1",  "Team 2" ],
        ["Team 3",  "Team 4" ],
        ["Team 5",  "Team 6" ],
        ["Team 7",  "Team 8" ],
        ["Team 9",  "Team 10"],
        ["Team 11", "Team 12"],
        ["Team 13", "Team 14"],
        ["Team 15", "Team 16"]
      ],
      results : [[ /* WINNER BRACKET */
        [[3,5], [2,4], [6,3], [2,3], [1,5], [5,3], [7,2], [1,2]],
        [[1,2], [3,4], [5,6], [7,8]],
        [[9,1], [8,2]],
        [[1,3]]
      ]]
    }

    // TODO: Save functionality
    // function saveFn(data, userData) {
    //   var json = jQuery.toJSON(data)
    //   $('#saveOutput').text('POST '+userData+' '+json)
    //   /* You probably want to do something like this
    //   jQuery.ajax("rest/"+userData, {contentType: 'application/json',
    //                                 dataType: 'json',
    //                                 type: 'post',
    //                                 data: json})
    //   */
    // }
    // $(function() {
    //     var container = $('div#save .demo')
    //     container.bracket({
    //       init: saveData,
    //       save: saveFn,
    //       userData: "http://myapi"})
    //
    //     /* You can also inquiry the current data */
    //     var data = container.bracket('data')
    //     $('#dataOutput').text(jQuery.toJSON(data))
    // });

    $(function() { $cache.triggers.bracketContainer.bracket({init: bigData}) })

  }

});
