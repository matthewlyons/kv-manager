import React from 'react';
import { head } from 'underscore';

export default function Table(props) {
  let { headers, values } = props;
  return (
    <section className="PaddingTopBottom">
      <table>
        <tr>
          {headers.map((label) => (
            <th key={label}>{label}</th>
          ))}
        </tr>
        {values.map((row, i) => (
          <tr key={i}>
            {row.map((element) => (
              <td key={element}>{element}</td>
            ))}
          </tr>
        ))}
      </table>
    </section>
  );
}
