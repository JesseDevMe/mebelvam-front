import './globals.css'
import {montserrat, roboto} from "../../public/fonts/fonts";
import {Header} from '../widgets/Header'
import {NavBarM} from "@/widgets/NavBarM";
import {Footer} from "@/widgets/Footer";
import {PreHeader} from "@/widgets/PreHeader";
import dynamic from "next/dynamic";

const LogInModal = dynamic(() => import('../features/LogInModal/ui/LogInModal'))

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

                  <main className="flex-grow">
                      {children}
                  </main>
                  <NavBarM/>
                  <Footer/>
                  <LogInModal/>
            </div>
      </body>
    </html>
  )
}
