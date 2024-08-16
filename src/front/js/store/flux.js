const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            users: [],
            currentUser: null,
            token: null,
            message: ""
        },
        actions: {
            // Fetch all users
            getUsers: async () => {
                try {
                    const response = await fetch('https://supreme-winner-v6p94g9w9ggxcp9rq-3001.app.github.dev/api/users', {
                        method: "GET"
                    });
                    if (response.ok) {
                        const body = await response.json();
                        setStore({ users: body }); // Fixed to use `setStore`
                        console.log('Fetched users:', body);
                    } else {
                        console.error('Failed to fetch users:', await response.text());
                    }
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            },
            
            // Create a new user
            createUser: async (email, password) => {
                try {
                    const response = await fetch('https://supreme-winner-v6p94g9w9ggxcp9rq-3001.app.github.dev/api/signup', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: email,
                            password: password,
                            is_active: true,
                        }),
                    });
                    if (response.ok) {
                        const body = await response.json();
                        console.log('New user created:', body);
                        return body; // Return user data or appropriate response
                    } else {
                        const errorText = await response.text();
                        console.error('Failed to create user:', errorText);
                        throw new Error(errorText);
                    }
                } catch (error) {
                    console.error('Error creating user:', error);
                    throw new Error('Failed to create user');
                }
            },
            
            // Login user
            loginUser: async (email, password) => {
                try {
                    const response = await fetch('https://supreme-winner-v6p94g9w9ggxcp9rq-3001.app.github.dev/api/login', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: email,
                            password: password,
                        }),
                    });
                    if (response.ok) {
                        const body = await response.json();
                        const token = body.token;
                        setStore({ token: token }); // Store the token
                        console.log('Login successful, token:', token);
                        return true; // Return true if login is successful
                    } else {
                        const errorText = await response.text();
                        console.error('Login failed:', errorText);
                        return false; // Return false if login fails
                    }
                } catch (error) {
                    console.error('Error logging in:', error);
                    return false; // Return false on error
                }
            },
            
            // Fetch a message from the backend
            getMessage: async () => {
                const { token } = getStore();
                if (!token) {
                    console.error('No token found');
                    return;
                }
                try {
                    const resp = await fetch('https://supreme-winner-v6p94g9w9ggxcp9rq-3001.app.github.dev/api/hello', {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (resp.ok) {
                        const data = await resp.json();
                        setStore({ message: data.message });
                        return data;
                    } else {
                        const errorText = await resp.text();
                        console.error('Failed to fetch message:', errorText);
                    }
                } catch (error) {
                    console.error('Error loading message from backend:', error);
                }
            },

            // Change color function (no changes needed here)
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            }
        }
    };
};

export default getState;