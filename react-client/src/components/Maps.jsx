import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Maps extends React.Component {
	constructor (props) {
		super(props)

		this.style = {
			width: '25vw',
			height: '25vh'
		}

		this.center = {lat: -34.397, lng: 150.644}

		this.state = {
			loaded: false
		}

		this.url = 'https://maps.googleapis.com/maps/api/staticmap?center=37.7851623,-122.4096288&zoom=15&scale=1' +
				  '&size=600x500&maptype=roadmap&key=AIzaSyCz5dV-ER2qyvlRdlNJvLNL_zJ42NSZ0Ps&format=png' + 
				  '&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C37.7851623,-122.4096288'+ 
				  '&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C35.7851623,-122.4096288' 


		this.setState = this.setState.bind(this);
		this.loadMap = this.loadMap.bind(this);
		this.renderMap = this.renderMap.bind(this);
		this.ajaxCall = this.ajaxCall.bind(this);

	}

	componentDidMount() {

	}

	loadMap() {

		var myLatLng = {lat: -34.397, lng: 150.644}

		var map = new google.maps.Map(document.getElementById('map'), {
			center: myLatLng,
			zoom: 8
		})

		console.log(map)

		var marker = new google.maps.Marker({
          map: map,
          position: myLatLng,
          title: 'Hello World!'
        });

		this.renderMap(map);
		// const maps = google.maps;
		// let zoom = 14;
		// if (this.lat === undefined) {
		// 	this.lat = 37.7851623
		// 	this.lng = -122.4096288
		// }
		// const node = document.getElementById('map')
		// const center = new maps.LatLng(this.lat, this.lng);
		// console.log(center)
		// var mapConfig = Object.assign({}, {
		// 	center: center,
		// 	zoom: zoom
		// })

		// this.renderMap(new maps.Map(node, mapConfig))
	}

	renderMap(input) {
		this.setState ({
			loaded: true,
			map: input
		})
	}

	

	ajaxCall () {

		var url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBO-8M88NY8Ui8qmsLM9v8Ear2Rl656JQg&callback=this.loadMap'

		$.ajax({
			url: 'https://maps.googleapis.com/maps/api/staticmap?center=37.7851623,-122.4096288&zoom=16&size=640x400&path=weight:3%7Ccolor:red%7Cenc:{coaHnetiVjM??_SkM??~R&key=AIzaSyCz5dV-ER2qyvlRdlNJvLNL_zJ42NSZ0Ps',
			method: 'GET',
			success: (data) => {
				this.renderMap(data)
			},
			error: (err) => {
				return err
			}
		})
	}

	render() {

		return (
            <div id='map' className="map" style={this.style}>
      			<img width="500" src="https://maps.googleapis.com/maps/api/staticmap?center=37.7851623,-122.4096288&zoom=15&scale=1&size=500x500&maptype=roadmap&key=AIzaSyCz5dV-ER2qyvlRdlNJvLNL_zJ42NSZ0Ps&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C37.7851623,-122.4096288" alt="Google Map of 37.7851623,-122.4096288">
            	</img>
            </div>
        )
  	}
}

export default Maps;