import React from 'react';

import '../styles/rating.scss';

export default ({ score }) => (
  <div className="rating">
    <div className={`stars stars-${Math.floor(score * 10)}`} />
  </div>
);
