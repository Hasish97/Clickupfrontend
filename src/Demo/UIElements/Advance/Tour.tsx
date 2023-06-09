import * as React from 'react';
import { Row, Col, Card, Button } from "react-bootstrap";
import Tour from "reactour";
import Joyride, { STATUS, CallBackProps, Step } from "react-joyride";

import MainCard from "../../../App/components/MainCard";
import Breadcrumb from "../../../App/components/Breadcrumb";
const steps = [
  {
    selector: ".tour-1",
    content: "Click hear customize basic card layout"
  },
  {
    selector: ".card-option",
    content: "Click hear open card options"
  },
  {
    selector: ".displayChatbox",
    content: "Click chat open chat conversation"
  },
  {
    selector: ".mobile-menu",
    content: "Click to see collapse menu layout"
  },
  {
    selector: ".pcoded-menu-caption",
    content: "Menu caption"
  }
];
const stepsRide: Step[]  = [
  {
    content: <h5>Let's begin our journey!</h5>,
    placement: "center",
    locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
    target: "body"
  },
  {
    target: ".tour-1",
    content: "Click hear customize basic card layout",
    placement: "top"
  },
  {
    target: ".card-option",
    content: "Click hear open card options"
  },
  {
    target: ".displayChatbox",
    content: "Click chat open chat conversation"
  },
  {
    target: ".mobile-menu",
    content: "Click to see collapse menu layout"
  },
  {
    target: ".pcoded-menu-caption",
    content: "Menu caption"
  }
];
type AdvanceTourState = {
  run?: boolean,
  isTourOpen?: boolean,
  steps?: Step[]
};
class AdvanceTour extends React.Component<{}, AdvanceTourState> {
  state = {
    isTourOpen: false,
    run: false,
    steps: stepsRide
  };
  handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as any)) {
      this.setState({ run: false });
    }
    /*console.groupCollapsed(type);
        console.log(data);
        console.groupEnd();*/
  };
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
            <Card>
              <Card.Header>
                <Card.Title as="h5">Tour</Card.Title>
              </Card.Header>
              <Card.Body>
                <Button onClick={() => this.setState({ isTourOpen: true })}>
                  Start Basic Tour
                </Button>
                <Button onClick={() => this.setState({ run: true })}>
                  Joy Ride
                </Button>
                <Tour
                  steps={steps}
                  isOpen={this.state.isTourOpen}
                  onRequestClose={() => this.setState({ isTourOpen: false })}
                />
                <Joyride
                  callback={this.handleJoyrideCallback}
                  run={this.state.run}
                  continuous
                  scrollToFirstStep
                  showProgress
                  showSkipButton
                  steps={this.state.steps}
                  styles={{
                    options: {
                      zIndex: 10000
                    }
                  }}
                />
              </Card.Body>
            </Card>
            <MainCard isOption title="Hello tour" cardClass="tour-1 card-test">
              <h1>H1 Mintone</h1>
              <h2>H2 Mintone</h2>
              <h3>H3 Mintone</h3>
              <h4>H4 Mintone</h4>
              <h5>H5 Mintone</h5>
              <h6>H6 Mintone</h6>
              <Card.Text>Paragraph Mintone</Card.Text>
              <Card.Text>Paragraph Mintone</Card.Text>
            </MainCard>
          </Col>
        </Row>
      </>
    );
  }
}
export default AdvanceTour;
