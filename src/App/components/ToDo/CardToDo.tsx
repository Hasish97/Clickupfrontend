import * as React from 'react';
import { Row, Col, Button, Form } from "react-bootstrap";
import {
  ValidationForm,
  TextInputGroup
} from "react-bootstrap4-form-validation";

import complete from "../../../assets/images/complete.png";

interface Todo {
  id?: number;
  note: string;
  complete: boolean;
}
interface CardToDoProps {
  todoList: Todo[];
}
type CardToDoState = {
  cardTodo?: any[],
  newNote?: string,
  map?: <U>(
    callbackfn: (value: any, index: number, array: any[]) => U,
    thisArg?: any
  ) => U[]
};
class CardToDo extends React.Component<CardToDoProps, CardToDoState> {
  formRef: any;
  uniqueId: any;
  constructor(props: CardToDoProps) {
    super(props);
    this.formRef = React.createRef();
  }
  state = {
    newNote: "",
    cardTodo: [] as Todo[]
  };
  UNSAFE_componentWillMount() {
    const { todoList } = this.props.todoList ? this.props : {todoList: []};
    todoList.map(single => {
      this.add(single.note, single.complete);
      return false;
    });
  }
  nextId() {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  }
  add(text: string, complete: boolean) {
    const { cardTodo } = this.state;
    cardTodo.push({
      id: this.nextId(),
      note: text,
      complete: complete
    });
  }
  completeHandler = (i: number) => {
    let newCard = this.state.cardTodo;
    let item = newCard[i];
    item.complete = !item.complete;
    newCard[i] = item;
    this.setState({ cardTodo: newCard });
  };
  handleChange = (e: any) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.add(this.state.newNote, false);
    this.setState({ newNote: "" });
    this.resetForm();
  };
  resetForm = () => {
    let formRef = this.formRef.current;
    formRef.resetValidationState(true);
  };
  handleErrorSubmit = (e: any, formData: any, errorInputs: any) => {
    //console.log(errorInputs);
  };
  render() {
    const completeStyle: React.CSSProperties = {
      backgroundImage: `url(${complete})`,
      position: "absolute",
      top: "5px",
      right: "5px",
      content: "",
      width: "55px",
      height: "55px",
      backgroundSize: "100%"
    };
    const todoList = this.state.cardTodo.map((item, index) => {
      return (
        <li
          key={index}
          className={item.complete ? "complete" : ""}
          onClick={() => this.completeHandler(index)}
        >
          {item.complete ? <span style={completeStyle} /> : ""}
          <p>{item.note}</p>
        </li>
      );
    });
    return (
      <>
        <Row>
          <Col>
            <ValidationForm
              ref={this.formRef}
              onSubmit={this.handleSubmit}
              onErrorSubmit={this.handleErrorSubmit}
            >
              <Form.Row>
                <Form.Group as={Col}>
                  <TextInputGroup
                    name="newNote"
                    id="newNote"
                    placeholder="Create your task list"
                    required
                    append={
                      <Button
                        type="submit"
                        variant="secondary"
                        className="btn-icon"
                      >
                        <i className="fa fa-plus" />
                      </Button>
                    }
                    value={this.state.newNote}
                    onChange={this.handleChange}
                    autoComplete="off"
                  />
                </Form.Group>
              </Form.Row>
            </ValidationForm>
            <section id="task-container">
              <ul id="task-list">{todoList}</ul>
            </section>
          </Col>
        </Row>
      </>
    );
  }
}
export default CardToDo;
