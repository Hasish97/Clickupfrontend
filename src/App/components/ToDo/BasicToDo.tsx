import * as React from 'react';
import { Row, Col, Button, Form } from "react-bootstrap";
import {
  ValidationForm,
  TextInputGroup
} from "react-bootstrap4-form-validation";

import DEMO from "../../../store/constant";
interface Todo {
  id?: number;
  note: string;
  complete: boolean;
}
interface BasicToDoProps {
  todoList: Todo[];
}
type BasicToDoState = {
  cardTodo?: any[],
  newNote?: string,
  map?: <U>(
    callbackfn: (value: any, index: number, array: any[]) => U,
    thisArg?: any
  ) => U[]
};
class BasicToDo extends React.Component<BasicToDoProps, BasicToDoState> {
  formRef: any;
  uniqueId: any;
  constructor(props: BasicToDoProps) {
    super(props);
    this.formRef = React.createRef();
  }
  state = {
    newNote: "",
    cardTodo: [] as  Todo[]
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
  completeHandler = (i: any) => {
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
  handleErrorSubmit = (e: any) => {
    //console.log(errorInputs);
  };
  render() {
    const todoList = this.state.cardTodo.map((item, index) => {
      return (
        <div key={index}>
          <div className="to-do-list mb-3">
            <div className="d-inline-block">
              <label
                className={[
                  item.complete ? "done-task" : "",
                  "check-task custom-control custom-checkbox d-flex justify-content-center"
                ].join(" ")}
              >
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck2"
                  defaultChecked={item.complete}
                  onChange={() => this.completeHandler(index)}
                />
                <span className="custom-control-label">{item.note}</span>
              </label>
            </div>
            <div className="float-right">
              <a href={DEMO.BLANK_LINK} className="delete_todolist">
                <i className="fa fa-trash-alt" />
              </a>
            </div>
          </div>
        </div>
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
            <div className="new-task">{todoList}</div>
          </Col>
        </Row>
      </>
    );
  }
}
export default BasicToDo;
