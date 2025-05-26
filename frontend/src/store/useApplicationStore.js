import { create } from "zustand";

import { axiosInstance } from "../lib/axios";


export const useApplicationStore = create((set,get) => ({

    loanApplicationsData: [],

    getLoanApllications: async () => {
        try {
            const response = await axiosInstance.get("/applications/getloanapplications");
            set({ loanApplicationsData: response.data });
        } catch (error) {
            console.error("Error fetching loan applications:", error);
        }
    },
    createLoanApplication: async (applicationData) => {
        try {
            const response = await axiosInstance.post("/applications/applyloan", applicationData);
            set((state) => ({
                loanApplicationsData: [...state.loanApplicationsData, response.data],
            }));
        } catch (error) {
            console.error("Error creating loan application:", error);
        }
    },
    updateLoanApplicationStatus: async (id, action) => {
        try {
            const response = await axiosInstance.put(`/applications/updateapplicationstatus/${id}`, { action });
            set((state) => ({
                loanApplicationsData: state.loanApplicationsData.map((application) =>
                    application._id === id ? { ...application, action: response.data.action } : application
                ),
            }));
        } catch (error) {
            console.error("Error updating loan application status:", error);
        }
    },
    cashRecieved: 0,
    cashDisbursed: 0,
    savings: 0,
    borrowersCount: 0,
    getLoanAmountDetails: async () => {
        try {
            const response = await axiosInstance.get("/applications/getloanamountdetails");
            set({
                cashRecieved: response.data.cashRecieved,
                cashDisbursed: response.data.cashDisbursed,
                savings: response.data.savings,
                borrowersCount: response.data.borrowersCount,
            });
        } catch (error) {
            console.log("Error fetching loan amount details:", error);
        }
    },
    approveLoanAmount: async (id, amount) => {
        try {
            const response = await axiosInstance.put(`/applications/approveloanamount/${id}`, { amount });
            set((state) => ({
                cashDisbursed: state.cashDisbursed + amount,
                savings: state.savings - amount,
                borrowersCount: state.borrowersCount + 1,
            }));
        } catch (error) {
            console.log("Error approving loan amount:", error);
        }
    },
    
}))