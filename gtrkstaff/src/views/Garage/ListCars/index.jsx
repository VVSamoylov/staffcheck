import React  from "react";
import {MenuUser} from "../../../components/MenuUser";
import {Form, Col, Row, Button, Modal, InputGroup, Container, Spinner, Alert} from 'react-bootstrap/';
import style from'./ListCars.module.css'
import { useState } from "react";
import {fechAllCars, fetchSaveCar, fetchDeleteCarById} from '../../../service/service-transport';
import { useMutation,  useQuery } from "react-query";
import {queryClient} from "../../../App" 
export const  ListCars =()=>{
    const [carItem, setCarItem] = useState({
        id: 0,
        carNumber: null,
        model: null,
        odometer: null,
        gasolineNorm: null
    });
    const [show, setShow] = useState(false);
    
    const queryCarList = useQuery(
        ['carList'],
        fechAllCars
    )
    const deleteCar = useMutation(
        (cId)=>fetchDeleteCarById(cId),
        {
        onSuccess: () => {
          // Инвалидация и удаление
          queryClient.invalidateQueries('carList');
        },
    });
    const saveCar = useMutation(
        (car) => fetchSaveCar(car),
        {
            onSuccess: () =>{
                //добавление и изменение
                //console.log("test qyeries cache");
                queryClient.invalidateQueries('carList');
            },
        }
    )
    const editANDdeletItem = (event) =>{
        //console.log('editAndDelete');
        const carId = event.currentTarget.getAttribute("data-carid");
        const typeBtn = event.target.getAttribute("data-button");
        switch(typeBtn){
            case  "edit" :
                let curCar = {
                    id:0,
                    model:null,
                    odometer: null,
                    gasolineNorm:null
                }  
                if(carId !== 0){
                    curCar = queryCarList.data?.filter(a => a.id === Number(carId))[0];
                }
                //console.log(curItem)
                setCarItem({...curCar});
                setShow(true);
                break;
            case "delete" :
                deleteCar.mutate(carId);
                break;
            case "save" :
                setShow(false);
                saveCar.mutate(carItem);
                break;
            default: break;    
        }
        
    }
    const handleClose =()=>{
        setShow(false);
    }
    const handleCheck =(event) =>{
        setCarItem({
            ...carItem, [event.target.name] : event.target.value
          });
    }
    const showList= () =>{
        if(queryCarList.isLoading){
            return <Row><Spinner/></Row>
        }
        if(queryCarList.error){
            return <Alert  variant={"danger"}>
                Не удалось загрузить таблицу с машинами проверте сеть!!
          </Alert>
        }
        if(queryCarList?.data?.status === 500){
            return  <Alert variant={"danger"}> В базе нет таблицы машин проверте целостность БД</Alert> 
        }
        

        return    queryCarList?.data?.map((car, i) =>(
                
                         <Row className={style.lineList} key={car.id}>
                            <Col xs={1}>{i+1}</Col> 
                            <Col xs={2}>{car.carNumber}</Col> 
                            <Col xs={2}>{car.model}</Col>
                            <Col xs={2}>{car.odometer}</Col> 
                            <Col xs={1}>{car.gasolineNorm}</Col>
                            <Col xs={2}> <Button data-button="edit" data-carid={car.id} onClick={editANDdeletItem} variant="secondary" >Изменить</Button></Col> 
                            <Col xs={2}><Button data-button="delete" data-carid={car.id} onClick={editANDdeletItem} variant="danger">Удалить</Button></Col>
                        </Row>
                
                        )
                
                );
            
    }

    return(
        <>
        <Container>
            <MenuUser/>
            <Row>
                <Col><h1>Список парка машин</h1></Col>
            </Row>
            <Row>
                <Col xs={1}>№</Col> <Col xs={2}>Гос номер</Col> <Col xs={2}>Модель</Col> <Col xs={2}> Пробег</Col><Col xs={1}>Норма расхода</Col><Col xs={4}></Col>
            </Row>
            {showList()}
            <Row>
            <Col xs={10}></Col>
            <Col xs={2}>
                <Button variant="primary" onClick={editANDdeletItem} data-item={0} data-button="edit"  > Добавить</Button>
            </Col>
            </Row>
        </Container>
        <Modal show={show} onHide={handleClose}  size="lg"  aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Редактировать {carItem.model}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <InputGroup className="mb-6">
                        <InputGroup.Text >
                            Гос номер
                        </InputGroup.Text>  
                        <Form.Control 
                            sm={8}
                            aria-label="Гос номер"
                            aria-describedby="carNumber"
                            name="carNumber" 
                            defaultValue={carItem.carNumber}
                            onChange={handleCheck}
                        />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup className="mb-6">
                        <InputGroup.Text >
                            Модель
                        </InputGroup.Text>  
                            <Form.Control 
                                sm={8}
                                aria-label="модель"
                                    aria-describedby="model"
                                    name="model" 
                                    defaultValue={carItem.model}
                                    onChange={handleCheck}
                        />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup className="mb-6">
                        <InputGroup.Text >
                            Норма расхода
                        </InputGroup.Text>  
                            <Form.Control 
                                sm={8}
                                aria-label="норма расхода"
                                    aria-describedby="gasolineNorm"
                                    name="gasolineNorm" 
                                    defaultValue={carItem.gasolineNorm}
                                    onChange={handleCheck}
                        />
                    </InputGroup>
                </Row>        
                        
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} data-modal="close" >  Закрыть </Button>
                <Button variant="primary" onClick={editANDdeletItem} data-item={carItem.id} data-button="save"  > Сохранить</Button>
            </Modal.Footer>
        </Modal> 
        </>
    )
}