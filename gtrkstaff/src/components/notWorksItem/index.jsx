import React from 'react';
import {Row, Col, Button, ListGroup, Modal, InputGroup, Form, Spinner, Alert } from 'react-bootstrap';
import { useState } from 'react';
import {fetchGetAllNotWorking, fetchDeleteNotWorking, fetchSaveNotWorking} from '../../service/service-notworking';
import {convertViewDate} from '../../util/convertDate';
import { useQuery, useMutation, useQueryClient} from 'react-query';
/* eslint-disable */
export const NotWorkItem = ()=> {

    const [show, setShow] = useState(false);
    const [notWork, setNotWork] = useState(
        {
            id: '',
            typeName: '',
            workDay:'',
            beginDate: '',
            endDate:'',
            employee:{},
          }
    )
    const[notWorks, setNotWorks] = useState([]);
    const queryClient = useQueryClient();
    const saveNotWorking = useMutation(fetchSaveNotWorking, {
        onSuccess: () => {
            // Инвалидация и обновление
            queryClient.invalidateQueries('getallNotWork');
          },
           
         })
    

    const deleteNotWorking = useMutation(fetchDeleteNotWorking, {
        onSuccess: () => {
            // Инвалидация и обновление
            queryClient.invalidateQueries('getallNotWork');
        },
    })     
    

    const handleCheck = (event)=>{
        setNotWork({
            ...notWork, [event.target.name]: event.target.value
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
                let curItem = data.filter(a => a.id== itemId)[0];
                //console.log(curItem)
                setNotWork( {...curItem});
                setShow(true);
                break;
            case "delete" :
                deleteNotWorking.mutate(itemId);
                setNotWorks( [...notWorks.filter(a => a.id !== itemId)]);
                break;
            case "save" :
                saveNotWorking.mutate(notWork);
                setNotWorks( [...notWorks.filter(a=> a.id !== itemId), notWork])
                setShow(false);
                break;
        }
        
    }

    
    
    const { status, data, isFetching, error} = useQuery(
        'getallNotWork',
        fetchGetAllNotWorking
      );
    if(status === 'loading'){
        return (<Spinner animation="border" variant="primary" /> )
    }
    //console.log("stat ", data);
    if(status==='error'){
        return  (<div>  Ошибка загрузки   <h1></h1></div>);
                    
    }
    if(status==='success' && data != undefined){
        //setEmpl([...data]);
    }

    const showItem = (arrdept)=>{
        //console.log(arrdept)
        if(arrdept == undefined  || arrdept.length == 0 ){
            return ( <Alert key="danger" variant="danger">Значения не загружены проверте сеть </Alert> );
        }
        return arrdept.map((item) =>{
           return ( 
            
                <ListGroup.Item key={item?.id} >
                    <Row>
                        <Col xs={2}>{item?.employee?.firstName} {item?.employee?.middleName} {item?.employee?.lastName}</Col>
                        <Col xs={2}>{item?.typeName}</Col>
                        <Col xs={2}>{item?.workDay}</Col>
                        <Col xs={2}>{convertViewDate(item?.beginDate)}</Col>
                        <Col xs={2}>{convertViewDate(item?.endDate)}</Col>
                        <Col xs={1}><Button data-button="edit" data-item={item?.id} onClick={editANDdeletItem} variant="primary">Изменить</Button></Col>
                        <Col xs={1}><Button data-button="delete" data-item={item?.id} onClick={editANDdeletItem} variant="danger">Удалить</Button></Col>
                    </Row>
                </ListGroup.Item>
                   
                
                
            )
        });
    }
    
      return (
        <Row>
            <Row>
               <Col xs={2}>ФИО</Col><Col xs={2}>Причина</Col><Col xs={2}>Количество раб. дней</Col><Col xs={2}>Отсутствие  с </Col><Col xs={2}>Отсутствие до</Col>
            </Row>
            {!show ?
            (<ListGroup>                
                {showItem(data)}
           </ListGroup> ) :
           (<Modal show={show} onHide={handleClose}  size="lg"  aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Редактировать {notWork?.employee?.lastName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                       
                        <Row>
                            <Col></Col>
                            <InputGroup className="mb-3">
                               <InputGroup.Text >
                                    Сотрудник
                                </InputGroup.Text>  
                                <Form.Control 
                                    aria-label="Название"
                                    aria-describedby="notworkEmployee"
                                    name="notworkEmployee"
                                    readOnly 
                                    defaultValue={notWork?.employee?.lastName}
                                    //onChange={handleCheck}
                                />
                            </InputGroup>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <InputGroup className="mb-3">
                               <InputGroup.Text >
                                    Причина
                                </InputGroup.Text>  
                                <Form.Control 
                                    aria-label="Название"
                                    aria-describedby="typeName"
                                    name="typeName" 
                                    defaultValue={notWork?.typeName}
                                    onChange={handleCheck}
                                />
                            </InputGroup>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <InputGroup className="mb-3">
                               <InputGroup.Text >
                                    Дата неявки нач
                                </InputGroup.Text>  
                                <Form.Control 
                                    aria-label="Название"
                                    aria-describedby="notworkBeginDate"
                                    name="notworkBeginDate" 
                                    defaultValue={notWork?.beginDate}
                                    onChange={handleCheck}
                                />
                            </InputGroup>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Col></Col>
                            <InputGroup className="mb-3">
                                <InputGroup.Text >
                                    Дата неявки кон.
                                </InputGroup.Text>
                                <Form.Control 
                                    aria-label="Имя"
                                    aria-describedby="notworkEndDate"
                                    name="notworkEndDate"
                                    defaultValue={notWork?.endDate}
                                    onChange={handleCheck}
                                />
                            </InputGroup>
                            <Col></Col>
                        </Row>
                        
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} data-modal="close" >  Закрыть </Button>
                            <Button variant="primary" onClick={editANDdeletItem} data-item={notWork.id} data-button="save"  > Сохранить</Button>
                        </Modal.Footer>
                    </Modal> )}
        </Row>
     )
    
}