// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { toast } from 'sonner';
// import { VisitorFormData } from '@/types';
// import { useAuthStore } from '@/store/authStore';
// import { UserPlus } from 'lucide-react';
// import { visitorApi } from '@/lib/api';
// import { useState } from 'react';
// import {  CreateVisitorPayload } from '@/types';

// export default function AddVisitor() {
  
// const [loading, setLoading] = useState(false);
//   const { user } = useAuthStore();
//   const navigate = useNavigate();
//   const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<VisitorFormData>({
//     defaultValues: {
//       gender: 'male',
//     },
//   }
  

// );

//   const gender = watch('gender');
// // const onSubmit = async (data: VisitorFormData) => {
// //   try {
// //     setLoading(true);

// //     const payload: CreateVisitorPayload = {
// //       ...data,
// //       host: user!.name, // ✅ now TS is happy
// //     };

// //     await visitorApi.createVisitor(payload);

// //     toast.success('Visitor added successfully');
// //     reset();

// //   } catch (err: any) {
// //     toast.error(
// //       err?.response?.data?.message || 'Failed to add visitor'
// //     );
// //   } finally {
// //     setLoading(false);
// //   }
// // };
//   const photoFile = watch('photo');


// const onSubmit = async (data: VisitorFormData) => {
//   try {
//     setLoading(true);

//     const formData = new FormData();
//     formData.append('name', data.name);
//     formData.append('mobile', data.mobile);
//     formData.append('gender', data.gender);
//     formData.append('company', data.company);
//     if (data.email) formData.append('email', data.email);
//     formData.append('host', user!.name);

//     if (data.photo && data.photo.length > 0) {
//       formData.append('photo', data.photo[0]);
//     }

//     await visitorApi.createVisitor(formData);

//     toast.success('Visitor added successfully');
//     reset();
//   } catch (err: any) {
//     toast.error(err?.response?.data?.message || 'Failed to add visitor');
//   } finally {
//     setLoading(false);
//   }
// };



      
//   //   try {
//   //     // Mock API call - replace with actual visitorApi.createVisitor(data)
//   //     await new Promise(resolve => setTimeout(resolve, 500));
      
//   //     toast.success('Visitor added successfully!');
//   //     navigate('/reports');
//   //   } catch (error) {
//   //     toast.error('Failed to add visitor. Please try again.');
//   //   }
//   // };

//   return (
//     <div className="max-w-3xl mx-auto">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
//           <UserPlus className="w-8 h-8 text-primary" />
//           Add New Visitor
//         </h1>
//         <p className="text-muted-foreground mt-1">
//           Register a new visitor to the facility
//         </p>
//       </div>

//       <Card className="border-0 shadow-xl">
//         <CardHeader>
//           <CardTitle>Visitor Information</CardTitle>
//           <CardDescription>
//             Fill in the details below. All fields marked with * are required.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

//   {/* Photo preview */}
//   {photoFile && photoFile.length > 0 && (
//     <div className="flex flex-col items-center mb-6">
//       <img
//         src={URL.createObjectURL(photoFile[0])}
//         alt="Visitor Preview"
//         className="w-32 h-32 object-cover rounded-full border border-border"
//       />
//       <Button
//         type="button"
//         variant="outline"
//         size="sm"
//         className="mt-2"
//         onClick={() => setValue('photo', undefined)}
//       >
//         Remove Photo
//       </Button>
//     </div>
//   )}

//   {/* Photo Upload Input (TOP) */}
//   <div className="space-y-2 flex flex-col items-center">
//     <Label htmlFor="photo">Visitor Photo</Label>
//     <Input
//       id="photo"
//       type="file"
//       accept="image/*"
//       {...register('photo')}
//       className="max-w-xs"
//     />
//   </div>

