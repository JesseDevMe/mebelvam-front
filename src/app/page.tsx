import {Metadata} from "next";
import {FC} from "react";
import {Welcome} from "@/widgets/Welcome";
export const metadata: Metadata = {
  title: 'Главная страница',
  description: 'Мебельный магазин мебель вам, купить мебель',
}

interface PageProps {

}

const Page: FC<PageProps> = ({}) => {

  return (
      <>
          <Welcome/>
      </>
  );
};

export default Page;
