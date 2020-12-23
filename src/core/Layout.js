import  React from  'react';
import Menu from "./Menu";
import { Jumbotron, Container } from 'reactstrap';
import '../styles/Styles.scss'
const Layout = ({title="Title", description="Description" , className, children}) => (

  <div>
    <Menu/>
    {/* <Jumbotron >
      <Container fluid>
        <h1 className="display-3">{title}</h1>
        <p className="lead">{description}</p>
      </Container>
    </Jumbotron> */}
    <div className='container-fluid mt-3 mb-3'><div className={className}>{children}</div></div>
    
  </div>
);

export default  Layout;