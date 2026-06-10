import React, { useEffect, useState} from "react";
import  style from './workPlaneTV.module.css';
import {MenuUser} from "../../components/MenuUser";
import { Modal, Row, InputGroup, Form, Button, Container,  Col } from "react-bootstrap";
import {fechAllTaskType, fechAllTaskStatus} from '../../service/service-tvTask';
import {fechAllTransport, fechTransportById} from '../../service/service-transport';
import { fechPlaneById, fechAllSheff,fechAllDutyTV, fechAllDutySait, fechAllSait9_18, fetchAddPlan, fetchSavePlan, fechPlaneByDate } from "../../service/service-tvPlan";
import {fechEmployeeById,  fechAllCorrespondent, fechAllOperator, fechAllManager} from '../../service/service-employee';
import {convertViewDate} from '../../util/convertDate';
import { useQuery, useMutation, useQueryClient} from 'react-query';
import { useParams, useNavigate } from "react-router-dom";
import {WorkTVTaskItemList} from '../../components/workTaskComponents/workTVTaskItemList/index';
import { DynamicDownload } from "../../components/DownloadButton";
import { useAuthContext } from 'react-oauth2-code-pkce';

// План на телевидение за конкретный день и создание новой
export  const WorkPlaneTV = ()=>  {
  const {tokenData} = useAuthContext();
  // eslint-disable-next-line 
  const [alert, setAlert] = useState(false);
  // eslint-disable-next-line 
  const [alertMessage, setAlertMessage] = useState("");
  const [dateFont, setDateFont] = useState('')
  const [showDutySaite, setShowDutySaite] = useState(false);
  const [showDutySocial, setShowDutySocial] = useState(false);
  const [showStaffSaite, setStaffSaite] = useState(false);
  const [showTaskAdd, setTaskAddShow] = useState(false);
  const [pdutySait, setPdutySait] = useState([]);
  const [pdutySocial, setPdutySocial] = useState([]);
  const [pdaySaites, setPdaySaites] = useState([]);
  const [pcorespondent, setPcorespondent] = useState([]);
  const [poperator, setPoperator] = useState([]);
  const [planeDayCurrent, setPlaneDay] = useState(
    {
      id: 0,
      morningTVChef : {},
      daytimeTVChef : {},
      dutyTV : {},
      chiefSite : {},
      dutySite : [],
      dutySocial:[],
      planeDate : null,
      daySaites : [],
      planeTasks : [],
      planeName : ""
  }  )
  const  params = useParams();
  
  const [showOperatorSet, setShowOperator] = useState(false);
      const [showCorespondentSet, setShowCorespondent] = useState(false);
      const [plane, setItemTV] = useState({
              id: null,
              type: null,
              title: null,
              startTime: null,
              endTime: null,
              progress: null,
              shootingLocation: null,
              corespondent: [],
              operator: [],
              startLocation: null,
              exitLocation: null,
              manager: null,
              description: null
  });
  //const [curTasks, setCurTasks] = useState([]);
  const [allTransport, setAllTransport] = useState([]);
  const [allTaskProgress, setAllTaskProgress] = useState([]);
  const [allOperators, setAllOperators] = useState([]);
  const [allCorrespondent, setAllCorrespondent] =  useState([]);
  const [allManager, setAllManager] = useState([]);
  const [allChefs, setAllCheffs] = useState([]);
  const [allTasttype, setAllTaskType] = useState([]);
  // eslint-disable-next-line 
  const [allDutyTV, setAllDutyTV] = useState([]);
  const [allDutySait, setAllDutySait] = useState([]);
  const settingParams = async () =>{
    const tasks = await fechAllTaskType();
    setAllTaskType(tasks);
    const allTransport = await fechAllTransport();
    setAllTransport(allTransport);
    const allTaskStatus = await  fechAllTaskStatus();
    setAllTaskProgress(allTaskStatus);
    const allCor = await fechAllCorrespondent();
    setAllCorrespondent(allCor);
    const allOper = await fechAllOperator();
    setAllOperators(allOper);
    const allMan = await fechAllManager();
    setAllManager(allMan);
    const shefs = await   fechAllSheff(); 
    setAllCheffs(shefs);
    const dutysTv = await fechAllDutyTV();
    setAllDutyTV(dutysTv);
    const dutysSait = await fechAllDutySait();
    setAllDutySait(dutysSait);
    setPlaneDay({...planeDayCurrent, id:params?.id, morningTVChef : queryPlaneById?.data?.morningTVChef,
      daytimeTVChef : queryPlaneById?.data?.daytimeTVChef,
      dutyTV : queryPlaneById?.data?.dutyTV,
      chiefSite : queryPlaneById?.data?.chiefSite,
      dutySite : queryPlaneById?.data?.dutySite,
      dutySocial:queryPlaneById?.data?.dutySocial ,
      planeDate : queryPlaneById?.data?.planeDate,
      daySaites : queryPlaneById?.data?.daySaites,
      planeTasks : queryPlaneById?.data?.planeTasks})
  }


  
  // перенаправление на список планов
  const navigate = useNavigate();
  const closePlane = ()=>{
    navigate(`/listWorkPlaneTV`);
    //queryClient.clear();
  }

  
  // eslint-disable-next-line
 useEffect(() => {
    //onsole.log(queryPlaneById?.data?.dutySite)
  
  
  settingParams();
   // eslint-disable-next-line
 }, [])

  const handleCheck =(event) =>{
    setItemTV({
        ...plane, [event.target.name] : event.target.value
      });
  }
  const closeOperatorSet =()=>{
    setShowOperator(false);
  }

  const addOperatorTask =()=>{
    setShowOperator(true);
  }

  const closeCorespondentSet =()=>{
    setShowCorespondent(false);
  }

  const addCorrespondentTask = () =>{
    setShowCorespondent(true);
  }

  const selectmorningShef = async(e) =>{
    let morningTVChef = await fechEmployeeById(e.target.value);
    setPlaneDay({...planeDayCurrent, morningTVChef})
  }
  const selectDayShef = async(e) =>{
    let daytimeTVChef = await fechEmployeeById(e.target.value);
    setPlaneDay({...planeDayCurrent, daytimeTVChef})
  }
  const selectDutyTV = async(e) =>{
    let dutyTV = await fechEmployeeById(e.target.value);
    setPlaneDay( {...planeDayCurrent, dutyTV});
  }
  const selectSaitShef = async(e) =>{
    let chiefSite = await fechEmployeeById(e.target.value);
    setPlaneDay({...planeDayCurrent, chiefSite});
  }
  const selectDutySait = (e) =>{
    console.log(planeDayCurrent)
    if(pdutySait.includes( e.target.value)){
      return
    }
    console.log(pdutySait);
    setPdutySait([...pdutySait, e.target.value]);
  }
  const selectDutySocial = (e) =>{
   // console.log(planeDayCurrent)
    if(pdutySocial.includes( e.target.value)){
      return
    }
    //console.log(e.target.value)
    //let ds = (planeDayCurrent.dutySocial === null)? []: planeDayCurrent.dutySocial;
    //console.log(ds);
    //ds.push(e.target.value);
    setPdutySocial([...pdutySocial, e.target.value]);
    //setPlaneDay({...planeDayCurrent, dutySocial:ds})
  }
  const cleanDutySaite = () =>{
    setPlaneDay({...planeDayCurrent, dutySite:[]});
  }
  const cleanDutySocial = () =>{
    setPlaneDay({...planeDayCurrent, dutySocial:[]});
  } 
  const cleanDaySaite = () => {
    setPlaneDay({...planeDayCurrent, daySaites : []});
  }
  const setDutyOnModal = async() =>{
    setShowDutySaite(false);
    console.log(planeDayCurrent)
    let dutySite = [];
    if(planeDayCurrent?.dutySite !== null || planeDayCurrent?.dutySite  !== undefined){
      dutySite =  [...planeDayCurrent?.dutySite];
    }
    //console.log(dutySite);
    for(let i = 0; i < pdutySait.length; i++){
      // ищем повторные добавления
       // eslint-disable-next-line
      let con = dutySite.filter(a => a?.id == pdutySait[i]);
       // eslint-disable-next-line
      if(con.length == 0){
        let r = await fechEmployeeById(pdutySait[i]);
        let res = {
          value: r,
          alarm: false
        }
        dutySite.push(res);
      }
    }
    if(dutySite.length !==0 && dutySite[0] !== undefined){
      setPlaneDay({...planeDayCurrent, dutySite});
      setPdutySait([]);
    }

  }
  const setDutySocialOnModal = async() =>{
    setShowDutySocial(false);
    let dutySocial = [];

    if(planeDayCurrent?.dutySocial !== null && planeDayCurrent.dutySocial !== undefined){
      dutySocial= [...planeDayCurrent?.dutySocial]
    }
    
    //console.log(dutySocial);
    for(let i = 0; i < pdutySocial.length; i++){
      // ищем повторные добавления
       // eslint-disable-next-line
      let con = dutySocial.filter(a => a?.id == pdutySocial[i]);
       // eslint-disable-next-line
      if(con.length == 0){
        let r = await fechEmployeeById(pdutySocial[i]);
        let res ={
          value: r,
          alarm: false
        }
        dutySocial.push(res);
      }
    }
    if(dutySocial.length !==0 && dutySocial[0] !== undefined){
      setPlaneDay({...planeDayCurrent, dutySocial});
      setPdutySocial([]);
    }

  }
  const selectDaySaites = (e) =>{
    if(pdaySaites.includes(e.target.value)){
      return;
    }
    setPdaySaites([...pdaySaites, e.target.value]);

  }
  const setSait9_18Modal = async()=>{
    setStaffSaite(false);
    let daySaites = [];
    console.log(pcorespondent)
    console.log(planeDayCurrent.daySaites)
    if(planeDayCurrent?.daySaites !== null){
      daySaites = [...planeDayCurrent.daySaites];
    }
     
    for(let i = 0; i < pdaySaites.length; i++){
      // ищем повторные добавления
       // eslint-disable-next-line
      let con = daySaites.filter(a => a.id == pdaySaites[i]);
       // eslint-disable-next-line
      if(con.length == 0){
        let res = await fechEmployeeById(pdaySaites[i]);
        // let res = {
        //   value: r,
        //   alarm: false
        // }
        daySaites.push(res);
      }
      
    }
    if(daySaites.length !==0 && daySaites[0] !== undefined){
      setPlaneDay({...planeDayCurrent, daySaites});
      setPdaySaites([]);
    }
  }
  const addPlane = async()=>{
    console.log(planeDayCurrent.id)
    const check = await fechPlaneByDate(planeDayCurrent.planeDate);
    if(!check){
      setAlert(true);
      setAlertMessage(`на эту дату ${planeDayCurrent.planeDate}уже есть`)
      setDateFont('colorAlarm');
    }else{
      fetchAddPlan(planeDayCurrent);
      closePlane();
    }
    
  }
  
  const savePlane = async()=>{

    //console.log(planeDayCurrent)
    if(Number(planeDayCurrent.id) === 0 || planeDayCurrent.id == null){
        addPlane();
    }else{
      updatePlane();
    }
    queryClient.clear();
  }
  const updatePlane=()=>{
    //console.log("UPDATE")
    fetchSavePlan(planeDayCurrent);
    closePlane();
  }


  const closeTaskAdd = () =>{
    setTaskAddShow(false);
  }
  const taskAddShow = () =>{
    setTaskAddShow(true);
    setPlaneDay({...queryPlaneById.data});
  }
  const addTaskPlane = (e) =>{
    setTaskAddShow(false);
    let plans = planeDayCurrent.planeTasks;
    plans.push(plane);
    setPlaneDay({...planeDayCurrent, planeTasks:plans});
    saveTasks.mutate(planeDayCurrent);
    //console.log(planeDayCurrent);
    //console.log(plane.id);
  }

  const selectOperatorTask = (e) =>{
    if(poperator.includes(e.target.value)){
      return;
    }
    setPoperator([...poperator, e.target.value]);
  }
  const selectCorespondent = (e) =>{
    if(pcorespondent.includes(e.target.value)){
      return;
    }
    setPcorespondent([...pcorespondent, e.target.value]);
  }

  const setOperator = async()=>{
    setShowOperator(false);
    let operator = [...plane.operator];
    for(let i = 0; i < poperator.length; i++){
      // ищем повторные добавления
       // eslint-disable-next-line
      let con = operator.filter(a => a.id == poperator[i]);
       // eslint-disable-next-line
      if(con.length == 0){
        let res = await fechEmployeeById(poperator[i]);
        operator.push(res);
      }
      
    }
    if(operator.length !==0 && operator[0] !== undefined){
      setItemTV({...plane, operator});
      setPoperator([]);
    }
  }

  const cleanTaskOperator = ()=>{
    setItemTV({...plane, operator:[]});
  }

  const cleanTaskCorespondent = ()=>{
    setItemTV({...plane, corespondent:[]});
  }

  const setCorespondent = async()=>{
    setShowCorespondent(false);
    let corespondent = [...plane.corespondent];
    for(let i = 0; i < pcorespondent.length; i++){
      // ищем повторные добавления
       // eslint-disable-next-line
      let con = corespondent.filter(a => a.id == pcorespondent[i]);
       // eslint-disable-next-line
      if(con.length == 0){
        let res = await fechEmployeeById(pcorespondent[i]);
        corespondent.push(res);
      }
      
    }
    if(corespondent.length !==0 && corespondent[0] !== undefined){
      setItemTV({...plane, corespondent});
      setPcorespondent([]);
    }
  }

  const closeDutySaite =()=>{
    setShowDutySaite(false);
  }
  const closeDutySocial =()=>{
    setShowDutySocial(false);
  }
  
  const addDutySaite =()=>{
    setShowDutySaite(true);
  }
  const addDutySocial =()=>{
    setShowDutySocial(true);
  }

  const closeStaffSaite = ()=>{
    setStaffSaite(false);
  }

  const addStaffSaite = () =>{
    setStaffSaite(true);
  }

  const selectDate = (e) =>{
    setPlaneDay({...planeDayCurrent, planeDate : e.target.value });
  }

  const setManagerPlane = async (e) =>{
    const manager = await fechEmployeeById(e.target.value);
    setItemTV({...plane, manager});
  }

  const setTransportStart = async(e) =>{
    const transp = await fechTransportById(e.target.value);
    setItemTV({...plane, startLocation:transp})
  }

  const setTransportExit = async(e) =>{
    const transp = await fechTransportById(e.target.value);
    setItemTV({...plane, exitLocation:transp})
  }
  const setTasktype = (e) =>{
    setItemTV({...plane, type:e.target.value});
  }
  const setTaskProgress = (e) => {
    setItemTV({...plane, progress:e.target.value})
    //console.log(e.target.value)
  }

  const queryDutyTV = useQuery(
    'getDutyTV',
    fechAllDutyTV
  );
 
  const querySait9_18 = useQuery(
    'getSait9_18',
    fechAllSait9_18
  )
  //получаем план по id
  const queryPlaneById = useQuery(
      ['getPlane2ById', params.id],
      ()=>fechPlaneById(params.id)
  );
 
  const queryClient = useQueryClient();
  const saveTasks = useMutation(fetchSavePlan, {
        onSuccess: () => {
        // Инвалидация и обновление
        queryClient.refetchQueries('getPlaneById');
      },
  })

  //проверяем права
  // const checkPrimmision=()=>{
  //   if(tokenData?.roles?.includes("ProducerTV") || tokenData?.roles?.includes("admin")){
  //     return true;
  //   }
  //   return false;
  // }
  //setCurTasks([...queryPlaneById?.data?.planeTasks]);
  const showItem = (item, shefs, duty, dutySait, sait9_18, allTransport) =>{
      // если данные не загружены значить поставить все по умолчанию
      //
    
    return(
      <> 
      <Row>
      <InputGroup  className={`mb-6 ${style.inputGr}`}>
        <InputGroup.Text className="col-3" htmlFor="morningShef">Утренний шеф</InputGroup.Text>
        <Form.Select onChange={selectmorningShef} className="form-select"  id="morningShhef"
          disabled={tokenData?.roles?.includes("ProducerTV") || tokenData?.roles?.includes("admin")? false : true}>
          <option value={item !== undefined && item?.morningTVChef?.lastName !== undefined? item?.morningTVChef?.id :0}>{item !== undefined && item?.morningTVChef?.lastName !== undefined? item?.morningTVChef?.lastName + ' ' + item?.morningTVChef?.firstName :'Выбрать...'}</option>
          {shefs.map((sh) =>
            <option key={sh?.id} value={sh?.id}>{sh?.lastName + ' ' + sh?.firstName}</option>
          )}
        </Form.Select>
      </InputGroup>
    </Row>
    <Row>
      <InputGroup className={`mb-6 ${style.inputGr}`}>
        <InputGroup.Text className="col-3" htmlFor="dayShef">Дневной шеф</InputGroup.Text>
        <Form.Select onChange={selectDayShef} className="form-select" id="dayShef"
          disabled={tokenData?.roles?.includes("ProducerTV") || tokenData?.roles?.includes("admin")? false : true}>
          <option value={item !== undefined && item?.daytimeTVChef !== undefined ?item?.daytimeTVChef?.id:0}>{item !== undefined && item?.daytimeTVChef?.lastName !== undefined ? item?.daytimeTVChef?.lastName + ' ' + item?.daytimeTVChef?.firstName :'Выбрать...'}</option>
          {shefs.map((sh) =>
            <option key={sh?.id} value={sh?.id}>{sh?.lastName + ' ' + sh?.firstName}</option>
          )}
        </Form.Select>
      </InputGroup>
    </Row>
    <Row>
      <InputGroup className={`mb-6 ${style.inputGr}`}>
        <InputGroup.Text className="col-3" htmlFor="">Дежурный ТВ</InputGroup.Text>
        <Form.Select onChange={selectDutyTV} className="form-select" id="dutyTV"
          disabled={tokenData?.roles?.includes("ProducerTV") || tokenData?.roles?.includes("admin")? false : true}>
          <option value={item !== undefined && item?.dutyTV?.id !== undefined ?item?.dutyTV.id:0}>{item !== undefined && item?.dutyTV?.lastName !== undefined? item?.dutyTV?.lastName + ' ' + item?.dutyTV?.firstName :'Выбрать...'}</option>
          {duty?.map((dt) =>
            <option key={dt?.id} value={dt?.id}>{dt?.lastName + ' ' + dt?.firstName}</option>
          )}
        </Form.Select>
      </InputGroup>
    </Row>
    <Row>
      <InputGroup className={`mb-6 ${style.inputGr}`}>
        <InputGroup.Text className="col-3" htmlFor="saitShef">Шеф сайта</InputGroup.Text>
        <Form.Select onChange={selectSaitShef} className="form-select" id="saitShef"
          disabled={tokenData?.roles?.includes("ProducerTV") || tokenData?.roles?.includes("admin")? false : true}>
          <option value={item !== undefined && item?.chiefSite?.id !== undefined ? item?.chiefSite?.id:0}>{item !== undefined && item?.chiefSite?.lastName !== undefined? item?.chiefSite?.lastName + ' ' + item?.chiefSite?.firstName :'Выбрать...'}</option>
          {shefs.map((sh) =>
            <option key={sh?.id} value={sh?.id}>{sh?.lastName + ' ' + sh?.firstName}</option>
          )}
        </Form.Select>
      </InputGroup>
    </Row>
    <Row>
      <InputGroup className={`mb-6 ${style.inputGr}`}>
        <InputGroup.Text className="col-3" htmlFor="dutySait">Дежурный на сайте</InputGroup.Text>
        <Col className="areatext form-control">
        {planeDayCurrent?.dutySite !== undefined? planeDayCurrent?.dutySite?.map((it) => <span key={Math.random()} className={(it?.alarm)?style.colorAlarm:style.colorBlack}>  {it?.value?.lastName}   {it?.value?.firstName+','} </span> ):''} </Col>
        
          <Button variant="primary col-1" data-bs-toggle="modal" onClick={addDutySaite}
            disabled={tokenData?.roles?.includes("ProducerTV") || tokenData?.roles?.includes("admin")? false : true}>
              Добавить <br/> дежурного
          </Button>
          <Button variant="danger col-1" data-bs-toggle="modal" onClick={cleanDutySaite}
            disabled={tokenData?.roles?.includes("ProducerTV") || tokenData?.roles?.includes("admin")? false : true}>
              Очистить <br/> список
          </Button> 
        
      </InputGroup>
    </Row>
    <Row>
      <InputGroup className={`mb-6 ${style.inputGr}`}>
        <InputGroup.Text className="col-3" htmlFor="dutySocial">Дежурный по соцсетям</InputGroup.Text>
        <Col className="areatext form-control">
        {planeDayCurrent?.dutySocial !== undefined? planeDayCurrent?.dutySocial?.map((it) => <span key={Math.random()}  className={(it.alarm)?style.colorAlarm:style.colorBlack}>  {it?.value?.lastName}   {it?.value?.firstName+','} </span> ):''} </Col>
        
          <Button variant="primary col-1" data-bs-toggle="modal" onClick={addDutySocial}
            disabled={tokenData?.roles?.includes("ProducerTV") || tokenData?.roles?.includes("admin")? false : true}>
            Добавить <br/> дежурного
          </Button>
          <Button variant="danger col-1" data-bs-toggle="modal" onClick={cleanDutySocial}
            disabled={tokenData?.roles?.includes("ProducerTV") || tokenData?.roles?.includes("admin")? false : true}>
              Очистить <br/> список
          </Button>
        
      </InputGroup>
    </Row>
    <Row>
      <InputGroup className={`mb-6 ${style.inputGr}`}>
        <InputGroup.Text className="col-3" htmlFor="site9_18">Сайт с 9.00 до 18.00</InputGroup.Text>
        <Col className="areatext form-control">{planeDayCurrent?.daySaites !== undefined ? planeDayCurrent?.daySaites?.reduce((a, it) => a + it?.lastName + ' ' + it?.firstName + ', ', ' ' ):''}</Col>
        
          <Button variant="primary col-1" data-bs-toggle="modal"   onClick={addStaffSaite}
            disabled={tokenData?.roles?.includes("ProducerTV") || tokenData?.roles?.includes("admin")? false : true}>
            Добавить 
          </Button>
          <Button variant="danger col-1" data-bs-toggle="modal"  onClick={cleanDaySaite}
            disabled={tokenData?.roles?.includes("ProducerTV") || tokenData?.roles?.includes("admin")? false : true}>
              Очистить <br/> список
          </Button>
          
      </InputGroup>
    </Row>

    {/* Modal для добавления дежурного */}
    <Modal show={showDutySaite} onHide={closeDutySaite} animation={false}>
      <Modal.Header closeButton>
          <Modal.Title>Редактировать дежурного на сайте</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <InputGroup className={`mb-3 ${style.inputGr}`}>
            <Form.Select onChange={selectDutySait} className="form-select" multiple id="dutySait">
              { dutySait?.map((ds) =>
            <option key={ds?.id} value={ds?.id}>{ds?.lastName + ' ' + ds?.firstName}</option>
          )} 
            </Form.Select>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
            <Button  variant="secondary" onClick={closeDutySaite}>Закрыть</Button>
            <Button  variant="primary" onClick={setDutyOnModal}>Применить</Button>
        </Modal.Footer> 
    </Modal>
     {/* Modal для добавления дежурного по соцсетям*/}
     <Modal show={showDutySocial} onHide={closeDutySocial} animation={false}>
      <Modal.Header closeButton>
          <Modal.Title>Редактировать дежурного по соцсетям</Modal.Title>
      </Modal.Header>
        <Modal.Body>
          <InputGroup className={`mb-3 ${style.inputGr}`}>
            <Form.Select onChange={selectDutySocial} className="form-select" multiple id="dutySait">
              { dutySait?.map((ds) =>
            <option key={ds?.id} value={ds?.id}>{ds?.lastName + ' ' + ds?.firstName}</option>
          )} 
            </Form.Select>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
            <Button  variant="secondary" onClick={closeDutySocial}>Закрыть</Button>
            <Button  variant="primary" onClick={setDutySocialOnModal}>Применить</Button>
        </Modal.Footer> 
    </Modal>

    {/* Modal для добавления сайт с 9 до 18*/}
    <Modal show={showStaffSaite} onHide={closeStaffSaite}>
        <Modal.Header closeButton>
          <Modal.Title>Редактировать сайт с 9.00 до 18.00</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className={`mb-3 ${style.inputGr}`}>
            <Form.Select onChange={selectDaySaites} className="form-select" multiple id="sait9_18">
            {sait9_18?.map((s9_18) =>
            <option key={s9_18?.id} value={s9_18?.id}>{s9_18?.lastName + ' ' + s9_18?.firstName}</option>
          )}
            </Form.Select>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={closeStaffSaite}>Закрыть</Button>
            <Button variant="primary" onClick={setSait9_18Modal}>Применить</Button>
        </Modal.Footer>
    </Modal>
     
      
    <Row>
        {item !== undefined? 
          <WorkTVTaskItemList tasks={item.planeTasks}/> :''
        }        
        {tokenData?.roles?.includes("ProducerTV") || tokenData?.roles?.includes("admin")?<>  
          <Button  variant="primary col-1" data-bs-toggle="modal" data-bs-target="#addTask" onClick={taskAddShow}>
            Добавить задачу
          </Button>
          <Col md={{ span: 6, offset: 4 }}></Col>
          <Button disabled={ (planeDayCurrent.planeDate ===null  )? true :false}  variant="primary col-1" data-bs-toggle="modal"  onClick={savePlane}>
            Сохранить план
          </Button>
        </> :''}
    </Row>

      {/* Modal для добавления задачи */}
    <Modal show={showTaskAdd} onHide={closeTaskAdd}  size="lg"  aria-labelledby="contained-modal-title-vcenter" centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Добавить задачу </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                           
                            <Row>
                                <Col></Col>
                                <InputGroup className="mb-3">
                                   <InputGroup.Text >
                                        Тип задачи
                                    </InputGroup.Text>  
                                    <Form.Select className="form-select" id="type" onChange={setTasktype}>
                                              <option value={0}>Выбрать...</option>
                                              {allTasttype.map((tt) =>
                                                <option key={tt} value={tt}>{tt === 'TZ' && 'ТЗ'} {tt === 'RED' && 'РЕД'}  {tt === 'PR' && 'ПР'}  {tt === 'ALL' && '*'}</option>
                                              )}
                                    </Form.Select>
                                </InputGroup>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text >
                                        Название
                                    </InputGroup.Text>
                                    <Form.Control 
                                        aria-label="Описание"
                                        aria-describedby="title"
                                        name="title"
                                        defaultValue=""
                                        onChange={handleCheck}
                                    />
                                </InputGroup>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text >
                                        Время начала
                                    </InputGroup.Text>
                                    <Form.Control 
                                        aria-label="Время начала"
                                        aria-describedby="startTime"
                                        name="startTime"
                                        type='time'
                                        defaultValue={0}
                                        onChange={handleCheck}
                                    />
                                </InputGroup>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text >
                                        Время окончания
                                    </InputGroup.Text>
                                    <Form.Control 
                                        aria-label="Время окончания"
                                        aria-describedby="endTime"
                                        name="endTime"
                                        type='time'
                                        defaultValue={0}
                                        onChange={handleCheck}
                                    />
                                </InputGroup>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <InputGroup className="mb-3">
                                <InputGroup.Text >
                                      Статус задачи
                                </InputGroup.Text>
                                <Form.Select className="form-select" id="taskProgress" onChange={setTaskProgress}>
                                    <option value={plane?.progress?.id?? 0}>
                                        {plane.progress === undefined ? 'Выбрать...': (plane.progress === 'SHOT' && 'снято') || (plane.progress === 'DEVELOP' && 'разработка') || (plane.progress === 'DELAY' && 'отложено') || (plane.progress === 'MOVE' && 'перенесено') || (plane.progress === 'CANCELLED' && 'отменено')}</option>
                                              {allTaskProgress.map((tp) =>
                                      <option key={tp} value={tp}>{tp === 'SHOT' && 'снято'} {tp === 'DEVELOP' && 'разработка'}  {tp === 'DELAY' && 'отложено'}  {tp === 'MOVE' && 'перенесено'} {tp === 'CANCELLED' && 'отменено'}</option>
                                    )}
                                </Form.Select>
                                </InputGroup>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text >
                                        Место съемки
                                    </InputGroup.Text>
                                    <Form.Control 
                                        aria-label="Место съемки"
                                        aria-describedby="shootingLocation"
                                        name="shootingLocation"
                                        defaultValue=''
                                        onChange={handleCheck}
                                    />
                                </InputGroup>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <InputGroup className="mb-8">
                                    <InputGroup.Text >
                                        Корреспондент
                                    </InputGroup.Text>
                                    <Form.Control as="textarea" readOnly className='col-2'  id="corsel" cols={10} rows={2} aria-label="textarea" 
                                      defaultValue={plane.corespondent[0] !== undefined? plane.corespondent.reduce((a, op) => a + op.lastName + ' ' + op.firstName + ', ', ' ' ):''}>

                                      </Form.Control>
                                           
                                    <Button  variant="primary " data-bs-toggle="modal" onClick={addCorrespondentTask}>
                                        +
                                    </Button>
                                    <Button variant="danger" onClick={cleanTaskCorespondent} >-</Button>
                                    
                                </InputGroup>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <InputGroup className="col-8">
                                    <InputGroup.Text >
                                        Оператор
                                    </InputGroup.Text>
                                    <Form.Control as="textarea" readOnly className='col-2'  id="opersel" cols={10} rows={2} aria-label="textarea"
                                    defaultValue={plane.operator[0] !== undefined? plane.operator.reduce((a, op) => a + op.lastName + ' ' + op.firstName + ', ', '' ):''}></Form.Control>
                                           
                                    <Button  variant="primary" data-bs-toggle="modal" onClick={addOperatorTask}>
                                            +
                                    </Button>
                                    <Button variant="danger" onClick={cleanTaskOperator}>-</Button>
                                </InputGroup>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text >
                                        Водитель привозит
                                    </InputGroup.Text>
                                    <Form.Select className="form-select" id="tvStartLocation" 
                                        aria-label="Водитель привозит"
                                        aria-describedby="startLocation"
                                        name="startLocation"
                                        onChange={setTransportStart}                                        
                                    > 
                                    <option value={0}>Выбрать...</option>
                                              {allTransport.map((trStart) =>
                                                <option key={trStart.id} value={trStart.id}>{`${trStart.driver.lastName}.${trStart.driver.firstName[0]} ${trStart.car.carNumber}`} </option>
                                              )}
                                    </Form.Select>
                                </InputGroup>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text >
                                        Водитель забирает
                                    </InputGroup.Text>
                                    <Form.Select className="form-select" id="exitLocation"
                                        aria-label="Водитель забирает"
                                        aria-describedby="exitLocation"
                                        name="exitLocation"
                                        onChange={setTransportExit}
                                    >
                                      <option value={0}>Выбрать...</option>
                                              {allTransport.map((trStart) =>
                                                <option key={trStart.id} value={trStart.id}>{`${trStart.driver.lastName}.${trStart.driver.firstName[0]} ${trStart.car.carNumber}`} </option>
                                              )}
                                     </Form.Select> 
                                </InputGroup>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text >
                                        Менаджер
                                    </InputGroup.Text>
                                    <Form.Select name="manager"  className="form-select" id="manager" onChange={setManagerPlane}>
                                              <option value={0}>Выбрать...</option>
                                              {allManager.map((men) =>
                                                <option key={men.id} value={men.id}>{men.firstName + ' ' + men.lastName} </option>
                                              )}
                                    </Form.Select>
                                </InputGroup>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text >
                                        Информация о съемке
                                    </InputGroup.Text>
                                    <Form.Control 
                                        aria-label="Описание"
                                        aria-describedby="description"
                                        name="description"
                                        defaultValue=""
                                        onChange={handleCheck}
                                    />
                                </InputGroup>
                                <Col></Col>
                            </Row>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={closeTaskAdd} data-modal="close" >  Закрыть </Button>
                                <Button variant="primary" onClick={addTaskPlane} data-item={plane.id} data-button="save"  > Сохранить</Button>
                            </Modal.Footer>
                        </Modal> 

                        {/* Modal для добавления оператора*/}
                        <Modal show={showOperatorSet} onHide={closeOperatorSet} animation={false}>
                          <Modal.Header closeButton>
                            <Modal.Title>Редактировать операторов</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <InputGroup className={`mb-3 ${style.inputGr}`}>
                              <Form.Select onChange={selectOperatorTask} className="form-select" multiple id="editoper">
                                {allOperators.map((op) =>
                                    <option key={op.id} value={op.id}>{op.lastName + ' ' + op.firstName}</option>
                                )}
                              </Form.Select>
                            </InputGroup>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button  variant="secondary" onClick={closeOperatorSet}>Закрыть</Button>
                            <Button  variant="primary" onClick={setOperator}>Применить</Button>
                          </Modal.Footer> 
                        </Modal>
                        
                        {/* Modal для добавления кореспондентов*/}
                        <Modal show={showCorespondentSet} onHide={closeCorespondentSet} animation={false}>
                          <Modal.Header closeButton>
                            <Modal.Title>Редактировать корреспондентов</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <InputGroup className={`mb-3 ${style.inputGr}`}>
                              <Form.Select onChange={selectCorespondent} className="form-select" multiple id="editcorespondent">
                                 { allCorrespondent? allCorrespondent.map((cor) =>
                                    <option key={cor.id} value={cor.id}>{cor.lastName + ' ' + cor.firstName}</option>
                                 ): ''}
                              </Form.Select>
                            </InputGroup>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button  variant="secondary" onClick={closeCorespondentSet}>Закрыть</Button>
                            <Button  variant="primary" onClick={setCorespondent}>Применить</Button>
                          </Modal.Footer> 
                        </Modal>
      
      </>
    )
    
  }  
      return (
        <Container>
        <MenuUser/>
          <Row>
            <Col><h1>План работы</h1></Col>
            <Col className={` ${style.maginTop}`}>
              {queryPlaneById.data?.id !== undefined && queryPlaneById.data?.id !== 0? convertViewDate(queryPlaneById.data?.planeDate) : 
                <Form.Control onChange={selectDate} type="date" className={dateFont} id="planeData" name="planeData"  >
                </Form.Control>}</Col><Col>
                <DynamicDownload url={`${document.location.protocol}/download/tvplan/${params.id}`} filename={`plane_${params.id}.xlsx`} hidden={false}/></Col>
          </Row> 
          {showItem(queryPlaneById.data, allChefs, queryDutyTV.data, allDutySait, querySait9_18.data, allTransport)}
         
        </Container>
        );
    
  }
