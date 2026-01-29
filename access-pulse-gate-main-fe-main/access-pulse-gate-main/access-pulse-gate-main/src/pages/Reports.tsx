// import { useEffect, useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Badge } from '@/components/ui/badge';
// import { Search, Filter, Download, Calendar } from 'lucide-react';
// import { visitorApi } from '@/lib/api';
// import { toast } from 'sonner';
// import { Visitor } from '@/types';


// // Mock data
// // const mockVisitors = [
// //   {
// //     id: '1',
// //     name: 'John Doe',
// //     gender: 'male',
// //     mobile: '9876543210',
// //     company: 'Tech Corp',
// //     email: 'john@techcorp.com',
// //     engineerName: 'Admin User',
// //     createdAt: '2024-01-15T10:30:00',
// //   },
// //   {
// //     id: '2',
// //     name: 'Jane Smith',
// //     gender: 'female',
// //     mobile: '9876543211',
// //     company: 'Design Studio',
// //     email: 'jane@design.com',
// //     engineerName: 'Admin User',
// //     createdAt: '2024-01-15T11:45:00',
// //   },
// //   {
// //     id: '3',
// //     name: 'Robert Johnson',
// //     gender: 'male',
// //     mobile: '9876543212',
// //     company: 'Consulting Inc',
// //     engineerName: 'Employee User',
// //     createdAt: '2024-01-15T14:20:00',
// //   },
// // ];

// export default function Reports() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [visitors, setVisitors] = useState<Visitor[]>([]);
//   const [filteredVisitors, setFilteredVisitors] = useState<Visitor[]>([]);

//   // const [filteredVisitors, setFilteredVisitors] = useState(mockVisitors);
//   const [loading, setLoading] = useState(false);

//   // const handleSearch = (query: string) => {
//   //   setSearchQuery(query);
//   //   const filtered = mockVisitors.filter(
//   //     (visitor) =>
//   //       visitor.name.toLowerCase().includes(query.toLowerCase()) ||
//   //       visitor.mobile.includes(query) ||
//   //       visitor.company.toLowerCase().includes(query.toLowerCase())
//   //   );
//   //   setFilteredVisitors(filtered);
//   // };

// //   const handleSearch = (query: string) => {
// //   setSearchQuery(query);
// //   const filtered = visitors.filter(
// //     (v) =>
// //       v.fullName.toLowerCase().includes(query.toLowerCase()) ||
// //       v.mobileNumber.includes(query) ||
// //       v.companyName.toLowerCase().includes(query.toLowerCase())
// //   );
// //   setFilteredVisitors(filtered);
// // };


//       // Fetch visitors from backend
//   const fetchVisitors = async () => {
//   try {
//     setLoading(true);

//     // ✅ Save Axios response in a variable named 'response'
//     const response = await visitorApi.getAllVisitors(); 

//     console.log('API Response:', response.data);


//     // ✅ Access the data from Axios response
//     setVisitors(response.data);
//     setFilteredVisitors(response.data);

//   } catch (err: any) {
//     toast.error(err?.message || 'Failed to fetch visitors');
//   } finally {
//     setLoading(false);
//   }
// };


// const handlePunchOut = async (id: number) => {
//   try {
//     const response = await visitorApi.punchOutVisitor(id);
//     toast.success('Punch out successful');

    


//     // Update state locally
//     setVisitors((prev) =>
//       prev.map((v) =>
//         v.id === id ? { ...v, punchOutDateTime: response.data.punchOutDateTime } : v
//       )
//     );

//     // Also update filteredVisitors (if search is active)
//     setFilteredVisitors((prev) =>
//       prev.map((v) =>
//         v.id === id ? { ...v, punchOutDateTime: response.data.punchOutDateTime } : v
//       )
//     );

//   } catch (err) {
//     toast.error('Punch out failed');
//   }
// };



     

//      useEffect(() => {
//     fetchVisitors();
//   }, []);

 










//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     const filtered = visitors.filter(
//       (v) =>
//         v.fullName.toLowerCase().includes(query.toLowerCase()) ||
//         v.mobileNumber.includes(query) ||
//         v.companyName.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredVisitors(filtered);
//   };





//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground">Visitor Reports</h1>
//         <p className="text-muted-foreground mt-1">
//           View and manage all visitor entries
//         </p>
//       </div>

