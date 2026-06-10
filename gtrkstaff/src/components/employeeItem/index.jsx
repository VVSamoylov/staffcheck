import React, {  useEffect, useState} from 'react';
//import { useNavigate } from "react-router-dom";
import {Row, Col, Button, ListGroup, Modal, InputGroup, Form, Alert } from 'react-bootstrap';
import {fetchGetAllJobItem, fechPositionById} from '../../service/service-jobitem';
import {fetchDeleteEmployeeById, fetchGetAllEmployee, fetchSaveEmployee} from '../../service/service-employee';
import {fetchGetAllDepartament, fechDeptById} from '../../service/service-departament';
import { fetchGetAllShedule, fechScheduleById } from "../../service/service-shedule";
import { useQuery} from 'react-query';
/* eslint-disable */
export const EmployeeItem = ()=> {

    const [show, setShow] = useState(false);
    const [staff, setStaff] = useState({
        id: null,
        lastName: '',
        firstName: '',
        middleName: '',
        driverLicense: '',
        position: null,
        dept:null,
        snils: '',
        schedule:null,
        cardNumber: ''
    });
    
    const [listEmpl, setListEmpl] = useState([]);
    const settings = async()=>{
        const empls = await fetchGetAllEmployee();
        setListEmpl([...empls]);
    } 
    const queryAllDepartament = useQuery(
        'Dept',
        fetchGetAllDepartament
    )
    const queryAllSchedule = useQuery(
        'getallShedule',
        fetchGetAllShedule
    )
    const queryPosition = useQuery(
        'getAllPosition',
        fetchGetAllJobItem
    )
    useEffect(()=>{
        settings();
    },[])
    

    const handleCheck =(event) =>{
        setStaff({
            ...staff, [event.target.name]: event.target.value
          });
    }
    // перенаправление на список сотрудников
    //const navigate = useNavigate();
    const handleClose = () =>{
            //navigate(`/listEmployee`);
            setShow(false);
    }
    const editANDdeletItem = async (event) =>{
        console.log('editAndDelete');
        const itemId = Number(event.currentTarget.getAttribute("data-item"));
        const typeBtn = event.target.getAttribute("data-button");
        let res;
        switch(typeBtn){
            case  "edit" :  
                let curItem = listEmpl.filter(a => a.id === itemId)[0];
                //console.log(curItem)
                setStaff({...curItem});
                setShow(true);
                break;
            case "delete" :
                res = await fetchDeleteEmployeeById(itemId);
                if(res?.ok){
                    alert("Запись удалена");
                    settings();
                }
                break;
            case "save" :
                res = await fetchSaveEmployee(staff);
                if(res?.ok){
                    setShow(false);       
                    settings();           
                }else{
                    alert("Загрузка не удалась");
                }

                
                break;
        }
        
    }

    const setDept = async (e) =>{
        const dept = await fechDeptById(e.target.value);
        setStaff({...staff, dept});
    }
    const setSchedule = async(e)=>{
        const sch = await fechScheduleById(e.target.value);
        setStaff({...staff, schedule:sch})
    }
    const setPos = async(e)=>{
        const position = await fechPositionById(e.target.value);
        setStaff({...staff, position});
    }
    const showItem = (arrempl)=>{
        if(arrempl == undefined || arrempl.length === 0){
            return ( <Alert key="danger" variant="danger">Значения не загружены проверте сеть </Alert> );
        }
        return arrempl.map((item) =>{
           return ( 
            
                <ListGroup.Item key={item?.id} data-item={item?.id} onClick={editANDdeletItem}>
                    <Row>
                        <Col xs={2}>{item?.lastName}</Col>
                        <Col xs={2}>{item?.firstName}</Col>
                        <Col xs={2}>{item?.middleName}</Col>
                        <Col xs={2}>{item?.position?.posName}</Col>
                        <Col xs={2}>{item?.schedule?.scheduleName}</Col>
                        <Col xs={1}><Button data-button="edit" variant="primary">Изменить</Button></Col>
                        <Col xs={1}><Button data-button="delete" variant="danger">Уволить</Button></Col>
                    </Row>
                </ListGroup.Item>
                   
                
                
            )
        });
    }
    
         
      return (
        <Row>
            <Row>
               <Col xs={2}>Фамилия</Col><Col xs={2}>Имя</Col><Col xs={2}>Отчество</Col><Col xs={2}>Должность</Col><Col xs={2}>График работы</Col>
            </Row>
            {!show ?
            (<ListGroup>                
                {showItem(listEmpl)}
           </ListGroup> ) :
           (<Modal show={show} onHide={handleClose}  size="lg"  aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Редактировать {staff.lastName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                       
                        <Row>
                            <Col ></Col>
                            <InputGroup  className="mb-8">
                               <InputGroup.Text >
                                    Фамилия
                                </InputGroup.Text>  
                                <Form.Control 
                                    aria-label="Фамилия"
                                    aria-describedby="lastName"
                                    name="lastName" 
                                    defaultValue={staff.lastName}
                                    onChange={handleCheck}
                                />
                            </InputGroup>
                            <Col ></Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <InputGroup className="mb-8">
                                <InputGroup.Text >
                                    Имя
                                </InputGroup.Text>
                                <Form.Control 
                                    aria-label="Имя"
                                    aria-describedby="firstName"
                                    name="firstName"
                                    defaultValue={staff.firstName}
                                    onChange={handleCheck}
                                />
                            </InputGroup>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <InputGroup className="mb-8">
                                <InputGroup.Text >
                                Отчество
                                </InputGroup.Text>
                                <Form.Control  
                                    aria-label="Отчество"
                                    aria-describedby="middleName"
                                    name="middleName"
                                    defaultValue={staff.middleName}
                                    onChange={handleCheck}
                                />
                            </InputGroup>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <InputGroup className="mb-8">
                                <InputGroup.Text >
                                Должность
                                </InputGroup.Text>
                                <Form.Select className="form-select" id="position" onChange={setPos}>
                                                                                        <option value={staff.position?.id?? 0}>
                                                                                          {staff.position === undefined || staff.position === null ? 'Выбрать...': staff.position.posName}</option>
                                                                                        {queryPosition.data?.map((pos) =>
                                                                                          <option key={pos.id} value={pos.id}>{pos.posName}</option>
                                                                                        )}
                                </Form.Select>
                            </InputGroup>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <InputGroup className="mb-8">
                                <InputGroup.Text >
                                      Водительское <br/>удостоверение (номер)
                                </InputGroup.Text>
                                <Form.Control  
                                        defaultValue={staff.driverLicense}
                                        aria-label="номер водительского удостоверения"
                                        aria-describedby="driverLicense"
                                        name="driverLicense"
                                        onChange={handleCheck}
                                />
                            </InputGroup>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <InputGroup className="mb-8">
                                <InputGroup.Text >
                                    Подразделение
                                </InputGroup.Text>
                                <Form.Select className="form-select" id="dept" onChange={setDept}>
                                                                                        <option value={staff.dept?.id?? 0}>
                                                                                          {staff.dept === undefined || staff.dept === null ? 'Выбрать...': staff.dept.depName}</option>
                                                                                        {queryAllDepartament.data?.map((dep) =>
                                                                                          <option key={dep.id} value={dep.id}>{dep.depName}</option>
                                                                                        )}
                                </Form.Select>
                            </InputGroup>
                            <Col></Col>
                        </Row>
                        
                        <Row>
                            <Col></Col>
                            <InputGroup className="mb-8">
                                <InputGroup.Text >
                                СНИЛС
                                </InputGroup.Text>
                                <Form.Control 
                                    aria-label="СНИЛС"
                                    aria-describedby="snils"
                                    name="snils"
                                    defaultValue={staff.snils}
                                    onChange={handleCheck}
                                />
                            </InputGroup>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <InputGroup className="mb-8">
                                <InputGroup.Text >
                                График работы
                                </InputGroup.Text>
                                <Form.Select className="form-select" id="schedule" onChange={setSchedule}>
                                                                                        <option value={staff.schedule?.id?? 0}>
                                                                                          {staff.schedule === undefined || staff.schedule === null? 'Выбрать...': staff.schedule.scheduleName}</option>
                                                                                        {queryAllSchedule.data?.map((sch) =>
                                                                                          <option key={sch.id} value={sch.id}>{sch.scheduleName}</option>
                                                                                        )}
                                </Form.Select>
                            </InputGroup> 
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <InputGroup className="mb-8">
                                <InputGroup.Text >
                                Номер карты
                                </InputGroup.Text>
                                <Form.Control  
                                    aria-label="Номер карты"
                                    aria-describedby="cardNumber"
                                    name="cardNumber"
                                    defaultValue={staff.cardNumber}
                                    onChange={handleCheck}
                                />
                            </InputGroup>
                            <Col></Col>
                        </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} data-modal="close" >  Закрыть </Button>
                            <Button variant="primary" onClick={editANDdeletItem} data-button="save"  > Сохранить</Button>
                        </Modal.Footer>
                    </Modal> )}
                    
        </Row>
     )

     
    }


  

