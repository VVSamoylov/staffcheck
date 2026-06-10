export const fetchDeleteDepartament = async (id)=> {
    try{
        const urlDelete = `${document.location.protocol}/depart/deleById?id=${id}`;
        const response = await fetch(urlDelete,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `${window.TOCKEN}`
                }
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
export const   fetchGetAllDepartament = async () => {
    try{
        const urlGetAll = `${document.location.protocol}/depart/getall`;
        //const urlGetAll = `http://localhost:8080/depart/getall`;
        const res = await fetch(urlGetAll,
            {
                method: 'GET',
                headers: {
                'Authorization': `${window.TOCKEN}`,
                'Content-Type': 'application/json'
                }
            }
        ).then(responce => responce.json());
        //console.log("rest ok!!", res);
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}
export const fechDeptById = async (id) =>{
    //console.log(`service department id ${id}`);
    
    if(id === 0){
        const res = {
            id: 0,
            deptName: null,
            boss: null
        };
        //console.log(` JSON res = ${res}`);
        return res;
    }else{
        try{
            const urlGetById = `${document.location.protocol}/depart/getById?id=${id}`;
            const res = await fetch(urlGetById, {mode: 'no-cors',
                    method: 'GET',
                    headers: {
                    'Authorization': `${window.TOCKEN}`,
                    'Content-Type': 'application/json'
                    }
            }).then(responce => responce.json());
            //console.log("result dept");
            //console.log(res);
    
            return  res;
        }catch(ex){
            console.log(` errors dept by id ${ex.message}`);
            return null;
        }
    }
}

export const   fetchSaveDepartament = async (depart) => {
    try{
        const urlSave = `${document.location.protocol}/depart/save`;
        //const urlSave = `http://localhost:8080/depart/save`;
        const options = {
            method: 'POST',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        options.body  = JSON.stringify(depart);
        const res = await fetch(urlSave, options);
        //console.log("save ok!!");
        //console.log(urlSave);
        //console.log(depart);
        return  res;
    }catch(ex){
            console.log(ex.message); 
            
    }
}
    