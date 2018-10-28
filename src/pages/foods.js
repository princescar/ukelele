import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import ContentLoader from 'react-content-loader';

import { ReactComponent as SlimIcon } from '../assets/food-tag-slim.svg';
import { ReactComponent as ShapingIcon } from '../assets/food-tag-shaping.svg';
import { ReactComponent as BreakfastIcon } from '../assets/food-tag-breakfast.svg';
import { ReactComponent as LunchIcon } from '../assets/food-tag-lunch.svg';
import { ReactComponent as SupperIcon } from '../assets/food-tag-supper.svg';
import '../styles/foods.scss';

export default class extends Component {
  constructor() {
    super();
    this.state = {
      tags: [
        {
          name: '减脂瘦身',
          icon: <SlimIcon />,
        },
        {
          name: '增肌塑形',
          icon: <ShapingIcon />,
        },
        {
          name: '早餐',
          icon: <BreakfastIcon />,
        },
        {
          name: '中餐',
          icon: <LunchIcon />,
        },
        {
          name: '晚餐',
          icon: <SupperIcon />,
        },
      ],
      foods: null,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const resp = await axios.get(`/searchFoods`);
    this.setState({
      foods: resp.data,
    });
  }

  render() {
    const { tags, foods } = this.state;

    return (
      <div className="foods">
        <Helmet>
          <title>健康饮食</title>
        </Helmet>
        <div className="header">
          <div className="search-bar" onClick={() => {}}>
            30天健身餐
          </div>
          <ul className="tag-list">
            {tags.map(x => (
              <li key={x.name} className="item">
                {x.icon}
                {x.name}
              </li>
            ))}
          </ul>
        </div>
        {tags.map(x => (
          <div key={x.name} className="food-list">
            <div className="list-title">
              <div className="name">{x.name}</div>
              <div className="count">123</div>
            </div>
            <ul>
              {!foods &&
                [1, 2, 3].map(x => (
                  <li key={x} className="card placeholder">
                    <ContentLoader
                      height={190}
                      width={135}
                      speed={2}
                      primaryColor="#f3f3f3"
                      secondaryColor="#ecebeb"
                    >
                      <rect
                        x="0"
                        y="0"
                        rx="5"
                        ry="5"
                        width="135"
                        height="135"
                      />
                      <rect
                        x="45"
                        y="147"
                        rx="5"
                        ry="5"
                        width="45"
                        height="14"
                      />
                      <rect
                        x="35"
                        y="170"
                        rx="5"
                        ry="5"
                        width="65"
                        height="10"
                      />
                    </ContentLoader>
                  </li>
                ))}
              {foods &&
                foods.map(x => (
                  <li key={x.id} className="card">
                    <img src={x.image} alt="" />
                    <div className="name">{x.name}</div>
                    <div className="heat">{x.heat} Kcal</div>
                  </li>
                ))}
              <li className="spacer" />
            </ul>
          </div>
        ))}
      </div>
    );
  }
}
