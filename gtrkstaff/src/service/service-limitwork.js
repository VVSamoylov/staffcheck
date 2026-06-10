export const   fetchGetLimit = async () => {
    try{
        const urlGet = `${document.location.protocol}/utils/getlimit`;
        //const urlGet = `http://localhost:8080/utils/getlimit`;
        const options = {
            method: 'GET',
            headers: new Headers({'Authorization': `${window.TOCKEN}`,'content-type': 'application/json'})
        };
        const res = await fetch(urlGet, options).then(responce => responce.json());
        //console.log("rest ok!!", res);
        return res;
    }catch(ex){
        console.log(ex.message); 
        
    }
}

export const   fetchSaveWorkLimit = async (limit) => {
    try{
        const urlSave = `${document.location.protocol}/utils/setWorkInterval`;
        //const urlSave = `http://localhost:8080/utils/setWorkInterval`;
        const options = {
            method: 'POST',
            headers: new Headers({'Authorization': `${window.TOCKEN}`, 'content-type': 'application/json'})
        };
        options.body  = JSON.stringify(limit);
        //console.log(limit);
        const res = await fetch(urlSave, options);
        //console.log("save ok!!");
        //console.log(urlSave);
        //console.log(depart);
        return  res;
    }catch(ex){
            console.log(ex.message); 
            
    }
}
    