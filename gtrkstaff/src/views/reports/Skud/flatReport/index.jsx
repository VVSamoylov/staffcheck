import React, { useEffect } from 'react';
import {Row, Col, InputGroup, Form, Button, Container, Table } from 'react-bootstrap';
import { useState } from 'react';
import style from '../Skud.module.css';
import {MenuUser} from '../../../../components/MenuUser';
import {fetchGetAllDepartament} from '../../../../service/service-departament';
import {fetchGetAllShedule} from '../../../../service/service-shedule';
import {fetchGetReports} from '../../../../service/service-skudreports'
import {convertDurationToMinute,  convertMinuteToHour, convertViewDate} from '../../../../util/convertDate';
import { useQuery } from 'react-query';
import { DynamicDownload } from '../../../../components/DownloadButton';
/* eslint-disable */
// Плоский расчет по скуд
export const FlatSkudReport = ()=> {

    const[reports, setReports] = useState([]);
    const [curPar, setPar] = useState(
            {
                dateStart: null,
                dateEnd: null,
                deptId: null,
                shedulerId: null
            }
    );
    const[viewresult, setViewresult] = useState([]);

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

    useEffect(()=>{
        //settings();
    }, [])

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
        let r1 = await fetchGetReports(curPar.deptId, curPar.shedulerId, curPar.dateStart, curPar.dateEnd);
        setReports(r1);
        
    }
    const alarmColor=(p)=>{
        
        if(p?.message?.indexOf("Болезнь") === 0 ){
            return 'bg-warning';
        }
        if(p?.message?.indexOf('Выходной') === 0){
            return 'bg-light';
        }
        
        if(isNaN(p?.duration)){
            return 'bg-danger';
        }

        if(p?.message?.indexOf("Штатный вход" === 0)){
            return 'bg-secondary';
        }

        if(p?.message?.indexOf("Отпуск" === 0)){
            return 'bg-success';
        }
        
        

        return ;

    }
    const tableHeadBuiler =() =>{
        let resh=[];
        let startDate = new Date(curPar.dateStart);       
        for(startDate; startDate < new Date(curPar.dateEnd); startDate.setDate(startDate.getDate() + 1) ){
            resh.push(`${startDate.getDate() <10? `0${startDate.getDate()}`: `${startDate.getDate()}`}.${startDate.getMonth()+1 <10? `0${startDate.getMonth()+1}`: `${startDate.getMonth()+1}`}.${startDate.getFullYear()}`); 
        }
        return ( resh.map(r => { 
            return(<th key={r}>{r}</th>)
        }))
    }
    const showItems = (par)=>{
        let res = [];
        let resName = {
            fio: null,
            timework: [],
            sum:0,
            message: ''
        }
        // добавляем даты выходных
        let result = [
          
        ];

        let tm = [];
        for(let k = 0; k < par.length && k < 15 ; k++){
            res.push({
                sum:par[k]?.sum,
                timeList:[]
            })
            
            // к выделили сотрудника
            //делаем копия timList каждого сотрудника с добавление выходных
            let curD = new Date(curPar?.dateStart);
            for(let j=0; par[k]?.timeList?.length !== null && j < par[k]?.timeList?.length && j < 36; j++){
                // проходим по датам находим разрывы на выходных добавляем выходные
                let cp = new Date(par[k].timeList[j].date);
                if(curD.getFullYear() < cp.getFullYear() || curD.getMonth() < cp.getMonth() || curD.getDate() < cp.getDate()){
                    for(let l = 0; curD.getFullYear() == cp.getFullYear() && curD.getMonth() == cp.getMonth() && curD.getDate() < cp.getDate(); l++){
                        res[k].timeList.push({
                            employee: {...par[k].timeList[j].employee},
                            date: `${curD.getFullYear()}-${curD.getMonth()}-${curD.getDate()}`,
                            duration: "PT0H",
                            message : 'Выходной'
                        })
                        curD.setDate(curD.getDate() + 1);
                    }
                }
                res[k].timeList.push({...par[k].timeList[j]});
                curD.setDate(curD.getDate() + 1);

            }
            
            

        }

        let arout = [];
        for(let i = 0; i < res.length; i++){
            //TODO переделать учесть выходные и не явки нужно чтобы даты совпадали с датами в заголовке
            for(let j = 0; j < res[i]?.timeList.length; j++){
                    resName.timework.push({duration:convertDurationToMinute(res[i].timeList[j].duration), message:res[i].timeList[j].message})
                    resName.fio = `${res[i].timeList[j].employee.lastName} ${res[i].timeList[j].employee.firstName?.at(0)}.${res[i].timeList[j].employee.middleName?.at(0)}`;
            }
            if(resName.fio !== null){
                resName.sum = convertMinuteToHour(convertDurationToMinute(res[i]?.sum)); 
                arout.push(resName);
                resName = {
                            fio :null,
                            timework : []
                        };
            }
           
        }
        
        let i = 0;
        let j = 0;
        return arout.map(r => { 
                return(<tr key={i=i+1}><td key={j=j+1}>{r.fio}</td><td>{r.sum}</td>
                {r.timework.map(t =>{return(<td className={alarmColor(t)}  key={j=j+1}>{convertMinuteToHour(t.duration)} </td>)})}</tr>)
        })
    }
    return(
        <Container >
            <Row>
                <MenuUser/>
            </Row>
            <Row>
                <h1>Плоский отчет по СКУД</h1> 
            </Row>
            <Row>
                <Col xs={8}></Col>
                <Col xs={2}>
                <Col>
                    <DynamicDownload url={`${document.location.protocol}/download/skud?depId=${curPar.deptId}&shedulerId=${curPar.shedulerId}&dateFrom=${convertViewDate(curPar.dateStart)}&dateTo=${convertViewDate(curPar.dateEnd)}`} 
                    filename={`skud_${convertViewDate(curPar.dateStart)}_${convertViewDate(curPar.dateEnd)}.xls`} 
                    hidden={(curPar.deptId !== null && curPar.shedulerId !== null && curPar.dateStart !== null && curPar.dateEnd !== null)? false : true} />
                </Col>
                </Col>
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
            <Row> 
                <Col className='bg-warning'>Болезнь</Col>
                <Col className='bg-light'> Выходной</Col>
                <Col className='bg-success'>Отпуск</Col>
                <Col className='bg-secondary'> Явка</Col>
                <Col className='bg-danger'>Нет пары на вход и выход</Col>
            </Row>
            <Row className={`${style.scrollx}`}>
                <Table  className={`table  table-hover table-bordered`} bordered={true} >
                <thead className={`table-primary `}><tr><th>Ф.И.О</th><th>Отработанные часы </th>{tableHeadBuiler()}</tr></thead>
                <tbody>{showItems(reports)}</tbody>
                
                </Table>
            </Row>
            

        </Container>
       
    )
}