import * as React from 'react';
import Modal from "react-animated-modal";

interface IAnimatedModalProps extends React.HTMLAttributes<Element> {
  animation?: any;
  modalClosed?: any;
  showModal?: any;
}
class AnimatedModal extends React.Component<IAnimatedModalProps, {}> {
  render() {
    return (
      <>
        <Modal
          visible={this.props.showModal}
          closemodal={this.props.modalClosed}
          type={this.props.animation}
        >
          {this.props.children}
        </Modal>
      </>
    );
  }
}
export default AnimatedModal;
