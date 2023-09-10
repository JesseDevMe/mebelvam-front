import {FC} from "react";
import {Slider} from "@/shared/Slider";
import Image from "next/image";
import bg_slide1 from "@/../public/Pages/Home/Welcome/bg1.jpeg"
import bg_slide2 from "@/../public/Pages/Home/Welcome/bg2.jpeg"
import bg_slide3 from "@/../public/Pages/Home/Welcome/bg3.jpeg"

interface WelcomeProps {

}

const Welcome: FC<WelcomeProps> = ({}) => {

    return (
        <div>
            <Slider
                count={3}
            >
                <div className="flex h-[300px] md:h-[410px] lg:h-[700px]">
                    <div className="relative flex-shrink-0 w-full bg-[linear-gradient(225deg,rgba(41,42,45,0)0%,rgba(41,42,45,0)30%,rgba(41,42,45,0.9)100%)]">
                        <Image fill className="object-cover -z-10" src={bg_slide1} alt=""/>

                        <div className="text-fon font-montserrat flex flex-col gap-y-2.5 lg:gap-y-7 px-2.5 md:px-5 lg:px-10
                        xl:px-20 mt-[150px] md:mt-[220px] lg:mt-[450px] lg:max-w-2xl md:text-[16px]"
                        >
                            <h2 className="text-xl md:text-3xl lg:text-5xl font-semibold">Мебель Вам</h2>
                            <p className="font-light font-roboto md:font-montserrat max-w-[200px] md:max-w-none">Интернет-магазин мебели в Севастополе</p>
                            <a
                                className="w-fit py-2 px-3.5 md:py-4 md:px-12 md:mt-5 lg:mt-0 text-dark bg-fon border-solid border-[1px]
                                    rounded border-[rgba(41,42,45,0.15)] font-semibold"
                               href="#"
                            >
                                Каталог товаров
                            </a>
                        </div>
                    </div>

                    <div className="relative flex-shrink-0 w-full bg-[linear-gradient(225deg,rgba(41,42,45,0)0%,rgba(41,42,45,0)30%,rgba(41,42,45,0.9)100%)]">
                        <Image fill className="object-cover -z-10" src={bg_slide2} alt=""/>

                        <div className="text-fon font-montserrat flex flex-col gap-y-2.5 lg:gap-y-7 px-2.5 md:px-5 lg:px-10
                        xl:px-20 mt-[150px] md:mt-[220px] lg:mt-[450px] lg:max-w-2xl md:text-[16px]"
                        >
                            <h2 className="text-xl md:text-3xl lg:text-5xl font-semibold">Мебель Вам</h2>
                            <p className="font-light font-roboto md:font-montserrat max-w-[200px] md:max-w-none">Интернет-магазин мебели в Севастополе</p>
                            <a
                                className="w-fit py-2 px-3.5 md:py-4 md:px-12 md:mt-5 lg:mt-0 text-dark bg-fon border-solid border-[1px]
                                    rounded border-[rgba(41,42,45,0.15)] font-semibold"
                                href="#"
                            >
                                Каталог товаров
                            </a>
                        </div>
                    </div>

                    <div className="relative flex-shrink-0 w-full bg-[linear-gradient(225deg,rgba(41,42,45,0)0%,rgba(41,42,45,0)30%,rgba(41,42,45,0.9)100%)]">
                        <Image fill className="object-cover -z-10" src={bg_slide3} alt=""/>

                        <div className="text-fon font-montserrat flex flex-col gap-y-2.5 lg:gap-y-7 px-2.5 md:px-5 lg:px-10
                        xl:px-20 mt-[150px] md:mt-[220px] lg:mt-[450px] lg:max-w-2xl md:text-[16px]"
                        >
                            <h2 className="text-xl md:text-3xl lg:text-5xl font-semibold">Мебель Вам</h2>
                            <p className="font-light font-roboto md:font-montserrat max-w-[200px] md:max-w-none">Интернет-магазин мебели в Севастополе</p>
                            <a
                                className="w-fit py-2 px-3.5 md:py-4 md:px-12 md:mt-5 lg:mt-0 text-dark bg-fon border-solid border-[1px]
                                    rounded border-[rgba(41,42,45,0.15)] font-semibold"
                                href="#"
                            >
                                Каталог товаров
                            </a>
                        </div>
                    </div>

                </div>
            </Slider>
        </div>
    );
};

export default Welcome;