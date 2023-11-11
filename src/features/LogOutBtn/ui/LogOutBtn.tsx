'use client'
import React, {FC} from "react";
import {useRouter} from "next/navigation";

interface LogOutBtnProps {
    children: React.ReactNode,
    isRedirect?: boolean,
}

const LogOutBtn: FC<LogOutBtnProps> = ({ children, isRedirect }) => {
    const router = useRouter();

    function logOutHandler() {
        localStorage.removeItem('token');
        if (isRedirect) {
            router.back();
        }
    }

    return (
        <div onClick={logOutHandler}>
            {children}
        </div>
    );
};

export default LogOutBtn;