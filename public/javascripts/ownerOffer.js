function updateApi(data, bidid) {
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("PUT", "http://10.1.8.64:3000/api/update-bid/"+bidid);
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("cache-control", "no-cache");
//  xhr.setRequestHeader("postman-token", "cd5ca15a-fec9-caec-525b-fc1178015d89");
  xhr.send(data);
}

function showPopup(event){

  var data=event.target.dataset;

  var identifieri=data.identifieri;

  var identifierj=data.identifierj;

  var card=document.getElementById("off"+identifieri+identifierj);

  card.style.width = "100%";

  card.querySelector(".popup").classList.remove("one");

}

function showConfirmOffer(event){

  var data=event.target.dataset;

  var identifieri=data.identifieri;

  var identifierj=data.identifierj;

  var card=document.getElementById("off"+identifieri+identifierj);

  var element=card.getElementsByClassName("confirmOffer");

  var elementToHide=card.getElementsByClassName("popup");

  elementToHide[0].classList.add("one");

  element[0].classList.remove("one");

}



function showAcceptmessage(event){

  var data=event.target.dataset;

  var identifieri=data.identifieri;

  var identifierj=data.identifierj;
  
  var bidid=data.bidid;

  var card=document.getElementById("off"+identifieri+identifierj);

  var elementToHide=card.getElementsByClassName("confirmOffer");

  elementToHide[0].classList.add("one");

  var jsondata = JSON.stringify({
    "status": "ACCEPTED",
    "profile_type" : "Seller"
  });

  updateApi(jsondata, bidid);

  document.getElementById("make-offer-button-text"+identifieri+identifierj).innerHTML = 'Listing Claimed';
  document.getElementById("off"+identifieri+identifierj).classList.add("one");




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

  var identifieri=data.identifieri;

  var identifierj=data.identifierj;

  var card=document.getElementById("off"+identifieri+identifierj);

  var element=card.getElementsByClassName("enterOffer");

  var elementToHide=card.getElementsByClassName("popup");

  elementToHide[0].classList.add("one");

  element[0].classList.remove("one");

}



function sendCounterOffer(event){

  var data=event.target.dataset;

  var identifieri=data.identifieri;

  var identifierj=data.identifierj;
  
  var bidid=data.bidid;
  
  var priceval = parseInt(document.getElementById("price"+identifieri+identifierj).value);
  var sdepval = parseInt(document.getElementById("sdep"+identifieri+identifierj).value);
  var brokerageval = parseInt(document.getElementById("brokerage"+identifieri+identifierj).value);

  var card=document.getElementById("off"+identifieri+identifierj);

  var elementToHide=card.getElementsByClassName("enterOffer");

  elementToHide[0].classList.add("one");

  var jsondata = JSON.stringify(
    {
     "status":"COUNTERBID",
     "profile_type" : "Seller",
     "counter_bidder_amount" : priceval,
     "counter_bidder_security_amount" : sdepval,
     "brokerage": brokerageval
   }
  );
  updateApi(jsondata, bidid);
  
  


  var elementToShow=card.getElementsByClassName("messageCounter");

  elementToShow[0].classList.remove("one");



  setTimeout(function(){

    elementToShow[0].classList.add("one");

    card.style.width = "0%";

    /* direct to next property */







  }, 1000);

}