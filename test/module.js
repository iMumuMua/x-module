var x = require('../lib/x-module');

x.def('sync', [], function() {
    var mod = function() {
        return 'sync';
    };
    this.pub(mod);
});
x.def('syncMain', ['sync'], function(sync) {
    sync().should.equal('sync');
    this.pub();
});
x.def('async', [], function() {
    var self = this;
    var mod = function() {
        return 'async';
    };
    setTimeout(function() {
        self.pub(mod);
    });
});
x.def('asyncMain', ['async'], function(async) {
    async().should.equal('async');
    this.pub();
});
x.def('mix', ['sync', 'async'], function(sync, async) {
    sync().should.equal('sync');
    async().should.equal('async');
    this.pub();
});
x.def('nest', ['syncMain', 'asyncMain'], function(sync, async) {
    this.pub();
});

describe('sync module', function() {
    it('should work', function(done) {
        x.run('syncMain').then(function() {
            done();
        }, done);
    });
});

describe('async module', function() {
    it('should work', function(done) {
        x.run('asyncMain').then(function() {
            done();
        }, done);
    });
});

describe('mix module', function() {
    it('should work', function(done) {
        x.run('mix').then(function() {
            done();
        }, done);
    });
});

describe('nested module', function() {
    it('should work', function(done) {
        x.run('nest').then(function() {
            done();
        }, done);
    });
});
