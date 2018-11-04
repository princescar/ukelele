import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Markdown from 'react-markdown';
import axios from 'axios';

import '../styles/food-detail.scss';

export default class extends Component {
  constructor() {
    super();
    this.state = {
      food: null,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const { id } = this.props.match.params;
    const resp = await axios.get(`/foods/${id}`);
    this.setState({
      food: resp.data,
    });
  }

  render() {
    const { food } = this.state;

    return (
      food && (
        <div className="food-detail">
          <Helmet>
            <title>{food.name}</title>
          </Helmet>
          <div className="banner">
            <img src={food.image} alt="" />
          </div>
          <div className="card">
            <div className="title">
              <h1>
                {food.name}
                <span className="heat">{food.heat} Kcal</span>
              </h1>
              <div className="price">¥{food.price}</div>
            </div>
            <div className="actions">
              {food.favor && <i className="icon favor" />}
              {!food.favor && <i className="icon unfavor" />}
              <i className="icon order" />
            </div>
          </div>
          <div className="store">{food.spplr.name}</div>
          <div className="description">
            <Markdown source={food.description} />
          </div>
        </div>
      )
    );
  }
}
