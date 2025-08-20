import { useEffect, useState } from 'react'

const botResponses = {
  'hi': "Hello adventurer! How can I assist you today?",
  'hello': "Greetings! Ready for your next adventure?",
  'help': "I can help with booking info, activity details, safety, and general queries.",
  'booking': "Book adventures via our website or email bookings@adventuretriangle.com",
  'activities': "We offer Air (paragliding), Water (rafting), and Land (trekking) adventures.",
  'safety': "All activities follow strict safety protocols.",
  'partner': "Become a partner in 2 steps: fill out the form, and wait for our team’s reply!",
  'contact': "Call 971.4568.4914 or email info@adventuretriangle.com",
  'default': "Sorry, I didn't understand that. Try asking about bookings or safety."
}

export default function Chatbot() {
  const [showChatbot, setShowChatbot] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Hello! I'm AdventureBot. How can I help you today?", sender: 'bot' }
  ])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (showChatbot && !isLoaded) setIsLoaded(true)
  }, [showChatbot])

  const handleSend = () => {
    if (!inputValue.trim()) return
    const userInput = inputValue.toLowerCase()
    let response = botResponses.default
    for (const key in botResponses) {
      if (userInput.includes(key)) response = botResponses[key]
    }
    setMessages(prev => [...prev, { text: inputValue, sender: 'user' }])
    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, sender: 'bot' }])
    }, 500)
    setInputValue('')
  }

  return (
    <>
      <button onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl z-50">
        💬
      </button>

      {showChatbot && isLoaded && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="w-80 h-96 bg-white rounded-t-xl shadow-xl flex flex-col border">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 rounded-t-xl flex justify-between">
              <div className="font-bold">AdventureBot</div>
              <button onClick={() => setShowChatbot(false)}>✖</button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((msg, i) => (
                <div key={i} className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'} p-2 rounded-lg max-w-xs`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t">
              <input
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask something..."
                className="w-full border px-3 py-2 rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
