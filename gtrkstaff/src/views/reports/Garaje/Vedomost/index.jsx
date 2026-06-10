import React from 'react';
import {Row, Col, InputGroup, Form, Button, Container, Table } from 'react-bootstrap';
import { useState } from 'react';
import style from './vedomosti.module.css';
import {MenuUser} from '../../../../components/MenuUser';
import {fechReportTrafic} from '../../../../service/service-transport';
import {convertViewDate} from '../../../../util/convertDate';
/* eslint-disable */
// список планов на ТВ
export const VedomostiLogReport = ()=> {
    const [repors, setReports] = useState([]);
    const [curPar, setPar] = useState(
        {
            dateStart: null,
            dateEnd: null,
        }
    );

    const handleCheck =(event) =>{
        setPar({
            ...curPar, [event.target.name] : event.target.value
          });
    }
    const getReport = async()=>{
        let res = await fechReportTrafic(curPar.dateStart, curPar.dateEnd);
        //console.log(res);
        setReports(res);
            
    }

    const showReports = () =>{
        let i = 0;
        return repors?.map( r=> (
            <tr key={i}> 
                <td>{i= i+1}</td> 
                <td>{r.car.model}</td>
                <td>{r.car.carNumber}</td> 
                <td>{(r.endOdometr == null)? 0: r.endOdometr - r.startOdometr}</td> 
                <td>{`${r.startOdometr}`} </td>
                 <td>{ (r.endOdometr == null)? 'не сняты' : r.endOdometr}</td>
                 <td>{r.startSurplus}</td>
                 <td>{r.fillOil}</td>
                 <td>{r.endSurplus}</td>
                 <td>{r.fullActualFuelConsumption}</td>
                 <td>{r.actualFuelConsuptionParking}</td>
                 <td>{r.actualFuelConsuptionMovement}</td>
                 <td>{r.car.gasolineNorm}</td>
                 <td>{r.oillType}</td>
                 <td>{r.description}</td>
            </tr>
        )
        )
    }

    return(
        <Container>
            <MenuUser/>
            <Row>
                <h1>Отчет по пробегу машин и расходу топлива </h1>
                <h1> { curPar.dateStart && curPar.dateEnd?  ` c ${convertViewDate(curPar?.dateStart)} по ${convertViewDate(curPar?.dateEnd)}` : ""}</h1>
            </Row>

            <br/>
             <Row >
                <Col xs={10}></Col>
                <Col xs={2}>
                    <Button disabled={(curPar.dateStart !== null && curPar.dateEnd !== null)? false : true} onClick={getReport}>Получить отчет</Button>
                </Col>
            </Row>
            <br/>
            <Row >
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
                        <th>№пп</th>
                        <th>Марка машины</th>
                        <th>Номер машины</th>
                        <th>Общий пробег</th>
                        <th>Показания одометра на начало периода</th>
                        <th>Показания одометра на конец периода</th>
                        <th> Остатки на начало периода</th>
                        <th> Приход</th>
                        <th> Остатки на конец периода</th>
                        <th> Фактический расход <br/>(Общий)</th>
                        <th> Фактический расход <br/>(Стоянка прогрев)</th>
                        <th> Фактический расход <br/>(Движение)</th>
                        <th>Норма расхода</th>
                        <th>Марка ГСМ</th>
                        <th>Примечание</th>
                    </tr>
                </thead>
                <tbody >
                    {showReports()}
                </tbody>
                
            </Table>
        </Container>
    )
    
}