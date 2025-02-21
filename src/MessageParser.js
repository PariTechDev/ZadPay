class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
        this.actionProvider.greet();
      } else if (lowerCaseMessage.includes("help")) {
        this.actionProvider.handleHelp();
      } else {
        this.actionProvider.addMessageToState(
          this.actionProvider.createChatBotMessage("Sorry, I didn't understand that. 🤔")
        );
      }
    }
  }
  
  export default MessageParser;
  