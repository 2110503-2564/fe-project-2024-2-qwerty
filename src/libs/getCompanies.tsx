'use server'

export default async function getCompanies(page?:number, limit?:number) {
      const response = await fetch(`https://cedt-frontend-project-backend.vercel.app/api/v1/companies?page=${page??1}&&limit=${limit??25}`);
      if(!response.ok){
            throw new Error("Failed to fetch companies");
      }
      return await response.json();
}