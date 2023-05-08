import Axios from 'axios';
import * as React from 'react';
import { Row, Col, Card, Tabs, Tab, Nav, Button, Form } from 'react-bootstrap';
import { Dropdown, DropdownButton } from 'react-bootstrap';

import Breadcrumb from '../../App/components/Breadcrumb';
import UcFirst from '../../App/components/UcFirst';
import Target from '../../pages/clickup/spaces/target/Target';
import NavSearch from '../NavBar/NavLeft/NavSearch';
import PageFilter from '../PageFilter/PageFilter';
import FilterWorkSummary from '../../pages/clickup/employees/employeedata/FilterWorkSummary'
import FilterEmployeeWorkHours from '../../pages/clickup/employees/employeedata/FilterEmployeeWorkHours'

class TabBar extends React.Component<{}, {}> {
    state = {
        project: {
            project_Id: '',
            name: ''
        }
    };

    async getProjectdetails() {
        let projectidsplit = window.location.href.toString().split('/');
        let projectid = projectidsplit[projectidsplit.length - 1];
        projectid = projectid.split('#')[0];

        const data = await Axios.get('http://192.168.1.36:8080//api/get_all_projects');
        const allProjects = data.data.result;
        const project = allProjects.find((obj: any) => obj.project_Id == projectid);
        this.setState({ project: project });
    }

    componentDidMount(): void {
        this.getProjectdetails();
    }

    render() {
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
                                <Card.Title as="h5">{this.state.project.name}</Card.Title>
                            </Card.Header>
                            <Card.Body className="my-3">
                                <Row>
                                    <Col xs={10}>
                                        <Tabs defaultActiveKey="home" className="mb-3">
                                            <Tab eventKey="project" title="Project">
                                                <div>
                                                    <FilterWorkSummary/>
                                                    <FilterEmployeeWorkHours/>
                                                </div>
                                            </Tab>
                                            <Tab eventKey="list" title="List">
                                                <div>
                                                    <PageFilter />
                                                </div>
                                                <div>List</div>
                                            </Tab>
                                            <Tab eventKey="board" title="Board">
                                                <div>
                                                    <PageFilter />
                                                </div>
                                                <div>Board</div>
                                            </Tab>
                                            <Tab eventKey="team" title="Team">
                                                <div>
                                                    <PageFilter />
                                                </div>
                                                <div>Team</div>
                                            </Tab>
                                            <Tab eventKey="calendar" title="Calendar">
                                                <div>
                                                    <PageFilter />
                                                </div>
                                                <div>Calendar</div>
                                            </Tab>
                                            <Tab  eventKey="targets" title="Targets">
                                                {/* <div>
                                                    <PageFilter />
                                                </div> */}
                                                <div style={{ marginBottom:"3rem" }}>
                                                    <Target />
                                                </div>
                                            </Tab>
                                            <Tab eventKey="view" title="View">
                                                <div>
                                                    <PageFilter />
                                                </div>
                                                <div>View</div>
                                            </Tab>
                                        </Tabs>
                                    </Col>
                                    <Col xs={2}>
                                        <Row>
                                            <Col xs={8}>
                                                <DropdownButton
                                                    title={'Automate'}
                                                    variant={'secondary'}
                                                    id={`dropdown-variants-secondary`}
                                                    key={'secondary'}
                                                >
                                                    <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                                                    <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                                                    <Dropdown.Item eventKey="3">Something else hear</Dropdown.Item>
                                                </DropdownButton>
                                            </Col>
                                            <Col xs={4}>
                                                <Button variant={'outline-info'}>
                                                    <UcFirst text={'Share'} />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </>
        );
    }
}
export default TabBar;
