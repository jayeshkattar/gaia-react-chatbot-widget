# gaia-react-chatbot-widget

Gaia Chatbot widget  

## Demo

[Demo]()

## Installation

**npm**

```bash
npm install gaia-react-chatbot-widget --save
```

**yarn**

```bash
yarn add gaia-react-chatbot-widget
```

## Props

gaia-react-chatbot-widget component accepts mandatory props which are mentioned below.
 
### Type 1
Both host and systemPrompt are mandatory. 
- `host` - String - Base host address
- `systemPrompt` - String - system_prompt as defiend in config.json

## Example:

```js
import ChatModal from "gaia-react-chatbot-widget";

export default function SimpleCalendar() {
  return <ChatModal host={`http://localhost:8080`} systemPrompt={"You are an expert"} />;
}
```