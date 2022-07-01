
// AUX FUNCTIONS
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { request } = require("express");
const app = express();
app.use(cors());
const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};
const file = "messagesData.json";
const messages = [welcomeMessage];

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

  // FUNCTIONS

function saveMessage(request, response) {
  const newMessage = request.body;
  const newId = messages.length;
  newMessage.id = newId;
  messages.push(newMessage);
  response.status(201).send(newMessage);
}
const searchMessage = (req, res) => {
  const text = req.query.text.toLowerCase();
  const findText = messages.filter((message) =>
    message.text.toLowerCase().includes(text)
  );

  res.send(findText);
};
function getMessageById(req, res){
  const messageId = Number(req.params.messageId);
    const message = messages.find((message) => message.id === messageId);
    res.send(message);
  }

// MIDDLEWARES
app.use(express.json());
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
app.get("/messages",(req, res) => { 
  res.send(messages)
});
app.post("/messages" , saveMessage);
app.get("/messages/search", searchMessage);
app.get("/messages/:id", getMessageById);  
app.delete("/messages/:messageId", (req, res) => {
        const messageId = Number(req.params.messageId);
        messages.splice(messageId, 1);
        res.send(messages);
      });

app.put("/messages/:id", (req, res) => {
        const id = Number(req.params.id)
        const message = messages.find(message => id === message.id)
        if (message && req.body.text && req.body.from) {
          message.text = req.body.text;
          message.from = req.body.from;
          res.send({
            status: 'Your message has been modified!',
            data: message
          });
        } else {
          res.status(400);
          res.send('Your message has not been modified!');
        }
      })
    

// SERVER
const port = 3000;
const url = `http://localhost:${port}/messages`;
app.listen(port, () => console.log(`Listening on port ${url}`));