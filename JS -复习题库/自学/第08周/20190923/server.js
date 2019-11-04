let express = require('express'),
	app = express();
app.listen(8080, () => {
	console.log('server is create success！listening on 8080 port！');
});

app.use(express.static('./static'));
app.use((req, res, next) => {
	res.status(404);
	res.send('NOT FOUND!');
});