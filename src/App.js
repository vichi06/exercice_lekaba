import "./App.css";
import React from "react";

import data from "./exercice_lekaba.csv";
import { readRemoteFile } from "react-papaparse";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import GoogleMap from "./GoogleMap";

class Item extends React.Component {
  render() {
    var images = this.props.item.images;
    var images_array = [];
    if (images === undefined) {
    } else {
      images_array = images.split("|");
    }
    return (
      <div>
        <div>{this.props.item.name}</div>
        <Carousel showThumbs={false}>
          {images_array.map((image) => {
            return (
              <div>
                <img src={image} alt="" />
              </div>
            );
          })}
        </Carousel>
        <div>{this.props.item.address}</div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentDidMount() {
    readRemoteFile(data, {
      header: true,
      complete: (results) => {
        var data = [];
        results.data.forEach((element) => {
          data.push(element);
        });
        this.setState({ data: data });
      },
    });
  }

  render() {
    return (
      <div className="App">
        <div className="left-side">
          {this.state.data.map((element) => {
            return <Item item={element} key={element.id} />;
          })}
        </div>
        <div className="right-side">
          <GoogleMap data={this.state.data}></GoogleMap>
        </div>
      </div>
    );
  }
}

export default App;
