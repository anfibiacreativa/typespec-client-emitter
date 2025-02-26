import "@typespec/http";
import "@azure-tools/typespec-ts";

using TypeSpec.Http;

@service({ 
  title: "Chatbot Client",
})
namespace ChatbotAPI;
  
model Message {
  id: string;
  content: string;
  sender: string;
  timestamp: utcDateTime;
}
@error
model Error {
  code: int32;
  message: string;
}

@route("/history")
@tag("MessageHistory")
interface Messages {
  @get listMessages(): Message[] | Error;
  @post sendMessage(@body content: { text: string }): Message | Error;
  @delete delete(@path id: string): void | Error;
}


