import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import ContentLoader from 'react-content-loader';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import humanizeDistance from '../utils/humanize-distance';
import '../styles/gyms.scss';


export default class extends Component {
  constructor() {
    super();
    this.state = {
      slides: [
        {
          image: 'https://i.loli.net/2018/10/13/5bc1e964343c6.jpg',
        },
        {
          image: 'https://i.loli.net/2018/10/13/5bc1e963e155e.jpg',
        },
        {
          image: 'https://i.loli.net/2018/10/13/5bc1e963e8798.jpg',
        },
        {
          image: 'https://i.loli.net/2018/10/13/5bc1e963ef47a.jpg',
        },
      ],
      gyms: null,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const resp = await axios.get(
      `/searchGyms?sort=%2Bdistn,-rating&ulon=120.058360&ulat=30.294300`
    );
    this.setState({
      gyms: resp.data,
    });
  }

  render() {
    const { slides, gyms } = this.state;

    return (
      <div className="gyms">
        <Helmet>
          <title>健身中心</title>
        </Helmet>
        <div className="header">
          <Carousel
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            emulateTouch={true}
          >
            {slides.map(x => (
              <div className="content" key={x.image}>
                <img src={x.image} alt="" />
              </div>
            ))}
          </Carousel>
          <div className="search-bar">健身房</div>
        </div>
        <div className="list-ops">
          <div className="item">
            <select
              className="distance"
              value="nearest"
              onChange={() => this.loadData()}
            >
              <option value="nearest">最近</option>
            </select>
            最近
          </div>
          <div className="item">
            <select
              className="sorting"
              value="default"
              onChange={() => this.loadData()}
            >
              <option value="default">智能排序</option>
            </select>
            智能排序
          </div>
          <div className="item filter">筛选</div>
        </div>
        <ul className="list">
          {!gyms &&
            [1, 2, 3].map(x => (
              <li key={x} className="card loading">
                <ContentLoader
                  height={110}
                  width={375}
                  speed={2}
                  primaryColor="#f3f3f3"
                  secondaryColor="#ecebeb"
                >
                  <rect x="25" y="15" rx="5" ry="5" width="80" height="80" />
                  <rect
                    x="138"
                    y="15"
                    rx="5"
                    ry="5"
                    width="153.27"
                    height="18.56"
                  />
                  <rect
                    x="138"
                    y="52"
                    rx="5"
                    ry="5"
                    width="66.3"
                    height="9.34"
                  />
                  <rect
                    x="138"
                    y="83"
                    rx="5"
                    ry="5"
                    width="183.89"
                    height="6.53"
                  />
                </ContentLoader>
              </li>
            ))}
          {gyms &&
            gyms.map(x => (
              <li className="card" key={x.id}>
                <img className="logo" src={x.image} alt="" />
                <div className="summary">
                  <div className="title">{x.name}</div>
                  <div className="rating">
                    <div
                      className={`stars stars-${Math.floor(x.rating * 10)}`}
                    />
                  </div>
                  <div className="info">
                    <div className="location">
                      {x.address.region.title} {x.category}
                    </div>
                    <div className="distance">
                      {humanizeDistance(x.distance)}
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
