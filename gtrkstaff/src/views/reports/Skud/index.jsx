import React from 'react';
import {Row, Col, InputGroup, Form, Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import style from './Skud.module.css';
import {MenuUser} from '../../../components/MenuUser';
import {fetchGetAllDepartament} from '../../../service/service-departament';
import {fetchGetAllShedule} from '../../../service/service-shedule';
import {fetchGetReports} from '../../../service/service-skudreports'
import {convertDurationToMinute, convertStringToTime, convertMinuteToHour, convertViewDate} from '../../../util/convertDate';
import { useQuery } from 'react-query';
/* eslint-disable */
// отчет по СКУД
export const SkudReport = ()=> {

    const[reports, setReports] = useState([]);
    const [curPar, setPar] = useState(
            {
                dateStart: null,
                dateEnd: null,
                deptId: null,
                shedulerId: null
            }
    );
    const departs = useQuery(   //status, data, isFetching, error
        'alldept',
        fetchGetAllDepartament
    )
    
    const [shedule, setShedule] = useState({
                id: null,
                scheduleName: '',
    });
    const [sheds, setSheds] = useState([]);

    const shedulers = useQuery(   //status, data, isFetching, error
                'getall',
                fetchGetAllShedule
    );


    const handleCheck =(event) =>{
        setPar({
            ...curPar, [event.target.name] : event.target.value
          });
    }

    const selectDept =(e)=>{
        setPar({
            ...curPar, deptId:e.target.value
        })
    }
    const selectSheduler = (e) =>{
        setPar({
            ...curPar, shedulerId:e.target.value
        })
    }
    const getReport = async()=>{
        let res = await fetchGetReports(curPar.deptId, curPar.shedulerId, curPar.dateStart, curPar.dateEnd);
        setReports(res);
        
    }
    const alarmColor=(p)=>{
        if(p?.message?.includes("Болезнь") ){
            return 'alert alert-warning';
        }
        if(p?.message?.indexOf("Отпуск" === 0)){
            return 'bg-success';
        }
        if(isNaN(convertDurationToMinute(p.duration))){
            return 'alert alert-danger';
        }

        return 'alert alert-secondary';

    }
    const showItems = (res)=>{
         //console.log(res)
        let k =0;
        let em = 0;
        return res.map(r =>{
            
        return(<Row key={em = em + 1}>
             
            {  r?.timeList.map( tl =>{
                    return(
                            <Row key={k=k+1} className={alarmColor(tl)}>
                                <Col>{convertViewDate(tl.date)}</Col>
                                <Col>{tl.employee?.lastName}</Col>
                                <Col>{tl.employee?.firstName}</Col>
                                <Col>{tl.employee?.middleName}</Col>
                                <Col> {convertStringToTime(tl.inputTime)}</Col>
                                <Col> {convertStringToTime(tl.outputTime)}</Col>
                                <Col>{convertMinuteToHour(convertDurationToMinute(tl.duration))}</Col>
                                <Col>{tl.message}</Col>
                            </Row>
                    )}
            )}
             
            <Col className={`${style.bold}`} xl={10}>Общее время</Col><Col className={`${style.bold}`} xl={2}>{convertMinuteToHour(convertDurationToMinute(r?.sum))}</Col>
        </Row>) // first map
        }
        )
    }
    return(
        <Container>
            <Row>
                <MenuUser/>
            </Row>
            <Row>
                <h1>Отчет по СКУД</h1> 
            </Row>
            <Row>
                <Col xs={10}></Col>
                <Col xs={2}>
                    <Button disabled={(curPar.deptId !== null && curPar.shedulerId !== null && curPar.dateStart !== null && curPar.dateEnd !== null)? false : true} onClick={getReport}>Получить отчет</Button>
                </Col>
            </Row>
            <br/>
            <Row >
                <Col xs={3}>
                    <InputGroup className={`mb-6 ${style.inputgroup } `}>
                        <InputGroup.Text className="col-6" htmlFor="sheduler">График</InputGroup.Text>
                        <Form.Select onChange={selectSheduler} className="form-select" id="sheduler">
                            <option value={0}>Выбрать...</option>
                            {shedulers?.data?.map((sh) =>
                                <option key={sh.id} value={sh.id}>{sh.scheduleName}</option>
                            )}
                        </Form.Select>
                        </InputGroup>
                </Col>
                <Col xs={3}>
                    <InputGroup className={`mb-6 ${style.inputgroup } `}>
                        <InputGroup.Text className="col-6" htmlFor="departament">Отдел</InputGroup.Text>
                        <Form.Select onChange={selectDept} className="form-select" id="departament">
                            <option value={0}>Выбрать...</option>
                            {departs?.data?.map((d) =>
                                <option key={d.id} value={d.id}>{d.depName}</option>
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
            <Row className='bg-secondary'>
                <Col>Дата</Col><Col>Фамилия</Col><Col>Имя</Col><Col>Отчество</Col><Col>Приход</Col><Col>Выход</Col><Col>На работе мин</Col><Col>Примечание</Col>
            </Row>
            <Row>
            {reports.length > 0? showItems(reports): '' }
            </Row>

        </Container>
       
    )
}