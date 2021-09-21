/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nm from 'nodemailer';
import resetEmailTemplate from './reset-password.email';
import { Vimeo } from 'vimeo';
import { Stripe } from 'stripe';


admin.initializeApp();
const FFN = functions.region('europe-west2').https;
const stripe = new Stripe(functions.config().stripe.secretapi, { apiVersion: '2020-08-27' });


/* ---------- EMAIL ACTION CODE ---------- */
// Setup with CLI: firebase functions:config:set gmail.email="example@gmail.com" gmail.password="123456789"
const SENDER_EMAIL = functions.config().gmail.email;
const SENDER_PASSW = functions.config().gmail.password;
const transport = nm.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASSW,
    },
});
function generateEmailActionCode(email: string) {
    return admin.auth().generatePasswordResetLink(email);
}
exports.sendEmailActionCode = FFN.onCall(async (email, context) => {
    if (!email) return console.error('Invalid Email provided:', email);

    const emailLink = await generateEmailActionCode(email);
    const htmlTemplate = resetEmailTemplate({ resetLink: emailLink });

    const mailOptions = {
        from: '"Alpha Project 💪" <noreply@alphaproject.it>',
        to: `${email}`,
        subject: 'Reimposta la tua Password | Alpha Project',
        text: 'Reimposta la tua password per il sito di Alpha Project.',
        html: htmlTemplate,
    };

    transport.sendMail(mailOptions)
        .then((res: any) => {
            return console.log('Email sent correctly', res);
        })
        .catch((err: any) => {
            return console.error('Unknown error when sending email:', err);
        });
});


/* ---------- VIMEO ---------- */
let vimeo: Vimeo;
const VIMEO_LOGIN = {
    clientId: functions.config().vimeo.client_id,
    clientSecret: functions.config().vimeo.client_secret,
    accessToken: functions.config().vimeo.access_token,
};
function initVimeo(): void {
    vimeo = new Vimeo(
        VIMEO_LOGIN.clientId,
        VIMEO_LOGIN.clientSecret,
        VIMEO_LOGIN.accessToken,
    );
}
exports.vimeoRequest = FFN.onCall((data, context) => {
    if (!vimeo) initVimeo();
    const reqOptions = {
        method: data.method ? data.method : 'GET',
        path: data.path ? data.path : '/',
    };
    return new Promise<any>((resolve, reject) => {
        vimeo.request(reqOptions, (err, body, status, headers) => {
            resolve({err, body, status, headers});
        });
    });
});


/* ---------- STRIPE ---------- */
exports.getStripeUserSpent = FFN.onCall((customerId, context) => {
    return new Promise<any>((resolve, reject) => {
        if (!customerId) reject(new Error('Invalid customer Id'));
        stripe.invoices.list({
            limit: 3,
            customer: customerId,
            status: 'paid',
        }).then((invoices) => {
            let amount = 0;
            invoices.data.forEach((invoice) => {
                amount += invoice.amount_paid;
            });
            resolve(amount);
        }).catch((err) => reject(err));
    });
});


// Deploy FUNCTIONS only: firebase deploy --only functions
