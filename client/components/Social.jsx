import React, { useEffect, useState } from 'react';

const axios = require('axios');

// This component was built to view social media feeds of government accounts
// We began locally by targeting the LAFD

const Social = (props) => {
  // Create hook for the alerts state with initial values
  const [social, socialUpdate] = useState([]);

  // Fetch alerts from the backend
  useEffect(() => {
    axios.get('/alerts', {
      params: {
        location: props.location,
        disaster: props.disaster,
      },
    })
      .then((res) => {
        socialUpdate(res.data);
      })
      .catch((err) => console.log('Error in UseEffect get : ', err));
  }, []);

  // Map incoming alerts to anchor tags
  const alerts = social.map((el, i) => (
    <iframe
      title={`Video${i}`}
      key={i}
      className="alertEntry"
      src={`https://www.youtube.com/embed/${el.id.videoId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  ));

  // Spread anchor tags to fill module
  return (
    <>
      {alerts}
    </>
  );
};

export default Social;
