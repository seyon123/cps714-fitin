import Container from "react-bootstrap/Container";
import "./Footer.css";

function Footer(){

    return(
        <Container className="footer text-center align-items-center p-3" fluid>
            <p className="m-0 mb-2" >Copyright © 2022 FitIn.</p>
            <p className="m-0">Created with ❤ by: <a className = "link" href="https://github.com/seyon123">Seyon</a>, 
            <a className = "link" href="https://github.com/lyjacky11"> Jacky</a>, 
            <a className = "link" href="https://github.com/JawwadK"> Jawwad</a>, 
            <a className = "link" href="https://github.com/NoahColacoRyerson"> Noah</a>, 
            <a className = "link" href="https://github.com/raj-mistry"> Raj</a>, 
            <a className = "link" href="https://github.com/LeslieWen"> Leslie</a>,
            <a className = "link" href="https://github.com/hbskhan"> Hamdan</a>, 
            <a className = "link" href="https://github.com/tiago-a-ribeiro"> Tiago</a>, 
            <a className = "link" href="https://github.com/wsimmalavong"> William</a></p>
        </Container>
    );
}
export default Footer