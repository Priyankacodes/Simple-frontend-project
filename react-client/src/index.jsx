import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Maps from './components/Maps.jsx';
import hddata from '../../yelpData.json';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      businesses: [],
      latitude: 0,
      longitude: 0
    }

    this.greetings = {
      1: 'Hello',
      2: 'Hello',
      3: 'Hello',
      7: 'Good Morning!',
      8: 'Hola!',
      9: 'Aloha!',
      10: 'Aloha!',
      11: 'Aloha!',
      12: 'Must be hungry, time for lunch!',
      13: 'Time for lunch!',
      14: 'How about a short break',
      15: 'Tea Time!!',
      16: 'Time for Coffee Break',
      17: 'Hang on...Soon its gonna be Dinner Time',
      18: 'Dinnerlicious',
      19: 'Dinner Time',
      20: 'Dinner Time',
      21: 'Good Night!',
      22: 'zzzzzz',
      23: 'zzzzzz',
      24: 'Why awake so late'
    }

    this.setPosition = this.setPosition.bind(this);
    this.setBusinesses = this.setBusinesses.bind(this);
    this.showPosition = this.showPosition.bind(this);
    this.getGeoLocation = this.getGeoLocation.bind(this);
    this.showGreeting = this.showGreeting.bind(this);

    this.styleText = {
      width:'500px', 
      height: '500px', 
      textalign: 'center', 
      verticalalign: 'middle', 
      background:'#FFE4E1', 
      color: '#555555', 
      margin: '5em', 
      border: '5px'
    }

    this.styleMap = {
      width:'450px', 
      height: '500px', 
      textalign: 'center', 
      verticalalign: 'middle', 
      color: '#555555', 
      margin: '5em', 
      border: '5px'
    }

  }

  showGreeting () {
    var time = new Date().getHours()
    return this.greetings[time];
  }

  setPosition (lat, long) {
    this.setState ({
      latitude: lat,
      longitude: long
    })

    var requestData = {
      latitude: this.state.latitude,
      longitude: this.state.longitude
    }

    var setBusinesses = this.setBusinesses;

    $.ajax({
      url: 'http://127.0.0.1:3000/users', 
      method: 'GET',
      data: requestData,
      success: (data) => {
        setBusinesses(data);
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  setBusinesses (data) {
    this.setState({
      businesses: data
    })
  }

  showPosition(position) {
    this.setPosition(position.coords.latitude, position.coords.longitude);
  }

  getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  componentDidMount() {

    //Get current geolocation
    this.getGeoLocation();

  }

    //Hardcoded Data
    this.setBusinesses(hddata.splice(0, 5));

    //Send all information regarding client to server
    
  }

  render () {
    return (
      <div className="row">
        <div className="col-lg-7" style={this.styleText}>
            <h3>{this.showGreeting()}</h3>
            <List businesses={this.state.businesses}/>
        </div>
        <div className="col-lg-5" style={this.styleMap}>
            <Maps lat={this.state.latitude} lng={this.state.longitude} />
        </div> 
      </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));