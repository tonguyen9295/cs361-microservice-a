# Microservice A
Microservice A is a microservice developed for Phillip Ly's CS 361 project. 

## Goal of Microservice A

Microservice A's main purpose is to retrieve data from a MySQL database to provide to Phillip's project.

Data specifically retrieved is weights that were entered by a user within the past 30 days, along wtih the average of these weights. 

The retrieved data is used to show the user the weights logged by him or her within the past 30 days, the average of these weights, and provide a motivational paragraph to encourage the user with continual goal for weight maintenance, loss, or gain.

## Communication Contract

In order to programmatically <b>request</b> data from Microservice A, for Phillip's main application on the frontend with use of React:

1) Microservice A backend folder must be placed within the root of the main application

2a) To request the user's entered weight within the past 30 days, then the following API must be called / fetched:  http://localhost:4282/past-weight-avg

2b) The API must be called / fetched in the Weights.js page of the main application's component page.

2c) Example call when code is inserted in Weights.js page of the main application's component page:
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

3a) To request the average of the user's entered weight within the past 30 days, then the following API must be called /fetched:  http://localhost:4283/weight

3b) Example call when code is inserted in Weights.js page of the main application's component page:

3c) Example call:
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

In order to programmatically <b>receive</b> data from Microservice A:
