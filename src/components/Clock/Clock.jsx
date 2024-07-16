import { useEffect, useState, useRef } from "react";
import "./Clock.css";
import axios from 'axios';

const Clock = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [quote, setQuote] = useState('');

  const [clock, setClock] = useState({
    handHour: 0, // 0°
    handMin: 0, // 0°
    handSec: 0, // 0°
  });

  const fetchquote=async()=>{
    try {
      const res= await axios.get('https://api.quotable.io/random');
      const fetchedQuote = res.data.content;
      setQuote(fetchedQuote);

    } catch (error) {
      console.error('error fetching quote')
    }
  }

  useEffect(() => {
    fetchquote();
    const intervalId = setInterval(fetchquote, 5000); // Fetch a new quote every 5 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  const [speed, setSpeed] = useState(1);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = (now - startTime.current) / 1000; // elapsed time in seconds
      const adjustedElapsed = elapsed * speed;

      const adjustedDate = new Date(startTime.current - Math.sign(speed) * adjustedElapsed * 1000);

      const hours = adjustedDate.getHours();
      const minutes = adjustedDate.getMinutes();
      const seconds = adjustedDate.getSeconds();
      const milliseconds = adjustedDate.getMilliseconds();

      const totalSeconds = seconds + milliseconds / 1000;
      const totalMinutes = minutes + totalSeconds / 60;
      const totalHours = hours % 12 + totalMinutes / 60;

      setClock({
        handHour: totalHours * 30, // rotation angle for hours
        handMin: totalMinutes * 6, // rotation angle for minutes
        handSec: totalSeconds * 6, // rotation angle for seconds
      });
    }, 1000 / Math.abs(speed));

    return () => {
      clearInterval(interval);
    };
  }, [speed]);



  return (
    <div className="mainclock flex items-center justify-around ">
      <div className="clock">
        <div className="clock-wrapper bg-slate-800">
          <div className="center"></div>

          <div
            className="hand"
            style={{ transform: `rotate(${clock?.handHour}deg)` }}
          >
            <span className="hh"></span>
          </div>
          <div
            className="hand"
            style={{ transform: `rotate(${clock?.handMin}deg)` }}
          >
            <span className="hm"></span>
          </div>
          <div
            className="hand"
            style={{ transform: `rotate(${clock?.handSec}deg)` }}
          >
            <span className="hs"></span>
          </div>

          <>
            {[...Array(60)].map((item, index) => (
              <div
                style={{ transform: `rotate(${6 * index}deg)` }}
                className="sec-item"
                key={index}
              >
                <span></span>
              </div>
            ))}
          </>

          <>
            {[...Array(12)].map((item, index) => (
              <div
                style={{ transform: `rotate(${30 * index}deg)` }}
                className="hour-item text-white"
                key={index}
              >
                <span></span>
              </div>
            ))}
          </>

          <>
            {numbers.map((number) => (
              <div
                style={{ transform: `rotate(${30 * number}deg)` }}
                className="number text-white"
                key={number}
              >
                <span style={{ transform: `rotate(${-30 * number}deg)` }}>
                  {number}
                </span>
              </div>
            ))}
          </>
        </div>
      </div>
      <div className="rightsec flex flex-col gap-5">
        <h1 className="font-bold text-xl">Random quote:</h1>
        <p className="bg-slate-800 rounded-md shadow-lg p-2 text-[#FE8C00] font-semibold text-lg italic">{quote}</p>
        <h1 className="font-bold text-xl">
          This Clock rotates in opposite direction upto 120 minutes...
          Below is the bar to adjust the speed
        </h1>
        <div>
        <label className="block text-gray-700">Speed: {speed}x</label>
        <input
          type="range"
          id="speed"
          name="speed"
          min={0.1}
          max={5}
          value={speed}
          step={0.1}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
        />
        </div>
        
      </div>
    </div>
  );
};

export default Clock;
