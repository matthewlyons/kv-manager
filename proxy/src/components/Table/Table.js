import React from 'react';
import { head } from 'underscore';

export default function Table(props) {
  let { headers, values } = props;
  return (
    <section className="PaddingTopBottom">
      <table>
        <thead>
          <tr>
            {headers.map((label) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {values.map((row, i) => (
            <tr key={i}>
              {row.map((element) => (
                <td key={element}>{element}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
