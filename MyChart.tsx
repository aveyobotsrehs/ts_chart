import './App.css'
import { get_Data } from './counting.ts';
import { top_three } from './counting.ts';
import { get_all_Data } from './counting.ts';
import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
type c = {//тип, где как переменные берутся дата и количество запросов, которые входят в топ-3
  date: Date
  First: number
  Second: number
  Third: number
}
let arr1:c[]
let arr2:c[] = []
function counting(arr:c[], dates:Date[][],top_3:number[][]){//считает количество запросов, которые входят в топ-3 для данных дат
  for(let i=0;i<3;i++){
      for(let j=0;j<dates[top_3[i][0]].length;j++){
          for(let k=0;k<arr.length;k++){
              if(arr[k].date.getDay()==dates[top_3[i][0]][j].getDay()){
                  if(arr[k].date.getMonth()==dates[top_3[i][0]][j].getMonth()){
                      if(arr[k].date.getFullYear()==dates[top_3[i][0]][j].getFullYear()){
                  if(i==0){arr[k].First++}
                  if(i==1){arr[k].Second++}
                  if(i==2){arr[k].Third++}
              }}}
          }
          
  }}
}
  function f2(d1:Date,d2:Date, arr:c[]){//генерирует из данных между двумя датами массив типа с
    const current = d1
    while(current<=new Date(d2)){
        const curr = new Date(d1)
        curr.setDate(current.getDate()+1)
        const x:c = {date:curr, First:0, Second:0, Third:0}
        arr.push(x)
        current.setDate(current.getDate()+1)
    }
  }

  const startDate1 = new Date('2024-05-31T00:00:00');
  const endDate1 = new Date('2024-08-31T23:59:59');
  endDate1.setDate(endDate1.getDate()-1)
  const data1 = get_all_Data(startDate1, endDate1)
  const tmp1 = new Date(startDate1)
  f2(tmp1, endDate1, arr2)
  console.log(arr2)
  counting(arr2, get_Data(startDate1, endDate1, data1), top_three(get_Data(startDate1, endDate1, data1)))

function MyComponent() {
  const [start, setBegin] = useState('2024-05-31T00:00:00');
  const [end, setEnd] = useState('2024-08-31T23:59:59');
  const [cond, setCond] = useState(false)
  const arr:c[]=[]
  let startDate = new Date(start);
  let endDate = new Date(end);
  const handleChange1 = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBegin(e.currentTarget.value);
    startDate = new Date(start);
    setCond(false)
  };
  const handleChange2 = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnd(e.currentTarget.value);
    endDate = new Date(end);
    setCond(false)
  };
  const handleClick = () => {
  startDate.setDate(startDate.getDate()-1)
  endDate.setDate(endDate.getDate()-1)
  const tmp = new Date(startDate)
  arr.length = 0;
  f2(tmp, endDate, arr)
  counting(arr, get_Data(startDate, endDate, data1), top_three(get_Data(startDate, endDate, data1)))
  arr1 = arr
  arr2 = arr
  setCond(true)
  };
  if(!cond){return(<div>
  <label>
    Начальная дата:
    <input
        type="date"
        value={start}
        onChange={handleChange1}
    />
</label>
<label>
    Конечная дата:
    <input
        type="date"
        value={end}
        onChange={handleChange2}
    />
</label>
<button onClick={handleClick}>Задать</button><BarChart
    width={1500}
    height={700}
    data={arr2}
            margin={{
                top: 20, right: 5, left: 5, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="date"/>
            <YAxis />
            <Tooltip/>
            <Legend/>
            <Bar dataKey="First" fill="red"/>
            <Bar dataKey="Second" fill="green"/>
            <Bar dataKey="Third" fill="blue"/>
        </BarChart></div>);}
  if(cond) {return(
    <div>
      <label>
        Начальная дата:
        <input
            type="date"
            value={start}
            onChange={handleChange1}
        />
    </label>
    <label>
        Конечная дата:
        <input
            type="date"
            value={end}
            onChange={handleChange2}
        />
    </label>
    <button onClick={handleClick}>Задать</button>
    <BarChart
    width={1500}
    height={700}
    data={arr1}
            margin={{
                top: 20, right: 5, left: 5, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="date"/>
            <YAxis />
            <Tooltip/>
            <Legend/>
            <Bar dataKey="First" fill="red"/>
            <Bar dataKey="Second" fill="green"/>
            <Bar dataKey="Third" fill="blue"/>
        </BarChart>
    
</div>
);};}

export default MyComponent;