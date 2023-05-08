import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Axios from 'axios';
import { Document, Page, View, Text, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const token = localStorage.getItem('jwtToken');

const ITEMS_PER_PAGE = 30;

type Props = {
    projects: ProjectData[];
};

export interface ProjectData {
    status: string;
    WorkedHours: string;
    assignee: string;
    id: string;
    name: string;
    description: string;
}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 20
    },
    section: {
        flexGrow: 1
    },
    title: {
        fontSize: 20,
        marginBottom: 20
    },
    table: {
        display: 'flex',
        width: 'auto',
        marginBottom: 30
    },
    tableRow: {
        flexDirection: 'row',
        backgroundColor: '#f2f2f2'
    },
    tableCellHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderStyle: 'solid',
        padding: 10,
        fontWeight: 'bold',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tableCell: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderStyle: 'solid',
        padding: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

function Project() {
    const [fromDateProjects, setFromDateProjects] = useState(new Date());
    const [toDateProjects, setToDateProjects] = useState(new Date());
    const [activePage, setActivePage] = useState(1);
    const [projectData, setProjectData] = useState([]);
    const [projects, setProjects] = useState([]);
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
        const data = await Axios.post('http://192.168.1.36:8080//api/project/get_project_Assginers_summary', dateobj);
        if (data.data.result.length > 0) {
            const rawData = data.data.result.map((e: any) => ({
                project_id: e.project_id,
                project_name: e.project_name,
                assignees: e.assignees,
                status: e.status,
                worked_hours: e.totalWorks[0].total_work_hours
            }));

            setProjectData(rawData);
        }
    };

    // Pdf
    const formatAssignees = (assignees: any) => {
        return assignees.join(', ');
    };

    const getAllProjectsPdf = async () => {
        const date = {
            start_date: fromDateProjects.toLocaleDateString('en-GB').toString(),
            end_date: toDateProjects.toLocaleDateString('en-GB').toString()
        };
        const data = await Axios.post('http://192.168.1.36:8080//api/project/get_project_Assginers_summary', date);
        const projects_data = data.data.result.map((obj: any) => ({
            id: obj.project_id,
            name: obj.project_name,
            assignee: formatAssignees(obj.assignees.map((object: any) => object.name)),
            status: obj.status,
            WorkedHours: obj.totalWorks[0].total_work_hours
        }));
        setProjects(projects_data);
    };

    const Pdf = ({ projects }: Props) => {
        return (
            <Document>
                <Page size="B1" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={styles.title}>Projects</Text>
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <View style={styles.tableCellHeader}>
                                    <Text>Id</Text>
                                </View>
                                <View style={styles.tableCellHeader}>
                                    <Text>Name</Text>
                                </View>
                                <View style={styles.tableCellHeader}>
                                    <Text>Status</Text>
                                </View>
                                <View style={styles.tableCellHeader}>
                                    <Text>Worked Hours</Text>
                                </View>
                                <View style={styles.tableCellHeader}>
                                    <Text>Assignee</Text>
                                </View>
                            </View>
                            {projects.map((project) => (
                                <View style={styles.tableRow} key={project.id}>
                                    <View style={styles.tableCell}>
                                        <Text>{project.id}</Text>
                                    </View>
                                    <View style={styles.tableCell}>
                                        <Text>{project.name}</Text>
                                    </View>
                                    <View style={styles.tableCell}>
                                        <Text>{project.status}</Text>
                                    </View>
                                    <View style={styles.tableCell}>
                                        <Text>{project.WorkedHours}</Text>
                                    </View>
                                    <View style={styles.tableCell}>
                                        <Text>{project.assignee}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </Page>
            </Document>
        );
    };

    async function atable() {
        getAllProjectsPdf();
        let projectTable = '#projectTable';
        // @ts-ignore
        $(projectTable).DataTable().destroy();
        // @ts-ignore
        $(projectTable).DataTable.Setting({
            data: projects,
            order: [[0, 'asc']],
            columns: [
                {
                    data: 'id',
                    render: function (data: any, type: any, row: any) {
                        return data;
                    }
                },
                {
                    data: 'name',
                    render: function (data: any, type: any, row: any) {
                        return data;
                    }
                },

                {
                    data: 'status',
                    render: function (data: any, type: any, row: any) {
                        return data;
                    }
                },
                {
                    data: 'WorkedHours',
                    render: function (data: any, type: any, row: any) {
                        return data;
                    }
                },
                {
                    data: 'assignee',
                    render: function (data: any, type: any, row: any) {
                        return data;
                    },
                    styles: { display: 'flex', flexWrap: 'wrap', width: '400px' }
                }
            ],
            colReorder: true
        });
    }

    useEffect(() => {
        atable();
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
                                    <Card.Title as="h5">Projects</Card.Title>
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
                                        <th style={{ verticalAlign: 'middle', width: '300px', overflowX: 'auto' }}>Project</th>
                                        <th style={{ verticalAlign: 'middle', width: '400px', overflowX: 'auto' }}>Assignees</th>
                                        <th style={{ verticalAlign: 'middle' }}>Status</th>
                                        <th style={{ verticalAlign: 'middle' }}>Worked Hours</th>
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
                    <Button className="w-25 ml-2 mb-2">
                        <PDFDownloadLink
                            className="text-dark font-weight-bold"
                            document={<Pdf projects={projects} />}
                            fileName="project report.pdf"
                        >
                            {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : 'Download PDF')}
                        </PDFDownloadLink>
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default Project;
