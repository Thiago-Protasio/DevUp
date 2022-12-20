import { Dialog, Transition } from "@headlessui/react";
import { DocumentArrowUpIcon, DocumentTextIcon, PencilIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import AvatarProfile from "../../components/AvatarProfile";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import { Input, Textarea } from "../../components/form";
import Loading from "../../components/Loading";
import api from "../../services/api";
import { getUpload, userNavigation } from "../../utils/Utils";
import { IUserResponseDTO } from "./Dashboard";

function UserInformation() {
  const cookies = new Cookies();
  const token = cookies.get('token');

  const navigate = useNavigate();
  const cancelButtonRef = useRef(null)

  const [data, setData] = useState<IUserResponseDTO>();
  const [isOpen, setIsOpen] = useState(false);

  const [languages, setLanguages] = useState<string[]>([]);
  const [newLanguage, setNewLanguage] = useState<string>();

  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState<string>();

  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [fileName, setFileName] = useState();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  });

  useEffect(() => {
    fetchData(token);
  }, [token]);

  useEffect(() => {
    if (data) {
      setLanguages(data.languages);
      setSkills(data.skills);
    }
  }, [data, isOpen]);

  function fetchData(token: string) {
    try {
      api.get('/users/information', { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
        setData(response.data);
      });
    } catch (error) {
      alert("User not found");
    }
  }

  async function handleSubmitInfo(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const newData = Object.fromEntries(formData);

    try {
      await api.put("/users/update", {
        name: newData.name,
        about: newData.about,
        salary_pretension: Number(newData.salary_pretension),
        headline: newData.headline,
        country: newData.country,
        city: newData.city,
        github: newData.github,
        linkedin: newData.linkedin,
        phone: newData.phone,
        level: newData.level,
        languages,
        skills,
      }, { headers: { "Authorization": `Bearer ${token}` } });

      fetchData(token);
      setIsOpen(false);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }

  function removeLanguage(value: string) {
    setLanguages(languages.filter(item => item !== value));
  }

  function handleChangeLanguage(event: any) {
    setNewLanguage(event.target.value);
  }

  function addLanguage() {
    if (newLanguage) {
      setLanguages([...languages, newLanguage]);
    }
  }

  function removeSkill(value: string) {
    setSkills(skills.filter(item => item !== value));
  }

  function handleChangeSkill(event: any) {
    setNewSkill(event.target.value);
  }

  function addSkill() {
    if (newSkill) {
      setSkills([...skills, newSkill]);
    }
  }

  function handleFileSelect(event: any) {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
    setIsSelected(true);
  }

  async function handleUploadResume(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData();

    formData.append("resume", selectedFile!);

    try {
      api.patch("/users/resume", formData, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(() => {
        setIsSelected(false);
        navigate(0);
      });
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }

  if (data) {
    return (
      <div className="bg-[#f8f8f8] max-w-full min-h-screen">
        <DashboardHeader type="user" logo={getUpload(data.pic, "avatars")} navigation={userNavigation} />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg flex flex-row w-full">
              <AvatarProfile token={token} avatar={getUpload(data.pic, "avatars")} route="/users/avatar" routeFileName="avatar" />
              <div className="w-full m-8">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-semibold text-gray-500">Name:</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-700 sm:col-span-2 sm:mt-0">{data.name}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-semibold text-gray-500">Headline:</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-700 sm:col-span-2 sm:mt-0">{data.headline}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-semibold text-gray-500">Level:</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-700 sm:col-span-2 sm:mt-0">{data.level}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-semibold text-gray-500">Location:</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-700 sm:col-span-2 sm:mt-0">{`${data.city ? data.city : ''} - ${data.country ? data.country : ''}`}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-semibold text-gray-500">Salary Expectation:</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-700 sm:col-span-2 sm:mt-0">{`$${data.salary_pretension}`}</dd>
                  </div>
                  <div className="bg-white-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-semibold text-gray-500">Birthday:</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-700 sm:col-span-2 sm:mt-0">{data.birthday}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-semibold text-gray-500">Languages:</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-700 sm:col-span-2 sm:mt-0">{data.languages.map((language, i) => {
                      if (data.languages.length - 1 !== i) {
                        return <span key={i}>{`${language} - `}</span>
                      } else {
                        return <span key={i}>{`${language}`}</span>
                      }
                    })}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-semibold text-gray-500">Linkedin:</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-700 sm:col-span-2 sm:mt-0">{data.linkedin}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-semibold text-gray-500">Github:</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-700 sm:col-span-2 sm:mt-0">{data.github}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-semibold text-gray-500">Email:</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-700 sm:col-span-2 sm:mt-0">{data.email}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-semibold text-gray-500">Phone:</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-700 sm:col-span-2 sm:mt-0">{data.phone}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-semibold text-gray-500">Skills:</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-700 sm:col-span-2 sm:mt-0">{data.skills.map((skill, i) => {
                      return <span key={i} className="py-2 px-3 mr-2 bg-gray-50 rounded-lg">{skill}</span>
                    })}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-semibold text-gray-500">About:</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-700 sm:col-span-2 sm:mt-0">{data.about}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-semibold text-gray-500">Resume:</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-700 sm:col-span-2 sm:mt-0 w-2/4 whitespace-nowrap overflow-hidden text-ellipsis">
                      {data.resume?.split(/-(.*)/s)[1]}
                      <form onSubmit={handleUploadResume}>
                        <label htmlFor="resumeUpload" className="cursor-pointer mt-8 h-12 w-48 text-gray-800 shadow font-semibold bg-[#f8f8f8] flex flex-row justify-center items-center rounded-3xl hover:bg-[#e4e4e4]" title="Change Resume"><DocumentTextIcon className="h-5 mr-2" />Change Resume</label>
                        <input id="resumeUpload" className="hidden" type="file" onChange={handleFileSelect} />
                        <div className="flex flex-row mt-8 gap-2 items-center">
                          <div className={isSelected ?
                            'w-20 whitespace-nowrap overflow-hidden text-ellipsis' : 'hidden'
                          }>{fileName}</div>
                          <button type="submit" className={isSelected ?
                            "h-12 w-28 text-gray-800 shadow font-semibold bg-[#f8f8f8] flex flex-row justify-center items-center rounded-3xl hover:bg-[#e4e4e4]" :
                            "hidden"
                          }><DocumentArrowUpIcon className="h-5 mr-2" /> Upload</button>
                        </div>
                      </form>
                    </dd>
                  </div>
                </dl>
                <div className="w-full flex flex-row justify-end">
                  <button onClick={() => setIsOpen(true)} className="mt-6 h-12 w-28 text-gray-800 shadow font-semibold bg-[#f8f8f8] flex flex-row justify-center items-center rounded-3xl hover:bg-[#e4e4e4]" title="Edit image" type="button"><PencilIcon className="h-5 mr-2" /> Edit</button>
                </div>
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
                    <Dialog.Title className="font-semibold text-lg">Update Information</Dialog.Title>
                    <form onSubmit={handleSubmitInfo} className="flex flex-wrap text-left">
                      <div className=" w-full mt-4 flex flex-wrap justify-between gap-2">
                        <div className="mt-4 w-[60%]">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                          <Input defaultValue={data.name} id="name" name="name" type="text" required />
                        </div>
                        <div className="mt-4 w-[36%]">
                          <label htmlFor="salary_pretension" className="block text-sm font-medium text-gray-700">Salary Expectation</label>
                          <Input defaultValue={data.salary_pretension ? data.salary_pretension : ''} id="salary_pretension" name="salary_pretension" type="number" required />
                        </div>
                      </div>
                      <div className=" w-full mt-4 flex flex-wrap justify-between gap-2">
                        <div className="mt-4 w-[48%]">
                          <label htmlFor="headline" className="block text-sm font-medium text-gray-700">Headline</label>
                          <Input defaultValue={data.headline ? data.headline : ''} id="headline" name="headline" type="text" required />
                        </div>
                        <div className="mt-4 w-[48%]">
                          <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level</label>
                          <select
                            id="level"
                            name="level"
                            defaultValue="Junior"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value="Senior">Senior</option>
                            <option value="Middle">Middle</option>
                            <option value="Junior">Junior</option>
                          </select>
                        </div>
                        <div className="mt-4 w-[48%]">
                          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">Linkedin</label>
                          <Input defaultValue={data.linkedin ? data.linkedin : ''} id="linkedin" name="linkedin" type="text" required />
                        </div>
                        <div className="mt-4 w-[48%]">
                          <label htmlFor="github" className="block text-sm font-medium text-gray-700">Github</label>
                          <Input defaultValue={data.github ? data.github : ''} id="github" name="github" type="text" required />
                        </div>
                        <div className="flex flex-row w-full gap-2">
                          <div className="mt-4 w-[28%]">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                            <Input defaultValue={data.city ? data.city : ''} id="city" name="city" type="text" required />
                          </div>
                          <div className="mt-4 w-[28%]">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                            <Input defaultValue={data.country ? data.country : ''} id="country" name="country" type="text" required />
                          </div>
                          <div className="mt-4 w-[44%]">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <Input defaultValue={data.phone ? data.phone : ''} id="phone" name="phone" type="text" required />
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 w-full">
                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">About</label>
                        <div className="mt-1">
                          <Textarea defaultValue={data.about ? data.about : ''} id="about" name="about" rows={5} placeholder="About you" />
                        </div>
                      </div>
                      <div className="mt-6 w-full">
                        <h3 className="font-semibold mb-4 text-gray-900">Languages</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {languages ? languages.map((language, i) => {
                            return (
                              <div key={i} className="bg-gray-200 flex flex-row justify-center text-sm items-center rounded-3xl max-w-fit p-2 pl-3">
                                {language}
                                <button key={i} title={language} onClick={() => removeLanguage(language)} type="button"><XCircleIcon className="ml-1 h-5 rounded-full hover:text-white hover:bg-gray-900" /></button>
                              </div>
                            );
                          }) : ''}
                        </div>
                        <div className="flex  flex-row">
                          <div className="w-[60%] mr-4">
                            <Input className="p-2" onChange={handleChangeLanguage} id="language" type="text" placeholder="New Language" />
                          </div>
                          <button className="text-sm rounded-2xl bg-gray-700 text-white p-3 hover:bg-gray-900" onClick={addLanguage} title="addLanguage" type="button">Add language</button>
                        </div>
                      </div>
                      <div className="mt-6 w-full">
                        <h3 className="font-semibold mb-4 text-gray-900">Skills</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {skills ? skills.map((skill, i) => {
                            return (
                              <div key={i} className="bg-gray-200 flex flex-row justify-center text-sm items-center rounded-3xl max-w-fit p-2 pl-3">
                                {skill}
                                <button key={i} title={skill} onClick={() => removeSkill(skill)} type="button"><XCircleIcon className="ml-1 h-5 rounded-full hover:text-white hover:bg-gray-900" /></button>
                              </div>
                            );
                          }) : ''}
                        </div>
                        <div className="flex  flex-row">
                          <div className="w-[60%] mr-4">
                            <Input className="p-2" onChange={handleChangeSkill} id="language" type="text" placeholder="New Skill" />
                          </div>
                          <button className="text-sm rounded-2xl bg-gray-700 text-white p-3 hover:bg-gray-900" onClick={addSkill} title="addLanguage" type="button">Add Skill</button>
                        </div>
                      </div>

                      <div className="py-3 sm:flex sm:flex-row w-full flex justify-end">
                        <button
                          type="button"
                          className="mt-3 inline-flex w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => setIsOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="mt-3 inline-flex w-full rounded-md bg-[#1958c2] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#12408f] focus:outline-none focus:ring-2 focus:ring-[#12408f] focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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

export default UserInformation;