import React, {Component} from 'react';
import ItemToSearchList from './ItemToSearch/ItemToSearchList/ItemToSearchList';
import SearchBar from './SearchBar/SearchBar'
import Yelp from "./util/Yelp";
import "./FoodSearch.css";

class FoodSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
          businesses: []
        };
    
        this.searchYelp = this.searchYelp.bind(this);
    }
    searchYelp(term, location, sortBy) {
        Yelp.search(term, location, sortBy).then(businesses => {
            this.setState({
            businesses: businesses
            });
        });
    }

    render() {
        return (
            <div className="FoodSearch" style={{marginTop: '1em'}}>
                <SearchBar searchYelp={this.searchYelp} />
                <ItemToSearchList businesses={this.state.businesses} />
            </div>
        );
    }
}

export default FoodSearch;