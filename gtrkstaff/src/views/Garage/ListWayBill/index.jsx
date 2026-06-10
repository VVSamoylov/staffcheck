import React, { useState }  from "react";
import { useNavigate } from "react-router-dom";
import {MenuUser} from "../../../components/MenuUser";
import {Form, Col, Row, Button, Modal, InputGroup, Container, Table, Spinner, Alert} from 'react-bootstrap/';
import './style.css'
import {fechAllDriver, fechEmployeeById} from '../../../service/service-employee';
import {fechAllCars, fechAllTransport, fechAllOiltype, fechCarById, fetchSaveTransport, fetchDeleteTransportById} from '../../../service/service-transport';
import {convertViewDate} from '../../../util/convertDate';
import { useMutation, useQuery } from "react-query";
import {queryClient} from "../../../App"
export const  ListWayBill =()=>{
    const [wayBill, setWayBill] = useState({
        id: 0,
        date: new Date(),
        car:{},
        driver: {},
        oillType: "",
        remainder: null,
        workingHours: null,
        idleHours: null,
        oilLoss: null,
        workTrailerHours: null,
        oilTrailer: null,
        seasonalPay: 0.0,
        startKilometrage:null
    });
    const [show, setShow] = useState(false);
    
    const wayBillList = useQuery(
        'getAllTransport',
        fechAllTransport
    );
    const allCars = useQuery(
        'getAllCars',
        fechAllCars
    );
    const allDrivers = useQuery(
        'getAllDriver',
        fechAllDriver
    );
    const allOilType = useQuery(
        'getAllOilType',
        fechAllOiltype
    );

    const saveTransport = useMutation(
        (wayBill) => fetchSaveTransport(wayBill),
        {
            onSuccess : ()=>{
                queryClient.invalidateQueries('getAllTransport')
            }
        },
    );
    const deleteTransport = useMutation(
        (wId) => fetchDeleteTransportById(wId),
        {
            onSuccess : () =>{
                queryClient.invalidateQueries('getAllTransport');
            }
        },
    );
    const editANDdeletItem = (event) =>{
        //console.log('editAndDelete');
        const wayBillId = Number(event.currentTarget.getAttribute("data-waybillid"));
        const typeBtn = event.target.getAttribute("data-button");
        //console.log(wayBillId);
        switch(typeBtn){
            case  "edit" :
                let curWayBill = {
                    id: 0,
                    date: new Date(),
                    car:{},
                    driver: {},
                    oillType: "",
                    remainder: null,
                    workingHours: null,
                    idleHours: null,
                    oilLoss: null,
                    workTrailerHours: null,
                    oilTrailer: null,
                    seasonalPay: null, 
                    startKilometrage:null,
                    oilInput: 0,
                    returnRemainder:0,
                    endKilometerage: null
                }  
                if(wayBillId !== 0){
                    curWayBill = wayBillList?.data?.filter(a => a.id === Number(wayBillId))[0];
                }
                setWayBill({...curWayBill});
                
                setShow(true);
                break;
            case "delete" :
                setWayBill({...wayBill, id:wayBillId})
                deleteTransport.mutate(wayBillId);
                break;
            case "save" :
                setShow(false);
                saveTransport.mutate(wayBill)
                break;
            default: break;    
        }
        
    }
    const handleClose =()=>{
        setShow(false);
    }
    const handleCheck =(event) =>{
        setWayBill({
            ...wayBill, [event.target.name] : event.target.value
          });
    }
    

    // перенаправление на печать путевого листа
    const navigate = useNavigate();
    const printBill = (billId)=>{
      navigate(`/printOrderCar/${billId}`);
    }

    const selectCar =async(e) =>{
        const car = await fechCarById(e.target.value);
            setWayBill({...wayBill, car, startKilometrage:e.target.value})
    }
    const selectDriver = async(e) =>{
        const driver = await fechEmployeeById(e.target.value);
        setWayBill({...wayBill, driver});
        console.log(allOilType);
    }
    const selectOil = (e)=>{
        setWayBill({...wayBill, oillType:e.target.value});
    }
    const selectSeasonalPay = (e)=>{
        setWayBill({...wayBill, seasonalPay:e.target.value});
    }
    const showList= () =>{
        
        if(wayBill.isLoading){
            return <Spinner/>
        }
        if(wayBill.error){
            return <Alert>Не удалось загрузить данные проверте сеть!</Alert>
        }
        if(wayBillList?.data?.status === 500){
            return <Alert variant={"danger"} > Возможно нет таблицы со списками путевок проверте целостность БД!</Alert>
        }
        return    wayBillList?.data?.map((orderCar, i) =>(
                    <tr key={orderCar.id}>
                        <td>{convertViewDate(orderCar.date)}</td> 
                        <td>{orderCar.id}</td> 
                        <td>{`${orderCar.car.model}   ${orderCar.car.carNumber}`}</td> 
                        <td>{`${orderCar.driver.lastName} ${orderCar.driver.firstName} `}</td>
                        <td>{orderCar.oillType === 'AKI95' && "АИ-95"} {orderCar.oillType === 'AKI92' && "АИ-92"} {orderCar.oillType === 'DT' && "ДТ"} </td>
                        <td>{orderCar.remainder}</td>
                        <td>{orderCar.startKilometrage}</td>
                        <td>{orderCar.workingHours}</td>
                        <td>{orderCar.idleHours}</td>
                        <td>{orderCar.oilLoss}</td>
                        <td>{orderCar.workTrailerHours}</td> 
                        <td>{orderCar.oilTrailer}</td>
                        
                        <td>     
                            
                            <Button  data-button="edit" data-waybillid={orderCar.id} onClick={editANDdeletItem} variant="secondary" >Изменить</Button>
                        </td>
                        <td>
                            <Button onClick={()=>printBill(orderCar.id)} >Печать</Button>
                        </td>
                        <td>
                            <Button data-button="delete" data-waybillid={orderCar.id} onClick={editANDdeletItem} variant="danger">Удалить</Button>
                        </td>
                    </tr>                
                        )
                
                );
            
    }

    

    return(
        <>
        <Container>
            <MenuUser/>
            <Row>
                <Col><h1>Путевые листы</h1></Col>
            </Row>
            <Row>
            <Col xs={10}></Col>
            <Col xs={2}>
                <Button variant="primary" onClick={editANDdeletItem} data-waybillid={0} data-button="edit"  > Добавить</Button>
            </Col>
            </Row>
            <br/>
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>Дата</th> 
                        <th>Номер</th>  
                        <th>Автомобиль</th> 
                        <th>Водитель</th>
                        <th>Тип ГСМ</th>
                        <th>Остаток</th>
                        <th>Показания одометра </th>
                        <th>Время </th>
                        <th>Простой часов </th>
                        <th> Расход простой </th>
                        <th>Часов прицеп </th>
                        <th>Расход прицеп </th>
                        <th colSpan={3}></th>
                    </tr>
                </thead>
                <tbody>
                    {showList()}
                </tbody>
            </Table>
        </Container>
        {allCars?.data?.status !== 500 &&
        <Modal show={show} onHide={handleClose}  size="lg"  aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Путевой лист {wayBill.id === 0 || wayBill.id === undefined? 'Новый': `№${wayBill.id}`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <InputGroup className="mb-8 orderCarsrow">
                        <InputGroup.Text >
                            Сезонная надбавка
                        </InputGroup.Text>  
                        <Form.Select onChange={selectSeasonalPay} className="form-select"  id="seasonalPay">
                                                        {wayBill.seasonalPay === null? (new Date().getMonth() >2 && new Date().getMonth() < 10 ? <option value={0}> Лето</option> : <option value={10}> Зима</option>) : <option>{wayBill.seasonalPay === 0? "Лето" : "Зима"}</option>}
                                                        <option value={10}>Зима</option>
                                                        <option value={0}>Лето</option>
                                                        
                        </Form.Select>
                    </InputGroup>
                </Row>

                <Row>
                    <InputGroup className="mb-8 orderCarsrow">
                        <InputGroup.Text >
                            Дата выезда
                        </InputGroup.Text>  
                        <Form.Control type="date"
                            sm={8}
                            aria-label="Дата выезда"
                            aria-describedby="date"
                            name="date" 
                            defaultValue={wayBill.date}
                            onChange={handleCheck}
                        />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup className="mb-8 orderCarsrow">
                        <InputGroup.Text >
                            Автомобиль
                        </InputGroup.Text>  
                        <Form.Select onChange={selectCar} className="form-select"  id="car">
                                                        <option value={wayBill?.car === undefined || wayBill?.car?.model === undefined? 0 : wayBill?.car?.id}>{wayBill?.car === undefined || wayBill?.car?.model === undefined? 'Выбрать....': `${wayBill?.car?.model} ${wayBill?.car?.carNumber}`}</option>
                                                         { allCars?.data?.map((car) =>
                                                            <option key={car.id} value={car.id}>{`${car.model}  ${car.carNumber}`}</option>
                                                         )}
                        </Form.Select>
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup className="mb-8 orderCarsrow">
                        <InputGroup.Text >
                            Водитель
                        </InputGroup.Text>  
                        <Form.Select onChange={selectDriver} className="form-select"  id="driver">
                                                         <option value={wayBill.driver === undefined || wayBill.driver.lastName === undefined? 0 : wayBill.driver.id}>
                                                            {wayBill?.driver === undefined || wayBill?.driver?.lastName === undefined? 'Выбрать....': `${wayBill?.driver?.lastName} ${wayBill?.driver?.firstName}` }</option>
                                                         {  allDrivers?.data?.map((driver) =>
                                                            <option key={driver.id} value={driver.id}>{`${driver.lastName}  ${driver.firstName}`}</option>
                                                         )}
                        </Form.Select>
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup className="mb-8 orderCarsrow">
                        <InputGroup.Text >
                            Тип ГСМ
                        </InputGroup.Text>  
                        <Form.Select onChange={selectOil} className="form-select"  id="oilType">
                                                         <option value={wayBill.oillType === undefined || wayBill.oillType === null? 0 : wayBill.oillType}>
                                                            {wayBill.oillType === undefined || wayBill.oillType === null? 'Выбрать....': (wayBill.oillType==='AKI95' && 'АИ-95') || (wayBill.oillType==='AKI92' && 'АИ-92') || (wayBill.oillType==='DT' && 'ДТ')  }</option>
                                                         { allOilType?.data? allOilType.data?.map((oil) =>
                                                            <option key={oil} value={oil}>{oil=== 'AKI95' && 'АИ-95' } {oil=== 'AKI92' && 'АИ-92' } {oil=== 'DT' && 'ДТ' }</option>
                                                         ): ''}
                        </Form.Select>
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup className="mb-8 orderCarsrow">
                        <InputGroup.Text >
                                Остаток
                        </InputGroup.Text>  
                            <Form.Control 
                                sm={8}
                                aria-label="Остаток"
                                    aria-describedby="remainder"
                                    name="remainder" 
                                    defaultValue={wayBill.remainder}
                                    onChange={handleCheck}
                        />
                    </InputGroup>
                </Row>   
                <Row>
                    <InputGroup className="mb-8 orderCarsrow">
                        <InputGroup.Text >
                        Показания одометра <br/> в начале рейса
                        </InputGroup.Text>  
                            <Form.Control 
                                sm={8}
                                aria-label="Пробег"
                                    aria-describedby="startKilometrage"
                                    name="startKilometrage" 
                                    defaultValue={wayBill.startKilometrage}
                                    onChange={handleCheck}
                        />
                    </InputGroup>
                </Row>   
                <Row>
                    <InputGroup className="mb-8 orderCarsrow">
                        <InputGroup.Text >
                            Время
                        </InputGroup.Text>  
                            <Form.Control
                                sm={8}
                                aria-label="Время"
                                    aria-describedby="workingHours"
                                    name="workingHours" 
                                    defaultValue={wayBill.workingHours}
                                    onChange={handleCheck}
                        />
                    </InputGroup>
                </Row>   
                <Row>
                    <InputGroup className="mb-8 orderCarsrow">
                        <InputGroup.Text >
                        Простой часов
                        </InputGroup.Text>  
                            <Form.Control 
                                sm={8}
                                aria-label="Простой часов"
                                    aria-describedby="idleHours"
                                    name="idleHours" 
                                    defaultValue={wayBill.idleHours}
                                    onChange={handleCheck}
                        />
                    </InputGroup>
                </Row>        
                <Row>
                    <InputGroup className="mb-8 orderCarsrow">
                        <InputGroup.Text >
                        Расход простой
                        </InputGroup.Text>  
                            <Form.Control
                                sm={8}
                                aria-label="Расход простой"
                                    aria-describedby="oilLoss"
                                    name="oilLoss" 
                                    defaultValue={wayBill.oilLoss}
                                    onChange={handleCheck}
                        />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup className="mb-8 orderCarsrow">
                        <InputGroup.Text >
                        Часов прицеп
                        </InputGroup.Text>  
                            <Form.Control
                                sm={8}
                                aria-label="Часов прицеп"
                                    aria-describedby="workTrailerHours"
                                    name="workTrailerHours" 
                                    defaultValue={wayBill.workTrailerHours}
                                    onChange={handleCheck}
                        />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup className="mb-8 orderCarsrow">
                        <InputGroup.Text >
                        Расход прицеп
                        </InputGroup.Text>  
                            <Form.Control 
                                sm={8}
                                aria-label="Расход прицеп"
                                    aria-describedby="oilTrailer"
                                    name="oilTrailer" 
                                    defaultValue={wayBill.oilTrailer}
                                    onChange={handleCheck}
                        />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup className="mb-8 orderCarsrow">
                        <InputGroup.Text >
                        Заправка
                        </InputGroup.Text>  
                            <Form.Control 
                                sm={8}
                                aria-label="Заправка"
                                    aria-describedby="oilInput"
                                    name="oilInput" 
                                    defaultValue={wayBill.oilInput}
                                    onChange={handleCheck}
                        />
                    </InputGroup>
                </Row>
                <Row>
                    <InputGroup className="mb-8 orderCarsrow">
                        <InputGroup.Text >
                        Остаток при возвращении
                        </InputGroup.Text>  
                            <Form.Control 
                                sm={8}
                                aria-label="Заправка"
                                    aria-describedby="returnRemainder"
                                    name="returnRemainder" 
                                    defaultValue={wayBill.returnRemainder}
                                    onChange={handleCheck}
                        />
                    </InputGroup>
                </Row> 
                <Row>
                    <InputGroup className="mb-8 orderCarsrow">
                        <InputGroup.Text >
                        Показания одометра <br/> по окончанию рейса
                        </InputGroup.Text>  
                            <Form.Control 
                                sm={8}
                                aria-label="Пробег по завершению"
                                    aria-describedby="endKilometerage"
                                    name="endKilometerage" 
                                    defaultValue={wayBill.endKilometerage}
                                    onChange={handleCheck}
                        />
                    </InputGroup>
                </Row>          
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} data-modal="close" >  Закрыть </Button>
                <Button variant="primary" onClick={editANDdeletItem} data-item={wayBill.id} data-button="save"  > Сохранить</Button>
            </Modal.Footer>
        </Modal> }
        </>
    )
}