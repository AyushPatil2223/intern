import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, ShieldCheck, RefreshCcw } from "lucide-react";
import { LoginCredentials, UserLoginCredentials } from "@/types";
import { authApi } from "@/lib/api";
import { encryptPassword } from "@/lib/utils";
// import { authApi } from "@/api/authApi";

export default function Login() {
  const { isAuthenticated, login, userLogin } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [captchaImg, setCaptchaImg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  // Load captcha when screen loads
  const loadCaptcha = async () => {
    try {
      const res = await authApi.captcha();
      setCaptchaImg(res.data.captchaImage);
    } catch {
      toast.error("Failed to load captcha");
    }
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // const onSubmit = async (data: LoginCredentials) => {
  //   setIsLoading(true);
  //   try {
  //     const encryptedPassword = encryptPassword(data.password);

  //     await login({
  //       ...data,
  //       password: encryptedPassword,
  //     });

  //     toast.success("Login successful!");
  //     navigate("/dashboard");
  //   } catch (error: any) {
  //     toast.error(
  //       error?.response?.data?.message ||
  //         "Invalid credentials. Please try again."
  //     );
  //     loadCaptcha(); // reload captcha on failure
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const onSubmit = async (data: LoginCredentials) => {
  // setIsLoading(true);

  // try {
  //   // ✅ ENSURE captcha exists in session
  //   if (!captchaImg) {
  //     await loadCaptcha();
  //     toast.error("Captcha not loaded. Please try again.");
  //     return;
  //   }

  //   const encryptedPassword = encryptPassword(data.password);

    // await login({
    //   ...data,
    //   password: encryptedPassword,
    // });

//     if (data.username.length === 8) {
//     // Employee login
//     await authApi.login({
//       username: data.username,    // maps to EmpLoginReq.username
//       password: encryptedPassword,
//       captcha: data.captcha,
//     });
//   } else if (data.username.length === 10) {
//     // User login
//     await authApi.userLogin({
//       mobile: data.username,      // maps to UserLoginRequest.mobile
//       password: encryptedPassword,
//       captcha: data.captcha,
//     });

//     }else{
//      toast.error("Invalid username format");
//       return;
//     }
//     toast.success("Login successful!");
//     navigate("/dashboard");

//   } catch (error: any) {
//     toast.error(
//       error?.response?.data?.message ||
//       "Invalid credentials. Please try again."
//     );
//     await loadCaptcha();
//   } finally {
//     setIsLoading(false);
//   }
// };

const onSubmit = async (data: LoginCredentials) => {
  setIsLoading(true);

  try {
    if (!captchaImg) {
      await loadCaptcha();
      toast.error("Captcha not loaded. Please try again.");
      return;
    }

    const encryptedPassword = encryptPassword(data.password);

    if (data.username.length === 8) {
      // Employee login
      await login({
        username: data.username,
        password: encryptedPassword,
        captcha: data.captcha,
      });
    } else if (data.username.length === 10) {

      
      // User login
      const userData: UserLoginCredentials = {
        mobile: data.username,
        password: encryptedPassword,
        captcha: data.captcha,
      };
      await userLogin(userData);

    } else {
      toast.error("Invalid username format");
      return;
    }

    // ✅ Now store is updated, we can navigate
    toast.success("Login successful!");
    navigate("/dashboard");
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Invalid credentials. Please try again.");
    await loadCaptcha(); // reload captcha on failure
  } finally {
    setIsLoading(false);
  }
};




  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          {/* <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-glow mb-4 shadow-lg"> */}
          <div className="inline-flex items-center justify-center mb-4">

            {/* <ShieldCheck className="w-8 h-8 text-white" /> */}
                      <img
            src="/IndianOilImage.jpg"
            alt="DCM Logo"
            style={{ width: "2cm", height: "2cm" }}

            className="w-8 h-8 object-contain"
          />

          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            DCM 
          </h1>
          <p className="text-muted-foreground mt-2">Datacenter Management</p>
        </div>

        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  {...register("username", { required: "Username is required" })}
                  className="h-11"
                />
                {errors.username && (
                  <p className="text-sm text-destructive">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", { required: "Password is required" })}
                  className="h-11"
                />
                {errors.password && (
                  <p className="text-sm text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Captcha */}
              <div className="space-y-2">
                <Label>Captcha</Label>
                <div className="flex items-center space-x-3">
                  {captchaImg ? (
                    <img
                      src={captchaImg}
                      alt="captcha"
                      className="h-12 rounded border"
                    />
                  ) : (
                    <div className="h-12 w-32 bg-muted animate-pulse rounded" />
                  )}

                  <Button
                    type="button"
                    variant="ghost"
                    onClick={loadCaptcha}
                    className="p-2"
                  >
                    <RefreshCcw className="w-5 h-5" />
                  </Button>
                </div>

                <Input
                  placeholder="Enter captcha"
                  {...register("captcha", { required: "Captcha is required" })}
                  className="h-11"
                />
                {errors.captcha && (
                  <p className="text-sm text-destructive">
                    {errors.captcha.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}












