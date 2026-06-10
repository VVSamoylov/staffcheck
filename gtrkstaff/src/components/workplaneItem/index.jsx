import React, { useEffect } from 'react';
import {Row, Col, Button, ListGroup,  Alert, InputGroup, Form } from 'react-bootstrap';
import { useState } from 'react';
import {fetchGetAllTvPlan, fetchDeleteTvPlanById} from '../../service/service-tvPlan';
import {convertViewDate} from '../../util/convertDate';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from 'react-oauth2-code-pkce';
import style from './WorkPlaneItem.module.css';
/* eslint-disable */
// список планов на ТВ
export const WorkPlaneItem = ()=> {

    const {tokenData} = useAuthContext();
    const [show, setShow] = useState(false);
    const[plan, setPlan] = useState([]);
    const [curPar, setPar] = useState(
        {
            dateStart: null,
            dateEnd: null,
        }
    );

    const settings=async(dStart, dEnd)=>{
        const pl = await fetchGetAllTvPlan(dStart, dEnd);
        setPlan(pl);
    }
    useEffect(()=>{
        settings(null,null);
    },[]);
    // пернаправление на другую страницу
    const navigate = useNavigate();
    const editANDdeletItem = (event)=>{
        const itemId = event.currentTarget.getAttribute("data-item");
        const typeBtn = event.target.getAttribute("data-button");
        switch(typeBtn){
            case "delete" :
                setPlan(plan.filter(a => a.id !== Number(itemId)) );
                fetchDeleteTvPlanById(itemId);
                
                break;
        }
        
    }

    const handleCheck=()=>{
        setPar({
            ...curPar, [event.target.name] : event.target.value
        });
    }

    const getReport = async()=>{
        settings(curPar.dateStart, curPar.dateEnd)
            
    }

    const showItem = (plan)=>{
        if(plan === undefined || plan.length === 0){
            return ( <Alert key="danger" variant="danger">Значения не загружены проверте сеть </Alert> );
        }
        return plan?.map((item) =>{
           return ( 
            
                <ListGroup.Item key={item.id} data-item={item.id} onClick={editANDdeletItem}>
                    <Row>
                        <Col xs={5}>{convertViewDate(item.planeDate)}</Col>
                        <Col xs={5}>{item.planeName}</Col>
                        <Col xs={1}><Link to={`/workPlaneTVById/${item.id}`} >
                        {tokenData?.roles?.includes("ProducerTV") || tokenData?.roles?.includes("admin")? 'Изменить' : 'Смотреть' }</Link></Col>
                        {tokenData?.roles?.includes("ProducerTV") || tokenData?.roles?.includes("admin")?
                        <Col xs={1}><Button data-button="delete" data-item={item.id} variant="danger">Удалить</Button></Col>
                        : ''}
                    </Row>
                </ListGroup.Item>
                   
                
                
            )
        });
    }
    
      return (
        <Row>
            <Row>
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
                <Col xs={2}>
                    <Button disabled={(curPar.dateStart !== null && curPar.dateEnd !== null)? false : true} onClick={getReport}>Найти</Button>
                </Col>
            </Row>
            {tokenData?.roles?.includes("ProducerTV") || tokenData?.roles?.includes("admin")? 
            <Row>
                        <Col xs={10}> </Col>
                        <Col xs={2}>
                            <Button variant="primary" className={style.marginTop} onClick={() => {
                navigate(`/workPlaneTVById/0`);
              }} >Добавить новый план</Button>
                        </Col>
            </Row> 
            : ''}
            <br/>
            <Row className={style.bold}>
               <Col  xs={2}>Дата плана </Col> <Col xs={2}> </Col>
            </Row>
            {!show ?
            (<ListGroup>                
                {showItem(plan)}
           </ListGroup> ) : ''}
                    
        </Row>
     )
    
}