let count=0;

minUpdate = () => {

    document.getElementById("minPrice").innerHTML = "₹Rs." +  document.getElementById("minValue").value + " - ";

}



maxUpdate = () => {

    document.getElementById("maxPrice").innerHTML = "₹Rs." +  document.getElementById("maxValue").value;

}



city1clicked = () => {

    if(count == 1) {

        document.getElementById("city2").style.display = "inline";

    }

    count++;

    document.getElementById("locationSearchBox").style.display = "block";

    if(document.getElementById("city1").innerHTML == "Add Locality +") {

        document.getElementById("city1").innerHTML = document.getElementById("selectedCity").value;

        

    }

    else {

        document.getElementById("city1").innerHTML = "Add Locality +";

    }

    

}



city2clicked = () => {

    //document.getElementById("locationSearchBox").style.display = "block";

    if(document.getElementById("city2").innerHTML == "Add Locality +")

        document.getElementById("city2").innerHTML = document.getElementById("selectedCity").value;

    else {

        document.getElementById("city2").innerHTML = "Add Locality +";

    }

}



findMatch = () => {

    let localityid = [];

    if(document.getElementById("city1").innerHTML == "Andheri East")    localityid.push(37);

    if(document.getElementById("city1").innerHTML == "Powai")    localityid.push(66);

    if(document.getElementById("city1").innerHTML == "Andheri West")    localityid.push(105);

    if(document.getElementById("city1").innerHTML == "Bandra East")    localityid.push(39);

    if(document.getElementById("city1").innerHTML == "Bandra West")    localityid.push(110);

    

    if(document.getElementById("city2").innerHTML == "Andheri East")    localityid.push(37);

    if(document.getElementById("city2").innerHTML == "Powai")    localityid.push(66);

    if(document.getElementById("city2").innerHTML == "Andheri West")    localityid.push(105);

    if(document.getElementById("city2").innerHTML == "Bandra East")    localityid.push(39);

    if(document.getElementById("city2").innerHTML == "Bandra West")    localityid.push(110);

    

    let apartmentid = [];

    for(let i=1; i<=4; i++) {

        if(document.getElementById("checkbox"+i).checked == true)   apartmentid.push(i+1);

    }

    if(apartmentid.includes(5)) {

        for(let x=6; x<=15; x++)    apartmentid.push(x);

    }

    if(apartmentid.length == 0) apartmentid = [2,3,4,5,6,7,8,9,10,11,12,13,14,15];

    

    let furnishing_type_id = [];

    for(let i=1; i<=3; i++) {

        if(document.getElementById("checkboxFT"+i).checked == true)  furnishing_type_id.push(i);

    }

    if(furnishing_type_id.length == 0) furnishing_type_id = [1,2,3];



    let minValue = document.getElementById("minValue").value;

    let maxValue = document.getElementById("maxValue").value;

    

    let available_from = null;

    if(document.getElementById("checkboxAI1").checked == true) {

            available_from = "Within a Week";

    }

    else

    if(document.getElementById("checkboxAI2").checked == true) {

        available_from = "Within 15 Days";

    }

    else

    if(document.getElementById("checkboxAI3").checked == true) {

        available_from = "Within a Month";

    }

    else

    if(document.getElementById("checkboxAI4").checked == true) {

        available_from = "After a Month";

    }

    let url = "http://10.1.8.77:3001/api/v1/flat/filter_for_rent?";

    urlAfter = `locality_ids=${localityid.toString()}&apartment_ids=${apartmentid.toString()}&furnishing_type_ids=${furnishing_type_id.toString()}&min_price=${minValue}&max_price=${maxValue}&available_from=${available_from}`;
    window.location = window.location.href +'property?'+urlAfter;
    


}

