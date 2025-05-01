document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginContainer = document.querySelector('.login-container');
    const mainContainer = document.querySelector('.main-container');
    const loginError = document.getElementById('login-error');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const outputArea = document.getElementById('output-area');

    // Basic hardcoded login (for demonstration)
    const validUsername = 'user';
    const validPassword = 'password';

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === validUsername && password === validPassword) {
            loginContainer.style.display = 'none';
            mainContainer.style.display = 'flex';
        } else {
            loginError.textContent = 'Invalid username or password.';
        }
    });

    sendButton.addEventListener('click', function() {
        const query = userInput.value.trim();
        if (query !== '') {
            displayUserMessage(query);
            getAiResponse(query);
            userInput.value = '';
        }
    });

    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && userInput.value.trim() !== '') {
            displayUserMessage(userInput.value.trim());
            getAiResponse(userInput.value.trim());
            userInput.value = '';
        }
    });

    function displayUserMessage(message) {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user-message');
        userDiv.textContent = 'You: ' + message;
        outputArea.appendChild(userDiv);
        outputArea.scrollTop = outputArea.scrollHeight; // Scroll to bottom
    }

    function displayAiResponse(response) {
        const aiDiv = document.createElement('div');
        aiDiv.classList.add('ai-response');
        aiDiv.textContent = 'Shaunak\'s AI: ' + response;
        outputArea.appendChild(aiDiv);
        outputArea.scrollTop = outputArea.scrollHeight; // Scroll to bottom
    }

    function getAiResponse(query) {
        // Basic "AI" logic - keyword matching for educational content
        const lowerQuery = query.toLowerCase();

        if (lowerQuery.includes('photosynthesis')) {
            displayAiResponse('Photosynthesis is the process used by plants, algae, and some bacteria to convert light energy into chemical energy in the form of glucose.');
        } else if (lowerQuery.includes('newton\'s laws') || lowerQuery.includes('laws of motion')) {
            displayAiResponse('Newton\'s three laws of motion are: 1. An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force. 2. The acceleration of an object is directly proportional to the net force acting on the object and inversely proportional to its mass (F=ma). 3. For every action, there is an equal and opposite reaction.');
        } else if (lowerQuery.includes('algebra')) {
            displayAiResponse('Algebra is a branch of mathematics that deals with symbols and the rules for manipulating those symbols. It is a unifying thread of almost all of mathematics.');
        } else if (lowerQuery.includes('what is') || lowerQuery.includes('explain')) {
            displayAiResponse('That\'s a broad question! Could you be more specific about what you\'d like to learn?');
        } else {
            displayAiResponse('I am still learning! I don\'t have information on that topic yet. You can try asking about photosynthesis, Newton\'s laws, or algebra.');
        }
    }
});