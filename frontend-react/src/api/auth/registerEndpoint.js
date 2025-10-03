async function registerEndpoint(formData) {
  try {
    const response = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData,
    });

    // Parse JSON response
    const responseData = await response.json();

    // Handle errors if response is not OK
    if (!response.ok) {
      return { errors: responseData.errors };
    }

    return responseData;
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      errors: {
        server: `Connection failed. Please try again later. ${error.message}`,
      },
    };
  }
}

export default registerEndpoint;