function utilNext(id, pageNo, len) {
  var curr = "elem"+id;
  var next = "elem"+(id+1);
  var currBar = "bar"+(id+1);
  var nextBar = "bar"+(id+2);
  if(id==len-1) {
    window.location = window.location.href+'&page='+pageNo;
  }
  else {
    document.getElementById(curr).classList.add('one');
    document.getElementById(next).classList.remove('one');
    document.getElementById(currBar).classList.remove('currentBar');
    document.getElementById(nextBar).classList.add('currentBar');
  }
}
function showNextProperty(event){
  var data=event.target.dataset;
  var id =parseInt(data.blah);
  var pageNo = parseInt(data.page)+1;
  var len = data.length;
  utilNext(id, pageNo, len);
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

  var card=document.getElementById("pop"+id);

  var element=card.getElementsByClassName("confirmOffer");
  var elementToHide = card.getElementsByClassName("popup");
  elementToHide[0].classList.add("one");
  element[0].classList.remove("one");

}



function showAcceptmessage(event){

  var data=event.target.dataset;

  var id=data.identifier;

  var card=document.getElementById("pop"+id);

  var elementToHide=card.getElementsByClassName("confirmOffer");

  elementToHide[0].classList.add("one");

  var uflatid = data.userflatid;
  var flatid = data.id;
//  console.log(data)

  var data2 = JSON.stringify({
  "profile_uuid": "83c01602-5a94-4d30-8e86-e59a795b4fe5",
  "flat_id": flatid,
  "bidder_amount": parseInt(data.price),
  "bidder_security_amount": parseInt(data.sdep),
  "counter_bidder_id": uflatid,
  "bidding_type": "USER_AGENT",
  "status": "ACCEPTED",
//  "token_amount": 500
});

//console.log(data2);
//alert('hi');
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
//    alert("Successfully accepted the offer! BidId: "+JSON.parse(this.responseText)["bid_id"]);
  }
});

xhr.open("POST", "http://10.1.8.64:3000/api/create-bid");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("postman-token", "4dcb2f8d-8391-0b1d-2fbd-c7018ce02b5c");

xhr.send(data2);





  var elementToShow=card.getElementsByClassName("messageAccept");

  elementToShow[0].classList.remove("one");

  setTimeout(function(){

    elementToShow[0].classList.add("one");
    card.style.width = "0%";


    /* direct to next property */
    var id =parseInt(data.blah);
    var pageNo = parseInt(data.page)+1;
    var len = data.length;
    utilNext(id, pageNo, len);


  }, 1000);

}



function showEnterOffer(event){

  var data=event.target.dataset;

  var id=data.identifier;

  var card=document.getElementById("pop"+id);

  var element=card.getElementsByClassName("enterOffer");
  var elementToHide = card.getElementsByClassName("popup");
  elementToHide[0].classList.add("one");

  element[0].classList.remove("one");

}



function sendCounterOffer(event){

  var data=event.target.dataset;

  var id=data.identifier;

  var card=document.getElementById("pop"+id);

  var elementToHide=card.getElementsByClassName("enterOffer");

  elementToHide[0].classList.add("one");
  
  var uflatid = data.userflatid;
  var flatid = data.id;

  var data2 = JSON.stringify({
  "profile_uuid": "83c01602-5a94-4d30-8e86-e59a795b4fe5",
  "flat_id": flatid,
  "bidder_amount": parseInt(card.querySelector("#priceinput").value),
  "bidder_security_amount": parseInt(card.querySelector("#sdepinput").value),
  "counter_bidder_id": uflatid,
  "bidding_type": "USER_AGENT",
  "status": "BID",
//  "token_amount": 500
});

console.log(data2);
//alert('hi');
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
  //  alert("Successfully created a bid with id:"+ JSON.parse(this.responseText)["bid_id"]);
  }
});

xhr.open("POST", "http://10.1.8.64:3000/api/create-bid");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("postman-token", "4dcb2f8d-8391-0b1d-2fbd-c7018ce02b5c");

xhr.send(data2);


  var elementToShow=card.getElementsByClassName("messageCounter");

  elementToShow[0].classList.remove("one");



  setTimeout(function(){

    elementToShow[0].classList.add("one");

    card.style.width = "0%";

    /* direct to next property */

    var id =parseInt(data.blah);
    var pageNo = parseInt(data.page)+1;
    var len = data.length;
    utilNext(id, pageNo, len);




  }, 1000);

}

function showPref() {
  window.location.href = "http://"+window.location.href.split('/')[2];
}

function showDashboard() {
  window.location.href = "http://"+window.location.href.split('/')[2]+'/dashboard';
}
