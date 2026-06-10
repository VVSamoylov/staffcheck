import React, {  useState} from 'react';
import {Row, Col, Button, ListGroup, Modal, InputGroup, Form, Spinner, Alert } from 'react-bootstrap';
import {fetchDeleteShedule, fetchGetAllShedule, fetchSaveShedule} from '../../service/service-shedule';
import { useQuery, useMutation,useQueryClient } from 'react-query';
import style from './WorkScheduleItem.module.css';
/* eslint-disable */
export const WorksheduleItem = ()=> {

    //const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [shedule, setShedule] = useState({
            id: null,
            scheduleName: '',
    });
    
    //const [state, setState] = useState();
    //const listShed = useSelector(state => state.sheds.sheds);
    const [sheds, setSheds] = useState([]);
    //console.log(" first ",listEmpl);
    //console.log("empl ", empl);
   
    
    //setEmpl({empl: listEmpl});
    const queryClient = useQueryClient();
    const deleteShedule = useMutation(fetchDeleteShedule, {
        onSuccess: () => {
            // Инвалидация и обновление
            queryClient.invalidateQueries('getallWorkShedule');
          },
    })
    const saveShedule = useMutation(fetchSaveShedule, {
        onSuccess: () => {
            // Инвалидация и обновление
            queryClient.invalidateQueries('getallWorkShedule');
          },
    })

    const handleCheck =(event) =>{
        setShedule({
            ...shedule, [event.target.name]: event.target.value
          });
    }

    const handleClose = () =>{    
        setShow(false);
    }
    const editANDdeletItem = (event) =>{
        console.log('editAndDelete');
        const itemId = event.currentTarget.getAttribute("data-item");
        const typeBtn = event.target.getAttribute("data-button");
        switch(typeBtn){
            case  "edit" :  
                let curItem = data.filter(a => a.id == itemId)[0];
                //console.log(curItem)
                setShedule({...curItem});
                setShow(true);
                break;
            case "delete" :
                deleteShedule.mutate(itemId);
                setShedule([...sheds.filter(a => a.id !== itemId)]);
                break;
            case "save" :
                setShedule([...sheds.filter(a=> a.id !== shedule.id), {...shedule}])
                setShow(false);
                saveShedule.mutate(shedule)
                break;
        }
        
    }
    const showItem = (arrshedules)=>{
        if(arrshedules == undefined || arrshedules.length === 0){
            return ( <Alert key="danger" variant="danger">Значения не загружены проверте сеть </Alert> );
        }
        return arrshedules.map((item) =>{
           return ( 
            
                <ListGroup.Item key={item?.id} data-item={item?.id} onClick={editANDdeletItem}>
                    <Row>
                        <Col xs={10}>{item?.scheduleName}</Col>
                        <Col xs={1}><Button data-button="edit" variant="primary">Изменить</Button></Col>
                        <Col xs={1}><Button data-button="delete" variant="danger">Удалить</Button></Col>
                    </Row>
                </ListGroup.Item>
                   
                
                
            )
        });
    }
    
    const { status, data, isFetching, error } = useQuery(
            'getallWorkShedule',
            fetchGetAllShedule
          );
        if(status === 'loading'){
            return (<Spinner animation="border" variant="primary" />    )
        }
        //console.log("stat ", data);
        if(status==='error'){
            return  (<div>  Ошибка загрузки   <h1></h1></div>);
                        
        }
        if(status==='success' && data != undefined){
            //setEmpl([...data]);
        }
        //console.log(data);
        
    
        

         
      return (
        <Row>
            <Row>
               <Col className={style.bold} xs={10}>График работы</Col>  <Col xs={2}></Col>
            </Row>
            {!show ?
            (<ListGroup>                
                {showItem(data)}
           </ListGroup> ) :
           (<Modal show={show} onHide={handleClose}  size="lg"  aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Редактировать {shedule?.scheduleName}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                       
                        <Row>
                            <Col></Col>
                            <InputGroup className="mb-3">
                               <InputGroup.Text >
                                    Описание
                                </InputGroup.Text>  
                                <Form.Control 
                                    aria-label="Описание"
                                    aria-describedby="scheduleName"
                                    name="scheduleName" 
                                    defaultValue={shedule?.scheduleName}
                                    onChange={handleCheck}
                                />
                            </InputGroup>
                            <Col></Col>
                        </Row>
                        
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} data-modal="close" >  Закрыть </Button>
                            <Button variant="primary" onClick={editANDdeletItem} data-button="save"  > Сохранить</Button>
                        </Modal.Footer>
                    </Modal> )}
                    
        </Row>
     )

     
    }


  

