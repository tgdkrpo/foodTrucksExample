require("dotenv").config();
const base = require("@playwright/test");
const { expect } = require("@playwright/test");

// data
const apis = require("../data/apis");

// utils
const utils = require("../libs/utils");

class TestBase {
	constructor() {
		this.apis = apis;
		this.utils = new utils(this.apis);
  	};

  	test = base.test.extend({
		testSetUp: [
	  		async ({}, use, testInfo) => {
				this.testTile = testInfo.title;
				console.log(`RUNNING TEST WITH NAME: ${this.testTile}`);
				await use();
	  		},
	  		{ auto: true },
		],

		tearDown: async ({}, use) => {
			await use();
			console.log("tear down");
		},
	});
}

module.exports = new TestBase();
