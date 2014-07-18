/*jslint node: true */
'use strict';

var fs = require('fs');

module.exports = {
	/**
	 * Log messages in the terminal using custom colors
	 * @param  { String } msg
	 * @param  { String } type - message type to handle the right color
	 */
	print: function(msg, type) {
		var color;
		switch (type) {
			case 'error':
				color = '\x1B[31m';
				break;
			case 'warning':
				color = '\x1B[33m';
				break;
			case 'confirm':
				color = '\x1B[32m';
				break;
			default:
				color = '';
		}
		console.log(color + ' ' + msg + '\x1B[39m');
	},
	/**
	 * Returns all the subfolders of a directory
	 * @param { String } dir - directory path
	 * @return { Array } name of the subfolders found
	 */
	findSubfolders: function(dir) {
		// read the directory files
		var files = fs.readdirSync(dir),
			ret = [];

		// loop all the files to find the folders
		for (var i = files.length - 1; i > 0; i--) {
			var file = files[i],
				tmpFilePath = dir + '/' + file,
				stat = fs.statSync(tmpFilePath);
			// folder found
			if (stat && stat.isDirectory()) {
				ret.push(file);
			}
		}
		return ret;
	},
	/**
	 * Return a valid javascript object reading a json file if it exists
	 * @param  { String } path - path to the json file
	 * @return { Object }
	 */
	readJson: function(path) {
		return JSON.parse(fs.readFileSync(path));
	},
	/**
	 * Return a random array value
	 * @param  { Array } array
	 * @return { * }
	 */
	getRandomArrayValue: function(array) {
		return array[~~(Math.random() * array.length)];
	}
};