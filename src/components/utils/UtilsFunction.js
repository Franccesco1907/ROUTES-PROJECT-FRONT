import React, { useState, useEffect, useRef } from "react";

const useEffectOnce=( effect )=> {

    const destroyFunc = useRef();
    const effectCalled = useRef(false);
    const renderAfterCalled = useRef(false);
    const [val, setVal] = useState(0);
  
    if (effectCalled.current) {
        renderAfterCalled.current = true;
    }
  
    useEffect( ()=> {
  
        // only execute the effect first time around
        if (!effectCalled.current) { 
          destroyFunc.current = effect();
          effectCalled.current = true;
        }
  
        // this forces one render after the effect is run
        setVal(val => val + 1);
  
        return ()=> {
          // if the comp didn't render since the useEffect was called,
          // we know it's the dummy React cycle
          if (!renderAfterCalled.current) { return; }
          if (destroyFunc.current) { destroyFunc.current(); }
        };
    }, []);
  };

const useInterval=(callback, delay)=> {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const javaStringDateToDate=(string)=>{
  let newString=string.split('+')[0];
  let date=newString.split('T')[0];
  let time=newString.split('T')[1];
  let year, month, day, hour, min, sec, ms;
  year = date.split("-")[0];
  month = date.split("-")[1];
  day = date.split("-")[2];
  hour = time.split(":")[0];
  min = time.split(":")[1];
  sec=time.split(":")[2].split(".")[0];
  ms=time.split(":")[2].split(".")[1];

  return new Date(year,month-1,day,hour,min,sec,ms);
}

export default {
  useEffectOnce,
  useInterval,
  javaStringDateToDate,
};
