import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Row, Col, Button, Alert, InputGroup, Form, ListGroup, Modal, Spinner } from 'react-bootstrap';
import {fetchDeleteJobItem, fetchGetAllJobItem, fetchSaveJobItem} from '../../service/service-jobitem';
import { useQuery} from 'react-query';
/* eslint-disable */
export const JobItem = () => {
    const [show, setShow] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState(
        {
         id:'',
         posName:'',   
        }
    )
    // перенаправление на список должностей
    const navigate = useNavigate();
    const handleCheck=(event)=>{
        setJob({
            ...job, [event.target.name]: event.target.value
          });
    }
    
    const handleClose = () =>{    
        setShow(false);
    }
    const editANDdeletItem =(event)=>{
        const itemId = Number(event.currentTarget.getAttribute("data-item"));
        const typeBtn = event.target.getAttribute("data-button");
        switch(typeBtn){
            case  "edit" :  
                let curItem = data.filter(a => a.id== itemId)[0];
                console.log(curItem)
                setJob( {...curItem});
                setShow(true);
                break;
            case "delete" :
                setJobs( [...jobs.filter(a => a.id !== itemId)]);
                fetchDeleteJobItem(itemId);
                window.location.reload();

                break;
            case "save" :
                fetchSaveJobItem(job);
                setJob([...jobs.filter(a => a.id != itemId), {...job}])
                setShow(false);
                window.location.reload();
                
                
        }
        
    }

    




    //console.log('data', data);
    const showItem=(ajobs)=>{
        if(ajobs == undefined || ajobs.length === 0){
            return ( <Alert key="danger" variant="danger">Значения не загружены проверте сеть </Alert> );
        }
        return ajobs.map((item) =>{
           return ( 
            
                <ListGroup.Item key={item.id} data-item={item.id} onClick={editANDdeletItem}>
                    <Row>
                        <Col xs={10}>{item.posName}</Col>
                        <Col xs={1}><Button data-button="edit" variant="primary">Изменить</Button></Col>
                        <Col xs={1}><Button data-button="delete" variant="danger">Удалить</Button></Col>
                    </Row>
                </ListGroup.Item>
                   
                
                
            )
        });
    }
    const { status, data, isFetching, error } = useQuery(
        'getallJob',
        fetchGetAllJobItem
      );
    if(status === 'loading'){
        return (<Spinner animation="border" variant="primary" />  )
    }
    
    if(status==='error'){
        return  (<div><h1> Ошибка загрузки </h1></div>);
                    
    }
    if(status==='success' && data != undefined){
        //setEmpl([...data]);
    }
    //console.log("stat ", data);
    
    //console.log(show);
      return (
        <Row>
            <Row>
               <Col xs={2}>Название</Col>
            </Row>
            {!show ?
            (<ListGroup>                
                {showItem(data)}
           </ListGroup> ) :
           (<Modal show={show} onHide={handleClose}  size="lg"  aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Редактировать {job.posName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Row>
                            <InputGroup className="mb-6">
                               <InputGroup.Text >
                                    Название
                                </InputGroup.Text>  
                                <Form.Control 
                                    sm={8}
                                    aria-label="Наименование"
                                    aria-describedby="posName"
                                    name="posName" 
                                    defaultValue={job.posName}
                                    onChange={handleCheck}
                                />
                            </InputGroup>
                        </Row>
                        
                        
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} data-modal="close" >  Закрыть </Button>
                            <Button variant="primary" onClick={editANDdeletItem} data-item={job.id} data-button="save"  > Сохранить</Button>
                        </Modal.Footer>
                    </Modal> )}
        </Row>
     )
    
};