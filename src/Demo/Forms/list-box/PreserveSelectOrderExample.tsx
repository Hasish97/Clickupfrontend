import * as React from 'react';
import DualListBox from "react-dual-listbox";
const options = [
  {
    label: "Earth",
    options: [{ value: "luna", label: "Moon" }]
  },
  {
    label: "Mars",
    options: [
      { value: "phobos", label: "Phobos" },
      { value: "deimos", label: "Deimos" }
    ]
  },
  {
    label: "Jupiter",
    options: [
      { value: "io", label: "Io" },
      { value: "europa", label: "Europa" },
      { value: "ganymede", label: "Ganymede" },
      { value: "callisto", label: "Callisto" }
    ]
  }
];
type PreserveSelectOrderExampleState = {
  selected?: string[]
};
class PreserveSelectOrderExample extends React.Component<
  {},
  PreserveSelectOrderExampleState
> {
  constructor(props: {}) {
    super(props);
    this.state = { selected: ["io", "luna", "europa"] };
    this.onChange = this.onChange.bind(this);
  }
  onChange(selected: string[]) {
    this.setState({ selected });
  }
  render() {
    const { selected } = this.state;
    return (
      <DualListBox
        name="moons"
        options={options}
        preserveSelectOrder
        selected={selected}
        showOrderButtons
        onChange={this.onChange}
      />
    );
  }
}
export default PreserveSelectOrderExample;
