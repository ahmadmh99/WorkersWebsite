import React, { Component } from 'react';
import Card from './CardUI';

class Cards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: null
        };
        this.updateFavoritesObject = this.updateFavoritesObject.bind(this);
    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.results !== nextProps.results) {
          return { results: nextProps.results };
        }
      
        return null;
    }

    updateFavoritesObject(value) {
        this.setState(() => {
            // Important: read `state` instead of `this.state` when updating.
            return {results: value}
        });    
    }

    render() {
        return (
            <div className="container-fluid d-flex justify-content-center">
                <div className="row" style={{ width: '100%' }}>
{
                        this.state.results?.map((oneCard, index) => (
                            <div className="col-md-4 individual_card" key={index}>
                                <Card
                                    updateFavoritesObject={this.updateFavoritesObject}
                                    userDetails={this.props.userDetails}
                                    isFavorite={this.props.isFavorite}   
                                    cardId={oneCard.id.value}
                                    image={new URL(oneCard.picture.medium && oneCard.picture.medium !== "N/A" ? oneCard.picture.medium : "https://source.unsplash.com/800x500")}
                                    title={oneCard.name.first +' '+ oneCard.name.last}
                                    text={oneCard.age}
                                    card={oneCard}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default Cards;
