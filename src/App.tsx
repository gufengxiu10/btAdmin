import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Layout from "./Layout"
export default class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {}
  }


  render = () => {
    return <div className="App">
      <Layout />
    </div>;
  }
};
