export default async function userLogIn(userEmail: string, password: string){
      const response = await fetch("https://cedt-frontend-project-backend.vercel.app/api/v1/auth/login", {
            method: "POST",
            headers: {
                  "Content-Type": "application/json",
            },
            body: JSON.stringify({
                  email: userEmail,
                  password: password,
            }),
      });

      if(!response.ok){
            throw new Error("Unable to login");
      }
      return await response.json();
}