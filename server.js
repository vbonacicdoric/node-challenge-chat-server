
// AUX FUNCTIONS
const express = require("express");
const cors = require("cors");
const { request } = require("express");
const app = express();
app.use(cors());
const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.


  // FUNCTIONS
const messages = [welcomeMessage];
function saveMessage(request, response) {
  const newMessage = request.body;
  const newId = messages.length;
  newMessage.id = newId;
  messages.push(newMessage);
  response.status(201).send(newMessage);
}
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
app.get("/messages/:id", getMessageById);  
app.delete("/messages/:messageId", (req, res) => {
        const messageId = Number(req.params.messageId);
        messages.splice(messageId, 1);
        res.send(messages);
      });




// SERVER
const port = 3000;
const url = `http://localhost:${port}/messages`;
app.listen(port, () => console.log(`Listening on port ${url}`));




              
              // const getAllMessages = (req, res) => {
              // res.send(messages)
              // };
              