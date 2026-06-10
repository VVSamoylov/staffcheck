/** сервис транспорта и путевок */
export const   fechAllTransport = async () => {
    try{
        const urlGetAllTransport = `${document.location.protocol}/transport/getalltransport`;
        //const urlGetAllTransport = `http://localhost:8080/transport/getalltransport`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetAllTransport, options).then(responce => responce.json());
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}

export const fechTransportById = async (id) =>{
    try{
        const urlGetTransportById = `${document.location.protocol}/transport/getTransportById?id=${id}`;
        //const urlGetTransportById = `http://localhost:8080/transport/getTransportById`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetTransportById, options).then(responce => responce.json());
        //console.log(`transport by id ${id}`)
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}

export const fechCarById = async (id) =>{
    try{
        const urlGetCarById = `${document.location.protocol}/transport/getCarId?id=${id}`;
        //const urlGetCarById = `http://localhost:8080/transport/getCarId`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetCarById, options).then(responce => responce.json());
        //console.log(`car by id ${id}`)
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
} 

export const fetchDeleteTransportById = async (id)=> {
    try{
        const urlDeleteTransport = `${document.location.protocol}/transport/deleteTransport?id=${id}`;
        const response = await fetch(urlDeleteTransport,
            {
                method: 'DELETE',
                headers: new Headers({'Authorization': `${window.TOCKEN}`})
            }
        );
        if(!response.ok){
            throw new Error('Ошибка удаления путевого листа');
        }
        return response;
    }catch(ex){
        console.log(ex.message);
    }
}



export const fechAllCars = async () =>{
    try{
        const urlGatAllCars = `${document.location.protocol}/transport/getAllCars`;
        //const urlGatAllCars = `http://localhost:8080/transport/getAllCars`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGatAllCars, options).then(responce => responce.json());
        return res;
    }catch(ex){
        console.log(ex.message);
    }
}

export const fechAllOiltype = async () =>{
    try{
        const urlGatAllOilType = `${document.location.protocol}/transport/getAllOilType`;
        //const urlGatAllOilType = `http://localhost:8080/transport/getAllOilType`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGatAllOilType, options).then(responce => responce.json());
        return res;
    }catch(ex){
        console.log(ex.message);
    }
} 

export const   fetchSaveCar = async (car) => {
    try{
        const urlSaveCar = `${document.location.protocol}/transport/saveCar`;
        //const urlSaveCar = `http://localhost:8080/transport/saveCar`;
        const options = {
            method: 'POST',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        options.body  = JSON.stringify(car);
        const res = await fetch(urlSaveCar, options);
        console.log("save ok!!");
        console.log(urlSaveCar);
        console.log(car);
        return  res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}

export const   fetchSaveTransport = async (orderCar) => {
    try{
        const urlSaveTransport = `${document.location.protocol}/transport/saveTransport`;
        //const urlSaveTransport = `http://localhost:8080/transport/saveTransport`;
        const options = {
            method: 'POST',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        options.body  = JSON.stringify(orderCar);
        const res = await fetch(urlSaveTransport, options);
        console.log("save ok!!");
        console.log(urlSaveTransport);
        console.log(orderCar);
        return  res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}

export const fetchDeleteCarById = async (id)=> {
    try{
        const urlDeleteCar = `${document.location.protocol}/transport/deleteCar?id=${id}`;
        const response = await fetch(urlDeleteCar,
            {
                method: 'DELETE',
                headers: new Headers({'Authorization': `${window.TOCKEN}`})
            }
        );
        if(!response.ok){
            throw new Error('Ошибка удаления машины');
        }
        return response;
    }catch(ex){
        console.log(ex.message);
    }
}

export const fechTravelLog = async (startDate, endDate) =>{
    try{
        const urlGetTravelLog = `${document.location.protocol}/report/getTravelLog?dateStart=${startDate}&dateEnd=${endDate}`;
        //const urlGetTravelLog = `http://localhost:8080/report/getTravelLog?dateStart=${startDate}&dateEnd=${endDate}`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetTravelLog, options).then(responce => responce.json());
        return res;
    }catch(ex){
        console.log(ex.message);
    }
} 


export const fechReportTrafic = async (startDate, endDate) =>{
    try{
        const urlGetReportTrafic = `${document.location.protocol}/report/getVedomostGarage?dateStart=${startDate}&dateEnd=${endDate}`;
        //const urlGetReportTrafic = `http://localhost:8080/report/getVedomostGarage=${startDate}&dateEnd=${endDate}`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetReportTrafic, options).then(responce => responce.json());
        return res;
    }catch(ex){
        console.log(ex.message);
    }
}

export const fechReporDriverCard = async (startDate, endDate, carId) =>{
    console.log(carId)
    try{
        const urlGetReporDriverCard = `${document.location.protocol}/report/getDriverCard?dateStart=${startDate}&dateEnd=${endDate}&carId=${carId}`;
        //const urlGetReporDriverCard = `http://localhost:8080/report/getDriverCard=${startDate}&dateEnd=${endDate}&car=${car}`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetReporDriverCard, options).then(responce => responce.json());
        return res;
    }catch(ex){
        console.log(ex.message);
    }
}