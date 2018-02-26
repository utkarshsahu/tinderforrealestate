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

function makeOffer(event) {
  console.log("Came in function");
  var data = event.target.dataset;
  var id = data.identifier;
  var bidid = data.bidid;
  var this_element = document.getElementById("make-offer-button-text"+id);
  if(this_element.innerHTML === 'Make Offer') {
    console.log("Came in IF");
    var card= document.getElementById("off"+id);
    var popup=card.getElementsByClassName("popup");
    popup[0].classList.remove("one");
    card.style.width = "100%";
  }
  else {
    //Pay the token, call api
    console.log("Came in Else");
    var jsondata = JSON.stringify({
      "status" : "COMPLETED",
      "profile_type" : "Buyer",
      "token_amount" : 500
    });
    console.log(jsondata);
    var cDialog = confirm("Pay token?");
    if(cDialog) {
      updateApi(jsondata, bidid);
      // Include a check for an expired offer!!!
      alert("Amount Paid. Congrats deal closed.\n")
      location.reload();
    }
  }
  
}

function acceptOffer(event) {
  var data = event.target.dataset;
  var id = data.identifier;
  var bidid = data.bidid;
  
  var cDialog = confirm("Confirm Offer");
  
  if(cDialog) {
  
    var jsondata = JSON.stringify({
      "status": "ACCEPTED",
      "profile_type" : "Buyer"
    });

    updateApi(jsondata, bidid);
    
    document.getElementById("make-offer-button-text"+id).innerHTML = 'Pay Token';
    document.getElementById("off"+id).classList.add("one");
  }
}

function counterOffer(event) {
  var data = event.target.dataset;
  var id = data.identifier;
  var bidid = data.bidid;
  
  
}

function abortOffer(event) {
  var data = event.target.dataset;
  var id = data.identifier;
  var bidid = data.bidid;
  
  var cDialog = confirm("Abort Offer!?");
  if(cDialog) {
    var jsondata = JSON.stringify(
      {
        "status" : "ABORTED",
        "profile_type" : "Buyer"
      }
    );
    updateApi(jsondata, bidid);
    
    document.getElementById("card"+id).classList.add("one");
  }
}


function showPopup(event){

    var data=event.target.dataset;

    var id=data.identifier;

    var card=document.getElementById("pop"+id);

    card.style.width = "100%";

  }

  function showConfirmOffer(event){

    var data=event.target.dataset;

    var id=data.identifier;

    var card=document.getElementById("off"+id);

    var element=card.getElementsByClassName("confirmOffer");

    var elementToHide=card.getElementsByClassName("popup");

    elementToHide[0].classList.add("one");

    element[0].classList.remove("one");

  }

  function showAcceptmessage(event){

    var data=event.target.dataset;

    var id=data.identifier;
    var bidid = data.bidid;

    var card=document.getElementById("off"+id);

    var elementToHide=card.getElementsByClassName("confirmOffer");

    elementToHide[0].classList.add("one");

    var jsondata = JSON.stringify({
      "status": "ACCEPTED",
      "profile_type" : "Buyer"
    });

    updateApi(jsondata, bidid);
    
    document.getElementById("make-offer-button-text"+id).innerHTML = 'Pay Token';
    document.getElementById("off"+id).classList.add("one");

    var elementToShow=card.getElementsByClassName("messageAccept");

    elementToShow[0].classList.remove("one");

    setTimeout(function(){

      elementToShow[0].classList.add("one");

      card.style.width = "0%";

      /* direct to next property */

     }, 5000);

  }

  function showEnterOffer(event){

    var data=event.target.dataset;

    var id=data.identifier;

    var card=document.getElementById("off"+id);

    var element=card.getElementsByClassName("enterOffer");

    var elementToHide=card.getElementsByClassName("popup");

    elementToHide[0].classList.add("one");

    element[0].classList.remove("one");

  }

  function sendCounterOffer(event){

    var data=event.target.dataset;

    var id=data.identifier;
    var bidid = data.bidid;
    var priceval = parseInt(document.getElementById("price"+id).value);
    var sdepval = parseInt(document.getElementById("sdep"+id).value);

    var card=document.getElementById("off"+id);

    var elementToHide=card.getElementsByClassName("enterOffer");

    elementToHide[0].classList.add("one");

    var jsondata = JSON.stringify(
      {
       "status":"COUNTERBID",
       "profile_type" : "Buyer",
       "bidder_amount" : priceval,
       "bidder_security_amount" :sdepval
     }
    );
    updateApi(jsondata, bidid);
    /*API call */

    var elementToShow=card.getElementsByClassName("messageCounter");

    elementToShow[0].classList.remove("one");

    setTimeout(function(){

      elementToShow[0].classList.add("one");

      card.style.width = "0%";

      /* direct to next property */

     }, 5000);

  }