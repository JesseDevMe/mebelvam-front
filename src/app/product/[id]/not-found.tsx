'use client'
import {FC} from "react";
import Image from "next/image";
import sofa from "@/../public/Pages/NotFound/sofa.png"
import lamps from "@/../public/Pages/NotFound/lamps.png"
import tumba from "@/../public/Pages/NotFound/tumba.png"
import chairs_table from "@/../public/Pages/NotFound/chairs_table.png"
import {useRouter} from "next/navigation";
import Link from "next/link";

interface NotFoundProps {

}

const NotFound: FC<NotFoundProps> = ({}) => {
    const router = useRouter();

    return (
        <div className="max-w-[1520px] w-full mx-auto px-2.5 md:px-5 lg:px-10 xl:px-20">
            <div className="relative w-full h-full min-h-[800px] pt-[162px] md:pt-[250px] md:min-h-[900px]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] h-[160px] md:w-[500px] lg:left-5 lg:translate-x-0">
                    <Image
                        fill style={{objectFit: "contain"}}
                        sizes="340px, (min-width: 768px) 500px"
                        src={sofa} alt=''
                    />
                </div>

                <Image
                    className="hidden lg:block absolute right-0 top-5 w-[240px] h-[750px]"
                    sizes="240px"
                    width={240} height={750} src={chairs_table} alt=''
                />

                <Image
                    className="w-[255px] hidden md:block absolute left-0 top-1/2 -translate-y-[10%]"
                    sizes="255px"
                    height={450} width={255} src={tumba} alt=''
                />

                <div className="mx-auto flex flex-col items-center justify-center gap-y-7 gap-x-11 font-montserrat text-base font-semibold lg:flex-row">

                    <div onClick={() => router.back()} className="cursor-pointer w-[212px] bg-dark text-light rounded py-4 text-center">
                        <svg className="inline-block mr-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.5906 13.0001C4.69192 13.0889 4.79871 13.1807 4.91075 13.2754C5.96113 14.163 7.37725 15.2226 8.81294 16.2492C10.2444 17.2728 11.678 18.2513 12.7549 18.9747C13.293 19.3362 13.7413 19.6334 14.0547 19.8401C14.2114 19.9434 14.3344 20.0241 14.418 20.0788L14.5132 20.1409L14.5373 20.1566L14.5432 20.1605L14.5446 20.1614L14.545 20.1617L14 21.0001C13.455 21.8385 13.4549 21.8385 13.4548 21.8384L13.4543 21.8381L13.4526 21.837L13.446 21.8327L13.4206 21.8162L13.3229 21.7523C13.2375 21.6964 13.1126 21.6145 12.9538 21.5098C12.6363 21.3004 12.1832 21 11.6397 20.6349C10.5533 19.9052 9.10247 18.9149 7.64962 17.8761C6.20095 16.8402 4.73271 15.7434 3.61982 14.803C3.06629 14.3352 2.57642 13.8859 2.21682 13.4885C2.03809 13.291 1.86974 13.0826 1.74045 12.8724C1.62814 12.6899 1.46256 12.3771 1.46256 12.0001C1.46256 11.6232 1.62814 11.3103 1.74045 11.1278C1.86974 10.9177 2.03809 10.7093 2.21682 10.5118C2.57642 10.1144 3.06629 9.66504 3.61982 9.19726C4.73271 8.25679 6.20095 7.16007 7.64962 6.12418C9.10247 5.0853 10.5533 4.09506 11.6397 3.36532C12.1832 3.00022 12.6363 2.69979 12.9538 2.49045C13.1126 2.38577 13.2375 2.30384 13.3229 2.24795L13.4206 2.18406L13.446 2.16753L13.4526 2.16326L13.4543 2.16214L13.4548 2.16183C13.4549 2.16175 13.455 2.1617 14 3.00012L14.545 3.83858L14.5446 3.83878L14.5432 3.83971L14.5373 3.84359L14.5132 3.8593L14.418 3.92147C14.3344 3.97618 14.2114 4.05685 14.0547 4.16017C13.7413 4.36685 13.293 4.66408 12.7549 5.02554C11.678 5.74893 10.2444 6.72743 8.81294 7.75105C7.37725 8.77766 5.96113 9.83719 4.91075 10.7248C4.79871 10.8195 4.69192 10.9113 4.5906 11.0001L22 11.0001C22.5523 11.0001 23 11.4478 23 12.0001C23 12.5524 22.5523 13.0001 22 13.0001L4.5906 13.0001ZM14 3.00012L13.455 2.1617C13.918 1.86069 14.5374 1.99205 14.8384 2.45509C15.1394 2.91814 15.0081 3.53753 14.545 3.83854L14 3.00012ZM14 21.0001L14.545 20.1617C15.0081 20.4627 15.1394 21.0821 14.8384 21.5451C14.5374 22.0082 13.918 22.1395 13.455 21.8385L14 21.0001Z" fill="#FDFDFD"/>
                        </svg>
                        <span>Назад</span>
                    </div>

                    <Link href={'/'} className="cursor-pointer w-[212px] rounded py-4 text-center border border-dark">
                        На главную
                    </Link>
                </div>

                <div className="mx-auto mt-20 w-fit py-5 font-montserrat font-bold text-transparent text-[64px] bg-[linear-gradient(180deg,rgba(0,0,0,1)0%,rgba(233,167,59,1)100%)] bg-clip-text md:text-[96px] md:py-8 lg:text-[128px] lg:py-10">404</div>

                <div className="mx-auto mt-7 w-fit font-montserrat font-bold text-transparent text-base bg-[linear-gradient(180deg,rgba(0,0,0,1)0%,rgba(233,167,59,1)100%)] bg-clip-text lg:text-xl xl:text-3xl">
                    Упс... Такого товара не существует
                </div>

                <Image
                    className="w-[260px] absolute bottom-0 left-1/2 -translate-x-1/2 lg:w-[320px]"
                    sizes="320px"
                    width={260} src={lamps} alt=''
                />
            </div>

        </div>
    );
};

export default NotFound;