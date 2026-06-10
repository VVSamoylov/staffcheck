import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import {Container, Row, InputGroup, Form, ButtonGroup, Button, Col, Modal } from "react-bootstrap";
import style from './setLimitWork.module.css';
import {MenuUser} from "../../components/MenuUser";
import {fetchGetLimit, fetchSaveWorkLimit} from '../../service/service-limitwork';
import { useQuery, useMutation } from "react-query";
import {queryClient} from "../../App" 
export const SetLimitTVWorkEmployee =()=> {
  const [limit, setlimit] = useState({
      dutySait: 0,
      dutySocial: 0
  })
  const [showModal, setModal] = useState(false);
  

  const queryLimit = useQuery(
    'getlimit',
    fetchGetLimit
  )

  const updateLimit = useMutation(
    (limit)=>fetchSaveWorkLimit(limit),
      {
        onSuccess: () => {
        // Инвалидация и обновление
        setModal(true);
        queryClient.invalidateQueries('getlimit');
      },
  });

  const handleSave = async()=>{
    let send = { dutySait:limit.dutySait, dutySocial:limit.dutySocial }
    if(limit.dutySait === 0 || limit.dutySait === undefined){
      setlimit({...limit, dutySait: queryLimit.data.dutySait});
      send.dutySait = queryLimit.data.dutySait;
    }
    if(limit.dutySocial === 0 || limit.dutySocial === undefined){
      setlimit({...limit, dutySocial: queryLimit.data.dutySocial});
      send.dutySocial = queryLimit.data.dutySocial;
    }
    updateLimit.mutate(send);
    
  }
  const  handleCheck = (event) =>{
    setlimit({
      ...limit, [event.target.name]: event.target.value
    })    
  }

  const closeModal=()=>{
    setModal(false);
  }
  
  // перенаправление на список планов
    const navigate = useNavigate();
    const handleClose = () =>{    
      navigate(`/listWorkPlaneTV`);
    }
    
      
      return (
        <Container>
        <MenuUser/>
          <h1>Изменение лиминта на повторное назначение</h1>
          <Row>
            <Col xs={4}></Col>
            
            <InputGroup  className={` mb-6 ${style.setParametrGroup}`}>
              <InputGroup.Text >
                Дежурный по сайту
              </InputGroup.Text>
              <Form.Control className={`${style.setNumberFiled}`}
                defaultValue={queryLimit?.data?.dutySait}
                aria-label="дежурны по сайту"
                type="number"
                min={0}
                max={31}
                aria-describedby="dutySait"
                name="dutySait"
                onChange={handleCheck}
              />
            </InputGroup>
            
            <Col xl={6}></Col>
          </Row>
          <Row>
            <Col></Col>
            <InputGroup className={`${style.setParametrGroup}`}>
              <InputGroup.Text >
                Дежурный по соцсетям
              </InputGroup.Text>
              <Form.Control 
                defaultValue={queryLimit?.data?.dutySocial}
                aria-label="дежурный по соцсети"
                type="number"
                min={0}
                max={31}
                aria-describedby="dutySocial"
                name="dutySocial"
                onChange={handleCheck}
              />
            </InputGroup>
            <Col></Col>
          </Row>
          <br/>
          <Row>
            <Col ></Col>
            <ButtonGroup aria-label="Employee added">
              <Button onClick={handleSave} variant="primary">Сохранить</Button>
              <Button variant="danger" onClick={handleClose}>Отмена</Button>
            </ButtonGroup>
            <Col xs={5}></Col>
          </Row>

          {/* Modal для добавления дежурного */}
          <Modal show={showModal} onHide={closeModal} animation={false}>
              <Modal.Header closeButton>
          <Modal.Title>Соообщение</Modal.Title>
          </Modal.Header>
              <Modal.Body>
                <p> Параметры сохранены</p>
              </Modal.Body>
              <Modal.Footer>
                <Button  variant="succsess" onClick={closeModal}>Закрыть</Button>
              </Modal.Footer> 
          </Modal>
        </Container>
        )
    
  
}