//       <Card className="border-0 shadow-lg">
//         <CardHeader>
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div>
//               <CardTitle>All Visitors</CardTitle>
//               <CardDescription>
//                 Complete list of registered visitors
//               </CardDescription>
//             </div>
//             <div className="flex gap-2">
//               <Button variant="outline" size="sm">
//                 <Calendar className="w-4 h-4 mr-2" />
//                 Filter by Date
//               </Button>
//               <Button variant="outline" size="sm">
//                 <Download className="w-4 h-4 mr-2" />
//                 Export
//               </Button>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="flex gap-4 mb-6">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search by name, mobile, or company..."
//                 value={searchQuery}
//                 onChange={(e) => handleSearch(e.target.value)}
//                 className="pl-10 h-11"
//               />
//             </div>
//             <Button variant="outline" size="icon" className="h-11 w-11">
//               <Filter className="w-4 h-4" />
//             </Button>
//           </div>

//           <div className="rounded-lg border border-border overflow-hidden">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-muted/50">
//                   <TableHead>Photo</TableHead>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Gender</TableHead>
//                   <TableHead>Mobile</TableHead>
//                   <TableHead>Company</TableHead>
//                   <TableHead>Email</TableHead>
//                   <TableHead>Host</TableHead>
//                   <TableHead>Date & Time</TableHead>
//                   <TableHead>Punch Out</TableHead>
//                   <TableHead>Action</TableHead>

//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredVisitors.map((visitor) => (
//                   <TableRow key={visitor.id} className="hover:bg-muted/30">

//                       <TableCell>
//     <img
//       src={
//         visitor.photoUrl
//           ? `http://localhost:8081/dmc${visitor.photoUrl}`
//           : '/default-avatar.png'
//       }
//       alt="Visitor"
//       className="w-10 h-10 rounded-full object-cover border"
//     />
//   </TableCell>


//                         <TableCell className="font-medium">{visitor.fullName}</TableCell>
//                          <TableCell>
//                         <Badge variant="outline" className="capitalize">
//                      {visitor.gender}
//                          </Badge>
//                        </TableCell>
//                     <TableCell>{visitor.mobileNumber}</TableCell>
//                       <TableCell>{visitor.companyName}</TableCell>
//                    <TableCell className="text-muted-foreground">
//                    {visitor.emailId || '-'}
//                 </TableCell>
//                       <TableCell>{visitor.hostName}</TableCell>
//                    <TableCell className="text-sm text-muted-foreground">
//                     {visitor.visitDate +' '+visitor.visitTime || '-'}

//                     {/* {new Date(`${visitor.visitDate}T${visitor.visitTime}`).toLocaleString()} */}
//                   </TableCell> 
                  

//                   <TableCell className="text-sm text-muted-foreground">
//   {visitor.punchOutDateTime
//     ? new Date(visitor.punchOutDateTime).toLocaleString()
//     : '-'}
// </TableCell>




// <TableCell>
//   {visitor.punchOutDateTime ? (
//     <Badge variant="secondary">Punched Out</Badge>
//   ) : (
//     <Button
//       size="sm"
//       onClick={() => handlePunchOut(visitor.id)}
//     >
//       Punch Out
//     </Button>
//   )}
// </TableCell>

//               </TableRow>

//                 ))}
//               </TableBody>
//             </Table>
//           </div>

//           {filteredVisitors.length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-muted-foreground">No visitors found matching your search.</p>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }




























// import { useEffect, useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Badge } from '@/components/ui/badge';
// import { Search, Filter, Download, Calendar } from 'lucide-react';
// import { visitorApi } from '@/lib/api';
// import { toast } from 'sonner';
// import { Visitor } from '@/types';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";


// export default function Reports() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [visitors, setVisitors] = useState<Visitor[]>([]);
//   const [filteredVisitors, setFilteredVisitors] = useState<Visitor[]>([]);
//   const [loading, setLoading] = useState(false);
  
//   const [dateFilter, setDateFilter] = useState<Date | null>(null);
//   // State to toggle the visibility of the date picker
// const [showDateFilter, setShowDateFilter] = useState(false);




// const formatPunchOut = (dt?: string | null) => {
//   if (!dt) return "-";

//   // Trim microseconds to milliseconds
//   const fixed = dt.split(".")[0] + "Z";

