import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";


import { toast } from "react-toastify";


export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  allUsers: [],
  
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkuser");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully", {
        position:'bottom-right'
      });
    } catch (error) {
      console.log("Error fetching sigup controller:", error);
      toast.error(error.response.data.message)
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully", {
        position:'bottom-right'
      });

    } catch (error) {
      console.log("Error fetching login controller:", error);
      toast.error(error.response.data.message)
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      
      set({ authUser: null });
      toast.success("Logged out successfully",{
        position:'bottom-right'
      });
    } catch (error) {
      console.log("Error fetching logout controller:", error);
    }
  },

  getAllUsers: async () => {
    try {
      const res = await axiosInstance.get("/auth/getallusers");
      set({ allUsers: res.data });
    } catch (error) {
      console.log("Error fetching getusers controller:", error);
    }
  },

  
}));
