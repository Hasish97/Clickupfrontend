import React, { Component, useState, useEffect } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import NavBar from '../../../../clickupcomponents/NavBar';
import TabBar from '../../../../clickupcomponents/TabBar/TabBar';

import { API_BASE_URL } from '../../../../config';
import Axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

type BasicModalsState = {
    isVertically?: boolean;
};
const token = localStorage.getItem('jwtToken');
export default class Target extends Component<{}, {}> {
    state = {
        isVertically: 1,
        masterData: {
            id: 0,
            mstQuatationvalueActualShared: 0,
            mstQuatationvalueCalulated: 0,
            mstQuotedEffort: 0,
            mstQuotedManDayRate: 0,
            mstTotalEffortSpent: 0,
            mstStandardManDayRate: 0,
            project_id: ''
        },
        projectCheckpointPercentageOfEffort: 0,
        projectCheckpointPercentageOfEffortMD: 0,
        projectCheckpointAlertValue: 0,
        financialCheckpointPercentageOfEffort: 0,
        financialCheckpointPercentageOfEffortMD: 0,
        financialCheckpointAlertValue: 0,
        savebuttondisable: false
    };

    async componentDidMount() {
        this.getMasterData();
    }
    componentDidUpdate() {}

    getMasterData = async () => {
        let projectidsplit = window.location.href.toString().split('/');
        let projectid = projectidsplit[projectidsplit.length - 1];
        projectid = projectid.split('#')[0];

        const data = await Axios.post(
            `http://192.168.1.36:8080//api/get_project_masterData`,
            {
                project_id: projectid
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        if (data.data.result.length == 0) {
            const data = await Axios.post(`http://192.168.1.36:8080//api/create_mst_data`, {
                mstQuatationvalueActualShared: 0,
                mstQuatationvalueCalulated: 0,
                mstQuotedEffort: 0,
                mstQuotedManDayRate: 0,
                mstTotalEffortSpent: 0,
                mstStandardManDayRate: 0,
                project_id: projectid
            });
            this.getMasterData();
        } else {
            this.setState({
                masterData: data.data.result[0]
            });
        }
    };

    sweetAlertHandler = (alert: {
        title: string;
        text: string;
        type: undefined | 'warning' | 'error' | 'success' | 'info' | 'question';
    }) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: alert.title,
            text: alert.text,
            type: alert.type
        }).then(() => {
            window.location.reload();
        });
    };

    HandleForm = async () => {
        this.setState({ savebuttondisable: true });
        const data = await Axios.put(`http://192.168.1.36:8080/api/update_project_masterData`, this.state.masterData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                this.setState({ savebuttondisable: false });
                this.sweetAlertHandler({
                    title: 'Successful !',
                    type: 'success',
                    text: ''
                });
            })
            .catch(() => {
                this.setState({ savebuttondisable: false });
                this.sweetAlertHandler({
                    title: 'Unsuccessful !',
                    type: 'error',
                    text: ''
                });
            });
    };

    render() {
        return (
            <>
                {this.state.isVertically == 1 ? (
                    <Form>
                        <Form.Group as={Row} controlId="formOneQE">
                            <Form.Label column sm={3}>
                                Quoted Effort
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    value={this.state.masterData.mstQuotedEffort}
                                    type="number"
                                    placeholder="xxxxxxxxx"
                                    disabled
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formOneQMDR">
                            <Form.Label column sm={3}>
                                Quoted Man Day Rate(Rs. )
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    value={this.state.masterData.mstQuotedManDayRate}
                                    type="number"
                                    placeholder="xxxxxxxxx"
                                    disabled
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formOneCQV">
                            <Form.Label column sm={3}>
                                Calculated Quotation Value (Rs.)
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    value={this.state.masterData.mstQuotedEffort * this.state.masterData.mstQuotedManDayRate}
                                    type="number"
                                    placeholder="xxxxxxxxx"
                                    disabled
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formOneASQ">
                            <Form.Label column sm={3}>
                                Actual/Shared Quotation Value(Rs. )
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    value={this.state.masterData.mstQuatationvalueActualShared}
                                    type="number"
                                    placeholder="xxxxxxxxx"
                                    disabled
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formOneTES">
                            <Form.Label column sm={3}>
                                Total Effort Spent(MD)
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    value={this.state.masterData.mstTotalEffortSpent}
                                    type="number"
                                    placeholder="xxxxxxxxx"
                                    disabled
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formOneSMDR">
                            <Form.Label column sm={3}>
                                Standrad Man Date Rate(Rs. )
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    value={this.state.masterData.mstStandardManDayRate}
                                    type="number"
                                    placeholder="xxxxxxxxx"
                                    disabled
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col sm={{ span: 10, offset: 3 }}>
                                <Row>
                                    <Col>
                                        <Button onClick={() => this.setState({ isVertically: 2 })}>Update</Button>
                                    </Col>
                                    <Col></Col>
                                </Row>
                            </Col>
                            <Col className="mt-3" sm={{ span: 10, offset: 3 }}>
                                <Row>
                                    <Col xs={3}>
                                        <Button onClick={() => this.setState({ isVertically: 3 })}>Project Checkpoint</Button>
                                    </Col>
                                    <Col>
                                        <Button onClick={() => this.setState({ isVertically: 4 })}>Financial Checkpoint</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Form.Group>
                    </Form>
                ) : this.state.isVertically == 2 ? (
                    <Form>
                        <Form.Group as={Row} controlId="formTwoQE">
                            <Form.Label column sm={3}>
                                Quoted Effort
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    value={this.state.masterData.mstQuotedEffort}
                                    onChange={(e) => {
                                        this.setState({
                                            masterData: {
                                                ...this.state.masterData,
                                                mstQuotedEffort: parseFloat(e.target.value)
                                            }
                                        });
                                    }}
                                    type="number"
                                    placeholder="xxxxxxxxx"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formTwoQMDR">
                            <Form.Label column sm={3}>
                                Quoted Man Day Rate(Rs. )
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    value={this.state.masterData.mstQuotedManDayRate}
                                    onChange={(e) => {
                                        this.setState({
                                            masterData: {
                                                ...this.state.masterData,
                                                mstQuotedManDayRate: parseFloat(e.target.value)
                                            }
                                        });
                                    }}
                                    type="number"
                                    placeholder="xxxxxxxxx"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formTwoCQV">
                            <Form.Label column sm={3}>
                                Calculated Quotation Value (Rs.)
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    value={this.state.masterData.mstQuotedEffort * this.state.masterData.mstQuotedManDayRate}
                                    type="number"
                                    placeholder="xxxxxxxxx"
                                    disabled
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formTwoASQ">
                            <Form.Label column sm={3}>
                                Actual/Shared Quotation Value(Rs. )
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    value={this.state.masterData.mstQuatationvalueActualShared}
                                    onChange={(e) => {
                                        this.setState({
                                            masterData: {
                                                ...this.state.masterData,
                                                mstQuatationvalueActualShared: parseFloat(e.target.value)
                                            }
                                        });
                                    }}
                                    type="number"
                                    placeholder="xxxxxxxxx"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formTwoTES">
                            <Form.Label column sm={3}>
                                Total Effort Spent(MD)
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    value={this.state.masterData.mstTotalEffortSpent}
                                    onChange={(e) => {
                                        this.setState({
                                            masterData: {
                                                ...this.state.masterData,
                                                mstTotalEffortSpent: parseFloat(e.target.value)
                                            }
                                        });
                                    }}
                                    type="number"
                                    placeholder="xxxxxxxxx"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formTwoSMDR">
                            <Form.Label column sm={3}>
                                Standrad Man Date Rate(Rs. )
                            </Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    value={this.state.masterData.mstStandardManDayRate}
                                    onChange={(e) => {
                                        this.setState({
                                            masterData: {
                                                ...this.state.masterData,
                                                mstStandardManDayRate: parseFloat(e.target.value)
                                            }
                                        });
                                    }}
                                    type="number"
                                    placeholder="xxxxxxxxx"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3 justify-content-center">
                            <Col xs={1}>
                                <Button type="Button" onClick={this.HandleForm} disabled={this.state.savebuttondisable}>
                                    Save
                                </Button>
                            </Col>
                            <Col xs={1}>
                                <Button type="cancel" onClick={() => this.setState({ isVertically: 1 })}>
                                    Cancel
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                ) : this.state.isVertically == 3 ? (
                    <div>
                        <h5>Project Check Points</h5>
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="formProjectCheckPointEmail">
                                <Form.Label column sm={2}>
                                    Quoted Effort(MD)
                                </Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        value={this.state.masterData.mstQuotedEffort}
                                        name="QuotedEffort"
                                        type="number"
                                        step={'any'}
                                        placeholder="xxxxxxxxx"
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formProjectCheckPointEmail">
                                <Form.Label column sm={2}>
                                    Total Effort Spent(MD)
                                </Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        value={this.state.masterData.mstTotalEffortSpent}
                                        name="TotalEffortSpent"
                                        type="number"
                                        step={'any'}
                                        placeholder="xxxxxxxxx"
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formProjectCheckPointEmail">
                                <Form.Label column sm={2}>
                                    % of Effort
                                </Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        name="ofEffort"
                                        type="number"
                                        value={this.state.projectCheckpointPercentageOfEffort}
                                        step={'any'}
                                        placeholder="Enter % of Effort"
                                        className="w-50"
                                        min={0}
                                        max={100}
                                        onChange={(e) => {
                                            this.setState({ projectCheckpointPercentageOfEffort: parseFloat(e.target.value) }, () => {
                                                this.setState(
                                                    {
                                                        projectCheckpointPercentageOfEffortMD:
                                                            this.state.projectCheckpointPercentageOfEffort *
                                                            this.state.masterData.mstQuotedEffort *
                                                            0.01
                                                    },
                                                    () => {
                                                        this.setState({
                                                            projectCheckpointAlertValue: isNaN(
                                                                this.state.masterData.mstTotalEffortSpent *
                                                                    (1 / this.state.projectCheckpointPercentageOfEffortMD) *
                                                                    100
                                                            )
                                                                ? 0
                                                                : !isFinite(
                                                                      this.state.masterData.mstTotalEffortSpent *
                                                                          (1 / this.state.projectCheckpointPercentageOfEffortMD) *
                                                                          100
                                                                  )
                                                                ? 0
                                                                : this.state.masterData.mstTotalEffortSpent *
                                                                  (1 / this.state.projectCheckpointPercentageOfEffortMD) *
                                                                  100
                                                        });
                                                    }
                                                );
                                            });
                                        }}
                                        required
                                    />
                                    {this.state.projectCheckpointPercentageOfEffort <= 100 ? (
                                        ''
                                    ) : (
                                        <Card.Text className="text-danger mx-1">
                                            % of Effort value should be greater than 0% and less than or eqaul 100%
                                        </Card.Text>
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formProjectCheckPointEmail">
                                <Form.Label column sm={2}>
                                    % of Effort(MD)
                                </Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        value={this.state.projectCheckpointPercentageOfEffortMD}
                                        name="%ofEffortMD"
                                        type="number"
                                        step={'any'}
                                        placeholder="xxxxxxxxx"
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formProjectCheckPointEmail">
                                <Row className="my-3 ">
                                    <Col xs={2}>Alert</Col>
                                    <Col xs={4}>
                                        <Row>
                                            <Col xs={2}>
                                                <Button
                                                    variant={
                                                        this.state.projectCheckpointAlertValue <= 70
                                                            ? 'success'
                                                            : this.state.projectCheckpointAlertValue > 70 &&
                                                              this.state.projectCheckpointAlertValue <= 90
                                                            ? 'warning'
                                                            : 'danger'
                                                    }
                                                    className="outline-primary w-5"
                                                ></Button>
                                            </Col>
                                            <Col>
                                                <p>{this.state.projectCheckpointAlertValue.toFixed(0)}%</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="my-3">
                                    <Col xs={1}>
                                        <Button className="btn-square" variant={'success'}></Button>
                                    </Col>
                                    <Col>Upto 70%</Col>
                                </Row>
                                <Row className="my-3">
                                    <Col xs={1}>
                                        <Button className="btn-square" variant={'warning'}></Button>
                                    </Col>
                                    <Col>70% - 90%</Col>
                                </Row>
                                <Row className="my-3">
                                    <Col xs={1}>
                                        <Button className="btn-square" variant={'danger'}></Button>
                                    </Col>
                                    <Col>Above 90%</Col>
                                </Row>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3 justify-content-center">
                                <Col xs={1}></Col>
                                <Col xs={1}>
                                    <Button type="cancel" onClick={() => this.setState({ isVertically: 1 })}>
                                        Close
                                    </Button>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3"></Form.Group>
                        </Form>
                    </div>
                ) : (
                    <div>
                        <h5>Financial Check Points</h5>
                        <Form>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>
                                    Actual/ Shared Quotation Value (Rs.)
                                </Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        value={this.state.masterData.mstQuatationvalueActualShared}
                                        name="mstQuatationvalueActualShared"
                                        type="number"
                                        step={'any'}
                                        placeholder="xxxxxxxxx"
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>
                                    Standard Man Day Rate (Rs.)
                                </Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        value={this.state.masterData.mstStandardManDayRate}
                                        name="mstStandardManDayRate"
                                        type="number"
                                        step={'any'}
                                        placeholder="xxxxxxxxx"
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>
                                    Actual/ Shared Quotation Value (MD)
                                </Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        name="ofEffort"
                                        value={(
                                            this.state.masterData.mstQuatationvalueActualShared /
                                            this.state.masterData.mstStandardManDayRate
                                        ).toFixed(2)}
                                        type="number"
                                        step={'any'}
                                        placeholder="xxxxxxxxx"
                                        className=""
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>
                                    Total Effort Spent(MD)
                                </Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        value={this.state.masterData.mstTotalEffortSpent}
                                        name="mstTotalEffortSpent"
                                        type="number"
                                        step={'any'}
                                        placeholder="xxxxxxxxx"
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>
                                    % of Effort
                                </Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        name="ofEffort"
                                        type="number"
                                        step={'any'}
                                        placeholder="xxxxxxxxx"
                                        className=""
                                        required
                                        min={0}
                                        max={100}
                                        onChange={(e) => {
                                            this.setState({ financialCheckpointPercentageOfEffort: parseFloat(e.target.value) }, () => {
                                                this.setState(
                                                    {
                                                        financialCheckpointPercentageOfEffortMD:
                                                            (this.state.masterData.mstQuatationvalueActualShared /
                                                                this.state.masterData.mstStandardManDayRate) *
                                                            0.01 *
                                                            this.state.financialCheckpointPercentageOfEffort
                                                    },
                                                    () => {
                                                        this.setState({
                                                            financialCheckpointAlertValue: isNaN(
                                                                this.state.masterData.mstTotalEffortSpent *
                                                                    (1 / this.state.financialCheckpointPercentageOfEffortMD) *
                                                                    100
                                                            )
                                                                ? 0
                                                                : !isFinite(
                                                                      this.state.masterData.mstTotalEffortSpent *
                                                                          (1 / this.state.financialCheckpointPercentageOfEffortMD) *
                                                                          100
                                                                  )
                                                                ? 0
                                                                : this.state.masterData.mstTotalEffortSpent *
                                                                  (1 / this.state.financialCheckpointPercentageOfEffortMD) *
                                                                  100
                                                        });
                                                    }
                                                );
                                            });
                                        }}
                                    />
                                    {this.state.financialCheckpointPercentageOfEffort <= 100 ? (
                                        ''
                                    ) : (
                                        <Card.Text className="text-danger mx-1">
                                            % of Effort value should be greater than 0% and less than or eqaul 100%
                                        </Card.Text>
                                    )}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>
                                    % of Effort(MD)
                                </Form.Label>
                                <Col sm={5}>
                                    <Form.Control
                                        value={this.state.financialCheckpointPercentageOfEffortMD.toFixed(2)}
                                        name="%ofEffortMD"
                                        type="number"
                                        step={'any'}
                                        placeholder="xxxxxxxxx"
                                        disabled
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formHorizontalEmail">
                                <Row className="my-3 ">
                                    <Col xs={2}>Alert</Col>
                                    <Col xs={4}>
                                        <Row>
                                            <Col xs={2}>
                                                <Button
                                                    variant={
                                                        this.state.financialCheckpointAlertValue <= 70
                                                            ? 'success'
                                                            : this.state.financialCheckpointAlertValue > 70 &&
                                                              this.state.financialCheckpointAlertValue <= 90
                                                            ? 'warning'
                                                            : 'danger'
                                                    }
                                                    className="outline-primary w-5"
                                                ></Button>
                                            </Col>
                                            <Col>
                                                <p>{this.state.financialCheckpointAlertValue.toFixed(0)}%</p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="my-3">
                                    <Col xs={1}>
                                        <Button className="btn-square" variant={'success'}></Button>
                                    </Col>
                                    <Col>Upto 70%</Col>
                                </Row>
                                <Row className="my-3">
                                    <Col xs={1}>
                                        <Button className="btn-square" variant={'warning'}></Button>
                                    </Col>
                                    <Col>70% - 90%</Col>
                                </Row>
                                <Row className="my-3">
                                    <Col xs={1}>
                                        <Button className="btn-square" variant={'danger'}></Button>
                                    </Col>
                                    <Col>Above 90%</Col>
                                </Row>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3 justify-content-center" controlId="formHorizontalPassword">
                                <Col xs={1}></Col>
                                <Col xs={1}>
                                    <Button type="cancel" onClick={() => this.setState({ isVertically: 1 })}>
                                        Close
                                    </Button>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} className="mb-3"></Form.Group>
                        </Form>
                    </div>
                )}
            </>
        );
    }
}