//   {/* Name + Mobile */}
//   <div className="grid gap-6 md:grid-cols-2">
//     ...
//   </div>




            
//             <div className="grid gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Full Name *</Label>
//                 <Input
//                   id="name"
//                   placeholder="Enter visitor's full name"
//                   {...register('name', { required: 'Name is required' })}
//                   className="h-11"
//                 />
//                 {errors.name && (
//                   <p className="text-sm text-destructive">{errors.name.message}</p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="mobile">Mobile Number *</Label>
//                 <Input
//                   id="mobile"
//                   placeholder="10-digit mobile number"
//                   {...register('mobile', {
//                     required: 'Mobile number is required',
//                     pattern: {
//                       value: /^[0-9]{10}$/,
//                       message: 'Please enter a valid 10-digit mobile number',
//                     },
//                   })}
//                   className="h-11"
//                 />
//                 {errors.mobile && (
//                   <p className="text-sm text-destructive">{errors.mobile.message}</p>
//                 )}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label>Gender *</Label>
//               <RadioGroup
//                 value={gender}
//                 onValueChange={(value) => setValue('gender', value as any)}
//                 className="flex gap-6"
//               >
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="male" id="male" />
//                   <Label htmlFor="male" className="font-normal cursor-pointer">Male</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="female" id="female" />
//                   <Label htmlFor="female" className="font-normal cursor-pointer">Female</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <RadioGroupItem value="other" id="other" />
//                   <Label htmlFor="other" className="font-normal cursor-pointer">Other</Label>
//                 </div>
//               </RadioGroup>
//             </div>

//             <div className="grid gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="company">Company Name *</Label>
//                 <Input
//                   id="company"
//                   placeholder="Enter company name"
//                   {...register('company', { required: 'Company name is required' })}
//                   className="h-11"
//                 />
//                 {errors.company && (
//                   <p className="text-sm text-destructive">{errors.company.message}</p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="email">Email ID (Optional)</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="visitor@example.com"
//                   {...register('email', {
//                     pattern: {
//                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                       message: 'Please enter a valid email address',
//                     },
//                   })}
//                   className="h-11"
//                 />
//                 {errors.email && (
//                   <p className="text-sm text-destructive">{errors.email.message}</p>
//                 )}
//               </div>

//                             {/* <div className="space-y-2">
//   <Label htmlFor="photo">Visitor Photo</Label>
//   <Input
//     id="photo"
//     type="file"
//     accept="image/*"
//     {...register('photo')}
//     className="h-11"
//   />
// </div>
//  */}


//             </div>

//             <div className="p-4 rounded-lg bg-muted/50 border border-border">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium">Engineer/Host</p>
//                   <p className="text-sm text-muted-foreground">{user?.name}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm font-medium">Date & Time</p>
//                   <p className="text-sm text-muted-foreground">
//                     {new Date().toLocaleString()}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-4 pt-4">
             
//              <Button
//   type="submit"
//   disabled={loading}
//   className="flex-1 h-11 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90"
// >
//   {loading ? 'Saving...' : 'Add Visitor'}
// </Button>



//               {/* <Button
//                 type="submit"
//                 disabled={loading}

//                 className="flex-1 h-11 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90"
//               >
//                 Add Visitor
//               </Button> */}
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
import { Controller } from 'react-hook-form';


  import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { VisitorFormData } from '@/types';
import { useAuthStore } from '@/store/authStore';
import { UserPlus } from 'lucide-react';
import { visitorApi } from '@/lib/api';
import { useState, useRef } from 'react';

export default function AddVisitor() {
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<File | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset, control } = useForm<VisitorFormData>({
    defaultValues: { gender: 'male' },
  });

  const gender = watch('gender');

  const mobile = watch('mobile');


