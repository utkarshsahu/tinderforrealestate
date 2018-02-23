function loadNextPage(uid) {
  var timer = setTimeout(function() {
  
      window.location.href= "http://"+window.location.href.split('/')[2]+'/filter?uid='+uid;
  
  }, 5000);
}