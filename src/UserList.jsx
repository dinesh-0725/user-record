import React, { useState, useEffect } from 'react';
import { fetchUsers } from './api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(null); // 'add', 'edit', 'view'
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '' });

  useEffect(() => {
    fetchUsers().then(data => setUsers(data.slice(0, 5))); // Take 5 records
  }, []);

  const openAdd = () => {
    setFormData({ name: '', email: '', phone: '', company: '' });
    setModal('add');
  };

  const openEdit = (user) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, phone: user.phone || '', company: user.company?.name || user.company || '' });
    setModal('edit');
  };

  const openView = (user) => {
    setSelectedUser(user);
    setModal('view');
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (modal === 'add') {
      const newUser = { ...formData, id: Date.now() };
      setUsers([...users, newUser]);
    } else {
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...formData } : u));
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this record?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div>
      <h2>User Records</h2>
      <button onClick={openAdd} style={{ marginBottom: '10px' }}>Add New User</button>
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => openView(user)}>View</button>
                <button onClick={() => openEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modal && <div className="overlay" onClick={() => setModal(null)}></div>}

      {modal === 'view' && selectedUser && (
        <div className="modal">
          <h3>User Details</h3>
          <p>Name: {selectedUser.name}</p>
          <p>Email: {selectedUser.email}</p>
          <p>Phone: {selectedUser.phone || 'N/A'}</p>
          <p>Company: {selectedUser.company?.name || selectedUser.company || 'N/A'}</p>
          <button onClick={() => setModal(null)}>Close</button>
        </div>
      )}

      {(modal === 'add' || modal === 'edit') && (
        <div className="modal">
          <h3>{modal === 'add' ? 'Add User' : 'Edit User'}</h3>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Name</label>
              <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setModal(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserList;
