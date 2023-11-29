import {FC} from "react";
import Image from "next/image";
import mockup from "@/../public/Pages/Home/AboutUs/Mockup.png"
import benefit1 from "@/../public/Pages/Home/AboutUs/benefit1.svg"
import benefit2 from "@/../public/Pages/Home/AboutUs/benefit2.svg"
import benefit3 from "@/../public/Pages/Home/AboutUs/benefit3.svg"
import benefit4 from "@/../public/Pages/Home/AboutUs/benefit4.svg"
import Link from "next/link";
import {fetchStatic} from "@/entities/Static";

interface AboutUsProps {

}

const AboutUs: FC<AboutUsProps> = async ({}) => {
    const staticInf = await fetchStatic();

    return (
        <div className="bg-light">
            <div id="aboutus"
                 className="max-w-[1520px] w-full mx-auto px-2.5 md:px-5 lg:px-10 xl:px-20 py-8 lg:py-12 md:grid md:grid-cols-[auto_auto] gap-x-5">
                <h2
                    className="text-xl lg:text-2xl font-montserrat font-semibold text-center leading-normal md:col-span-2"
                >
                    О нас
                </h2>
                <h3 className="text-base lg:text-xl mt-4 lg:mt-12 font-montserrat font-semibold text-center lg:text-start leading-normal md:col-span-2 lg:col-span-1">
                    Интернет-магазин мебели в Севастополе
                    <span className="block lg:inline"> &quot;МЕБЕЛЬ ВАМ&quot;</span>
                </h3>
                <div className="flex flex-col gap-y-4 mt-4 lg:mt-12">
                    <p>
                        У нас Вы сможете заказать и купить недорого мебель в Севастополе ведущих российских
                        производителей по
                        самой низкой цене! Мы занимаемся оптовой и розничной продажей корпусной мебели в Севастополе.
                    </p>
                    <p>
                        <span className="font-bold">Наше основное преимущество</span> перед обычным магазином или
                        салоном мебели — оптовая цена на качественную
                        мебель. Имея прямые поставки непосредственно от производителей, мы предлагаем недорого
                        качественную
                        мебель в Севастополе по самой низкой цене!
                    </p>
                    <p>
                        У нас большой собственный склад мебели, где в наличии есть: офисная мебель, мебель для детской
                        комнаты, корпусная мебель, мебель для спальни, стенки, кухонная мебель, шкафы купе, журнальные
                        столы, письменные столы, матрасы и многое другое. А если нет на складе, то Вы всегда сможете
                        быстро
                        заказать любую понравившуюся Вам мебель.
                    </p>
                    <p>
                        <span className="font-bold">Мы несём ответственность</span> за комплектацию и целостность мебели
                        при условии её правильного хранения и
                        эксплуатации. Перед сборкой необходимо проверить целостность и наличие деталей, фурнитуры.
                        Сохранять
                        упаковку до конца сборки.
                    </p>
                </div>
                <a
                    target="_blank"
                    href={staticInf.vkLink || ''}
                    className="cursor-pointer mt-5 flex flex-col items-center md:items-start gap-y-5 lg:col-start-2 lg:row-start-2 lg:row-span-3"
                >
                    <div
                        className="ml-10 md:ml-0 lg:ml-11 overflow-hidden relative w-[188px] h-[305px] md:w-[150px] md:h-[240px] lg:w-[254px] lg:h-[410px]">
                        <Image sizes="160px,(min-width: 1024px) 220px" fill src={mockup} alt={""}/>
                    </div>
                    <p className="font-montserrat font-semibold text-base lg:text-xl text-center w-[250px] md:w-[160px] lg:w-[300px] md:text-start lg:text-center">
                        Присоединяйтесь к нам Вконтакте
                    </p>
                </a>
                <div
                    className="col-span-2 lg:col-span-1 flex flex-wrap justify-center min-[1100px]:justify-between gap-5 mt-16 font-montserrat font-semibold md:font-roboto">
                    <div
                        className="flex flex-col items-center text-center gap-y-5 w-[160px] lg:w-[220px]">
                        <Image src={benefit1} alt=""/>
                        <p>Низкие цены и оплата при получении</p>
                    </div>
                    <div
                        className="flex flex-col items-center text-center gap-y-5 w-[160px] lg:w-[220px]">
                        <Image src={benefit2} alt=""/>
                        <p>Подробная консультация и помощь в выборе мебели</p>
                    </div>
                    <div
                        className="flex flex-col items-center text-center gap-y-5 w-[160px] lg:w-[220px]">
                        <Image src={benefit3} alt=""/>
                        <p>Квалифицированные сборщики</p>
                    </div>
                    <div
                        className="flex flex-col items-center text-center gap-y-5 w-[160px] lg:w-[220px]">
                        <Image src={benefit4} alt=""/>
                        <p>Замер и дизайн кухни бесплатно <span className="font-roboto font-normal block text-gray-500">при условии заказа мебели*</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;