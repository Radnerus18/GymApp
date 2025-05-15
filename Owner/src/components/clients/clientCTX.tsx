import { createContext } from "react";
interface ClientContextType {
  adminID: string;
}
export const ClientContext = createContext<ClientContextType>({ adminID: "" });
