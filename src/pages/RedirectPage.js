import {Navigate} from "react-router-dom";
import {useParams} from "react-router-dom";

function RedirectPage() {
    const {id} = useParams();
    window.localStorage.setItem("APPLICATION_ID", id);
    return <Navigate to="/signin"/>;
}

export default RedirectPage;
