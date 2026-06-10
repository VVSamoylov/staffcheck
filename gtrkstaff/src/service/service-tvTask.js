/** сервис списка планов по датам для телевидения */
export const fetchDeleteTvTask = async (id)=> {
    try{
        const urlDelete = `${document.location.protocol}/planeTV/deleteTask?id=${id}`;
        const response = await fetch(urlDelete,
            {
                method: 'DELETE',
                headers: new Headers({'Authorization': `${window.TOCKEN}`})
            }
        );
        if(!response.ok){
            throw new Error('Ошибка удаления задачи');
        }
        return response;
    }catch(ex){
        console.log(ex.message);
    }
}
export const   fetchGetTvTaskById = async (id) => {
    try{
        const urlGetById = `${document.location.protocol}/planeTV/getTask?${id}`;
        //const urlGetAll = `http://localhost:8080/planeTV/getTask`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetById, options).then(responce => responce.json());
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}
export const   fetchGetAllTvTask = async () => {
    try{
        const urlGetAll = `${document.location.protocol}/planeTV/getAllTask`;
        //const urlGetAll = `http://localhost:8080/planeTV/getAllTask`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetAll, options).then(responce => responce.json());
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}


export const   fechAllTaskType = async () => {
    try{
        const urlGetAllTaskType = `${document.location.protocol}/planeTV/findAllTaskType`;
        //const urlGetAllTaskType = `http://localhost:8080/planeTV/findAllTaskType`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetAllTaskType, options).then(responce => responce.json());
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}

export const   fechAllTaskStatus = async () => {
    try{
        const urlGetAllTaskStatus = `${document.location.protocol}/planeTV/findAllTaskStatus`;
        //const urlGetAllTaskStatus = `http://localhost:8080/planeTV/findAllTaskStatus`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetAllTaskStatus, options).then(responce => responce.json());
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}

export const   fetchUpdateTask = async (task) => {
    try{
        const urlUpdateTask = `${document.location.protocol}/planeTV/updateTask`;
        //const urlUpdateTask = `http://localhost:8080/planeTV/updateTask`;
        const options = {
            method: 'POST',
            headers: new Headers({'Authorization': `${window.TOCKEN}` ,'content-type': 'application/json'})
        };
        options.body  = JSON.stringify(task);
        const res = await fetch(urlUpdateTask, options);
        //console.log("save ok!!");
        //console.log(urlSavePlane);
        //console.log(plane);
        return  res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}




//TODO
export const   fetchAddTask = async (data) => {
    try{
        const urlGetAll = `${document.location.protocol}/planeTV/addTask/${data}`;
        //const urlGetAll = `http://localhost:8080/depart/getallemployee`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetAll, options);
        //console.log("rest ok!!");
        return await res.json();
    }catch(ex){
        console.log(ex.message); 
        
    }
}
    