//   return new Date(fixed).toLocaleString();
// };



// // Add this inside your component, above the return
// const handleExport = () => {
//   if (filteredVisitors.length === 0) {
//     toast.error("No visitors to export");
//     return;
//   }

//   // Prepare CSV content
//   const headers = [
//     "Full Name",
//     "Gender",
//     "Mobile Number",
//     "Company Name",
//     "Email",
//     "Host",
//     "Purpose",
//     "Visit Date",
//     "Visit Time",
//     "Punch Out DateTime"
//   ];

//   const rows = filteredVisitors.map(v => [
//     v.fullName,
//     v.gender,
//     v.mobileNumber,
//     v.companyName,
//     v.emailId || '-',
//     v.hostName,
//     v.purposeOfVisit,
//     v.visitDate,
//     v.visitTime,
//     v.punchOutDateTime ? new Date(v.punchOutDateTime).toLocaleString() : '-'
//   ]);

//   const csvContent =
//     [headers, ...rows]
//       .map(e => e.map(field => `"${field}"`).join(","))
//       .join("\n");

//   // Create a blob and trigger download
//   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement("a");
//   link.href = url;
//   link.setAttribute("download", `visitors_${new Date().toISOString().slice(0,10)}.csv`);
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };



//   // // Fetch visitors from backend
//   // const fetchVisitors = async () => {
//   //   try {
//   //     setLoading(true);
//   //     const response = await visitorApi.getAllVisitors();
//   //     const sortedVisitors = sortVisitors(response.data);
//   //     setVisitors(sortedVisitors);
//   //     setFilteredVisitors(sortedVisitors);
//   //   } catch (err: any) {
//   //     toast.error(err?.message || 'Failed to fetch visitors');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };






// const fetchVisitors = async () => {
//   try {
//     setLoading(true);
//     const response = await visitorApi.getAllVisitors();
//     const sortedVisitors = sortVisitors(response.data);
//     setVisitors(sortedVisitors);
//     setFilteredVisitors(sortedVisitors);
//   } catch (err: any) {
//     toast.error(err?.message || 'Failed to fetch visitors');
//   } finally {
//     setLoading(false);
//   }
// };











//   // Handle punch-out
//   // const handlePunchOut = async (id: number) => {
//   //   try {
//   //     const response = await visitorApi.punchOutVisitor(id);
//   //     toast.success('Punch out successful');



//   //     // Update state locally and sort
//   //     const updateAndSort = (list: Visitor[]) =>
//   //       list
//   //         .map((v) =>
//   //           v.id === id
//   //             ? { ...v, punchOutDateTime: response.data.punchOutDateTime }
//   //             : v
//   //         )
//   //         .sort((a, b) => {
//   //           if (!a.punchOutDateTime && b.punchOutDateTime) return -1; // active first
//   //           if (a.punchOutDateTime && !b.punchOutDateTime) return 1;  // logged-out last
//   //           return 0;
//   //         });

//   //     setVisitors((prev) => updateAndSort(prev));
//   //     setFilteredVisitors((prev) => updateAndSort(prev));

//   //     fetchVisitors();

//   //   } catch (err) {
//   //     toast.error('Punch out failed');
//   //   }
//   // };


// // const handlePunchOut = async (id: number) => {
// //   try {
// //     const response = await visitorApi.punchOutVisitor(id);
// //     toast.success('Punch out successful');

// //     // Update the local state first
// //     setVisitors((prev) =>
// //       prev.map((v) =>
// //         v.id === id
// //           ? { ...v, punchOutDateTime: response.data.punchOutDateTime }
// //           : v
// //       )
// //     );




// const handlePunchOut = async (id: number) => {
//   try {
//     const response = await visitorApi.punchOutVisitor(id);
//     toast.success('Punch out successful');

//     // Update local state
//     const updatedVisitors = visitors.map((v) =>
//       v.id === id ? { ...v, punchOutDateTime: response.data.punchOutDateTime } : v
//     );

//     const sortedVisitors = sortVisitors(updatedVisitors);

//     setVisitors(sortedVisitors);
//     setFilteredVisitors(sortedVisitors);
//   } catch (err) {
//     toast.error('Punch out failed');
//   }
// };




//     // setFilteredVisitors((prev) =>
//     //   prev.map((v) =>
//     //     v.id === id
//     //       ? { ...v, punchOutDateTime: response.data.punchOutDateTime }
//     //       : v
//     //   )
//     // );

