const mongoose = require('mongoose')
const express = require('express')
const app = express()
const routerApi = require('./src/routes')
const port = process.env.PORT
const {logErrors, errorHandler, boomErrorHandler} = require('./src/handlers/errors.handler')
require('dotenv').config()

//TWILIO
const sgMail = require('@sendgrid/mail')
const email = require('./mail')

const accountSid = 'AC862a9268e0b9057c25d8b498f634013d';
const authToken = '3c8e53fa1f4052b67d05c0d55b1a38e3';
const client = require('twilio')(accountSid, authToken)
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


app.listen(port, () => console.log('Active port: ', port))

mongoose
    .connect(process.env.MONGODB_STRING_CONNECTION)
    .then(() => console.log('Success connection'))
    .catch((error) => console.log(error))

//Mensaje via SMS
client.messages
  .create({
     body: 'Prueba de twilio. Hola Ricardo :)',
     from: 'whatsapp:+12189356135',
     to: 'whatsapp:+573234993426'
   })
  .then(message => console.log(`Mensaje enviado ${message.sid}`));


/* REQUEST A SOLICITUDES HTTP EN FORMATO JSON */
app.use(express.json())
app.use(logErrors)
app.use(errorHandler)
app.use(boomErrorHandler)


/* permite llamado a los rest */
routerApi(app)



/* SENDGRID */
//Mensaje via Email
 /* sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })

const msg = {
  to: 'ricardo.munozm@autonoma.edu.co', // Change to your recipient
  from: 'ricardo.munozm@autonoma.edu.co', // Change to your verified sender
  subject: 'Este es un correo de prueba enviado por sengrid desde mi proyecto',
  html: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div class="row">
      <div class="col">
        <h3>Prueba sendgrid</h3>
      </div>
    </div>
    <div class="row">
      <div class="col">
        Información de productos
        <table>
          <thead>
            <tr>
                <th>Name</th>
                <th>Item Name</th>
                <th>Item Price</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Alvin</td>
              <td>Eclair</td>
              <td>$0.87</td>
            </tr>
            <tr>
              <td>Alan</td>
              <td>Jellybean</td>
              <td>$3.76</td>
            </tr>
            <tr>
              <td>Jonathan</td>
              <td>Lollipop</td>
              <td>$7.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </body>
  </html>`,
}
 */
