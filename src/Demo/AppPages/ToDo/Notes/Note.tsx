import React, { Component } from "react";
const saveText = "SAVE";
const removeToolTipText = "Remove Note";
interface NoteProps {
  index: number;
  onChange: (newText: string, i: number) => void;
  onRemove: (i: number) => void;
  position: { xPos: number; yPos: number } | false;
  children: React.ReactNode;
  onDrag: (position: any, i: number) => void;
}
type NoteState = {
  editing?: boolean
};
export default class Note extends Component<NoteProps, NoteState> {
  newText: any;
  style: any;
  constructor(props: NoteProps) {
    super(props);
    this.state = {
      editing: false
    };
  }
  updatePosition({ position }: NoteProps) {
    this.style = {
      left: position
        ? position.xPos
        : this.randomBetween(0, window.innerWidth - 280) + "px",
      top: position
        ? position.yPos
        : this.randomBetween(0, window.innerHeight - 280) + "px"
    };
  }
  UNSAFE_componentWillMount() {
    this.updatePosition(this.props);
  }
  componentWillUpdate(nextProps: any) {
    this.updatePosition(nextProps);
  }
  onDragStart(e: React.DragEvent<HTMLDivElement>) {
    const { index } = this.props;
    e.dataTransfer.setData("application/x-note",`${index}`);
  }
  // Get random position
  randomBetween(min: number, max: number) {
    return min + Math.ceil(Math.random() * max);
  }
  // Turn on edit moge
  edit() {
    this.setState({ editing: true });
  }
  // Save edits
  save() {
    const { index } = this.props;
    this.props.onChange(this.newText.value, index);
    this.setState({ editing: false });
  }
  // Remove note
  remove() {
    const { index } = this.props;
    this.props.onRemove(index);
  }
  // Render note body
  renderNoteBody(content: React.ReactNode, save?: () => void) {
    return (
      <div
        draggable="true"
        onDragStart={e => this.onDragStart(e)}
        onDoubleClick={() => this.edit()}
        className="note"
        style={this.style}
      >
        <article>
          <header className="note__header">
            <div className="wrapper-tooltip">
              <span
                onClick={() => this.remove()}
                className="close hairline"
              ></span>
              <div className="tooltip">{removeToolTipText}</div>
            </div>
          </header>
          <div className="note__content">{content}</div>
          <footer className="note__footer">
            <div className="note__fold"></div>
            {save ? (
              <div className="note__save" onClick={() => this.save()}>
                {saveText}
              </div>
            ) : (
              ""
            )}
          </footer>
        </article>
      </div>
    );
  }
  // Render note preview
  renderDisplay() {
    const { children } = this.props;
    return this.renderNoteBody(children);
  }
  // Render note edit mode
  renderForm() {
    const { children } = this.props;
    const content = (
      <div>
        <textarea
          ref={ref => (this.newText = ref)}
          className="note__textarea"
        >{children}</textarea>
      </div>
    );
    return this.renderNoteBody(content, this.save);
  }
  render() {
    const { editing } = this.state;
    return editing ? this.renderForm() : this.renderDisplay();
  }
}
