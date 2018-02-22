var express = require('express');
var router = express.Router();
var request = require("request");
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
var apiServer = "http://rakesh.kumar.housing.com:3000/api/filter-flats";
var serverUrl = "http://rakesh.kumar.housing.com:3000";

/* GET home page. */
exports.hello = function(req, res) {
  res.render('index');
};

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
     available_from: req.query["available_from"] },
     headers: 
     {
     'cache-control': 'no-cache' } };

     request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body);
      obj = JSON.parse(body);
    res.render('property', {title:'LeasyLife', data: obj, url: serverUrl, pageNo: req.query["page"] || 1});
  });

  
}

exports.loadDashboard = function(req, res) {
  var options = { method: 'GET',
  url: 'http://10.1.8.85:3001/api/list-all-bids',
  qs: 
   { profile_uuid: '83c01602-5a94-4d30-8e86-e59a795b4fe5',
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
    console.log(body);
    console.log(counter_bidder_ids);
    var options2 = { method: 'GET',
      url: 'http://10.1.8.85:3001/api/user-flat-details',
      qs: { user_flat_ids: counter_bidder_ids.toString() },
      headers: 
      {
        'cache-control': 'no-cache' } };

    request(options2, function (error2, response2, body2) {
    if (error2) throw new Error(error2);
    //  console.log(body2);
      res.render('dashboard', {data:obj, cbids: JSON.parse(body2)});
    });

    
  });
}

exports.loadOwnerDashboard = function(req, res) {
  var options = { method: 'GET',
  url: 'http://rakesh.kumar.housing.com:3000/api/list-latest-bids',
  qs: 
   { profile_uuid: '39355bc2-4fa5-48b8-90cb-047ea4bbcdf1',
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
}
exports.routes = router;