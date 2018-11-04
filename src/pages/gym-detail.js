import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { addHours, startOfHour } from 'date-fns';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import DateTimePicker from 'rmc-date-picker';
import zhLocale from 'rmc-date-picker/lib/locale/zh_CN';
import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.css';

import Rating from '../components/rating';
import Modal from '../components/modal';
import '../styles/gym-detail.scss';
import '../styles/book-sport-modal.scss';

export default class extends Component {
  constructor() {
    super();
    this.state = {
      gym: null,
      bookingService: null,
      showBookModal: false,
      selectedTime: null,
      mobile: '',
    };
  }

  componentDidMount() {
    this.loadData();
    this.setState({
      minTime: startOfHour(addHours(new Date(), 1)),
      selectedTime: startOfHour(addHours(new Date(), 1)),
      mobile: '',
    })
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
      bookingService: service,
      showBookModal: true,
    });
  }

  onBookTimeChange(newTime) {
    this.setState({
      selectedTime: newTime,
    });
  }

  onMobileChange(newMobile) {
    this.setState({
      mobile: newMobile,
    });
  }

  async confirmBook() {
    const { bookingService, selectedTime, mobile } = this.state;
    await axios.post('/bookings', {
      serviceId: bookingService.id,
      bookingDateTime: selectedTime,
      mobile,
    });

    alert('预定成功！');

    this.setState({
      showBookModal: false,
    })
  }

  giveUpBook() {
    this.setState({
      selectedTime: '',
      showBookModal: false,
    });
  }

  render() {
    const { gym, showBookModal, minTime, selectedTime, mobile } = this.state;

    return (
      gym && (
        <div className="gym-detail">
          <Helmet>
            <title>{gym.name}</title>
          </Helmet>
          <div className="banner">
            <Carousel
              showArrows={false}
              showStatus={false}
              showThumbs={false}
              infiniteLoop={true}
              autoPlay={true}
              interval={5000}
              emulateTouch={true}
            >
              {gym.pics.map(x => (
                <div className="content" key={x}>
                  <img src={x} alt="" />
                </div>
              ))}
            </Carousel>
            <div className="image-count">{gym.pics.length}</div>
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
            isOpen={showBookModal}
            onClose={() => this.giveUpBook()}
          >
            <div className="body">
              <DateTimePicker
                defaultDate={selectedTime}
                date={selectedTime}
                mode="datetime"
                minDate={minTime}
                locale={zhLocale}
                onDateChange={x => this.onBookTimeChange(x)}
              />
              <input
                type="text"
                value={mobile}
                placeholder="请输入手机号"
                onChange={e => this.onMobileChange(e.target.value)}
              />
            </div>
            <div className="footer">
              <div className="button" onClick={() => this.confirmBook()}>
                预定
              </div>
            </div>
          </Modal>
        </div>
      )
    );
  }
}
