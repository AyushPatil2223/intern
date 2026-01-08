import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AuthState, LoginCredentials, User, UserLoginCredentials } from "@/types";
import { authApi } from "@/lib/api";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      employee: null,
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,
      captchaImage: null,

      login: async (credentials: LoginCredentials) => {
        try {
          const response = await authApi.login(credentials);

          const employee = response.data.responseObject; // extract user details
          const role = response.data.responseObject.roles;
          const token = response.data.token || null; // if backend later adds token
          // alert(user)

          set({
            employee,
            role,
            token,
            isAuthenticated: true,
          });
        } catch (error) {
          throw error;
        }
      },


      // 🔹 USER LOGIN
      userLogin: async (credentials: UserLoginCredentials) => {
        const res = await authApi.userLogin(credentials);

        set({
          user: {
            id: "",
            name: res.data.username,
            mobile: res.data.mobile,
            role: res.data.role,
            createdAt: "",
          },
          token: res.data.token,
          role: res.data.role,
          isAuthenticated: true,
        });
      },


      
      // // ✅ NEW USER LOGIN (Captcha + Encrypted Password)
      // userLogin: async (data : LoginCredentials) => {
      //   const response = await authApi.userLogin(data);

      //   set({
      //     user: {
      //       name: response.data.username,
      //       mobile: response.data.mobile,
      //       role: response.data.role,
      //     },
      //     token: response.data.token,
      //     role: response.data.role,
      //     isAuthenticated: true,
      //   });

      //   return response;
      // },


      fetchCaptcha: async () => {
        try {
          const response = await authApi.captcha();

          set({
            captchaImage: response.data.captchaImage, // full data URL already
            // captchaId: response.data.captchaId,
          });
        } catch (error) {
          console.error("Captcha error:", error);
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      setUser: (user: User | null) => {
        set({ user });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
