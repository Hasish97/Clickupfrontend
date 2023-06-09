import * as React from 'react';
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import chroma from "chroma-js";
import Select from "react-select";

import Notifications from "../../../App/components/Notifications";
import Breadcrumb from "../../../App/components/Breadcrumb";
const colourOptions = [
  { value: "inverse", label: "Inverse", color: "#333" },
  { value: "primary", label: "Primary", color: "#04a9f5" },
  { value: "info", label: "Info", color: "#3ebfea" },
  { value: "success", label: "Success", color: "#1de9b6" },
  { value: "warning", label: "Warning", color: "#f4c22b" },
  { value: "danger", label: "Danger", color: "#f44236" },
  { value: "dark", label: "Dark", color: "#c7cbce" },
  { value: "light", label: "Light", color: "#f2f2f2" }
];
const potionOption = [
  { value: "top-left", label: "Top Left" },
  { value: "top-right", label: "Top Right" },
  { value: "top-center", label: "Top Center" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "bottom-right", label: "Bottom Right" },
  { value: "bottom-center", label: "Bottom Center" }
];
const animationOption = [
  { value: "fade", label: "Fade" },
  { value: "flip", label: "Flip" },
  { value: "rotate", label: "Rotate" },
  { value: "zoom", label: "Zoom" },
  { value: "bounce", label: "Bounce" },
  { value: "slide", label: "Slide" },
  { value: "roll", label: "Roll" },
  { value: "light-speed", label: "Light Speed" },
  { value: "jump", label: "Jump" },
  { value: "flash", label: "Flash" },
  { value: "head-shake", label: "Head Shake" },
  { value: "jello", label: "Jello" },
  { value: "pulse", label: "Pulse" },
  { value: "rubber-band", label: "Rubber Band" },
  { value: "shake", label: "Shake" },
  { value: "spin", label: "Spin" },
  { value: "swing", label: "Swing" },
  { value: "tada", label: "Tada" },
  { value: "wobble", label: "Wobble" }
];
const dot = (color = "#ccc") => ({
  alignItems: "center",
  display: "flex",
  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10
  }
});
const colourStyles: any = {
  control: (styles: React.CSSProperties) => ({ ...styles, backgroundColor: "white" }),
  option: (styles: React.CSSProperties, { data, isDisabled, isFocused, isSelected }: any) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default"
    };
  },
  input: (styles: React.CSSProperties) => ({ ...styles, ...dot() }),
  placeholder: (styles: React.CSSProperties) => ({ ...styles, ...dot() }),
  singleValue: (styles: React.CSSProperties, { data }: any) => ({ ...styles, ...dot(data.color) })
};
type AdvanceNotificationState = {
  animation?: { direction: any, type: string },
  message?: any,
  variant?: any,
  placement?: any,
  autoDismiss?: boolean,
  direction?: string
};
class AdvanceNotification extends React.Component<
  {},
  AdvanceNotificationState
> {
  state = {
    variant: "inverse",
    placement: "top-right",
    autoDismiss: true,
    animation: { type: "slide", direction: "top" },
    message:
      "Bootstrap Growl Turning standard Bootstrap alerts into awesome notification"
  };
  animationDirectionHandler = (direction: string) => {
    this.setState({
      ...this.state,
      animation: { ...this.state.animation, direction: direction }
    });
  };
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ message: event.target.value });
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
                <Card.Title as="h5">Growl Notification</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row className="justify-content-md-center">
                  <Col sm={12} md={7}>
                    <Form.Group controlId="formPosition">
                      <Form.Label>Position Variant</Form.Label>
                      <Select
                        defaultValue={potionOption[1]}
                        label="Select Position"
                        options={potionOption}
                        onChange={({ value }: any) =>
                          this.setState({ placement: value })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="formColor">
                      <Form.Label>Color Variant</Form.Label>
                      <Select
                        defaultValue={colourOptions[0]}
                        label="Select Variant"
                        options={colourOptions}
                        styles={colourStyles}
                        onChange={({ value }: any) =>
                          this.setState({ variant: value })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="formAnimation">
                      <Form.Label>Animation Type</Form.Label>
                      <Select
                        defaultValue={animationOption[5]}
                        label="Select Variant"
                        options={animationOption}
                        onChange={({ value }: any) =>
                          this.setState({
                            ...this.state,
                            animation: { ...this.state.animation, type: value }
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="formDirectionRight">
                      <Form.Label>Animation Direction</Form.Label>
                    </Form.Group>
                    <Form.Group controlId="formDirectionRight">
                      <div className="d-inline">
                        <input
                          type="radio"
                          name="rdoDirection"
                          id="directionNone"
                          checked={this.state.animation.direction === "none"}
                          onChange={({ value }: any) =>
                            this.animationDirectionHandler("none")
                          }
                        />
                        <label htmlFor="directionNone" className="cr">
                          None
                        </label>
                      </div>
                      <div className="d-inline">
                        <input
                          type="radio"
                          name="rdoDirection"
                          id="directionRight"
                          checked={this.state.animation.direction === "right"}
                          onChange={({ value }: any) =>
                            this.animationDirectionHandler("right")
                          }
                        />
                        <label htmlFor="directionRight" className="cr">
                          Right
                        </label>
                      </div>
                      <div className="d-inline">
                        <input
                          type="radio"
                          name="rdoDirection"
                          id="directionLeft"
                          checked={this.state.animation.direction === "left"}
                          onChange={({ value }: any) =>
                            this.animationDirectionHandler("left")
                          }
                        />
                        <label htmlFor="directionLeft" className="cr">
                          Left
                        </label>
                      </div>
                      <div className="d-inline">
                        <input
                          type="radio"
                          name="rdoDirection"
                          id="directionTop"
                          checked={this.state.animation.direction === "top"}
                          onChange={({ value }: any) =>
                            this.animationDirectionHandler("top")
                          }
                        />
                        <label htmlFor="directionTop" className="cr">
                          Top
                        </label>
                      </div>
                      <div className="d-inline">
                        <input
                          type="radio"
                          name="rdoDirection"
                          id="directionBottom"
                          checked={this.state.animation.direction === "bottom"}
                          onChange={({ value }: any) =>
                            this.animationDirectionHandler("bottom")
                          }
                        />
                        <label htmlFor="directionBottom" className="cr">
                          Bottom
                        </label>
                      </div>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <div className="switch switch-primary d-inline m-r-10">
                        <input
                          type="checkbox"
                          id="icon-colored"
                          checked={this.state.autoDismiss}
                          onChange={() =>
                            this.setState(prevState => {
                              return { autoDismiss: !prevState.autoDismiss };
                            })
                          }
                        />
                        <label htmlFor="icon-colored" className="cr" />
                      </div>
                      <Form.Label>Auto Dismiss</Form.Label>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={this.state.message}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Notifications notification={this.state}>
                      <Button>Add Notification</Button>
                    </Notifications>
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
export default AdvanceNotification;
