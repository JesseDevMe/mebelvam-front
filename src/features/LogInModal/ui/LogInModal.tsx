'use client'
import {FC, useEffect, useState} from "react";
import account from "../../../../public/header/personal_account.svg";
import Image from "next/image";
import {LogIn} from "@/widgets/LogIn";
import {ResetPassword} from "@/widgets/ResetPassword";
import {Register} from "@/widgets/Register";
import useLogInStore from "@/features/LogInModal/store/useLogInStore";

enum WINDOW {
    LOG_IN,
    RESET_PASSWORD,
    REGISTER,
}

interface LogInButtonProps {
}

const LogInModal: FC<LogInButtonProps> = ({ }) => {
    const isOpen = useLogInStore(state => state.isOpen);
    const setClose = useLogInStore(state => state.setClose);
    const [curWindow, setCurWindow] = useState<WINDOW>(WINDOW.LOG_IN);

    useEffect(() => {
       if (isOpen) {
           document.body.classList.add('overflow-hidden');
       } else {
           document.body.classList.remove('overflow-hidden');
       }

       return () => {
           document.body.classList.remove('overflow-hidden');
       }
    }, [isOpen])

    function bgClickHandler() {
        setClose();
    }

    useEffect(() => {
        if (!isOpen) setCurWindow(WINDOW.LOG_IN)

    }, [isOpen])

    return (
        <div onClick={bgClickHandler} className={`fixed left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.667)] justify-center items-center ${isOpen ? 'flex' : 'hidden'} z-[110]`}>
            <div
                className="relative max-w-[600px] w-full h-[700px] mx-3 rounded bg-fon px-6 pt-20"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div
                    className="p-2.5 absolute right-5 top-3.5 cursor-pointer"
                    onClick={setClose}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 19L19 1.32233" stroke="#292A2D" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M1 1L19 18.6777" stroke="#292A2D" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>

                {
                    curWindow === WINDOW.LOG_IN && <LogIn resetHandler={() => setCurWindow(WINDOW.RESET_PASSWORD)} registerHandler={() => setCurWindow(WINDOW.REGISTER)}/>
                }

                {
                    curWindow === WINDOW.RESET_PASSWORD && <ResetPassword backHandler={() => setCurWindow(WINDOW.LOG_IN)}/>
                }

                {
                    curWindow === WINDOW.REGISTER && <Register backHandler={() => setCurWindow(WINDOW.LOG_IN)}/>
                }
            </div>
        </div>
    );
};

export default LogInModal;