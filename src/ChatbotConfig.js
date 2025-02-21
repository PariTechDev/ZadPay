import { createChatBotMessage } from "react-chatbot-kit";

const ChatbotConfig = {
  botName: "ZadBot",
  initialMessages: [
    createChatBotMessage("Hello! I'm ZadBot. How can I assist you today?"),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
};

export default ChatbotConfig;
