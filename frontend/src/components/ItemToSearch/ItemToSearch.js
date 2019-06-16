import React from "react";
import "./ItemToSearch.css";

class ItemToSearch extends React.Component {
  render() {
    return (
      <div className="ItemToSearch">
        <div className="image-container">
          <img
            src={this.props.business.imageSrc}
            alt={this.props.business.name}
          />
        </div>
        <h2>{this.props.business.name}</h2>
        <div className="ItemToSearch-information">
          <div className="ItemToSearch-address">
            <p>{this.props.business.address}</p>
            <p>{this.props.business.city}</p>
            <p>
              {this.props.business.state}, {this.props.business.zipCode}
            </p>
          </div>
          <div className="ItemToSearch-reviews">
            <h3>{this.props.business.category}</h3>
            <h3 className="rating">{this.props.business.rating} stars</h3>
            <p>{this.props.business.reviewCount} reviews</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemToSearch;
