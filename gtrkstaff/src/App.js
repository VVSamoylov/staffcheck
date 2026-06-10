import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom"
import Home  from "./views/Home"
import {AddEmployee} from "./views/addEmployee"
import ListEmployee from './views/listEmployee';
import {UploadEmployee} from './views/uploadEmployee';
import UploadAbsentees from './views/uploadAbsentees';
import {AddDepartament} from './views/departamets/addDapartament';
import ListDepartament from './views/departamets/listDepartament';
import ListNotWorks from './views/notWorks/listNotWorks';
import  {AddJob} from './views/Jobs/AddJob';
import ListJobs from './views/Jobs/ListJob';
import {QueryClient, QueryClientProvider} from 'react-query';
import ListShedules from './views/shedules/ListShedules';
import ListPlaneTV from './views/workPlaneList';
import {ListCars} from './views/Garage/ListCars';
import { ListWayBill } from './views/Garage/ListWayBill';
import { WorkPlaneTV} from './views/workPlaneTV';
import {SetLimitTVWorkEmployee } from './views/SetLimitTVWorkEmployee';
import { PrintOrderCar } from './components/PrintOrderCar';
import { WorkPlace } from './views/Issuance/WorkPlace';
import {IssuanceTasks} from './views/Issuance/IssuanseTasks';
import { SkudReport } from './views/reports/Skud';
import {TrevelLogReport} from './views/reports/Garaje/TravelLog';
import {VedomostiLogReport} from './views/reports/Garaje/Vedomost';
import {FlatSkudReport} from './views/reports/Skud/flatReport';
import {NotFound}  from './views/NotFound';
import {DriverCard} from './views/reports/Garaje/DriverCard';
import {SetEventEmployee} from './views/reports/Skud/SetEventEmployee';
import {SkudReportsLateCmmers} from './views/reports/Skud/LateCommers';
import { useAuthContext } from 'react-oauth2-code-pkce';
import { Button } from 'react-bootstrap';
//import Keycloak from 'keycloak-js';
//import { TOCKEN, portserver, hostnameserver } from './constants';

/* 
Инициализация
*/

// let initOption = {
//   url:`http://127.0.0.3:9443`,
//   realm:'gtrk',
//   clientId:'gtrkhr'
// }

// let kc = new Keycloak(initOption);
// kc.init({
//   onLoad:'login-required',
//   checkLoginIframe: true,
//   pkceMethod: 'S256'
// }).then((auth) =>{
//   if(!auth){
//     window.location.reload();
//   }else{
//     console.log('Авторизован');
//     console.log(`auth ${auth}`);
//     console.log(`Keycloack ${Keycloak}`);
//     console.log(`Access tocken : ${kc.token}`);
//     window.TOCKEN=`Bearer ${kc.token}`;
//     kc.onTokenExpired = ()=>{
//       console.log('токен просрочен');
//     }
//   }
// }, ()=>{
//   console.log('Ошибка аутентификации');
// })


export const queryClient = new QueryClient(
  {
    defaultOptions:{
      queries:{
        //установка времени устаревания кеша запроса
        staleTime: 300* 1000,
      }
    }
  }
);



function App() {
  const {token, tokenData, logIn,  isAuthenticated} = useAuthContext();
  useEffect(()=>{
    if(token){ <Button></Button>
      //console.log("токен доступен " + token);
      window.TOCKEN=`Bearer ${token}`;
      window.TOKENDATA= tokenData;
      window.ISAUTH = isAuthenticated;
    }
  }, [token, tokenData, isAuthenticated])
  return (
    <>
      {!token? (<div class='container'><div class='row'><div class='cel'></div><div class='cel'><Button variant="primary" onClick={()=>{logIn(); window.TOCKEN=`Bearer ${token}`;}}>Войти</Button></div><div class='cel'></div></div></div>) :(
    <QueryClientProvider client={queryClient}>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addEmployee" element={<AddEmployee />} />
        <Route path="/addDepartament" element={<AddDepartament />} />
        <Route path="/addJob" element={<AddJob />} />
        <Route path="/listEmployee" element={<ListEmployee />} />
        <Route path="/listDepartament" element={<ListDepartament />} />
        <Route path="/listJobs" element={<ListJobs />} />
        <Route path="/listShedule" element={<ListShedules />} />
        <Route path="/listNotWorks" element={<ListNotWorks />} />
        <Route path='/listWorkPlaneTV' element={<ListPlaneTV/>} />
        <Route path="/uploadEmployee" element={<UploadEmployee />} />
        <Route path="/uploadAbsentees" element={<UploadAbsentees />} />
        <Route path="/workPlaneTV" element={<WorkPlaneTV/>} />
        <Route path="/workPlaneTVById/:id" element={<WorkPlaneTV/>} />
        <Route path="/setLimitTVWorkEmployee" element={<SetLimitTVWorkEmployee/>}/>
        <Route path='/listCars' element={<ListCars/>} />
        <Route path='/listWayBill' element={<ListWayBill/>}/>
        <Route path='/printOrderCar/:id' element={<PrintOrderCar/>}/>
        <Route path='/addWorkPlace' element={<WorkPlace/>}/>
        <Route path='/addIssuanceTask' element={<IssuanceTasks/>}/>
        <Route path='/skudreport' element={<SkudReport/>}/>
        <Route path='/skud/seteventemployee' element={<SetEventEmployee/>}/>
        <Route path='/flatskudreport' element={<FlatSkudReport/>}/>
        <Route path='/skudReportsLateCmmers' element={<SkudReportsLateCmmers/>}/>
        <Route path='/garage/travellog' element={<TrevelLogReport/>}/>
        <Route path='/garage/VedomostiLogReport' element={<VedomostiLogReport/>}/>
        <Route path='/garage/ReporsDriverCard' element={<DriverCard/>}/>
        
        <Route path="*" element={<NotFound/>} />
        
    </Routes>
    </QueryClientProvider>)}
    </>
  );
}

export default App;
