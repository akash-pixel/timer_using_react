import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [time, setTime ] = useState(0);
  const [tstr, setTstr ] = useState("00:00:00:00");
  const [running, setRunning ] = useState(false);
  const [laps, setLaps] =useState([]);

  function Reset(){
    setTime(0);
    setTstr("00:00:00:00");
    setRunning(false);
    setLaps([]);
  }
  
  useEffect(()=>{
    if(running){
      let val = setInterval( ()=>{ setTime(time+1)},100 )

      let hour = Math.floor(time/36000);
      let min = Math.floor(time/600);
      let sec = Math.floor((time/10)%60);

      setTstr( hour +":"+ min +":" + sec +":"+time%10 )
      return ()=>{ clearInterval(val) };
    }
  },[running,time])

  return (
    <div className="App">
      
      {/* <p> {time}</p> */}
      <p className='timer'> {tstr}</p>
      
      <span className='buttons'>
      <button onClick={()=>{ setRunning(true) } } >Start</button> 
      <button onClick={ ()=>{ setRunning(false) } } > Stop  </button>
      <button onClick={ Reset } > Reset  </button>
      <button onClick={()=>{ setLaps(laps.concat(tstr) ); } } > Lap  </button>
      </span>

      <div className='laps'>
        <p>Laps</p>
        <ol>
        {laps.map((lap,i)=>{return <li key={i}>{lap}</li> }) }
        </ol>
      </div>
      
    </div>
  );
}

export default App;
