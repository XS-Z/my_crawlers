'use strict';
const models = require("./models");
const cheerio = require("cheerio");
const http = require("http");
const url = require("url");

const HOME_PAGE_URL = "http://toutiao.io";
/// get top posts by analysising html DOM tree of toutiao.io
const _getPosts = (html) => {
	let result = [];
	let $ = cheerio.load(html),
		posts = $(".post");
	posts.each((idx, item) => {
		let $item = $(item);
		let meta = $item.find(".meta").text().split('\n').map(s => s.trim()).filter(s => s.length);
		let user = new models.user(
				$item.find(".info h4").text().trim(), //name
				__autoCorrectURL($item.find(".info a").eq(0).attr("href")), //url
				$item.find(".info img").attr("src"), //avator
				$item.find(".info .bio").text() //bio
			),
			subject = new models.subject(
				$item.find(".subject-name").text().trim(), //name
				__autoCorrectURL($item.find(".subject-name a").attr("href")), //url
				$item.find(".user-avatar img").attr("src") //avator
			);
		let post = new models.post(
			$item.find(".title").text().trim(), // title
			__autoCorrectURL($item.find(".title a").attr("href").trim()), // url
			parseInt($item.find(".like-button").text()), // likes
			parseInt($item.find(".favorite-button").text()), // favorites
			meta[0], // domain
			meta[1], // comments
			user, //user
			subject //subject
		)
		result.push(post);
	});
	return result;
};
const __autoCorrectURL = urlStr => {
	if (urlStr && urlStr.length)
		return urlStr.startsWith(HOME_PAGE_URL) ? urlStr : url.resolve(HOME_PAGE_URL, urlStr);
	return '';
};
exports.getPosts = () => {
	return new Promise((resolve, reject) => {
		http.get(HOME_PAGE_URL, res => {
			if (res.statusCode !== 200)
				return reject(`${HOME_PAGE_URL} is temporary unavailable!`);
			let html = '';
			res.on("data", data => html += data);
			res.on("end", () => {
				/// analysis html and get model
				if (html.length === 0) return resolve();
				let posts = _getPosts(html);
				resolve(posts);
			});
		}).on("error", err => reject(err));
	});
};
exports.source_url = HOME_PAGE_URL;