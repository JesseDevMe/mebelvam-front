import {FC} from "react";
import Image from "next/image";
import bg from "@/../public/Pages/Home/Feedback/bg.jpeg"
import {comments} from "@/entities/Comment/model";
import {Comment} from "@/entities/Comment";
import {SliderRL} from "@/shared/Slider";

interface FeedbackProps {

}

const Feedback: FC<FeedbackProps> = ({}) => {

    return (
        <div id="feedback" className="relative overflow-hidden pt-4 bg-[rgba(242,242,241,0.80)]">
            <Image src={bg} fill style={{objectFit: "cover", zIndex:-20}} alt=""/>
            <h2 className="text-center text-xl font-montserrat font-semibold">Отзывы</h2>
                <div className="mt-5 px-7 md:pl-12 lg:px-20 flex gap-x-7 overflow-x-scroll snap-mandatory snap-x scroll-smooth will-change-scroll pb-8">
                    {
                        comments.map((comment) =>
                            <Comment authorName={comment.authorName} content={comment.content}/>
                        )
                    }
                </div>
        </div>
    );
};

export default Feedback;