import React from 'react';
import {Row, Container} from 'react-bootstrap';
import {MenuUser} from '../../../components/MenuUser';
import {NotWorkItem} from '../../../components/notWorksItem';
/* eslint-disable */
class ListNotWorks extends React.Component {
    render() {
      return (
      <Container>
        <MenuUser/>
        <Row>
          <h1> Список неявок!!!</h1>
        </Row>
        <Row>
          <NotWorkItem/>
        </Row>
      </Container>)
    }
  }

  export default ListNotWorks;