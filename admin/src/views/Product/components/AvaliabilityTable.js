import React from 'react';

export default function AvaliabilityTable() {
  return (
<table style={{width: '100%'}}>
  <tr>
    <th></th>
    <th style={{textAlign: 'left'}}>Classic</th>
    <th style={{textAlign: 'left'}}>Elite</th>
    <th style={{textAlign: 'left'}}>Elite Free Upgrade</th>
  </tr>
  <tr>
    <td>4/4</td>
    <td><input type="checkbox" /></td>
    <td><input type="checkbox" /></td>
    <td><input type="checkbox" /></td>
  </tr>
  <tr>
    <td>3/4</td>
    <td><input type="checkbox" /></td>
    <td><input type="checkbox" /></td>
    <td><input type="checkbox" /></td>
  </tr>
  <tr>
    <td>1/2</td>
    <td><input type="checkbox" /></td>
    <td><input type="checkbox" /></td>
    <td><input type="checkbox" /></td>
  </tr>
  <tr>
    <td>1/4</td>
    <td><input type="checkbox" /></td>
    <td><input type="checkbox" /></td>
    <td><input type="checkbox" /></td>
  </tr>
  <tr>
    <td>1/8</td>
    <td><input type="checkbox" /></td>
    <td><input type="checkbox" /></td>
    <td><input type="checkbox" /></td>
  </tr>
  <tr>
    <td>1/10</td>
    <td><input type="checkbox" /></td>
    <td><input type="checkbox" /></td>
    <td><input type="checkbox" /></td>
  </tr>

</table>
  );
}
