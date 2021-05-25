import React from "react";
import { useState } from "react";


import { Form, Row, Col, Accordion, Card, NavLink } from "react-bootstrap";
function Addsell(){
    const[val1,setval1]=useState(0);
    const[val2,setval2]=useState(0);
    const[val3,setval3]=useState(0);
    const[val4,setval4]=useState(0);
    const[val5,setval5]=useState(0);
    const[val6,setval6]=useState(0);
    const inc1= (event)=>{
    
        setval1(val1+1);
        
    };
    const dec1=(event)=>{
        if(val1>0)
        setval1(val1-1);
        
    };
    const inc2= (event)=>{
    
        setval2(val2+1);
        
    };
    const dec2=(event)=>{
        if(val2>0)
        setval2(val2-1);
        
    };
    const inc3= (event)=>{
    
        setval3(val3+1);
        
    };
    const dec3=(event)=>{
        if(val3>0)
        setval3(val3-1);
        
    };
    const inc4= (event)=>{
    
        setval4(val4+1);
        
    };
    const dec4=(event)=>{
        if(val4>0)
        setval4(val4-1);
        
    };
    const inc5= (event)=>{
    
        setval5(val5+1);
        
    };
    const dec5=(event)=>{
        if(val5>0)
        setval5(val5-1);
        
    };
    const inc6= (event)=>{
    
        setval6(val6+1);
        
    };
    const dec6=(event)=>{
        if(val6>0)
        setval6(val6-1);
        
    };
  
  
    return(
       <div>
        <h1 className="text-center" > BUY / SELL STOCKS </h1>
        <br/>
        <Accordion style={{ width: "70%", margin: "auto" }}>
        <Row
          className="p-2 pb-2 pt-2 m-0"
          style={{ border: "1px lightgray solid", width: "100%" }}
        >
          <Col style={{ padding: "5px" }}>SYMBOL</Col>
          <Col xs={3} className="col-me" >
            price
          </Col>
          <Col xs={1} className="col-me" style={{ textAlign: "center" }} >
             buy
          </Col>
          <Col xs={1} className="col-me" style={{ textAlign: "center" }} >
            sell
          </Col>
          <Col xs={3} className="col-me" style={{ textAlign: "center" }} >
             curval
          </Col>
        </Row>
        
              <Card>
                  <Card.Header>
                    <Row >
                      <Accordion.Toggle
                        as={NavLink}
                        className="col"
                        
                      >
                        
                        Tesla
                        
                      </Accordion.Toggle>
                      <Col xs={3} className="col-me text-info" >
                           17
                      </Col>
                      <Col  xs={1} className="col-me" style={{ textAlign: "center"   }} onClick={inc1}>
                        
                          
                            +   
                      </Col>
                      <Col xs={1} className="col-me text-primary" style={{ textAlign: "center" }} onClick={dec1}>
                       -
                      </Col>
                      <Col xs={3} className="col-me text-warning" style={{ textAlign: "center" }} >
                       {val1}
                                              </Col>
                    </Row>
                  </Card.Header>
                
                </Card>

                <Card>
                  <Card.Header>
                    <Row >
                      <Accordion.Toggle
                        as={NavLink}
                        className="col"
                        
                      >
                        apple
                      </Accordion.Toggle>
                      <Col xs={3} className="col-me text-info" >
                           12
                      </Col>
                      <Col xs={1} className="col-me"style={{ textAlign: "center" }}onClick={inc2}>
                        
                          
                            +   
                      </Col>
                      <Col xs={1} className="col-me text-primary" style={{ textAlign: "center" }} onClick={dec2}>
                           -
                      </Col>
                      <Col xs={3} className="col-me text-warning" style={{ textAlign: "center" }} >
                        {val2}
                      </Col>
                    </Row>
                  </Card.Header>
                
                </Card>
                
                <Card>
                  <Card.Header>
                    <Row >
                      <Accordion.Toggle
                        as={NavLink}
                        className="col"
                        
                      >
                        DT
                      </Accordion.Toggle>
                      <Col xs={3} className="col-me text-info" >
                           21
                      </Col>
                      <Col xs={1} className="col-me"style={{ textAlign: "center" }}onClick={inc3}>
                            +   
                      </Col>
                      <Col xs={1} className="col-me text-primary" style={{ textAlign: "center" }} onClick={dec3}>
                       -
                      </Col>
                      <Col xs={3} className="col-me text-warning" style={{ textAlign: "center" }} >
                        {val3}
                      </Col>
                    </Row>
                  </Card.Header>
                
                </Card>
                
                <Card>
                  <Card.Header>
                    <Row >
                      <Accordion.Toggle
                        as={NavLink}
                        className="col"
                        
                      >
                        Reliance
                      </Accordion.Toggle>
                      <Col xs={3} className="col-me text-info" >
                           27
                      </Col>
                      <Col xs={1} className="col-me"style={{ textAlign: "center" }}onClick={inc4}>
                        
                          
                            +   
                      </Col>
                      <Col xs={1} className="col-me text-primary" style={{ textAlign: "center" }} onClick={dec4}>
                       -
                      </Col>
                      <Col xs={3} className="col-me text-warning" style={{ textAlign: "center" }} >
                        {val4}
                      </Col>
                    </Row>
                  </Card.Header>
                
                </Card><Card>
                  <Card.Header>
                    <Row >
                      <Accordion.Toggle
                        as={NavLink}
                        className="col"
                        
                      >
                        tata
                      </Accordion.Toggle>
                      <Col xs={3} className="col-me text-info" >
                           12
                      </Col>
                      <Col xs={1} className="col-me"style={{ textAlign: "center" }} onClick={inc5}>
                        
                          
                            +   
                      </Col>
                      <Col xs={1} className="col-me text-primary" style={{ textAlign: "center" }} onClick={dec5}>
                       -
                      </Col>
                      <Col xs={3} className="col-me text-warning" style={{ textAlign: "center" }} >
                        {val5}
                      </Col>
                    </Row>
                  </Card.Header>
                
                </Card><Card>
                  <Card.Header>
                    <Row >
                      <Accordion.Toggle
                        as={NavLink}
                        className="col"
                        
                      >
                        uber
                      </Accordion.Toggle>
                      <Col xs={3} className="col-me text-info" >
                           18
                      </Col>
                      <Col xs={1} className="col-me"style={{ textAlign: "center" }}onClick={inc6}>
                        
                          
                            +   
                      </Col>
                      <Col xs={1} className="col-me text-primary" style={{ textAlign: "center" }} onClick={dec6}>
                       -
                      </Col>
                      <Col xs={3} className="col-me text-warning" style={{ textAlign: "center" }} >
                        {val6}
                      </Col>
                    </Row>
                  </Card.Header>
                
                </Card>


           </Accordion>
        <br/>
        <br/>
        <br/>
        <br/>
       </div>
    );
}



export default Addsell;