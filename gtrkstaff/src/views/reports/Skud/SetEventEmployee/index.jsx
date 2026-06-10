import React from 'react';
import {Row, Col, InputGroup, Form, Button, Container, Modal } from 'react-bootstrap';
import { useState } from 'react';
import style from './style.module.css';
import {MenuUser} from '../../../../components/MenuUser';
import {fetchGetAllDepartament} from '../../../../service/service-departament';
import {fetchGetSkudEventEmployeeBetweenDate, saveEventsEmployee, fetchDeleteEventById} from '../../../../service/service-skudreports';
import{fechallByDept, fechEmployeeById} from '../../../../service/service-employee';
import { useQuery } from 'react-query';
/* eslint-disable */
// отчет по СКУД
export const SetEventEmployee = ()=> {

    const[curentEmpl, setCurentEmpl] = useState([]);
    const[selectedEmployee, setSelectedEmployee] = useState();
    const[showModal, setModal] = useState(false)
    const[showAddModal, setAddModal] = useState(false)
    const[showSave, setShowSave] = useState(true);
    const[showSelectEmployee, setShowEmployee] = useState(true);
    const [curPar, setPar] = useState(
            {
                dateStart: null,
                dateEnd: null,
                employeeId: null
            }
    );
    const[currentEvent, setCurrentEvent] = useState({        
            id:null,
            dateTime:null,
            message:null, 
            employee:null, 
            deviceName: null
    })
    const[editStatus, setEditStatus] = useState(null);//true- редактирование false- добавление

    const departs = useQuery(   //status, data, isFetching, error
        'alldept',
        fetchGetAllDepartament
    )
    
    const [events, setEvents] = useState([]);


    const handleCheck =(event) =>{
        setPar({
            ...curPar, [event.target.name] : event.target.value
          });
    }

    const selectDept =async(e)=>{
        setPar({
            ...curPar, deptId:e.target.value
        })
        let empl = await fechallByDept(e.target.value);
        setCurentEmpl([...empl]);
        setShowEmployee(false);
        
    }
    const selectEmployee = (e) =>{
        setPar({
            ...curPar, employeeId:e.target.value
        })
    }
    const getEvents = async()=>{
        let res = await fetchGetSkudEventEmployeeBetweenDate(curPar.employeeId, curPar.dateStart, curPar.dateEnd);
        let empl = await fechEmployeeById(curPar.employeeId);
        setSelectedEmployee(empl);
        setEvents(res);
        setShowSave(false);
        
    }
    const alarmColor=(p)=>{
        if(p?.message?.includes("Болезнь") ){
            return 'alert alert-warning';
        }
        if(p?.message?.indexOf("Отпуск" === 0)){
            return 'bg-success';
        }
        if(isNaN(convertDurationToMinute(p.duration))){
            return 'alert alert-danger';
        }

        return 'alert alert-secondary';

    }

    const saveEvent = async()=>{
        setShowSave(false);
        let res = false;
        
        res = await saveEventsEmployee(currentEvent)
        setShowSave(true);
        setAddModal(false)
        if(res){
            setModal(true);
        }
        getEvents();
    }

    const edit =(event)=>{
        const evID = event.currentTarget.getAttribute("data-edit");
        if(evID === null){
            setEditStatus(false);
        }else{
            let r = events.find(e =>e.id == evID);
            setCurrentEvent(r);
            setEditStatus(true)
        }
        setAddModal(true);
    }
    const setTime =(e)=>{
        setCurrentEvent({...currentEvent, dateTime:e.target.value});
    }
    const selectMessage =(e)=>{
        if(currentEvent.employee == null){
            setCurrentEvent({...currentEvent, employee: selectedEmployee, deviceName: "Турникет КПП", orgName:"ФВГТРК", message:e.target.value})
        }else{
            setCurrentEvent({...currentEvent, message:e.target.value});
        }
    }
    const closeEditModal=()=>{
        setCurrentEvent({
            id:null,
            dateTime:null,
            message:null, 
            employee:null
        })
        setAddModal(false);
    }
    const deleteItem = async(event) =>{
        const id = event.currentTarget.getAttribute("data-delete")
        const res= await fetchDeleteEventById(id)
        setModal(true);
        getEvents();
    }
    const showItems = (res)=>{
        //console.log(res);
         return res.map(r =>{
         return(                       
                <Row key={r.id} >
                    <Col>
                        <InputGroup className={`mb-3 ${style.inputgroup } `}>
                            <Form.Control 
                                aria-label="Время"
                                aria-describedby="date"
                                name="date"
                                type="datetime-local"
                                defaultValue={r.dateTime}  
                                disabled                    
                            />
                        </InputGroup>
                    </Col>
                    <Col>{r.employee?.lastName}</Col>
                    <Col>{r.employee?.firstName}</Col>
                    <Col>{r.employee?.middleName}</Col>
                    <Col>{r.message}</Col>
                    <Col>
                    <InputGroup className={`mb-3 ${style.inputgroup } `}>
                            <Form.Control 
                                aria-label="Время"
                                aria-describedby="date"
                                name="EditDate"
                                type="datetime-local"
                                defaultValue={r?.editorDateTime?.substring(0, r?.editorDateTime?.lastIndexOf('.'))}  
                                disabled                    
                            />
                        </InputGroup>
                    </Col>
                    <Col>{r?.editorName}</Col>
                    <Col><Button data-edit={r.id} variant="btn btn-outline-secondary" onClick={edit}>Редактировать</Button></Col>
                    <Col><Button data-delete={r.id} variant="danger" onClick={deleteItem}>Удалить</Button></Col>
                </Row>
                 ) // first map
         }
        )
    }
    return(
        <Container>
            <Row>
                <MenuUser/>
            </Row>
            <Row>
                <h1>Установка времени входа и выхода  СКУД</h1> 
            </Row>
            <Row>
                <Col xs={8}></Col>
                <Col xs={2}>
                    <Button disabled={(curPar.deptId !== null && curPar.shedulerId !== null && curPar.dateStart !== null && curPar.dateEnd !== null)? false : true} onClick={getEvents}>Найти</Button>
                </Col>
                <Col xs={2} ><Button disabled={showSave} onClick={edit}>Добавить</Button></Col>
            </Row>
            <br/>
            <Row >
                <Col xs={3}>
                    <InputGroup className={`mb-6 ${style.inputgroup } `}>
                        <InputGroup.Text className="col-6" htmlFor="departament">Отдел</InputGroup.Text>
                        <Form.Select onChange={selectDept} className="form-select" id="departament">
                            <option value={0}>Выбрать...</option>
                            {departs?.data?.map((d) =>
                                <option key={d.id} value={d.id}>{d.depName}</option>
                            )}
                        </Form.Select>
                        </InputGroup>
                </Col>

                <Col xs={3}>
                    <InputGroup className={`mb-6 ${style.inputgroup } `}>
                        <InputGroup.Text className="col-6" htmlFor="employee">Сотрудник</InputGroup.Text>
                        <Form.Select disabled={showSelectEmployee} onChange={selectEmployee} className="form-select" id="employee">
                            <option value={0}>Выбрать...</option>
                            {curentEmpl?.map((em) =>
                                <option key={em.id} value={em.id}>{`${em.lastName} ${em.firstName.at(0)}. ${em.middleName.at(0)}. `}</option>
                            )}
                        </Form.Select>
                        </InputGroup>
                </Col>
                <Col xs={3}>
                    <InputGroup className={`mb-6 ${style.inputgroup } `}>
                        <InputGroup.Text >
                            Время начала
                        </InputGroup.Text>
                            <Form.Control 
                                aria-label="Время начала"
                                aria-describedby="dateStart"
                                name="dateStart"
                                type='date'
                                defaultValue={0}
                                onChange={handleCheck}
                            />
                    </InputGroup>
                </Col>
                <Col xs={3}>
                    <InputGroup className={`mb-6 ${style.inputgroup } `}>
                        <InputGroup.Text >
                            Время окончания
                        </InputGroup.Text>
                            <Form.Control 
                                aria-label="Время окончания"
                                aria-describedby="dateEnd"
                                name="dateEnd"
                                type='date'
                                defaultValue={0}
                                onChange={handleCheck}
                            />
                    </InputGroup>
                </Col>
            </Row>
            <br/>
            <Row className='bg-secondary'>
                <Col>Дата</Col><Col>Фамилия</Col><Col>Имя</Col><Col>Отчество</Col><Col>Приход</Col><Col>Время редактирования</Col><Col>Редактировал</Col><Col></Col><Col></Col>
            </Row>
            <br/>
            <Row>
            {events.length > 0? showItems(events): '' }
            </Row>

            {/* модалка оповещения сохранения */}
            <Modal show={showModal }
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Сообщение от сервера
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>Записи сохранены!</h4>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={()=>setModal(false)} variant="secondary">Закрыть</Button>
              </Modal.Footer>
            </Modal> 
            {/* модалка добавления и редактирования */}
            <Modal show={showAddModal }
                onHide={closeEditModal}  size="lg"  aria-labelledby="contained-modal-title-vcenter" centered
              >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                     {editStatus? `Редактирование записи сотрудника ${selectedEmployee?.lastName} ${selectedEmployee?.firstName.at(0)}. ${selectedEmployee?.middleName.at(0)} `: `Добаваление новой записи сотрудника`} 
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>{`${selectedEmployee?.lastName} ${selectedEmployee?.firstName.at(0)}. ${selectedEmployee?.middleName.at(0)}`}</h4>
                <Row  >
                    <Col>
                        <InputGroup className={`mb-3 ${style.inputgroup } `}>
                            <Form.Control 
                                aria-label="Время"
                                aria-describedby="dateTime"
                                name="dateTime"
                                type="datetime-local"
                                defaultValue={currentEvent?.dateTime} 
                                onChange={setTime}                     
                            />
                        </InputGroup>
                    </Col>
                    <Col>{selectedEmployee?.lastName}</Col>
                    <Col>{selectedEmployee?.firstName}</Col>
                    <Col>{selectedEmployee?.middleName}</Col>
                    <Col>
                    <InputGroup className={`mb-6 ${style.inputgroup } `}>
                        <Form.Select onChange={selectMessage} className="form-select" id="departament">
                            <option value={currentEvent?.message}>{currentEvent?.message ?? 'Выбрать...'} </option>
                            <option key={1} value={"Штатный вход"}>Штатный вход</option>
                            <option key={2} value={"Штатный выход"}>Штатный выход</option>
                            
                        </Form.Select>
                        </InputGroup>
                    </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={saveEvent} variant="success" >Сохранить</Button>
                <Button onClick={closeEditModal} variant="secondary" >Закрыть</Button>
              </Modal.Footer>
            </Modal> 
        </Container>
       
    )
}