'use strict';

var injector = source('injector');

describe('injector', function(){

  function Foo(name, age) {
    this.name = name;
    this.age = age;
  }
  Foo.inject = ['bar'];

  beforeEach(function(){
    injector.registerModules({
      'foo': { type: Foo },
      'bar': { value: 'bar' }
    });
  });

  afterEach(function(){
    injector._clearModules();
  });

  it('should register modules correctly', function(){
    injector.registerModules({ 'baz': { type: 'Baz' } });
    expect(injector._getModules()).to.eql({
      'foo': { type: Foo },
      'bar': { value: 'bar' },
      'baz': { type: 'Baz' }
    });
  });

  it('should throw an error if an unknown module is requested', function(){
    expect(function(){
      injector.get('baz');
    }).to.throwException(function(e){
      expect(e.message).to.be('baz has not been configured');
    });
  });

  it('should construct an instance of "type" if a module\'s return instruction is "type"', function(){
    var stub = sinon.stub(injector, '_construct');
    injector.get('foo');
    expect(stub.args[0]).to.eql([Foo]);
    injector._construct.restore();
  });

  it('should return "value" if a module\'s return instruction is "value"', function(){
    expect(injector.get('bar')).to.be('bar');
  });

  it('should throw an error if a module has an unknown return instruction', function(){
    injector.registerModules({ 'baz': {} });
    expect(function(){
      injector.get('baz');
    }).to.throwException(function(e){
      expect(e.message).to.be('baz has an unknown return instruction');
    });
  });

  it('should handle a constructor function\'s dependencies correctly', function(){
    var begetStub = sinon.stub(injector, '_beget');
    injector._construct(Foo);
    expect(begetStub.args[0]).to.eql([Foo, ['bar']]);
    injector._beget.restore();
  });

  it('should correctly construct an object with a given args array', function(){
    var foo = injector._beget(Foo, ['John', 30]);
    expect(foo.name).to.be('John');
    expect(foo.age).to.be(30);
    expect(foo instanceof Foo).to.be(true);
  });

});