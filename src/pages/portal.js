import React, { Component } from 'react';
import { Switch, Route, Redirect, NavLink } from 'react-router-dom';

import asyncPage from '../utils/async-page';
import { ReactComponent as GymsIcon } from '../assets/tab-gyms.svg';
import { ReactComponent as FoodsIcon } from '../assets/tab-foods.svg';
import { ReactComponent as MineIcon } from '../assets/tab-mine.svg';
import '../styles/portal.scss';

export default class extends Component {
  constructor() {
    super();
    this.state = {
      tabs: [
        {
          path: '/gyms',
          page: 'gyms',
          text: '健身中心',
          icon: <GymsIcon />,
        },
        {
          path: '/foods',
          page: 'foods',
          text: '饮食',
          icon: <FoodsIcon />,
        },
        {
          path: '/mine',
          page: 'mine',
          text: '我的',
          icon: <MineIcon />,
        },
      ],
    };
  }

  render() {
    const { match } = this.props;
    const { tabs } = this.state;

    return (
      <div className="portal">
        <Switch>
          {tabs.map(x => (
            <Route
              key={x.path}
              path={match.path + x.path}
              component={asyncPage(x.page)}
            />
          ))}
          <Redirect from={match.path} to={match.path + tabs[0].path} />
        </Switch>
        <div className="tab-bar">
          {tabs.map(x => (
            <NavLink
              key={x.path}
              className="item"
              activeClassName="active"
              to={match.path + x.path}
              replace={true}
            >
              {x.icon}
              {x.text}
            </NavLink>
          ))}
        </div>
      </div>
    );
  }
}
