import React from 'react';
import {Row, Container} from 'react-bootstrap';
import {MenuUser} from '../../../components/MenuUser';
import {WorksheduleItem} from '../../../components/workscheduleItem';
/* eslint-disable */
class ListShedules extends React.Component {
    render() {
      return (
      <Container>
        <MenuUser/>
        <Row>
          <h1> Графики работы!</h1>
        </Row>
        
          <WorksheduleItem/>
        
      </Container>)
    }
  }

  export default ListShedules;