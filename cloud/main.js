// With promises
console.log('KAMAN Main1 Reached');
/*arse.Push.send({
/  where: { ... },
  data: { ... }
}, { useMasterKey: true })
.then(function() {
  console.log('KAMAN Push sent');// Push sent!
}, function(error) {
  console.log('KAMAN push failed');// There was a problem :(
});
*/
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
