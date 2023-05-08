import * as React from 'react';
import { Row, Col, Card } from "react-bootstrap";
import Select from "react-select";
import Creatable from "react-select/creatable";
import makeAnimated from "react-select/animated";
import chroma from "chroma-js";

import BasicExample from "./list-box/BasicExample";
import OptGroupExample from "./list-box/OptGroupExample";
import FilterExample from "./list-box/FilterExample";
import AlignTopExample from "./list-box/AlignTopExample";
import DisabledExample from "./list-box/DisabledExample";
import PreserveSelectOrderExample from "./list-box/PreserveSelectOrderExample";
import AllowDuplicatesExample from "./list-box/AllowDuplicatesExample";
import RestrictAvailableExample from "./list-box/RestrictAvailableExample";
import Breadcrumb from "../../App/components/Breadcrumb";
export const colourOptions = [
  { value: "ocean", label: "Ocean", color: "#00B8D9" },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E", isFixed: true },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" }
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
const colourStylesSingle = {
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
  singleValue: (styles:  React.CSSProperties, { data }: any) => ({ ...styles, ...dot(data.color) })
};
const colourStylesMulti = {
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
  multiValue: (styles: React.CSSProperties, { data }: any) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css()
    };
  },
  multiValueLabel: (styles: React.CSSProperties, { data }: any) => ({
    ...styles,
    color: data.color
  }),
  multiValueRemove: (styles: React.CSSProperties, { data }: any) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color,
      color: "white"
    }
  })
};
const styles = {
  multiValue: (base: any, state: any) => {
    return state.data.isFixed ? { ...base, backgroundColor: "gray" } : base;
  },
  multiValueLabel: (base: any, state: any) => {
    return state.data.isFixed
      ? { ...base, fontWeight: "bold", color: "white", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base: any, state: any) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  }
};
const orderOptions = (values: any[]) => {
  return values.filter((v: any) => v.isFixed).concat(values.filter(v => !v.isFixed));
};
type FormsSelectState = {
  value?: any,
  some?: any
};
class FormsSelect extends React.Component<{}, FormsSelectState> {
  constructor(props: {}) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      value: orderOptions([
        colourOptions[3],
        colourOptions[6],
        colourOptions[8]
      ])
    };
  }
  onChange(value: any, { action, removedValue }: any) {
    switch (action) {
      case "remove-value":
      case "pop-value":
        if (removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        value = colourOptions.filter(v => v.isFixed);
        break;
      default:
        break;
    }
    value = orderOptions(value);
    this.setState({ value: value });
  }
  render() {
    return (
      <>
        <Row className="align-items-center page-header">
          <Col>
            <Breadcrumb />
          </Col>
        </Row>
        <Row>
          <Col md={6} xl={4}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Single Select</Card.Title>
              </Card.Header>
              <Card.Body>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={colourOptions[0]}
                  name="color"
                  options={colourOptions}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Multi Select</Card.Title>
              </Card.Header>
              <Card.Body>
                <Select
                  defaultValue={[colourOptions[2], colourOptions[3]]}
                  isMulti
                  name="colors"
                  options={colourOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">With Placeholder</Card.Title>
              </Card.Header>
              <Card.Body>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  name="color"
                  options={colourOptions}
                  placeholder="Which is your favourite colour?"
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Tagging Support</Card.Title>
              </Card.Header>
              <Card.Body>
                <Creatable isMulti options={colourOptions} pageSize={3} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Clear Selection</Card.Title>
              </Card.Header>
              <Card.Body>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={colourOptions[0]}
                  name="color"
                  options={colourOptions}
                  isClearable
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Searchable</Card.Title>
              </Card.Header>
              <Card.Body>
                <Select
                  defaultValue={[colourOptions[2], colourOptions[3]]}
                  isMulti
                  name="colors"
                  options={colourOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  isSearchable
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Disabled</Card.Title>
              </Card.Header>
              <Card.Body>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={colourOptions[0]}
                  name="color"
                  options={colourOptions}
                  isDisabled
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">RTL</Card.Title>
              </Card.Header>
              <Card.Body>
                <Select
                  defaultValue={[colourOptions[2], colourOptions[3]]}
                  isMulti
                  name="colors"
                  options={colourOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  isRtl
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Animation</Card.Title>
              </Card.Header>
              <Card.Body>
                <Select
                  closeMenuOnSelect={false}
                  components={makeAnimated()}
                  defaultValue={[colourOptions[4], colourOptions[5]]}
                  isMulti
                  options={colourOptions}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Custom Style Single</Card.Title>
              </Card.Header>
              <Card.Body>
                <Select
                  defaultValue={colourOptions[2]}
                  label="Single select"
                  options={colourOptions}
                  styles={colourStylesSingle as any}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Custom Style Multi</Card.Title>
              </Card.Header>
              <Card.Body>
                <Select
                  closeMenuOnSelect={false}
                  defaultValue={[colourOptions[0], colourOptions[1]]}
                  isMulti
                  options={colourOptions}
                  styles={colourStylesMulti as any}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} xl={4}>
            <Card>
              <Card.Header>
                <Card.Title as="h5">Custom Style Multi</Card.Title>
              </Card.Header>
              <Card.Body>
                <Select
                  value={this.state.value}
                  isMulti
                  styles={styles}
                  isClearable={this.state.value.some((v: any) => !v.isFixed)}
                  name="colors"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={this.onChange}
                  options={colourOptions}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl={6}>
            <Card>
              <Card.Header>
                <Card.Title as="h5"> Basic Listbox </Card.Title>
              </Card.Header>
              <Card.Body>
                <BasicExample />
              </Card.Body>
            </Card>
          </Col>
          <Col xl={6}>
            <Card>
              <Card.Header>
                <Card.Title as="h5"> Option Groups </Card.Title>
              </Card.Header>
              <Card.Body>
                <OptGroupExample />
              </Card.Body>
            </Card>
          </Col>
          <Col xl={6}>
            <Card>
              <Card.Header>
                <Card.Title as="h5"> Filter/Searchable </Card.Title>
              </Card.Header>
              <Card.Body>
                <FilterExample />
              </Card.Body>
            </Card>
          </Col>
          <Col xl={6}>
            <Card>
              <Card.Header>
                <Card.Title as="h5"> Align Actions to Top </Card.Title>
              </Card.Header>
              <Card.Body>
                <AlignTopExample />
              </Card.Body>
            </Card>
          </Col>
          <Col xl={6}>
            <Card>
              <Card.Header>
                <Card.Title as="h5"> Preserve Select Order </Card.Title>
              </Card.Header>
              <Card.Body>
                <PreserveSelectOrderExample />
              </Card.Body>
            </Card>
          </Col>
          <Col xl={6}>
            <Card>
              <Card.Header>
                <Card.Title as="h5"> Allow Duplicates Items </Card.Title>
              </Card.Header>
              <Card.Body>
                <AllowDuplicatesExample />
              </Card.Body>
            </Card>
          </Col>
          <Col xl={6}>
            <Card>
              <Card.Header>
                <Card.Title as="h5"> Restrict Available </Card.Title>
              </Card.Header>
              <Card.Body>
                <RestrictAvailableExample />
              </Card.Body>
            </Card>
          </Col>
          <Col xl={6}>
            <Card>
              <Card.Header>
                <Card.Title as="h5"> Disabled </Card.Title>
              </Card.Header>
              <Card.Body>
                <DisabledExample />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
export default FormsSelect;
