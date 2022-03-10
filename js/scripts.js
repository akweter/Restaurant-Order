
//Trigger modal head to the body form.....
$('.modal-title').click(function(){show, '.modal-body'});

function reserve(){
var s=("0540544760");
document.getElementById("reserve").innerHTML=document.write("Reservation underway, but for the mean time fee free to call our delivery personnel on" + " " + s);
}

//SET THE BTN ON THE CAROUSEL TO PAUSE THE CAROUSEL....
    $('£carouselButton').on( "click", function() {
        
    if ($('#mycaouselButton').children('span').hasClass('fa-pause')) {
        $('mycarousel').pause();
        $('#carouselButton').children('span').removeClass('fa-pause');
        $('#carouselButton').children('span').addClass('fa-play');
    }
    else if ($('#mycaouselButton').children('span').hasClass('fa-play')) {
        $('mycarousel').cysle();
        $('#carouselButton').children('span').removeClass('fa-play');
        $('#carouselButton').children('span').addClass('fa-play');
    }
    });

/*
    function myFulltime() {
        var m = new Date();  
    document.getElementById("Full").innerHTML = m;
    }
    

    function clock() {
        var clockDiv = document.querySelector("#clock");
        return setInterval(() => {
          let date = new Date();
          let tick = date.toLocaleTimeString();
          clockDiv.textContent = tick;
        }, 1000);
      }
      */

      function startTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        document.getElementById('txt').innerHTML =  h + ":" + m + ":" + s;
        setTimeout(startTime, 1000);
      
      }
      function checkTime(i) {
        if (i < 10) {i = "0" + i}  // add zero in front of numbers < 10
        return i;
      }