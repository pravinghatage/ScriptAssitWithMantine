 // src/utils/auth.ts
export const login = (username: string, password: string): boolean => {
    // Fake login check
    if (username === "admin" && password === "password") {
      localStorage.setItem("auth", "true");
      return true;
    }
    return false;
  };
  
  export const logout = () => {
    localStorage.removeItem("auth");
  };
  
  export const isAuthenticated = (): boolean => {
    return localStorage.getItem("auth") === "true";
  };
  