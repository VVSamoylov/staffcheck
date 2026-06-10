import React from "react";
import { Modal, Button } from "react-bootstrap";

export const AlertData = ({show, message, closeAlert}) =>{
    return(
        <Modal show={show}>
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Информация</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{message} </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>closeAlert(false)}>Понятно</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>

    );
} 