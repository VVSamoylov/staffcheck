import React from 'react';
import {Row, Container} from 'react-bootstrap';
import {MenuUser} from '../../../components/MenuUser';
import {JobItem} from '../../../components/jobItem';
/* eslint-disable */
class ListDepartament extends React.Component {
    render() {
      return (
      <Container>
        <MenuUser/>
        <Row>
          <h1> Список должностей!!!</h1>
        </Row>
        <Row>
          <JobItem/>
        </Row>
      </Container>)
    }
  }

  export default ListDepartament;