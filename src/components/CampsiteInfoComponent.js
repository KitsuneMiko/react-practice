import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';



function RenderCampsite({campsite}) { //Returns cards with the campsite image, the name and description are overlaid.
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments}) {
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

function CampsiteInfo(props) {
    //is object 'campsite' truthy? Pass campsite via props.
    if (props.campsite) {
        //If yes, return empty div with row class.
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                    <div className="row">
                        <RenderCampsite campsite ={props.campsite} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
        )
    }
        //If no, return div.
        return <div />
}

export default CampsiteInfo;