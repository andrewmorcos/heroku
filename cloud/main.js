// With promises
console.log('Main1 Reached');
Parse.Push.send({
  where: { ... },
  data: { ... }
}, { useMasterKey: true })
.then(function() {
  // Push sent!
}, function(error) {
  // There was a problem :(
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
    // Push sent!
  },
  error: function(error) {
    // There was a problem :(
  }
});
