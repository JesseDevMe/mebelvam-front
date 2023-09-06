import {FC, PropsWithChildren, ReactNode} from "react";

interface ModalProps {
    open: boolean;
    children: ReactNode;
}

const Modal: FC<ModalProps> = ({open = false, children}) => {


    return (
        <div className={`${open? '' : 'hidden'}`}>
            {children}
        </div>
    );
};

export default Modal;