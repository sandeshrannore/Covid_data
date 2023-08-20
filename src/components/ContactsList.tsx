import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser, updateUser } from '../Features/userActions/userSlice';

interface UserProps {
  id: number;
  firstName: string;
  lastName: string;
  status: 'active' | 'inactive';
}

const ContactsList: React.FC<{ user: UserProps }> = ({ user }) => {
  const dispatch = useDispatch();
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [newUser, setNewUser] = useState<UserProps>({ ...user }); // Initialize newUser with user data

  const handleEditUser = () => {
    setEditingUserId(user.id);
  };

  const handleUpdateUser = () => {
    dispatch(updateUser(newUser)); // Dispatch the updated user data
    setEditingUserId(null);
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(user.firstName + user.lastName)); // Use user.id instead of id parameter
  };

  return (
    <div className='grid col-span-1 justify-center h-min'>
      <div key={user.id} className="w-64 p-4 m-2 border rounded bg-white">
        <div className="mb-2">
          <strong>Name:</strong>
          {editingUserId === user.id ? (
            <input
              type="text"
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
              className="border rounded p-2 focus:outline-none focus:border-blue-500 w-full"
            />
          ) : (
            `${user.firstName}`
          )}
        </div>
        <div className="mb-2">
          <strong>Last Name:</strong>
          {editingUserId === user.id ? (
            <input
              type="text"
              value={newUser.lastName}
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
              className="border rounded p-2 focus:outline-none focus:border-blue-500 w-full"
            />
          ) : (
            `${user.lastName}`
          )}
        </div>
        <div className="mb-2">
          <strong>Status:</strong>
          {editingUserId === user.id ? (
            <div className="flex items-center mt-2">
              <label className="mr-2">Status:</label>
              <label className="mr-2">
                <input
                  type="radio"
                  value="active"
                  checked={newUser.status === 'active'}
                  onChange={() => setNewUser({ ...newUser, status: 'active' })}
                />
                Active
              </label>
              <label>
                <input
                  type="radio"
                  value="inactive"
                  checked={newUser.status === 'inactive'}
                  onChange={() => setNewUser({ ...newUser, status: 'inactive' })}
                />
                Inactive
              </label>
            </div>
          ) : (
            user.status
          )}
        </div>
        {editingUserId === user.id ? (
          <div className='flex px-5 justify-between'>
            <button className="mt-2 bg-green-500 text-white px-2 py-1 rounded" onClick={handleUpdateUser}>Save</button>
            <button className="mt-2 bg-gray-400 text-white px-2 py-1 rounded" onClick={() => setEditingUserId(null)}>Cancel</button>
          </div>
        ) : (
          <div className='flex px-5 justify-between'>
            <button className="mt-2 bg-blue-500 text-white px-2 py-1 rounded" onClick={handleEditUser}>Edit</button>
            <button className="mt-2 bg-red-500 text-white px-2 py-1 rounded" onClick={handleDeleteUser}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsList;
