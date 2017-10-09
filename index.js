const { VoiceResponse } = require('twilio').twiml;
const express = require('express');

const app = express();

const QUEUE_NAME = 'myqueue';
const CONFERENCE_NAME = 'myconference';
const PORT = process.env.PORT || 3000;

app.all('/call', (req, res) => {
  const twiml = new VoiceResponse();
  twiml.say(
    { voice: 'alice' },
    `Thanks for calling the ultimate call center. You'll be connected shortly!`
  );
  twiml.enqueue({ waitUrl: '/wait' }, 'myqueue');
  res.type('text/xml').send(twiml.toString());
});

app.all('/wait', (req, res) => {
  const twiml = new VoiceResponse();
  twiml.say(
    { voice: 'alice' },
    'While you are waiting, feel free to chat with other people waitin!'
  );
  twiml.dial().conference('myconference');
  res.type('text/xml').send(twiml.toString());
});

app.all('/work-off-queue', (req, res) => {
  const twiml = new VoiceResponse();
  twiml.say({ voice: 'alice' }, 'Connecting to next person in the queue.');
  twiml.dial().queue('myqueue');
  res.type('text/xml').send(twiml.toString());
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
