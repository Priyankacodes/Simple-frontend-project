import React from 'react';

class ListItem extends React.Component {
	constructor(props) {
		super(props);

		this.styleStar = {
			width: ((this.props.business.rating) * 100) + '%'
		}

		this.ratings = this.ratings.bind(this)
	}

	ratings(value) {
		var wholestar = Math.floor(this.props.business.rating)
		var temp
		var result = []

		for (var i = 0; i < wholestar; i ++) {
			temp = <span className="glyphicon glyphicon-star" key={i} style={{color:'#BBD41C'}}></span>
			result.push(temp)
		}

		// if (this.props.business.rating > wholestar) {
		// 	temp = <span className="glyphicon glyphicon-star" key={i} style={{color:'#BBD41C'}}></span>
		// }

		return result

	}

	render () {
		return (
		  <div className="row">
		  	<div className="col-xs-2">
		    	<img src={this.props.business.image_url} alt="Img" height="42" width="42"></img>
		    </div>
		    <div className="col-xs-5">
		    	<a href={this.props.business.url} >{ this.props.business.name }</a>
		    	<p>{this.props.business.display_phone}</p>
		    </div>
		    	{this.ratings(this.props.business.rating)}
		  </div>
		)
	}
}

export default ListItem;