//     // Fetch latest visitors from backend and sort them
//     const latestVisitors = await visitorApi.getAllVisitors();
//     const sortedVisitors = latestVisitors.data.sort((a, b) => {
//       if (!a.punchOutDateTime && b.punchOutDateTime) return -1; // active first
//       if (a.punchOutDateTime && !b.punchOutDateTime) return 1;  // punched-out last
//       return 0;
//     });

//     setVisitors(sortedVisitors);
//     setFilteredVisitors(sortedVisitors);

//   } catch (err) {
//     toast.error('Punch out failed');
//   }
// };





// const formatDateTime = (dateTime?: string | null) => {
//   if (!dateTime) return "-";

//   const d = new Date(dateTime);
//   if (isNaN(d.getTime())) return "-";

//   const day = String(d.getDate()).padStart(2, "0");
//   const month = String(d.getMonth() + 1).padStart(2, "0");
//   const year = d.getFullYear();

//   const hours = d.getHours();
//   const minutes = String(d.getMinutes()).padStart(2, "0");
//   const ampm = hours >= 12 ? "PM" : "AM";
//   const hour12 = String(hours % 12 || 12).padStart(2, "0");

//   return `${day}-${month}-${year} ${hour12}:${minutes} ${ampm}`;
// };




//   // Search
//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     const filtered = visitors.filter(
//       (v) =>
//         v.fullName.toLowerCase().includes(query.toLowerCase()) ||
//         v.mobileNumber.includes(query) ||
//         v.companyName.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredVisitors(filtered);
//   };

// //   const handleDateFilter = (date: string) => {
// //   setSelectedDate(date);

// //   if (!date) {
// //     setFilteredVisitors(visitors);
// //     return;
// //   }

// //   const filtered = visitors.filter(
// //     (v) => v.visitDate === date
// //   );

// //   setFilteredVisitors(filtered);
// // };



// const handleDateFilter = (date: Date | null) => {
//   if (!date) {
//     setFilteredVisitors(visitors);
//     return;
//   }

//   const filtered = visitors.filter((v) => {
//     const visitorDate = new Date(v.visitDate); // convert visitDate string to Date
//     return (
//       visitorDate.getFullYear() === date.getFullYear() &&
//       visitorDate.getMonth() === date.getMonth() &&
//       visitorDate.getDate() === date.getDate()
//     );
//   });

//   setFilteredVisitors(filtered);
// };






//   // Sort function for initial fetch or new visitors
//   // const sortVisitors = (list: Visitor[]) =>
//   //   list.sort((a, b) => {
//   //     if (!a.punchOutDateTime && b.punchOutDateTime) return -1;
//   //     if (a.punchOutDateTime && !b.punchOutDateTime) return 1;
//   //     return 0;
//   //   });




// // Sort visitors: active first (newest first), then punched-out (most recent punch-out first)
// const sortVisitors = (list: Visitor[]) =>
//   [...list].sort((a, b) => {
//     const aActive = !a.punchOutDateTime;
//     const bActive = !b.punchOutDateTime;

//     // Active visitors first
//     if (aActive && !bActive) return -1;
//     if (!aActive && bActive) return 1;

//     // Both active: newest created first
//     if (aActive && bActive) {
//       return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//     }

//     // Both punched-out: latest punch-out first
//     if (!aActive && !bActive) {
//       return new Date(b.punchOutDateTime!).getTime() - new Date(a.punchOutDateTime!).getTime();
//     }

//     return 0;
//   });





//   useEffect(() => {
//     fetchVisitors();
//   }, []);

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold text-foreground">Visitor Reports</h1>
//         <p className="text-muted-foreground mt-1">
//           View and manage all visitor entries
//         </p>
//       </div>

//       <Card className="border-0 shadow-lg">
//         <CardHeader>
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div>
//               <CardTitle>All Visitors</CardTitle>
//               <CardDescription>Complete list of registered visitors</CardDescription>
//             </div>
//             <div className="flex gap-2">
//               <Button
//   variant="outline"
//   size="sm"
//   onClick={() => setShowDateFilter((prev) => !prev)}
// >
//   <Calendar className="w-4 h-4 mr-2" />
//   Filter by Date
// </Button>



