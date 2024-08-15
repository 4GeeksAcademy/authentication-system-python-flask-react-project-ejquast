const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			users: [],
			currentUser: [],
			token: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			getUsers: async () => {
				const response = await fetch('https://supreme-winner-v6p94g9w9ggxcp9rq-3001.app.github.dev/api/users',{
					method: "GET"
				})
				const body = await response.json()
				getStore({
					users: body.users
				})
				console.log('fetched users')
			},
			createUser: async () => {
				const response = await fetch('https://supreme-winner-v6p94g9w9ggxcp9rq-3001.app.github.dev/api/signup',{
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						"username": username,
						"password": password,
						"is_active": true,
					}),
				);
				const body = await response.json()
				console.log('new user created')
				if (response.ok) {
					return body; // Return user data or appropriate response
				}
				throw new Error('Failed to create user');
			},
			loginUser: async (username, password) => {
				const response = await fetch('https://supreme-winner-v6p94g9w9ggxcp9rq-3001.app.github.dev/api/login',{
					method: "POST",
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						"username": username,
						"password": password,
					}),
				});
				const body = await response.json();
				if (response.ok) {
					const token = body.token;
					setStore({
						"token": token
					});
				}
				return response.ok;
			},
			// insert get current user function here
			getMessage: async () => {
				const { token } = getStore();
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello", {
						method: "GET",
						headers: {
							Authorization: `Bearer ${token}`
						}
					})
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
