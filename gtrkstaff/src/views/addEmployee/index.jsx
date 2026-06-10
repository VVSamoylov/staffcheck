import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import {Container, Row, InputGroup, Form, ButtonGroup, Button, Col } from "react-bootstrap";
import  './style.css'
import {MenuUser} from "../../components/MenuUser";
import {fetchSaveEmployee} from '../../service/service-employee';
import {fetchGetAllJobItem, fechPositionById} from '../../service/service-jobitem';
import {fetchGetAllDepartament, fechDeptById} from '../../service/service-departament';
import { fetchGetAllShedule, fechScheduleById } from "../../service/service-shedule";
import { useQuery } from "react-query";

export const AddEmployee =()=> {
  const [staff, setStaff] = useState({
      lastName: '',
      middleName: '',
      firstName: '',
      jobName: '',
      dept: null,
      driverLicense: '',
      snils: '',
      schedule: null,
      cardNumber: ''
  })
  

  const queryAllDepartament = useQuery(
    'getall',
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
  const handleSave = async()=>{
    const res = await fetchSaveEmployee(staff);
    //console.log(staff);
    if(res === 'ok'){
      setStaff({
        lastName: '',
        middleName: '',
        firstName: '',
        position: null,
        dept: '',
        driverLicense:'',
        snils: '',
        schedule: '',
        cardNumber: ''
      });
    }   
  }
  const  handleCheck = (event) =>{
    setStaff({
      ...staff, [event.target.name]: event.target.value
    })    
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
  // перенаправление на список сотрудников
  const navigate = useNavigate();
  const handleClose = () =>{    
    navigate(`/listEmployee`);
  }

    
      
      return (
        <Container>
        <MenuUser/>
          <h1>Добавление нового сотрудника</h1>
          <Row>
            <Col></Col>
            <InputGroup className="mb-3">
              <InputGroup.Text >
                Фамилия
              </InputGroup.Text>
              <Form.Control 
                defaultValue={staff.lastName}
                aria-label="Фамилия"
                aria-describedby="lastName"
                name="lastName"
                onChange={handleCheck}
              />
            </InputGroup>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <InputGroup className="mb-3">
              <InputGroup.Text >
                Имя
              </InputGroup.Text>
              <Form.Control 
                defaultValue={staff.firstName}
                aria-label="Имя"
                aria-describedby="firstName"
                name="firstName"
                onChange={handleCheck}
              />
            </InputGroup>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <InputGroup className="mb-3">
              <InputGroup.Text >
              Отчество
              </InputGroup.Text>
              <Form.Control 
                defaultValue={staff.middleName}
                aria-label="Отчество"
                aria-describedby="middleName"
                name="middleName"
                onChange={handleCheck}
              />
            </InputGroup>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <InputGroup className="mb-3">
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
            <InputGroup className="mb-3">
              <InputGroup.Text >
              Водительское удостоверение (номер)
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
            <InputGroup className="mb-3">
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
            <InputGroup className="mb-3">
              <InputGroup.Text >
              СНИЛС
              </InputGroup.Text>
              <Form.Control 
                defaultValue={staff.snils}
                aria-label="СНИЛС"
                aria-describedby="snils"
                name="snils"
                onChange={handleCheck}
              />
            </InputGroup>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <InputGroup className="mb-3">
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
            <InputGroup className="mb-3">
              <InputGroup.Text >
              Номер карты
              </InputGroup.Text>
              <Form.Control  
                defaultValue={staff.cardNumber}
                aria-label="Номер карты"
                aria-describedby="cardNumber"
              name="cardNumber"
                onChange={handleCheck}
              />
            </InputGroup> 
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <ButtonGroup aria-label="Employee added">
              <Button onClick={handleSave} variant="primary">Сохранить</Button>
              <Button variant="danger" onClick={handleClose}>Отмена</Button>
            </ButtonGroup>
            <Col></Col>
          </Row>
          
        </Container>
        )
    
  
}