import React from "react";
import { Container, Row, Button, Col, Modal, InputGroup, Form } from "react-bootstrap";
import {MenuUser} from "../../../components/MenuUser";
import {fetchSaveWorkPlace, fetchDeleteWorkPlace, fetchGetAllWorkPlace} from '../../../service/service-issuanse';
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import './style.css'
export const WorkPlace =()=>{
    const [show, setShow] = useState(false);
    const [curentWorkPlace, setCurentWorkPlace] = useState({
        id: null,
        workName: null
    });
    
    const allTasks = useQuery(
              'getAllWorkPlace',
              fetchGetAllWorkPlace
    )
    const queryClient = useQueryClient();
    const saveWorkPlace = useMutation(fetchSaveWorkPlace, {
            onSuccess: () => {
            // Инвалидация и обновление
            queryClient.refetchQueries('getAllWorkPlace');
        },
    })
        
    const deleteTasks = useMutation(fetchDeleteWorkPlace, {
        onSuccess: () => {
        // Инвалидация и обновление
        queryClient.refetchQueries('getAllWorkPlace');
        },
    })
    const handleCheck =(e) =>{
        setCurentWorkPlace({...curentWorkPlace, [e.target.name]: e.target.value})
    }
    const closeHandler = () =>{
        setShow(false);
    }

    const editAndDelete = (event) =>{
            const workPlaceId = Number(event.currentTarget.getAttribute("data-item"));
            const typeBtn = event.target.getAttribute("data-button");
            switch(typeBtn){
                case "add":
                    setCurentWorkPlace({id:null, workName:null});
                    setShow(true);
                    break;
                case  "edit" :
                    if(workPlaceId !== 0){
                        const curWorkPlace = allTasks?.data?.filter(a => a.id === workPlaceId)[0];
                        setCurentWorkPlace(curWorkPlace);
                    }
                    setShow(true);
                    break;
                case "delete" :
                    deleteTasks.mutate(workPlaceId);
                    break;
                case "save" :
                    setShow(false);
                    saveWorkPlace.mutate(curentWorkPlace)
                    break;
                default: break;    
            }
            
    }

    const showItems=(array)=>{
        return  array?.map(item =>
            <Row className="borderRow" key={item.id}>
                
                <Col xs={9}>{item.workName}</Col>
                <Col className="textEnd" xs={2}><Button variant="primary" data-button="edit" data-item={item.id} onClick={editAndDelete}>Редактировать</Button></Col>
                <Col xs={1}><Button variant="danger" data-button="delete" data-item={item.id} onClick={editAndDelete} >Удалить</Button></Col>
                
            </Row>
        )
    }
    return(
        <Container>
            <Row>
                <MenuUser/>
            </Row>
            <Row>
                <h1>Рабочее место выпуска</h1>
            </Row>
            <Row className="header">
                <Col xs={8}>Название</Col>
                <Col></Col>
                <Col></Col>
            </Row>
            
               {showItems(allTasks.data)}
            
            
            <Row className="marginTop">
                <Col xs={11}></Col><Col xs={1}><Button variant="primary" data-button="add" onClick={editAndDelete}>Добавить</Button></Col>
            </Row>
            <Modal show={show} onHide={closeHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>{curentWorkPlace.workName == null? 'Добавить рабочее место ' : `Редактировать рабочее место ${curentWorkPlace?.workName}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3 inputGr">
                    <Form.Control       
                        defaultValue={curentWorkPlace.workName}                 
                        aria-label="Название рабочего места"
                        aria-describedby="workName"
                        name="workName"
                        onChange={handleCheck}
                    />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeHandler}>Закрыть</Button>
                    <Button variant="primary" data-button="save" onClick={editAndDelete}>Применить</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
    
}