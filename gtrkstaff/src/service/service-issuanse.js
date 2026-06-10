export const   fetchGetAllWorkPlace = async () => {
    try{
        const urlGetAll = `${document.location.protocol}/issuance/findAllWorkPlaces`;
        //const urlGetAll = `http://localhost:8080/issuance/findAllWorkPlaces`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetAll,options).then(responce => responce.json());
        //console.log("rest ok!!", res);
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}
export const fechWorkPlaceById = async (id) =>{
    //console.log(`service workPlace id ${id}`);
    
    if(id === 0){
        const res = {
            id: 0,
            workName: null
        };
        //console.log(` JSON res = ${res}`);
        return res;
    }else{
        try{
            const urlGetById = `${document.location.protocol}/issuance/findWorkPlacesById?id=${id}`;
            const options = {
                method: 'GET',
                headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
            };
            const res = await fetch(urlGetById, options).then(responce => responce.json());
            //console.log("result workPlane");
            //console.log(res);
    
            return  res;
        }catch(ex){
            console.log(` errors workPlace by id ${ex.message}`);
            return null;
        }
    }
}

export const   fetchSaveWorkPlace = async (workPlace) => {
    try{
        const urlSaveWorkPlace = `${document.location.protocol}/issuance/saveWorkPlace`;
        //const urlSaveWorkPlace = `http://localhost:8080/issuance/saveWorkPlace`;
        const options = {
            method: 'POST',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        options.body  = JSON.stringify(workPlace);
        const res = await fetch(urlSaveWorkPlace, options);
        console.log("save ok!!");
        console.log(urlSaveWorkPlace);
        console.log(workPlace);
        return  res;
    }catch(ex){
            console.log(ex.message); 
            
    }
}

export const   fetchGetAllIssuanceTasks = async () => {   
    try{
        const urlGetAllIssuanceTask = `${document.location.protocol}/issuance/findAllTasks`;
        //const urlGetAllIssuanceTask = `http://localhost:8080/issuance/findAllTasks`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetAllIssuanceTask, options).then(responce => responce.json());
        //console.log("rest ok!!", res);
        //console.log(res)
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}
export const fechAllTasksBetweenByDate = async(start, end) =>{
    try{
        const urlGetAllIssuanceTask = `${document.location.protocol}/issuance/findAllTasksBetweenByDate?start=${start}&end=${end}`;
        //const urlGetAllIssuanceTask = `http://localhost:8080/issuance/findAllTasksBetweenByDate?start=`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetAllIssuanceTask, options).then(responce => responce.json());
        //console.log("rest ok!!", res);
        //console.log(res)
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }

}
export const fechWorkIssuanceTaskById = async (id) =>{
    //console.log(`service issuanceTask id ${id}`);
    
    if(id === 0){
        const res = {
            id: 0,
            workName: null
        };
        //console.log(` JSON res = ${res}`);
        return res;
    }else{
        try{
            const urlIssuanceTaskGetById = `${document.location.protocol}/issuance/findTasksById?id=${id}`;
            const options = {
                method: 'GET',
                headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
            };

            const res = await fetch(urlIssuanceTaskGetById, options).then(responce => responce.json());
            //console.log("result issuanceTask");
            //console.log(res);
    
            return  res;
        }catch(ex){
            console.log(` errors issuanceTask by id ${ex.message}`);
            return null;
        }
    }
}

export const   fetchSaveIssuanceTask = async (issuanceTask) => {
    try{
        const urlSaveIssuanceTask = `${document.location.protocol}/issuance/saveTask`;
        //const urlSaveIssuanceTask = `http://localhost:8080/issuance/saveWorkPlace`;
        const options = {
            method: 'POST',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        options.body  = JSON.stringify(issuanceTask);
        const res = await fetch(urlSaveIssuanceTask, options);
        //console.log("save ok!!");
        //console.log(urlSaveIssuanceTask);
        //console.log(issuanceTask);
        return  res;
    }catch(ex){
            console.log(ex.message); 
            
    }
}
export const fetchDeleteWorkPlace = async (id)=> {
    try{
        const urlDeleteWorkPlace = `${document.location.protocol}/issuance/deleteWorkPlaceById?id=${id}`;
        const response = await fetch(urlDeleteWorkPlace,
            {
                method: 'DELETE',
                headers: new Headers({'Authorization': `${window.TOCKEN}`})
            }
        );
        if(!response.ok){
            throw new Error('Ошибка удаления рабочего места');
        }
        return response;
    }catch(ex){
        console.log(ex.message);
    }
}
export const fetchDeleteIssuanceTaskById = async (id)=> {
    try{
        const urlDeleteIssuanceTask = `${document.location.protocol}/issuance/deleteTaskById?id=${id}`;
        const response = await fetch(urlDeleteIssuanceTask,
            {
                method: 'DELETE',
                headers: new Headers({'Authorization': `${window.TOCKEN}`})
            }
        );
        if(!response.ok){
            throw new Error('Ошибка удаления рабочей задачи');
        }
        return response;
    }catch(ex){
        console.log(ex.message);
    }
}