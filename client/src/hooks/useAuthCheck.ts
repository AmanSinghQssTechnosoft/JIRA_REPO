import { useSelector } from "react-redux"
import type { RootState } from "../redux/store"

export const useAuthCheck = () => {
    const { isLoggin } = useSelector((state: RootState) => state.authLogin)

    return isLoggin
}
