import React, { Component } from 'react';
import Modal from 'react-aria-modal';

import '../styles/modal.scss';

export default class extends Component {
  close() {
    const { onClose } = this.props;
    onClose && onClose();
  }

  render() {
    const {
      isOpen,
      align,
      mask,
      className,
      focusElement,
      children,
    } = this.props;

    const underlayClass = ['modal-wrapper', align || 'center', mask || 'light']
      .filter(x => x)
      .join(' ');
    const dialogClass = ['modal', className].filter(x => x).join(' ');

    return (
      <Modal
        titleId="modal"
        underlayClass={underlayClass}
        dialogClass={dialogClass}
        includeDefaultStyles={false}
        mounted={isOpen}
        focusDialog={!focusElement}
        initialFocus={focusElement}
        underlayClickExits={false}
        onExit={this.close.bind(this)}
      >
        <div className="close" onClick={this.close.bind(this)} />
        {children}
      </Modal>
    );
  }
}
