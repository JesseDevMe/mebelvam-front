import './globals.css'
import {montserrat, roboto} from "../../public/fonts/fonts";
import {Header} from '../widgets/Header'
import {NavBarM} from "@/widgets/NavBarM";
import {Footer} from "@/widgets/Footer";
import {PreHeader} from "@/widgets/PreHeader";

// px-2.5 md:px-5 lg:px-10 xl:px-20

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={
            `${roboto.variable} ${montserrat.variable} ${roboto.className} bg-fon font-roboto
            text-sm leading-5`
        }>

              <div className="min-h-screen flex flex-col">
                  <PreHeader/>
                  <Header/>

                  <main className="flex-grow ">
                      {children}
                  </main>
                  <NavBarM/>

                  <Footer/>
            </div>
      </body>
    </html>
  )
}
