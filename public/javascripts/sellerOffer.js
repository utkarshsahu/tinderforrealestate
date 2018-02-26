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
  console.log("CAme in function");
  var data = event.target.dataset;
  var idi = data.identifieri;
  var idj = data.identifierj;
  var bidid = data.bidid;
  var this_element = document.getElementById("make-offer-button-text"+idi+idj);
  if(this_element.innerHTML === 'Make Offer') {
    console.log("CAme in IF");
    var card= document.getElementById("off"+idi+idj);
    card.style.width = "100%";
  }
  else {
    //Pay the token, call api
    console.log("CAme in Else");
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
      alert("Amount Paid. Congrats deal closed.\nContact Seller: 9999999999")
      document.getElementById("butgroup"+id).innerHTML = 'Deal Closed!';
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
  var idi = data.identifieri;
  var idj = data.identifierj;
  var bidid = data.bidid;
  
  var cDialog = confirm("Abort Offer!?");
  if(cDialog) {
    var jsondata = JSON.stringify(
      {
        "status" : "ABORTED",
        "profile_type" : "Seller"
      }
    );
    updateApi(jsondata, bidid);
    document.getElementById("make-offer-button-text"+idi+idj).innerHTML = 'ABORTED';
    document.getElementById("abort"+idi+idj).style.visibility = "hidden";
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

    var idi = data.identifieri;
    var idj = data.identifierj;

    var card=document.getElementById("off"+idi+idj);

    var element=card.getElementsByClassName("confirmOffer");

    var elementToHide=card.getElementsByClassName("popup");

    elementToHide[0].classList.add("one");

    element[0].classList.remove("one");

  }

  function showAcceptmessage(event){

    var data=event.target.dataset;

    var idi=data.identifieri;
    var idj=data.identifierj;
    var bidid = data.bidid;
    

    var card=document.getElementById("off"+idi+idj);

    var elementToHide=card.getElementsByClassName("confirmOffer");

    elementToHide[0].classList.add("one");

    var jsondata = JSON.stringify({
      "status": "ACCEPTED",
      "profile_type" : "Seller"
    });

    updateApi(jsondata, bidid);
    
    document.getElementById("make-offer-button-text"+idi+idj).innerHTML = 'Awaiting Token';
    document.getElementById("off"+idi+idj).classList.add("one");

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

    var idi=data.identifieri;
    var idj=data.identifierj;

    var card=document.getElementById("off"+idi+idj);

    var element=card.getElementsByClassName("enterOffer");

    var elementToHide=card.getElementsByClassName("popup");

    elementToHide[0].classList.add("one");

    element[0].classList.remove("one");

  }

  function sendCounterOffer(event){

    var data=event.target.dataset;

    var idi=data.identifieri;
    var idj=data.identifierj;
    var bidid = data.bidid;
    var priceval = parseInt(document.getElementById("price"+idi+idj).value);
    var sdepval = parseInt(document.getElementById("sdep"+idi+idj).value);

    var card=document.getElementById("off"+idi+idj);

    var elementToHide=card.getElementsByClassName("enterOffer");

    elementToHide[0].classList.add("one");

    var jsondata = JSON.stringify(
      {
       "status":"COUNTERBID",
       "profile_type" : "Seller",
       "counter_bidder_amount" : priceval,
       "counter_bidder_security_amount" : sdepval
     }
    );
    updateApi(jsondata, bidid);
    /*API call */
    
    document.getElementById('make-offer-button-text'+idi+idj).innerHTML = 'Awaiting Offer';
    document.getElementById('make-offer-button-text'+idi+idj).removeAttribute('onclick');

    var elementToShow=card.getElementsByClassName("messageCounter");

    elementToShow[0].classList.remove("one");

    setTimeout(function(){

      elementToShow[0].classList.add("one");

      card.style.width = "0%";

      /* direct to next property */

    }, 1000);

  }