export const convertDurationToMinute=(duration) =>{
    let int = duration?.indexOf("M")-2;
   // console.log(int + " : "+ duration)
    let str = duration?.substr(duration?.indexOf("T")+1, duration?.indexOf("M")-2 === -3?duration?.indexOf("H")-1: int   );
    let res = str?.slice(0, str?.indexOf("H")) * 60 +  str?.slice(str?.indexOf("H")+1)*1;
    if(!isNaN(res)){
        return res ;
    }else{
        return "Нет информации"
    }
}

export const convertMinuteToHour = (minute) =>{
    if(isNaN(minute))
        return minute;
    let min = minute % 60;
    let hour = (minute - min)/60;
    return `${hour}ч ${min}м`;
}

export const convertStringToTime=(dateTime)=>{
    if(dateTime == null)
        return "нет информации";
    return dateTime.slice(dateTime.indexOf("T")+1).slice(0, 5)
}
//преобразование в yyyy-mm-dd
export const convertViewDate = (dt)=>{
    return dt !== null? (dt.substr(8, dt.length) +  dt.substr(4, 4) + dt.substr(0, 4)).replace(/-/g, "."): '';
}

