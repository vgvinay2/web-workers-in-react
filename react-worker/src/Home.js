import React, { Component } from "react";
import ReactCountdownClock from "react-countdown-clock";
import worker from "./worker.js";
import WebWorker from "./workerSetup";
import Clusterize from 'react-clusterize';
import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import "./App.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      visible: false
    };
  }

  fetchUsers = () => {
    const users = [];

    const userDetails = {
      name: "Jane Doe",
      email: "jane.doe@gmail.com",
      id: 1
    };

    for (let i = 0; i < 10000000; i++) {
      userDetails.id = i++;
      userDetails.dateJoined = Date.now();

      users.push(userDetails);
    }

    this.setState({
      count: users.length
    });
  };

  fetchWebWorker = (props) => {
    console.log('fetaching from web worker', this.worker);
    this.worker.postMessage("Fetch Users", this.worker);
     // console.log('before click', this.worker)
    this.worker.addEventListener("message", event => {
      console.log('after clcik', event.data)
      this.setState({
        count: event.data.length
      });
      console.log('After click', event);
    });
  };

  componentDidMount = () => {
    this.worker = new WebWorker(worker);
    console.log('this.worker',this.worker)
  };

  showModal = (val) => {
    this.setState({
      visible: val,
    });
  };
  render() {
const rows = [];
const maxRows = 10000;
for (let i = 0; i < maxRows; ++i) {
    rows[i] = (
        <div style={{ borderBottom: '1px solid #f0f0f0', padding: '5px 10px' }}>
            Item #{i + 1}
        </div>
    );
}
    rows.length = maxRows;
    console.log('rows.length', rows.length)
    return (
      <div className="App-bottom">
  <Button type="primary" onClick={() => this.showModal(true)}>
          Open Modal
  </Button>
  <Modal
    className = 'test-modal-data'
    title="Basic Modal"
    visible={this.state.visible}
    onOk={this.handleOk} 
    onOk={() => this.showModal(false)}
    onCancel={() => this.showModal(false)}
  >
     <Clusterize rows={rows} scrollTop={5}/>
  </Modal>
<section className="App-table-bottom" style={{height: '350px'}}>
  <Clusterize rows={rows} scrollTop={5}/>
</section>
        <section className="App-left">
          <ReactCountdownClock
            seconds={100}
            color="#000"
            alpha={0.9}
            size={300}
          />
          <p className="text-center">Total User Count: {this.state.count}</p>
          <button className="btn-direct" onClick={this.fetchUsers}>
            Fetch Users Directly
          </button>
        </section>

        <section className="App-right">
          <ReactCountdownClock
            seconds={100}
            color="#e56"
            alpha={0.9}
            size={300}
          />
          <p className="text-center">Total User Count: {this.state.count}</p>
          <button className="btn-worker" onClick={this.fetchWebWorker}>
            Fetch Users with Web Worker
          </button>
        </section>
      </div>
    );
  }
}

export default Home;
