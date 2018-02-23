function showPopup(event){

  var data=event.target.dataset;

  var cardno=data.cardno;

  var offerno=data.offerno;

  var card=document.getElementById("card"+cardno+"pop"+offerno);

  card.style.width = "100%";

  card.querySelector(".popup").classList.remove("one");

}

function showConfirmOffer(event){

  var data=event.target.dataset;

  var cardno=data.cardno;

  var offerno=data.offerno;

  var card=document.getElementById("card"+cardno+"pop"+offerno);

  var element=card.getElementsByClassName("confirmOffer");

  var elementToHide=card.getElementsByClassName("popup");

  elementToHide[0].classList.add("one");

  element[0].classList.remove("one");

}



function showAcceptmessage(event){

  var data=event.target.dataset;

  var cardno=data.cardno;

  var offerno=data.offerno;

  var card=document.getElementById("card"+cardno+"pop"+offerno);

  var elementToHide=card.getElementsByClassName("confirmOffer");

  elementToHide[0].classList.add("one");



  /* API call */





  var elementToShow=card.getElementsByClassName("messageAccept");

  elementToShow[0].classList.remove("one");

  setTimeout(function(){

    elementToShow[0].classList.add("one");

    card.style.width = "0%";

    /* direct to next property */









  }, 1000);

}



function showEnterOffer(event){

  var data=event.target.dataset;

  var cardno=data.cardno;

  var offerno=data.offerno;

  var card=document.getElementById("card"+cardno+"pop"+offerno);

  var element=card.getElementsByClassName("enterOffer");

  var elementToHide=card.getElementsByClassName("popup");

  elementToHide[0].classList.add("one");

  element[0].classList.remove("one");

}



function sendCounterOffer(event){

  var data=event.target.dataset;

  var cardno=data.cardno;

  var offerno=data.offerno;

  var card=document.getElementById("card"+cardno+"pop"+offerno);

  var elementToHide=card.getElementsByClassName("enterOffer");

  elementToHide[0].classList.add("one");

  /*API call */



  var elementToShow=card.getElementsByClassName("messageCounter");

  elementToShow[0].classList.remove("one");



  setTimeout(function(){

    elementToShow[0].classList.add("one");

    card.style.width = "0%";

    /* direct to next property */







  }, 1000);

}