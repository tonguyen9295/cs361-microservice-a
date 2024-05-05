# Microservice A
Microservice A is a microservice developed for Phillip Ly's CS 361 project. 

## Goal of Microservice A

Microservice A's main purpose is to retrieve data from a MySQL database to provide to Phillip's project.

Data specifically retrieved is weights that were entered by a user within the past 30 days, along wtih the average of these weights.

The retrieved data is used to show the user the weights logged by him or her within the past 30 days, the average of these weights, and provide a motivational paragraph that incorporates the average to encourage the user with continual goal for weight maintenance, loss, or gain.

## Communication Contract

<h4>In order to programmatically <b>request</b> data from Microservice A, for Phillip's main application on the frontend with use of React</h4>

1) Microservice A backend folder must be placed within the root of the main application

2) To request the average of the user's entered weight within the past 30 days, then the following API must be called /fetched:  http://localhost:4283/weight

3) This API can be called via the following example:
```
await fetch('http://localhost:4282/past-weight')
```

4) To request the user's entered weight within the past 30 days, then the following API must be called / fetched:  http://localhost:4282/past-weight-avg

5) This API can be called via the following example:
```
await fetch('http://localhost:4282/past-weight-avg')
```

<h4>In order to programmatically <b>receive</b> data from Microservice A</h4>

1) Microservice A backend folder must be placed within the root of the main application

2) To receive the user's entered weight within the past 30 days, then the following code example could be used in Weights.js page of the component folder of main application:
```
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
```

3) To utilize and render the user's entered weight data for the past 30 days, then the following code example could be used in Weights.js page of the component folder of main application in the code section of returning page content:
```
                    <Row>
                        <h2 style={{paddingTop: "20px"}}>
                            Weights Entered Within Past 30 Days
                        </h2>
                        <ul>
                            {pastWeight.map((value, index) => 
                            <li style={{color: "red", width: "33%", float: "left", textAlign: "center", listStyleType: "none", border: "1px dotted black"}} key={index}>
                                {value.Weight} lbs
                            </li>)}
                        </ul>
                    </Row>
```

4) To request the average of the user's entered weight within the past 30 days, then the following code example could be used in Weights.js page of the component folder of main application:
```
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
```

5) To utilize and render the average of the user's entered weight within the past 30 days and show the average in a motivational paragraph, then the following code example could be used in Weights.js page of the component folder of main application in the code section of returning page content:
```
                    <Row>
                        <h2 style={{paddingTop: "20px"}}>
                            Average of Entered Weights Within Past 30 Days
                        </h2>
                            {pastWeightAvg.map((value, index) => 
                            <p style={{color: "red", textAlign: "center", fontSize: "150%", border: "1px dotted black"}} key={index}>
                                {value.averageWeight} lbs
                            </p>)}
                    </Row>
                    <Row>
                        <h2 style={{paddingTop: "20px"}}>
                            You Can Do It!
                        </h2>
                            {pastWeightAvg.map((value, index) => 
                            <p style={{color: "red", textAlign: "center", fontSize: "100%", border: "1px dotted black"}} key={index}>
                                Your average weight within the past 30 days has been {value.averageWeight} lbs!
                                That is <u>ABSOLUTELY</u> amazing. 
                                <br></br>
                                <br></br>
                                No matter how difficult the journey is, keep up the hard work.
                                Remember, safe daily calorie deficit and an increase but consistent physical activity do work for most.
                                <br></br>
                                <br></br>
                                It will absolutely <em>pay off</em>!
                            </p>)}
                    </Row>
```

<h4>UML Diagram</h4>

![UML_microservice_A drawio](https://github.com/tonguyen9295/cs361-microservice-a/assets/91217918/ebb147bc-07d0-4f95-a1cd-96e3433a2591)
