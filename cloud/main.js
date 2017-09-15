// With promises
console.log('KAMAN Main1 Reached');


// iOS push testing
Parse.Cloud.define("iosPushTest", function(request, response) {
console.log('KAMAN main2 reached');
  // request has 2 parameters: params passed by the client and the authorized user                                                                                                                               
  var params = request.params;
  var user = request.user;

  // Our "Message" class has a "text" key with the body of the message itself                                                                                                                                    
  var messageText = params.text;

  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo('deviceType', 'ios'); // targeting iOS devices only                                                                                                                                          

  Parse.Push.send({
    where: pushQuery, // Set our Installation query                                                                                                                                                              
    data: {
      alert: "Message: " + messageText
    }
  }, {useMasterKey: true} );
  
  




/*
Parse.Push.send()
.then(function() {
  console.log('KAMAN Push sent');// Push sent!
}, function(error) {
  console.log('KAMAN push failed');// There was a problem :(
});
*/

/*arse.Push.send({
/  where: { ... },
  data: { ... }
}, { useMasterKey: true })
.then(function() {
  console.log('KAMAN Push sent');// Push sent!
}, function(error) {
  console.log('KAMAN push failed');// There was a problem :(
});

// With Legacy Backbone callbacks
Parse.Push.send({
  where: query,
  data: {
    alert: 'Test',
    badge: 1,
    sound: 'default'
  }
}, {
  useMasterKey: true,
  success: function() {
    console.log('KAMAN push 2 sent');// Push sent!
  },
  error: function(error) {
    console.log('KAMAN push 2 failed');// There was a problem :(
  }
});
*/
