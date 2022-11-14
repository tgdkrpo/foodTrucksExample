const { expect } = require("@playwright/test");
const geolib = require("geolib");
const got = require("got");

class Utils {

    constructor(apis) {
        this.apis = apis;
    }

    async filterTruckBy(trucks, attr, value){
        console.log(`Filter #${trucks.length}, for ${attr} with value of ${value}`)
        let filteredTrucks = [];
        for (let i = 0; i < trucks.length; i++){

            // get single truck data
            let truck = trucks[i];

            // make sure it has the attribute we are filtering by
            if (truck[attr]){

                // do lowercase to avoid Asian/asian not matching
                let dataValue = truck[attr].toLowerCase();
                let filterValue = value.toLowerCase();

                if (dataValue.indexOf(filterValue) > -1){

                    // change truck data for later geo filtering by nearest
                    truck.latitude = parseFloat(truck.location.latitude);
                    truck.longitude =  parseFloat(truck.location.longitude);
                    filteredTrucks.push(truck);
                };
            };
        };
        return filteredTrucks
    }

    async getPlaceLocation(place){
        console.log(`Get geo location for "${place}"`)
        let url = this.apis.googleMapSearch.replace("PLACEHOLDER", encodeURI(place));
        let response = await got.get(url, {responseType: 'json', throwHttpErrors: false});
        let locationData = response.body;
        let candidates = locationData.candidates;
        console.log("Expect to have only 1 location for given place")
        expect(candidates.length).toEqual(1);
        return candidates[0].geometry.location
    }

    async getClosestTruck(location, trucks){
        console.log("Get closest truck to ", location);
        let closestTruck = geolib.findNearest({ latitude: location.lat, longitude: location.lng }, trucks);
        return closestTruck
    }
}

module.exports = Utils;
