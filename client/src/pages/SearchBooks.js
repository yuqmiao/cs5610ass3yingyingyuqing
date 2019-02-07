import React, { Component } from "react";
import API from "../utils/API";
import Jumbotron from "../components/Jumbotron";
import { Container, Row, Col } from "../components/Grid";
import SearchForm from "../components/SearchForm";
import SearchResult from "../components/SearchResult"


class SearchBooks extends Component {
    state = {
        search: "",
        results: [],
        error: ""
    };


    handleInputChange = event => {
        this.setState({ search: event.target.value })
    }

    handleFormSubmit = event => {
        event.preventDefault();
        API.getGoogleSearchBooks(this.state.search)
            .then(res => {
                if (res.data.items === "error") {
                    throw new Error(res.data.items);
                }
                else {
                    let results = res.data.items
                    results = results.map(result => {
                        let book = {
                            id: result.id,
                            title: result.volumeInfo.title,
                            author: result.volumeInfo.authors.map(author => author),
                            description: result.volumeInfo.description,
                            image: result.volumeInfo.imageLinks.thumbnail,
                            link: result.volumeInfo.infoLink
                        }
                        return book;
                    })
                    this.setState({ results: results, error: "" })
                } 
            })
            .catch(err => this.setState({ error: err.items }));
    }

    render() {
        return (
            <Container fluid>
                <Jumbotron>
                    <h1 className="text-white">Search some book</h1>
                </Jumbotron>
                <Container>
                    <Row>
                        <Col size="12">
                            <SearchForm
                                handleFormSubmit={this.handleFormSubmit}
                                handleInputChange={this.handleInputChange}
                            />
                        </Col>
                    </Row>
                </Container>
                <br></br>
                <Container>
                    <SearchResult results={this.state.results} />
                </Container>
            </Container>
        )
    }


}

export default SearchBooks