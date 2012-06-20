define([], function () {
    
    var events = {};
    
    // Returns the array of subscriptions for the passed event.
    function getSubscriptions(event) {
        return events[event];
    };
    
    // Clears subscriptions for the passed event, or clears
    // subscriptions to all events if an event isn't specified.
    function clearSubscriptions(event) {
        if (events[event]) {
            delete events[event];
        } else {
            events = {};    
        }
    }
    
    // Adds a subscription to an event.
    function subscribe(event, cb, context) {
        
        if (!events[event]) {
            events[event] = [];
        }
        
        events[event].push({
           context: context || this,
           callback: cb
       });
    
    }
    
    // Publishes an event.
    function publish(event) {
                
        if (!events[event]) {
            return;
        }
        
        var args = [].slice.call(arguments, 1);
        
        for (var i = 0, l = events[event].length; i < l; i++) {
            var subscription = events[event][i];
            subscription.callback.apply(subscription.context, args);
        }
        
    }

    return  {
        getSubscriptions: getSubscriptions,
        clearSubscriptions: clearSubscriptions,
        subscribe: subscribe,
        publish: publish
    };

});