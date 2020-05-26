import React from 'react';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import UserDetails from './UserDetails';
import Card from 'react-bootstrap/Card';

class userItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            show: false
        }
    }
    handleChange = (user) => {
        this.setState({ user: user })
    }
    handleShow = () => {
        this.setState({ show: true });
    }
    handleHide = () => {
        this.setState({ show: false })
    }
    renderModal = (user) => {
        if (this.state.show) {
            return (<UserDetails user={user} show={this.state.show}
                handleChange={this.handleChange} handleHide={this.handleHide}></UserDetails>)
        }
    }
    render() {
        let user = this.state.user;
        let button;
        button = <Button variant="primary" onClick={this.handleShow}>View/Edit</Button >;
        return (
            <>
                <Col xs={12} md={3} className="user">
                    <Card>
                        <Card.Img variant="top" src={user.image} role="presentation" alt={user.first_name} />
                        <Card.Body>
                            <Card.Title>{user.name}</Card.Title>
                            <Card.Subtitle>
                                {user.gender}
                            </Card.Subtitle>
                            <Card.Text>{user.movie}</Card.Text>
                            {button}
                        </Card.Body>
                    </Card>

                </Col>
                {this.renderModal(user)}

            </>
        );
    }
}

export default userItem;