<%
modifyurl = function(url,param, value) {
  if(url === '/' ){
    url = url+'search';

  }

  var val = new RegExp('(\\?|\\&)' + param + '=.*?(?=(&|$))' ),
  qstring = /\?.+$/;
//    var bedval = new RegExp('(\\?|\\&)' + 'bed' + '=[(\d,?)]')
  if (val.test(url))
  {

    return url.replace(val, '$1' + param + '=' + value);
  }
  else if (qstring.test(url))
  {

    return url + '&' + param + '=' + value;
  }
  else
  {

    return url + '?' + param + '=' + value;
  }
}
%>