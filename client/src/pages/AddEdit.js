import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import './AddEdit.css';

const initialState = {
    name: "",
    div: ""
}



const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const { name, div } = state;

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !div){
            toast.error("Please provide value to each input field!");
        }
        else{
            axios.post("http://localhost:5000/api/post",{
                name,
                div
            }).then(()=>{
                setState({name: "", div:""})
            })
            .catch((err)=>toast.server(err.response.data));
            toast.success("Student added successfully.")
            setTimeout(()=>{
                navigate('/');
            },500)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({...state,[name]: value})
    }

    return (
        <div className='container'>
            <form className='form' onSubmit={handleSubmit}>
                <label htmlFor='name'>Name:</label>
                <input type="text" id='name' name='name' placeholder='Enter Name' value={name} onChange={handleInputChange} />
                <label htmlFor='div'>Enter Division(A or B):</label>
                <input type="text" id='div' name='div' placeholder='Enter Div' value={div} onChange={handleInputChange} />
                <input type="submit" value="save"/>
                <Link to="/">
                    <input type="button" value="Go back" />
                </Link>
            </form>
        </div>
    );
};

export default AddEdit;
