
import React from 'react';
import Row from 'react-bootstrap/Row';
import UserItem from './UserItem';
class users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: props.users
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.users !== prevProps.users) {
            this.setState({ users: this.props.users })
        }
    }
    render() {
        return (
            <Row>
                {
                    this.state.users.map(user => {
                        return (
                            <> <UserItem user={user} key={user.emp_id} />
                            </>
                        );
                    })
                }
            </Row >
        )
    }
}

export default users;