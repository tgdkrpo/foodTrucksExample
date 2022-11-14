const tb = require("../base/test-base");
const { expect } = require("@playwright/test");
const got = require("got");

let trucksData;
let testsData = [
	{status: "APPROVED", food: "Asian", place: "union square San Francisco"},
	{status: "APPROVED", food: "Tacos", place: "union square San Francisco"}
]

tb.test.describe('Food trucks', () => {

	tb.test.beforeAll(async ({}) => {
		console.log("process.env.GOOGLE_MAP_API_KEY: ",process.env.GOOGLE_MAP_API_KEY);
		expect(process.env.GOOGLE_MAP_API_KEY, "Expect to have google map api key").not.toEqual("");
		console.log("Get trucks data from: ",tb.apis.foodTrucksData); 
		let response = await got.get(tb.apis.foodTrucksData, {responseType: 'json', throwHttpErrors: false});
		trucksData = response.body;
	});

	for (const testData of testsData) {

		tb.test(`Find ${testData.status} food truck with "${testData.food}" food truck closest to ${testData.place}`, async () => {

			console.log(`Filter trucks by status: ${testData.status}`);
			let filteredTrucks = await tb.utils.filterTruckBy(trucksData, "status", testData.status);
			console.log("Assert we don't have an empty array of trucks after truck status filter");
			expect(filteredTrucks.length).not.toEqual(0);

			console.log(`Filter trucks by food: ${testData.food}`);
			filteredTrucks = await tb.utils.filterTruckBy(filteredTrucks, "fooditems", testData.food);
			console.log("Assert we don't have an empty array of trucks after food filter");
			expect(filteredTrucks.length).not.toEqual(0);

			let location = await tb.utils.getPlaceLocation(testData.place);
			console.log("location: ",location);

			let closestTruck = await tb.utils.getClosestTruck(location, filteredTrucks);
			console.log(`Closest truck to "${testData.place}" is "${closestTruck.applicant}" at "${closestTruck.locationdescription}"`)
		});
	}
})

