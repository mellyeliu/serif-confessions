import React, { useState } from 'react';

function DatePicker({date, changeDate, today}) {
  return (
    // <div style={{ color: "grey", float: 'center', marginRight: 'auto', marginLeft: 'auto', width: '50%', alignItems: 'center' }}>
    //       <h4 style={{ marginBlockEnd: "0", }}>{formattedDate}</h4>
    //     </div>
    <div className="no-select" style={{ textSelection: "none", color: "grey", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* <h4 style={{textSelection: "none", cursor: 'pointer'}} onClick={() => changeDate(-1)}>&lt;</h4> */}
      <h4 style={{ marginBlockEnd: "0", }}>{date}</h4>
      {/* {(date !== today) ? <h4 style={{cursor: 'pointer'}} onClick={() => changeDate(1)}>&gt;</h4> : <div style={{width: 15}}/> } */}
    </div>
  );
}

export default DatePicker;
