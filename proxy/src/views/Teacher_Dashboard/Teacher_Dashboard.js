import React, { useEffect, useMemo, useState } from 'react';

import moment from 'moment';

import Loading_Spinner from '../../components/Loading_Spinner';

import { makeRequest } from '../../util';
import Circle_Animation from '../../components/Circle_Animation';
import Table from '../../components/Table';

export default function Teacher_Dashboard(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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
        console.log(err);
        setError(err);
        setLoading(false);
      });
  }, [window]);

  let teacher = useMemo(() => {
    return data;
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
    let result = data?.orders?.map((event) => {
      return [
        moment(event.date).format('MM/DD/YYYY'),
        `${event.total} Points`,
        event.status
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
        <React.Fragment>
          {error ? (
            <section className="PaddingTopBottom TextCenter">
              <h2>Whoops!</h2>
              <h2>{error.errors[0].message}</h2>
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
                {/* <button className="btn" style={{ margin: 0 }}>
                  View Teacher Store
                </button> */}
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
                {pointEvents.length > 0 && (
                  <div>
                    <h3 className="TextCenter">Recent Transactions</h3>
                    <Table
                      headers={['Date', 'Points', 'Status']}
                      values={pointEvents}
                    />
                  </div>
                )}
              </div>
              <div className="divider"></div>
            </section>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