//               {/* <Button variant="outline" size="sm">
//                 <Download className="w-4 h-4 mr-2" /> Export
//               </Button> */}
// <Button variant="outline" size="sm" onClick={handleExport}>
//   <Download className="w-4 h-4 mr-2" /> Export
// </Button>



//             </div>
//           </div>
//         </CardHeader>

//         <CardContent>
//           <div className="flex gap-4 mb-6">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search by name, mobile, or company..."
//                 value={searchQuery}
//                 onChange={(e) => handleSearch(e.target.value)}
//                 className="pl-10 h-11"
//               />
//             </div>
//             <Button variant="outline" size="icon" className="h-11 w-11">
//               <Filter className="w-4 h-4" />
//             </Button>
//           </div>


// {/* ✅ DATE FILTER (minimal add) */}
// {showDateFilter && (
//   <div className="flex gap-4 mb-6">
//     <DatePicker
//       selected={dateFilter}
//       onChange={(date) => {
//         setDateFilter(date);
//         handleDateFilter(date); // pass Date | null
//       }}
//       className="border px-3 py-2 rounded w-60"
//       placeholderText="Select a date"
//       dateFormat="yyyy-MM-dd"
//     />

//     <Button
//       variant="outline"
//       onClick={() => {
//         setDateFilter(null);
//         setFilteredVisitors(visitors); // reset all
//       }}
//     >
//       Clear
//     </Button>
//   </div>
// )}



          

//           <div className="rounded-lg border border-border overflow-hidden">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-muted/50">
//                   <TableHead>Photo</TableHead>
//                   <TableHead>Name</TableHead>
//                   <TableHead>Gender</TableHead>
//                   <TableHead>Mobile</TableHead>
//                   <TableHead>Company</TableHead>
//                   <TableHead>Email</TableHead>
//                   <TableHead>Host</TableHead>
//                   <TableHead>Purpose</TableHead>
//                   <TableHead>Date & Time</TableHead>
//                   <TableHead>Punch Out</TableHead>
//                   <TableHead>Action</TableHead>
//                 </TableRow>
//               </TableHeader>

//               <TableBody>
//                 {filteredVisitors.map((visitor) => (
//                   <TableRow key={visitor.id} className="hover:bg-muted/30">
//                     <TableCell>
//   <img
//     src={
//       visitor.photo
//         ? `data:image/jpeg;base64,${visitor.photo}`
//         : '/dcm/image.png'
//     }
//     alt="Visitor"
//     className="w-10 h-10 rounded-full object-cover border"
//   />
// </TableCell>

//                     <TableCell className="font-medium">{visitor.fullName}</TableCell>
//                     <TableCell>
//                       <Badge variant="outline" className="capitalize">
//                         {visitor.gender}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>{visitor.mobileNumber}</TableCell>
//                     <TableCell>{visitor.companyName}</TableCell>
//                     <TableCell className="text-muted-foreground">{visitor.emailId || '-'}</TableCell>
//                     <TableCell>{visitor.hostName}</TableCell>
//                     <TableCell>{visitor.purposeOfVisit}</TableCell>
//                     <TableCell className="text-sm text-muted-foreground">
//                       {/* {visitor.visitDate + ' ' + visitor.visitTime || '-'} */}
//                       {/* {new Date(`${visitor.visitDate}T${visitor.visitTime}`).toLocaleString()} */}
//                       {formatDateTime(`${visitor.visitDate}T${visitor.visitTime}`)}


//                     </TableCell>
//                     <TableCell className="text-sm text-muted-foreground">
//                       {/* {visitor.punchOutDateTime
//                         ? new Date(visitor.punchOutDateTime).toLocaleString()
//                         : '-'} */}
//                         {/* {visitor.punchOutDateTime &&
//  !isNaN(Date.parse(visitor.punchOutDateTime))
//   ? new Date(visitor.punchOutDateTime).toLocaleString()
//   : '-'} */}

//   {formatDateTime(visitor.punchOutDateTime)}


//                     </TableCell>
//                     <TableCell>
//                       {visitor.punchOutDateTime ? (
//                         <Badge variant="secondary">Punched Out</Badge>
//                       ) : (
//                         <Button size="sm" onClick={() => handlePunchOut(visitor.id)}>
//                           Punch Out
//                         </Button>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>

