import nodemailer, { SendMailOptions } from 'nodemailer'
import config from 'config'
import log from '../../../config/Logger';

async function sendEmail(user: string, message: string, subject: string){
    const auth = config.get<{user: string; pass: string;}>('gmail')
    let hostconfig = {
        service: 'gmail',
        auth
    }
    const transporter = nodemailer.createTransport(hostconfig)

    const html = `
        <h1> hello dear </h1>
        <p>${message}</p>
    `
    const response = {
        from: auth.user,
        to: user,
        subject: subject,
        html: html
    }
    
    const info = await transporter.sendMail(response)
    log.info('email sended successfully')
}

export default sendEmail