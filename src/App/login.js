

import React from "react";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
        this.state = {
            loginState: null,
            token: ""
        }
    }

    onLoginSubmitClick = (event) => {
        document.querySelector('#login-waitpopup').classList.add("loading");
        document.getElementsByTagName('body')[0].classList.add('o-disable-events');
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
                localStorage.setItem('token', Response.token)
                if (Response.status == 200) {
                    document.querySelector('#login-waitpopup').classList.remove("loading");
                    document.getElementsByTagName('body')[0].classList.remove('o-disable-events');
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
                    <button className="float-right btn-sm m-1 ui primary button" onClick={this.onRegisterSubmit}>Sign Up</button>
                </div>
            </div>
            <div className=" container col-md-4  o-login">
                <h2 className="col-md-12 App pb-3"> Orange People </h2>

                <form className="ui large form" id="login-waitpopup" onSubmit={this.onLoginSubmitClick}  >
                    <div className="ui stacked">
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="user icon"></i>
                                <input type="text" name="email" name="user" ref={this.username} placeholder="E-mail address" />
                            </div>
                        </div>
                        <div className="field">
                            <div className="ui left icon input">
                                <i className="lock icon"></i>
                                <input type="password" name="password" ref={this.password} placeholder="Password" />
                            </div>
                        </div>
                        <input type="submit" className="ui fluid btn btn-primary btn-block ui download primary button" value="Login" />
                    </div>
                    <div className="ui error message"></div>
                    {this.state.loginState === false && (<h2> Enter a valid login details</h2>)}
                    {this.state.loginState && (<h2> successfully loged in</h2>)}
                </form>

            </div>

        </div>
        );
    }
};


export default Login