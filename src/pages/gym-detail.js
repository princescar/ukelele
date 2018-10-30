import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { format } from 'date-fns';

import Rating from '../components/rating';
import Modal from '../components/modal';
import '../styles/gym-detail.scss';
import '../styles/book-sport-modal.scss';

export default class extends Component {
  constructor() {
    super();
    this.state = {
      gym: null,
      bookingSevice: null,
      showSelectDate: false,
      selectedDate: '',
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

  book(service) {
    this.setState({
      bookingSevice: service,
      showSelectDate: true,
      selectedDate: format(new Date(), 'YYYY-MM-DD'),
    });
  }

  onBookDateChange(newDate) {
    this.setState({
      selectedDate: newDate,
    });
  }

  async confirmBook() {}

  giveUpBook() {
    this.setState({
      selectedDate: '',
      showSelectDate: false,
    });
  }

  render() {
    const { gym, showSelectDate, selectedDate } = this.state;

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
                <div className="book" onClick={() => this.book(x)}>
                  预定
                </div>
              </li>
            ))}
          </ul>
          <Modal
            mask="dark"
            className="book-sport"
            isOpen={showSelectDate}
            onClose={() => this.giveUpBook()}
          >
            <div className="body">
              <input
                id="selectDate"
                type="date"
                value={selectedDate}
                onChange={e => this.onBookDateChange(e.target.value)}
              />
            </div>
            <div className="footer">
              <div className="button" onClick={() => this.confirmBook()}>预定</div>
            </div>
          </Modal>
        </div>
      )
    );
  }
}
