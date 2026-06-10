export const   fetchGetReports = async (depId, shedulerId, dateStart, dateEnd) => {
    try{
        const urlGetReport = `${document.location.protocol}/report/getSkudReport?depId=${depId}&shedulerId=${shedulerId}&dateFrom=${dateStart}&dateTo=${dateEnd}`;
        //const urlGetAll = `http://localhost:8080/report/getSkudReport`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetReport, options).then(responce => responce.json());
        //console.log("rest ok!!", res);
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}

export const   fetchGetSkudEventEmployeeBetweenDate = async (employeeId, dateStart, dateEnd) => {
    try{
        const urlGetEvent = `${document.location.protocol}/utils/skud/getByEmployee?employeeId=${employeeId}&dateFrom=${dateStart}&dateTo=${dateEnd}`;
        //const urlGetEvent = `http://localhost:8080/utils/skud/getByEmployee?employeeId=${employeeId}&dateFrom=${dateStart}&dateTo=${dateEnd}`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGetEvent, options).then(responce => responce.json());
        //console.log("rest ok!!", res);
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}

export const   fetchGetSkudReportLatecomersByEmployees= async (deptId, dateTimeTerm) => {
    let urlGetEvent;
    if(deptId == null){
        urlGetEvent =`${document.location.protocol}/report/getSkudReportLatecomersByEmployees?terminatorDateTime=${dateTimeTerm}`;
    }else{
        urlGetEvent = `${document.location.protocol}/report/getSkudReportLatecomersByEmployees?depId=${deptId}&terminatorDateTime=${dateTimeTerm}`;
    }
    const options = {
        method: 'GET',
        headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
    };
    try{
        const res = await fetch(urlGetEvent, options).then(responce => responce.json());
        //console.log("rest ok!!", res);
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}


export const   saveEventsEmployee= async (events) => {
    try{
        const urlSaveEvent = `${document.location.protocol}/utils/skud/setEmployee`;
        //const urlSaveEvent = `http://localhost:8080/utils/skud/setEmployee`;
        const options = {
            method: 'POST',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        options.body  = JSON.stringify(events);
        const res = await fetch(urlSaveEvent, options);
        //console.log("save ok!!");
        //console.log(urlSave);
        //console.log(depart);
        return  res;
    }catch(ex){
            console.log(ex.message); 
            
    }
}

export const fetchDeleteEventById = async (id)=> {
               try{
                    const urlDelete = `${document.location.protocol}/utils/skud/deleteEventById?id=${id}`;
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