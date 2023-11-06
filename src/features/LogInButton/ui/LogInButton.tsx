'use client'
import {FC} from "react";
import useLogInStore from "@/features/LogInModal/store/useLogInStore";

interface LogInButtonProps {
    children: React.ReactNode;
}

const LogInButton: FC<LogInButtonProps> = ({ children }) => {
    const setLogInOpen = useLogInStore(state => state.setOpen)

    return (
        <div className="cursor-pointer inline-block" onClick={setLogInOpen}>
            {children}
        </div>
    );
};

export default LogInButton;