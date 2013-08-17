
/*
 * GET home page.
 */

var canvas = require('canvas');
var fs = require('fs');

module.exports = function(app){
	app.get('/',function(req, res){
		res.render('index',{title:'EDM'});
	});
	app.get('/up',function(req,res){
		res.render('up');
	});
	app.post('/up',function(req,res){
		var can = new canvas(100,100);
		var img = new canvas.Image;
		var ctx = can.getContext('2d');
		ctx.fillStyle = 'rgba(0,0,0,0.9)';
		img.onload = function(){
			ctx.fillText(img.width, 50, 50);
			ctx.drawImage(img, 0 ,0);
			res.send( '<img src="'+can.toDataURL()+'" />');
		};
		img.onerror = function(err){
			console.log(err);
			res.send(err);
		}
		var tmp_path = req.files.imgfile.path;
		img.src = tmp_path;
		fs.unlink( tmp_path );
	});
}
