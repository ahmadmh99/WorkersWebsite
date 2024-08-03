import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {Container } from "react-bootstrap";
import MainBanner from "./Banner";

import Footer from './Footer';
import Navigation from './Navigation';

const About_US = ({ history }) => (
  <div>
    <Navigation />
    <div className="div-flex" style={{marginTop: "110px"}}>
      <center>
        <About_Us/>
      </center>
      <br/>
      <Footer />
    </div>
  </div>
);


const INITIAL_STATE = {
  name: "Ahmad Mhamid ",
  email: "mhameeedahmad@gmail.com ",
  education: "Software Engineering",
  Address:"Ariel University"
  ,Since:"2024"
};

// TODO need to change Author details


class About_Us extends Component {
  state = {
    ...INITIAL_STATE
  };



  render() {
    const {
      name,
      email,
      passwordOne,
      passwordTwo,
      age
    } = this.state;

    return (
      <div className="inputclass">
        <Container>
          <h2 id="mytexth2">About Me</h2>
          <h5 id="mytexth5">Authors Name : {this.state.name}</h5>
          <h5 id="mytexth5">Authors Email : {this.state.email}</h5>
         
          <h5 id="mytexth5">Authors Education : {this.state.education}</h5>
          <h5 id="mytexth5">University : {this.state.Address}</h5>
          <h5 id="mytexth5">this Website was made in  : {this.state.Since}</h5>
          
          
          
        <MainBanner />


        </Container>
      </div>
    );
  }
}

export default withRouter(About_US);

