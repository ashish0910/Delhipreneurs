$(document).ready(function() {
  /*
   * Main variables
   */

  var images = [
    "../img/service1.jpg",
    "../img/service2.jpg",
    "../img/service3.jpg",
    "../img/service4.jpg"
  ]; 

  var content = [
    {
      title: "Finance",
      desc: "The Finance department covers a diverse set of topics and is taken by experienced members of Zenith with practical experience and knowledge of the same. The workshops provide the whole story on multiple concepts related to business and finance which we see in action around us and are often vital as well while the events are designed to be easy and inclusive while being fun and informative."
    },
    {
      title: "Technical",
      desc:
        "Since most of the innovations today are based on technology, the workshops of this department provide comprehensive knowledge of different kinds of software.  The events in this department are a test of knowledge and an opportunity to expand horizons. They do not necessarily demand a knowledge of coding every time and often are purely a trial of logic and analysis."
    },
    {
      title: "Entrepreneurship",
      desc:
        "Our Entrepreneurship workshops are aimed at inculcating the necessary skills in individuals to start their own businesses. Having been part of the process ourselves, we are always looking to encourage the growth of such organizations and these workshops are designed to provide the right guidance for going about the same."
    },
    {
      title: "Marketing",
      desc: "Marketing is one of those few fields which witness a deep amalgamation of online and offline platforms. Its importance cannot be stressed enough, and history is a testimony to the fact that good marketing has saved dying brands while bad marketing has killed soaring ones. From branding to pricing and from digital marketing to search engine optimization, we cover everything here."
    },
    {
      title: "Public Speaking",
      desc: "Public speaking is one of the few things whose importance is underestimated by many people and many more have a nagging fear of it in some kind or the other. Being well aware of the significance of good speaking skills, whether to crack an interview or impress a client, we provide a broad range of solutions to inculcate such skills and to develop confidence for the same"
    },
    {
      title: "Legal",
      desc: "All of these workshops provide a detailed insight into the mentioned areas along with an in-depth analysis of the laws in frameworks, rights, duties, precautions to be taken, steps to be observed and procedure to be followed so as to generate awareness and spread information about provisions that are often neglected. The events, on the other hand, are designed to push your analytical skills, test logic and scrutinize intellect."
    },
  ];
  var currentPage = 0;
  //generate content
  for (var i = 0; i < content.length; i++) {
    //split content letters to array
    for (var obj in content[i]) {
      //if string
      if (typeof content[i][obj] === "string") {
        content[i][obj] = content[i][obj].split("");
        continue;
      } else if (typeof content[i][obj] === "object") {
        //if array (grouped text)
        var toPush = [];
        for (var j = 0; j < content[i][obj].length; j++) {
          for (var k = 0; k < content[i][obj][j].length; k++) {
            toPush.push(content[i][obj][j][k]);
          }
        }
        content[i][obj] = toPush;
      }
    }
    //set text to
    $("#segments").append(
      '<div class="letters-wrap mutable"><div class="soup-title"></div><div class="soup-desc"></div></div>'
    );
    setText();
    //clone to data
    $("#segments").append(
      '<div class="letters-wrap position-data"><div class="soup-title"></div><div class="soup-desc"></div></div>'
    );
    setText();
  }

  //set image div
  $("#service-img").append(
    '<div id="service-image"></div>'
  );

  //initial arrangement
  arrangeCurrentPage();
  scrambleOthers();
  /*
   * Event handlers
   */
  $(window).resize(function() {
    arrangeCurrentPage();
    scrambleOthers();
  });
  $("#soup-prev").hide();
  $("#soup-prev").click(function() {
    $("#soup-next").show();
    currentPage--;
    if (currentPage === 0) {
      $("#soup-prev").hide();
    }
    arrangeCurrentPage();
    scrambleOthers();
  });
  $("#soup-next").click(function() {
    $("#soup-prev").show();
    currentPage++;
    if (currentPage === content.length - 1) {
      $("#soup-next").hide();
    }
    arrangeCurrentPage();
    scrambleOthers();
  });

  /* Images column*/

  $("#soup-prev").click(function(){
    $("#service-image").fadeOut(400,function(){
      $("#service-image").css({'background':'url('+images[currentPage]+') center top no-repeat', 'background-size':'cover'});
    }).fadeIn(400);
  });

  $("#soup-next").click(400,function(){
    $("#service-image").fadeOut(function(){
      $("#service-image").css({'background':'url('+images[currentPage]+') center top no-repeat', 'background-size':'cover'});
    }).fadeIn(400);
  });

  // $("#soup-prev").click(function(){
  //   $("#service-image").css({'background':'url('+images[currentPage]+') center top no-repeat', 'background-size':'cover'});
  // });

  // $("#soup-next").click(function(){
  //   $("#service-image").css({'background':'url('+images[currentPage]+') center top no-repeat', 'background-size':'cover'});
  // });

  /* */

  /*
   * Functions
   */
  function arrangeCurrentPage() {
    for (var i = 0; i < content[currentPage].title.length; i++) {
      $(".mutable:eq(" + currentPage + ") > .soup-title > .letter")
        .eq(i)
        .css({
          left:
            $(".position-data:eq(" + currentPage + ") > .soup-title > .letter")
              .eq(i)
              .offset().left + "px",
          top:
            $(".position-data:eq(" + currentPage + ") > .soup-title > .letter")
              .eq(i)
              .offset().top + "px",
          color: "#111",
          zIndex: 9001
        });
    }
    for (var i = 0; i < content[currentPage].desc.length; i++) {
      $(".mutable:eq(" + currentPage + ") > .soup-desc > .letter")
        .eq(i)
        .css({
          left:
            $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter")
              .eq(i)
              .offset().left + "px",
          top:
            $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter")
              .eq(i)
              .offset().top + "px",
          color: "#111",
          zIndex: 9001
        });
    }
  }

  function setText() {
    var j;
    for (j = 0; j < content[i].title.length; j++) {
      $(".soup-title")
        .last()
        .append('<span class="letter">' + content[i].title[j] + "</span>");
    }
    for (j = 0; j < content[i].desc.length; j++) {
      $(".soup-desc")
        .last()
        .append('<span class="letter">' + content[i].desc[j] + "</span>");
    }
  }

  function scrambleOthers() {
    for (var i = 0; i < content.length; i++) {
      //don't scramble currentPage
      if (currentPage === i) continue;
      var parts = [["title", ".soup-title"], ["desc", ".soup-desc"]];
      //apply to .title h1s and .desc ps
      for (var j = 0; j < parts.length; j++) {
        for (var k = 0; k < content[i][parts[j][0]].length; k++) {
          //define random position on screen
          var randLeft = Math.floor(Math.random() * $(window).width());
          var randTop = Math.floor(Math.random() * $(window).height());
          //defining boundaries
          var offset = $(".position-data")
            .eq(currentPage)
            .offset();
          var bounds = {
            left: offset.left,
            top: offset.top,
            right: $(window).width() - offset.left,
            bottom: $(window).height() - offset.top
          };
          var middleX =
            bounds.left +
            $(".position-data")
              .eq(currentPage)
              .width() /
              2;
          var middleY =
            bounds.top +
            $(".position-data")
              .eq(currentPage)
              .height() /
              2;
          //finally, apply all the scrambles
          $(".mutable:eq(" + i + ") > " + parts[j][1] + " > .letter")
            .eq(k)
            .css({
              left: randLeft,
              top: randTop,
              color: "#F9F7F6",//
              zIndex: "initial"
            });
        }
      }
    }
  }
});
