import React from 'react';
import {Row, Container} from 'react-bootstrap';
import {MenuUser} from '../../components/MenuUser';
import {EmployeeItem} from '../../components/employeeItem';
/* eslint-disable */
class ListEmployee extends React.Component {
    render() {
      return (
      <Container>
        <MenuUser/>
        <Row>
          <h1> Список сотрудников!!!</h1>
        </Row>
        <Row>
          <EmployeeItem/>
        </Row>
      </Container>)
    }
  }

  export default ListEmployee;