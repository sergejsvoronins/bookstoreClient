import { useState } from "react";
import { LoginUser } from "../transport/user";
import { UserContext } from "../context/userContext";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<LoginUser | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
