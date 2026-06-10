import React from 'react';
import {Row, Col, Button, Container, Table } from 'react-bootstrap';
import { useState } from 'react';
//import {fetchGetAllTvPlan, fetchDeleteTvPlanById} from '../../service/service-tvPlan';
import { useParams } from "react-router-dom";
import {fechTransportById} from '../../service/service-transport';
import {fechDispatcher, fechMekhanic} from '../../service/service-employee';
import {useQuery } from 'react-query';
import style from './PrintOrderCar.module.css';
/* eslint-disable */
// список планов на ТВ
export const PrintOrderCar = ()=> {
    const [enablePrint, setPrint] = useState(false)
    const  id = useParams().id;
    
    const queryOrderCar = useQuery(
        'getTransportById',
        ()=>fechTransportById(id)
    )
    const queryDispatcher = useQuery(
        'getDispatcher',
        fechDispatcher
    )
    const queryMekhanic = useQuery(
        'findMekhanic',
        fechMekhanic
    )
    
    
    //иконка кнопки печати
    const btnPrint = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-printer" viewBox="0 0 16 16">
        <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>
        <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"/>
    </svg>
    //иконка кнопки закрытия
    const closePrint = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-octagon" viewBox="0 0 16 16">
        <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1z"/>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
  </svg>
  console.log(queryMekhanic?.data)
    return ( 
    <Container>
        
        <Row>
            <Col xs={6}></Col><Col xs={6}>Скорость движения до 60 км/ч</Col>
        </Row>
        <Row>
            <Col className={style.bold} >Филиал федерального государственного унитарного предприятия "Всероссийская государственная телевизионная и 
            радиовещательная компания" <br/>
            Филиал федерального государственного унитарного предприятия Самара, Советской Армии, 205 тел. 926-25-37 ОРГН 1027700310076 
            </Col>
        </Row>
        <Row className={style.borderBottom}>
            <Col xs={4}> Телефон диспетчера: Советской Армии, 205 926-31-21 </Col>
             <Col xs={2}></Col>
            <Col xs={4}>Телефон механика: Советской Армии, 205 926-31-21 </Col>
        </Row>
        <Row><Col className={style.bold} xs={12}>ПУТЕВОЙ ЛИСТ № {queryOrderCar?.data?.id} ЛЕГКОВОГО АВТОМОБИЛЯ {queryOrderCar?.data?.date}</Col></Row>
        <Row > <Col> Срок действия с {queryOrderCar?.data?.date}</Col></Row>
        <Row className={style.howerBorder}> 
            <Col className={style.borderRight} xs={6}>
                <Row>
                    <Col>Марка автомобиля <span className={style.bold}> {queryOrderCar?.data?.car.model}</span></Col><Col>Гос номер <span className={style.bold}>{queryOrderCar?.data?.car.carNumber}</span></Col>    
                </Row>
                <Row>
                    <Col> Водитель <span className={style.bold}> {queryOrderCar.data?.driver.lastName + ' '+ queryOrderCar.data?.driver.firstName + '  ' + queryOrderCar.data?.driver.middleName } </span> </Col>
                </Row>
                <Row>
                    <Col>№ вод. уд.</Col><Col>{queryOrderCar.data?.driver.driverLicense}</Col>
                </Row>
                <Row>
                    <Col>В распоряжение <span className={style.bold}>ГТРК Самара</span> </Col>
                </Row>
                <Row>
                    <Col> Адрес подачи 443011 ул. Советской Армии, 205</Col>
                </Row>
                <Row>
                    <Col> <span className={style.bold}> Дата выдачи путевого листа {new Date().toLocaleDateString()} </span></Col>
                </Row>
                <Row>
                    <Col> Диспетчер <span className={style.bold}>{queryDispatcher.data?.lastName + ' ' + queryDispatcher.data?.firstName[0] + '.'+ queryDispatcher.data?.middleName[0]} </span></Col> <Col className={style.borderBottom}> </Col><Col xs={1}></Col>
                </Row>
                <Row>
                    <Col> <span className={style.bold}>Дата сдачи путевого листа </span> {new Date().toLocaleDateString()}</Col>
                </Row>
                <Row>
                    <Col> Диспетчер <span className={style.bold}>{queryDispatcher.data?.lastName + ' ' + queryDispatcher.data?.firstName[0] + '.' + queryDispatcher.data?.middleName[0]} </span></Col> <Col className={style.borderBottom}> </Col><Col xs={1}></Col>
                </Row>
                <Row>
                    <Col> Опоздания, простои в пути, заезды на парковку и прочие отметки </Col> <Col className={style.borderBottom}> </Col> <Col xs={1}></Col>
                </Row>
                <Row className={style.bold}>
                    <Col> Предрейсовый медосмотр пройден  </Col> <Col>После рейсовый медосмотр пройден</Col>
                </Row>
                <Row>
                    <Col>отметка о прохождении </Col> <Col>отметка о прохождении</Col>
                </Row>
                <Row>
                    <Col xs={1}></Col><Col className={style.borderBottom} > &nbsp; </Col><Col xs={1}></Col><Col className={style.borderBottom}> &nbsp;</Col><Col xs={1}></Col>
                </Row>
                <Row>
                    <Col xs={1}></Col><Col className={style.borderBottom}>&nbsp; </Col> <Col xs={1}></Col> <Col className={style.borderBottom}>&nbsp;</Col> <Col xs={1}></Col>
                </Row>
                <Row>
                    <Col xs={1}></Col><Col className={style.borderBottom}>&nbsp; </Col> <Col xs={1}></Col> <Col className={style.borderBottom}>&nbsp;</Col> <Col xs={1}></Col>
                </Row>
                <Row>
                    <Col xs={1}></Col><Col className={style.borderBottom}>&nbsp;</Col><Col xs={1}></Col> <Col className={style.borderBottom}>&nbsp;</Col><Col xs={1}></Col>
                </Row>
                <br/>
            </Col> 
            <Col xs={6}>
                <Row>
                    <Col xs={6}>Фактическое время выезда с парковки</Col><Col xs={5} className={style.borderBottom}></Col><Col xs={1}></Col>
                </Row>
                <Row>
                    <Col xs={6}>Показания одометра</Col> <Col xs={5} className={style.borderBottom}></Col><Col xs={1}></Col>
                </Row>
                <Row>
                    <Col xs={1}></Col><Col xs={10} className={`${style.borderBottom} ${style.bold}`}> Контроль технического состояния транспортного</Col><Col xs={1}></Col>
                </Row>
                <Row>
                    <Col xs={1}></Col><Col xs={10} className={`${style.borderBottom} ${style.bold}`}>  средства пройден</Col><Col xs={1}></Col>
                </Row>
                <Row>
                    <Col xs={1}></Col> <Col xs={5}>Выезд разрешаю:</Col><Col xs={5} className={style.borderBottom}>{new Date().toLocaleDateString()}</Col> <Col xs={1}></Col>
                </Row>
                <Row>
                    <Col xs={1}></Col> <Col xs={5}>Механик</Col><Col xs={5} className={`${style.borderBottom} ${style.bold}`}>{`${queryMekhanic.data?.lastName}.${queryMekhanic?.data?.firstName?.at(0)}.${queryMekhanic.data?.middleName?.at(0)}`}</Col><Col xs={1}></Col>
                </Row>
                <Row>
                    <Col xs={1}></Col> <Col xs={10}>Автомобиль в технически исправном состоянии принял</Col><Col xs={1}></Col>
                </Row>
                <Row>
                    <Col xs={1}></Col> <Col xs={5}>Водитель</Col><Col xs={5} className={`${style.borderBottom} ${style.bold}`}>{`${queryOrderCar.data?.driver.lastName}.${queryOrderCar.data?.driver.firstName?.at(0)}.${queryOrderCar.data?.driver.middleName?.at(0)}`}</Col><Col xs={1}></Col>
                </Row>
                <Row>
                    <Col xs={12} className={style.textCenter}>Движение горючего(л)</Col>
                </Row>
                <Row>
                    <Col>
                    <Table striped bordered  size='sm' variant='light'>
                        <thead>
                            <tr className={style.textCenter}>
                                <th rowSpan={2}>Марка ГСМ</th> <th rowSpan={2}>Заправлено</th>
                                <th colSpan={2} rowSpan={1}>
                                    Остаток при
                                </th>
                                <th rowSpan={2}>Расход топлива за пройденный километраж</th>
                            </tr>
                            <tr>    
                                <th> выезде</th> <th >возвращении</th>
                            </tr>
                            
                        </thead>
                        <tbody>
                            <tr className={style.textCenter}>
                                <td rowSpan={2}>{queryOrderCar.data?.oillType === 'DT' && 'ДТ'} {queryOrderCar.data?.oillType === 'AKI95' && 'АИ-95'} {queryOrderCar.data?.oillType === 'AKI92' && 'АИ-92'}</td>
                                <td rowSpan={1}></td> <td>{queryOrderCar.data?.remainder}</td><td>&nbsp;</td><td>&nbsp;</td>
                            </tr>
                            <tr> 
                                <td> &nbsp;</td><td>&nbsp; </td><td>&nbsp;</td><td>&nbsp;</td>
                            </tr>
                            <tr className={style.textCenter}>
                                <td colSpan={2} rowSpan={2}>Подписи</td>
                                <td rowSpan={1}>Механик</td><td rowSpan={1}>Механик</td><td rowSpan={1}>Группа учета ГСМ</td>
                            </tr>
                            <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                        </tbody>
                    </Table>
                    </Col>
                </Row>
                <Row>
                    <Col className={style.textCenter}>Отметки о поломке (остановке) спидометрового оборудования</Col>
                </Row>
                <Row>
                    <Col xs={1}></Col><Col xs={10} className={style.borderBottom}>&nbsp;</Col><Col xs={1}></Col>
                </Row>
                <Row>
                    <Col xs={1}></Col><Col xs={10} className={style.borderBottom}>&nbsp;</Col><Col xs={1}></Col>
                </Row>
                <Row>
                    <Col xs={1}></Col><Col xs={10} className={style.borderBottom}>&nbsp;</Col><Col xs={1}></Col>
                </Row>
                <Row>
                    <Col xs={1}></Col><Col xs={10} >Механик <span className={style.borderBottom}> {`${queryMekhanic.data?.lastName}.${queryMekhanic.data?.firstName?.at(0)}.${queryMekhanic.data?.middleName?.at(0)}`}</span></Col><Col xs={1}></Col>
                </Row>
                <br/>
            </Col>
        </Row>
        <Row>
            <Col xs={1}></Col><Col>Автомобиль в технически исправном состоянии сдал</Col><Col xs={1}></Col>
        </Row>
        <Row>
            <Col xs={1}></Col> 
                <Col  xs={8}>водитель: 
                    <spam className={`${style.borderBottom} ${style.bold}`}> {`${queryOrderCar.data?.driver.lastName}.${queryOrderCar.data?.driver?.firstName?.at(0)}.${queryOrderCar.data?.driver?.middleName?.at(0)}`} &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</spam></Col>
            <Col xs={3}></Col>
        </Row>
        <Row>
            <Col xs={1}></Col><Col  className={style.textCenter}>Показания одометра при возвращении на парковку</Col><Col className={style.borderBottom}></Col><Col xs={1}></Col>
        </Row>
        <Row>
            <Col xs={1}></Col><Col className={style.textCenter}>Фактическое время при возвращении на парковку</Col><Col className={style.borderBottom}></Col><Col xs={1}></Col>
        </Row>
        <Row>
            <Col xs={1}></Col><Col className={style.textCenter}>Автомобиль принял механик  </Col>
            <Col className={style.borderBottom}>{`${queryMekhanic.data?.lastName}.${queryMekhanic.data?.firstName?.at(0)}.${queryMekhanic.data?.middleName?.at(0)} `} &nbsp; &nbsp; &nbsp; &nbsp;</Col>
            <Col xs={1}></Col>
        </Row>
        <br/>
        <Row>
            <Col xs={8}></Col>
            <Col xs={2}><Button variant='success' onClick={window.print} >{btnPrint}</Button></Col>
            <Col xs={2}><Button variant='secondary' onClick={window.close} >{closePrint}</Button></Col>
        </Row> 
        <br/>
    </Container>
    )


}