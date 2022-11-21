import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

const delayMs = 350;
let setTimeoutInstance;

export default function LoadingSpinner({ isLoading, children }) {
    const [isDelayed, setIsDelayed] = useState(false);

    useEffect(() => {
        if (isLoading) {
            setIsDelayed(false);
            if (setTimeoutInstance) {
                clearTimeout(setTimeoutInstance);
            }
            setTimeoutInstance = setTimeout(() => {
                setIsDelayed(true);
            }, delayMs);
        }
    }, [isLoading]);

    return isDelayed ? (
        children
    ) : (
        <div className="vh-100 d-flex align-items-center justify-content-center">
            <Spinner
                animation="border"
                variant="light"
                role="status"
                style={{ width: "6rem", height: "6rem" }}
            >
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}
