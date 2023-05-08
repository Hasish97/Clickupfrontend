import * as React from 'react';
interface IUcFirstProps extends React.HTMLAttributes<Element> {
  text?: any;
}
class UcFirst extends React.Component<IUcFirstProps, {}> {
  render() {
    const string = this.props.text;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
export default UcFirst;
