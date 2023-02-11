import React from 'react';


export default function Summary({children, title}) {
  return (
    <details class="alert alert--info" style={{margin: 0, cursor: 'grab'}}><summary>
    {title}
    </summary>
    <div style={{padding: 10}}>{children}</div>
    </details>
  );
}
