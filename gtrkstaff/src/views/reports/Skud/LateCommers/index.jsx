import React from 'react';
import {Row, Col, InputGroup, Form, Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import style from './style.module.css';
import {MenuUser} from '../../../../components/MenuUser';
import {DynamicDownload} from '../../../../components/DownloadButton';
import {fetchGetAllDepartament} from '../../../../service/service-departament';
import {fetchGetSkudReportLatecomersByEmployees} from '../../../../service/service-skudreports';
import { convertViewDate } from '../../../../util/convertDate';
import { useQuery } from 'react-query';
/* eslint-disable */
// отчет по СКУД
export const SkudReportsLateCmmers = ()=> {

    const[reports, setReports] = useState([]);
    const [curPar, setPar] = useState(
            {
                dateStart: null,
                deptId: null
            }
    );
    const[url, setUrl] = useState(`${document.location.protocol}` )
    const departs = useQuery(   //status, data, isFetching, error
        'alldept',
        fetchGetAllDepartament
    )
    
    const handleCheck =(event) =>{
        setPar({
            ...curPar, [event.target.name] : event.target.value
          });
        console.log(curPar);  
        setUrl(`${document.location.protocol}/download/skud/getSkudReportLatecomersByEmployees?${(curPar?.deptId !== null?`depId=${curPar?.deptId}&`: '')}terminatorDateTime=${event.target.value}` );
    }

    const selectDept =(e)=>{
        setPar({
            ...curPar, deptId:e.target.value
        })
        
    }
    
    const getReport = async()=>{
        let res = await fetchGetSkudReportLatecomersByEmployees(curPar.deptId,  curPar.dateStart);
        setReports(res);
        
    }
    
    const showItems = (res)=>{
        return res.map(r =>{
            //console.log(res);
            return(                       
                   <Row key={r.id} >
                       <Col>
                           <InputGroup className={`mb-3 ${style.inputgroup } `}>
                               <Form.Control 
                                   aria-label="Время"
                                   aria-describedby="date"
                                   name="date"
                                   type="datetime-local"
                                   defaultValue={r.dateTime}  
                                   disabled                    
                               />
                           </InputGroup>
                       </Col>
                       <Col>{r.employee?.lastName}</Col>
                       <Col>{r.employee?.firstName}</Col>
                       <Col>{r.employee?.middleName}</Col>
                       <Col>{r.employee.dept.depName} </Col>
                   </Row>
                    ) // first map
            }
           )
    }
    return(
        <Container>
            <Row>
                <MenuUser/>
            </Row>
            <Row>
                <h1>Учет опоздавших</h1> 
            </Row>
            <Row>
                <Col xs={8}></Col>
                <Col xs={2}>
                    <Button disabled={( curPar.dateStart !== null )? false : true} onClick={getReport}>Найти</Button>
                </Col>
                <Col>{console.log(url)}
                
                    <DynamicDownload url={url}
                        filename={`skud_latescomme_${convertViewDate(curPar?.dateStart)}_.xls`} 
                        hidden={(curPar?.dateStart !== null)? false : true} />            
                </Col>
            </Row>
            <br/>
            <Row >
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

                <Col xs={6}>
                    <InputGroup className={`mb-4 ${style.inputgroup } `}>
                        <InputGroup.Text >
                            Время начала работы
                        </InputGroup.Text>
                            <Form.Control 
                                aria-label="Время начала"
                                aria-describedby="dateStart"
                                name="dateStart"
                                type='datetime-local'
                                defaultValue={0}
                                onChange={handleCheck}
                            />
                    </InputGroup>
                </Col>
            </Row>
            <br/>
            <Row className='bg-secondary'>
                <Col>Дата и время</Col><Col>Фамилия</Col><Col>Имя</Col><Col>Отчество</Col><Col>Отдел</Col>
            </Row>
            <br/>
            <Row>
            {reports.length > 0? showItems(reports): '' }
            </Row>

        </Container>      
    )
}