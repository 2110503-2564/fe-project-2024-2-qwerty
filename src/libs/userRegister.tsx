export default async function userRegister(name: string, userEmail: string, tel: string, password: string){
      const response = await fetch("https://cedt-frontend-project-backend.vercel.app/api/v1/auth/register", {
            method: "POST",
            headers: {
                  "Content-Type": "application/json",
            },
            body: JSON.stringify({
                  name: name,
                  email: userEmail,
                  tel: tel,
                  password: password,
                  role: 'user'
            }),
      });

      if(!response.ok){
            throw new Error("Unable to register");
      }
      return await response.json();
}