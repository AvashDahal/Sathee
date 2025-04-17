// controllers/chatController.js
import axios from 'axios'

const chatWithLLM = async (req, res) => {
  const { user_input } = req.body;

  if (!user_input) {
    return res.status(400).json({ error: 'user_input is required' });
  }

  try {
    const response = await axios.post('http://127.0.0.1:5000/chat', {
      user_input: user_input,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json({ 
        botResponse: response.data.final_safe_response, 
        risk: response.data.risk_assessment 
      });; // adjust key if needed
  } catch (error) {
    console.error('Error communicating with LLM API:', error.message);
    res.status(500).json({ error: `Failed to get response from LLM API ${error.message}` });
  }
};

export default chatWithLLM
