import React from 'react'
import { Col, Row } from 'react-bootstrap'
import NavBar from '../../../clickupcomponents/NavBar'
import Navigation from '../../../clickupcomponents/Navigation'
import EmployeeData from './employeedata/EmployeeData'

type Props = {}

const Employees = (props: Props) => {
  return (
    <>
                <NavBar />
                <Row className="mt-5 pt-5">
                    <Col xs={2}>
                        <Navigation></Navigation>
                    </Col>
                    <Col xs={10}>
                        <EmployeeData/>
                    </Col>
                </Row>
            </>
  )
}

export default Employees