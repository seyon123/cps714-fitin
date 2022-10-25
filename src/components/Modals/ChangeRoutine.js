import React, {useState} from 'react'
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Modal } from "react-bootstrap";
import "./ChangeRoutine.css";

function ChangeRoutine({show,onHide,setModalShow}){
    /*dummy data*/
    const dummyRoutines = [
      { id: 1, name: "Push Day", exercises: "4" },
      { id: 2, name: "Pull Day", exercises: "5" }
    ];
    return( 
      <Modal className='create-routine' show={show} onHide={onHide} setModalShow={setModalShow} centered>
      
      <Modal.Header closeButton closeVariant='white'>
        <Modal.Title>Change today's routine</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>jkllkjljkljlkjkljlkjlj</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>
    );
};

export default ChangeRoutine;