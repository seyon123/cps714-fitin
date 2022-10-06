import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack'
import './LandingPage.css';

function LandingPage() {
  return (
    <Container fluid className="landing-page">
        <Row>
            <Col sm={6}>
                <img class="landing-image" alt="FitIn cover" src={"./landing-page.png"}/>
            </Col>
            <Col sm={6}>
                <Stack gap={2} className='landing-right'>
                    <h1 className='landing-header'>Welcome to <span style={{ color: '#3483EB' }}>FitIn</span></h1>
                    
                    <Button variant="light" size="lg" className='col-md-4 rounded-pill' style={{ marginTop: '7.5%' }}><b>Sign in with Google</b></Button>{' '}
                    <Button variant="light" size="lg" className='col-md-4 rounded-pill'><b>Sign in with Email</b></Button>{' '}
                    
                    <h2 className='sign-up-text'>Don't have an account?</h2>
                    <Button variant="primary" size="lg" className='col-md-4 rounded-pill'><b>Register</b></Button>{' '}
                </Stack>
            </Col>
        </Row>
    </Container>
  )
}

export default LandingPage