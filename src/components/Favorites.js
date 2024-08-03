import React, { Component } from 'react';
import Navigation from "./Navigation";
import Jumbo from "./Jumbo";
import Footer from "./Footer";
import Cards from "./Cards";
import { auth, db } from '../firebase/firebase';
import { withRouter } from "react-router-dom";

const INITIAL_STATE = {
  userDetails: null,
  loading: true
};

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      history: props.history
    };
  }

  componentDidMount() {
    this.fetchUserDetails();
  }

  fetchUserDetails = async () => {
    try {
      if (auth.currentUser) {
        const snapshot = await db.ref('users/' + auth.currentUser.uid).once('value');
        if (snapshot.exists()) {
          const userDetails = snapshot.val();
          this.setState({ userDetails, loading: false });
        } else {
          this.setState({ userDetails: null, loading: false });
        }
      } else {
        this.setState({ userDetails: null, loading: false });
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      this.setState({ userDetails: null, loading: false });
    }
  };

  render() {
    const { userDetails, loading } = this.state;

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <div className="App">
        <Navigation />
        <div className="container">
          <Jumbo text={"Your Favorites"} />
          <div className="cards_together">
            {
              userDetails && userDetails.personFavorites && userDetails.personFavorites.length > 0 ?
                <Cards isFavorite={true} results={userDetails.personFavorites} userDetails={userDetails} /> :
                <p>There are No Favorites in Your Persons List</p>
            }
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);
