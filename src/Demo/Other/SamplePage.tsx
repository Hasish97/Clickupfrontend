import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

import Card from "../../App/components/MainCard";
import Breadcrumb from "../../App/components/Breadcrumb";
class SamplePage extends Component<{}, {}> {
  render() {
    return (
      <>
        <Row className="align-items-center page-header">
          <Col>
            <Breadcrumb />
          </Col>
        </Row>
        <Row>
          <Col>
            <Card title="Hello Card" isOption>
              <p>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
export default SamplePage;
