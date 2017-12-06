'use strict';

const nodemailer = require('nodemailer');

function SendMail(sendTo) {

// Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account');
        console.error(err);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // NB! Store the account object values somewhere if you want
    // to re-use the same account for future mail deliveries

    // Create a SMTP transporter object

    let transporter = nodemailer.createTransport(
        {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: 'easygoingtransport@gmail.com',
            pass: 'pairproject'
          },
            logger: false,
            debug: false // include SMTP traffic in the logs
        },
        {
            // default message fields

            // sender info
            from: 'Bid System <no-reply@easy-going.net>',
            headers: {
                'X-Laziness-level': 1000 // just an example header, no need to use this
            }
        }
    );

    // Message object
    let message = {
        // Comma separated list of recipients
        to: sendTo,

        // Subject of the message
        subject: 'Nodemailer is unicode friendly ✔',

        // plaintext body
        text: 'Hello to myself!',

        // HTML body
        html: { path: 'assets/template/templateEmail.html' }
            

        // An array of attachments
        // attachments: [
        //     // String attachment
        //     {
        //         filename: 'notes.txt',
        //         content: 'Some notes about this e-mail',
        //         contentType: 'text/plain' // optional, would be detected from the filename
        //     },
        // 
        //     // Binary Buffer attachment
        //     {
        //         filename: 'image.png',
        //         content: Buffer.from(
        //             'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/' +
        //                 '//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U' +
        //                 'g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
        //             'base64'
        //         ),
        // 
        //         cid: 'note@example.com' // should be as unique as possible
        //     },
        // 
        //     // File Stream attachment
        //     {
        //         filename: 'nyan cat ✔.gif',
        //         path: __dirname + '/assets/nyan.gif',
        //         cid: 'nyan@example.com' // should be as unique as possible
        //     }
        // ]
    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return process.exit(1);
        }

        console.log('Message sent successfully!');
        console.log(nodemailer.getTestMessageUrl(info));

        // only needed when using pooled connections
        transporter.close();
    });
});
}

module.exports = SendMail;;