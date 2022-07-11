import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import PenjualNavbar from '../Navbar/PenjualNavbar'

const Penjual = ({children}) => {
  return (
    <>
      <PenjualNavbar />
      <Container>
        <Row className="justify-content-center my-5">
          <Col lg={9}>{children}</Col>
        </Row>
      </Container>
    </>
  )
}

export default Penjual