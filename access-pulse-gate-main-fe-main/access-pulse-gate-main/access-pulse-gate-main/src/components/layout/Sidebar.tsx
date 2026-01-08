// import { NavLink } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   Users, 
//   UserPlus, 
//   FileText, 
//   LogOut,
//   Menu,
//   X
// } from 'lucide-react';
// import { useAuthStore } from '@/store/authStore';
// import { Button } from '@/components/ui/button';
// import { cn } from '@/lib/utils';
// import { useState } from 'react';
// import { Role } from '@/types';

// export function Sidebar() {
//   // const { user,role, logout } = useAuthStore();
//   const { employee, user, role, logout } = useAuthStore();

//   const [isOpen, setIsOpen] = useState(false);
//   console.log("ROLE VALUE:", role);
// console.log("ROLES ARRAY:", role);
// console.log("IS ARRAY:", Array.isArray(role));


//   const navigation = [
//     {
//       name: 'Dashboard',
//       href: '/dashboard',
//       icon: LayoutDashboard,
//       // roles: ['admin', 'employee', 'user'],
//       roles: Role[];

//     },
//     {
//       name: 'Add Visitor',
//       href: '/add-visitor',
//       icon: UserPlus,
//       roles: ['user'],
//     },
//     {
//       name: 'Add Engineer',
//       href: '/add-user',
//       icon: Users,
//       roles: ['admin'],
//     },



//     {
//    name: 'PunchOut',
//       href: '/punchout',
//       icon: FileText,
//       roles: ['user', 'employee', 'admin'],
// },


// {
//    name: 'Show Engineers',
//       href: '/All-Engineers',
//       icon: FileText,
//       roles: ['employee', 'admin'],
// },





// {
//    name: 'Update',
//       href: '/update',
//       icon: FileText,
//       roles: ['user'],
// },



//     {
//       name: 'Reports',
//       href: '/reports',
//       icon: FileText,
//       roles: ['admin', 'employee', 'user'],
//     },


// ];


// // Normalize role into an array
// const roles = Array.isArray(role)
//   ? role
//   : typeof role === "string"
//     ? [role]
//     : [];


    

// const filteredNavigation = navigation.filter((item) =>
//   roles.some((r) => item.roles.includes(r))
// );
// navigation.forEach(item => {
//   console.log(
//     "Checking item:", item.name,
//     "Allowed Roles:", item.roles,
//     "User Roles:", roles,
//     "Match:", roles.some(r => item.roles.includes(r))
//   );
// });

// const displayName =
//   employee?.emp_name ||
//   user?.name ||
//   "Guest";

// // const displayRole =
// //   employee ? "Employee" :
// //   user ? "User" :
// //   "";


// const roles: Role[] = Array.isArray(role)
//   ? role
//   : role
//     ? [role]
//     : [];

// const displayRole =
//   roles.includes('admin')
//     ? 'Admin'
//     : roles.includes('employee')
//       ? 'Employee'
//       : roles.includes('user')
//         ? 'User'
//         : '';






//   const NavContent = () => (
//     <>
//       <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
//         <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
//           {/* <span className="text-white font-bold text-lg">D</span> */}
//                   <img
//           src="/IndianOilImage.jpg"   // put image in public folder
//           alt="DCM Logo"
//           className="w-full h-full object-contain"
//         />

//         </div>
//         <div>
//           <h1 className="text-lg font-bold text-sidebar-foreground">DCM</h1>
//           <p className="text-xs text-muted-foreground">Visitor Management</p>
//         </div>
//       </div>

//       <div className="flex-1 px-4 py-6">
//         <nav className="space-y-2">
//           {filteredNavigation.map((item) => (
//             <NavLink
//               key={item.name}
//               to={item.href}
//               onClick={() => setIsOpen(false)}
//               className={({ isActive }) =>
//                 cn(
//                   'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
//                   isActive
//                     ? 'bg-gradient-to-r from-primary to-primary-glow text-white shadow-md'
//                     : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
//                 )
//               }
//             >
//               <item.icon className="w-5 h-5" />
//               {item.name}
//             </NavLink>
//           ))}
//         </nav>
//       </div>