//           {filteredVisitors.length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-muted-foreground">No visitors found matching your search.</p>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
















































import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, Calendar } from 'lucide-react';
import { visitorApi } from '@/lib/api';
import { toast } from 'sonner';
import { Visitor } from '@/types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Reports() {
  const [searchQuery, setSearchQuery] = useState('');
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [filteredVisitors, setFilteredVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [showDateFilter, setShowDateFilter] = useState(false);

  // Format DateTime safely
  const formatDateTime = (dateTime?: string | null) => {
    if (!dateTime) return "-";
    const d = new Date(dateTime);
    if (isNaN(d.getTime())) return "-";

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const hour12 = String(hours % 12 || 12).padStart(2, "0");

    return `${day}-${month}-${year} ${hour12}:${minutes} ${ampm}`;
  };

  // Fetch visitors
  const fetchVisitors = async () => {
    try {
      setLoading(true);
      const response = await visitorApi.getAllVisitors();
      const sortedVisitors = sortVisitors(response.data);
      setVisitors(sortedVisitors);
      setFilteredVisitors(sortedVisitors);
    } catch (err: any) {
      toast.error(err?.message || 'Failed to fetch visitors');
    } finally {
      setLoading(false);
    }
  };

  // Punch Out visitor
  // const handlePunchOut = async (id: number) => {
  //   try {
  //     const response = await visitorApi.punchOutVisitor(id);
  //     toast.success('Punch out successful');

  //     // Update local state
  //     const updatedVisitors = visitors.map((v) =>
  //       v.id === id ? { ...v, punchOutDateTime: response.data.punchOutDateTime } : v
  //     );
  //     const sortedVisitors = sortVisitors(updatedVisitors);

  //     setVisitors(sortedVisitors);
  //     setFilteredVisitors(sortedVisitors);

  //   } catch (err) {
  //     toast.error('Punch out failed');
  //   }
  // };






// const handlePunchOut = async (id: number) => {
//   try {
//     const response = await visitorApi.punchOutVisitor(id);
//     toast.success('Punch out successful');

//     // Update the visitor locally
//     const updatedVisitors = visitors.map(v =>
//       v.id === id ? { ...v, punchOutDateTime: response.data.punchOutDateTime } : v
//     );

//     // Sort after update
//     const sortedVisitors = sortVisitors(updatedVisitors);

//     // Update both states
//     setVisitors(sortedVisitors);
//     // Also update filteredVisitors according to current filters/search
//     const updatedFiltered = filteredVisitors.map(v =>
//       v.id === id ? { ...v, punchOutDateTime: response.data.punchOutDateTime } : v
//     );
//     setFilteredVisitors(sortVisitors(updatedFiltered));

//   } catch (err) {
//     toast.error('Punch out failed');
//   }
// };




const handlePunchOut = async (id: number) => {
  try {
    setLoading(true);

    // Call API to punch out
    await visitorApi.punchOutVisitor(id);

    // Fetch latest visitors from backend
    const response = await visitorApi.getAllVisitors();

    // Sort and update state
    const sortedVisitors = sortVisitors(response.data);
    setVisitors(sortedVisitors);
    setFilteredVisitors(sortedVisitors);

    toast.success("Punch out successful");
  } catch (err: any) {
    toast.error("Punch out failed");
  } finally {
    setLoading(false);
  }
};







  // Search visitors
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = visitors.filter(
      (v) =>
        v.fullName.toLowerCase().includes(query.toLowerCase()) ||
        v.mobileNumber.includes(query) ||
        v.companyName.toLowerCase().includes(query.toLowerCase())
    );
    // setFilteredVisitors(filtered);
    setFilteredVisitors(sortVisitors(filtered));

  };

  // Filter by date
  const handleDateFilter = (date: Date | null) => {
    setDateFilter(date);
    if (!date) {
      setFilteredVisitors(visitors);
      return;
    }

    const filtered = visitors.filter((v) => {
      const visitorDate = new Date(v.visitDate);
      return (
        visitorDate.getFullYear() === date.getFullYear() &&
        visitorDate.getMonth() === date.getMonth() &&
        visitorDate.getDate() === date.getDate()
      );
    });

    setFilteredVisitors(sortVisitors(filtered));
  };

  // // Sort visitors: active first, then punched-out
  // const sortVisitors = (list: Visitor[]) =>
  //   [...list].sort((a, b) => {
  //     const aActive = !a.punchOutDateTime;
  //     const bActive = !b.punchOutDateTime;

  //     if (aActive && !bActive) return -1;
  //     if (!aActive && bActive) return 1;

  //     if (aActive && bActive) {
  //       return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  //     }

  //     if (!aActive && !bActive) {
  //       return new Date(b.punchOutDateTime!).getTime() - new Date(a.punchOutDateTime!).getTime();
  //     }

  //     return 0;
  //   });


