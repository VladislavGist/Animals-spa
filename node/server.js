let http = require("http");
let fs = require("fs");
let server = http.createServer().listen(process.env.PORT || 8080);

//http://localhost:8090
//https://vladislavgist.github.io
let URL_PATH = (process.env.NODE_ENV === "dev") ? "http://localhost:8090" : "https://vladislavgist.github.io";

server.on("request", (req, res) => {
	if(req.url === "/list-hot-adv") {
		fs.readFile("listHotAdv.json", (err, content) => {
			res.writeHead(200, {
				"Cache-Control": "no-store, no-cache",
				"Content-Type":"application/json;charset=utf-8",
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Origin": URL_PATH,
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
				"Access-Control-Allow-Origin": URL_PATH,
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
				"Access-Control-Allow-Origin": URL_PATH,
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
				"Access-Control-Allow-Origin": URL_PATH,
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
				"Access-Control-Allow-Origin": URL_PATH,
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
				"Access-Control-Allow-Headers": "X-Requested-With,Origin,Content-Type, Accept"
			});
			res.write(content);
			res.end();
			console.log("listHotAdv");
		})
	}
});

console.log("Listetining server." + URL_PATH);