//       <div className="border-t border-sidebar-border p-4">
//         <div className="px-4 py-3 rounded-lg bg-muted mb-3">
//         <p className="text-sm font-medium text-foreground">
//   {displayName}
// </p>

// <p className="text-xs text-muted-foreground capitalize">
//   {displayRole}
// </p>

//         </div>
//         <Button
//           variant="outline"
//           className="w-full justify-start gap-3"
//           onClick={() => {
//             logout();
//             setIsOpen(false);
//           }}
//         >
//           <LogOut className="w-4 h-4" />
//           Logout
//         </Button>
//       </div>
//     </>
//   );

//   return (
//     <>
//       {/* Mobile toggle */}
//       <Button
//         variant="ghost"
//         size="icon"
//         className="fixed top-4 left-4 z-50 lg:hidden"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//       </Button>

//       {/* Mobile sidebar */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       <aside
//         className={cn(
//           'fixed top-0 left-0 z-40 h-screen w-72 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 lg:translate-x-0',
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         )}
//       >
//         <NavContent />
//       </aside>

//       {/* Desktop sidebar spacer */}
//       <div className="hidden lg:block w-72 flex-shrink-0" />
//     </>
//   );
// }




import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FileText,
  LogOut,
  Menu,
  
  Edit,
  X
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Role } from '@/types';

export function Sidebar() {
  const { employee, user, role, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  /* -------------------- NAVIGATION -------------------- */
  const navigation: {
    name: string;
    href: string;
    icon: any;
    roles: Role[];
  }[] = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      roles: ['admin', 'employee', 'user'],
    },
    {
      name: 'Add Visitor',
      href: '/add-visitor',
      icon: UserPlus,
      roles: ['user'],
    },
    {
      name: 'Add Engineer',
      href: '/add-user',
      icon: Users,
      roles: ['admin'],
    },
    {
      name: 'Report',
      href: '/punchout',
      icon: FileText,
      roles: ['admin', 'employee', 'user'],
    },
    {
      name: 'Show Engineers',
      href: '/All-Engineers',
      icon: FileText,
      roles: ['admin', 'employee'],
    },
    {
      name: 'Update',
      href: '/update',
      icon: Edit,
      roles: ['user'],
    },
    {
      name: 'PunchOut',
      href: '/reports',
      icon: LogOut,
      roles: ['admin', 'employee', 'user'],
    },
  ];

  /* -------------------- USER ROLES -------------------- */
  const userRoles: Role[] = Array.isArray(role)
    ? role
    : role
      ? [role]
      : [];

  const filteredNavigation = navigation.filter((item) =>
    userRoles.some((r) => item.roles.includes(r))
  );

  /* -------------------- DISPLAY NAME & ROLE -------------------- */
  const displayName =
  userRoles.includes('employee')
    ? employee?.emp_name
    : userRoles.includes('user')
      ? user?.name
      : userRoles.includes('admin')
        ? user?.name
        : 'Guest';


  const displayRole =
    userRoles.includes('admin')
      ? 'Admin'
      : userRoles.includes('employee')
        ? 'Employee'
        : userRoles.includes('user')
          ? 'Engineer'
          : '';

  /* -------------------- SIDEBAR CONTENT -------------------- */
  const NavContent = () => (
    <>
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
          <img
            src="/IndianOilImage.jpg"
            alt="DCM Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h1 className="text-lg font-bold text-sidebar-foreground">DCM</h1>
          {/* <p className="text-xs text-muted-foreground">Visitor Management</p> */}
        </div>
      </div>

      <div className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {filteredNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-gradient-to-r from-primary to-primary-glow text-white shadow-md'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                )
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-sidebar-border p-4">
        <div className="px-4 py-3 rounded-lg bg-muted mb-3">
          <p className="text-sm font-medium">{displayName}</p>
          <p className="text-xs text-muted-foreground">{displayRole}</p>
        </div>

        <Button
          variant="outline"
          className="w-full justify-start gap-3"
          onClick={() => {
            logout();
            setIsOpen(false);
          }}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-40 h-screen w-72 bg-sidebar border-r flex flex-col transition-transform lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <NavContent />
      </aside>

      <div className="hidden lg:block w-72 flex-shrink-0" />
    </>
  );
}

