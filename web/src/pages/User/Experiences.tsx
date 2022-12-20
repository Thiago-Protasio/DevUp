import { Transition, Dialog } from "@headlessui/react"
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { useState, useRef, useEffect, Fragment, FormEvent } from "react"
import { Cookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import DashboardHeader from "../../components/Dashboard/DashboardHeader"
import { Input } from "../../components/form"
import Loading from "../../components/Loading"
import api from "../../services/api"
import { getUpload, userNavigation } from "../../utils/Utils"
import { IUserResponseDTO } from "./Dashboard"

interface IExperienceResponse {
  id: string
  user_id: string
  title: string
  company: string
  location: string
  current: boolean
  start_month: number
  start_year: number
  end_month: number | null
  end_year: number | null
  created_at: Date
}

function Experiences() {
  const cookies = new Cookies();
  const token = cookies.get('token');

  const navigate = useNavigate();

  const [data, setData] = useState<IUserResponseDTO>();
  const [experiences, setExperiences] = useState<IExperienceResponse[]>();

  const cancelButtonRef = useRef(null);
  let [isOpen, setIsOpen] = useState(false);
  const [currentWork, setCurrentWork] = useState(false);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  useEffect(() => {
    fetchData(token);
    fetchExperiences(token);
  }, [token]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentWork(false);
    }
  }, [isOpen]);

  function fetchData(token: string) {
    try {
      api.get('/users/information', { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
        setData(response.data);
      });
    } catch (error) {
      alert("User not found");
    }
  }

  function fetchExperiences(token: string) {
    try {
      api.get('/users/experience', { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
        setExperiences(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  function removeExperience(experience_id: string) {
    try {
      api.delete(`/users/remove/experience/${experience_id}`, { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
        fetchExperiences(token);
      });
    } catch (error) {
      alert("Could not delete");
    }
  }

  function handleSubmitExperience(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const { company, current, location, start_month, start_year, title, end_year, end_month } = Object.fromEntries(formData);

    try {
      if (current === "on") {
        api.post("/users/add/experience", {
          title,
          company,
          location,
          start_month: Number(start_month),
          start_year: Number(start_year),
          current: true,
        }, { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
          fetchExperiences(token);
          setIsOpen(false);
        });
      } else {
        api.post("/users/add/experience", {
          title,
          company,
          location,
          start_month: Number(start_month),
          start_year: Number(start_year),
          end_month: Number(end_month),
          end_year: Number(end_year),
          current: false,
        }, { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
          fetchExperiences(token);
          setIsOpen(false);
        });
      }
    } catch (error) {
      alert("Could not add a new experience");
    }
  }

  function toMonthName(monthNumber: number) {
    const date = new Date();
    date.setMonth(monthNumber);

    return date.toLocaleString('en-US', {
      month: 'short',
    });
  }

  if (data) {
    return (
      <div className="bg-[#f8f8f8] max-w-full min-h-screen">
        <DashboardHeader type="user" logo={getUpload(data.pic, "avatars")} navigation={userNavigation} />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg flex flex-col w-full">
              <div className="flex justify-between m-6">
                <h2 className="font-semibold text-xl">Experiences</h2>
                <button onClick={() => setIsOpen(true)} className="flex p-3 text-sm text-white bg-[#1958c2] hover:bg-[#12408f] rounded-3xl shadow" title="addEducation" type="button"><PlusCircleIcon className="h-5 mr-1" />Add Experience</button>
              </div>
              <div className="flex flex-col w-full justify-center m-6">
                {experiences ? experiences.map((experience) => {
                  return (
                    <div key={experience.id} className="flex flex-row">
                      <div className="w-2/4 p-4 mb-4 shadow-md rounded-lg bg-[#fcfcfc]">
                        <h4 className="font-semibold text-lg text-gray-800">{experience.title}</h4>
                        <div className="font-semibold text-md text-gray-600">{experience.company}</div>
                        <div className="font-semibold text-sm text-gray-800">{experience.location}</div>
                        <div className="font-semibold text-sm text-gray-800">{`${toMonthName(experience.start_month)} ${experience.start_year} - ${!experience.current ? `${toMonthName(experience.end_month!)} ${experience.end_year}` : 'Current'}`}</div>
                      </div>
                      <div className="ml-6 flex items-center">
                        <button onClick={() => removeExperience(experience.id)} className="flex justify-center p-3 text-md bg-red-600 text-white shadow rounded-lg hover:bg-red-900" title="remove" type="button"><XCircleIcon className="h-6 mr-1" /> Remove</button>
                      </div>
                    </div>
                  )
                }) :
                  <div className="text-xl text-gray-400 font-semibold">Add your experience...</div>
                }
              </div>
            </div>
          </div>
        </main>
        <Transition.Root show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setIsOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="bg-white w-2/4 p-6 rounded-md shadow">
                    <Dialog.Title className="font-semibold text-lg">Add Experience</Dialog.Title>
                    <form onSubmit={handleSubmitExperience} className="flex flex-wrap text-left">
                      <div className=" w-full mt-4 flex flex-wrap justify-between gap-2">
                        <div className="mt-4 w-[48%]">
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                          <Input id="title" name="title" type="text" required />
                        </div>
                        <div className="mt-4 w-[48%]">
                          <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                          <Input id="company" name="company" type="text" required />
                        </div>
                      </div>
                      <div className="mt-4 w-full">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <Input id="location" name="location" type="text" required />
                      </div>
                      <div className=" w-full mt-4 flex flex-wrap gap-2">
                        <div className="mt-4 w-[24%]">
                          <label htmlFor="start_month" className="block text-sm font-medium text-gray-700">Start Month</label>
                          <select title="start_month" id="start_month" name="start_month" className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            {months.map((month, i) => {
                              return <option value={i} key={i}>{month}</option>
                            })}
                          </select>
                        </div>
                        <div className="mt-4 w-[24%]">
                          <label htmlFor="start_year" className="block text-sm font-medium text-gray-700">Start Year</label>
                          <Input id="start_year" name="start_year" type="number" required />
                        </div>
                        <div className="mt-4 flex flex-wrap w-full">
                          <input onChange={() => setCurrentWork(!currentWork)} id="current" name="current" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                          <label htmlFor="current" className="block ml-2 text-sm font-medium text-gray-700">Current working</label>
                        </div>
                      </div>
                      <div className=" w-full mt-2 flex flex-wrap gap-2">
                        <div className="mt-4 w-[24%]">
                          <label htmlFor="end_month" className="block text-sm font-medium text-gray-700">End Month</label>
                          <select disabled={currentWork ? true : false} title="end_month" id="end_month" name="end_month" className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            {months.map((month, i) => {
                              return <option value={i} key={i}>{month}</option>
                            })}
                          </select>
                        </div>
                        <div className="mt-4 w-[24%]">
                          <label htmlFor="end_year" className="block text-sm font-medium text-gray-700">End Year</label>
                          <Input disabled={currentWork ? true : false} id="end_year" name="end_year" type="number" required />
                        </div>
                      </div>
                      <div className="py-3 sm:flex sm:flex-row w-full flex justify-end">
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="mt-3 inline-flex w-full rounded-md bg-[#1958c2] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#12408f] focus:outline-none focus:ring-2 focus:ring-[#12408f] focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          ref={cancelButtonRef}
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    );
  } else {
    return <Loading />
  }
}

export default Experiences;