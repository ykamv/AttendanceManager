import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import './View.css';
import Button from 'react-bootstrap/Button';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';

const View = () => {
    const [user, setUser] = useState({});

    // const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/get/${id}`)
            .then((resp) => setUser({ ...resp.data[0] }));
    }, [id]);

    return (
        <>

            <div className='container4'>
                <MDBCard style={{ maxWidth: '22rem' }}>
                    <MDBCardBody>
                        <MDBCardTitle>Student Detail</MDBCardTitle>
                        <MDBCardText>
                            <div>
                                <p>Student Detail</p>
                            </div>

                            <div>
                                <strong>ID: </strong>
                                <span>{id}</span>
                            </div>

                            <div>
                                <strong>Name: </strong>
                                <span>Anmaya</span>
                            </div>

                            <div>
                                <strong>Attendance: </strong>
                                <span>{user.day}</span>
                            </div>
                        </MDBCardText>
                        <MDBBtn>
                            <Link to="/">
                                <Link to="/">
                                    <Button variant="primary">Go Back</Button>{' '}
                                </Link>
                            </Link >
                        </MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </div>
        </>


    );
};

export default View;