const sortVisitors = (list: Visitor[]) =>
  [...list].sort((a, b) => {
    const aActive = !a.punchOutDateTime;
    const bActive = !b.punchOutDateTime;

    // Active visitors first
    if (aActive && !bActive) return -1;
    if (!aActive && bActive) return 1;

    // Both active → newest created first
    if (aActive && bActive) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    // Both punched-out → latest punch-out first
    return new Date(b.punchOutDateTime!).getTime() - new Date(a.punchOutDateTime!).getTime();
  });





  // Export CSV
  const handleExport = () => {
    if (filteredVisitors.length === 0) {
      toast.error("No visitors to export");
      return;
    }

    const headers = [
      "Full Name", "Gender", "Mobile Number", "Company Name", "Email",
      "Host", "Purpose", "Visit Date", "Visit Time", "Punch Out DateTime"
    ];

    const rows = filteredVisitors.map(v => [
      v.fullName, v.gender, v.mobileNumber, v.companyName,
      v.emailId || '-', v.hostName, v.purposeOfVisit, v.visitDate,
      v.visitTime, v.punchOutDateTime ? formatDateTime(v.punchOutDateTime) : '-'
    ]);

    const csvContent =
      [headers, ...rows].map(e => e.map(f => `"${f}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `visitors_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Visitor Reports</h1>
        <p className="text-muted-foreground mt-1">
          View and manage all visitor entries
        </p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>All Visitors</CardTitle>
              <CardDescription>Complete list of registered visitors</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowDateFilter(!showDateFilter)}>
                <Calendar className="w-4 h-4 mr-2" /> Filter by Date
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" /> Export
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, mobile, or company..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            <Button variant="outline" size="icon" className="h-11 w-11">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {showDateFilter && (
            <div className="flex gap-4 mb-6">
              <DatePicker
                selected={dateFilter}
                onChange={handleDateFilter}
                className="border px-3 py-2 rounded w-60"
                placeholderText="Select a date"
                dateFormat="yyyy-MM-dd"
              />
              <Button variant="outline" onClick={() => handleDateFilter(null)}>Clear</Button>
            </div>
          )}

          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Photo</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Host</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Punch Out</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVisitors.map(visitor => (
                  <TableRow key={visitor.id} className="hover:bg-muted/30">
                    <TableCell>
                      <img
                        src={visitor.photo ? `data:image/jpeg;base64,${visitor.photo}` : '/dcm/image.png'}
                        alt="Visitor"
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                    </TableCell>
                    <TableCell>{visitor.fullName}</TableCell>
                    <TableCell><Badge variant="outline">{visitor.gender}</Badge></TableCell>
                    <TableCell>{visitor.mobileNumber}</TableCell>
                    <TableCell>{visitor.companyName}</TableCell>
                    <TableCell>{visitor.emailId || '-'}</TableCell>
                    <TableCell>{visitor.hostName}</TableCell>
                    <TableCell>{visitor.purposeOfVisit}</TableCell>
                    <TableCell>{formatDateTime(`${visitor.visitDate}T${visitor.visitTime}`)}</TableCell>
                    <TableCell>{formatDateTime(visitor.punchOutDateTime)}</TableCell>
                    {/* <TableCell>
                      {visitor.punchOutDateTime ? (
                        <Badge variant="secondary">Punched Out</Badge>
                      ) : (
                        <Button size="sm" onClick={() => handlePunchOut(visitor.id)}>Punch Out</Button>
                      )}
                    </TableCell> */}
    <TableCell>
  {visitor.punchOutDateTime ? (
    <Badge variant="secondary">Punched Out</Badge>
  ) : (
    <Button size="sm" onClick={() => handlePunchOut(visitor.id)}>
      Punch Out
    </Button>
  )}
</TableCell>


                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredVisitors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No visitors found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
