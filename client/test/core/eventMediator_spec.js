define(['eventMediator'], function(eventMediator){
  
  describe('eventMediator', function(){
    
    beforeEach(function(){
      this.noop = function(){};
    });

    afterEach(function(){
      delete this.noop;
      eventMediator.clearSubscriptions();
    });
 
    it('should allow an event to be cleared of subscriptions', function(){
      
      eventMediator.subscribe('test', this.noop);
      expect(eventMediator.getSubscriptions('test')).toEqual([{
        context: eventMediator,
        callback: jasmine.any(Function)
      }]);
      
      eventMediator.clearSubscriptions('test');
      expect(eventMediator.getSubscriptions('test')).toBeUndefined();

    });
   
    it('should allow all events to be cleared of subscriptions', function(){

      eventMediator.subscribe('test', this.noop);
      expect(eventMediator.getSubscriptions('test')).toEqual([{
        context: eventMediator,
        callback: jasmine.any(Function)
      }]);
       
      eventMediator.subscribe('test-two', this.noop);
      expect(eventMediator.getSubscriptions('test-two')).toEqual([{
        context: eventMediator,
        callback: jasmine.any(Function)
      }]);
       
      eventMediator.clearSubscriptions();
      expect(eventMediator.getSubscriptions('test')).toBeUndefined();
      expect(eventMediator.getSubscriptions('test-two')).toBeUndefined();
       
    });
   
    it('should allow a subscription to a new event', function(){
      eventMediator.subscribe('test', this.noop);
      expect(eventMediator.getSubscriptions('test')).toEqual([{
        context: eventMediator,
        callback: jasmine.any(Function)
      }]);
    });
   
    it('should allow a subscription to an existing event', function(){
      eventMediator.subscribe('test', this.noop);
      eventMediator.subscribe('test', this.noop);
      expect(eventMediator.getSubscriptions('test')).toEqual([
        {
          context: eventMediator,
          callback: jasmine.any(Function)
        },
        {
          context: eventMediator,
          callback: jasmine.any(Function)
        }
      ]);
    });
   
    it('should set the subscription context as itself if an explicit `this` value is not passed', function(){
      eventMediator.subscribe('test', this.noop);
      expect(eventMediator.getSubscriptions('test')[0].context).toEqual(eventMediator);            
    });
   
    it('should set the subscription context correctly if an explicit `this` value is passed', function(){
      eventMediator.subscribe('test', this.noop, this);
      expect(eventMediator.getSubscriptions('test')[0].context).toEqual(this);            
    });
    
    it('should publish an event correctly', function(){
        
        var fn = jasmine.createSpy();
        
        eventMediator.subscribe('test', fn);
        eventMediator.publish('test', 'anArg');
        
        expect(fn).toHaveBeenCalledWith('anArg');
    
    });
   
  });
   
});