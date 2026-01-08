import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, RefreshCcw } from "lucide-react";
import { LoginCredentials } from "@/types";
import { authApi } from "@/lib/api";
import { encryptPassword } from "@/lib/utils";

export default function UserLogin() {
  const { isAuthenticated, userLogin } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [captchaImg, setCaptchaImg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const loadCaptcha = async () => {
    const res = await authApi.captcha();
    setCaptchaImg(res.data.captchaImage);
  };

  useEffect(() => {
    loadCaptcha();
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data: LoginCredentials) => {
    setIsLoading(true);
    try {
      const encryptedPassword = encryptPassword(data.password);

      await userLogin({
        ...data,
        password: encryptedPassword,
      });

      toast.success("User login successful");
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
      loadCaptcha();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-20">
      <CardHeader>
        <CardTitle>User Login</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Username / Mobile</Label>
            <Input {...register("username", { required: true })} />
          </div>

          <div>
            <Label>Password</Label>
            <Input type="password" {...register("password", { required: true })} />
          </div>

          <div>
            <Label>Captcha</Label>
            <div className="flex gap-2">
              {captchaImg && <img src={captchaImg} className="h-12" />}
              <Button type="button" onClick={loadCaptcha} variant="ghost">
                <RefreshCcw size={18} />
              </Button>
            </div>
            <Input {...register("captcha", { required: true })} />
          </div>

          <Button className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
