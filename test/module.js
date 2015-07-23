var xModule = require('../lib/x-module');

xModule.def('moduleA', function() {
    return 'A'
});

xModule.def('moduleB', ['moduleA'], function(A) {
    return function() {
        return 'B' + A;
    };
});

xModule.def('moduleC', ['moduleA', 'moduleB'], function(A, B) {
    return A + B();
});

describe('xModule', function() {
    describe('single module', function() {
        it('should run', function() {
            xModule.run('moduleA', function(A) {
                A.should.equal('A');
            });
        });
    });

    describe('dep module', function() {
        it('should run', function() {
            xModule.run('moduleB', function(B) {
                B().should.equal('BA');
            });
        });
    });

    describe('multi dep module', function() {
        it('should run', function() {
            xModule.run('moduleC', function(C) {
                C.should.equal('ABA');
            });
        });
    });
});
