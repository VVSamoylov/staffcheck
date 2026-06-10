import React, { useState, useEffect } from "react";
import { Button, Container, Col, Row, Modal, Form, InputGroup, Alert } from "react-bootstrap";
import{fetchGetAllIssuanceTasks, fetchSaveIssuanceTask, fetchDeleteIssuanceTaskById, fetchGetAllWorkPlace, fechWorkPlaceById, fechAllTasksBetweenByDate} from '../../../service/service-issuanse';
import {fechEmployeeById, fetchGetAllEmployee} from '../../../service/service-employee';
import {fechShotProject} from './../../../service/service-tvPlan';
import {convertViewDate} from '../../../util/convertDate';
import './style.css';
import { useQuery, useMutation, useQueryClient } from "react-query";
import {MenuUser} from "../../../components/MenuUser";
import {DynamicDownload} from "../../../components/DownloadButton";
import { useAuthContext } from 'react-oauth2-code-pkce';

export const IssuanceTasks =()=>{
    const {tokenData} = useAuthContext();
    const[show, setShow] = useState();
    const[curentIssuanseTask, setCurentIssuanseTask] = useState(
        {
            id:null,
            date:null,
            startTime:null,
            endTime:null,
            project:null,
            workPlace:{
                id:0,
                workName: null
            }
        }
    )
    const[showStaff, setShowStaff] = useState(false);
    const[selStaff, setSellStaff] = useState([]);
    const[curPar, setCurPar] = useState(
        {
            dateStart: null,
            dateEnd: null
        }
    );
    
    const [allTask, setAllTask] = useState([]);
    const allTasks = useQuery(
        'getAllTask',
        fetchGetAllIssuanceTasks
    )

    useEffect(() => {
        //onsole.log(queryPlaneById?.data?.dutySite)
      
      
      settingParams();
       // eslint-disable-next-line
     }, [])
     const  settingParams = async()=>{
        const q = await fetchGetAllIssuanceTasks();
        //console.log(q)
        if(q?.status!==500){
            setAllTask([...q])
        }
     } 
    const queryWorkPlace = useQuery(
        'findAllWorkPlaces',
        fetchGetAllWorkPlace
    )
    const queryStaff = useQuery(
        'findAllEmployee',
        fetchGetAllEmployee

    )

    const queryShotProject = useQuery(
        'findShotProject',
        fechShotProject
    )
    const handleCheck=(e)=>{
        setCurentIssuanseTask({...curentIssuanseTask, [e.target.name]:e.target.value})
    }

    const handleQuery =(e) =>{
        setCurPar({...curPar, [e.target.name]:e.target.value})
    }
    const selectWorkPlace=async(e)=>{
        const workPlace = await fechWorkPlaceById(e.target.value);
        setCurentIssuanseTask({...curentIssuanseTask, workPlace})
    }
    
    const queryClient = useQueryClient();
    const saveTasks = useMutation(fetchSaveIssuanceTask, {
            onSuccess: () => {
            // Инвалидация и обновление
            queryClient.refetchQueries('getAllTask');
          },
    })
    
    const deleteTasks = useMutation(fetchDeleteIssuanceTaskById, {
        onSuccess: () => {
        // Инвалидация и обновление
        queryClient.refetchQueries('getAllTask');
      },
    })
    const addShotProjct = useMutation(fechShotProject, {
        onSuccess: () => {
        // Инвалидация и обновление
        queryClient.refetchQueries('findShotProject');
      },
    })
    
    const addStaff =()=>{
        setShowStaff(true);
    }
    const cleanStaff=()=>{
        setCurentIssuanseTask({...curentIssuanseTask, staffList:[]})
    }
    const selectLstStaff =async(e)=>{
        const emp = await fechEmployeeById(e.target.value);
        if(!selStaff.includes({...emp})){
            setSellStaff([...selStaff, {...emp}])
        }
    }
    const setStaff = ()=>{
        setCurentIssuanseTask({...curentIssuanseTask, staffList:selStaff})
    }
    const editAndDelete = (event) =>{
        const curTaskId = Number(event.currentTarget.getAttribute("data-item"));
        const typeBtn = event.target.getAttribute("data-button");
        switch(typeBtn){
            case "add" :
                setCurentIssuanseTask({id:null,
                    date:null,
                    startTime:null,
                    endTime:null,
                    project:null,
                    workPlace:{
                        id:0,
                        workName:null
                    }});
                    addShotProjct.mutate();
                setShow(true);
                break;    
            case  "edit" :
                if(curTaskId !== 0){
                    setCurentIssuanseTask(allTasks.data.filter(a => a.id === curTaskId)[0]);
                }
                setShow(true);
                break;
            case "delete" :
                //setItems([...listItem.filter(a => a.id !== curTaskId)]);
                deleteTasks.mutate(curTaskId);
                break;
            case "save" :
                setShow(false);
                saveTasks.mutate(curentIssuanseTask);
                break;
            default: break;    
        }
                
    }
    const getReport = async() =>{
        const q = await fechAllTasksBetweenByDate(curPar.dateStart, curPar.dateEnd);
        setAllTask([...q])
    }

    const showItem =(array)=>{
        if(array?.status=== 500) return <Alert variant={"danger"} >Не удалось получить данные с сервера статус 500</Alert>
        return array?.map(item =>
            <Row className="borderRow" key={item.id}> 
                <Col xs={2}>{convertViewDate(item.date)}</Col>
                <Col xs={2}>{item.workPlace?.workName}</Col>
                <Col xs={1}>{item.startTime}</Col>
                <Col xs={1}>{item.endTime}</Col>
                <Col xs={2}>{item.project}</Col>
                <Col xs={2}>{item.staffList?.map(staff =><span key={staff.id}>{`${staff.lastName} ${staff.firstName?.at(0)}.${staff.middleName?.at(0)}. \n`}</span>
                )}</Col>
                {tokenData?.roles?.includes("releaseTV") || tokenData?.roles?.includes("admin")? <>
                    <Col xs={1}>
                        <Button  variant="primary" data-button="edit" data-item={item.id} onClick={editAndDelete}>Изменить</Button>
                    </Col>
                    <Col xs={1}>
                        <Button variant="danger" data-button="delete" data-item={item.id} onClick={editAndDelete}>Удалить</Button>
                    </Col>
                </> : <Col xs={2}></Col>}
                
            </Row>
        )
    }
    return(
        <Container>
            <Row>
                <MenuUser/>
            </Row>
            <Row>
                <h1>Задачи выпуска</h1>
            </Row>
            
            <Row>
            <Col xs={3}>
                    <InputGroup className={`mb-6 inputgroup `}>
                        <InputGroup.Text >
                            Время начала
                        </InputGroup.Text>
                            <Form.Control 
                                aria-label="Время начала"
                                aria-describedby="dateStart"
                                name="dateStart"
                                type='date'
                                defaultValue={0}
                                onChange={handleQuery}
                            />
                    </InputGroup>
                </Col>
                <Col xs={3}>
                    <InputGroup className={`mb-6 inputgroup  `}>
                        <InputGroup.Text >
                            Время окончания
                        </InputGroup.Text>
                            <Form.Control 
                                aria-label="Время окончания"
                                aria-describedby="dateEnd"
                                name="dateEnd"
                                type='date'
                                defaultValue={0}
                                onChange={handleQuery}
                            />
                    </InputGroup>
                </Col>
                <Col xs={2}>
                    <Button disabled={(curPar.dateStart !== null && curPar.dateEnd !== null)? false : true} onClick={getReport}>Найти</Button>
                </Col>
                <Col>
                    <DynamicDownload url={`${document.location.protocol}/download/releasePlan?start=${convertViewDate(curPar.dateStart)}&end=${convertViewDate(curPar.dateEnd)}`} filename={`issuanse.xlsx`} hidden={(curPar.dateStart !== null && curPar.dateEnd !== null)? false : true} /></Col>
            </Row>
                   
            {tokenData?.roles?.includes("releaseTV") || tokenData?.roles?.includes("admin")?        
            <Row className="marginBottom">
                <Col xs={11}></Col><Col xs={1}><Button variant="primary" data-button="add" onClick={editAndDelete}>Добавить</Button></Col>
            </Row>    
            : ''}
            <Row className="header" >
                <Col xs={2}>Дата</Col>
                <Col xs={2}>Рабочее место</Col>
                <Col xs={1}>Время начала</Col>
                <Col xs={1}>Время окончания</Col>
                <Col xs={2}>Проект</Col>
                <Col xs={2}>Сотрудники</Col>
                <Col xs={1}>  </Col>
                <Col xs={1}>  </Col>
            </Row>
            <Row>
                {showItem(allTask)}
                <Modal show={show} onHide={()=>setShow(false)}>
                    <Modal.Header closeButton> 
                        <Modal.Title>{curentIssuanseTask?.workPlace?.workName == null? 'Добавить рабочую задачу': `Редактировать рабочую задачу на ${curentIssuanseTask?.workPlace?.workName}`}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Select onChange={selectWorkPlace} className="form-select"  id="workPlace" > 
                                  <option value={curentIssuanseTask?.workPlace?.workName !== null? curentIssuanseTask.workPlace?.id :0}>{curentIssuanseTask?.workPlace?.workName !==null? curentIssuanseTask.workPlace?.workName :'Выбрать рабочее место...'}</option>
                                  {queryWorkPlace?.data?.status !== 500 && queryWorkPlace?.data?.map((wk) =>
                                    <option key={wk.id} value={wk.id}>{wk.workName}</option>
                                  )}
                        </Form.Select>
                        <InputGroup className="mb-6 inputGr">
                            <Form.Control 
                                defaultValue={curentIssuanseTask.date}
                                type="date"                        
                                aria-label="Дата"
                                aria-describedby="date"
                                name="date"
                                onChange={handleCheck}
                                
                            />
                        </InputGroup>
                        <InputGroup className="mb-6 inputGr">
                            <InputGroup.Text className="col-3" htmlFor="project">Вемя<br/>начала</InputGroup.Text>
                            <Form.Control
                                defaultValue={curentIssuanseTask.startTime}               
                                type="time" 
                                aria-label="Время начала"
                                aria-describedby="startTime"
                                name="startTime"
                                onChange={handleCheck}
                            />
                        </InputGroup>
                        <InputGroup className="mb-6 inputGr">
                            <InputGroup.Text className="col-3" htmlFor="project">Вемя<br/>окончания</InputGroup.Text>
                            <Form.Control
                                defaultValue={curentIssuanseTask.endTime}
                                type="time"                         
                                aria-label="Время завершения"
                                aria-describedby="endTime"
                                name="endTime"
                                onChange={handleCheck}
                                
                            />
                        </InputGroup>
                        <InputGroup className="mb-6 inputGr">
                         <InputGroup.Text className="col-3" htmlFor="project">Название<br/> съемок</InputGroup.Text>
                            <Form.Select   className="form-select"  id="project"                     
                                aria-label="Название съемок"
                                aria-describedby="project"
                                name="project"
                                onChange={handleCheck}
                                                                
                            >
                                <option value={curentIssuanseTask?.project !== null? curentIssuanseTask?.project: null }>{curentIssuanseTask?.project !== null? curentIssuanseTask?.project : "Выбрать..." }</option>
                                {queryShotProject?.data?.map(pr=> <option key={pr} value={pr}>{pr}</option>)}
                            </Form.Select>
                        </InputGroup>
                        <InputGroup className="mb-6 inputGr">
                            <InputGroup.Text className="col-3" htmlFor="staffList">Добавить<br/> сотрудника</InputGroup.Text>
                            <Col className="areatext">{curentIssuanseTask !== undefined?curentIssuanseTask?.staffList?.reduce((a, it) => a + it.lastName + ' ' + it.firstName + ', ', ' ' ):''}</Col>
                            <Button variant="primary col-1" data-bs-toggle="modal" onClick={addStaff}>
                                + 
                            </Button>
                            <Button variant="danger col-1" data-bs-toggle="modal" onClick={cleanStaff}>
                                 -
                            </Button>
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>setShow(false)}>Закрыть</Button>
                        <Button variant="primary" data-button="save" onClick={editAndDelete}>Применить</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showStaff} onHide={()=>setShowStaff(false)}>
                        <Modal.Header closeButton>
                          <Modal.Title>Редактировать исполнителей</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <InputGroup className="mb-3 inputGr">
                            <Form.Select onChange={selectLstStaff} className="form-select" multiple id="staffAdd">
                            {queryStaff?.data?.status !== 500 && queryStaff?.data?.map((st) =>
                            <option key={st.id} value={st.id}>{`${st.lastName}.${st.firstName[0]}`}</option>
                          )}
                            </Form.Select>
                          </InputGroup>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={()=>setShowStaff(false)}>Закрыть</Button>
                            <Button variant="primary" onClick={setStaff}>Применить</Button>
                        </Modal.Footer>
                </Modal>
            </Row>
        </Container>
    )

}