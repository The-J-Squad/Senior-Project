import React from 'react';
import PropTypes from 'prop-types';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        }
    }

    onSubmit(e){
        this.props.onSubmit(this.state.username, this.state.password).then(error =>{
            this.setState({ error });
        });
        
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label>
                    Username:
                    <div>
                        <input type="text" value={this.state.username} onChange={(event) => this.setState({ username: event.target.value })} placeholder="Username" required/>
                    </div>
                </label>
                <label>
                    Password:
                    <div>
                        <input type="password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} placeholder="Password" required/>
                    </div>
                </label>
                <div className="errorMessage">{this.state.error}</div>
                <button type="submit"> Submit </button>
            </form>
        );
    }
}

LoginPage.propTypes = {
    onSubmit: PropTypes.func
};
export default LoginPage;
