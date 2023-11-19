import {type NextRequest, NextResponse} from 'next/server'
import {transporter} from "@/shared/NodeMailer";
import {OrderInfo} from "@/entities/Order/types";
import {METHOD} from "@/entities/Order/store/useOrderStore";

export async function PUT(request: NextRequest) {
    const data: OrderInfo = await request.json();

    if (!data || !data.customerTelephone) {
        return NextResponse.json({error: {message: 'Incorrect body data', status: 400}} , {status: 400})
    }

    const textMail =
        `
        Информация о заказчике:
          Имя: ${data.customerName}
          Отчество: ${data.customerMiddleName}
          Телефон: ${data.customerTelephone}
          Адрес: ${data.customerAddress}
          Комментарий: ${data.customerNote}
          
        Информация о заказе:
          Способ доставки: ${data.method === METHOD.COURIER ? 'Курьер' : ''}${data.method === METHOD.FREE ? 'Бесплатная доставка' : ''}${data.method === METHOD.PICKUP ? 'Самовывоз' : ''}
          Подъем на этаж: ${data.isLift ? 'Да' : 'Нет'}
          Установка мебели: ${data.isSetup ? 'Да' : 'Нет'}
          Товары в заказе:
             ${data.furniture.map(fur =>
                `$({fur.id}), ${fur.name}, ${fur.color}, ${fur.size}, ${fur.price} р., ${fur.count} шт.`
             ).join(' ')}
        `

    const htmlMail =
        `
        <h2>Информация о заказчике:</h2>
        <ul>
          <li>Имя: ${data.customerName}</li>
          <li>Отчество: ${data.customerMiddleName}</li>
          <li>Телефон: ${data.customerTelephone}</li>
          <li>Адрес: ${data.customerAddress}</li>
          <li>Комментарий: ${data.customerNote}</li>
        </ul>
        <br/>
        <h2>Информация о заказе:</h2>
        <ul>
          <li>Способ доставки: ${data.method === METHOD.COURIER ? 'Курьер' : ''}${data.method === METHOD.FREE ? 'Бесплатная доставка' : ''}${data.method === METHOD.PICKUP ? 'Самовывоз' : ''}</li>
          <li>Подъем на этаж: ${data.isLift ? 'Да' : 'Нет'}</li>
          <li>Установка мебели: ${data.isSetup ? 'Да' : 'Нет'}</li>
          <li>
            Товары в заказе:
            <ol>
                ${data.furniture.map(fur => 
                    `<li>(${fur.id}), ${fur.name}, ${fur.color}, ${fur.size}, ${fur.price} р., ${fur.count} шт.</li>`
                ).join(' ')}
            </ol>
          </li>
        </ul>
        `

    try {
        const res = await transporter.sendMail({
            from: process.env.SMTP_USERNAME,
            to: process.env.SMTP_USERNAME,
            subject: "Оформление заказа. Новый заказ.", // Subject line
            text: textMail, // plain text body
            html: htmlMail, // html body
        })

        return NextResponse.json(res, {status: 200})
    } catch (e) {
        return NextResponse.json(e, {status: 500})
    }
}