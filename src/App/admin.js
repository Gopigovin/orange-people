import React from 'react';
import serialize from 'form-serialize';
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import AddUser from './adduser';
import View from './view';
import AddRent from '../addrent';
import DashBoard from './dashboard';


class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.toggleClick = this.toggleClick.bind(this);
    this.state = {
      userData: null,
      addModule: false,
      loginState: false,
      submitted: false,
      dashModule: false,
      viewModule: false,
      addRentModule: false,
      testCompleted: false,
      formData: null,
      activeListItem: null,
      v: 0,
      friendOptions: [
        {
          key: 'Jenny Hess',
          text: 'Jenny Hess',
          value: 'Jenny Hess',
          image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
        }
      ]
    }
  }


  onAddRentSubmit = function (event) {

    event.preventDefault();
    var form = document.querySelector('#data');
    ;
    var addRentData = serialize(form, { hash: true });
    addRentData = { "username": addRentData.username, "monthData": [{ "amount": addRentData.amount, "balance": addRentData.balance, "date": addRentData.date }] }
    fetch('http://localhost:3000/addrent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        addRentData
      })
    }).then(response => response.json())
      .then(function (data) {

        if (data.status == 204) {

        } else {

        }

      }.bind(this)
      ).catch(function (error) {


      }.bind(this));
  }.bind(this);


  onAddUserSubmit = function (event) {
    debugger
    event.preventDefault();
    var form = document.querySelector('#data');
    document.querySelector('#loading').classList.add("loading");
    var addData = serialize(form, { hash: true });
    addData["key"] = "user";
    // addData["uniqueID"] = "p"+;
    fetch('http://localhost:3000/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        addData
      })
    }).then(response => response.json())
      .then(function (data) {

        if (data.status == 204) {

        } else {
          debugger
          document.querySelector('#loading').classList.remove("loading");

        }

      }.bind(this)
      ).catch(function (error) {


      }.bind(this));
  }.bind(this);

  componentDidMount() {
    fetch('http://localhost:3000/admin', {
      method: 'GET',
    }).then(response => response.json())
      .then(function (data) {

        if (data.status == 204) {
          this.setState({
            userData: null, loginState: true
          })
        } else {
          var arr = [];
          var obj = {};
          data.forEach(function (value, index, array) {
            obj = {
              key: value["_id"],
              text: value["name"],
              value: value["_id"]
            };
            arr.push(obj);
          });
          debugger;
          this.setState({
            userData: data, loginState: false,
            friendOptions: arr

          });
        }
      }.bind(this)
      ).catch(function (error) {
        this.setState({
          userData: null,
          loginState: false,
        })
      }.bind(this));
  }
  toggleClick() {

    this.dockBar.toggle();
  }

  onListClick = (event) => {
    document.querySelector(".sidebar-item.active") && document.querySelector(".sidebar-item.active").classList.remove("active")
    event.currentTarget.className += " active";
    if (event.currentTarget.getAttribute("id") == "adduser") {
      this.setState({
        addModule: true
        , dashModule: false,
        viewModule: false,
        testCompleted: false,
        onInitTest: false,
        submitted: false,
        addRentModule: false,
      })
    }
    if (event.currentTarget.getAttribute("id") == "dash") {
      this.setState({
        dashModule: true,
        addModule: false,
        viewModule: false,
        testCompleted: false,
        onInitTest: false,
        addRentModule: false,
        submitted: false
      })
    }
    if (event.currentTarget.getAttribute("id") == "view") {
      this.setState({
        viewModule: true,
        addModule: false,
        dashModule: false, addRentModule: false,
        testCompleted: false,
        onInitTest: false,
      })
    }

    if (event.currentTarget.getAttribute("id") == "addrent") {
      this.setState({
        addRentModule: true,
        viewModule: false,
        addModule: false,
        dashModule: false,
        testCompleted: false,
        onInitTest: false,
      })
    }


  }

  logout = () => {
    localStorage.removeItem("token");
    this.props.history.push("/logout");
  }
  onInitTest = () => {
    this.setState({
      onInitTest: true,
      addModule: false
    })
  }


  render() {
    if (this.state.question && this.state.question.length > 0) {
      var ques = Object.keys(this.state.question).map(function (key, index, array) {
        var namesList = this.state.question[index].options.map(function (name) {
          return <div>
            <h5  >
              <input type="radio" className="btn-primary" value={name} name={this.state.question[index]._id} />
              {name}
            </h5>
          </div>
        }.bind(this));
        return <div className="p-3">
          <h6> {"Question " + index}</h6>
          <h4 id={this.state.question[index]._id}> {this.state.question[index].question}</h4>
          {namesList}
        </div>
      }.bind(this))
    }
    return (
      <div>
        <div className="p-header App col-md-12 px-4 or-h-b-b loading">
          <span className="fas fa-bars float-left org-hamburger" onClick={this.toggleClick} ></span>
          <span className="" ></span>

          <button className="ui primary button float-right btn-sm m-1" onClick={this.logout} >LogOut</button>

        </div>
        <div className="or-target w-100 h-100">
          <SidebarComponent id="dockSidebar" target={".or-target"} ref={Sidebar => this.dockBar = Sidebar} enableDock={true} isOpen={true} dockSize="72px" width="220px">
            <div className="dock">
              <ul>
                <li className="sidebar-item active" id="dash" ref={this} onClick={this.onListClick}>
                  <span className="fa  fa-user-plus sidebar-icons" />
                  <span className="e-text mx-4" title="menu">DashBoard</span>
                </li>
                <li className="sidebar-item" id="adduser" onClick={this.onListClick} >
                  <span className="fa fa-user-plus sidebar-icons" />
                  <span className="e-text mx-4" title="home">Add User</span>
                </li>
                <li className="sidebar-item" id="view" onClick={this.onListClick}>
                  <span className="fa fa-users sidebar-icons" />
                  <span className="e-text mx-4" title="profile">View User</span>
                </li>
                <li className="sidebar-item" id="addrent" onClick={this.onListClick}>
                  <span className="fa fa-credit-card sidebar-icons" />
                  <span className="e-text mx-4" title="info">Add Rent</span>
                </li>
                <li className="sidebar-item" id="settings" onClick={this.onListClick}>
                  <span className="fa fa-cogs sidebar-icons" />
                  <span className="e-text mx-4" title="settings">Settings</span>
                </li>
              </ul>
            </div>
          </SidebarComponent>
          <div id="main-content container-fluid" className="p-5" style={{ height: "calc( 100vh - 30px )", overflow: 'scroll' }}>
            {
              (!this.state.addModule && !this.state.addRentModule && !this.state.viewModule) ?
                <div className="App p-5">
                  <DashBoard></DashBoard>
                </div> : null
            }
            {this.state.addModule &&
              <AddUser {...this}></AddUser>
            }
            {
              this.state.testCompleted && <h2>Test has been completed Successfully </h2>
            }
            {this.state.viewModule &&
              <View {...this}></View>
            }

            {this.state.addRentModule &&
              <AddRent {...this}></AddRent>
            }
          </div>
        </div>
      </div >

    )
  }
}
export default Admin