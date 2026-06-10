import React from 'react';
import {Row, Col, InputGroup, Form, Button, Container, Table } from 'react-bootstrap';
import { useState } from 'react';
import { useQuery } from "react-query";
import style from './driverCard.module.css';
import {MenuUser} from '../../../../components/MenuUser';
import {fechAllCars,  fechReporDriverCard, fechCarById} from '../../../../service/service-transport';
import {convertViewDate} from './../../../../util/convertDate';
/* eslint-disable */
// список планов на ТВ
export const DriverCard = ()=> {
    const [repors, setReports] = useState([]);
    const [curPar, setPar] = useState(
        {
            dateStart: null,
            dateEnd: null,
            car:null
        }
    );
    const allCars = useQuery(
            'getAllCars',
            fechAllCars
    );

    const handleCheck =(event) =>{
        setPar({
            ...curPar, [event.target.name] : event.target.value
          });
    }
    const getReport = async()=>{
        console.log(curPar)
        let res = await fechReporDriverCard(curPar.dateStart, curPar.dateEnd, curPar.car.id);
        setReports(res);
            
    }
    const selectCar = async(e) =>{
        const car = await fechCarById(e.target.value);
                    setPar({...curPar, car});
    }

    const showReports = () =>{
        return repors?.map( r=> (
            <tr key={r.id}> 
                <td>{convertViewDate(r.date)}</td> 
                <td>{r.id}</td>
                <td> {`${r?.driver?.lastName} ${r?.driver?.firstName.at(0)}. ${r?.driver?.middleName?.at(0)}.`}</td>
                <td>1</td>
                <td>{`${r.startKilometrage}`} </td>
                <td>{ (r.endKilometerage == null)? 'не сняты' : r.endKilometerage}</td>
                <td>{(r.endOdometr == null)? 0: r.endOdometr - r.startOdometr}</td> 
                <td>{r.remainder}</td> {/* остатки вначале рейса */}
                 <td>{r.oilInput}</td> {/* заправка */}
                 <td>{r.returnRemainder}</td> {/* остатки после рейса */}
                 <td>{r.remainder + r.oilInput - r.returnRemainder}</td> {/* фактический расход */}
                 <td>{ (r.endOdometr == null)? 0: (r.endOdometr - r.startOdometr)* r.car.gasolineNorm }</td> {/*  расход по норме*/}
                 <td>{ r.endOdometr == null? 0: ((r.endOdometr - r.startOdometr)* r.car.gasolineNorm- r.remainder + r.oilInput - r.returnRemainder) }</td> {/* перерасход  */}
                 <td>{r.car.gasolineNorm}</td>
                 <td>{r.oillType}</td>
                 <td>{r.seasonalPay === 0? "Лето" : "Зима"}</td>
            </tr>
        )
        )
    }

    return(
        <Container>
            <MenuUser/>
            <Row>
                <h1>Карточка учета работы автомобиля <br/> {curPar.car?.model} госномер {curPar.car?.carNumber} за { curPar.dateStart && curPar.dateEnd?  ` c ${convertViewDate(curPar?.dateStart)} - ${convertViewDate(curPar?.dateEnd)}` : ""} </h1>
                
            </Row>

            <br/>
             <Row >
                <Col xs={10}></Col>
                <Col xs={2}>
                    <Button disabled={(curPar.dateStart !== null && curPar.dateEnd !== null)? false : true} onClick={getReport}>Получить отчет</Button>
                </Col>
            </Row>
            <br/>
            <Row xs={3}>
                <Col>
                    <InputGroup className={`mb-6 ${style.inputgroup } `}>
                        <InputGroup.Text >
                            Автомобиль
                        </InputGroup.Text>  
                            <Form.Select onChange={selectCar} className="form-select"  id="car">
                                <option value={curPar?.car === undefined || curPar?.car?.model === undefined? 0 : curPar?.car?.id}>{curPar?.car === undefined || curPar?.car?.model === undefined? 'Выбрать....': `${curPar?.car?.model} ${curPar?.car?.carNumber}`}</option>
                                { allCars?.data?.map((car) =>
                                    <option key={car.id} value={car.id}>{`${car.model}  ${car.carNumber}`}</option>
                                )}
                        </Form.Select>
                    </InputGroup>
                </Col>
                <Col xs={3}>
                    <InputGroup className={`mb-6 ${style.inputgroup } `}>
                        <InputGroup.Text >
                            Время начала
                        </InputGroup.Text>
                            <Form.Control 
                                aria-label="Время начала"
                                aria-describedby="dateStart"
                                name="dateStart"
                                type='date'
                                defaultValue={0}
                                onChange={handleCheck}
                            />
                    </InputGroup>
                </Col>
                <Col xs={3}>
                    <InputGroup className={`mb-6 ${style.inputgroup } `}>
                        <InputGroup.Text >
                            Время окончания
                        </InputGroup.Text>
                            <Form.Control 
                                aria-label="Время окончания"
                                aria-describedby="dateEnd"
                                name="dateEnd"
                                type='date'
                                defaultValue={0}
                                onChange={handleCheck}
                            />
                    </InputGroup>
                </Col>
            </Row>
            <br/>
            <Table className={`table `} bordered={true}>
                <thead className={`table-primary `}>
                    <tr>
                        <th>Дата</th>
                        <th>Номер путевого листа</th>
                        <th>Ф.И.О водителя</th>
                        <th>Дни</th>
                        <th>Показания одометра на начало периода</th>
                        <th>Показания одометра на конец периода</th>
                        <th>Пробег автомобиля</th>
                        <th> Остатки на начало периода</th>
                        <th> Приход</th>
                        <th> Остатки на конец периода</th>
                        <th> Фактический расход </th>
                        <th> Расход по норме</th>
                        <th> Перерасход</th>
                        <th>Норма расхода</th>
                        <th>Марка ГСМ</th>
                        <th>Сезонная надбавка</th>
                    </tr>
                </thead>
                <tbody >
                    {showReports()}
                </tbody>
                
            </Table>
        </Container>
    )
    
}