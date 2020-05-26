import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
class Nav extends React.Component {

    render() {
        return (
            <Navbar >
                <Navbar.Brand>User Directory</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        Signed in as: Admin
                    </Navbar.Text>
                </Navbar.Collapse>

            </Navbar >
        );
    }
}

export default Nav;