import React from "react";
import ReactDOM from "react-dom";
import Countdown from "react-countdown";
import moment from 'moment'

const renderTime = ({ remainingTime }) => {

  if (remainingTime === 0) {
    return <div className="timer">Time End</div>;
  }

  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
};

function Counter({sDate, eDate}) {
  let mydate = 0;
  let startDate = Date.parse(sDate)
  let endDate = Date.parse(eDate)
  console.log("startDate", startDate)
  console.log("endDate", endDate)
  console.log("Date.now()", startDate - Date.now() )
  console.log("moment(startDate).isBefore(Date.now()", moment(Date.now()).isBefore(startDate))
//   if (startDate-Date.now() > 0 ) {
//     mydate = Math.abs(startDate - Date.now());
//   }
//   else {
//     mydate = endDate;
//   }
//   console.log("mydate", mydate)
// // console.log(moment(c).seconds())
  return (
    <div className="App">
      {moment(Date.now()).isBefore(startDate) ?
        <div>
          <span style={{ fontWeight: "bold" }}>Start at: </span>
          <span style={{ color: "red", fontWeight: "bold"  }}><Countdown date={startDate ? startDate : Date.now()} /></span>
        </div>
        :
        <div>
          <span style={{ fontWeight: "bold" }}>End at: </span>
          <span style={{ color: "red", fontWeight: "bold"  }}><Countdown date={endDate ? endDate : Date.now()} /></span>    
        </div>
      }
    
      
    </div>
  );
}

export default Counter;