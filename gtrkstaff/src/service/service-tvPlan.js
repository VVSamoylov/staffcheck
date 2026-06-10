/** сервис списка планов по датам для телевидения */
export const fetchDeleteTvPlanById = async (id)=> {
    try{
        const urlDelete = `${document.location.protocol}/planeTV/deleplan?id=${id}`;
        const response = await fetch(urlDelete,
            {
                method: 'DELETE',
                headers: new Headers({'Authorization': `${window.TOCKEN}`})
            }
        );
        if(!response.ok){
            throw new Error('Ошибка удаления сотрудника');
        }
        return response;
    }catch(ex){
        console.log(ex.message);
    }
}
export const   fetchGetAllTvPlan = async (startDate, endDate) => {
    try{
        let urlGetAll;
        if(startDate === null && endDate === null){
            urlGetAll = `${document.location.protocol}/planeTV/getAll`
        }else{
            urlGetAll = `${document.location.protocol}/planeTV/getAllBetweenDate?startDate=${startDate}&endDate=${endDate}`;
        }
        
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        //console.log(options)
        const res = await fetch(urlGetAll, options).then(responce => responce.json());
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}
//TODO
export const   fetchAddPlan = async (plane) => {
    try{
        const urlAddPlane = `${document.location.protocol}/planeTV/add`;
        //const urlAddPlane = `http://localhost:8080/planeTV/add`;
        const res = await fetch(urlAddPlane, {
            method:'POST',
            headers: {
                'Authorization': `${window.TOCKEN}`,
                'Content-Type' : 'application/json;charset=utf-8'
            },
            body: JSON.stringify(plane)
        });
        //console.log("rest ok!!");
        return  res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}
    
export const fechPlaneById = async (id) =>{
    //console.log(`service plan id ${id}`);
    
    if(id === 0){
        const res = {
            id: 0,
            morningTVChef : {},
            daytimeTVChef : {},
            dutyTV : {},
            chiefSite : {},
            dutySite : [],
            planeDate : null,
            daySaites : [],
            planeTasks : [],
            planeName : ""
        };
        //console.log(` JSON res = ${res}`);
        return res;
    }else{
        try{
            const urlGetById = `${document.location.protocol}/planeTV/getById?id=${id}`;
            const options = {
                method: 'GET',
                headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
            };
            const res = await fetch(urlGetById, options).then(responce => responce.json());
            //console.log("result plane");
            //console.log(res);
    
            return  res;
        }catch(ex){
            console.log(` errors fechplane by id ${ex.message}`);
            return {
                id: 0,
                morningTVChef : {},
                daytimeTVChef : {},
                dutyTV : {},
                chiefSite : {},
                dutySite : [],
                planeDate : null,
                daySaites : [],
                planeTasks : [],
                planeName : ""
            };
        }
    }
}

export const fechPlaneByDate = async (date) =>{
    //console.log(`service plan id ${id}`);
    try{
            const urlGetById = `${document.location.protocol}/planeTV/getPlaneByDate?date=${date}`;
            const options = {
                method: 'GET',
                headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
            };
            const res = await fetch(urlGetById, options).then(responce => responce.json());
            //console.log("result plane");
            //console.log(res);
    
            return  res;
        }catch(ex){
            console.log(` errors fechplane by date ${ex.message}`);
            return true;
    }
}

export const fechAllSheff = async () =>{
    try{
        const urlGetByAllSheff = `${document.location.protocol}/planeTV/getAllSheff`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetByAllSheff, options).then(responce => responce.json());
        //console.log("result plane");
        //console.log(res);
        return  res;
    }catch(ex){
        console.log(ex.message);
    }
}
export const fechAllDutyTV = async () =>{
    try{
        const urlGetByAllDutyTV = `${document.location.protocol}/planeTV/getDutyTV`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetByAllDutyTV, options).then(responce => responce.json());
        //console.log("result plane");
        //console.log(res);
        return  res;
    }catch(ex){
        console.log(ex.message);
    }
}

export const fechAllDutySait = async () =>{
    try{
        const urlGetByAllDutySait = `${document.location.protocol}/planeTV/getDutySait`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetByAllDutySait, options).then(responce => responce.json());
        //console.log("result plane");
        //console.log(res);
        return  res;
    }catch(ex){
        console.log(ex.message);
    }
}
export const fechAllSait9_18 = async () =>{
    try{
        const urlGetByAllDutySait9_18 = `${document.location.protocol}/planeTV/getSait9_18`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetByAllDutySait9_18, options).then(responce => responce.json());
        //console.log("result plane");
        //console.log(res);
        return  res;
    }catch(ex){
        console.log(ex.message);
    }
}

export const   fetchSavePlan = async (plane) => {
    try{
        const urlSavePlane = `${document.location.protocol}/planeTV/save`;
        //const urlSavePlane = `http://localhost:8080/planeTV/save`;
        const options = {
            method: 'POST',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        options.body  = JSON.stringify(plane);
        const res = await fetch(urlSavePlane, options);
        //console.log("save ok!!");
        //console.log(urlSavePlane);
        //console.log(plane);
        return  res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}

export const fechAllProject = async () =>{
    try{
        const urlGetByAllProject = `${document.location.protocol}/planeTV/getAllProject`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetByAllProject, options).then(responce => responce.json());
        //console.log("result plane");
        //console.log(res);
        return  res;
    }catch(ex){
        console.log(ex.message);
    }
}

export const fechShotProject = async () =>{
    try{
        const urlGetByAllProject = `${document.location.protocol}/planeTV/getShotProject`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetByAllProject, options).then(responce => responce !== null || responce!== undefined? responce.json(): '');
        //console.log(window.TOCKEN);
        //console.log(res);
        return  res;
    }catch(ex){
        console.log(ex.message);
    }
}


