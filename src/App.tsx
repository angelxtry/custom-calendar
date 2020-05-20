import React from 'react';
import CustomCalendar from './CustomCalendar';
import { tempData } from './ResultData';

export default function App() {
  return (
    <div>
      React + TypeScript + Webpack!
      <CustomCalendar data={tempData} />
    </div>
  );
}
