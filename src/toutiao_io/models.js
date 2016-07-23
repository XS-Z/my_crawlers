'use strict';
class user {
	constructor(name, url, avator, bio) {
		this.name = name;
		this.url = url;
		this.avator = avator;
		this.bio = bio;
	}
}
class subject {
	constructor(name, url, avator) {
		this.name = name;
		this.url = url;
		this.avator = avator;
	}
}
class post {
	constructor(title, url, likes, favorites, domain, comments, user, subject) {
		this.title = title;
		this.url = url;
		this.likes = likes;
		this.favorites = favorites;
		this.domain = domain;
		this.comments = comments;
		this.user = user;
		this.subject = subject;
	}
}
exports.user = user;
exports.subject = subject;
exports.post = post;