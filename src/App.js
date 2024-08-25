import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput); // Validate JSON
      
      // Send the request to your backend API
      const res = await fetch('https://bfhl-challange.vercel.app/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: parsedInput.data }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      setResponse(data);
      setError(''); // Clear any previous errors
    } catch (err) {
      setError('Invalid JSON format or server error');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Your Roll Number</h1>
      <textarea
        rows="5"
        cols="50"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder='Enter JSON here, e.g., { "data": ["A", "C", "z"] }'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      {response && (
        <div style={{ marginTop: '20px' }}>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
