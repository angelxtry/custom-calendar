import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import {
  getDaysInMonth,
  getDay,
  isSameDay,
  lightFormat,
  sub,
  add,
  setDate,
} from 'date-fns';

interface DateGridStyle {
  dayOfWeekFirstDay: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

interface ButtonStyle {
  colorHex: string;
}

interface ResultData {
  date: Date;
  count: number;
  colorHex: string;
}

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DayOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const DateGrid = styled.div<DateGridStyle>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  & > div:first-child {
    grid-column: ${(props) => props.dayOfWeekFirstDay + 1};
  }
  & > .day {
    height: 5em;
  }
`;

const Button = styled.div<ButtonStyle>`
  background-color: ${(props) => props.colorHex};
`;

function countToColorHex(count: number) {
  let colorHex = '';
  if (count > 5) {
    colorHex = '#f4a28a';
  } else if (count <= 5 && count > 3) {
    colorHex = '#f5ae9a';
  } else if (count <= 3 && count > 2) {
    colorHex = '#f7bba9';
  } else if (count <= 2 && count > 1) {
    colorHex = '#f8c7b9';
  } else {
    colorHex = '#fff';
  }
  return colorHex;
}

function makeCalendarData(date: Date, data: ResultData[]) {
  const daysInMonth = getDaysInMonth(date);
  // console.log(daysInMonth);
  const days: ResultData[] = [];
  for (let index = 1; index <= daysInMonth; index += 1) {
    const temp = new Date(date.getFullYear(), date.getMonth(), index);
    const countData = data.filter((d) => isSameDay(d.date, temp));
    let count = 0;
    if (countData && countData[0]) {
      count = countData[0].count;
    }
    // console.log(temp, count);
    days.push({
      date: temp,
      count,
      colorHex: countToColorHex(count),
    });
  }
  return days;
}

interface CustomCalendarProps {
  data: ResultData[];
}

export default function CustomCalendar({ data }: CustomCalendarProps) {
  const [monthOfCalendar, setMonthOfCalendar] = useState<Date>(new Date());
  const days = makeCalendarData(monthOfCalendar, data);

  const onClickLeft = useCallback(() => {
    setMonthOfCalendar(sub(monthOfCalendar, { months: 1 }));
  }, [monthOfCalendar]);

  const onClickRight = useCallback(() => {
    setMonthOfCalendar(add(monthOfCalendar, { months: 1 }));
  }, [monthOfCalendar]);

  // console.log(getDay(setDate(monthOfCalendar, 1)));
  return (
    <>
      <div>Custom Calendar</div>
      <div>
        <CalendarHeader>
          <button type="button" onClick={onClickLeft}>
            left
          </button>
          <div>{lightFormat(monthOfCalendar, 'yyyy-MM')}</div>
          <button type="button" onClick={onClickRight}>
            right
          </button>
        </CalendarHeader>
        <DayOfWeek className="day-of-week">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </DayOfWeek>
        <DateGrid
          className="date-grid"
          dayOfWeekFirstDay={getDay(setDate(monthOfCalendar, 1))}
        >
          {days.map((day) => (
            <Button
              key={day.date.getDate()}
              className="day"
              colorHex={day.colorHex}
            >
              <div>{day.date.getDate()}</div>
            </Button>
          ))}
        </DateGrid>
      </div>
    </>
  );
}
