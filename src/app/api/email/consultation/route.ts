import {type NextRequest, NextResponse} from 'next/server'
import {transporter} from "@/shared/NodeMailer";

export async function PUT(request: NextRequest) {
    const data: {
        name: string;
        telephone: string;
    } = await request.json();

    if (!data || !data.telephone) {
        return NextResponse.json({error: {message: 'Incorrect body data', status: 400}} , {status: 400})
    }

    const textMail =
        `
        Информация о заказчике:
          Имя: ${data.name}
          Телефон: ${data.telephone}
        `

    const htmlMail =
        `
        <h2>Информация по заявке:</h2>
        <ul>
          <li>Имя: ${data.name}</li>
          <li>Телефон: ${data.telephone}</li>
        </ul>
        `

    try {
        const res = await transporter.sendMail({
            from: process.env.SMTP_USERNAME,
            to: process.env.SMTP_USERNAME,
            subject: "Получение консультации. Новая заявка.", // Subject line
            text: textMail, // plain text body
            html: htmlMail, // html body
        })

        return NextResponse.json(res, {status: 200})
    } catch (e) {
        return NextResponse.json(e, {status: 500})
    }
}