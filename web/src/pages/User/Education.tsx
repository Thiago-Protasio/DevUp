import { Dialog, Transition } from "@headlessui/react";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import { Input, Textarea } from "../../components/form";
import Loading from "../../components/Loading";
import api from "../../services/api";
import { getUpload, userNavigation } from "../../utils/Utils";
import { IUserResponseDTO } from "./Dashboard";

interface IEducationResponse {
  id: string;
  user_id: string;
  school: string;
  degree: string;
  field: string;
  start_month: number;
  start_year: number;
  end_month: number;
  end_year: number;
  grade: string;
  activities: string | null;
  description: string | null;
  created_at: Date;
}

function Education() {
  const cookies = new Cookies();
  const token = cookies.get('token');

  const navigate = useNavigate();

  const [data, setData] = useState<IUserResponseDTO>();
  const [educations, setEducations] = useState<IEducationResponse[]>();

  const cancelButtonRef = useRef(null)
  let [isOpen, setIsOpen] = useState(false)

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  useEffect(() => {
    fetchData(token);
    fetchEducations(token);
  }, [token]);


  function fetchData(token: string) {
    try {
      api.get('/users/information', { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
        setData(response.data);
      });
    } catch (error) {
      alert("User not found");
    }
  }

  function fetchEducations(token: string) {
    try {
      api.get("/users/education", { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
        setEducations(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }

  function removeEducation(education_id: string) {
    try {
      api.delete(`/users/remove/education/${education_id}`, { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
        fetchEducations(token);
      });
    } catch (error) {
      alert("Could not remove")
    }
  }

  function handleSubmitEducation(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const { school, degree, field, start_month, start_year, end_month, end_year, grade, activities, description } = Object.fromEntries(formData);

    try {
      api.post("/users/add/education", {
        school,
        degree,
        field,
        start_month: Number(start_month),
        start_year: Number(start_year),
        end_month: Number(end_month),
        end_year: Number(end_year),
        grade,
        activities,
        description
      }, { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
        fetchEducations(token);
        setIsOpen(false);
      });
    } catch (error) {
      alert("Could not add a new Education");
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
                <h2 className="font-semibold text-xl">Education</h2>
                <button onClick={() => setIsOpen(true)} className="flex p-3 text-sm text-white bg-[#1958c2] hover:bg-[#12408f] rounded-3xl shadow" title="addEducation" type="button"><PlusCircleIcon className="h-5 mr-1" />Add Education</button>
              </div>
              <div className="flex flex-col w-full justify-center m-6">
                {educations ? educations.map((education) => {
                  return (
                    <div key={education.id} className="flex flex-row">
                      <div className="w-2/4 p-4 mb-4 shadow-md rounded-lg bg-[#fcfcfc]">
                        <h4 className="font-semibold text-lg text-gray-800">{education.school}</h4>
                        <div className="flex justify-between">
                          <span className="font-semibold text-md text-gray-600">{education.field}</span>
                          <span className="text-sm font-semibold text-gray-800">{education.degree}</span>
                        </div>
                        <div className="text-sm font-semibold text-gray-800">Grade: {education.grade}</div>
                        <div className="font-semibold text-sm text-gray-800">{`${toMonthName(education.start_month)} ${education.start_year} - ${toMonthName(education.end_month)} ${education.end_year}`}</div>
                        {education.activities ?
                          <div className="mt-2">
                            <h5 className="font-semibold text-gray-800">Activities:</h5>
                            <div>{education.activities}</div>
                          </div>
                          : ''
                        }
                        {education.description ?
                          <div className="mt-2">
                            <h5 className="font-semibold text-gray-800">Description:</h5>
                            <div>{education.description}</div>
                          </div>
                          : ''
                        }
                      </div>
                      <div className="ml-6 flex items-center">
                        <button onClick={() => removeEducation(education.id)} className="flex justify-center p-3 text-md bg-red-600 text-white shadow rounded-lg hover:bg-red-900" title="remove" type="button"><XCircleIcon className="h-6 mr-1" /> Remove</button>
                      </div>
                    </div>
                  )
                }) :
                  <div className="text-xl text-gray-400 font-semibold">Add your education...</div>
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
                    <Dialog.Title className="font-semibold text-lg">Add Education</Dialog.Title>
                    <form onSubmit={handleSubmitEducation} className="flex flex-wrap text-left">
                      <div className=" w-full mt-4 flex flex-wrap justify-between gap-2">
                        <div className="mt-4 w-[48%]">
                          <label htmlFor="school" className="block text-sm font-medium text-gray-700">School</label>
                          <Input id="school" name="school" type="text" required />
                        </div>
                        <div className="mt-4 w-[48%]">
                          <label htmlFor="field" className="block text-sm font-medium text-gray-700">Field</label>
                          <Input id="field" name="field" type="text" required />
                        </div>
                      </div>
                      <div className=" w-full mt-4 flex flex-wrap justify-between gap-2">
                        <div className="mt-4 w-[48%]">
                          <label htmlFor="degree" className="block text-sm font-medium text-gray-700">Degree</label>
                          <Input id="degree" name="degree" type="text" required />
                        </div>
                        <div className="mt-4 w-[48%]">
                          <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Grade</label>
                          <Input id="grade" name="grade" type="text" required />
                        </div>
                      </div>
                      <div className=" w-full mt-4 flex flex-wrap justify-between gap-2">
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
                        <div className="mt-4 w-[24%]">
                          <label htmlFor="end_month" className="block text-sm font-medium text-gray-700">End Month</label>
                          <select title="end_month" id="end_month" name="end_month" className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                            {months.map((month, i) => {
                              return <option value={i} key={i}>{month}</option>
                            })}
                          </select>
                        </div>
                        <div className="mt-4 w-[24%]">
                          <label htmlFor="end_year" className="block text-sm font-medium text-gray-700">End Year</label>
                          <Input id="end_year" name="end_year" type="number" required />
                        </div>
                      </div>
                      <div className="mt-4 w-full">
                        <label htmlFor="activities" className="block text-sm font-medium text-gray-700">Activities</label>
                        <Input id="activities" name="activities" type="text" />
                      </div>
                      <div className="mt-6 w-full">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <div className="mt-1">
                          <Textarea id="description" name="description" rows={4} />
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
    return <Loading />;
  }
}

export default Education;