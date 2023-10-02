'use client'
import {FC} from "react";
import { useRouter } from 'next/navigation'


interface PageProps {

}

const Page: FC<PageProps> = ({}) => {
    const router = useRouter();
    router.replace('/')

    return (
        <div className="max-w-[1520px] w-full mx-auto">

        </div>
    );
};

export default Page;