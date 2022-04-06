const mongoose = require('mongoose')
const express = require('express')
const app = express()
const routerApi = require('./src/routes')
require('dotenv').config()
const port = process.env.PORT
const {logErrors, errorHandler, boomErrorHandler} = require('./src/handlers/errors.handler')
const sgMail = require('@sendgrid/mail')


app.listen(port, () => console.log('Active port: ', port))

mongoose
    .connect(process.env.MONGODB_STRING_CONNECTION)
    .then(() => console.log('Success connection'))
    .catch((error) => console.log(error))


/* TWILIO */
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Prueba de twilio. Hola Ricardo :)',
     from: '+12189356135',
     to: '+573234993426'
   })
  .then(message => console.log(message.sid));


/* SENDGRID */

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
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
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })

/* REQUEST A SOLICITUDES HTTP EN FORMATO JSON */
app.use(express.json())
app.use(logErrors)
app.use(errorHandler)
app.use(boomErrorHandler)

/* permite llamado a los rest */
routerApi(app)