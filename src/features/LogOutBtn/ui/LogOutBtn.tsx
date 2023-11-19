'use client'
import React, {FC} from "react";
import {useRouter} from "next/navigation";
import useUserStore from "@/entities/User/store/useUserStore";

interface LogOutBtnProps {
    children: React.ReactNode,
    isRedirect?: boolean,
}

const LogOutBtn: FC<LogOutBtnProps> = ({ children, isRedirect }) => {
    const router = useRouter();
    const setIsAuth = useUserStore(state => state.setIsAuth);

    function logOutHandler() {
        localStorage.removeItem('token');
        setIsAuth(false);
        if (isRedirect) {
            router.back();
        }
    }

    return (
        <div className="cursor-pointer" onClick={logOutHandler}>
            {children}
        </div>
    );
};

export default LogOutBtn;