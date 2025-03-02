import {ClipLoader} from "react-spinners";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
    return (
        <div className="loading-overlay">
            <ClipLoader
                color="#5785fa"
            />
        </div>
    );
}
export default LoadingSpinner;