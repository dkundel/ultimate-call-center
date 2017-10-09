const twilio = require('twilio');
const client = twilio();

const serverUrl = process.env.HOST_URL || 'http://dk.ngrok.io';
const targetPhoneNumber = process.argv[2] || process.env.MY_PHONE_NUMBER;
const twilioNumber = process.argv[3] || process.env.TWILIO_PHONE_NUMBER;

client.calls
  .create({
    from: twilioNumber,
    to: targetPhoneNumber,
    url: `${serverUrl}/work-off-queue`
  })
  .then(() => {
    console.log('Your phone should be ringing!');
  })
  .catch(err => {
    console.log('Something failed');
    console.error(err);
  });
