import "./App.css";
import { getData } from "./counting.ts";
import { topThreeRequests } from "./counting.ts";
import { getAllData } from "./counting.ts";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
type Day = {
  //тип, где как переменные берутся дата и количество запросов, которые входят в топ-3
  date: Date;
  First: number;
  Second: number;
  Third: number;
};
let dataForCurrentChart: Day[];
let dataForPrevChart: Day[] = [];
function countRequests(
  datesWithParameters: Day[],
  dates: Date[][],
  top_3: number[][]
) {
  //считает количество запросов, которые входят в топ-3 для данных дат
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < dates[top_3[i][0]].length; j++) {
      for (let k = 0; k < datesWithParameters.length; k++) {
        if (
          datesWithParameters[k].date.getDay() == dates[top_3[i][0]][j].getDay()
        ) {
          if (
            datesWithParameters[k].date.getMonth() ==
            dates[top_3[i][0]][j].getMonth()
          ) {
            if (
              datesWithParameters[k].date.getFullYear() ==
              dates[top_3[i][0]][j].getFullYear()
            ) {
              if (i == 0) {
                datesWithParameters[k].First++;
              }
              if (i == 1) {
                datesWithParameters[k].Second++;
              }
              if (i == 2) {
                datesWithParameters[k].Third++;
              }
            }
          }
        }
      }
    }
  }
}
function createArray(from: Date, to: Date, datesWithParameters: Day[]) {
  //генерирует из данных между двумя датами массив типа с
  const current = from;
  while (current <= new Date(to)) {
    const curr = new Date(from);
    curr.setDate(current.getDate() + 1);
    const day: Day = { date: curr, First: 0, Second: 0, Third: 0 };
    datesWithParameters.push(day);
    current.setDate(current.getDate() + 1);
  }
}

const startDateForAllData = new Date("2024-05-31T00:00:00");
const endDateForAllData = new Date("2024-08-31T23:59:59");
endDateForAllData.setDate(endDateForAllData.getDate() - 1);
const allData = getAllData(startDateForAllData, endDateForAllData);
const startDateClone = new Date(startDateForAllData);
createArray(startDateClone, endDateForAllData, dataForPrevChart);
countRequests(
  dataForPrevChart,
  getData(startDateForAllData, endDateForAllData, allData),
  topThreeRequests(getData(startDateForAllData, endDateForAllData, allData))
);

function MyComponent() {
  const [start, setBegin] = useState("2024-05-31T00:00:00");
  const [end, setEnd] = useState("2024-08-31T23:59:59");
  const [condition, setCondition] = useState(false);
  const dataBetweenTwoDates: Day[] = [];
  let startDate = new Date(start);
  let endDate = new Date(end);
  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBegin(e.currentTarget.value);
    startDate = new Date(start);
    setCondition(false);
  };
  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnd(e.currentTarget.value);
    endDate = new Date(end);
    setCondition(false);
  };
  const handleClick = () => {
    startDate.setDate(startDate.getDate() - 1);
    endDate.setDate(endDate.getDate() - 1);
    const startDateClone = new Date(startDate);
    dataBetweenTwoDates.length = 0;
    createArray(startDateClone, endDate, dataBetweenTwoDates);
    countRequests(
      dataBetweenTwoDates,
      getData(startDate, endDate, allData),
      topThreeRequests(getData(startDate, endDate, allData))
    );
    dataForCurrentChart = dataBetweenTwoDates;
    dataForPrevChart = dataBetweenTwoDates;
    setCondition(true);
  };
  if (!condition) {
    return (
      <div>
        <label>
          Начальная дата:
          <input type="date" value={start} onChange={handleChange1} />
        </label>
        <label>
          Конечная дата:
          <input type="date" value={end} onChange={handleChange2} />
        </label>
        <button onClick={handleClick}>Задать</button>
        <BarChart
          width={1500}
          height={700}
          data={dataForPrevChart}
          margin={{
            top: 20,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="First" fill="red" />
          <Bar dataKey="Second" fill="green" />
          <Bar dataKey="Third" fill="blue" />
        </BarChart>
      </div>
    );
  }
  if (condition) {
    return (
      <div>
        <label>
          Начальная дата:
          <input type="date" value={start} onChange={handleChange1} />
        </label>
        <label>
          Конечная дата:
          <input type="date" value={end} onChange={handleChange2} />
        </label>
        <button onClick={handleClick}>Задать</button>
        <BarChart
          width={1500}
          height={700}
          data={dataForCurrentChart}
          margin={{
            top: 20,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="First" fill="red" />
          <Bar dataKey="Second" fill="green" />
          <Bar dataKey="Third" fill="blue" />
        </BarChart>
      </div>
    );
  }
}

export default MyComponent;
