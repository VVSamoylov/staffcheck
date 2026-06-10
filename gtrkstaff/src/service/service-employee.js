export const fetchDeleteEmployeeById = async (id)=> {
               try{
                    const urlDelete = `${document.location.protocol}/employee/deleteById?id=${id}`;
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

export const   fetchGetAllEmployee = async () => {
                try{
                    const urlGetAll = `${document.location.protocol}/employee/getallemployee`;
                    //const urlGetAll = `http://localhost:8080/employee/getallemployee`;
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

export const   fetchSaveEmployee = async (staff) => {
    try{
        const urlSaveEmployee = `${document.location.protocol}/employee/save`;
        //const urlSaveEmployee = `http://localhost:8080/employee/save`;
        const options = {
            method: 'POST',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        options.body  = JSON.stringify(staff);
        const res = await fetch(urlSaveEmployee, options);
        //console.log("save ok!!");
        //console.log(urlSaveEmployee);
        //console.log(staff);
        return  res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}

//TODO
export const   fetchAddEmployee = async () => {
                try{
                    const urlGetAll = `${document.location.protocol}/employee/getallemployee`;
                    //const urlGetAll = `http://localhost:8080/employee/getallemployee`;
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

export const   fechAllCorrespondent = async () => {
    try{
        const urlGetAllCorrespondent = `${document.location.protocol}/employee/findAllCorrespondent`;
        //const urlGetAllCorrespondent = `http://localhost:8080/planeTV/getAllCorrespondent`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetAllCorrespondent, options).then(responce => responce.json());
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}

export const   fechAllOperator = async () => {
    try{
        const urlGetAllOperator = `${document.location.protocol}/employee/findAllOperator`;
        //const urlGetAllOperator = `http://localhost:8080/planeTV/getAllOperator`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetAllOperator, options).then(responce => responce.json());
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}
 
export const   fechAllManager = async () => {
    try{
        const urlGetAllManager = `${document.location.protocol}/employee/findAllManager`;
        //const urlGetAllManager = `http://localhost:8080/planeTV/getAllManager`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetAllManager, options).then(responce => responce.json());
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}

export const   fechAllDriver = async () => {
    try{
        const urlGetAllDriver = `${document.location.protocol}/employee/findAllDriver`;
        //const urlGetAllDriver = `http://localhost:8080/planeTV/getAllDriver`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetAllDriver, options).then(responce => responce.json());
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}

export const   fechEmployeeById = async (id) => {
    if(id === undefined){
        return
    }
    try{
        const urlGetById = `${document.location.protocol}/employee/getEmployeebyid?id=${id}`;
        //const urlGetById = `http://localhost:8080/employee/getEmployeebyid?id=${id}`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetById, options).then(responce => responce.json());
        //console.log(`rest fechEmployeeId ok!!  url ${urlGetById}`, res);
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}

export const fechDispatcher = async () =>{
    try{
        const urlGetDispatcher = `${document.location.protocol}/employee/findDispatcher`;
        //const urlGetDispatcher = `http://localhost:8080/employee/findDispatcher`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetDispatcher, options).then(responce => responce.json());
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}

export const fechMekhanic = async () =>{
    try{
        const urlGetMekhanic = `${document.location.protocol}/employee/findMekhanic`;
        //const urlGetMekhanic = `http://localhost:8080/employee/findMekhanic`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetMekhanic, options).then(responce => responce.json());
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}

export const fechBoss = async () =>{
    try{
        const urlGetboss = `${document.location.protocol}/employee/allBoss`;
        //const urlGetboss = `http://localhost:8080/employee/allBoss`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetboss, options).then(responce => responce.json());
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}
export const fechallByDept = async (deptId) =>{
    try{
        const urlGetEmployeeByDept = `${document.location.protocol}/employee/allByDept?deptId=${deptId}`;
        //const urlGetEmployeeByDept = `http://localhost:8080/employee/allByDept?deptId=${deptId}`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetEmployeeByDept, options).then(responce => responce.json());
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}
