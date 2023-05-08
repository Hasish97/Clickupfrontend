import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import * as $ from 'jquery';
import DatePicker from 'react-datepicker';
import Axios from 'axios';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

type Props = {};


const styles = StyleSheet.create({
    page: {
        padding: 50,
      },
      heading: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
      },
      employeeRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        paddingBottom: 5,
        marginBottom: 5,
      },
      employeeName: {
        fontWeight: 'bold',
      },
      employeeRole: {
        fontStyle: 'italic',
      },
      container: {
        backgroundColor: '#f5f5f5',
        padding: 20,
        marginVertical: 20,
      },
      section: {
        marginBottom: 30,
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      text: {
        fontSize: 14,
        marginBottom: 10,
      },
});

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
        const data = await Axios.post('http://192.168.1.36:8080//api/employee/view_employee_summary', date);
        const employees = data.data.result.map((obj: any) => ({
            id: obj.emp_id,
            name: obj.name,
            workedHours: obj.totalWorks[0].total_work_hours,
            role: obj.position
        }));
        setAllEmployees(employees);
    };

    const PDF = ({ employees }: { employees: EmployeeData[] }) => {
        return (
            <Document>
                <Page size="A4" style={styles.page}>
                <View>
                    <Text style={styles.heading}>Employee Report</Text>
                    <Text>From: {fromDateEmployee.toLocaleDateString()}</Text>
                    <Text>To: {toDateEmployee.toLocaleDateString()}</Text>
                </View>
                <View style={styles.employeeRow}>
                    <Text style={[styles.employeeName, { width: '30%' }]}>Name</Text>
                    <Text style={[styles.employeeRole, { width: '30%' }]}>Role</Text>
                    <Text style={{ width: '40%' }}>Worked Hours</Text>
                </View>
                {allEmployees.map((employee) => (
                    <View key={employee.id} style={styles.employeeRow}>
                    <Text style={[styles.employeeName, { width: '30%' }]}>{employee.name}</Text>
                    <Text style={[styles.employeeRole, { width: '30%' }]}>{employee.role}</Text>
                    <Text style={{ width: '40%' }}>{employee.workedHours}</Text>
                    </View>
                ))}
                </Page>
            </Document>
        );
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
                        <Card.Header>
                            <Row>
                                <Col>
                                    <Card.Title as="h5">Employees</Card.Title>
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
                        {/* <Button onClick={getAllEmployees}>Download PDF</Button>
                        {allEmployees.length > 0 && <PDF employees={allEmployees} />} */}
                        <Button className='w-25 ml-2 mb-2'>
                        <PDFDownloadLink className='text-dark font-weight-bold' document={<PDF employees={allEmployees} />} fileName="report.pdf">
                            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download PDF')}
                        </PDFDownloadLink>
                        </Button>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Employees;
