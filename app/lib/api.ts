export async function createUser(data: { id: string, username: string, email: string, phone_number: string }) {
    const response = await fetch('http://localhost:5001/createUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create user');
    }

    return response.json();
}