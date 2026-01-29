import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download } from 'lucide-react';
import { toast } from 'sonner';
import { userApi } from '@/lib/api';
import {
  LoginCredentials,
  NewUserFormData,
  UpdateUserProfilePayload,
  UserLoginCredentials,
  VisitorFormData,
  UserReport,
} from '@/types';





export default function UserReports() {
  const [users, setUsers] = useState<UserReport[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserReport[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // // Fetch users
  // const fetchUsers = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await userApi.ShowUsers(); // /auth/all
  //     setUsers(response.data);
  //     setFilteredUsers(response.data);
  //   } catch (err: any) {
  //     toast.error(err?.message || 'Failed to fetch users');
  //   } finally {
  //     setLoading(false);
  //   }
  // };



  // After fetching users
const fetchUsers = async () => {
  try {
    setLoading(true);
    const response = await userApi.ShowUsers(); // /auth/all

    // Sort users: Active first, then Inactive, and by createdAt descending
    const sortedUsers = response.data.sort((a: UserReport, b: UserReport) => {
      if (a.isActive && !b.isActive) return -1; // Active first
      if (!a.isActive && b.isActive) return 1;  // Inactive last
      // Both same status, sort by createdAt descending (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setUsers(sortedUsers);
    setFilteredUsers(sortedUsers);
  } catch (err: any) {
    toast.error(err?.message || 'Failed to fetch users');
  } finally {
    setLoading(false);
  }
};




const toggleStatus = async (mobile: string, status: boolean) => {
  try {
    await userApi.updateUserStatus(mobile, status); // ✅ Mobile number
    toast.success(status ? 'User Activated' : 'User Deactivated');
    fetchUsers(); // reload table
  } catch {
    toast.error('Failed to update status');
  }
};








  // // Search filter
  // const handleSearch = (query: string) => {
  //   setSearchQuery(query);
  //   const filtered = users.filter(
  //     (u) =>
  //       u.name.toLowerCase().includes(query.toLowerCase()) ||
  //       u.mobile.includes(query) ||
  //       u.employeeCode.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setFilteredUsers(filtered);
  // };




  const handleSearch = (query: string) => {
  setSearchQuery(query);
  const filtered = users
    .filter(
      (u) =>
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.mobile.includes(query) ||
        u.employeeCode.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => {
      if (a.isActive && !b.isActive) return -1;
      if (!a.isActive && b.isActive) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  setFilteredUsers(filtered);
};




  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">User Report</h1>
        <p className="text-muted-foreground mt-1">
          View registered employees
        </p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                
              </CardDescription>
            </div>
            {/* <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" /> Export
            </Button> */}
          </div>
        </CardHeader>

        <CardContent>
          {/* Search */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, mobile, or employee code..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            <Button variant="outline" size="icon" className="h-11 w-11">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Name</TableHead>
<TableHead>Mobile</TableHead>
<TableHead>Employee Code</TableHead>
<TableHead>Created At</TableHead>
<TableHead>Status</TableHead>
<TableHead>Action</TableHead>


                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow key={index} className="hover:bg-muted/30">
                    <TableCell className="font-medium">
  {user.name}
</TableCell>
<TableCell>{user.mobile}</TableCell>
<TableCell>{user.employeeCode}</TableCell>
<TableCell className="text-sm text-muted-foreground">
  {new Date(user.createdAt).toLocaleString()}
</TableCell>
<TableCell>
  {/* <Badge variant={user.isActive ? 'success' : 'destructive'}>
    {user.isActive ? 'Active' : 'Inactive'}
  </Badge> */}

  <Badge
  variant={user.isActive ? "default" : "destructive"}
  className={
    user.isActive
      ? "bg-green-600 hover:bg-green-600 text-white"
      : ""
  }
>
  {user.isActive ? "Active" : "Inactive"}
</Badge>

</TableCell>

<TableCell>
  {user.isActive ? (
    <Button
      size="sm"
      variant="destructive"
      onClick={() => toggleStatus(user.mobile, false)}
    >
      Deactivate
    </Button>
  ) : (
    <Button
      size="sm"
      variant="default"
      onClick={() => toggleStatus(user.mobile, true)}
    >
      Activate
    </Button>
  )}
</TableCell>


                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {!loading && filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No users found matching your search.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
