import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'; 
export interface Payments {
    srNo: number;
    invoice: string;
    dueDate: string;
    feesPaid: string;
}

interface PaymentsState{
    payment: Payments[];
}

const initialState:PaymentsState={
    payment:[
    { srNo: 1, invoice: "INV-001", dueDate: "2025-06-01", feesPaid: "₹5,000" },
    { srNo: 2, invoice: "INV-002", dueDate: "2025-06-02", feesPaid: "₹3,500" },
    { srNo: 3, invoice: "INV-003", dueDate: "2025-06-03", feesPaid: "₹6,200" },
    { srNo: 4, invoice: "INV-004", dueDate: "2025-06-04", feesPaid: "₹4,000" },
    { srNo: 5, invoice: "INV-005", dueDate: "2025-06-05", feesPaid: "₹7,800" },
    { srNo: 6, invoice: "INV-006", dueDate: "2025-06-06", feesPaid: "₹2,900" },
    { srNo: 7, invoice: "INV-007", dueDate: "2025-06-07", feesPaid: "₹5,400" },
    { srNo: 8, invoice: "INV-008", dueDate: "2025-06-08", feesPaid: "₹3,200" },
    { srNo: 9, invoice: "INV-009", dueDate: "2025-06-09", feesPaid: "₹6,000" },
    { srNo: 10, invoice: "INV-010", dueDate: "2025-06-10", feesPaid: "₹4,500" },
    { srNo: 11, invoice: "INV-011", dueDate: "2025-06-11", feesPaid: "₹5,600" },
    { srNo: 12, invoice: "INV-012", dueDate: "2025-06-12", feesPaid: "₹3,700" },
    { srNo: 13, invoice: "INV-013", dueDate: "2025-06-13", feesPaid: "₹6,800" },
    { srNo: 14, invoice: "INV-014", dueDate: "2025-06-14", feesPaid: "₹4,200" },
    { srNo: 15, invoice: "INV-015", dueDate: "2025-06-15", feesPaid: "₹7,100" },
    { srNo: 16, invoice: "INV-016", dueDate: "2025-06-16", feesPaid: "₹5,300" },
    { srNo: 17, invoice: "INV-017", dueDate: "2025-06-17", feesPaid: "₹3,600" },
    { srNo: 18, invoice: "INV-018", dueDate: "2025-06-18", feesPaid: "₹6,500" },
    { srNo: 19, invoice: "INV-019", dueDate: "2025-06-19", feesPaid: "₹4,100" },
    { srNo: 20, invoice: "INV-020", dueDate: "2025-06-20", feesPaid: "₹7,900" },
    { srNo: 21, invoice: "INV-021", dueDate: "2025-06-21", feesPaid: "₹5,700" },
    { srNo: 22, invoice: "INV-022", dueDate: "2025-06-22", feesPaid: "₹3,800" },
    { srNo: 23, invoice: "INV-023", dueDate: "2025-06-23", feesPaid: "₹6,900" },
    { srNo: 24, invoice: "INV-024", dueDate: "2025-06-24", feesPaid: "₹4,600" },
    { srNo: 25, invoice: "INV-025", dueDate: "2025-06-25", feesPaid: "₹7,200" },
    { srNo: 26, invoice: "INV-026", dueDate: "2025-06-26", feesPaid: "₹5,100" },
    { srNo: 27, invoice: "INV-027", dueDate: "2025-06-27", feesPaid: "₹3,900" },
    { srNo: 28, invoice: "INV-028", dueDate: "2025-06-28", feesPaid: "₹6,300" },
    { srNo: 29, invoice: "INV-029", dueDate: "2025-06-29", feesPaid: "₹4,300" },
    { srNo: 30, invoice: "INV-030", dueDate: "2025-06-30", feesPaid: "₹7,600" },
    ]
}

const paymentSlice=createSlice({
    name:"payments",
    initialState,
    reducers:{
        addPayments:(state,action:PayloadAction<Payments>)=>{
          state.payment.push(action.payload)
        }
    }
})

export const { addPayments } = paymentSlice.actions;
export default paymentSlice.reducer;