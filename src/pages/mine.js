import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Calendar from 'react-calendar-mobile';
import { parse, format, isSameDay } from 'date-fns';

import { ReactComponent as WalletIcon } from '../assets/my-wallet.svg';
// import { ReactComponent as CouponIcon } from '../assets/my-coupon.svg';
import { ReactComponent as BonusPointsIcon } from '../assets/my-bonus-points.svg';
import { ReactComponent as FavoritesIcon } from '../assets/my-favorites.svg';
import '../styles/mine.scss';

export default class extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
      selectedDate: new Date(),
    };
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const resp = await axios.get('/bookings');
    this.setState({
      orders: resp.data,
    });
  }

  onSelectDate(newDate) {
    console.log(newDate);
    this.setState({
      selectedDate: newDate,
    });
  }

  render() {
    const { orders, selectedDate } = this.state;

    const events = {};
    orders.forEach(
      x => (events[format(parse(x.bookingDate), 'YYYY-MM-DD')] = true)
    );

    const dayOrders = orders.filter(x =>
      isSameDay(parse(x.bookingDate), selectedDate)
    );

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
              {/* <div className="note">￥20.00</div> */}
            </li>
            {/* <li className="item">
              <CouponIcon className="icon" />
              <div className="name">优惠券</div>
              <div className="note">3张</div>
            </li> */}
            <li className="item">
              <BonusPointsIcon className="icon" />
              <div className="name">订单</div>
              {/* <div className="note">1笔待支付</div> */}
            </li>
            <li className="item">
              <FavoritesIcon className="icon" />
              <div className="name">收藏</div>
              {/* <div className="note">6</div> */}
            </li>
          </ul>
        </div>
        <Calendar
          i18n="zh-CN"
          decorate={events}
          selectedDate={selectedDate}
          onSelectDate={x => this.onSelectDate(x)}
        />
        <ul className="order-status-tabs">
          <li className="active">{format(selectedDate, 'YYYY-MM-DD')}</li>
        </ul>
        <ul className="order-list">
          {dayOrders.map(x => (
            <li className="card" key={x.id}>
              <div className="summary">
                <div className="title">{x.service.name}</div>
                <div className="title">
                  <div className="store">{x.gym.name}</div>
                  <div className="status">{format(x.bookingDate, 'HH:mm')}</div>
                </div>
                <div className="info">
                  {x.mobile}
                </div>
              </div>
            </li>
          ))}
          {(!dayOrders || dayOrders.length === 0) && (
            <div class="empty">该日无预约</div>
          )}
        </ul>
      </div>
    );
  }
}
