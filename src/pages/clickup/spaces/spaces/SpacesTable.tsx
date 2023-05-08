import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Axios from 'axios';

type Props = {};
const token = localStorage.getItem('jwtToken');

const ITEMS_PER_PAGE = 30;

function SpacesTable({}: Props) {
    const [fromDateProjects, setFromDateProjects] = useState(new Date());
    const [toDateProjects, setToDateProjects] = useState(new Date());
    const [activePage, setActivePage] = useState(1);
    const [projectData, setProjectData] = useState([]);
    const [alertValuePercentageProjectCheckpoint, setAlertValuePercentageProjectCheckpoint] = useState(100);
    const [alertValuePercentageFinancialCheckpoint, setAlertValuePercentageFinancialCheckpoint] = useState(100);

    const handlePageChange = (page: number) => {
        setActivePage(page);
    };

    const totalPages = Math.ceil(projectData.length / ITEMS_PER_PAGE);
    const start = (activePage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const visibleData = projectData.slice(start, end);

    const handleChangeFromDateProjects = (date: Date) => {
        setFromDateProjects(date);
    };
    const handleChangeToDateProjects = (date: Date) => {
        setToDateProjects(date);
    };

    const handleAlertValuePercentageProjectCheckpoint = (e: any) => {
        setAlertValuePercentageProjectCheckpoint(e.target.value);
    };
    const handleAlertValuePercentageFinancialCheckpoint = (e: any) => {
        setAlertValuePercentageFinancialCheckpoint(e.target.value);
    };
    const getinitials = (name: string) => {
        const names = name.split(' ');
        if (names.length >= 2) {
            return names[0]?.charAt(0).toUpperCase() + names[1]?.charAt(0).toUpperCase();
        } else {
            return names[0]?.charAt(0).toUpperCase();
        }
    };

    const getAllProjects = async () => {
        const dateobj = {
            start_date: fromDateProjects.toLocaleDateString('en-GB').toString(),
            end_date: toDateProjects.toLocaleDateString('en-GB').toString()
        };
        const data = await Axios.post('http://192.168.1.36:8080//api/project/get_project_Assginers_summary', dateobj, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (data.data.result.length > 0) {
            const rawData = data.data.result.map((e: any) => ({
                project_id: e.project_id,
                project_name: e.project_name,
                assignees: e.assignees,
                status: e.status,
                worked_hours: e.totalWorks[0].total_work_hours,
                projectCheckpoint: e.checkPointsMstData[0]?.mstTotalEffortSpent * (1 / e.checkPointsMstData[0]?.mstQuotedEffort) * 10000,
                financialCheckpoint: (
                    e.checkPointsMstData[0]?.mstTotalEffortSpent *
                    e.checkPointsMstData[0]?.mstStandardManDayRate *
                    (1 / e.checkPointsMstData[0]?.mstQuatationvalueActualShared) *
                    10000
                ).toFixed(0)
            }));

            setProjectData(rawData);
        }
    };
    useEffect(() => {
        getAllProjects();
    }, [fromDateProjects, toDateProjects]);

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col>
                                    <Card.Title as="h5">All Projects</Card.Title>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Card>
                                                <Card.Header>
                                                    <Card.Title as="h5">From date</Card.Title>
                                                </Card.Header>
                                                <Card.Body>
                                                    <DatePicker
                                                        selected={fromDateProjects}
                                                        onChange={handleChangeFromDateProjects}
                                                        className="form-control"
                                                    />
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col>
                                            <Card>
                                                <Card.Header>
                                                    <Card.Title as="h5">To date</Card.Title>
                                                </Card.Header>
                                                <Card.Body>
                                                    <DatePicker
                                                        selected={toDateProjects}
                                                        onChange={handleChangeToDateProjects}
                                                        className="form-control"
                                                    />
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body style={{ overflowX: 'auto' }}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th style={{ verticalAlign: 'middle' }}>Project</th>
                                        <th style={{ verticalAlign: 'middle', width: '400px' }}>Assignees</th>
                                        <th style={{ verticalAlign: 'middle' }}>Status</th>
                                        <th style={{ verticalAlign: 'middle' }}>Worked Hours</th>
                                        <th>
                                            <Row className="d-flex align-items-center">
                                                <Col>Project Checkpoints</Col>
                                                <Col>
                                                    <Form.Control
                                                        value={alertValuePercentageProjectCheckpoint}
                                                        onChange={handleAlertValuePercentageProjectCheckpoint}
                                                        as="select"
                                                        style={{ width: '100px' }}
                                                    >
                                                        <option value={100}>100%</option>
                                                        <option value={80}>80%</option>
                                                    </Form.Control>{' '}
                                                </Col>
                                            </Row>
                                        </th>
                                        <th>
                                            <Row className="d-flex align-items-center">
                                                <Col>Financial Checkpoints</Col>
                                                <Col>
                                                    <Form.Control
                                                        value={alertValuePercentageFinancialCheckpoint}
                                                        onChange={handleAlertValuePercentageFinancialCheckpoint}
                                                        as="select"
                                                        style={{ width: '100px' }}
                                                    >
                                                        <option value={100}>100%</option>
                                                        <option value={80}>80%</option>
                                                    </Form.Control>{' '}
                                                </Col>
                                            </Row>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {visibleData.map((item) => (
                                        <tr key={item.project_id}>
                                            <td>{item.project_name}</td>
                                            <td style={{ display: 'flex', flexWrap: 'wrap', width: '400px' }}>
                                                {item.assignees.map((e: any) => {
                                                    if (e?.name != null) {
                                                        return (
                                                            <OverlayTrigger
                                                                placement="top"
                                                                overlay={<Tooltip id={`tooltip-top`}>{e?.name}</Tooltip>}
                                                            >
                                                                <div className="task-contain mr-2" style={{ cursor: 'pointer' }}>
                                                                    <h6
                                                                        style={{ width: '40px', height: '40px' }}
                                                                        className={
                                                                            e.id % 4 == 0
                                                                                ? 'badge-light-success d-inline-block text-center p-2 rounded-circle'
                                                                                : e.id % 4 == 1
                                                                                ? 'badge-light-danger d-inline-block text-center p-2 rounded-circle'
                                                                                : e.id % 4 == 2
                                                                                ? 'badge-light-info d-inline-block text-center p-2 rounded-circle'
                                                                                : 'badge-light-warning d-inline-block text-center p-2 rounded-circle'
                                                                        }
                                                                    >
                                                                        {e?.name != null ? getinitials(e?.name) : ''}
                                                                    </h6>
                                                                </div>
                                                            </OverlayTrigger>
                                                        );
                                                    }
                                                })}
                                            </td>
                                            <td>{item.status}</td>
                                            <td>{item.worked_hours}</td>
                                            <td>
                                                <Button
                                                    variant={
                                                        item.projectCheckpoint * (1 / alertValuePercentageProjectCheckpoint) <= 70
                                                            ? 'success'
                                                            : item.projectCheckpoint * (1 / alertValuePercentageProjectCheckpoint) > 70 &&
                                                              item.projectCheckpoint * (1 / alertValuePercentageProjectCheckpoint) <= 90
                                                            ? 'warning'
                                                            : 'danger'
                                                    }
                                                    className="outline-primary w-5"
                                                ></Button>{' '}
                                                {isNaN(item.projectCheckpoint * (1 / alertValuePercentageProjectCheckpoint))
                                                    ? 0
                                                    : !isFinite(item.projectCheckpoint * (1 / alertValuePercentageProjectCheckpoint))
                                                    ? 0
                                                    : (item.projectCheckpoint * (1 / alertValuePercentageProjectCheckpoint)).toFixed(0)}
                                                {'%'}
                                            </td>
                                            <td>
                                                <Button
                                                    variant={
                                                        item.projectCheckpoint * (1 / alertValuePercentageFinancialCheckpoint) <= 70
                                                            ? 'success'
                                                            : item.projectCheckpoint * (1 / alertValuePercentageFinancialCheckpoint) > 70 &&
                                                              item.projectCheckpoint * (1 / alertValuePercentageFinancialCheckpoint) <= 90
                                                            ? 'warning'
                                                            : 'danger'
                                                    }
                                                    className="outline-primary w-5"
                                                ></Button>{' '}
                                                {isNaN(item.financialCheckpoint * (1 / alertValuePercentageFinancialCheckpoint))
                                                    ? 0
                                                    : !isFinite(item.financialCheckpoint * (1 / alertValuePercentageFinancialCheckpoint))
                                                    ? 0
                                                    : (item.financialCheckpoint * (1 / alertValuePercentageFinancialCheckpoint)).toFixed(0)}
                                                {'%'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <Pagination>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Pagination.Item key={page} active={page === activePage} onClick={() => handlePageChange(page)}>
                                        {page}
                                    </Pagination.Item>
                                ))}
                            </Pagination>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default SpacesTable;
