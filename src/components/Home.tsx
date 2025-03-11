import { Link } from "react-router-dom"
export const Home = ()=>{
    return <div>
        <Link to={'/1'}><button >1</button></Link>
        <Link to={'/2'}><button >2</button></Link>
        <Link to={'/3'}><button >3</button></Link>
        <Link to={'/4'}><button >4</button></Link>
        <Link to={'/5'}><button >5</button></Link>
        <Link to={'/6'}><button >6</button></Link>
        
    </div>
}