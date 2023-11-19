import {FC} from "react";

interface LoadingProps {

}

const Loading: FC<LoadingProps> = ({}) => {

    return (
        <div className="relative px-2.5 md:px-5 lg:px-10 xl:px-20 max-w-[1520px] w-full min-h-screen mx-auto">
            <div className="absolute left-1/2 top-[35%] -translate-y-1/2 -translate-x-1/2">
                <svg className="inline-block animate-spin h-8 w-8 text-dark"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                            strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        </div>

    );
};

export default Loading;