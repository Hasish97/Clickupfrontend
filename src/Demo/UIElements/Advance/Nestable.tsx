import * as React from 'react';
import { Row, Col, Card, Button } from "react-bootstrap";
import Nestable from "react-nestable";

import Breadcrumb from "../../../App/components/Breadcrumb";
const items = [
  {
    id: 1,
    text: "Item 1"
  },
  {
    id: 2,
    text: "Item 2",
    children: [
      {
        id: 3,
        text: "Item 3"
      },
      {
        id: 4,
        text: "Item 4"
      },
      {
        id: 5,
        text: "Item 5",
        children: [
          {
            id: 6,
            text: "Item 6"
          },
          {
            id: 7,
            text: "Item 7"
          },
          {
            id: 8,
            text: "Item 8"
          }
        ]
      },
      {
        id: 9,
        text: "Item 9"
      },
      {
        id: 10,
        text: "Item 10"
      }
    ]
  },
  {
    id: 11,
    text: "Item 11"
  },
  {
    id: 12,
    text: "Item 12"
  }
];
type AdvanceNestableState = {
  defaultCollapsed?: boolean
};
class AdvanceNestable extends React.Component<{}, AdvanceNestableState> {
  refNestable: any;
  refNestableHandler: any;
  state = {
    example: 1,
    defaultCollapsed: false
  };
  collapse = (collapseCase: number) => {
    if (this.refNestable || this.refNestableHandler) {
      switch (collapseCase) {
        case 0:
          this.refNestable.collapse("NONE");
          this.refNestableHandler.collapse("NONE");
          break;
        case 1:
          this.refNestable.collapse("ALL");
          this.refNestableHandler.collapse("ALL");
          break;
        case 2:
          this.refNestable.collapse([1]);
          this.refNestableHandler.collapse([1]);
          break;
        default:
          this.refNestable.collapse("NONE");
          this.refNestableHandler.collapse("NONE");
          break;
      }
    }
  };
  renderItem = ({ item, collapseIcon, handler }: any) => {
    return (
      <div className="pc-nestable-item">
        {handler}
        {collapseIcon}
        {item.text}
      </div>
    );
  };
  renderExampleOne = () => {
    const { defaultCollapsed } = this.state;
    return (
      <div>
        <Nestable
          items={items}
          collapsed={defaultCollapsed}
          renderItem={this.renderItem}
          ref={(el: any) => (this.refNestable = el)}
        />

        <br />
      </div>
    );
  };
  renderExampleTwo = () => {
    const { defaultCollapsed } = this.state;
    return (
      <div>
        <Nestable
          items={items}
          collapsed={defaultCollapsed}
          renderItem={this.renderItem}
          handler={<span className="pc-nestable-item-handler" />}
          ref={(el: any) => (this.refNestableHandler = el)}
        />
      </div>
    );
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
                <Card.Title as="h5">Nestable</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col sm={12} className="pb-4">
                    <Button onClick={() => this.collapse(0)}>Expand All</Button>
                    <Button
                      variant="secondary"
                      onClick={() => this.collapse(1)}
                    >
                      Collapse All
                    </Button>
                  </Col>
                  <Col sm={12} md={6}>
                    {this.renderExampleOne()}
                  </Col>
                  <Col sm={12} md={6}>
                    {this.renderExampleTwo()}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
export default AdvanceNestable;
