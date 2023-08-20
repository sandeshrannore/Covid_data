import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../Features/userActions/userSlice";
import { RootState } from "../store";
import ContactsList from "../components/ContactsList";
import { MdCancel } from "react-icons/md";

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  status: "active" | "inactive";
}

const UserList: React.FC = () => {
  const users = useSelector((state: RootState) => state.user.users);
  const dispatch = useDispatch();

  const [creatingUser, setCreatingUser] = useState(false);
  const [newUser, setNewUser] = useState<UserData>({
    id: users.length + 1,
    firstName: "",
    lastName: "",
    status: "active",
  });

  const handleAddUser = () => {
    dispatch(addUser(newUser));
    setCreatingUser(false);
    setNewUser({
      id: users.length + 1,
      firstName: "",
      lastName: "",
      status: "active",
    });
  };

  return (
    <div className="flex flex-col bg-slate-300 w-full h-full">
      <div className="flex justify-center items-center h-64">
        {creatingUser ? (
          <div className=" p-4 m-2 border rounded bg-white">
            <div className="flex items-center mb-4">
              <label className="text-gray-600 mr-2">First Name</label>
              <input
                type="text"
                placeholder="First Name"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
                className="border rounded border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="flex items-center mb-4">
              <label className="text-gray-600 mr-2">Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
                className="border rounded border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex  mt-2">
              <label className="mb-2">Status:</label>
              <div className="flex flex-col ml-8">
              <label className="mb-2">
                <input
                  type="radio"
                  value="active"
                  checked={newUser.status === "active"}
                  onChange={() => setNewUser({ ...newUser, status: "active" })}
                />
                Active
              </label>
              <label>
                <input
                  type="radio"
                  value="inactive"
                  checked={newUser.status === "inactive"}
                  onChange={() =>
                    setNewUser({ ...newUser, status: "inactive" })
                  }
                />
                Inactive
              </label>
              </div>
            </div>

            <div className="mt-2">
              <button
                onClick={handleAddUser}
                className="mr-2 bg-green-500 text-white px-2 py-1 rounded"
              >
                Create
              </button>
              <button
                onClick={() => setCreatingUser(false)}
                className="bg-gray-500 text-white px-2 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setCreatingUser(true)}
            className="mt-2 bg-blue-500 h-10 text-white px-2 py-1 rounded"
          >
            Create New User
          </button>
        )}
      </div>
      <div>
        {users.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {users.map((user) => (
              <ContactsList key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="flex align-middle justify-center w-full">
            <p className="p-4 border-2 rounded border-solid border-gray-400 flex items-center">
              <MdCancel className="w-6 h-6 mr-2 text-gray-600" />
              No Contact Found <br /> Please add from <br /> Create Contact
              Button
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
