let http = require("http");
let fs = require("fs");
let server = http.createServer().listen(8080);

server.on("request", (req, res) => {
	if(req.url === "/list-hot-adv") {
		fs.readFile("listHotAdv.json", (err, content) => {
			res.writeHead(200, {
				"Cache-Control": "no-store, no-cache",
				"Content-Type":"application/json;charset=utf-8",
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Origin": "http://localhost:8090",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
				"Access-Control-Allow-Headers": "X-Requested-With,Origin,Content-Type, Accept"
			});
			res.write(content);
			res.end();
			console.log("listHotAdv");
		})
	}

	if(req.url === "/list-animals?animal_type=cat&advertisement_type=buy") {
		fs.readFile("catBuy.json", (err, content) => {
			res.writeHead(200, {
				"Cache-Control": "no-store, no-cache",
				"Content-Type":"application/json;charset=utf-8",
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Origin": "http://localhost:8090",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
				"Access-Control-Allow-Headers": "X-Requested-With,Origin,Content-Type, Accept"
			});
			res.write(content);
			res.end();
			console.log("catBuy");
		})
	}

	if(req.url === "/list-animals?animal_type=cat&advertisement_type=find") {
		fs.readFile("catFind.json", (err, content) => {
			res.writeHead(200, {
				"Cache-Control": "no-store, no-cache",
				"Content-Type":"application/json;charset=utf-8",
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Origin": "http://localhost:8090",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
				"Access-Control-Allow-Headers": "X-Requested-With,Origin,Content-Type, Accept"
			});
			res.write(content);
			res.end();
			console.log("listHotAdv");
		})
	}

	if(req.url === "/list-animals?animal_type=cat&advertisement_type=missing") {
		fs.readFile("catMissing.json", (err, content) => {
			res.writeHead(200, {
				"Cache-Control": "no-store, no-cache",
				"Content-Type":"application/json;charset=utf-8",
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Origin": "http://localhost:8090",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
				"Access-Control-Allow-Headers": "X-Requested-With,Origin,Content-Type, Accept"
			});
			res.write(content);
			res.end();
			console.log("listHotAdv");
		})
	}

	if(req.url === "/list-animals?animal_type=cat&advertisement_type=gift") {
		fs.readFile("catGift.json", (err, content) => {
			res.writeHead(200, {
				"Cache-Control": "no-store, no-cache",
				"Content-Type":"application/json;charset=utf-8",
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Origin": "http://localhost:8090",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
				"Access-Control-Allow-Headers": "X-Requested-With,Origin,Content-Type, Accept"
			});
			res.write(content);
			res.end();
			console.log("listHotAdv");
		})
	}
});

console.log("Listetining om 8080...");