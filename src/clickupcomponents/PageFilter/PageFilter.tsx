import React, { Component } from 'react';
import { Button, Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import UcFirst from '../../App/components/UcFirst';
import { Filter, Collection, ListTask, Person, People, Eye, ThreeDotsVertical } from 'react-bootstrap-icons';

type Props = {};

type State = {};

export default class PageFilter extends Component<Props, State> {
    state = {};

    render() {
        return (
            <>
                <Row className="my-3">
                    <Col xs={2}>
                        <Form>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">
                                        <i className="feather icon-search" />
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl placeholder="Search tasks" aria-label="Username" aria-describedby="basic-addon1" />
                            </InputGroup>
                        </Form>
                    </Col>
                    <Col xs={10}>
                        <Row>
                            <Col>
                                <Button style={{ width:"10rem" }} variant={'outline-secondary'} size={'sm'}>
                                    <Filter />
                                    &nbsp;
                                    <UcFirst text={'Filter'} />
                                </Button>
                            </Col>
                            <Col xs={2}>
                                <Button style={{ width:"10rem" }} variant={'outline-secondary'} size={'sm'}>
                                    <Collection />
                                    &nbsp;
                                    <UcFirst text={'Groupby:Status'} />
                                </Button>
                            </Col>
                            <Col>
                                <Button style={{ width:"10rem" }} variant={'outline-secondary'} size={'sm'}>
                                    <ListTask />
                                    &nbsp;
                                    <UcFirst text={'Subtask'} />
                                </Button>
                            </Col>
                            <Col>
                                <Button style={{ width:"10rem" }} variant={'outline-secondary'} size={'sm'}>
                                    <Person />
                                    &nbsp;
                                    <UcFirst text={'Me'} />
                                </Button>
                            </Col>
                            <Col>
                                <Button style={{ width:"10rem" }} variant={'outline-secondary'} size={'sm'}>
                                    <People />
                                    &nbsp;
                                    <UcFirst text={'Assignee'} />
                                </Button>
                            </Col>
                            <Col>
                                <Button style={{ width:"10rem" }} variant={'outline-secondary'} size={'sm'}>
                                    <Eye />
                                    &nbsp;
                                    <UcFirst text={'Show'} />
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </>
        );
    }
}
