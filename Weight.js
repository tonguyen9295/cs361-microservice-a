import React, { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

/*Import components from react-bootstrap */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Alert from 'react-bootstrap/Alert';
import { listClasses } from '@mui/material';

function Weight() {

    /*
    logic to obtain the 30 most recently entered weight and save data to pastWeight state
    */
    const [pastWeight, setPastWeight] = useState([]);
    useEffect(() => {
        fetchWeight();
    }, []);
    const fetchWeight = async () => {
        try {
            const response = await fetch('http://localhost:4282/past-weight');
            if (response.ok) {
                const data = await response.json();
                setPastWeight(data);
            } else {
                console.error('Error fetching data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    /*
    logic to get the average of the 30 most recently entered weight and save data to pastWeightAvg state
    */
    const [pastWeightAvg, setPastWeightAvg] = useState([]);
    useEffect(() => {
        fetchWeightAvg();
    }, []);
    const fetchWeightAvg = async () => {
        try {
            const response = await fetch('http://localhost:4282/past-weight-avg');
            if (response.ok) {
                const data = await response.json();
                setPastWeightAvg(data);
            } else {
                console.error('Error fetching data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const [data, setData] = useState([]);
    const [data2, setData2] = useState([["Date", "Weight"]])

    const [weight, setWeight] = useState(0);
    const [goal, setGoal] = useState(false);

    // Side effect for loading component after each render
    // Data is loaded once on load 
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:4283/weight');
            if (response.ok) {
                const data = await response.json();
                const formattedData = data.map(obj => Object.values(obj)); // Convert fetched data to array format
                const formattedDate = formattedData.map(obj => {
                    const formattedDate = obj[0].slice(0, 10); // Extract the first 10 characters
                    return [formattedDate, obj[1]];
                })
                setData2(prevData => [...prevData, ...formattedDate]); // Append fetched data to existing data
            } else {
                console.error('Error fetching data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Form data which is a useState object
    // Note some fields are set to the default values if not selected
    const [formData, setFormData] = useState({
        date: '',
        weight: ''
    });

    const marks = [
        {
            value: 1,
            label: '1lb',
        },
        {
            value: 100,
            label: '100lb',
        },
        {
            value: 200,
            label: '200lb',
        },
        {
            value: 300,
            label: '300lb',
        },
        {
            value: 400,
            label: '400lb',
        },
        {
            value: 500,
            label: '500lb',
        },
    ];
    ;

    const options = {
        title: "Weight",
        curveType: "function",
        legend: { position: "bottom" },
    };

    const [value, setValue] = useState(250); // Initial value for the slider

    const handleSliderChange = (event, newValue) => {
        setValue(newValue)
    };

    // handleChange arrow function called everytime a field is filled out
    // Destructure e.target which has name,target
    // update state with the previous formData object and new attribute:value pair
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(weight)
        if (formData.weight == value) {
            setGoal(!goal)
        }
        // Convert weight to number
        const weightNumber = parseFloat(weight);
        try {
            const response = await fetch('http://localhost:4283/weight', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Handle success
                console.log('Weight added successfully');
                setFormData({
                    date: '',
                    weight: '',
                })
            }
        } catch (error) {
            console.error('Could not add student', error);
        }
    };

    return (
        <section>
            <Container fluid className="basic-info" id="signup">
                <Container className="content">
                    <Row>
                        <Col>
                            <Chart
                                chartType="LineChart"
                                width="100%"
                                height="500px"
                                legendToggle
                                data={data2}
                                options={options}

                            />
                            <Slider
                                name="slide"
                                id="slide"
                                valueLabelDisplay="auto"
                                aria-label="term slider"
                                defaultValue={250}
                                onChange={handleSliderChange}
                                min={1}
                                max={500}
                                marks={marks}
                                color="secondary"
                            />
                            <h2>Goal Weight: {value}</h2>
                            {goal && (<><Alert variant={'success'}>
                                You have successfully hit your goal weight!
                            </Alert>
                            </>)}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control type="date" value={formData.date} name="date" onChange={handleChange} required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Current Weight</Form.Label>
                                    <Form.Control type="weight" placeholder="Current Weight in lbs" value={formData.weight} name="weight" onChange={handleChange} required />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <h2 style={{paddingTop: "20px"}}>
                            Most 30 Recently Entered Weights
                        </h2>
                        <ul>
                            {pastWeight.map((value, index) => 
                            <li style={{color: "red", width: "33%", float: "left", textAlign: "center", listStyleType: "none", border: "1px dotted black"}} key={index}>
                                {value.Weight} lbs
                            </li>)}
                        </ul>
                    </Row>
                    <Row>
                    <h2 style={{paddingTop: "20px"}}>
                        Average of the 30 Entered Weights
                    </h2>
                        {pastWeightAvg.map((value, index) => 
                        <p style={{color: "red", textAlign: "center", fontSize: "150%", border: "1px dotted black"}} key={index}>
                            {value.averageWeight} lbs
                        </p>)}
                    </Row>
                </Container>
            </Container>
        </section>
    )
}

export default Weight


