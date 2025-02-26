import "@typespec/http";
import "@azure-tools/typespec-ts";

using TypeSpec.Http;

@service({ title: "Chatbot Client" })
@server("https://api.example.com", "Production API")
namespace ChatbotAPI {
  
  model Message {
    id: string;
    content: string;
    sender: string;
    timestamp: utcDateTime;
  }

  @route("/messages")
  interface Messages {
    @get listMessages(): Message[];
    @post sendMessage(@body content: { text: string }): Message;
  }
}

