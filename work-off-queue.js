const twilio = require('twilio');
const client = twilio();

const serverUrl = 'http://dk.ngrok.io/work-off-queue';
const twilioNumber = process.argv[2] || process.env.TWILIO_PHONE_NUMBER;
const targetPhoneNumber = process.argv[3] || process.env.MY_PHONE_NUMBER;

client.calls
  .create({
    from: twilioNumber,
    to: targetPhoneNumber,
    url: serverUrl
  })
  .then(() => {
    console.log('Your phone should be ringing!');
  })
  .catch(err => {
    console.log('Something failed');
    console.error(err);
  });
