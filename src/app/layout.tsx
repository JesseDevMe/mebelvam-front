import './globals.css'
import {montserrat, roboto} from "../../public/fonts/fonts";
import {Header} from '../widgets/Header'
import {NavBarM} from "@/widgets/NavBarM";

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
        <div className="container m-auto">
            <Header/>
            <main className="h-full px-2.5">
                {children}
            </main>
            <NavBarM/>
        </div>
      </body>
    </html>
  )
}
