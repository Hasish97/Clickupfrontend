import React from 'react';
import { Card, Col, Row, Tab, Tabs } from 'react-bootstrap';
import Breadcrumb from '../../../../App/components/Breadcrumb';
import Employees from '../employees/Employees';
import Project from '../projects/Project';


type Props = {};



export default function TabBar({}: Props) {
    return (
        <>
            <Row className="align-items-center page-header">
                <Col>
                    <Breadcrumb />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Reports</Card.Title>
                        </Card.Header>
                        <Card.Body className="my-3">
                            <Row>
                                <Col>
                                    <Tabs defaultActiveKey="home" className="mb-3">
                                        <Tab eventKey="employees" title="Employees">
                                            <Employees/>
                                        </Tab>
                                        <Tab eventKey="project" title="Project">
                                            {/* <Projects projects={[]}/> */}
                                            <Project/>
                                        </Tab>
                                    </Tabs>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
