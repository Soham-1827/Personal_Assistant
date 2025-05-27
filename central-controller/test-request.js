const testMessages = [
    "Open Chrome browser",
    "What's on my screen right now?", 
    "Remind me to call mom at 3pm",
    "Help me write in my journal",
    "What's the weather like today?"
  ];
  
  const testAllMessages = async () => {
    for (const message of testMessages) {
      console.log(`\n🧪 Testing: "${message}"`);
      
      try {
        const response = await fetch('http://localhost:3001/assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message })
        });
        
        const data = await response.json();
        console.log(`✅ Type: ${data.detected_type}`);
        console.log(`📝 Response: ${data.response}`);
      } catch (error) {
        console.error('❌ Error:', error);
      }
    }
  };
  
  testAllMessages();