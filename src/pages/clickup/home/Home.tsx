import React from 'react'
import { Col, Row } from 'react-bootstrap'
import NavBar from '../../../clickupcomponents/NavBar'
import Navigation from '../../../clickupcomponents/Navigation'
import DashBoard from './Dashboard/DashBoard'


type Props = {}

const Home = (props: Props) => {
  return (
    <>
                <NavBar />
                <Row className="mt-5 pt-5">
                    <Col xs={2}>
                        <Navigation></Navigation>
                    </Col>
                    <Col xs={10}>
                        <DashBoard/>
                    </Col>
                </Row>
            </>
  )
}

export default Home