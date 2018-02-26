var express = require('express');
var router = express.Router();
var request = require("request");
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
var apiServer = "http://rakesh.kumar.housing.com:3000/api/filter-flats";
var serverUrl = "http://rakesh.kumar.housing.com:3000/";
//var global_uid;

/* GET home page. */

exports.showLogin = function(req, res) {
    res.render('login');
}

exports.showWelcome = function(req, res) {
  global_uid = req.query.uid;
  res.render('welcome', {uid: req.query.uid});
}
exports.showPrefs = function(req, res) {
  global_uid = req.query.uid;
  res.render('index',{uid:req.query.uid});
};

exports.showSplash = function(req, res) {
  res.render('splash', {uid:req.query.uid});
}
exports.nextProp = function(req, res) {
  
}

exports.loadProp = function(req, res) {
  /*var q = apiString.indexOf('?');
  if(q>-1) {
    var urlBefore = apiString.slice(0,q);
    console.log(urlBefore);
  }
  var urlAfter = apiString.slice(q+1);
  console.log(urlAfter.toString());
  urlAfter = urlAfter.forEach(elem => elem.split('='));
  
  var filterParam = {};
  for(var elem in urlAfter) {
    filterParam[elem[0]] = elem[1];
    console.log(filterParam[elem[0]]);
  }*/
  var options = { method: 'GET',
      url: apiServer,
      qs: 
      { locality_ids: req.query["locality_ids"],
     apartment_type_ids: req.query["apartment_ids"],
     furnish_type_ids: req.query["furnishing_type_ids"],
     min_price: req.query["min_price"],
     max_price: req.query["max_price"],
     available_from: req.query["available_from"],
     page: req.query["page"] },
     
     headers: 
     {
     'cache-control': 'no-cache' } };

     request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
      obj = JSON.parse(body);
      res.render('property', {title:'LeasyLife', data: obj, url: serverUrl, pageNo: req.query["page"] || 1, uid: req.query.uid});
  });

  
}

exports.loadDashboard = function(req, res) {
  var options = { method: 'GET',
  url: 'http://rakesh.kumar.housing.com:3000/api/list-latest-bids',
  qs: 
   { profile_uuid: req.query.uid,
     profile_type: 'Buyer' },
  headers: 
   {
     'cache-control': 'no-cache' } };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    obj = JSON.parse(body);
    var counter_bidder_ids = [];
    for(var i = 0; i<obj.length; i++) {
      counter_bidder_ids.push(obj[i].counter_bidder_id);
    }
//    console.log(body);
//    console.log(counter_bidder_ids);
    var options2 = { method: 'GET',
      url: 'http://rakesh.kumar.housing.com:3000/api/user-flat-details',
      qs: { user_flat_ids: counter_bidder_ids.toString() },
      headers: 
      {
        'cache-control': 'no-cache' } };

    request(options2, function (error2, response2, body2) {
    if (error2) throw new Error(error2);
//      console.log(body2);
      var cbids = JSON.parse(body2);
      obj.sort(function comp(a, b) {
        return parseInt(a.counter_bidder_id)-parseInt(b.counter_bidder_id);
      });
      cbids.sort(function comp(a, b) {
        return parseInt(a.userflat_id)-parseInt(b.userflat_id);
      });
      console.log(cbids);
      console.log(obj);
//      console.log(cbids[0].cover_image_url);
      res.render('dashboard', {data:obj, cbids: JSON.parse(body2)});
    });

    
  });
}

/*exports.loadOwnerDashboard = function(req, res) {
  var options = { method: 'GET',
  url: 'http://rakesh.kumar.housing.com:3000/api/list-latest-bids',
  qs: 
   { profile_uuid: req.query.id,
     profile_type: 'Seller' },
  headers: 
   { 
     'cache-control': 'no-cache' } };

  request(options, function (error, response, body) {
  if (error) throw new Error(error);
  obj = JSON.parse(body);
  var allKeys = Object.keys(obj).toString();
  var options2 = { method: 'GET',
    url: 'http://rakesh.kumar.housing.com:3000/api/user-flat-details',
    qs: { user_flat_ids: allKeys },
    headers: 
    {
      'cache-control': 'no-cache' } };

  request(options2, function (error2, response2, body2) {
  if (error2) throw new Error(error2);
  //  console.log(body2);
    res.render('dashboard', {data:obj, cbids: JSON.parse(body2)});
  });
  });
}*/

exports.loadSellerDashboard = function(req, res) {
  var options = { method: 'GET',
  url: 'http://rakesh.kumar.housing.com:3000/api/list-latest-bids',
  qs: 
   { profile_uuid: req.query.uid,
     profile_type: 'Seller' },
  headers: 
   { 
     'cache-control': 'no-cache' } };

  request(options, function (error, response, body) {
  if (error) throw new Error(error);
  obj = JSON.parse(body);
  console.log(obj);
  var allKeys = Object.keys(obj);
  var options2 = { method: 'GET',
    url: 'http://rakesh.kumar.housing.com:3000/api/user-flat-details',
    qs: { user_flat_ids: allKeys.toString() },
    headers: 
    {
      'cache-control': 'no-cache' } };

  request(options2, function (error2, response2, body2) {
  if (error2) throw new Error(error2);
   console.log(obj);
    res.render('dashboard_seller', {data:obj, cbids: JSON.parse(body2), keys: allKeys});
  });
  });
}

exports.loadOwnerDashboard = function(req, res) {
  var options = { method: 'GET',
  url: 'http://rakesh.kumar.housing.com:3000/api/list-latest-bids',
  qs: 
   { profile_uuid: req.query.uid,
     profile_type: 'Seller' },
  headers: 
   { 
     'cache-control': 'no-cache' } };

  request(options, function (error, response, body) {
  if (error) throw new Error(error);
  obj = JSON.parse(body);
  console.log(obj);
  var allKeys = Object.keys(obj);
  var options2 = { method: 'GET',
    url: 'http://rakesh.kumar.housing.com:3000/api/user-flat-details',
    qs: { user_flat_ids: allKeys.toString() },
    headers: 
    {
      'cache-control': 'no-cache' } };

  request(options2, function (error2, response2, body2) {
  if (error2) throw new Error(error2);
   console.log(obj);
    res.render('owner', {data:obj, cbids: JSON.parse(body2), keys: allKeys});
  });
  });
}

exports.showClaim = function(req, res) {
  var options = { method: 'GET',
  url: 'http://rakesh.kumar.housing.com:3000/api/list-latest-bids',
  qs: 
   { profile_uuid: req.query.uid,
     profile_type: 'Buyer' },
  headers: 
   { 
     'cache-control': 'no-cache' } };

  request(options, function (error, response, body) {
  if (error) throw new Error(error);
  obj = JSON.parse(body);
//  console.log(obj);
  var counter_bidder_ids = [];
  for(var i = 0; i<obj.length; i++) {
    counter_bidder_ids.push(obj[i].counter_bidder_id);
  }
  var options2 = { method: 'GET',
    url: 'http://rakesh.kumar.housing.com:3000/api/user-flat-details',
    qs: { user_flat_ids: counter_bidder_ids.toString() },
    headers: 
    {
      'cache-control': 'no-cache' } };

  request(options2, function (error2, response2, body2) {
  if (error2) throw new Error(error2);
   //console.log(obj);
   console.log(JSON.parse(body2));
    res.render('ownerClaim', {data:obj, cbids: JSON.parse(body2)});    
  });
  });
}
exports.routes = router;