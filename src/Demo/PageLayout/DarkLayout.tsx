import React, { Component } from "react";
import { connect } from 'react-redux';
import { Row, Col, Card, Table } from "react-bootstrap";

import * as actionTypes from "../../store/actions";
import CommonContent from "./CommonContent";
interface IDarkLayoutProps extends React.HTMLAttributes<Element> {
  onChangeLayoutType?: any;
}
class DarkLayout extends Component<IDarkLayoutProps, {}> {
  UNSAFE_componentWillMount() {
    this.props.onChangeLayoutType("menu-dark");
  }
  render() {
    return (
      <>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Menu Dark Layout</Card.Title>
              </Card.Header>
              <Card.Body>
                <p>
                  In Menu Dark Layout - Your entire layout will be set to Dark
                  colors. You can also change different colors using live
                  customizer.
                </p>
                <h5 className="m-15">
                  You can edit this file at [ ../src/config.js ]{" "}
                </h5>
                <Table bordered striped responsive>
                  <thead className="header-table">
                    <tr>
                      <th>Configuration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <ul>
                          <li>
                            layout: <code>vertical/horizontal</code>
                          </li>
                          <li>
                            layoutType: <code>menu-dark</code>
                          </li>
                          <li>
                            headerBackColor: <code>header-blue</code>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <CommonContent />
      </>
    );
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    onChangeLayoutType: (layoutType: string) =>
      dispatch({ type: actionTypes.LAYOUT_TYPE, layoutType: layoutType })
  };
};
export default (connect(null, mapDispatchToProps)(DarkLayout) as any);
