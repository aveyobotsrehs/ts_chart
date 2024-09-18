
const array = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"]//массив из десяти значений запросов
export function getRandomInt(max:number) {
    return Math.floor(Math.random() * max);
  }
export function getRandomDate(from: Date, to: Date) {
    const fromTime = from.getTime();
    const toTime = to.getTime();
    return new Date(fromTime + Math.random() * (toTime - fromTime));
}

export function get_all_Data(d1:Date, d2:Date){//рандомно генерируется массив из запросов и дат в изначальном диапазоне
    const data:Date[][] = []
    for(let i=0;i<10;i++){
        data[i] = []
    }
    for(let i=0;i<500;i++){
        const elem = array[getRandomInt(10)]
        for(let j=0;j<10;j++){
            if(elem==array[j]){
                data[j].push(getRandomDate(d1, d2))
            }
        }
    }
   return data
}
export function get_Data(d1:Date, d2:Date, data:Date[][]){//поиск запросов между двумя данными датами
    const data1:Date[][] = []
    for(let i=0;i<10;i++){
        data1[i] = []
    }
    for(let i=0;i<10;i++){
        for(let j=0;j<data[i].length;j++){
            if(data[i][j]>d1&&data[i][j]<d2){
                  data1[i].push(data[i][j])
                  }}
            }
   return data1
}
export function top_three(x: Date[][]){//массив для топ-3 запросов: помещается номер запроса в изначальном массиве и количество его вызовов за нужный период
    const top_3: number[][] = []
    for(let i=0;i<3;i++){
        top_3[i] = [0, 0]
    }
    for(let i=0;i<10;i++){
        let min_ind=0
        let minimum=0
            minimum = Math.min(top_3[0][1],top_3[1][1],top_3[2][1])
            if(top_3[0][1]==minimum){
                min_ind = 0
            }
            else if(top_3[1][1]==minimum){
                min_ind = 1
            }
            else if(top_3[2][1]==minimum){
                min_ind = 2
            }
            if((x[i].length)>minimum){
                top_3[min_ind][1] = x[i].length
                top_3[min_ind][0] = i
            }
    }
    if(top_3[0][1]<top_3[1][1]){
        const tmp1 = top_3[0][0]
        const tmp2 = top_3[0][1]
        top_3[0][0]=top_3[1][0]
        top_3[1][0] = tmp1
        top_3[0][1]=top_3[1][1]
        top_3[1][1] = tmp2
    }
    const max = Math.max(top_3[0][1], top_3[1][1],top_3[2][1])
    if(max==top_3[0][1]){
        if(top_3[1][1]<top_3[2][1]){
            const tmp1 = top_3[1][0]
            const tmp2 = top_3[1][1]
            top_3[1][0]=top_3[2][0]
            top_3[2][0] = tmp1
            top_3[1][1]=top_3[2][1]
            top_3[2][1] = tmp2
        }
    }
    else if(max==top_3[1][1]){
        const tmp1 = top_3[0][0]
        const tmp2 = top_3[0][1]
        top_3[0][0]=top_3[1][0]
        top_3[0][1]=top_3[1][1]
        if(tmp2<top_3[2][1]){
            top_3[1][0]=top_3[2][0]
            top_3[1][1]=top_3[2][1]
            top_3[2][0] = tmp1
            top_3[2][1] = tmp2
        }
        else{
            top_3[1][0]=tmp1
            top_3[1][1]=tmp2
        }
    }
    else if(max==top_3[2][1]){
        const tmp1 = top_3[0][0]
        const tmp2 = top_3[0][1]
        top_3[0][0]=top_3[2][0]
        top_3[0][1]=top_3[2][1]
        if(tmp2<top_3[1][1]){
            top_3[2][0] = tmp1
            top_3[2][1] = tmp2
        }
        else{
            top_3[2][0]=top_3[1][0]
            top_3[2][1]=top_3[1][1]
            top_3[1][0]=tmp1
            top_3[1][1]=tmp2
        }
    }
    return top_3
}
