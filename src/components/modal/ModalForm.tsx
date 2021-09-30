import React from "react";
import { Modal, Form, Button } from "antd"

interface stateInterface {
  cancelText?: string;
  okText?: string;
  okButtonProps?: object;
  ok?: () => void;
  cancel?: () => void;
  default?: object;
  finish?: () => void;
  visible: boolean;
  loading?: boolean | object;
  currentLoading: boolean
}

export default class ModelFrom extends React.Component<any, any> {

  public state: stateInterface;
  public formRef: any;
  public formSubmitRef: any;

  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      currentLoading: false
    };

    this.formRef = React.createRef();
    this.formSubmitRef = React.createRef();
    this.modalOk = this.modalOk.bind(this)
  }

  componentDidMount = () => {

  }

  componentWillReceiveProps = (nextProps: any) => {
    this.setState(nextProps);
    this.setState({ currentLoading: false });
    this.formRef.current?.setFieldsValue(nextProps.default);
  }

  modalOk = () => {
    this.props.ok?.call();
    this.formSubmitRef.current?.click()
  }

  modalCancel = () => {
    this.setState({ visible: false })
    this.props.cancel?.call();
  }

  formFinish = (param: any) => {
    this.setState({ currentLoading: true })
    this.props.finish?.call(this, param)
  }

  render = () => {
    return <Modal
      visible={this.state.visible}
      title={this.props.title}
      cancelText={this.props.cancelText}
      okText={this.props.okText}
      okButtonProps={{ loading: this.state.loading === true ? this.state.currentLoading : false }}
      onOk={this.modalOk}
      onCancel={this.modalCancel}
    >
      <Form
        autoComplete="off"
        initialValues={this.props.default}
        ref={this.formRef}
        onFinish={this.formFinish}
      >
        {this.props.children}
        <Button type="primary" style={{ display: 'none' }} htmlType="submit" ref={this.formSubmitRef}>Submit</Button>
      </Form>
    </Modal>
  }
}
