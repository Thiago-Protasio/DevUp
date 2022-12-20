import { Link, useNavigate } from "react-router-dom";

import backgroundImg from './../../assets/home-bg.jpg';
import Header from "../../components/Header";
import { useEffect } from "react";
import { Cookies } from "react-cookie";

function Home() {
  const cookies = new Cookies();
  const token = cookies.get('token') as string;
  const tokenType = cookies.get('tokenType') as string;
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate(`/${tokenType}/dashboard`);
    }
  });

  return (
    <div className='max-w-full min-h-screen flex flex-1 flex-col bg-[#f8f8f8]'>
      <Header />
      <div className='grid grid-cols-2 gap-6 mt-0 mb-0 max-h-full'>
        <div className='flex-1 flex-col justify-center my-auto'>
          <h1 className="font-bold tracking-tight text-gray-900 md:text-5xl text-center">
            <span className="">Take your career to the</span>{' '}
            <span className="block text-[#1958c2]">next level</span>
          </h1>
          <div className='h-52 flex flex-row justify-center align-middle gap-8'>
            <Link to='/sign-up/company' className='bg-[#1958c2] my-8 text-white rounded-md self-center py-4 px-6 font-semibold hover:bg-[#12408f]'>Join as a company</Link>
            <Link to='/sign-up/user' className='bg-[#ff654d] my-8 text-white rounded-md self-center py-4 px-6 font-semibold hover:bg-[#b24635]'>Join as a developer</Link>
          </div>
        </div>
        <div className='w-11/12 mt-0 pr-8 mb-0'>
          <img src={backgroundImg} alt='' />
        </div>
      </div>
    </div>
  );
}

export default Home;