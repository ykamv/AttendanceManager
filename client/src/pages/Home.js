import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { toast } from 'react-toastify';
import axios from "axios";
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import Button from 'react-bootstrap/Button';

const Home = () => {
  const dateValue: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 20);
  const minDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 6);
  const maxDate: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 26);

  const [finalDate, setFinalDate] = useState(false);
  const current = new Date(finalDate);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFinalDate(value);
  }

  const [data, setData] = useState([]);
  const navigate = useNavigate();
  // cant use async await inside useEffect thats why made a seperate function
  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
  }

  // fetches all data on initial page load
  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = (id) => {
    if (window.confirm("Are you sure that you want to delete that Student Detail?")) {
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("Student info deleted successfully!");
      setTimeout(() => navigate('/'), 500);
    }
    else {
      setTimeout(() => navigate('/'), 100);
    }
  }

  const present = (id) => {
    if (!finalDate) {
      alert("Select a date first!");
      setTimeout(() => navigate('/'), 100);
    }
    else if (window.confirm("Are you sure that you want to mark this Student present?")) {
      axios.post(`http://localhost:5000/api/present/${id}`, {
        day: current.getDate(),
        month: current.getMonth(),
        year: current.getYear()
      });
      toast.success("Student marked present!");
      setTimeout(() => navigate('/'), 500);
    }
  }

  const absent = (id) => {
    if (!finalDate) {
      alert("Select a date first!");
      setTimeout(() => navigate('/'), 100);
    }
    else if (window.confirm("Are you sure that you want to mark this Student absent?")) {
      axios.post(`http://localhost:5000/api/absent/${id}`, {
        Value: finalDate
      });
      toast.success("Student marked absent!");
      setTimeout(() => navigate('/'), 500);
    }
  }

  return (
    <div className="table_container">
      <div className='heading'>Attendance Manager</div>
      <table className='styled-table'>
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Calendar</th>
            <th style={{ textAlign: "center" }}>Attendance</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>
                  <DatePickerComponent id="datepicker" value={dateValue} min={minDate} max={maxDate} onChange={handleInputChange} />
                </td>
                <td>
                  <Link to={`/present/${item.id}`}>
                    <Button variant="success" onClick={() => present(item.id)}>Present</Button>{' '}
                  </Link>
                  <Link to={`/absent/${item.id}`}>
                    <Button variant="warning" onClick={() => absent(item.id)}>Absent</Button>{' '}
                  </Link>

                </td>
                <td>
                  <Link to={`/delete/${item.id}`}>
                  <Button variant="danger" onClick={() => deleteContact(item.id)}>Delete</Button>{"  "}
          
                  </Link>
                  <Link to={`/view/${item.id}`}>
                  <Button variant="secondary">Result</Button>{' '}
                  </Link>
                </td>
              </tr>
            )
          }
          )}
        </tbody>
      </table><br/>
      <Link to="/addStudent">

        <Button variant="primary">Add Student</Button>{' '}
      </Link>
    </div>

  );
};

export default Home;
