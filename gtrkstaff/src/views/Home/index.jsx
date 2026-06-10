import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import { Row, Col } from 'react-bootstrap';
import {MenuUser} from '../../components/MenuUser';
/* eslint-disable */
class Home extends React.Component {
    render() {
      return (
      <Container>
        <MenuUser/>
        <h1> Учет рабочего времени!</h1>
        <Row>
          <Col></Col>
          <Col><p>Воспользуйтесь меню и выберите нужную категорию</p></Col>
          <Col></Col>
        </Row>
      </Container>)
    }
  }

  export default Home;