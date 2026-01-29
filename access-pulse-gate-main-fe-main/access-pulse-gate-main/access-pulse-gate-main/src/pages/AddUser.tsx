// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { toast } from 'sonner';
// import { NewUserFormData, UserRole } from '@/types';
// import { UserCog } from 'lucide-react';

// export default function AddUser() {
//   const navigate = useNavigate();
//   const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<NewUserFormData>({
//     defaultValues: {
//       role: 'user',
//     },
//   });

//   const role = watch('role');

//   const onSubmit = async (data: NewUserFormData) => {
//     try {
//       // Mock API call - replace with actual userApi.createUser(data)
//       await new Promise(resolve => setTimeout(resolve, 500));
      
//       toast.success('User created successfully!');
//       navigate('/reports');
//     } catch (error) {
//       toast.error('Failed to create user. Please try again.');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
//           <UserCog className="w-8 h-8 text-primary" />
//           Add New User
//         </h1>
//         <p className="text-muted-foreground mt-1">
//           Create a new user account for the system
//         </p>
//       </div>

//       <Card className="border-0 shadow-xl">
//         <CardHeader>
//           <CardTitle>User Details</CardTitle>
//           <CardDescription>
//             All fields are mandatory. Please provide accurate information.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="name">Full Name *</Label>
//               <Input
//                 id="name"
//                 placeholder="Enter full name"
//                 {...register('name', { required: 'Name is required' })}
//                 className="h-11"
//               />
//               {errors.name && (
//                 <p className="text-sm text-destructive">{errors.name.message}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="mobile">Mobile Number *</Label>
//               <Input
//                 id="mobile"
//                 placeholder="10-digit mobile number"
//                 {...register('mobile', {
//                   required: 'Mobile number is required',
//                   pattern: {
//                     value: /^[0-9]{10}$/,
//                     message: 'Please enter a valid 10-digit mobile number',
//                   },
//                 })}
//                 className="h-11"
//               />
//               {errors.mobile && (
//                 <p className="text-sm text-destructive">{errors.mobile.message}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password *</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="Enter password (min. 6 characters)"
//                 {...register('password', {
//                   required: 'Password is required',
//                   minLength: {
//                     value: 6,
//                     message: 'Password must be at least 6 characters',
//                   },
//                 })}
//                 className="h-11"
//               />
//               {errors.password && (
//                 <p className="text-sm text-destructive">{errors.password.message}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="role">Role *</Label>
//               <Select value={role} onValueChange={(value) => setValue('role', value as UserRole)}>
//                 <SelectTrigger className="h-11">
//                   <SelectValue placeholder="Select role" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="user">User (Resident)</SelectItem>
//                   <SelectItem value="employee">Employee</SelectItem>
//                   <SelectItem value="admin">Admin</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

            

//             <div className="flex gap-4 pt-4">
//               <Button
//                 type="submit"
//                 className="flex-1 h-11 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90"
//               >
//                 Create User
//               </Button>
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => navigate('/dashboard')}
//                 className="flex-1 h-11"
//               >
//                 Cancel
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { NewUserFormData } from '@/types';
import { UserCog } from 'lucide-react';
import { userApi } from '@/lib/api';
import { useState } from 'react';

export default function AddUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit, 
    reset,
    formState: { errors }
  } = useForm<NewUserFormData>();



  const handleCreateUser = async (formData: NewUserFormData) => {
  try {
    const result = await userApi.createUser(formData);
    console.log("User created:", result);
  } catch (error) {
    console.error("Failed to create user:", error);
  }
};

  // const onSubmit = async (data: NewUserFormData) => {
  //   try {
  //     setLoading(true);

  //     await userApi.createUser(data); // ✅ backend API call

  //     toast.success('Engineer created successfully');

  //     reset(); // ✅ CLEAR FORM after success

  //     // OPTIONAL
  //     // navigate('/reports');

  //   } catch (err: any) {
  //     toast.error(
  //       err?.response?.data?.message || 'Failed to create user'
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };



const onSubmit = async (data: NewUserFormData) => {
  try {
    setLoading(true);
    await userApi.createUser(data); // ✅ emp_code automatically sent
    toast.success('Engineer created successfully');
    reset(); // clear form
  } catch (err: any) {
    toast.error(err?.response?.data?.message || 'Failed to create user');
  } finally {
    setLoading(false);
  }
};




  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <UserCog className="w-8 h-8 text-primary" />
          Add New User
        </h1>
        <p className="text-muted-foreground mt-1">
          Create a new user account
        </p>
      </div>

      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle>Engineer Details</CardTitle>
          <CardDescription>All fields are mandatory</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Full Name */}
            <div className="space-y-2">
              <Label>Full Name *</Label>
              <Input
                {...register('name', { required: 'Name is required' })}
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            {/* Mobile
            <div className="space-y-2">
              <Label>Mobile Number *</Label>
              <Input
                {...register('mobile', {
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Enter valid 10-digit number'
                  }
                })}
                placeholder="9876543210"
              />
              {errors.mobile && (
                <p className="text-sm text-destructive">{errors.mobile.message}</p>
              )}
            </div> */}



{/* mobile */}
<div className="space-y-2">
  <Label>Mobile Number *</Label>
  <Input
    type="tel"
    inputMode="numeric"
    maxLength={10} // 🔒 stop typing after 10 digits
    placeholder="9876543210"
    {...register('mobile', {
      required: 'Mobile number is required',
      pattern: {
        value: /^[0-9]{10}$/,
        message: 'Enter valid 10-digit mobile number'
      }
    })}
    onInput={(e) => {
      const target = e.target as HTMLInputElement;
      target.value = target.value.replace(/[^0-9]/g, '');
    }}
  />
  {errors.mobile && (
    <p className="text-sm text-destructive">{errors.mobile.message}</p>
  )}
</div>





            {/* Password */}
            <div className="space-y-2">
              <Label>Password *</Label>
              <Input
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Minimum 6 characters' }
                })}
                placeholder="******"
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? 'Creating...' : 'Create'}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
