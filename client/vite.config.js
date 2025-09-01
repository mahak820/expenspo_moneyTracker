import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  plugins: [tailwindcss(), flowbiteReact()],
   server : {
    proxy : {
      '/api' : {
        changeOrigin : true , 
        target : 'http://localhost:8000' , 
        secure : false
      }
    }
  }
})