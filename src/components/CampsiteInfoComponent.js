import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, Breadcrumb, BreadcrumbItem, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            isModalOpen: false,
            touched: {
                author: false
            }
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    validate(author) {
        const error={
            author: ''
        };
    

        if (this.state.touched.author) {
            if (author.length < 2) {
                error.author = 'Must be at least 2 characters'
            } else if (author.length < 15) {
                error.author = 'Must be 15 characters or less'
            }
        }; 
    }

    handleBlur = (field) => () => {
        this.setState({
            touched: {...this.setState.touched, [field]: true}
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    render() {
        const error = this.validate(this.state.author);

        return (
        <div>
            <Button className="fa fa-pencil fa-lg" outline onClick={this.toggleModal}> Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>
                    Submit Comment
                </ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={values => this.handleSubmit(values)}>
                        <div className="form-group">
                            <Label>Rating</Label>
                            <Control.select model=".rating" id="rating" name="rating"  className="form-control" > 
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                        </div>
                        <div className="form-group">
                            <Label>Your Name</Label>
                            <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control"
                            validators={{
                                required,
                                minLength: minLength(2),
                                maxLength: maxLength(15) }} />
                                <Errors className="text-danger" model=".author" show="touched" component="div" messages={{
                                    minLength: 'Must be at least 2 characters', maxLength: 'Must be 15 characters or less'
                                }} />
                        </div>
                        <div className="form-group">
                        <Label>Comment</Label>
                            <Control.textarea model=".text" id="text" name="text" rows="6" className="form-control" />
                        </div>
                        <div className="form-group">
                            <Button type="submit" color="primary">Submit</Button>
                        </div>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
        );
    }
}

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

function RenderComments({comments, addComment, campsiteId}) {
    if (comments) { //If truthy, render comments with date/time, author and text.
        return(
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map ((comment =>
                    <div key={comment.id}>
                        <div>{comment.text}</div>
                        <div>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} <br /><br /></div>
                    </div>))}
                    <CommentForm campsiteId={campsiteId} addComment={addComment} />
            </div>)
        }
        return <div />
    }

function CampsiteInfo(props) {
    //Loading screen
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }

    //Error handling
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }

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
                        <RenderComments
                            comments={props.comments}
                            addComment={props.addComment}
                            campsiteId={props.campsite.id}
                        />
                    </div>
                </div>
            </div>
        )
    }
        //If no, return div.
        return <div />
}

export default CampsiteInfo;