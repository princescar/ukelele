import React from 'react';
import Spinner from 'react-md-spinner';

import '../styles/loading.scss';

export default ({ isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="loading">
        <Spinner size={36} />
      </div>
    );
  } else if (error) {
    return (
      <div className="loading error">
        <div className="title">
          发生错误：
          {error.code}
        </div>
        <pre className="detail">{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  } else {
    return null;
  }
};
