var request = require('request');
var Promise = require('bluebird');
var mongodb = require('../../database-mongo');

module.exports = {

	getBusinessesData: (params) => {
		var yelpUrl = 'https://api.yelp.com/v3/businesses/search?longitude=' + params.longitude + 
                '&latitude=' + params.latitude + '&term=' + params.searchTerm +
                '&sort_by=rating&limit=5';
	  	
	  	var queryData = {
	    	url: yelpUrl,
	    	headers: {
	      		Authorization: 'Bearer TmtBFVjYb7rFX1d9cSWHYvDz6PsqdBHq_wqu1MNlptWaUJ2bMNedcUM3v3uJSnAPm57dR01lK6BFqlvU64nxscvAmgVzEftr53GUHNM79WbjF_0jLYAlHMRpayhIWXYx'
	    	}
	    // },
	    // params: {
	    //     latitude: 37.783749799999995,
	    //     longitude: -122.40914869999999,
	    //     term: 'food',
	    //     radius: 1,
	    //     limit: 5,
	    //     sort_by: 'rating',
	    //     open_now: true
	    //   }
	  	}

	  	return new Promise (
	  		(resolve, reject) => {
	  			request.get(queryData, (err, body, res) => {
	    			if (err) {
	      				console.log(err)
	      				reject(err);
	    			} else {
	      				resolve((JSON.parse(body.body)).businesses);
	    			}
	  			})
	  		}
	  	)	
	},

	getYelpToken: () => {

	    var token = '';

	    var queryString = {
	    	url: 'https://api.yelp.com/oauth2/token',
	    	headers: {
	    		format: 'application/x-www-form-urlencoded',
	    	},
	    	data: {
	    		grant_type: 'client_credentials',
	      		client_id: 'xyH4Ma0vpQpM-rpa-U36cA',
	      		client_secret: 'SnDRZDSCzvjjKwwD1aXRY9Air7n8lGzvQJdPve8A6UzXnIPhcjosK9xpn2800gNr'
	    	}
	    }

	    request.post(queryString, (err, res, body) => {
	    	if (err) {
	    		console.log(err);
	    	} else {
	    		token = body.token_type;
	    	}
	    });

	  	return token;
	},

	getWeatherInfo: (params) => {
		var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + Math.floor(params.latitude) + 
                '&lon=' + Math.floor(params.longitude) + '&appid=7835ecc28a74022896879218e6a34a25&units=imperial';

	  	return new Promise (
	  		(resolve, reject) => {
	  			request.get(weatherUrl, (err, res, body) => {
	    			if (err) {
	      				console.log(err)
	      				reject(err);
	    			} else {
	    				console.log('In weather', body)
	      				resolve(body);
	    			}
	  			})
	  		}
	  	)	
	},

	getYelpQueryString: (params) => {
		return new Promise (
			(resolve, reject) => {
				mongodb.selectOne(params)
				.then((data) => {
					console.log('after db query', data)
					if (data.length === 0) {
						data.push({searchText: 'coffee'})	
					}
					resolve(data)
				})
				.catch((err) => {
					console.log(err)
					reject(err)
				})
		})
	}
}

  