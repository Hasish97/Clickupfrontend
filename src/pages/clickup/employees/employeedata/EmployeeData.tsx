import React, { FormEventHandler, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Dropdown, Form, FormControl, InputGroup, Modal, ProgressBar, Row, Tab, Tabs } from 'react-bootstrap';
import { People } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import UcFirst from '../../../../App/components/UcFirst';
import { Table, Collapse } from 'react-bootstrap';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const token = localStorage.getItem('jwtToken');
type Props = {};

interface Employee {
    emp_id: number;
    emp_name: string;
}

const EmployeeData = (props: Props) => {

    // employee filter 
    const [inputHour, setInputHour] = useState<string>('')
    const [inputSymbol, setInputSymbol] = useState<string>('')
    const [isOpen, setIsOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);

    // Filter 
    const [fromDateEmployee, setFromDateEmployee] = useState(new Date());
    const [toDateEmployee, setToDateEmployee] = useState(new Date());
    const [columnDates, setColumnDates] = useState([]);
    const [employeeData, setEmployeeData] = useState([]);

    const [combine_ids, setcombine_ids] = useState(1);

    const [combine_ids_with_AND, setcombine_ids_with_AND] = useState(1);

    const [allMember_ids, setAllMember_ids] = useState<Employee[]>([]);
    const [checkedNames, setCheckedNames] = useState<number[]>([]); 
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [member_ids, setmember_ids] = useState([]);

    const [combine_estimate, setcombine_estimate] = useState(0);
    const [estimate_time, setestimate_time] = useState(0);
    const [greater_than, setgreater_than] = useState(0);

    const [EmployeetaskData, setEmployeeTaskData] = useState([]);

    const [isVertically, setisVertically] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const numberOfAssignees = member_ids.length.toString()
    
    console.log("witch case values"+ combine_ids_with_AND + "/" +combine_estimate)

    const ToggleModal = () => {
        setShowModal(!showModal);
    };


    const handleChangeFromDateEmployee = (date: Date) => {
        setFromDateEmployee(date);

    };
    const handleChangeToDateEmployee = (date: Date) => {
        setToDateEmployee(date);
    };

    const [activeRow, setActiveRow] = useState(null);
    const handleRowClick = (rowId: number) => {
        if (activeRow === rowId) {
            setActiveRow(null);
        } else {
            setActiveRow(rowId);
        }
    };

    // Get all employees names and ids
    const getAllEmployeeNameId = async () => {
        const date = {
            start_date: fromDateEmployee.toLocaleDateString('en-GB').toString(),
            end_date: toDateEmployee.toLocaleDateString('en-GB').toString()
        };
        const data = await Axios.post('http://192.168.1.36:8080//api/employee/view_employee_summary', date);
        const employees = data.data.result.map((obj: any) => ({
            emp_id: obj.emp_id,
            emp_name: obj.name,
        }));
        setAllMember_ids(employees)
    }

    // Gets all the ids of the employees
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.options)
          .filter((option) => option.selected)
          .map((option) => Number(option.value));
        setCheckedNames(selectedOptions);
        
        if (member_ids.includes(selectedOptions)) {
            // If empId already exists, remove it from memberIds array
            setmember_ids(member_ids.filter(id => id !== selectedOptions));
        } else {
            // If empId doesn't exist, add it to memberIds array
            setmember_ids([...member_ids, selectedOptions]);
        }

        getEmployeeData(selectedOptions);
    };

    // Handles the Search input function
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    };

    // Gets the searched employee
    const filteredEmployees = allMember_ids.filter((employee) =>
    employee.emp_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getEmployeeData = async (selectedMemberIds: number[]) => {
        const dates = [];
        const body = {
            start_date: fromDateEmployee.toLocaleDateString('en-GB').toString(),
            end_date: toDateEmployee.toLocaleDateString('en-GB').toString(),
            combine_ids: combine_ids,
            combine_ids_with_AND: combine_ids_with_AND,
            member_ids: selectedMemberIds,
            combine_estimate: combine_estimate,
            estimate_time: estimate_time,
            greater_than: greater_than
        };
        const data = await Axios.post('http://192.168.1.36:8080/api/employee/get_employee_work_summary', body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setEmployeeData(data.data.result);

        const fromDate = new Date(fromDateEmployee.toString());
        const toDate = new Date(toDateEmployee.toString());

        for (let date = fromDate; date <= toDate; date.setDate(date.getDate() + 1)) {
            dates.push(new Date(date));
        }

        const dateString = dates.map((e) => e.toDateString());
        setColumnDates(dateString);
    };

    const getTask = async (emp_id: number) => {
        setisVertically(true);
        const body = {
            start_date: fromDateEmployee.toLocaleDateString('en-GB').toString(),
            end_date: toDateEmployee.toLocaleDateString('en-GB').toString()
        };
        const data = await Axios.post('http://192.168.1.36:8080/api/employee/get_employee_task_details/' + emp_id, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setEmployeeTaskData(data.data.result);
        console.log(EmployeetaskData);
    };

    const getPercentage = (time_hours: string) => {
        const time2 = '8:0:0';
        const [hours1, minutes1, seconds1] = time_hours.split(':').map(Number);
        const [hours2, minutes2, seconds2] = time2.split(':').map(Number);
        const totalSeconds1 = hours1 * 60 * 60 + minutes1 * 60 + seconds1;
        const totalSeconds2 = hours2 * 60 * 60 + minutes2 * 60 + seconds2;

        const percentage = (totalSeconds1 / totalSeconds2) * 100;

        return +percentage.toFixed(2);
    };

    const getinitials = (name: string) => {
        const names = name.split(' ');
        return names[0].charAt(0) + names[1].charAt(0);
    };

    // getting the hour input from the filter
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setestimate_time(value)
        setInputHour(e.target.value)
    };

    // handeling the value of the greater or less than function and setting it to display the symbol
    const handleMoreOrLessOption = (value: number) => {
        setgreater_than(value)

        if (greater_than === 1){
            setInputSymbol(">")
        }else if (greater_than === 0){
            setInputSymbol("<")
        }
    }

    const handleCollaspeClick = () => {
      setIsOpen(!isOpen)
    };

    const handleToggleClick = () => {
        setcombine_ids_with_AND((prevValue) => (prevValue === 0 ? 1 : 0));
        setcombine_estimate((prevValue) => (prevValue === 0 ? 1 : 0));
    };

    const handleAddClick = () => {
        setAddOpen(!addOpen)
    };

    const handleMultiFunction = () => {
        handleToggleClick()
        handleAddClick()
    }

    // clearing the data
    const handleClear = () => {
        setestimate_time(0)
        setmember_ids([])
        setFromDateEmployee(null)
        setToDateEmployee(null)
        setgreater_than(null)
        setSearchQuery("")
        setCheckedNames([])
        setInputHour("")
        setInputSymbol("")
    };

    useEffect(() => {
        getEmployeeData(member_ids); 
        getAllEmployeeNameId();
}, [toDateEmployee, fromDateEmployee, member_ids]);
    return (
        <>
            <Row>
                <Col></Col>
            </Row>
            <Row>
                <Col>
                    <Card.Title as="h5">Employees</Card.Title>
                </Col>

                {/* filter */}
                <Col xs={10} md={17}>
                    <Button variant="secondary" className='float-right' onClick={handleCollaspeClick}>
                       {isOpen ? 'Hide' : 'Show'} Filter
                    </Button>
                    {isOpen && (
                        <Card className='mt-5' style={{ height: '90%' }} >
                        <Card.Body className='pb-0'>
                            <Col>
                            <Row>
                                <Col>
                                    <h5>From date</h5>
                                    <DatePicker
                                        selected={fromDateEmployee}
                                        onChange={handleChangeFromDateEmployee}
                                        className="form-control"
                                    />   
                                </Col>
                                <Col>
                                    <h5>To date</h5>
                                    <DatePicker
                                        selected={toDateEmployee}
                                        onChange={handleChangeToDateEmployee}
                                        className="form-control"
                                    />
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                            </Col>
                        </Card.Body>

                        <a style={{ width: '90px', textDecoration: 'none', cursor: 'pointer',color: 'black'}} className='font-weight-bold ml-5 mb-4' onClick={handleMultiFunction}>
                           {addOpen ? '-' : '+'}  Add Filter
                        </a>

                        {addOpen && (
                             <Card.Body>
                                <Row className="align-items-center">
                                    <Col>
                                        <h5>Time Estimate: </h5>
                                    </Col>
                                    <Col>
                                        <Button variant="secondary"  onClick={() => handleMoreOrLessOption(0)}>
                                            Less Than                 
                                        </Button> 
                                    </Col>
                                    <Col>
                                        <Button variant="secondary" onClick={() => handleMoreOrLessOption(1)}>
                                            More Than                  
                                        </Button> 
                                    </Col>
                                    <Col>
                                    <Form>
                                        <InputGroup className="mb-2">
                                            <FormControl
                                            type="number"
                                            placeholder="Hour"
                                            aria-label="Hour"
                                            aria-describedby="basic-addon1"
                                            onChange={handleInputChange}
                                            value={estimate_time}
                                            />
                                        </InputGroup>
                                    </Form>
                                    </Col>
                                    <Col>
                                        <label className="mr-2 font-weight-bold">Employee list: </label>
                                        <input
                                        type="text"
                                        placeholder="Search employees..."
                                        value={searchQuery}
                                        onChange={handleSearchInputChange}
                                        />
                                        <select
                                        className="pb-5 pr-4"
                                        multiple
                                        value={checkedNames.map(String)}
                                        onChange={handleSelectChange} 
                                        >
                                        {filteredEmployees.map((employee) => (
                                            <option key={employee.emp_id} value={employee.emp_id}>
                                            {employee.emp_name}
                                            </option>
                                        ))}
                                        </select>
                                        {/* <p>Member IDs: {member_ids.join(", ")}</p>  */}
                                    </Col>
                                    <Col>
                                        <Button variant="secondary" className='float-right' onClick={handleClear}>
                                            <FontAwesomeIcon icon={faTrash} />                               
                                        </Button> 
                                    </Col>
                                </Row>
                            </Card.Body>                       
                        )}
                    </Card>
                        
                    )}                 
                </Col>
            </Row>
            <Row className='mt-5 mb-5'>
            <Col>
                <Row>
                    <Col>
                        <p>From Date</p>
                        <DatePicker selected={fromDateEmployee} onChange={handleChangeFromDateEmployee} className="form-control" />
                    </Col>
                    <Col>
                        <p>To Date</p>
                        <DatePicker selected={toDateEmployee} onChange={handleChangeToDateEmployee} className="form-control" />
                    </Col>
                    <Col xs={2}>
                        <p>Hour</p>
                        <Button variant={'outline-secondary'} size={'sm'}>
                            {inputSymbol}
                            &nbsp;
                            <UcFirst text={inputHour} />
                        </Button>
                    </Col>
                    <Col xs={2}>
                        <p>Assignees</p>
                        <Button variant={'outline-secondary'} size={'sm'}>
                            <People />
                            &nbsp;
                            <UcFirst text={numberOfAssignees} />
                        </Button>
                    </Col>
                </Row>
            </Col>
            </Row>
            <Row>
                <Container fluid>
                    <Card className="w-full">
                        <Card.Body className="my-3">
                            <Row style={{ width: '100%', overflowX: 'scroll' }}>
                                <Col xs={12}>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th colSpan={5}>Person</th>
                                                <th colSpan={3}>Total</th>
                                                {columnDates.map((e: any) => (
                                                    <th key={e} colSpan={1}>
                                                        {e}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {employeeData.map((e) => (
                                                <tr
                                                    style={{ cursor: 'pointer' }}
                                                    key={e.emp_id}
                                                    onClick={() => {
                                                        getTask(e.emp_id);
                                                    }}
                                                >
                                                    <td colSpan={5}>
                                                        <div className="task-contain">
                                                            <h6
                                                                className={
                                                                    e.emp_id % 4 == 0
                                                                        ? 'bg-c-blue d-inline-block text-center p-2 rounded-circle'
                                                                        : e.emp_id % 4 == 1
                                                                        ? 'bg-c-green d-inline-block text-center p-2 rounded-circle'
                                                                        : e.emp_id % 4 == 2
                                                                        ? 'bg-c-yellow d-inline-block text-center p-2 rounded-circle'
                                                                        : 'bg-c-red d-inline-block text-center p-2 rounded-circle'
                                                                }
                                                            >
                                                                {getinitials(e.name)}
                                                            </h6>
                                                            <p className="d-inline-block m-l-20">{e.name}</p>
                                                        </div>
                                                    </td>
                                                    <td colSpan={3} className="p-3 text-center justify-content-center">
                                                        {e.total_work_hours}
                                                    </td>
                                                    {e.work_summary.map((e: any) => (
                                                        <td className="p-3 text-center  justify-content-center" colSpan={1}>
                                                            <ProgressBar now={getPercentage(e.time_hours)} />
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Modal size="xl" centered show={isVertically} onHide={() => setisVertically(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title as="h5">Modal Title</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ width: '100%', overflowX: 'scroll' }}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th colSpan={1}>Task</th>
                                        <th colSpan={1}>Total</th>
                                        {columnDates.map((e: any) => (
                                            <th key={e} colSpan={1}>
                                                {e}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {EmployeetaskData.map((e) => (
                                        <tr key={e.task_id} style={{ width: '100%', overflowX: 'scroll' }}>
                                            <td colSpan={1} style={{ overflowX: 'scroll' }}>
                                                {e.task_name}
                                            </td>
                                            <td colSpan={1} className="p-3 text-center justify-content-center">
                                                {e.spent_time_hours}
                                            </td>
                                            {e.tracked_times.map((e: any) => (
                                                <td className="p-3 text-center  justify-content-center" colSpan={1}>
                                                    {e.time_hours}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setisVertically(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </Row>
        </>
    );
};

export default EmployeeData;
