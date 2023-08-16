import { Link } from "react-router-dom";
import { auth } from "../configuration/firebase";
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut} from 'firebase/auth'

export const Navbar = () =>{
    const [user] = useAuthState(auth);

    const signUserOut = async () => {
        await signOut(auth);
    };

    return (
        <div className="navbar">
            <div className="links">
                <Link to="/"> Home </Link>
                {!user ? (
                    <Link to="/login"> Login </Link>
                ) : (
                    <Link to="/addpost"> +Post </Link>
                )}
                
            </div>
            <div className="user">
                {user && (
                <>
                    <p> {user?.displayName} </p>
                    <img referrerPolicy="no-referrer" src={user?.photoURL || ""} width="100" height="100"/>
                    <button onClick={signUserOut}>Log Out</button>
                </>
                )}
            </div>
        </div>
    );
};