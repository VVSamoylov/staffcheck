import {MenuUser} from "../../components/MenuUser";
import React from "react";
import {Form, Col, Row, Button, Modal, Container} from 'react-bootstrap/';
import './style.css'
class UploadAbsentees extends React.Component{
    constructor(props){
        super(props)
        
        this.handleClose = this.handleClose.bind(this);
        //this.handleCheck = this.handleCheck.bind(this);
        this.state={
            show: false,
            sucsess: false,
            filename: String
        }
    
        this.selectFile = this.selectFile.bind(this);
        this.fileUpload = this.fileUpload.bind(this);
    }
    
        selectFile(evn){
          this.setState({filename: evn.target?.files[0]?.name});
        }
        handleClose(){
          this.setState({show:false})
        }

    fileUpload(evn){
        evn.preventDefault();
        const fData = new FormData();
        let inFile = document.getElementById('fload').files[0];
        console.log(inFile);
        fData.append('file', inFile);
        let url = `${document.location.protocol}/upload/uploadnotworking`;
        let header = new Headers();
        header.append("Cookie", document.cookie);
        header.append('Authorization', `${window.TOCKEN}`);
        const options = {
          method: 'POST',
          headers: header,
          body: fData
        }
        fetch(url, options).then(res =>{
          if(res.ok){
            this.setState({sucsess:true, show:true});
          }else{
            this.setState({sucsess:false, show:true});
          }
        }).catch(ex=>{
          this.setState({sucsess:false, show:true});
        })
      
      }
      
    render() {
        return (
            <Container>
            <MenuUser/>
            <h1> Загрузка отсутствующих!!</h1>
            <Form method="POST" encType="multipart/form-data" >
            <Row>
            <Col></Col>
            
            <Form.Group  className="mb-3 control50">
                  <Form.Label>Загрузить Эксель файл </Form.Label>
                  <Form.Control onChange={this.selectFile} type="file" id="fload" accept=".xlsx" name="file" size="lg" />
            </Form.Group>
            
            <Col>
              
            </Col>
            </Row>
            <Row>
              <Col xs={8}></Col> <Col><Button type="submit" onClick={this.fileUpload}>Загрузить </Button></Col>
            </Row>
            </Form>
            {this.state.sucsess? 
            <Modal show={this.state.show }
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Сообщение о результате
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>Результат загрузки!</h4>
                <p>  Загружен {this.state.filename}    </p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleClose}>Close</Button>
              </Modal.Footer>
            </Modal> :
            <Modal show={this.state.show }
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Загрузить {this.state.filename} не удалось
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Ошибка загрузки!!</h4>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.handleClose}>Закрыть</Button>
                </Modal.Footer>
            </Modal>}
  
          </Container>)
      }
}
export default UploadAbsentees;