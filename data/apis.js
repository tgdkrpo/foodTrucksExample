module.exports = {
	"foodTrucksData": "https://data.sfgov.org/resource/rqzj-sfat.json",
	"googleMapSearch": `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&input=PLACEHOLDER&inputtype=textquery&key=${process.env.GOOGLE_MAP_API_KEY}`
	// "googleMapSearch": `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&inputtype=textquery&key=${process.env.GOOGLE_MAP_API_KEY}-Q&input=`
}
