import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: props.show,
            user: props.user,
            movie: '',
            gender: '',
            name: '',
            film: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this)
    }
    componentDidMount(props) {
        this.getFilmDetails(props)
    }

    handleChange(event) {
        const field = event.target.id.replace('form', '').toLowerCase()
        let value = event.target.value
        switch (field) {
            case 'name':
                this.setState({ name: value })
                break;
            case 'gender':
                this.setState({ gender: value })
                break;
            case 'movie':
                this.setState({ movie: value });
                break;
            default:
            //none
        }

    }
    getFilmDetails(props) {
        const that = this;
        let movie = this.state.movie !== "" ? this.state.movie : this.state.user.movie;
        movie = encodeURI(movie);
        let url = `http://www.omdbapi.com/?t=${movie}&apikey=219a8559`
        fetch(url)
            .then(function (resp) {
                return resp.json()
            }).then(function (data) {
                if (data.Response !== 'False') {
                    that.setState({ film: data })
                } else {
                    that.setState({ film: data.Error })
                }
            });
    }

    handleCancel() {
        this.setState({ user: this.props.user })
        this.props.handleHide()
    }
    closeModal() {
        this.props.handleHide()
    }
    handlePreview() {
        this.getFilmDetails()
    }
    handleSubmit() {
        let user = this.state.user;
        ['gender', 'movie', 'name'].forEach(prop => {
            if (this.state[prop] !== '' && user[prop] !== this.state[prop]) {
                user[prop] = this.state[prop]
            } else {
                user[prop] = this.state.user[prop]
            }
        })
        this.setState({ user: user })
        this.props.handleHide()
    }
    renderForm(user) {
        let form =
            <Col md={6}>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={this.state.name} placeholder={user.name} onChange=
                            {this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formMovie">
                        <Form.Label>Favorite Movie</Form.Label>
                        <Form.Control type="text" value={this.state.movie} placeholder={user.movie} onChange=
                            {this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control type="text" value={this.state.gender} placeholder={user.gender} onChange=
                            {this.handleChange} />
                    </Form.Group>
                </Form>
            </Col>
        return form
    }
    renderFilm(film) {
        let element = '';
        if (typeof (film) === 'object') {
            let image = film.Poster !== 'N/A' ? film.Poster : 'https://via.placeholder.com/150';
            element = <Col md={6}>
                <img src={image} alt={film.Title} width="150px" class="text-center"></img>
                <p><strong>{film.Title}</strong></p>
                <p>{film.Rated} - {film.Runtime} - {film.Released}</p>
                <p>{film.Plot}</p>
                <em>Movie data credited to <a target="_blank" rel="noopener noreferrer" href="http://www.omdbapi.com/">OMDb API</a></em>
            </Col>
        } else {
            element = <Col md={6}>{film}</Col>
        }
        return element
    }
    render() {
        let show = this.state.show;
        let user = this.state.user;
        let film = this.state.film;

        return (
            <Modal show={show} size="xl">
                <Modal.Header closeButton onClick={this.handleCancel}>
                    <Modal.Title>User Edit</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        {this.renderForm(user)}
                        {this.renderFilm(film)}
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCancel}>Cancel</Button>
                    <Button onClick={this.handlePreview} >Preview</Button>
                    <Button onClick={this.handleSubmit} >Save</Button>
                </Modal.Footer>
            </Modal >
        )
    }
}

export default UserDetails;