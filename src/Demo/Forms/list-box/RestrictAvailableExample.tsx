import * as React from 'react';
import { Form } from "react-bootstrap";
import DualListBox from "react-dual-listbox";
const options = [
  { value: "luna", label: "Moon" },
  { value: "phobos", label: "Phobos" },
  { value: "deimos", label: "Deimos" },
  { value: "io", label: "Io" },
  { value: "europa", label: "Europa" },
  { value: "ganymede", label: "Ganymede" },
  { value: "callisto", label: "Callisto" },
  { value: "mimas", label: "Mimas" },
  { value: "enceladus", label: "Enceladus" },
  { value: "tethys", label: "Tethys" },
  { value: "rhea", label: "Rhea" },
  { value: "titan", label: "Titan" },
  { value: "iapetus", label: "Iapetus" }
];
const planets = {
  earth: { name: "Earth", moons: ["luna"] },
  mars: { name: "Mars", moons: ["phobos", "deimos"] },
  jupiter: { name: "Jupiter", moons: ["io", "europa", "ganymede", "callisto"] },
  saturn: {
    name: "Saturn",
    moons: ["mimas", "enceladus", "tehys", "rhea", "titan", "iapetus"]
  }
};
type RestrictAvailableExampleState = {
  planet?: string,
  selected?: string[],
  selectedPlanet?: any
};
class RestrictAvailableExample extends React.Component<
  {},
  RestrictAvailableExampleState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      planet: "jupiter",
      selected: ["phobos", "titan"]
    };
    this.onChange = this.onChange.bind(this);
    this.onPlanetChange = this.onPlanetChange.bind(this);
  }
  onChange(selected: string[]) {
    this.setState({ selected });
  }
  onPlanetChange(event: React.ChangeEvent<HTMLInputElement>) {
    const planet = event.currentTarget.value;
    this.setState({ planet });
  }
  renderPlanets() {
    const { planet: selectedPlanet } = this.state;
    return Object.keys(planets).map(planet => (
      <Form.Group key={planet} className="d-inline">
        <input
          type="radio"
          name="planets"
          id={planet}
          value={planet}
          defaultChecked={planet === selectedPlanet}
          onChange={this.onPlanetChange}
        />
        <Form.Label htmlFor={planet} className="cr">
          {/*// @ts-ignore*/}
          {planets[planet].name}
        </Form.Label>
      </Form.Group>
    ));
  }
  render() {
    const { selected, planet } = this.state;
    return (
      <div className="restrict-available-container">
        <div className="moons mb-3">{this.renderPlanets()}</div>
        <DualListBox
          // @ts-ignore
          available={planets[planet].moons}
          options={options}
          selected={selected}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
export default RestrictAvailableExample;
