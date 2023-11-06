import {FC} from "react";
import Image from "next/image";
import bg from "@/../public/Pages/Home/Feedback/bg.jpeg"
import {comments} from "@/entities/Comment/model";
import {Comment} from "@/entities/Comment";

interface FeedbackProps {

}

const Feedback: FC<FeedbackProps> = ({}) => {

    return (
        <div className="relative">
            <div id="feedback" className="rounded-[10px] max-w-[1520px] w-full mx-auto relative overflow-hidden pt-4 pb-4 bg-[rgba(242,242,241,0.80)]">
                <Image src={bg} fill style={{objectFit: "cover", zIndex: -1}} alt=""/>
                <h2 className="text-center text-xl font-montserrat font-semibold">Отзывы</h2>

                <div className="mt-5 px-7 md:pl-12 lg:px-20 flex gap-x-7 overflow-auto snap-mandatory snap-x
                            scroll-smooth will-change-scroll pb-8 select-none">
                    {
                        comments.map((comment) =>
                            <Comment key={comment.authorName} authorName={comment.authorName}
                                     content={comment.content}/>
                        )
                    }
                </div>
            </div>
            <div className="bg-light absolute top-0 left-0 w-full h-full -z-50"></div>
        </div>
    );
};

export default Feedback;