import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import { ReactComponent as WalletIcon } from '../assets/my-wallet.svg';
import { ReactComponent as CouponIcon } from '../assets/my-coupon.svg';
import { ReactComponent as BonusPointsIcon } from '../assets/my-bonus-points.svg';
import { ReactComponent as FavoritesIcon } from '../assets/my-favorites.svg';
import '../styles/mine.scss';

export default class extends Component {
  render() {
    return (
      <div className="mine">
        <Helmet>
          <title>我的</title>
        </Helmet>
        <div className="header">
          <div className="setting" />
          <div className="avatar">
            <img
              src="https://cdn.v2ex.com/avatar/f555/766f/133974_large.png?m=1440057915"
              alt=""
            />
            某某某
          </div>
          <ul className="my-list">
            <li className="item">
              <WalletIcon className="icon" />
              <div className="name">钱包</div>
              <div className="note">￥20.00</div>
            </li>
            <li className="item">
              <CouponIcon className="icon" />
              <div className="name">优惠券</div>
              <div className="note">3张</div>
            </li>
            <li className="item">
              <BonusPointsIcon className="icon" />
              <div className="name">积分</div>
              <div className="note">200</div>
            </li>
            <li className="item">
              <FavoritesIcon className="icon" />
              <div className="name">收藏</div>
              <div className="note">6</div>
            </li>
          </ul>
        </div>
        <ul className="order-status-tabs">
          <li className="active">全部订单</li>
          <li>待付款</li>
          <li>待收货</li>
        </ul>
        <ul className="order-list">
          {[1, 2, 3].map(x => (
            <li className="card" key={x}>
              <img
                className="thumbnail"
                src="https://i.loli.net/2018/10/14/5bc2c24337531.png"
                alt=""
              />
              <div className="summary">
                <div className="title">
                  <div className="store">绝对沙拉文一西路店</div>
                  <div className="status">已完成</div>
                </div>
                <div className="time">下单时间：2018-08-28 18:00:00</div>
                <div className="info">¥ 28.00</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
