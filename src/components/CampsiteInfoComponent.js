import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class CampsiteInfo extends React.Component{
    constructor(props) {
        super(props);
        const campsite = this.props.selectedCampsite;
    }

    renderCampsite(campsite) { //Returns cards with the campsite image, the name and description are overlaid.
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    renderComments(comments) {
        if (comments) { //If truthy, render comments with date/time, author and text.
            return(
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map ((comment =>
                        <div key={comment.id}>
                            <div>{comment.text}</div>
                            <div>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} <br /><br /></div>
                        </div>))}
                </div>)
            }
            return <div />
        }

    render() {
        //is object 'campsite' truthy? Pass campsite via props.
        if (this.props.campsite) {
            //If yes, return empty div with row class.
            return (
                <div className="container">
                    <div className="row">
                        {this.renderCampsite(this.props.campsite)}{this.renderComments(this.props.campsite.comments)}
                    </div>
                </div>
            )
        }
        else {
            //If no, return div.
            return <div />
        }
    }
}

export default CampsiteInfo;