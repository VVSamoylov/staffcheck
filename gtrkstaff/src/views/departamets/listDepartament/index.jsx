import React from 'react';
import {Row, Container} from 'react-bootstrap';
import {MenuUser} from '../../../components/MenuUser';
import {DepartamentItem} from '../../../components/departamentItem';
/* eslint-disable */
class ListDepartament extends React.Component {
    render() {
      return (
      <Container>
        <MenuUser/>
        <Row>
          <h1> Список отделов!!!</h1>
        </Row>
        <Row>
          <DepartamentItem/>
        </Row>
      </Container>)
    }
  }

  export default ListDepartament;