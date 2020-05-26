import React from 'react';
import Users from './Users';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserDetails from './UserDetails';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }
    componentDidMount() {
        const that = this;
        fetch('https://van-code.github.io/react-usersDir/json/MOCK_DATA.json')
            .then(function (users) {
                return users.json()
            }).then(function (resp) {
                const data = resp;
                that.setState({ users: data });
            }).catch(function (err) {
                console.log('err', err)
            })
    }
    renderUsers() {
        if (this.state.users.length > 0) {
            return (
                <Users users={this.state.users} >
                </Users >
            )
        } else {
            return (
                <Col md={12}>No users found.</Col>
            )
        }
    }
    renderModal = (user) => {
        if (this.state.show) {
            return (<UserDetails user={user} show={this.state.show}
                handleChange={this.handleChange} handleHide={this.handleHide}></UserDetails>)
        }
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col md={12} class="text-left">
                        <strong>{this.state.users.length}</strong> user(s)

                    </Col>
                    <Col md={12}>
                        {this.renderUsers()}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Home;