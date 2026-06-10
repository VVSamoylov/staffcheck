import React from 'react';
import {Row, Col,  Container } from 'react-bootstrap';
import {MenuUser} from '../../components/MenuUser';
/* eslint-disable */
// страница не найдена
export const NotFound = ()=> {

    return(
        <Container>
            <Row>
                <MenuUser/>
            </Row>
            <Row>
                <Col></Col><Col> <h1>Страница не найдена!!</h1></Col><Col></Col>
            </Row>
        </Container>
    )
}