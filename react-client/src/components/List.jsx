import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
  	<span>Some awesome suggestions...</span>
    { props.businesses.map((business, index) => <ListItem business={business} key={index} />)}
  </div>
)

export default List;

//    <p><span>There are { props.businesses.length } places </span></p>