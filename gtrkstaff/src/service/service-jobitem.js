export const fetchDeleteJobItem = async (id)=> {
    try{
        const urlDelete = `${document.location.protocol}/position/deleteById?id=${id}`;
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
export const   fetchGetAllJobItem = async () => {
    try{
        const urlGetAll = `${document.location.protocol}/position/getall`;
        //console.log(urlGetAll)
        //const urlGetAll = `http://localhost:8080/position/getall`;
        const options = {
                    method: 'GET',
                    headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetAll, options).then(responce => responce.json());
        //console.log("rest ok!!", res);
        return res;
    }catch(ex){
        console.log('Exeption get resource', ex.message); 
        return [];
        
    }
}
export const fechPositionById = async (id) =>{
    //console.log(`service position id ${id}`);
    
    if(id === 0){
        const res = {
            id: 0,
            scheduleName: null
        };
        //console.log(` JSON res = ${res}`);
        return res;
    }else{
        try{
            const urlGetById = `${document.location.protocol}/position/getById?id=${id}`;
            const options = {
                method: 'GET',
                headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
            };
            const res = await fetch(urlGetById, options).then(responce => responce.json());
            //console.log("result position");
            //console.log(res);
    
            return  res;
        }catch(ex){
            console.log(` errors position by id ${ex.message}`);
            return null;
        }
    }
}

export const   fetchSaveJobItem = async (position) => {
    try{
        const urlSaveJob = `${document.location.protocol}/position/saveposition`;
        //const urlSaveJob = `http://localhost:8080/position/addposition`;
        
        const options = {
            method: 'POST',
            headers: new Headers({'Authorization': `${window.TOCKEN}`, 'content-type': 'application/json'})
        };
        options.body  = JSON.stringify(position);
        const res = await fetch(urlSaveJob, options);
        console.log("save ok!!");
        console.log(urlSaveJob);
        console.log(res);
    }catch(ex){
        console.log(ex.message); 
        
    }
}
    