import { useState } from 'react';
import Calendar from 'react-calendar';
import './livecalender.scss'; 
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const LiveCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="calendar-wrapper">
      <button onClick={() => setShow(!show)} className="calendar-toggle">
        {show ? 'Hide Calendar' : 'Show Calendar'}
      </button>

      {show && (
        <div className="calendar-dropdown">
          <Calendar onChange={onChange} value={value} />
        </div>
      )}
    </div>
  );
};

export default LiveCalendar;
