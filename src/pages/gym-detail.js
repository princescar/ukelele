import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';

import Rating from '../components/rating';
import '../styles/gym-detail.scss';

export default class extends Component {
  constructor() {
    super();
    this.state = {
      gym: null,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const { id } = this.props.match.params;
    const resp = await axios.get(`/gyms/${id}`);
    this.setState({
      gym: resp.data,
    });
  }

  render() {
    const { gym } = this.state;

    return (
      gym && (
        <div className="gym-detail">
          <Helmet>
            <title>{gym.name}</title>
          </Helmet>
          <div className="banner">
            <img src={gym.image} alt="" />
            <div className="image-count">{gym.pics}</div>
          </div>
          <div className="card">
            <div className="title">
              <h1>
                {gym.name}
                <Rating score={gym.rating} />
              </h1>
              {gym.favor && <i className="icon favor" />}
              {!gym.favor && <i className="icon unfavor" />}
            </div>
            <div className="note">
              营业时间：
              {gym.open} {gym.address.region.name} {gym.category}
            </div>
            <div className="description">{gym.description}</div>
          </div>
          <div className="location">{gym.address.details}</div>
          <ul className="sport-list">
            {gym.services.map(x => (
              <li key={x.id} className="sport">
                <div className="wrapper">
                  <div className="title">{x.name}</div>
                  <div className="description">{x.description}</div>
                </div>
                <div className="book">预定</div>
              </li>
            ))}
          </ul>
        </div>
      )
    );
  }
}
