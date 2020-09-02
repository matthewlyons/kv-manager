import React, { useEffect, useMemo, useState } from 'react';

import moment from 'moment';

import Loading_Spinner from '../../components/Loading_Spinner';

import { makeRequest } from '../../util';
import Circle_Animation from '../../components/Circle_Animation';
import Table from '../../components/Table';

export default function Teacher_Dashboard(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  let { id } = props.match.params;

  useEffect(() => {
    makeRequest('post', `/teachers/${id}`, {
      authToken: window.authToken
    })
      .then((res) => {
        console.log(res);
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        // TODO Error Handling
        setLoading(false);
      });
  }, [window]);

  let teacher = useMemo(() => {
    return data.teacher;
  }, [data]);

  let properName = useMemo(() => {
    if (teacher) {
      let result =
        teacher.title && teacher.title != 'N/A'
          ? `${teacher.title}. ${teacher.firstName} ${teacher.lastName}`
          : `${teacher.firstName} ${teacher.lastName}`;
      return result;
    }
  }, [teacher]);

  let pointEvents = useMemo(() => {
    let result = data.pointEvents?.map((event) => {
      return [
        moment(event.date).format('MM/DD/YYYY'),
        `${event.points} Points`,
        event.type
      ];
    });
    if (result) {
      return result;
    } else {
      return [];
    }
  }, [data]);

  return (
    <React.Fragment>
      {loading ? (
        <section className="PaddingTopBottom">
          <Loading_Spinner title="Loading Teacher Info" />
        </section>
      ) : (
        <section className="PaddingTopBottom">
          <div
            className="PaddingTopBottom"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <h3>Welcome {properName}.</h3>
            {/* <button className="btn">View Teacher Store</button> */}
          </div>
          <div className="divider"></div>
          <div className="PaddingTopBottom TeacherPoints">
            <div style={{ width: '250px', margin: 'auto' }}>
              <Circle_Animation>
                <g className="circle-label">
                  <text x="50%" y="50%" className="circle-percentage">
                    {teacher.points}
                  </text>
                  <text x="50%" y="50%" className="circle-text">
                    Points
                  </text>
                </g>
              </Circle_Animation>
            </div>
            <div>
              <h3 className="TextCenter">Recent Transactions</h3>
              <Table
                headers={['Date', 'Points', 'Event']}
                values={pointEvents}
              />
            </div>
          </div>
          <div className="divider"></div>
        </section>
      )}
    </React.Fragment>
  );
}
