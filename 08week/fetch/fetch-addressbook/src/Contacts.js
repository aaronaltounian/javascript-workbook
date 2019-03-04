import React, { Component } from 'react';
import { Container, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardGroup } from 'reactstrap'
import './App.js';

class Contacts extends Component {
    constructor(props) {
        super(props)
        this.state = {
          contacts: [],
        }
    }

    componentDidMount() {
        let count = 0;
        while (count < 9) {
            fetch('https://uinames.com/api/?ext')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.setState({
                        contacts: [...this.state.contacts, data],
                    })
                });
            count++;
        }
    }

    render() {
        function Contacts(user) {
            return ( 
                    <div>
                        <Card className="card">
                            <CardImg src={user.photo} alt="Card img cap" />
                            <CardBody>
                                <CardTitle>
                                    <h1>{user.name} {user.surname}</h1>
                                </CardTitle>
                                <CardSubtitle>
                                    <p>&#9742;: {user.phone}</p>
                                    <p>&#9993;: <a href=''>{user.email}</a></p>
                                    <p>DOB: {user.birthday.dmy}</p>
                                    <p>{user.region}</p>
                                </CardSubtitle>
                            </CardBody>
                        </Card>
                    </div>
            )
        }
        let users = this.state.contacts.map(Contacts);

        return (
            <div>
                <CardGroup className="cardRow">{users[0]}{users[1]}{users[2]}</CardGroup>
                <CardGroup className="cardRow">{users[3]}{users[4]}{users[5]}</CardGroup>
                <CardGroup className="cardRow">{users[6]}{users[7]}{users[8]}</CardGroup>
            </div>
        )
    }
}

export default Contacts;