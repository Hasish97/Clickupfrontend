import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import NavBar from '../../../clickupcomponents/NavBar';
import TabBar from '../../../clickupcomponents/TabBar/TabBar';
import Navigation from '../../../clickupcomponents/Navigation';

type Props = {};

type State = {};

export default class Spaces extends Component<Props, State> {
    state = {};

    render() {
        return (
            <>
                <NavBar />
                <Row className="mt-5 pt-5">
                    <Col xs={2}>
                        <Navigation></Navigation>
                    </Col>
                    <Col xs={10}>
                        <TabBar />
                    </Col>
                </Row>
            </>
        );
    }
}
