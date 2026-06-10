import React, { useState }  from "react";
import {MenuUser} from "../../components/MenuUser";
import {Form, Col, Row, Button, Modal, Container} from 'react-bootstrap/';
import style from './UploadEmployee.module.css'
export const UploadEmployee =()=>{
  const [show, setShow] =useState(false);
  const [succsess, setSuccess] = useState(false);
  const [fileName, setFileName] = useState('');
  

  const selectFile=(evn)=>{
      setFileName(evn.target?.files[0]?.name);
    }
  const handleClose=()=>{
      setShow(false)
    }

const fileUpload=(evn)=>{
  evn.preventDefault();
  const fData = new FormData();
  let inFile = document.getElementById('fload').files[0];
  //console.log(inFile);
  fData.append('file', inFile);
  let url = `${document.location.protocol}/upload/uploadempl`;
  let header = new Headers();
  
  header.append("Cookie", document.cookie);
  header.append('Authorization', `${window.TOCKEN}`);
  const options = {
    method: 'POST',
    headers: header,
    body :fData
  };
  fetch(url, options).then(res =>{
    if(res.ok){
      setSuccess(true);
      setShow(true);
    }else{
      setSuccess(false);
      setShow(true);
    }
  }).catch(ex=>{
    setSuccess(false);
    setShow(true);
  })

}

    
        return (
        <Container>
          <MenuUser/>
          <h1> Загрузка сотрудников!!</h1>
          <Form method="POST" encType="multipart/form-data" >
          <Row>
          <Col></Col>
          
          <Form.Group  className={`mb-3 ${style.control50}`}>
                <Form.Label>Загрузить Эксель файл </Form.Label>
                <Form.Control onChange={selectFile} type="file" id="fload" accept=".xlsx" name="file" size="lg" />
          </Form.Group>
          
          <Col>
            
          </Col>
          </Row>
          <Row>
            <Col xs={8}></Col> <Col><Button type="submit" onClick={fileUpload}>Загрузить </Button></Col>
          </Row>
          </Form>
          {succsess? 
          <Modal show={show }
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                  Загрузка файла {fileName}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Результат загрузки!</h4>
              <p>       Загружен {fileName}  </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
          </Modal> :
          <Modal show={show }
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Загрузить {fileName} не удалось
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <h4>Ошибка загрузки!!</h4>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleClose}>Закрыть</Button>
              </Modal.Footer>
          </Modal>}

        </Container>)
      
}

