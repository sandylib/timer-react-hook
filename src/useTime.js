import { useState, useEffect, useRef } from 'react';

/* ----------------------react hook count down --------------------- */

export default function useTimer(settings) {
  const { expiryTimestamp: expiry, onExpire } = settings || {};
  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry);

  const [seconds, setSeconds] = useState(0);
  function subtractSecond(countUp) {
    setSeconds(prevSeconds => {
      if(countUp) { //from negative count up
        if(prevSeconds === -59) {
          subtractMinute(countUp);
          return 0;
        } 
        return prevSeconds - 1;
      }
      else { // from positive count down
        if(prevSeconds === 0) {
          subtractMinute(countUp);
          return 59;
        } else if(prevSeconds > 0) {
          return prevSeconds - 1;
        }
        return 0;
      } 
    });
  }


  const [minutes, setMinutes] = useState(0);
  function subtractMinute(countUp) {
    setMinutes(prevMinutes => {
      if(countUp) {
        if (prevMinutes === -59) {
          subtractHour(countUp);
          return 0;
        } 
        return prevMinutes - 1;

      } else {
        if (prevMinutes === 0) {
          subtractHour(countUp);
          return 59;
        } else if(prevMinutes > 0) {
          return prevMinutes - 1;
        }
        return 0;
      }
    });
  }

  const [hours, setHours] = useState(0);
  function subtractHour(countUp) {
    setHours(prevHours => {
      if(countUp) {
        if (prevHours === -23) {
          subtractDay();
          return 0;
        } 
        return prevHours - 1;

      }else {

        if (prevHours === 0) {
          subtractDay(countUp);
          return 23;
        } else if(prevHours > 0) {
          return prevHours - 1;
        }
        return 0;
      }
    });
  }

  const [days, setDays] = useState(0);
  function subtractDay(countUp) {
    setDays(prevDays => {
      if(countUp) {
        return prevDays - 1;
      }
      else {
        if(prevDays > 0) {
          return prevDays - 1;
        }
        reset();
        isValidOnExpire(onExpire) && onExpire();
        return 0;
      }
    });
  }

  const intervalRef = useRef();

  function start() {
    if(isValidExpiryTimestamp(expiryTimestamp) && !intervalRef.current) {
      let distance = calculateExpiryDate();
      intervalRef.current = setInterval(() => {
        if(distance <= 0) {
          subtractSecond(true);
        } else {
          subtractSecond(false);
        }
        distance--;
      } , 1000);
    } 
  }


  function reset() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setDays(0);
  }


  // Timer expiry date calculation
  function calculateExpiryDate() {
    var now = new Date().getTime();
    var distance = expiryTimestamp - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setSeconds(seconds);
      setMinutes(minutes);
      setHours(hours);
      setDays(days);

      return (seconds + minutes * 60 + hours * 60 * 60 + days * 24 *  60 * 60);
  }

  // didMount effect
  useEffect(() => {
    start();
    return reset;
  },[expiryTimestamp]);


  // Validate expiryTimestamp
  function isValidExpiryTimestamp(expiryTimestamp) {
    const isValid = (new Date(expiryTimestamp)).getTime() > 0;
    if(!isValid) {
      console.warn('rubix-timer-hook: { useTimer } Invalid expiryTimestamp settings', expiryTimestamp);
    }
    return isValid;
  }

  // Validate onExpire
  function isValidOnExpire(onExpire) {
    const isValid = onExpire && typeof onExpire === 'function';
    if(onExpire && !isValid) {
      console.warn('rubix-timer-hook: { useTimer } Invalid onExpire settings function', onExpire);
    }
    return isValid;
  }

  return { seconds, minutes, hours, days, start };
}

export const countUp = ({days, hours, minutes, seconds}) => {
  return days <0 || hours < 0 || minutes < 0 || seconds < 0 || days === hours === minutes === seconds;
}
