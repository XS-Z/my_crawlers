'use strict';
const crawler = require("./crawler");
//import * from "./crawler";

let console_logger = data => console.log(JSON.stringify(data));
let file_logger = data =>{
	"use strict";
	const fs = require("fs"), 
	path = require("path"), 
	outDir = "../../logs";
	let now = new Date(),
		tmpArr = [
			now.getFullYear()%100,
			now.getMonth()+1,
			now.getDate(),
			now.getHours(),
			now.getMinutes()
		],
	fileName = `${tmpArr.map(n=>n>=10?n:'0'+n).join('')}.json`;
	let filePath = path.resolve(__dirname, outDir, fileName);
	fs.writeFile(filePath, JSON.stringify(data), err => {
		if(err) {console_logger(err);}
		else console_logger(`Done, and result is persisted to file "${filePath}`);
	});
};
crawler.getPosts().then(file_logger, console_logger);