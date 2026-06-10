import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Container, Row, InputGroup, Form, ButtonGroup, Button, Col} from "react-bootstrap";
import {fetchSaveDepartament} from '../../../service/service-departament';
import {fechBoss, fechEmployeeById} from '../../../service/service-employee';
import  './style.css'
import {MenuUser} from "../../../components/MenuUser";
import { useQuery } from "react-query";


export const  AddDepartament =()=> {
    const[depart, setDepart] = useState({
      depName:null,
      boss:null
    });
    const handleSave= async()=>{
      //console.log(depart)
      const res = await fetchSaveDepartament(depart)
      console.log(res)
      setDepart( {
        id: '',
        depName: '',
        boss: ''
      });
      handleClose();
      
    }
    const handleCheck = (event)=>{
      console.log(event.target.name);
      console.log(event.target.value);
      setDepart({ ...depart, [event.target.name]: event.target.value })
    }

    // перенаправление на список подразделений
    const navigate = useNavigate();
    const handleClose = ()=>{
        navigate(`/listDepartament`);
    }
    const queryBoss = useQuery(
      'getBoss',
      fechBoss
    )
    const selectBoss=async(e)=>{
      const boss = await fechEmployeeById(e.target.value);
      setDepart({...depart, boss});
    }
      return (
        <Container>
        <MenuUser/>
          <h1>Добавление нового отдела</h1>
          <Row>
            <Col></Col>
            <InputGroup className="mb-3">
              <InputGroup.Text >
                Название
              </InputGroup.Text>
              <Form.Control 
                defaultValue={depart?.depName}
                aria-label="Название отдела"
                aria-describedby="depName"
                name="depName"
                onChange={handleCheck}
              />
            </InputGroup>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <InputGroup className="mb-3">
              <InputGroup.Text >
                Руководитель
              </InputGroup.Text>
              <Form.Select onChange={selectBoss} className="form-select" id="boss">
                            <option value={0}>Выбрать...</option>
                            {queryBoss.data?.map((b) =>
                              <option key={b.id} value={b.id}>{b.lastName + ' ' + b.firstName}</option>
                            )}
              </Form.Select>
            </InputGroup>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <ButtonGroup aria-label="Departament added">
              <Button onClick={handleSave} variant="primary">Сохранить</Button>
              <Button onClick={handleClose} variant="danger">Отмена</Button>
            </ButtonGroup>
            <Col></Col>
          </Row>
          
        </Container>
        );
    
  }
  

