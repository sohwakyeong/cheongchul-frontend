import Footer from "../footer/Footer";
import "./Layout.css";

const Layout = ({children}) => {
    return (
        <div id="Layout">
            <div className="content">
            {children}
            </div>
        <footer>
            <Footer />
        </footer>
        </div>
    );
};

export default Layout;