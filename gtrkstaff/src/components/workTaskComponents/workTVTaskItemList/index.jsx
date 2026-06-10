import React, { useEffect, useState} from 'react';
import {Button,  Form, Alert, Table, Modal, Row, Col, InputGroup } from 'react-bootstrap';
import { useQuery, useMutation, useQueryClient} from 'react-query';
import { useParams } from 'react-router-dom';
import {fechAllTaskType, fetchDeleteTvTask, fetchUpdateTask, fechAllTaskStatus} from '../../../service/service-tvTask';
import { fechPlaneById } from "../../../service/service-tvPlan";
import {fechAllTransport, fechTransportById} from '../../../service/service-transport';
import { fechAllCorrespondent, fechAllManager, fechAllOperator, fechEmployeeById} from '../../../service/service-employee';
import { WorkTVTaskListHeader } from '../workTaskListHeader';
import { useAuthContext } from 'react-oauth2-code-pkce';
import style from './WorkTVTaskItemList.module.css';
/* eslint-disable */
/* задача для съемки список*/
export const WorkTVTaskItemList = ({tasks})=> {
    const  params = useParams();
    //const dispatch = useDispatch();
    const {tokenData} = useAuthContext();
    const [allTaskType, setAllTaskType] = useState([]);
    const [allTaskProgress, setAllTaskProgress] = useState([]);
    const [allCorrespondent, setAllCorrespondent] = useState([]);
    const [allOperator, setAlloperator] = useState([]);
    const [allManager, setAllManager] = useState([]);
    const [allTransport, setAllTransport] = useState([]);
    const [showTask, setShowTask] = useState(false);
    const [showOperatorSet, setShowOperator] = useState(false);
    const [showCorespondentSet, setShowCorespondent] = useState(false);
    const [curentCorespondent, setCurespondent] = useState([]);
    const [pcorespondent, setPcorespondent] = useState([]);
    const [poperator, setPoperator] = useState([]);
    const [curTask, setItemTV] = useState(
        {
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
        }
    );
    //props.tasks
    
    const settings = async() =>{
        const allTask = await fechAllTaskType();
        setAllTaskType(allTask);
        const allTaskStatus = await  fechAllTaskStatus();
        setAllTaskProgress(allTaskStatus);
        const allCorr = await fechAllCorrespondent();
        setAllCorrespondent(allCorr);
        const allOp = await fechAllOperator();
        setAlloperator(allOp);
        const allManeg = await fechAllManager();
        setAllManager(allManeg);
        const allTr = await fechAllTransport();
        setAllTransport(allTr);
    }
    
    useEffect(()=>{
        settings();
    },[])     
    
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
        let operator = [...curTask.operator];
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
          setItemTV({...curTask, operator});
          setPoperator([]);
        }
    }
    
    const cleanTaskOperator = ()=>{
        const operator=[];
        setItemTV({...curTask, operator:operator });
    }
    
    const cleanTaskCorespondent = () =>{
        setCurespondent([]);
        setItemTV({...curTask, corespondent:[]});
    }
    
    const setCorespondent = async()=>{
        setShowCorespondent(false);
        
        let corespondent = [];
        if(curTask.corespondent != undefined || curTask.corespondent != null){ 
            corespondent = [...curTask.corespondent];
        }
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
          setItemTV({...curTask, corespondent});
          setPcorespondent([]);
        }
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
    
    

    const handleCheck =(event) =>{
        setItemTV({
            ...curTask, [event.target.name] : event.target.value
          });
    }

    const handleClose = () =>{    
        setShowTask(false);
    }

    const setTransportStart = async(e) =>{
       const transp = await fechTransportById(e.target.value);
       setItemTV({...curTask, startLocation:transp})
    }
    
    const setTransportExit = async(e) =>{
       const transp = await fechTransportById(e.target.value);
       setItemTV({...curTask, exitLocation:transp})
    }

    const setManagerPlane = async (e) =>{
        const manager = await fechEmployeeById(e.target.value);
        setItemTV({...curTask, manager});
    }
    const setTasktype = (e) =>{
        setItemTV({...curTask, type:e.target.value});
    }
    const setTaskProgress = (e) => {
        setItemTV({...curTask, progress:e.target.value})
    }
   
    const queryPlaneById = useQuery(
          ['getPlaneById', params.id],
          ()=> fechPlaneById(params.id)
    );
     
    const queryClient = useQueryClient();
    const saveTasks = useMutation(fetchUpdateTask, {
              onSuccess: () => {
                  // Инвалидация и обновление
                  queryClient.refetchQueries('getPlaneById');
                },
    })

    const deleteShedule = useMutation(fetchDeleteTvTask, {
            onSuccess: () => {
                // Инвалидация и обновление
                queryClient.refetchQueries('getPlaneById');
              },
    })


    const editANDdeletItem = (event) =>{
        //console.log('editAndDelete');
        const itemId = event.currentTarget.getAttribute("data-item");
        const typeBtn = event.target.getAttribute("data-button");
        switch(typeBtn){
            case  "edit" :  
                let curItem = queryPlaneById.data.planeTasks.filter(a => a.id == itemId)[0];
                setShowTask(true);
                setItemTV(curItem);
                break;
            case "delete" :
                let curDel = queryPlaneById.data.planeTasks.filter(a => a.id == itemId);
                deleteShedule.mutate(itemId)
                break;
            case "save" :
                setShowTask(false);
                saveTasks.mutate(curTask);
                break;
        }
        
    }


    const showItem = (rowitem) =>{
        if(rowitem == undefined || rowitem.length === 0){
            return ( <tr><td colSpan={12}><Alert key="danger" variant="danger">Значения не загружены проверте сеть </Alert></td></tr> );
        }
        
        return  !showTask && rowitem?.map((item) =>(  
            
            <tr className="table-primary" key={item?.id} data-item={item?.id} onClick={editANDdeletItem} >
                        <td  className="table-secondary">{item?.type==='TZ' && 'ТЗ'}  {item?.type =='RED' && 'РЕД'}  {item?.type === 'PR' && 'ПР'}  {item?.type === 'ALL' && '*'}</td>
                        <td  className="table-secondary">{item.title}</td>
                        <td  className="table-secondary"><Form.Control type='time' disabled defaultValue={item?.startTime} ></Form.Control></td>
                        <td  className="table-secondary"><Form.Control type='time' disabled defaultValue={item?.endTime}></Form.Control> </td>
                        <td  className="table-secondary" ><span className={`${item.progress ==='SHOT'? style.colorGrenText : ''}`}>{item.progress ==='SHOT' && 'снято'} {item.progress ==='DEVELOP' && 'разработка'} {item.progress ==='DELAY' && 'отложено'} {item.progress ==='CANCELLED' && 'отменено'}</span></td>
                        <td  className="table-secondary">{item.shootingLocation}</td>
                        <td  className="table-secondary" >  { item.corespondent?.map(c => c.lastName + ', ')}</td>
                        <td  className="table-secondary" data-idoper={item.operator?.reduce((a,o) => a + '_' +o.id, '')} >{item.operator?.reduce((a,o) => a+ ' ' + o.lastName, '')} </td>
                        <td  className="table-secondary" data-starttransport={item.startLocation != null? item.startLocation?.id: 0} >{item.startLocation != null? `${item.startLocation?.car.carNumber} ${item.startLocation?.driver.lastName}`:  ''}</td>
                        <td  className="table-secondary" data-endtransport={item.exitLocation !== null ? item.exitLocation?.id:0}>{item.exitLocation !== null ? `${item.exitLocation?.car.carNumber} ${item.exitLocation?.driver.lastName}` : '' } </td>
                        <td  className="table-secondary"  data-idmanager={item.manager?.id} >{item.manager?.firstName + ' ' + item.manager?.lastName}</td>
                        <td  className="table-secondary">{item.description}</td>
                        <td  className="table-secondary">
                        {tokenData?.roles?.includes("ProducerTV") || tokenData?.roles?.includes("admin")?     
                          <div className="btn-group" role="group" aria-label="Basic outlined example">
                            <Button variant="outline-secondary"  data-bs-toggle="modal" data-item={item.id} data-button="edit" data-bs-target="#edit">Редактировать</Button>
                            <Button  variant="outline-danger" data-button="delete" >Удалить</Button>
                          </div> 
                        : ""}  
                        </td>  
            </tr> 
            
                                        
        ))
        
        
    }
    
     return (
        <>
            
            <Table id="tskTbl" className="table table-hover">
                <WorkTVTaskListHeader/>
                <tbody>       
                    {showItem(queryPlaneById?.data?.planeTasks)}
                </tbody>
            </Table>  
            
            <>
                    <Modal show={showTask} onHide={handleClose}  size="lg"  aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Редактировать {curTask?.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                       
                        <Row>
                            <Col></Col>
                            <InputGroup className="mb-3">
                               <InputGroup.Text >
                                    Тип задачи
                                </InputGroup.Text>  
                                <Form.Select className="form-select" id="taskType" onChange={setTasktype}>
                                          <option value={curTask?.type?.id?? 0}>
                                            {curTask.type === undefined ? 'Выбрать...': (curTask.type === 'RED' && 'РЕД') || (curTask.type === 'PR' && 'ПР') || (curTask.type === 'TZ' && 'ТЗ') || (curTask.type === 'ALL' && '*')}</option>
                                          {allTaskType.map((tt) =>
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
                                    defaultValue={curTask?.title}
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
                                    defaultValue={curTask?.startTime}
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
                                    defaultValue={curTask?.endTime}
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
                                          <option value={curTask?.progress?.id?? 0}>
                                            {curTask.progress === undefined ? 'Выбрать...': (curTask.progress === 'SHOT' && 'снято') || (curTask.progress === 'DEVELOP' && 'разработка') || (curTask.progress === 'DELAY' && 'отложено') || (curTask.progress === 'CANCELLED' && 'отменено')}</option>
                                          {allTaskProgress.map((tp) =>
                                            <option key={tp} value={tp}>{tp === 'SHOT' && 'снято'} {tp === 'DEVELOP' && 'разработка'}  {tp === 'DELAY' && 'отложено'}  {tp === 'CANCELLED' && 'отменено'}</option>
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
                                    aria-label="место съемки"
                                    aria-describedby="shootingLocation"
                                    name="shootingLocation"
                                    defaultValue={curTask?.shootingLocation}
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
                                <Col className={`form-control ${style.areatext}`}>
                                        { curTask?.corespondent?.reduce((a, co) => a + co.lastName + ' '  + co.firstName + ', ', ' ' )}</Col>
                                        
                                <Button  variant="primary " data-bs-toggle="modal" onClick={addCorrespondentTask}> + </Button>
                                <Button variant="danger" onClick={cleanTaskCorespondent} >-</Button>
                                
                            </InputGroup>
                            <Col></Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col></Col>
                            <InputGroup className="col-8">
                                <InputGroup.Text >
                                    Оператор
                                </InputGroup.Text>
                                <Col className={`form-control ${style.areatext}`}>
                                        {curTask?.operator?.reduce((a, it) => a + it.lastName + ' ' + it.firstName + ', ', ' ' )}</Col>
                                        
                                <Button  variant="primary " data-bs-toggle="modal" onClick={addOperatorTask}> + </Button>
                                <Button variant="danger" onClick={cleanTaskOperator}>-</Button>
                            </InputGroup>
                            <Col></Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col></Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text >
                                    Водитель привозит
                                </InputGroup.Text>
                                <Form.Select className="form-select" 
                                    id="tvStartLocation" 
                                    aria-label="Водитель привозит"
                                    aria-describedby="startLocation"
                                    name="startLocation"
                                    onChange={setTransportStart}                                        
                                > 
                                    <option value={curTask?.startLocation?.id??  0}>{ curTask.startLocation?.driver.lastName?? 'Выбрать...'}</option>
                                        {allTransport.map((trStart) =>
                                            <option key={trStart?.id} value={trStart?.id}>{`${trStart?.driver?.lastName}.${trStart?.driver?.firstName[0]} ${trStart?.car?.carNumber}`} </option>
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
                                <Form.Select className="form-select" 
                                    id="exitLocation"
                                    aria-label="Водитель забирает"
                                    aria-describedby="exitLocation"
                                    name="exitLocation"
                                    onChange={setTransportExit}
                                >
                                    <option value={curTask.exitLocation?.id??  0 }>{curTask.exitLocation?.driver.lastName?? 'Выбрать...'}</option>
                                        {allTransport.map((trStart) =>
                                            <option key={trStart?.id} value={trStart?.id}>{`${trStart?.driver?.lastName}.${trStart?.driver?.firstName[0]} ${trStart?.car?.carNumber}`} </option>
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
                                <Form.Select name="manager"  className="form-select" 
                                    id="manager" onChange={setManagerPlane}>
                                        <option value={curTask?.manager?.id?? 0}>{curTask?.manager?.lastName?? 'Выбрать...'}</option>
                                            {allManager.map((men) =>
                                                <option key={men?.id} value={men?.id}>{men?.firstName + ' ' + men?.lastName} </option>
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
                                    aria-label="информация о съемке"
                                    aria-describedby="description"
                                    name="description"
                                    defaultValue={curTask?.description}
                                    onChange={handleCheck}
                                />
                            </InputGroup>
                            <Col></Col>
                        </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} data-modal="close" >  Закрыть </Button>
                            <Button variant="primary" onClick={editANDdeletItem} data-item={curTask.id} data-button="save"  > Сохранить</Button>
                        </Modal.Footer>
                    </Modal>    
                    

                    {/* Modal для добавления оператора*/}
                    <Modal show={showOperatorSet} onHide={closeOperatorSet} animation={false}>
                          <Modal.Header closeButton>
                              <Modal.Title>Редактировать операторов</Modal.Title>
                          </Modal.Header>
                            <Modal.Body>
                              <InputGroup className="mb-3 inputGr">
                                <Form.Select onChange={selectOperatorTask} className="form-select" multiple id="editoper">
                                  {allOperator.map((op) =>
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
                              <InputGroup className="mb-3 inputGr">
                                <Form.Select onChange={selectCorespondent}  className="form-select" multiple id="editcorespondent">
                                  {allCorrespondent.map((cor) =>
                                <option key={cor.id} value={cor.id}>{cor.lastName + ' ' + cor.firstName}</option>
                              )}
                                </Form.Select>
                              </InputGroup>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button  variant="secondary" onClick={closeCorespondentSet}>Закрыть</Button>
                                <Button  variant="primary" onClick={setCorespondent}>Применить</Button>
                            </Modal.Footer> 
                     </Modal>
            </>
                
        </>
     )


     
    }


  

