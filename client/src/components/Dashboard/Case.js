import SideNav from "./SideNav";
import '../../assets/css/casesSection.css';

const Case=() =>{
    return (
        <div className="dashboard">
            <SideNav/>
            <div className="right"> 
                <div className="top">
                    <h1>Aman vs Manoj Kumar</h1>
                </div>
                <div className="one">
                    <h3>Description</h3>
                    <p> Import or export of counterfeit coin.—Whoever imports into 1[India], or exports therefrom, any counterfeit ... coin, knowing or having reason to believe that the same is counterfeit, shall be punished with imprisonment of either description
</p>
                </div>
                <div className="one two">
                    <div className="l">
                        <div>
                            <h3>CNR NO:</h3><h6>HFNE420691232022</h6>
                        </div>
                        <div>
                            <h3>Clause NO:</h3><h6>403</h6>
                        </div>
                        <div>
                            <h3>Court Location:</h3><h6>Mumbai High Court</h6>
                        </div>
                    </div>
                    <div className="l r">
                        <div>
                            <h3>Date of Filing:</h3><h6>1/04/22</h6>
                        </div>
                        <div>
                            <h3>Last Hearing Date:</h3><h6>Not Heard Yet</h6>
                        </div>
                        <div>
                            <h3>Next Hearing Date:</h3><h6>Not Heard Yet</h6>
                        </div>
                    </div>
                </div>
                <div className="one">
                    <h3>Details of Accused</h3>
                    <div className="two">
                        <div className="l">
                            <div>
                                <h3>Name:</h3><h6>Manoj Kumar</h6>
                            </div>
                            <div>
                                <h3>Phone NO:</h3><h6>9721387218</h6>
                            </div>
                        </div>
                        <div className="l r">
                            <div>
                                <h3>Gender:</h3><h6>M</h6>
                            </div>
                            <div>
                                <h3>Age:</h3><h6>32</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Case;