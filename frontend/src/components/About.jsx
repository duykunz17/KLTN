import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <div>
            <div className="where_togo_area">
                    <div className="row justify-content-center">
                        <div className="container">
                                <h2 style={{color:'white'}}>VỀ CHÚNG TÔI</h2>
                        </div>
                    </div>
            </div> 
            <section>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="p-5">
                                <img className="img-fluid rounded-circle" style={{width:'400px',height:'300px'}} src="images/ducduy.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="p-5">
                                <h2 className="display-4">TRINH DUC DUY</h2>
                                <p style={{fontSize:'25px'}}>Fullstack Web Developer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 order-lg-2">
                            <div className="p-4">
                                <img className="img-fluid rounded-circle" style={{width:'400px',height:'300px'}} src="images/thanhduy.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 order-lg-1">
                            <div className="p-4">
                                <h2 className="display-4">PHAM THANH DUY</h2>
                                <p style={{fontSize:'25px'}}>Software Developer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        );
    }
}

export default About;