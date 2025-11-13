import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
};

export default function UsersPage() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [showDialog, setShowDialog] = React.useState(false);
  const [form, setForm] = React.useState({ firstName: "", lastName: "", email: "", mobile: "" });
  const [editingId, setEditingId] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSave = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!form.firstName && !form.lastName && !form.email && !form.mobile) return;

    if (editingId) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingId ? { ...u, ...form } as User : u))
      );
    } else {
      const newUser: User = {
        id: (globalThis as any).crypto?.randomUUID?.() ?? String(Date.now()),
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        mobile: form.mobile,
      };
      setUsers((u) => [newUser, ...u]);
    }

    setForm({ firstName: "", lastName: "", email: "", mobile: "" });
    setEditingId(null);
    setShowDialog(false);
  };

  const handleEdit = (user: User) => {
    setForm({ firstName: user.firstName, lastName: user.lastName, email: user.email, mobile: user.mobile });
    setEditingId(user.id);
    setShowDialog(true);
  };

  const handleDelete = (id: string) => {
    const ok = window.confirm("Are you sure you want to delete this user?");
    if (!ok) return;
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-semibold">Users</h1>
        <Dialog
          open={showDialog}
          onOpenChange={(open) => {
            setShowDialog(open);
            if (!open) {
              setEditingId(null);
              setForm({ firstName: "", lastName: "", email: "", mobile: "" });
            }
          }}
        >
          <DialogTrigger asChild>
            <Button
              variant="default"
              onClick={() => {
                // Prepare form for creating a new user
                setEditingId(null);
                setForm({ firstName: "", lastName: "", email: "", mobile: "" });
                setShowDialog(true);
              }}
            >
              Add user
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit user" : "Add user"}</DialogTitle>
            </DialogHeader>

            <form className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2" onSubmit={handleSave}>
              <Input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
              />
              <Input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
              />
              <Input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
              <Input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile number" />

              <div className="col-span-full flex justify-end gap-2 mt-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setShowDialog(false);
                    setEditingId(null);
                    setForm({ firstName: "", lastName: "", email: "", mobile: "" });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-auto border rounded">
        <table className="w-full table-fixed">
          <thead className="bg-muted">
            <tr>
              <th className="p-2 text-left">First name</th>
              <th className="p-2 text-left">Last name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Mobile</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-muted-foreground">
                  No users yet. Click "Add user" to create one.
                </td>
              </tr>
            )}
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-2 truncate">{u.firstName}</td>
                <td className="p-2 truncate">{u.lastName}</td>
                <td className="p-2 truncate">{u.email}</td>
                <td className="p-2 truncate">{u.mobile}</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(u)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(u.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
