import { app, HttpRequest, HttpResponseInit } from "@azure/functions";

// In-memory messages list
let messages = [
  { id: 1, text: "Hello! How can I help you?", sender: "bot" },
  { id: 2, text: "What’s the weather like today?", sender: "user" },
  { id: 3, text: "It’s sunny with a high of 25°C!", sender: "bot" },
];

// GET request handler
export async function getMessages(request: HttpRequest): Promise<HttpResponseInit> {
  return {
    status: 200,
    headers: { "Content-Type": "application/json" },
    jsonBody: messages,
  };
}

// POST request handler to add a new message
export async function postMessage(request: HttpRequest): Promise<HttpResponseInit> {
  const newMessage = await request.json() as { text: string; sender: string };
  
  if (!newMessage || !newMessage.text || !newMessage.sender) {
    return {
      status: 400,
      jsonBody: { error: "Invalid message format. 'text' and 'sender' are required." },
    };
  }

  // Add the new message with a unique ID
  const newId = messages.length ? messages[messages.length - 1].id + 1 : 1;
  const addedMessage = { id: newId, ...newMessage };

  messages.push(addedMessage);

  return {
    status: 201,
    jsonBody: addedMessage,
  };
}

// Register the GET and POST HTTP methods
app.http("get-messages", {
    route: "history",
    methods: ["GET"],
    authLevel: "anonymous",
    handler: getMessages,
  });
  
app.http("post-message", {
  route: "chat",
  methods: ["POST"],
  authLevel: "anonymous",
  handler: postMessage,
});
  