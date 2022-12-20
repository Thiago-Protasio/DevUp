import { FormEvent } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/form";
import api from "../../services/api";

function UserSignUp() {
  const [, setCookies] = useCookies(['token', 'tokenType']);
  const navigate = useNavigate();

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      const response = await api.post('/users', {
        email: data.email,
        name: data.name,
        password: data.password,
        password_confirm: data.password_confirm,
        birthday: data.birthday
      });

      setCookies('token', response.data, {
        path: '/',
        maxAge: data.remember === "on" ? 432000 : 30,
      });

      setCookies('tokenType', "user", {
        path: '/',
        maxAge: data.remember === "on" ? 432000 : 60,
      })

      navigate("/user/dashboard");
    } catch (error: any) {
      alert(`Error: ${error}`);
    }
  }
  return (
    <div className="max-w-full min-h-screen flex flex-col items-center justify-center bg-[#f8f8f8]">
      <div className="w-full max-w-md space-y-8 mb-2 mt-4">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">Sign up and find your new job</h2>
        </div>
        <form className="mt-3 bg-white p-8 rounded-md w-full shadow-lg" onSubmit={handleRegister}>
          <div className="mx-3">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <Input id="name" name="name" type="text" required />
          </div>
          <div className="mt-3 mx-3">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="mt-3 mx-3">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <Input id="password" name="password" type="password" required />
          </div>
          <div className="mt-3 mx-3">
            <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <Input id="password-confirm" name="password_confirm" type="password" required />
          </div>
          <div className="mt-3 mx-3">
            <label htmlFor="password-confirm" className="block text-sm font-medium text-gray-700">Birthday</label>
            <Input id="birthday" name="birthday" type="date" required />
          </div>
          <div className="flex items-center justify-right mx-3 mt-4">
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
          <div className="mt-4 mx-3">
            <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#1958c2] py-2 px-4 text-sm font-medium text-white hover:bg-[#12408f] focus:outline-none focus:ring-2 focus:ring-[#12408f] focus:ring-offset-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-blue-400 group-hover:text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
              </span>
              Sign Up
            </button>
          </div>
        </form>
        <div className="flex items-center justify-end">
          <div className="flex items-center">
            <a href="/login" className="text-md font-medium text-[#1958c2] hover:text-[#12408f] hover:underline">Log in</a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserSignUp