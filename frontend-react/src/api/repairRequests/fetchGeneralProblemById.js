async function fetchGeneralProblemById(generalProblemId, bearerToken) {
    try {
        const baseUrl = 'http://localhost:8000/api';
        const response = await fetch(`${baseUrl}/general-problems/${generalProblemId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                authorization: `Bearer ${bearerToken}`
            }
        });
        if (!response.ok) {
            throw new Error(`Error fetching user: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return {
            errors: {
                server: `Connection failed. Please try again later. ${error.message}`,
            },
        };
    }
}

export default fetchGeneralProblemById