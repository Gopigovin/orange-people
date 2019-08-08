

import React  from "react";

class Login extends React.Component{
    constructor(props){
   
        super(props);   
     
        this.username = React.createRef();
        this.password = React.createRef();
        this.state = {
            loginState: null,
            token:""
        } 
     
      }

      onLoginSubmitClick = (event) => {
  event.preventDefault();

  
  fetch('http://localhost:3000/login', {      
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          login: {
              username: this.username.current.value,
              password: this.password.current.value
          }
      })
   
  }).then(response => response.json())
  .then(function (Response) {
      debugger
      localStorage.setItem('token',Response.token)
      if (Response.status == 200) {
          this.setState({
              loginState: true,             
          })
          this.props.history.push('/admin');  
        
          
      } else {
          this.setState({
              loginState: false
          })
      }
      
  }.bind(this)).catch(function (error) {
      debugger
  });

 
}
  onLoginSubmit = () => {
   
    this.props.history.push('/');
  }
  onRegisterSubmit = () => {
    this.props.history.push('/register');
  }
    render() {
        return (<div>
              <div className="p-header App col-md-12 px-5">       
          <span className="" ></span> 
          <div>
          <button  className="btn btn-outline-primary float-right btn-sm m-1" onClick={this.onRegisterSubmit}>Sign Up</button>                    
          </div>           
        </div>
        <div className=" container col-md-4  o-login">
        <h2 className="col-md-12 App pb-3"> Data Tracker </h2> 
            <form className="form" onSubmit={this.onLoginSubmitClick}  >              
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="text" className="form-control" placeholder="User" name="user" ref={this.username}></input>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="text" className="form-control" placeholder="Password" name="password" ref={this.password}></input>
                </div>
                <input type="submit"  className="btn btn-outline-primary col-md-12" value="Login" />                          
                {this.state.loginState===false && (<h2> Enter a valid login details</h2>)}
                {this.state.loginState && (<h2> successfully loged in</h2>)}                
            </form>
   
        </div>
    
        </div>            
        );
    }
};


export default Login