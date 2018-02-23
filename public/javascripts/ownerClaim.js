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
  var id=data.cardno;
  var card=document.getElementById("pop"+id);
  var popup=card.getElementsByClassName("popup");
  popup[0].classList.remove("one");
  card.style.width = "100%";
}
function showConfirmOffer(event){
  var data=event.target.dataset;
  var id=data.cardno;
  var card=document.getElementById("pop"+id);
  var element=card.getElementsByClassName("confirmOffer");
  var elementToHide=card.getElementsByClassName("popup");
  elementToHide[0].classList.add("one");
  element[0].classList.remove("one");
}

function showAcceptmessage(event){
  var data=event.target.dataset;
  var id=data.cardno;
  var card=document.getElementById("pop"+id);
  var bidid = data.bidid;
  var elementToHide=card.getElementsByClassName("confirmOffer");
  elementToHide[0].classList.add("one");

  /* API call */
  var jsondata = JSON.stringify({
    "status": "ACCEPTED",
    "profile_type" : "Buyer"
  });
  updateApi(jsondata, bidid);
  document.getElementById("make"+id).innerHTML = 'Listing Claimed';
  document.getElementById("make"+id).removeAttribute('onclick');
  document.getElementById("pop"+id).classList.add("one");

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
  var id=data.cardno;
  var card=document.getElementById("pop"+id);
  var element=card.getElementsByClassName("enterOffer");
  var elementToHide=card.getElementsByClassName("popup");
  elementToHide[0].classList.add("one");
  element[0].classList.remove("one");
}

function sendCounterOffer(event){
  var data=event.target.dataset;
  var id=data.cardno;
  var bidid = data.bidid;
  var card=document.getElementById("pop"+id);
  var elementToHide=card.getElementsByClassName("enterOffer");
  var priceval = parseInt(document.getElementById("price"+id).value);
  var sdepval = parseInt(document.getElementById("sdep"+id).value);
  var brokerageval = parseInt(document.getElementById("brokerage"+id).value);
  elementToHide[0].classList.add("one");
  /*API call */
  
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
  
  document.getElementById("make"+id).innerHTML = 'Waiting For Offer';
  document.getElementById("make"+id).removeAttribute('onclick');
  document.getElementById("pop"+id).classList.add("one");

  var elementToShow=card.getElementsByClassName("messageCounter");
  elementToShow[0].classList.remove("one");

  setTimeout(function(){
    elementToShow[0].classList.add("one");
    card.style.width = "0%";
    /* direct to next property */



   }, 1000);
}

function abort(event){
  var data=event.target.dataset;
  var id=data.cardno;
  var card=document.getElementById("card"+id);
  card.querySelector(".button1").removeAttribute("onclick");
  card.querySelector(".button1").classList.add("rejected_offer");
  card.querySelector(".button").removeAttribute("onclick");
  card.querySelector(".button").classList.add("rejected_offer");    
}
