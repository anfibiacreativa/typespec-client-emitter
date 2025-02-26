<!-- prettier-ignore -->
<div align="center">


# Generating a chatbot client with TypeSpec TypeScript client emitter

[![TypeSpec.io](https://img.shields.io/badge/TypeSpec%20Docs-8A2BE2?style=flat-square)](https://typespec.io/)
![Node version](https://img.shields.io/badge/Node.js->=18-3c873a?style=flat-square)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Azure Functions](https://img.shields.io/badge/AzureFunctions-white?style=flat-square&logo=Azure&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-white?style=flat-square)](LICENSE)

[Overview](#overview) | [Getting started](#getting-started) | [Usage](#usage) | [More Resources](#more-resources)

</div>

## Overview

TypeSpec is a tool to describe your data up front and generate schemas, API specifications, client / server code, docs, and more. This sample shows how to create and use an emitted client

## Getting started

To get started fork and install the package with your favorite package manager. For example

```bash
pnpm i
```

The package also has a local Azure Function. To start the api

```bash
cd chatbot-api && npm i && func start
```

You will need to meet these pre-requirements

[Getting started with Azure Functions in VSCode](https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-node?pivots=nodejs-model-v4)

## Usage

After installing all dependencies, go to the `chatbot-client` folder and take a look at the [main.tsp](./packages/chatbot-client/main.tsp) file, where the service is described

```typescript
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

```

[Learn more about TypeSpec for REST](https://typespec.io/docs/libraries/http/reference/)

## Compile the client

Now take a look at the [TypeSpec config file](./packages/chatbot-client/tspconfig.yaml) where the emitters are configured. As you can see, we have two

- the typescript emitter
- the openapi3 emitter

```yaml
emit:
  - "@azure-tools/typespec-ts"
  - "@typespec/openapi3"
options:
  "@azure-tools/typespec-ts":
    package-name: chatbot-client
```

To compile, and get the output, we can now run

```bash
cd packages/chatbot-client
tsp compile .
```

🚀 Both the client and the API spec are now generated under `./packages/chatbot-client/tsp-output`

## Running the server

You will now need to install `ChatbotClient` as a dependency to the server found under [chat-server](./packages/chatbot-server/). Please note that I'm referring to the package generated, that has it's own `package.json` file.

Now you can start the server, running 

```bash
cd packages/chatbot-server
pnpm serve
```

And if you start the local `Azure Function` emulator, by going to the 

```bash
cd chatbot-api 
func start
```

You could make a request to the chatbot service to get a ficticious list of message history with

```bash
curl -X "localhost:3010/history" 
```

That should respond with
```json
[{"id":1,"text":"Hello! How can I help you?","sender":"bot"},{"id":2,"text":"What’s the weather like today?","sender":"user"},{"id":3,"text":"It’s sunny with a high of 25°C!","sender":"bot"}]%
```

## More resources

Get the slides for this talk as presented in [LaConf' Paris](https://slides.com/anfibiacreativa/generative-ai-developer-setup-and-best-practices/fullscreen)