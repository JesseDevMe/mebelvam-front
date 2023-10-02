'use client'
import {FC, PropsWithChildren, ReactNode, useEffect, useRef} from "react";

interface ModalProps {
    open: boolean;
    children: ReactNode;
    setClose: () => void;
}

const Modal: FC<ModalProps> = ({open = false, setClose, children}) => {
    const modalRef = useRef<HTMLDivElement>(null)

    function bodyClickHandler(e: MouseEvent) {
        // @ts-ignore
        if (open && !modalRef.current?.contains(e.target)) {
            setClose();
        }
    }

    function scrollHandler() {
        if (open) {
            setClose();
        }
    }

    useEffect( () => {
        document.body.addEventListener('click', bodyClickHandler);
        window.addEventListener('scroll', scrollHandler);

        return () => {
            document.body.removeEventListener('click', bodyClickHandler);
            window.removeEventListener('scroll', scrollHandler);
        }
    },[open])


    return (
        <div ref={modalRef} className={`fixed top-0  w-[86vw] h-[105vh] md:w-2/5 md:shadow-[15px_10px_15px_-3px_rgba(0,0,0,0.1)]
                        bg-fon z-[70] transition-all duration-300 ${open? '-left-1' : '-left-full'} lg:hidden`}>
            {children}
        </div>
    );
};

export default Modal;