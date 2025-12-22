import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ShieldCheck, UserPlus } from "lucide-react";
import Swal from "sweetalert2";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, [axiosSecure]);

  const handleRoleChange = async (userId, newRole) => {
    console.log({ userId, newRole });
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.patch(`/users/${userId}`, { role: newRole });
          axiosSecure.get("/users").then((res) => {
            console.log(res.data);
            setUsers(res.data);
          });
        } catch (error) {
          console.error("Error updating user role:", error);
        }

        Swal.fire({
          title: "Successfull!",
          text: "The role has been updated.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body">
          <h2 className="card-title mb-4">User Directory</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Current Role</th>
                  <th className="text-right">Promote Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={i} className="hover">
                    <td>
                      <div className="font-bold">{u.name}</div>
                      <div className="text-sm opacity-50">{u.email}</div>
                    </td>
                    <td>
                      <span
                        className={`badge badge-sm ${
                          u.role === "admin"
                            ? "bg-secondary px-5 py-4"
                            : u.role === "librarian"
                            ? "bg-accent px-5 py-4"
                            : u.role === "user"
                            ? "bg-ghost px-5 py-4"
                            : "bg-yellow-300 px-5 py-4"
                        }`}
                      >
                        {u?.role?.toUpperCase() || "USER"}
                      </span>
                    </td>
                    <td className="text-right flex justify-end gap-2">
                      {u.role !== "librarian" && (
                        <button
                          onClick={() => handleRoleChange(u._id, "librarian")}
                          className="btn btn-xs btn-outline btn-accent gap-1"
                        >
                          <UserPlus size={12} /> Librarian
                        </button>
                      )}
                      {u.role !== "admin" && (
                        <button
                          onClick={() => handleRoleChange(u._id, "admin")}
                          className="btn btn-xs btn-outline btn-secondary gap-1"
                        >
                          <ShieldCheck size={12} /> Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
