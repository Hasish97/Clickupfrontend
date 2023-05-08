import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import * as $ from 'jquery';
import DatePicker from 'react-datepicker';
import Axios from 'axios';

const token = localStorage.getItem('jwtToken');
type Props = {};

type TaskData = {
    name: string;
    status: string;
    workedHours: number;
  };
  

const Tasks = (props: Props) => {
    const [fromDateTasks, setFromDateTasks] = useState(new Date());
    const [toDateTasks, setToDateTasks] = useState(new Date());
    const [allTasks, setAllTasks] = useState<TaskData[]>([]);

    const handleChangeFromDateTasks = (date: Date) => {
        setFromDateTasks(date);
    };
    const handleChangeToDateTasks = (date: Date) => {
        setToDateTasks(date);
    };

    const getAllTasks = async () => {
        const date = {
            start_date: fromDateTasks.toLocaleDateString('en-GB').toString(),
            end_date: toDateTasks.toLocaleDateString('en-GB').toString()
        };
        const headers = {
            Authorization: `Bearer ${token}` 
        };
        const data = await Axios.post('http://192.168.1.36:8080/api/project/55004406/get_project_summary', date,  { headers });
        const tasks = data.data.result.map((obj: any) => ({
            name: obj.task_name,
            status: obj.status,
            workedHours: obj.working_hours
        }));
        setAllTasks(tasks);
    };

    async function atable() {
        getAllTasks();
        let datatable_project = '#datatable_project';
        // @ts-ignore
        $(datatable_project).DataTable().destroy();
        // @ts-ignore
        $(datatable_project).DataTable({
            data: allTasks,
            order: [[0, 'asc']],
            columns: [
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
                    data: 'workedHours',
                    render: function (data: any, type: any, row: any) {
                        return data;
                    }
                }
            ],
            colReorder: true
        });
    }

    useEffect(() => {
        atable();
    }, [toDateTasks, fromDateTasks]);
    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <h5 className='ml-3 mt-3'>Tasks</h5>
                        <Card.Header>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Card>
                                                <Card.Header>
                                                    <Card.Title as="h5">From date</Card.Title>
                                                </Card.Header>
                                                <Card.Body>
                                                    <DatePicker
                                                        selected={fromDateTasks}
                                                        onChange={handleChangeFromDateTasks}
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
                                                        selected={toDateTasks}
                                                        onChange={handleChangeToDateTasks}
                                                        className="form-control"
                                                    />
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Table striped hover responsive bordered className="table table-condensed" id="datatable_project">
                                <thead>
                                    <tr>
                                        <th>Task Name</th>
                                        <th>Status</th>
                                        <th>Worked Hours</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Task Name</th>
                                        <th>Status</th>
                                        <th>Worked Hours</th>
                                    </tr>
                                </tfoot>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Tasks;
