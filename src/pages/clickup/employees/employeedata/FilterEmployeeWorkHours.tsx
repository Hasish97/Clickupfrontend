import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import * as $ from 'jquery';
import DatePicker from 'react-datepicker';
import Axios from 'axios';

// "username":"madhuni.tharukshi@inovaitsys.com",
//     "password":"(Udemy)@?!M"

const token = localStorage.getItem('jwtToken');
type Props = {};

type EmployeeData = {
    id: number;
    name: string;
    role: string;
    workedHours: number;
  };
  

const Employees = (props: Props) => {
    const [fromDateEmployee, setFromDateEmployee] = useState(new Date());
    const [toDateEmployee, setToDateEmployee] = useState(new Date());
    const [allEmployees, setAllEmployees] = useState<EmployeeData[]>([]);

    const handleChangeFromDateEmployee = (date: Date) => {
        setFromDateEmployee(date);
    };
    const handleChangeToDateEmployee = (date: Date) => {
        setToDateEmployee(date);
    };

    const getAllEmployees = async () => {
        const date = {
            start_date: fromDateEmployee.toLocaleDateString('en-GB').toString(),
            end_date: toDateEmployee.toLocaleDateString('en-GB').toString()
        };
        const headers = {
            Authorization: `Bearer ${token}` 
        };
        const data = await Axios.post('http://192.168.1.36:8080/api/employee/get_work_for_project/90070002398', date, { headers });
        const employees = data.data.result.map((obj: any) => ({
            id: obj.emp_id,
            name: obj.name,
            workedHours: obj.totalWorks[0].total_work_hours,
            role: obj.position
        }));
        setAllEmployees(employees);
    };

    async function atable() {
        getAllEmployees();
        let datatable_employees = '#datatable_employees';
        // @ts-ignore
        $(datatable_employees).DataTable().destroy();
        // @ts-ignore
        $(datatable_employees).DataTable({
            data: allEmployees,
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
                    data: 'role',
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
    }, [toDateEmployee, fromDateEmployee]);
    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <h5 className='ml-3 mt-3'>Employees</h5>
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
                                                        selected={fromDateEmployee}
                                                        onChange={handleChangeFromDateEmployee}
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
                                                        selected={toDateEmployee}
                                                        onChange={handleChangeToDateEmployee}
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
                            <Table striped hover responsive bordered className="table table-condensed" id="datatable_employees">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Worked Hours</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Role</th>
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

export default Employees;
