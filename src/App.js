import React from 'react';
import './App.css';
import useTime, { countUp } from './useTime';


function TimeToJump({ expiryTimestamp }) { 
  const {
    seconds,
    minutes,
    hours,
    days
  } = useTime({ expiryTimestamp });

  return (
     <div className={'container'} >
        <div className={`${countUp({days, hours, minutes, seconds}) ? 'countup' : 'countdown'}`}>
              {`
              ${Math.abs(days) ? Math.abs(days) + ':' : ''}
              ${Math.abs(hours) ?  Math.abs(hours) + 'h ': ''} 
              ${Math.abs(minutes) ? Math.abs(minutes) + 'm' : ''}
              ${Math.abs(seconds) >= 0 ? Math.abs(seconds) + 's ': ''}`} 
              {`${countUp({days, hours, minutes, seconds}) ? 'PAST' : ''}`}
        </div>
    </div>
  );
}


function App() {
  let t = new Date();
  let oneHour = 60*60;
  let twoDay = oneHour * 24 * 2;
  t.setSeconds(t.getSeconds() + 10 ); // 10 minutes timer 

  let t2 = new Date();

  t2.setSeconds(t2.getSeconds() + twoDay + oneHour + 10 ); // 10 minutes timer 
  
  return (
    <div className={'app'}>
       <h1>Ract hook timer countdown</h1>
      
      <h3 >Count from day, hours, minutes and seconds down</h3>
       <TimeToJump key = {1} expiryTimestamp={t2} />

       <br />
       <h3>Count from seconds down</h3>
       <TimeToJump key = {2} expiryTimestamp={t} />
    </div>
  );
}

export default App;
