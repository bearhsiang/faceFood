import React, {Component} from 'react';
import './ItemToSearchList.css';
import ItemToSearch from '../ItemToSearch.js';

class ItemToSearchList extends Component {
  render() {
    return(
      <div className="ItemToSearchList">
        {
          this.props.businesses.map(function(business) {
            return <ItemToSearch key={business.id} business={business} />;
          })
        }
      </div>
    )
  }
}

export default ItemToSearchList;