//profile_type = User, phone_number : 8600557895, profile_uuid : 3a12b6a5-107e-4fc4-af5b-04f72e83968e
//profile_type = User, phone_number : 9830009891, profile_uuid : 33f1387c-3100-424a-8de1-dfed86a5f620

//Seller Type: Broker & Profile UUID: 25f7fed9-7488-4311-84f8-268a287a381b

//Phone Number: 9867029445

function doSomething() {
  var phone = document.getElementById("phone").value;
  var uid;
  if(phone==='8600557895') {
    uid = "3a12b6a5-107e-4fc4-af5b-04f72e83968e";
    window.location.href = "http://"+window.location.href.split('/')[2]+'/welcome?uid='+uid;
  }
  else if(phone==='9830009891') {
    uid = "33f1387c-3100-424a-8de1-dfed86a5f620";
    window.location.href = "http://"+window.location.href.split('/')[2]+'/welcome?uid='+uid;
  }
  else if(phone==='9867029445') {
    uid = '25f7fed9-7488-4311-84f8-268a287a381b';
    window.location.href = "http://"+window.location.href.split('/')[2]+'/splash?uid='+uid;
  }
  else if(phone==='9819201271') {
    uid = '891c7e86-f407-4ce4-9ff9-1094ba68beff';
    window.location.href = "http://"+window.location.href.split('/')[2]+'/ownerdashboard?uid='+uid;
  }
}