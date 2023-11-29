'use client'
import {FC, useEffect, useState} from "react";
import useLogInStore from "@/features/LogInModal/store/useLogInStore";
import dynamic from "next/dynamic";
import {LoadingSpinner} from "@/shared/LoadingSpinner";

const LogIn = dynamic(
    () => import('@/widgets/LogIn/ui/LogIn'),
    {loading: () => <div className="w-fit mx-auto mt-8"><LoadingSpinner/></div>}
);
const ResetPassword = dynamic(
    () => import('@/widgets/ResetPassword/ui/ResetPassword'),
    {loading: () => <div className="w-fit mx-auto mt-8"><LoadingSpinner/></div>}
);
const Register = dynamic(
    () => import('@/widgets/Register/ui/Register'),
    {loading: () => <div className="w-fit mx-auto mt-8"><LoadingSpinner/></div>}
);

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
        <div
            onClick={bgClickHandler}
            className={`fixed left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.667)] 
            ${isOpen ? 'flex' : 'hidden'} z-[110] overflow-auto px-3 py-5`}
        >
            <div
                className="relative max-w-[600px] w-full h-[660px] rounded bg-fon px-6 pt-20 mx-auto my-auto"
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