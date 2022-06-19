import { User } from "../models/user";

interface INavbarProps {
 currentUser: User | undefined,
 setCurrentUser: (nextUser: User | undefined) => void
}

function Navbar(props: INavbarProps) {

}

export default Navbar;