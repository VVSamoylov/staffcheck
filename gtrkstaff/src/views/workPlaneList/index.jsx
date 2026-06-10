import React from 'react';
import {Row, Container} from 'react-bootstrap';
import {MenuUser} from '../../components/MenuUser';
import {WorkPlaneItem} from '../../components/workplaneItem';
/* eslint-disable */
class ListPlaneTV extends React.Component {
    render() {
      return (
      <Container>
        <MenuUser/>
        <Row>
          <h1> Планы съемок TV!</h1>
        </Row>
        
          <WorkPlaneItem/>
        
      </Container>)
    }
  }

  export default ListPlaneTV;