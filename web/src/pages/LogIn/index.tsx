import { FormEvent, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/form";
import api from "../../services/api";

function LogIn() {
  const [button, setButton] = useState<string>();
  const [, setCookies] = useCookies(['token', 'tokenType']);
  const navigate = useNavigate();

  async function handleLogIn(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      const response = await api.post(`/authenticate/${button}`, {
        email: data.email,
        password: data.password
      });

      setCookies('token', response.data, {
        path: '/',
        maxAge: data.remember === "on" ? 432000 : 60,
      });

      setCookies('tokenType', `${button}`, {
        path: '/',
        maxAge: data.remember === "on" ? 432000 : 60,
      })

      navigate(`/${button}/dashboard`)
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }

  return (
    <div className="max-w-full min-h-screen flex flex-col items-center justify-center bg-[#f8f8f8]">
      <div className="w-full max-w-md space-y-8 mb-6 mt-4">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">Log in to your account</h2>
        </div>
        <form className="mt-4 bg-white p-8 rounded-md w-full shadow-lg" onSubmit={handleLogIn}>
          <div className="mt-3">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <Input id="email" autoComplete="email" name="email" type="email" required />
          </div>
          <div className="mt-7">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <Input id="password" name="password" type="password" required />
          </div>
          <div className="flex items-center justify-right mt-6">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
          </div>
          <div className="mt-8 w-full flex justify-bet gap-4 ">
            <button type="submit" onClick={() => setButton("company")} className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#1958c2] py-3 px-4 mb-4 gap-1 text-sm font-medium text-white hover:bg-[#12408f] focus:outline-none focus:ring-2 focus:ring-[#12408f] focus:ring-offset-2">
              Login as company
            </button>
            <button type="submit" onClick={() => setButton("user")} className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#ff654d]  py-3 px-4 mb-4 text-sm font-medium text-white hover:bg-[#b24635] focus:outline-none focus:ring-2 focus:ring-[#b24635] focus:ring-offset-2">
              Login as developer
            </button>
          </div>
        </form>
        <div className="flex items-center justify-end">
          <div className="flex items-center">
            <a href="/" className="text-md font-medium text-[#1958c2] hover:text-[#12408f] hover:underline">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;