import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import {Row, Col, Button, Alert, ListGroup, Modal, InputGroup, Form } from 'react-bootstrap';
import {fetchGetAllDepartament, fetchDeleteDepartament, fetchSaveDepartament} from '../../service/service-departament';
import {fechBoss, fechEmployeeById} from '../../service/service-employee';
/* eslint-disable */
export const DepartamentItem = ()=> {

    const [show, setShow] = useState(false);
    const [depart, setDepart] = useState(
        {
            id: null,
            departName: null,
            boss: null
          }
    )
    const[dept, setDept] = useState([]);
    const settings = async() =>{
        const dpt = await fetchGetAllDepartament();
        setDept([...dpt]);
    }

    useEffect(()=>{
        settings();
    }, [])
    const handleCheck = (event)=>{
        this.setDepart({
            ...depart, [event.target.name]: event.target.value
          });
    }

    const handleClose = () =>{    
        setShow(false);
    }
    const editANDdeletItem = (event)=>{
        const itemId = Number(event.currentTarget.getAttribute("data-item"));
        const typeBtn = event.target.getAttribute("data-button");
        switch(typeBtn){
            case  "edit" :  
                let curItem = dept.filter(a => a.id== itemId)[0];
                //console.log(curItem)
                setDepart( {...curItem});
                fetchSaveDepartament(curItem)
                setShow(true);
                break;
            case "delete" :
                console.log(itemId)
                fetchDeleteDepartament(itemId)
                setDept( [...dept.filter(a => a.id !== itemId)]);
                break;
            case "save" :
                setDept( [...dept.filter(a=> a.id !== itemId), depart])
                setShow(false);
                break;
        }
        
    }


    const showItem = (arrdept)=>{
        if(arrdept == undefined || arrdept.length === 0){
            return ( <Alert key="danger" variant="danger">Значения не загружены проверте сеть </Alert> );
        }
        return arrdept.map((item) =>{
           return ( 
            
                <ListGroup.Item key={item?.id} >
                    <Row>
                        <Col xs={5}>{item?.depName}</Col>
                        <Col xs={5}>{item?.boss?.lastName}</Col>
                        <Col xs={1}><Button data-button="edit" data-item={item?.id}  onClick={editANDdeletItem} variant="primary">Изменить</Button></Col>
                        <Col xs={1}><Button data-button="delete" data-item={item?.id}  onClick={editANDdeletItem} variant="danger">Удалить</Button></Col>
                    </Row>
                </ListGroup.Item>
                   
                
                
            )
        });
    }
    const queryBoss = useQuery(
          'getBoss',
          fechBoss
    );
    const selectBoss=async(e)=>{
          const boss = await fechEmployeeById(e.target.value);
          setDepart({...depart, boss});
    }
      return (
        <Row>
            <Row>
               <Col xs={2}>Название</Col><Col xs={2}>Руководитель</Col>
            </Row>
            {!show ?
            (<ListGroup>                
                {showItem(dept)}
           </ListGroup> ) :
           (<Modal show={show} onHide={handleClose}  size="lg"  aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Редактировать {depart?.depName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                       
                        <Row>
                            <Col></Col>
                            <InputGroup className="mb-3">
                               <InputGroup.Text >
                                    Название
                                </InputGroup.Text>  
                                <Form.Control 
                                    aria-label="Название"
                                    aria-describedby="departName"
                                    name="departName" 
                                    defaultValue={depart?.depName}
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
                                                            <option value={depart.boss != undefined ? depart?.boss?.id : 0}>
                                                                {depart?.boss?.id != undefined || depart?.boss?.id != null? `${depart?.boss?.lastName}.${depart?.boss?.firstName[0]}` :'Выбрать...'}
                                                                </option>
                                                            {queryBoss.data?.map((b) =>
                                                              <option key={b.id} value={b.id}>{b.lastName + ' ' + b.firstName}</option>
                                                            )}
                                </Form.Select>
                            </InputGroup>
                            <Col></Col>
                        </Row>
                        
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} data-modal="close" >  Закрыть </Button>
                            <Button variant="primary" onClick={editANDdeletItem} data-item={depart.id} data-button="save"  > Сохранить</Button>
                        </Modal.Footer>
                    </Modal> )}
        </Row>
     )
    
}