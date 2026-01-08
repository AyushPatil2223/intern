import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";


import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";




import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import AddVisitor from "./pages/AddVisitor";
import AddUser from "./pages/AddUser";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import UpdateUserPage from "./pages/UpdateUserPage";
import UserReports from "./pages/UserReports";
import PunchOut from "./pages/PunchOut";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-visitor" element={<AddVisitor />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/reports" element={<Reports />} />
              <Route path="/update" element={<UpdateUserPage />} />
              <Route path="/All-Engineers" element={<UserReports/>}/>
              <Route path = "/punchout" element = {<PunchOut/>}/>

            
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;




// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

// import { DashboardLayout } from "@/components/layout/DashboardLayout";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import AddVisitor from "./pages/AddVisitor";
// import AddUser from "./pages/AddUser";
// import Reports from "./pages/Reports";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// // Define routes
// const routes = [
//   { path: "/", element: <Navigate to="/login" replace /> },
//   { path: "/login", element: <Login /> },
//   {
//     element: <DashboardLayout />,
//     children: [
//       { path: "/dashboard", element: <Dashboard /> },
//       { path: "/add-visitor", element: <AddVisitor /> },
//       { path: "/add-user", element: <AddUser /> },
//       { path: "/reports", element: <Reports /> },
//     ],
//   },
//   { path: "*", element: <NotFound /> },
// ];

// // Create router with future flags
// const router = createBrowserRouter(routes, {
//   future: {
//     v7_relativeSplatPath: true,  // fixes nested route resolution for v7
//     v7_startTransition: true,    // opt-in to startTransition for route updates
//   },
// });

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <RouterProvider router={router} />
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;
