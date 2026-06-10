import React from 'react';
import {Row, Col, InputGroup, Form, Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import style from './TravelLog.module.css';
import {MenuUser} from '../../../../components/MenuUser';
import {fechTravelLog} from '../../../../service/service-transport';
import {convertViewDate} from '../../../../util/convertDate';
/* eslint-disable */
// список планов на ТВ
export const TrevelLogReport = ()=> {
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
        let res = await fechTravelLog(curPar.dateStart, curPar.dateEnd);
        //console.log(res);
        setReports(res);
            
    }

    const showReports = () =>{
        let i = 0;
        return repors?.map( r=> (
            <Row key={r.id} className='alert alert-secondary'> 
                <Col>{i= i+1}</Col> 
                <Col>{r.id}</Col> 
                <Col>{convertViewDate(r.date)}</Col> 
                <Col>{`${r.driver.lastName} ${r.driver.firstName} ${r.driver.middleName}`} </Col>
                 <Col>{ `${r.car.carNumber} ${r.car.model}`}</Col>
                 <Col></Col>
            </Row>
        )
        )
    }

    return(
        <Container>
            <MenuUser/>
            <Row>
                <h1>Журнал движения путевых листов { curPar.dateStart && curPar.dateEnd?  ` c ${convertViewDate(curPar?.dateStart)} по ${convertViewDate(curPar?.dateEnd)}` : ""}</h1>
            </Row>
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
            <Row className={`${style.bold} alert alert-primary`}>
                <Col>№</Col><Col>№ путевого листа</Col><Col>Дата</Col><Col>Ф.И.О. Водителя</Col><Col>№ марка машины</Col><Col>Подпись диспетчера</Col>
            </Row>
            {showReports()}
        </Container>
    )
}