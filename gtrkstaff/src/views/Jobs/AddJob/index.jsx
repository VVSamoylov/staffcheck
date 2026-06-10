import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Container, Row, InputGroup, Form, ButtonGroup, Button, Col} from "react-bootstrap";
import {fetchSaveJobItem} from './../../../service/service-jobitem';
import {MenuUser} from "../../../components/MenuUser";

export const AddJob=()=>  {
  const [job, setJob] = useState({
    id: '',
    posName: ''
  });
    // перенаправление на список должностей
    const navigate = useNavigate();
    const handleClose=()=>{
      navigate(`/listJobs`);
    }

    const handleSave=async(e)=>{
      const res = await fetchSaveJobItem(job);
      console.log(res);
      setJob({
        id: '',
        posName: ''
      });
      navigate(`/listJobs`);
    }


    
    const handleCheck=(event)=>{
      //let id = new Date().getTime;
      setJob({...job, [event.target.name]: event.target.value })
    }
    

    
      
      return (
        <Container>
        <MenuUser/>
          <h1>Добавление новой должности</h1>
          <Row>
            <Col></Col>
            <InputGroup className="mb-3">
              <InputGroup.Text >
                Название
              </InputGroup.Text>
              <Form.Control 
                defaultValue={job?.jobName}
                aria-label="Название должности"
                aria-describedby="posName"
                name="posName"
                onChange={handleCheck}
              />
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