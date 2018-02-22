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
  xhr.setRequestHeader("postman-token", "cd5ca15a-fec9-caec-525b-fc1178015d89");
  xhr.send(data);
}

function makeOffer(event) {
  var data = event.target.dataset;
  var id = data.identifier;
  var bidid = data.bidid;
  var this_element = document.getElementById("make-offer-button-text"+id);
  if(this_element.innerHTML === 'Make Offer') {
    var card= document.getElementById("off"+id);
    card.classList.remove("one");
  }
  else {
    //Pay the token, call api
    
    var jsondata = {
      "status" : "COMPLETED",
      "profile_type" : "Buyer"
    };
    
    updateApi(jsondata, bidid);
    // Include a check for an expired offer!!!
    alert("Amount Paid. Congrats deal closed.\nContact Seller: 9999999999")
    document.getElementById("butgroup"+id).innerHTML = 'Deal Closed!';
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