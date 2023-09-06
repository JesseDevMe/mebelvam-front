import { Roboto, Montserrat } from 'next/font/google'

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin', 'cyrillic'],
    variable: '--font-roboto'
})
const montserrat = Montserrat({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin', 'cyrillic'],
    variable: '--font-montserrat'
})

export { roboto, montserrat }