useEffect(() => {
  const fetchVisitor = async () => {
    if (mobile && mobile.length === 10) {
      try {
        console.log('Fetching visitor for mobile:', mobile);
        const res = await visitorApi.getVisitorByMobile(mobile);
        const v = res.data;
        console.log('Visitor API response:', res);

        // Auto-fill all fields using reset
        reset({
          name: v.fullName || '',
          gender: v.gender || 'male',
          company: v.companyName || '',
          email: v.emailId || '',
          photo: undefined, // reset photo if needed
          mobile,           // keep mobile as is
        });

        toast.success('Visitor details auto-filled');
      } catch (err) {
        console.log('Visitor not found, user can fill manually');
        // Optional: clear fields if not found
        // reset({ name: '', gender: 'male', company: '', email: '', mobile });
      }
    }
  };

  fetchVisitor();
}, [mobile, reset]);





  const onSubmit = async (data: VisitorFormData) => {

    if (!capturedPhoto && (!data.photo || data.photo.length === 0)) {
    toast.error('Photo is required');
    return;
  }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('mobile', data.mobile);
      formData.append('gender', data.gender);
      formData.append('company', data.company);
      if (data.email) formData.append('email', data.email);
      // formData.append('host', user!.name);
      formData.append('host', user!.mobile);
      formData.append('purposeOfVisit', data.purpose);



      if (capturedPhoto) {
        formData.append('photo', capturedPhoto);
      }

      await visitorApi.createVisitor(formData);

      toast.success('Visitor added successfully');
      reset();
      setCapturedPhoto(null);
      setCameraActive(false);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to add visitor');
    } finally {
      setLoading(false);
    }
  };

  const startCamera = async () => {
    setCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      toast.error('Unable to access camera');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext('2d');
    if (!context) return;

    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0);

    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'visitor_photo.png', { type: 'image/png' });
        setCapturedPhoto(file);
      }
    }, 'image/png');

    // Stop camera
    const stream = videoRef.current.srcObject as MediaStream;
    stream.getTracks().forEach(track => track.stop());
    setCameraActive(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <UserPlus className="w-8 h-8 text-primary" />
          Add New Visitor
        </h1>
        <p className="text-muted-foreground mt-1">
          Enter visitor details entered datacenter
        </p>
      </div>

      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle>Visitor Information</CardTitle>
          <CardDescription>
            Fill in the details below. All fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Camera preview & capture */}
            {capturedPhoto ? (
              <div className="flex flex-col items-center mb-6">
                <img
                  src={URL.createObjectURL(capturedPhoto)}
                  alt="Visitor Preview"
                  className="w-32 h-32 object-cover rounded-full border border-border"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => setCapturedPhoto(null)}
                >
                  Retake Photo
                </Button>
              </div>
            ) : cameraActive ? (
              <div className="flex flex-col items-center mb-6">
                <video ref={videoRef} className="w-64 h-64 object-cover rounded-lg border border-border" />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={capturePhoto}
                >
                  Capture
                </Button>
              </div>
            ) : (
              <Button type="button" onClick={startCamera}>
                Open Camera
              </Button>
            )}

            <canvas ref={canvasRef} style={{ display: 'none' }} />

            {!capturedPhoto && (!watch('photo') || watch('photo').length === 0) && (
  <p className="text-sm text-destructive">Photo is required</p>
)}


            {/* Name + Mobile */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <input
                  id="name"
                  placeholder="Enter visitor's full name"
                  {...register('name', { required: 'Name is required' })}


                  className="h-11 w-full border rounded px-3"
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number *</Label>
                <input
                  id="mobile"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  {...register('mobile', {
                    required: 'Mobile number is required',
                    pattern: { value: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit mobile number' },
                  })}
                  className="h-11 w-full border rounded px-3"
                />
                {errors.mobile && <p className="text-sm text-destructive">{errors.mobile.message}</p>}
              </div>
            </div>






{/* // gender */}


  <div className="space-y-2">
  <Label>Gender *</Label>
  <Controller
    name="gender"
    control={control} // from useForm({ control })
    defaultValue="male"
    render={({ field }) => (
      <RadioGroup
        {...field}
        className="flex gap-6"
        onValueChange={(value) => field.onChange(value)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="male" id="male" />
          <Label htmlFor="male" className="font-normal cursor-pointer">Male</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="female" id="female" />
          <Label htmlFor="female" className="font-normal cursor-pointer">Female</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="other" id="other" />
          <Label htmlFor="other" className="font-normal cursor-pointer">Other</Label>
        </div>
      </RadioGroup>
    )}
  />
</div>



<div className="space-y-2">
  <Label htmlFor="purpose">Purpose of Visit *</Label>
  <input
    id="purpose"
    placeholder="Enter purpose of visit"
    {...register('purpose', { required: 'Purpose is required' })}
    className="h-11 w-full border rounded px-3"
  />
  {errors.purpose && <p className="text-sm text-destructive">{errors.purpose.message}</p>}
</div>



            {/* Company + Email */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name *</Label>
                <input
                  id="company"
                  placeholder="Enter company name"
                  {...register('company', { required: 'Company name is required' })}
                  

                  className="h-11 w-full border rounded px-3"
                />
                {errors.company && <p className="text-sm text-destructive">{errors.company.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email ID (Optional)</Label>
                <input
                  id="email"
                  type="email"
                  placeholder="visitor@example.com"
                  {...register('email', {
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Please enter a valid email address' },
                  })}
                  
                  className="h-11 w-full border rounded px-3"
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
            </div>

            {/* Host + Date */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Engineer/Host</p>
                  <p className="text-sm text-muted-foreground">{user?.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Date & Time</p>
                  <p className="text-sm text-muted-foreground">{new Date().toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Submit + Cancel */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 h-11 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90"
              >
                {loading ? 'Saving...' : 'Add Visitor'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="flex-1 h-11"
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







































// import { useForm, Controller } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// import { toast } from 'sonner';
// import { VisitorFormData } from '@/types';
// import { useAuthStore } from '@/store/authStore';
// import { UserPlus } from 'lucide-react';
// import { visitorApi } from '@/lib/api';
// import { useState, useEffect, useRef } from 'react';


// // import Webcam from "react-webcam";
// import Webcam from "react-webcam";


// import type { Webcam as WebcamType } from 'react-webcam';


// export default function AddVisitor() {
//   const [loading, setLoading] = useState(false);
//   const [capturedPhoto, setCapturedPhoto] = useState<File | null>(null);

//   const { user } = useAuthStore();
//   const navigate = useNavigate();
//   const { register, handleSubmit, formState: { errors }, setValue, watch, reset, control } = useForm<VisitorFormData>({
//     defaultValues: { gender: 'male' },
//   });

//   const gender = watch('gender');
//   const mobile = watch('mobile');

//   //const webcamRef = useRef<Webcam>(null);
// const webcamRef = useRef<any>(null);



//   // Auto-fill visitor details when mobile number entered
//   useEffect(() => {
//     const fetchVisitor = async () => {
//       if (mobile && mobile.length === 10) {
//         try {
//           const res = await visitorApi.getVisitorByMobile(mobile);
//           const v = res.data;
//           reset({
//             name: v.fullName || '',
//             gender: v.gender || 'male',
//             company: v.companyName || '',
//             email: v.emailId || '',
//             photo: undefined,
//             mobile,
//           });
//           toast.success('Visitor details auto-filled');
//         } catch (err) {
//           console.log('Visitor not found, user can fill manually');
//         }
//       }
//     };
//     fetchVisitor();
//   }, [mobile, reset]);

//   const onSubmit = async (data: VisitorFormData) => {
//     if (!capturedPhoto && (!data.photo || data.photo.length === 0)) {
//       toast.error('Photo is required');
//       return;
//     }

//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append('name', data.name);
//       formData.append('mobile', data.mobile);
//       formData.append('gender', data.gender);
//       formData.append('company', data.company);
//       if (data.email) formData.append('email', data.email);
//       formData.append('host', user!.mobile);
//       formData.append('purposeOfVisit', data.purpose);

//       if (capturedPhoto) {
//         formData.append('photo', capturedPhoto);
//       } else if (data.photo && data.photo.length > 0) {
//         formData.append('photo', data.photo[0]);
//       }

//       await visitorApi.createVisitor(formData);

//       toast.success('Visitor added successfully');
//       reset();
//       setCapturedPhoto(null);
//     } catch (err: any) {
//       toast.error(err?.response?.data?.message || 'Failed to add visitor');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const capturePhoto = () => {
//     const imageSrc = webcamRef.current?.getScreenshot();
//     if (!imageSrc) return;

//     const byteString = atob(imageSrc.split(',')[1]);
//     const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
//     const ab = new ArrayBuffer(byteString.length);
//     const ia = new Uint8Array(ab);
//     for (let i = 0; i < byteString.length; i++) {
//       ia[i] = byteString.charCodeAt(i);
//     }
//     const file = new File([ab], 'visitor_photo.png', { type: mimeString });
//     setCapturedPhoto(file);
//   };

//   return (
//     <div className="max-w-3xl mx-auto">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
//           <UserPlus className="w-8 h-8 text-primary" />
//           Add New Visitor
//         </h1>
//         <p className="text-muted-foreground mt-1">
//           Enter visitor details
//         </p>
//       </div>

//       <Card className="border-0 shadow-xl">
//         <CardHeader>
//           <CardTitle>Visitor Information</CardTitle>
//           <CardDescription>
//             Fill in the details below. All fields marked with * are required.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

//             {/* Camera preview & capture */}
//             {capturedPhoto ? (
//               <div className="flex flex-col items-center mb-6">
//                 <img
//                   src={URL.createObjectURL(capturedPhoto)}
//                   alt="Visitor Preview"
//                   className="w-32 h-32 object-cover rounded-full border border-border"
//                 />
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="sm"
//                   className="mt-2"
//                   onClick={() => setCapturedPhoto(null)}
//                 >
//                   Retake Photo
//                 </Button>
//               </div>
//             ) : (
//               <div className="flex flex-col items-center mb-6">
//                   <Webcam
//   ref={webcamRef}
//   audio={false}
//   screenshotFormat="image/png"
//   videoConstraints={{ facingMode: "user" }}
//   className="w-64 h-64 object-cover rounded-lg border border-border"
// />
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="sm"
//                   className="mt-2"
//                   onClick={capturePhoto}
//                 >
//                   Capture Photo
//                 </Button>
//               </div>
//             )}

//             {!capturedPhoto && (!watch('photo') || watch('photo').length === 0) && (
//               <p className="text-sm text-destructive">Photo is required</p>
//             )}

//             {/* Name + Mobile */}
//             <div className="grid gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Full Name *</Label>
//                 <input
//                   id="name"
//                   placeholder="Enter visitor's full name"
//                   {...register('name', { required: 'Name is required' })}
//                   className="h-11 w-full border rounded px-3"
//                 />
//                 {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="mobile">Mobile Number *</Label>
//                 <input
//                   id="mobile"
//                   placeholder="10-digit mobile number"
//                   {...register('mobile', {
//                     required: 'Mobile number is required',
//                     pattern: { value: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit mobile number' },
//                   })}
//                   className="h-11 w-full border rounded px-3"
//                 />
//                 {errors.mobile && <p className="text-sm text-destructive">{errors.mobile.message}</p>}
//               </div>
//             </div>

//             {/* Gender */}
//             <div className="space-y-2">
//               <Label>Gender *</Label>
//               <Controller
//                 name="gender"
//                 control={control}
//                 defaultValue="male"
//                 render={({ field }) => (
//                   <RadioGroup {...field} className="flex gap-6" onValueChange={field.onChange}>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="male" id="male" />
//                       <Label htmlFor="male" className="font-normal cursor-pointer">Male</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="female" id="female" />
//                       <Label htmlFor="female" className="font-normal cursor-pointer">Female</Label>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <RadioGroupItem value="other" id="other" />
//                       <Label htmlFor="other" className="font-normal cursor-pointer">Other</Label>
//                     </div>
//                   </RadioGroup>
//                 )}
//               />
//             </div>

//             {/* Purpose */}
//             <div className="space-y-2">
//               <Label htmlFor="purpose">Purpose of Visit *</Label>
//               <input
//                 id="purpose"
//                 placeholder="Enter purpose of visit"
//                 {...register('purpose', { required: 'Purpose is required' })}
//                 className="h-11 w-full border rounded px-3"
//               />
//               {errors.purpose && <p className="text-sm text-destructive">{errors.purpose.message}</p>}
//             </div>

//             {/* Company + Email */}
//             <div className="grid gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="company">Company Name *</Label>
//                 <input
//                   id="company"
//                   placeholder="Enter company name"
//                   {...register('company', { required: 'Company name is required' })}
//                   className="h-11 w-full border rounded px-3"
//                 />
//                 {errors.company && <p className="text-sm text-destructive">{errors.company.message}</p>}
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email ID (Optional)</Label>
//                 <input
//                   id="email"
//                   type="email"
//                   placeholder="visitor@example.com"
//                   {...register('email', {
//                     pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Please enter a valid email address' },
//                   })}
//                   className="h-11 w-full border rounded px-3"
//                 />
//                 {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
//               </div>
//             </div>

//             {/* Host + Date */}
//             <div className="p-4 rounded-lg bg-muted/50 border border-border">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium">Engineer/Host</p>
//                   <p className="text-sm text-muted-foreground">{user?.name}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-sm font-medium">Date & Time</p>
//                   <p className="text-sm text-muted-foreground">{new Date().toLocaleString()}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Submit + Cancel */}
//             <div className="flex gap-4 pt-4">
//               <Button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 h-11 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90"
//               >
//                 {loading ? 'Saving...' : 'Add Visitor'}
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
