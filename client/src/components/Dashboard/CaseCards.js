import '../../assets/css/casesSection.css';

const CaseCards=(props) =>{
    return (
        <div className='card'>
            <div className='date'>
                <h4>{props.d}</h4>
            </div>
            <div className='body'>
                <h2>{props.t}</h2>
                <a href='/case'><p>{props.l}</p></a>
            </div>
        </div>
    );
}

export default CaseCards;