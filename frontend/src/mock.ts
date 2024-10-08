export const saveUser = (userData: { username: string; password: string }) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
  
    // Check if username already exists
    const existingUser = users.find((user: { username: string }) =>
      user.username.toLowerCase() === userData.username.toLowerCase()
    );
    if (existingUser) {
      return { success: false, message: "Username already exists." };
    }
  
    // Mock data for new user
    const newUser = {
      userId: Date.now(),
      username: userData.username,
      password: userData.password,
      keyNumber: Math.floor(1000 + Math.random() * 9000),
      assignedTimes: [
        { task: 'Code Review', time: '2 hours', status: 'Completed' },
        { task: 'Feature Development', time: '3 hours', status: 'In Progress' },
        { task: 'Testing & QA', time: '1.5 hours', status: 'Pending' },
      ],
      trackProgress: 80, // Progress as percentage
      rating: 4.3, // Rating out of 5
      residentialAddress: '',
      unavailableReason: '',
      unavailableDuration: '',
      email: '',
      remoteTasks: [],
      sharedTaskAccess: []
    };
  
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  
    return { success: true, message: "User registered successfully." };
  };
  

export const getUser = (username: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return users.find((user: { username: string; password: string }) => user.username === username && user.password === password);
};
