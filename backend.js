const url = 'https://poop-scooper.herokuapp.com';

export function getRequests(cityID) {
	return new Promise((resolve, reject) => {
		fetch(`${url}/loc/city/${cityID}`)
			.then(response => response.json())
			.then(json => {
				resolve(json.city.locations);
			})
			.catch(error => {
				reject(error)
			});
	})
}
