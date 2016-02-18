var bookService = require('./services/bookService');

setInterval(function() {
	bookService.getAllBookId(function(err, rows){
		if (err) throw err;
		rows.forEach(function(book){
			bookService.getAssessments(book.id, function(err, rows1){
				if (err) throw err;
				if (rows1.length==0){
					bookService.addAssessments(0, book.id, function(err, rows2){
						if (err) throw err;
					});
				} else {
					var sumAssessments = 0;
					rows1.forEach(function(user){
						sumAssessments += user.assessment;
					});
					sumAssessments /= rows1.length;
					bookService.addAssessments(sumAssessments, book.id, function(err, rows2){
						if (err) throw err;
					});
				};
			});
		});
	});
}, 3600000 );