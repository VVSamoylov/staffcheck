export const fetchDeleteNotWorking = async (id)=> {
    try{
        const urlDelete = `${document.location.protocol}/notworking/deleteById?id=${id}`;
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
export const   fetchGetAllNotWorking = async () => {
    try{
        const urlGetAll = `${document.location.protocol}/notworking/getall`;
        //const urlGetAll = `http://localhost:8080/notworking/getall`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetAll, options).then(responce => responce.json());
        //console.log("rest ok!!", res);
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}
export const   fetchNotWorkingById = async (id) => {
    try{
        const urlGetAll = `${document.location.protocol}/notworking/getById?id=${id}`;
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
export const   fetchSaveNotWorking = async (nw) => {
    try{
        const urlSaveNw = `${document.location.protocol}/notworking/save`;
        //const urlSaveNw = `http://localhost:8080/notworking/save`;
        
        const options = {
            method: 'POST',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        options.body  = JSON.stringify(nw);
        const res = await fetch(urlSaveNw, options);
        console.log("save ok!!");
        console.log(urlSaveNw);
        console.log(res);
    }catch(ex){
        console.log(ex.message); 
        
    }
}
    