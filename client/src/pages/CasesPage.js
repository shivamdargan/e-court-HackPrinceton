import CasesSection from "../components/Dashboard/CasesSection";
import SideNav from "../components/Dashboard/SideNav";
import '../assets/css/dashboard.css';

const CasePage=() =>{
    return (
        <div className="dashboard">
            <SideNav/>
            <CasesSection/>
        </div>
    );
}

export default CasePage;