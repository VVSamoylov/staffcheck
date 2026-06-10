export const fetchDeleteShedule = async (id)=> {
    try{
        const urlDelete = `${document.location.protocol}/workschedule/deleteById?id=${id}`;
        const response = await fetch(urlDelete,
            {
                method: 'DELETE',
                headers: new Headers({'Authorization': `${window.TOCKEN}`})
            }
        );
        if(!response.ok){
            throw new Error('Ошибка удаления графика работы');
        }
        return response;
    }catch(ex){
        console.log(ex.message);
    }
}
export const   fetchGetAllShedule = async () => {
    try{
        const urlGetAll = `${document.location.protocol}/workschedule/getall`;
        //const urlGetAll = `http://localhost:8080/workschedule/getall`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetAll, options).then(responce => responce.json());
        //console.log("rest ok!!", res);
        return res;
    }catch(ex){
        console.log('Exeption rest', ex.message); 
        return [];
        
    }
}

export const fechScheduleById = async (id) =>{
    //console.log(`service schedule id ${id}`);
    
    if(id === 0){
        const res = {
            id: 0,
            scheduleName: null
        };
        //console.log(` JSON res = ${res}`);
        return res;
    }else{
        try{
            const urlGetById = `${document.location.protocol}/workschedule/getById?id=${id}`;
            const options = {
                method: 'GET',
                headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
            };
            const res = await fetch(urlGetById, options).then(responce => responce.json());
            //console.log("result schedule");
            //console.log(res);
    
            return  res;
        }catch(ex){
            console.log(` errors fechschedule by id ${ex.message}`);
            return null;
        }
    }
}

export const   fetchSaveShedule = async (schedule) => {
    try{
        const urlSaveSchedule = `${document.location.protocol}/workschedule/saveWorkschedule`;
        //const urlSaveSchedule = `http://localhost:8080/workschedule/saveWorkschedule`;
        const options = {
            method: 'POST',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        options.body  = JSON.stringify(schedule);
        const res = await fetch(urlSaveSchedule, options);
        console.log("save ok!!");
        console.log(urlSaveSchedule);
        console.log(res);
    }catch(ex){
        console.log(ex.message); 
        
    }
}
    