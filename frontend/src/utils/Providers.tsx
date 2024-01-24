import { store } from "../../redux/store";
import { ProviderType } from "./types";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
export default function Providers({ children }: ProviderType) {
    return <>
        <Provider store={store}>
            <Toaster />
            {children}
        </Provider>
    </>
}