import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 3001;

//Set up middleware
app.use(cors());
app.use(bodyParser.json());

//Creating type of requests that I need my assistant to perform

const REQUEST_TYPES = {
  APP_CONTROL: "app_control",
  SCREEN_ANALYSIS: "screen",
  REMINDER: "reminder",
  CHAT: "chat",
  JOURNAL: "journal",
};

function detect_request_type(message) {
  const lowerCaseMessage = message.toLowerCase();
  //Checking for app control requests
  if (
    lowerCaseMessage.includes("open") ||
    lowerCaseMessage.includes("launch") ||
    lowerCaseMessage.includes("start")
  ) {
    return REQUEST_TYPES.APP_CONTROL;
  }

  //Checking for screen analysis requests
  if (
    lowerCaseMessage.includes("what's on") ||
    lowerCaseMessage.includes("screen") ||
    lowerCaseMessage.includes("analyse") ||
    lowerCaseMessage.includes("analyze")
  ) {
    return REQUEST_TYPES.SCREEN_ANALYSIS;
  }

  if (
    lowerCaseMessage.includes("journal") ||
    lowerCaseMessage.includes("write about") ||
    lowerCaseMessage.includes("help me write")
  ) {
    return REQUEST_TYPES.JOURNAL;
  }

  //Checking for reminder requests
  if (
    lowerCaseMessage.includes("remind me") ||
    lowerCaseMessage.includes("reminder") ||
    lowerCaseMessage.includes("schedule") ||
    lowerCaseMessage.includes("alarm")
  ) {
    return REQUEST_TYPES.REMINDER;
  }

  return REQUEST_TYPES.CHAT; // Default to chat if no specific type is detected
}

function routeRequest(message, detectedType) {
  switch (detectedType) {
    case REQUEST_TYPES.APP_CONTROL:
      return {
        response: `🚀 App Control Request Detected! You want me to: "${message}"`,
        action: "app_control",
        next_step: "Will connect to local app launcher",
      };

    case REQUEST_TYPES.SCREEN_ANALYSIS:
      return {
        response: `👁️ Screen Analysis Request Detected! You want me to analyze the screen.`,
        action: "screen_analysis",
        next_step: "Will capture and analyze screen content",
      };

    case REQUEST_TYPES.REMINDER:
      return {
        response: `⏰ Reminder Request Detected! You want me to remind you about: "${message}"`,
        action: "reminder",
        next_step: "Will set up reminder system",
      };

    case REQUEST_TYPES.JOURNAL:
      return {
        response: `📝 Journal Request Detected! You want help with writing.`,
        action: "journal",
        next_step: "Will connect to journal AI assistant",
      };

    default:
      return {
        response: `💬 General Chat: "${message}"`,
        action: "chat",
        next_step: "Will connect to conversational AI",
      };
  }
}

// Testing route
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    message: "Server is healthy and central controller is running.",
  });
});

app.post("/assistant", (req, res) => {
  const { message, type } = req.body;
  const request_type = type || detect_request_type(message);
  // Here you would typically process the message and type
  console.log(`📨 Received: "${message}"`);
  console.log(`🔍 Detected Type: ${request_type}`);

  const result = routeRequest(message, request_type);
  // For now, just echoing back the received message and type
  res.json({ ...result, original_Message: message, detected_type: request_type, source: 'central-controller' });
});

app.listen(PORT, () => {
  console.log(`🚀 Central Controller running on http://localhost:${PORT}`);
  console.log(`📡 Ready to route requests intelligently!`);
});
