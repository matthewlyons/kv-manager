import React, { useEffect, useMemo } from 'react';
import { makeRequest } from '../../util';

export default function Teacher_Dashboard(props) {
  let { id } = props.match.params;
  useEffect(() => {
    console.log(window.authToken);
    makeRequest('post', `/teachers/${id}`, { authToken }).then((res) => {
      console.log(res);
    });
  }, [window]);
  return (
    <div>
      <h1>Welcome To The Teacher Dashboard!</h1>
    </div>
  );
}
