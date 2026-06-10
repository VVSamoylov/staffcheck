export const fetchDeletePlaneTV = async (id)=> {
    try{
        const urlDelete = `${document.location.protocol}/workschedule/deleteworkschedule/${id}`;
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
export const   fetchGetAllPlaneTV = async () => {
    try{
        const urlGetAll = `${document.location.protocol}/workschedule/getall`;
        //const urlGetAll = `http://${hostnameserver}:${portserver}/workschedule/getall`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetAll, options).then(responce => responce.json());
        console.log("rest ok!!", res);
        return res;
    }catch(ex){
        console.log('Exeption rest', ex.message); 
        return [];
        
    }
}
//TODO
export const   fetchAddPlane = async () => {
    try{
        const urlGetAll = `${document.location.protocol}/workschedule/addworkschedule`;
        //const urlGetAll = `http://${hostnameserver}:${portserver}/workschedule/addworkschedule`;
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
    