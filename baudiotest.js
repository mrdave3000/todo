/*var baudio = require('baudio');

var n = 0;
var b = baudio(function (t) {

	g = [ 0, 1/2, 1/3, 1/4, 1/5, 1/6, 1/7 , 1/8 ];

    var x = Math.sin(t * 2100 + Math.sin(n));
    //n += Math.sin(t);
    return x;
});
b.play();