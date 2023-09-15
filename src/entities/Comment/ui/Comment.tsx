import {FC} from "react";

interface CommentProps {
    authorName: string;
    content: string;
}

const Comment: FC<CommentProps> = ({ authorName, content }) => {

    return (
        <div className="flex flex-col px-4 py-7 gap-y-4 max-w-[300px] snap-center w-full shrink-0">
            <h4 className="text-base font-montserrat font-semibold text-center">{authorName}</h4>
            <div className="flex gap-x-2.5 justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path d="M12.5357 2.11425C12.7071 1.70306 13.29 1.70429 13.4596 2.11619L16.3953 9.24576C16.4605 9.40408 16.6022 9.51803 16.7708 9.54778L23.9499 10.8147C24.3672 10.8883 24.5095 11.4151 24.186 11.6888L18.7486 16.2896C18.5975 16.4175 18.536 16.6225 18.5919 16.8124L20.6759 23.898C20.7992 24.3171 20.3634 24.6817 19.9726 24.4863L13.2236 21.1118C13.0828 21.0414 12.9172 21.0414 12.7764 21.1118L6.02741 24.4863C5.63663 24.6817 5.20084 24.3171 5.32412 23.898L7.40811 16.8124C7.46397 16.6225 7.40252 16.4175 7.2514 16.2896L1.8021 11.6787C1.48067 11.4067 1.61879 10.8835 2.03257 10.8056L9.23476 9.44993C9.4003 9.41877 9.53902 9.30635 9.60381 9.15086L12.5357 2.11425Z" fill="#FBF32D" stroke="#292A2D" strokeWidth="2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path d="M12.5357 2.11425C12.7071 1.70306 13.29 1.70429 13.4596 2.11619L16.3953 9.24576C16.4605 9.40408 16.6022 9.51803 16.7708 9.54778L23.9499 10.8147C24.3672 10.8883 24.5095 11.4151 24.186 11.6888L18.7486 16.2896C18.5975 16.4175 18.536 16.6225 18.5919 16.8124L20.6759 23.898C20.7992 24.3171 20.3634 24.6817 19.9726 24.4863L13.2236 21.1118C13.0828 21.0414 12.9172 21.0414 12.7764 21.1118L6.02741 24.4863C5.63663 24.6817 5.20084 24.3171 5.32412 23.898L7.40811 16.8124C7.46397 16.6225 7.40252 16.4175 7.2514 16.2896L1.8021 11.6787C1.48067 11.4067 1.61879 10.8835 2.03257 10.8056L9.23476 9.44993C9.4003 9.41877 9.53902 9.30635 9.60381 9.15086L12.5357 2.11425Z" fill="#FBF32D" stroke="#292A2D" strokeWidth="2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path d="M12.5357 2.11425C12.7071 1.70306 13.29 1.70429 13.4596 2.11619L16.3953 9.24576C16.4605 9.40408 16.6022 9.51803 16.7708 9.54778L23.9499 10.8147C24.3672 10.8883 24.5095 11.4151 24.186 11.6888L18.7486 16.2896C18.5975 16.4175 18.536 16.6225 18.5919 16.8124L20.6759 23.898C20.7992 24.3171 20.3634 24.6817 19.9726 24.4863L13.2236 21.1118C13.0828 21.0414 12.9172 21.0414 12.7764 21.1118L6.02741 24.4863C5.63663 24.6817 5.20084 24.3171 5.32412 23.898L7.40811 16.8124C7.46397 16.6225 7.40252 16.4175 7.2514 16.2896L1.8021 11.6787C1.48067 11.4067 1.61879 10.8835 2.03257 10.8056L9.23476 9.44993C9.4003 9.41877 9.53902 9.30635 9.60381 9.15086L12.5357 2.11425Z" fill="#FBF32D" stroke="#292A2D" strokeWidth="2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path d="M12.5357 2.11425C12.7071 1.70306 13.29 1.70429 13.4596 2.11619L16.3953 9.24576C16.4605 9.40408 16.6022 9.51803 16.7708 9.54778L23.9499 10.8147C24.3672 10.8883 24.5095 11.4151 24.186 11.6888L18.7486 16.2896C18.5975 16.4175 18.536 16.6225 18.5919 16.8124L20.6759 23.898C20.7992 24.3171 20.3634 24.6817 19.9726 24.4863L13.2236 21.1118C13.0828 21.0414 12.9172 21.0414 12.7764 21.1118L6.02741 24.4863C5.63663 24.6817 5.20084 24.3171 5.32412 23.898L7.40811 16.8124C7.46397 16.6225 7.40252 16.4175 7.2514 16.2896L1.8021 11.6787C1.48067 11.4067 1.61879 10.8835 2.03257 10.8056L9.23476 9.44993C9.4003 9.41877 9.53902 9.30635 9.60381 9.15086L12.5357 2.11425Z" fill="#FBF32D" stroke="#292A2D" strokeWidth="2"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path d="M12.5357 2.11425C12.7071 1.70306 13.29 1.70429 13.4596 2.11619L16.3953 9.24576C16.4605 9.40408 16.6022 9.51803 16.7708 9.54778L23.9499 10.8147C24.3672 10.8883 24.5095 11.4151 24.186 11.6888L18.7486 16.2896C18.5975 16.4175 18.536 16.6225 18.5919 16.8124L20.6759 23.898C20.7992 24.3171 20.3634 24.6817 19.9726 24.4863L13.2236 21.1118C13.0828 21.0414 12.9172 21.0414 12.7764 21.1118L6.02741 24.4863C5.63663 24.6817 5.20084 24.3171 5.32412 23.898L7.40811 16.8124C7.46397 16.6225 7.40252 16.4175 7.2514 16.2896L1.8021 11.6787C1.48067 11.4067 1.61879 10.8835 2.03257 10.8056L9.23476 9.44993C9.4003 9.41877 9.53902 9.30635 9.60381 9.15086L12.5357 2.11425Z" fill="#FBF32D" stroke="#292A2D" strokeWidth="2"/>
                </svg>
            </div>
            <p>
                { content }
            </p>
        </div>
    );
};

export default Comment;