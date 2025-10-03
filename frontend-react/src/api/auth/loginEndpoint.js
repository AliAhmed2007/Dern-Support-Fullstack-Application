async function loginEndpoint(formData) {
    try {
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });

        // Parse JSON response
        const responseData = await response.json();

        // Handle errors if response is not OK
        if (!response.ok) {
        
            return { errors: responseData };
        }

        return responseData

    } catch (error) {
        console.error('Fetch error:', error);
        return {
            errors: {
                server: `Connection failed. Please try again later. ${error.message}`,
            },
        };
    }
}

export default loginEndpoint