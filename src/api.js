export const fetchUsers = async () => {
  try {
    const response = await fetch('http://localhost:8080/user_record/getUsers.jsp');
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};
