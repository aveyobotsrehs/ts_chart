const basicArray = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]; //массив из десяти значений запросов
export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
export function getRandomDate(from: Date, to: Date) {
  const fromTime = from.getTime();
  const toTime = to.getTime();
  return new Date(fromTime + Math.random() * (toTime - fromTime));
}

export function getAllData(from: Date, to: Date) {
  //рандомно генерируется массив из запросов и дат в изначальном диапазоне
  const allData: Date[][] = [];
  for (let i = 0; i < 10; i++) {
    allData[i] = [];
  }
  for (let i = 0; i < 500; i++) {
    const elem = basicArray[getRandomInt(10)];
    for (let j = 0; j < 10; j++) {
      if (elem == basicArray[j]) {
        allData[j].push(getRandomDate(from, to));
      }
    }
  }
  return allData;
}
export function getData(from: Date, to: Date, allData: Date[][]) {
  //поиск запросов между двумя данными датами
  const dataBetweenTwoDates: Date[][] = [];
  for (let i = 0; i < 10; i++) {
    dataBetweenTwoDates[i] = [];
  }
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < allData[i].length; j++) {
      if (allData[i][j] > from && allData[i][j] < to) {
        dataBetweenTwoDates[i].push(allData[i][j]);
      }
    }
  }
  return dataBetweenTwoDates;
}
export function topThreeRequests(dates: Date[][]) {
  //массив для топ-3 запросов: помещается номер запроса в изначальном массиве и количество его вызовов за нужный период
  const topThree: number[][] = [];
  for (let i = 0; i < 3; i++) {
    topThree[i] = [0, 0];
  }
  for (let i = 0; i < 10; i++) {
    let minIndex = 0;
    let minimum = 0;
    minimum = Math.min(topThree[0][1], topThree[1][1], topThree[2][1]);
    if (topThree[0][1] == minimum) {
      minIndex = 0;
    } else if (topThree[1][1] == minimum) {
      minIndex = 1;
    } else if (topThree[2][1] == minimum) {
      minIndex = 2;
    }
    if (dates[i].length > minimum) {
      topThree[minIndex][1] = dates[i].length;
      topThree[minIndex][0] = i;
    }
  }
  if (topThree[0][1] < topThree[1][1]) {
    const serialNumber = topThree[0][0];
    const numberofRequests = topThree[0][1];
    topThree[0][0] = topThree[1][0];
    topThree[1][0] = serialNumber;
    topThree[0][1] = topThree[1][1];
    topThree[1][1] = numberofRequests;
  }
  const max = Math.max(topThree[0][1], topThree[1][1], topThree[2][1]);
  if (max == topThree[0][1]) {
    if (topThree[1][1] < topThree[2][1]) {
      const serialNumber = topThree[1][0];
      const numberofRequests = topThree[1][1];
      topThree[1][0] = topThree[2][0];
      topThree[2][0] = serialNumber;
      topThree[1][1] = topThree[2][1];
      topThree[2][1] = numberofRequests;
    }
  } else if (max == topThree[1][1]) {
    const serialNumber = topThree[0][0];
    const numberofRequests = topThree[0][1];
    topThree[0][0] = topThree[1][0];
    topThree[0][1] = topThree[1][1];
    if (numberofRequests < topThree[2][1]) {
      topThree[1][0] = topThree[2][0];
      topThree[1][1] = topThree[2][1];
      topThree[2][0] = serialNumber;
      topThree[2][1] = numberofRequests;
    } else {
      topThree[1][0] = serialNumber;
      topThree[1][1] = numberofRequests;
    }
  } else if (max == topThree[2][1]) {
    const serialNumber = topThree[0][0];
    const numberofRequests = topThree[0][1];
    topThree[0][0] = topThree[2][0];
    topThree[0][1] = topThree[2][1];
    if (numberofRequests < topThree[1][1]) {
      topThree[2][0] = serialNumber;
      topThree[2][1] = numberofRequests;
    } else {
      topThree[2][0] = topThree[1][0];
      topThree[2][1] = topThree[1][1];
      topThree[1][0] = serialNumber;
      topThree[1][1] = numberofRequests;
    }
  }
  return topThree;
}
