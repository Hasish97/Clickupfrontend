import Axios from 'axios';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { async } from 'q';
import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import * as $ from 'jquery';
import Chart from 'react-apexcharts';
import feesCollectionWidget from '../Charts/fees-collection-widget';
import UcFirst from '../../../../App/components/UcFirst';
type ChartProps = React.ComponentProps<typeof Chart>;

type Props = {};
const token = localStorage.getItem('jwtToken');

function DashBoard({}: Props) {
    const [employeeWorkHoursCount, setEmployeeWorkHoursCount] = useState([]);
    const [employeetableYearMonth, setEmployeetableYearMonth] = useState('');
    const [barChartcategories, setBarChartcategories] = useState([]);
    const [barChartData, setBarChartData] = useState([]);
    const [fullCount, setFullCount] = useState(0);
    const [activeUsers, setActiveUsers] = useState(0);
    const [partiallyActiveUsers, setPartiallyActiveUsers] = useState(0);
    const [inactiveUsers, setInactiveUsers] = useState(0);

    const getEmployeeWorkHoursCount = async () => {
        const data = await Axios.post(
            'http://192.168.1.36:8080/api/employee/employee_workhours_count',
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        setEmployeetableYearMonth(data.data.result[0].year + '-' + data.data.result[0].month_name);
        setEmployeeWorkHoursCount(data.data.result[0].employeeWorkHoursCount);
        return data.data.result[0].employeeWorkHoursCount;
    };

    async function atable() {
        const employdata = await getEmployeeWorkHoursCount();
        let datatable_employees = '#data-table-fixed-Column';
        // @ts-ignore
        $(datatable_employees).DataTable().destroy();
        // @ts-ignore
        $(datatable_employees).DataTable({
            data: employdata,
            order: [[0, 'asc']],
            columns: [
                {
                    data: 'imp_id',
                    render: function (data: any, type: any, row: any) {
                        return data;
                    }
                },
                {
                    data: 'imp_name',
                    render: function (data: any, type: any, row: any) {
                        return data;
                    }
                },
                {
                    data: 'hours_count',
                    render: function (data: any, type: any, row: any) {
                        return data;
                    }
                }
            ],
            colReorder: true,
            scrollY: '500px',
            scrollX: true,
            scrollCollapse: true,
            paging: false,
            fixedColumns: {
                leftColumns: 1,
                rightColumns: 1
            }
        });
    }

    const chartData: ChartProps = {
        //     series: [
        //         {
        //             name: 'Working Hours',
        //             data: barChartData
        //         }
        //     ],
        //     options: {

        //         chart: {
        //             height: 350,
        //             type: 'bar'
        //         },
        //         plotOptions: {
        //             bar: {
        //                 borderRadius: 10,
        //                 columnWidth: '35%'
        //             }
        //         },
        //         dataLabels: {
        //             enabled: false
        //         },
        //         stroke: {
        //             width: 2
        //         },

        //         grid: {
        //             row: {
        //                 colors: ['#fff', '#f2f2f2']
        //             }
        //         },
        //         xaxis: {
        //             labels: {
        //                 rotate: -45
        //             },
        //             categories: barChartcategories,
        //             tickPlacement: 'on'
        //         },
        //         yaxis: {
        //             title: {
        //                 text: 'Worked Hours'
        //             }
        //         },
        //         fill: {
        //             type: 'gradient',
        //             gradient: {
        //                 shade: 'light',
        //                 type: 'horizontal',
        //                 shadeIntensity: 0.25,
        //                 gradientToColors: undefined,
        //                 inverseColors: true,
        //                 opacityFrom: 0.85,
        //                 opacityTo: 0.85,
        //                 stops: [50, 0, 100]
        //             }
        //         }
        //     }

        height: 700,
        type: 'bar',
        options: {
            chart: {
                toolbar: {
                    show: false
                },
                events: {
                    click: function (chart: any, w: any, e: any) {
                        console.log(chart, w, e);
                    }
                }
            },
            colors: ['#00acf0', '#f83f37', '#ffbf36'],
            plotOptions: {
                bar: {
                    columnWidth: '20%',
                    distributed: true
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                title: {
                    text: 'Month'
                },
                categories: barChartcategories,
                labels: {
                    style: {
                        colors: ['#00acf0', '#f83f37', '#ffbf36'],
                        fontSize: '14px'
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Worked Hours'
                }
            }
        },
        series: [
            {
                name: 'Working Hours',
                data: barChartData
            }
        ]
    };

    const getBarChartData = async () => {
        const data = await Axios.post(
            'http://192.168.1.36:8080/api/employee/employee_workhours_average',
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        await data.data.result.map((e: any) => {
            setBarChartcategories((prevState) => [...prevState, e.month]);
        });

        await data.data.result.map((e: any) => {
            setBarChartData((prevState) => [...prevState, e.average_working_hours]);
        });
    };

    const getEmployeeCountData = async () => {
        let date = new Date();

        const data = await Axios.post(
            'http://192.168.1.36:8080/api/employee/view_employee_status',
            { date: date.toLocaleDateString('en-GB').toString() },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log(data.data.result[0]);
        const { full_count, active_users, partially_active_users, inactive_users } = data.data.result[0];
        setFullCount(full_count);
        setActiveUsers(active_users);
        setPartiallyActiveUsers(partially_active_users);
        setInactiveUsers(inactive_users);
    };

    useEffect(() => {
        atable();
        getBarChartData();
        getEmployeeCountData();
    }, []);

    return (
        <Card>
            <Card.Header>
                <Card.Title as={'h5'}>Home</Card.Title>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Header>
                                        <Card.Title as={'h5'}>Employee Details</Card.Title>
                                        <Card.Subtitle style={{ marginTop: '3px' }} as={'h6'}>
                                            {employeetableYearMonth}
                                        </Card.Subtitle>
                                    </Card.Header>
                                    <Card.Body>
                                        <div>
                                            <Table striped hover responsive className="table table-condensed" id="data-table-fixed-Column">
                                                <thead>
                                                    <tr>
                                                        <th>Employee ID</th>
                                                        <th>Employee Name</th>
                                                        <th>Worked Hours</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>Employee ID</th>
                                                        <th>Employee Name</th>
                                                        <th>Worked Hours</th>
                                                    </tr>
                                                </tfoot>
                                            </Table>

                                            {/* table-active
                                                        table-success
                                                        table-warning
                                                        table-danger
                                                        table-info
                                                        table-primary */}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Header>
                                        <Card.Title as={'h5'}>Employee Counts</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row>
                                            <Col xl={6} md={6}>
                                                <Card bg={'success'} text={'white'}>
                                                    <Card.Body>
                                                        <Card.Title as="h5" className={'white'}>
                                                            <UcFirst text={'No. of Employees'} />
                                                        </Card.Title>
                                                        <Card.Text style={{textAlign:"center",fontSize:"35px"}}>
                                                            {fullCount}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                            <Col>
                                                <Row>
                                                    <Col xl={12} md={12}>
                                                        <Card bg={'info'} text={'white'}>
                                                            <Card.Body>
                                                                <Card.Title as="h5" className={'white'}>
                                                                    <UcFirst text={'Fully Updated Users'} />
                                                                </Card.Title>
                                                                <Card.Text style={{textAlign:"center",fontSize:"35px"}}>
                                                                   {activeUsers}
                                                                </Card.Text>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12} md={12}>
                                                        <Card bg={'warning'} text={'white'}>
                                                            <Card.Body>
                                                                <Card.Title as="h5" className={'white'}>
                                                                    <UcFirst text={'Partially Updated Users'} />
                                                                </Card.Title>
                                                                <Card.Text style={{textAlign:"center",fontSize:"35px"}}>
                                                                    {partiallyActiveUsers}
                                                                </Card.Text>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xl={12} md={12}>
                                                        <Card bg={'danger'} text={'white'}>
                                                            <Card.Body>
                                                                <Card.Title as="h5" className={'white'}>
                                                                    <UcFirst text={'Inactive Users'} />
                                                                </Card.Title>
                                                                <Card.Text style={{textAlign:"center",fontSize:"35px"}}>
                                                                    {inactiveUsers}
                                                                </Card.Text>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <Card>
                                    <Card.Header>
                                        <Card.Title as={'h5'}>Total Worked Days</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <div style={{ height: '715px' }}>
                                            <Chart {...chartData} type="bar" height={700} />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Card>
                                <Card.Header>
                                    <Card.Title as={'h5'}>Row4</Card.Title>
                                </Card.Header>
                                <Card.Body></Card.Body>
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default DashBoard;
