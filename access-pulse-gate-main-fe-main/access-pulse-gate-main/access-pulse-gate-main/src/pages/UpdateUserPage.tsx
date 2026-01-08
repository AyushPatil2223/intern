// src/pages/UpdateUserPage.tsx
import { useState } from "react";
import { userApi } from '@/lib/api';
import { UpdateUserProfilePayload } from "@/types";
import { useToast } from "@/hooks/use-toast";

export default function UpdateUserPage() {
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { toast } = useToast(); // ✅ get toast from hook

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile) {
      toast({
        title: "Validation Error",
        description: "Please enter mobile number",
        duration: 3000,
        type: "background"
      });
      return;
    }

    const payload: UpdateUserProfilePayload = {};
    if (name) payload.name = name;
    if (password) payload.password = password;

    setLoading(true);
    try {
      const response = await userApi.updateUserProfile(mobile, payload);
      toast({
        title: "Success",
        description: "User updated successfully",
        duration: 3000,
        type: "foreground"
      });

      console.log("Updated user:", response.data);
setMobile("");
  setName("");
  setPassword("");

    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error",
        description: err.response?.data?.message || "Update failed",
        duration: 3000,
        type: "background"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Update Engineer</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Mobile Number</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter user's mobile number"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter new name"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
