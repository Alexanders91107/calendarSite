import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React,{useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


  let breaks = [];

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
  function Years() {
    let years = [];
    let months = [];
    let date =  new Date().getFullYear();

    for(let i = 0; i < 10; i++){
      years.push(              
        <Nav.Item>
          <Nav.Link eventKey={date + i}>{date + i}</Nav.Link>
        </Nav.Item>
      );
    }
    for(let i = 0; i < 10; i++){
      months.push(        
        <Tab.Pane eventKey={date + i}>
          {Months(date + i)}
        </Tab.Pane>     
      );
    }
    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey={date}>
        <Row>
          <Col sm={1}>
            <Nav variant = "pills" className="flex-column">
              {years}
            </Nav>
          </Col>
          <Col sm={11}>
            <Tab.Content>
              {months}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
  function Months(year) {
    let months = [["Jan", "January"], ["Feb", "Febuary"], ["Mar", "March"], ["Apr", "April"], ["May", "May"], ["Jun", "June"], ["Jul", "July"], ["Aug", "August"], ["Sep", "September"], ["Oct", "October"], ["Nov", "November"], ["Dec", "December"]];
    let code = [];
    for(let i = 0; i < 12; i++){
      code.push(
        <Tab eventKey= {months[i][0]} title={months[i][0]}>
          {days(daysInMonth( i+1 , year), months[i][1], year)}
        </Tab>
      );
    }

    return (
      <Tabs
        defaultActiveKey="Jan"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        {code}
      </Tabs>
    );
  }

  function days(numOfDays, monthName, year){
    let code = [];
    let tempCode = [];
    let weekday = "";
    let weekdays = new Map([[0, "Sunday"], [1, "Monday"], [2, "Tuesday"], [3, "Wednesday"], [4, "Thursday"], [5, "Friday"], [6, "Saturday"]]);

    let emptyDays = 0;
    let jStart = 1;
    let jEnd = 7;
    let lastDay = 0;

    for(let i=0; i <= numOfDays/7; i++){
      tempCode = [];
      if(emptyDays !== 0){
         i -= 4;
         emptyDays = 0;
      }
      jStart = lastDay + 1;
      jEnd = jStart + 6;
      for(let j=jStart; j <= jEnd; j++){
        if(j <= numOfDays){
          let day = j;
          lastDay = day;
          const d = new Date( monthName + " " + day + ", " + year + " 01:15:00");
          weekday = weekdays.get(d.getDay());
          if(j === 1 && i === 0 && d.getDay() !== 0){
            for(let k = 0; k < d.getDay(); k++){
              jEnd -= 1;
              emptyDays+=1;

              tempCode.push(
                <Col fluid className="text-center">
                <Card Style="color: lightgrey; background-color: lightgrey;">
                  <Card.Header Style = "color: lightgrey; background-color: lightgrey;">Day 0</Card.Header>
                  <Card.Body Style="color: lightgrey; background-color: lightgrey;">
                    <Card.Title Style="color: lightgrey; background-color: lightgrey;">{monthName}</Card.Title>
                    <Card.Text Style="color: lightgrey; background-color: lightgrey;">
                      {weekday}, {monthName}, 0 
                    </Card.Text>
                    <Button variant="primary" Style="color: lightgrey; background-color: lightgrey; border: lightgrey;">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>
              );
            }
          }
          tempCode.push(
          <Col fluid className="text-center">
            <Card>
              <Card.Header>Day {day}</Card.Header>
              <Card.Body>
                <Card.Title>{monthName}</Card.Title>
                <Card.Text>
                  {weekday}, {monthName} {day}, {year} 
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          );
          if(day === numOfDays){
            for(let k = 0; k < 7 - (d.getDay() + 1); k++){
              tempCode.push(
                <Col fluid className="text-center">
                <Card Style="color: lightgrey; background-color: lightgrey;">
                  <Card.Header Style = "color: lightgrey; background-color: lightgrey;">Day 0</Card.Header>
                  <Card.Body Style="color: lightgrey; background-color: lightgrey;">
                    <Card.Title Style="color: lightgrey; background-color: lightgrey;">{monthName}</Card.Title>
                    <Card.Text Style="color: lightgrey; background-color: lightgrey;">
                      {weekday}, {monthName}, 0 
                    </Card.Text>
                    <Button variant="primary" Style="color: lightgrey; background-color: lightgrey; border: lightgrey;">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>
              );
            }
          }
        }
        else{
          break;
        }
      }
      code.push(<Row xs = "7" className = "mt-2">{tempCode}</Row>);
    }
    return code;
  }

  function DayFormOptions(month, year){
    let tempCode = [];
    for(let i = 1; i <= daysInMonth(month, year); i++){
      tempCode.push(<option value={i}>{i}</option>);
    }
    return tempCode;
  }

  function MonthFormOptions(){
    let tempCode = [];
    for(let i = 1; i <= 12; i++){
      tempCode.push(<option value={i}>{i}</option>);
    }
    return tempCode;
  }

  function YearFormOptions(){
    let tempCode = [];
    let date =  new Date().getFullYear();
    for(let i = 0; i < 10; i++){
      tempCode.push(<option value={date+i}>{date+i}</option>);
    }
    return tempCode;
  }

  function addBreak(startYear, startMonth, startDay, endYear, endMonth, endDay){
    let temp = [];
    let temp2 = []
    temp.push(startYear);
    temp.push(startMonth);
    temp.push(startDay);
    temp2.push(temp);
    temp = []
    temp.push(endYear);
    temp.push(endMonth);
    temp.push(endDay);
    temp2.push(temp);
    breaks.push(temp2); 
  }
  function App() {
    let date =  new Date().getFullYear();
    let startYear = date;
    let startMonth = 1;
    let startDay = 1;
    let endYear = date;
    let endMonth = 1;
    let endDay = 1;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [value,setValue]=useState('');
    const handleSelect=(e)=>{
      setValue(e)
    }
    const setStartYear=()=>{handleSelect(); startYear = value}
    const setStartMonth=()=>{handleSelect(); startMonth = value}
    const setStartDay=()=>{handleSelect(); startDay = value}

    const setEndYear=()=>{handleSelect(); endYear = value}
    const setEndMonth=()=>{handleSelect(); endMonth = value}
    const setEndDay=()=>{handleSelect(); endDay = value}

    const saveBreak=()=>{handleClose(); addBreak(startYear, startMonth, startDay, endYear, endMonth, endDay)}
    return (
      <div className="App">
        <Navbar expand="lg" bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand href="#home">Calendar App</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Item>
                <Button variant = "primary" onClick={handleShow}>
                  Add Break
                </Button>
              </Nav.Item>
            </Nav>
          </Container>
        </Navbar>
        <Container fluid>
          {Years()}
        </Container>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Break</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Start: </h4>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                Year
              </InputGroup.Text>
              <Form.Select aria-label="Default select example" onChange={setStartYear}>
                {YearFormOptions()}
              </Form.Select>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                Month
              </InputGroup.Text>
              <Form.Select aria-label="Default select example" onChange={setStartMonth}>
                {MonthFormOptions()}
              </Form.Select>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                Day
              </InputGroup.Text>
              <Form.Select aria-label="Default select example" onChange={setStartDay}>
                {DayFormOptions(startYear, startMonth)}
              </Form.Select>
            </InputGroup>

            <h4>End: </h4>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                Year
              </InputGroup.Text>
              <Form.Select aria-label="Default select example" onChange={setEndYear}>
                {YearFormOptions()}
              </Form.Select>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                Month
              </InputGroup.Text>
              <Form.Select aria-label="Default select example" onChange={setEndMonth}>
                {MonthFormOptions()}
              </Form.Select>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                Day
              </InputGroup.Text>
              <Form.Select aria-label="Default select example" onChange={setEndDay}>
                {DayFormOptions(endYear, endMonth)}
              </Form.Select>
            </InputGroup>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={saveBreak}>
              Save Changes
            </Button>
          </Modal.Footer>
      </Modal>
      </div>
    );
  }



export default App;
