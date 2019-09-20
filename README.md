## timer-react-hook

is a customized component for counting down

## `TimeToJump`: example of how to use `timeToJump`

### Example

![Sample](./demo-tick.png?raw=true "time to jump component")

```javascript

import React from 'react';
import './App.css';
import useTime, { countUp } from 'timer-react-hook';


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
  t.setSeconds(t.getSeconds() + 10 ); 
  
  return (
    <div className={'app'}>
       <h1>Ract hook timer countdown</h1>
       <h3>Count from seconds down</h3>
       <TimeToJump expiryTimestamp={t} />
    </div>
  );
}

export default App;

```

### Settings

| key | Type | Required | Description |
| --- | --- | --- | ---- |
| expiryTimestamp | number(timestamp) | YES | it will count down from expiryTimestamp until to 0 then count up with color changes

