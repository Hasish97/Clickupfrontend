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
type AllowDuplicatesExampleState = {
  selected?: string[]
};
class AllowDuplicatesExample extends React.Component<
  {},
  AllowDuplicatesExampleState
> {
  constructor(props: {}) {
    super(props);
    this.state = { selected: ["luna", "io"] };
    this.onChange = this.onChange.bind(this);
  }
  onChange(selected: string[]) {
    this.setState({ selected });
  }
  render() {
    const { selected } = this.state;
    return (
      <DualListBox
        allowDuplicates
        name="moons"
        options={options}
        preserveSelectOrder
        selected={selected}
        onChange={this.onChange}
      />
    );
  }
}
export default AllowDuplicatesExample;
