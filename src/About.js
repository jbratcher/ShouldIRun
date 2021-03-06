import React, { Component } from 'react';
import Header from './header';
import Footer from './Footer';

class About extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    return(

        <section id="aboutSection">

            <Header />

            <section id="about" className="column">

                <h2>About</h2>

                <p>Get a rating on weather conditions for outdoor activities</p>

                <a href="https://jbratcher.github.io/ShouldIRun/" class="button">Demo page</a>

            </section>

            <Footer / >

        </section>

    )

  }

}

  export default About;
