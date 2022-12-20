import { ArrowUpOnSquareIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from '@headlessui/react'
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import { ICompanyResponseDTO } from "./Dashboard";
import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { Input, Textarea } from "../../components/form";
import api from "../../services/api";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { companyNavigation, getUpload } from "../../utils/Utils";


function CompanyInformation() {
  const cookies = new Cookies();
  const token = cookies.get('token');

  const [data, setData] = useState<ICompanyResponseDTO>();
  const navigate = useNavigate();

  const cancelButtonRef = useRef(null)
  let [isOpen, setIsOpen] = useState(false)

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


  function fetchData(token: string) {
    try {
      api.get('/companies/information', { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
        setData(response.data)
      });
    } catch (error) {
      alert("Company not found");
    }
  }

  function handleFileSelect(event: any) {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name)
    setIsSelected(true);
  }

  async function handleChangeLogo(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData();

    formData.append('logo', selectedFile!);

    try {
      api.patch("/companies/logo", formData, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then((response) => {
        data!.logo = response.data;
        setIsSelected(false);
      });
    } catch (error) {
      alert(`Error: ${error}`);
    }
  }

  async function handleSubmitInfo(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const newData = Object.fromEntries(formData);

    try {
      await api.put("/companies/update", {
        name: newData.name,
        description: newData.description,
        linkedin: newData.linkedin,
        employees_num: Number(newData.employees_num),
        web_site: newData.web_site,
      }, { headers: { "Authorization": `Bearer ${token}` } });

      fetchData(token);
      setIsOpen(false);
    } catch (error: any) {
      alert(`Error: ${error}`);
    }
  }

  if (data) {
    return (
      <div className="bg-[#f8f8f8] max-w-full min-h-screen">
        <DashboardHeader type="company" logo={getUpload(data.logo, "logos")} navigation={companyNavigation} />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg flex flex-row w-full">
              <div className="m-12 flex flex-col">
                <img className="inline-block h-48 w-48 rounded-full ring-2 ring-white" src={getUpload(data.logo, "logos")} alt="" />
                <form onSubmit={handleChangeLogo}>
                  <label htmlFor="imageUpload" className="cursor-pointer mt-8 h-12 w-48 text-gray-900 shadow font-semibold bg-[#f8f8f8] flex flex-row justify-center items-center rounded-3xl hover:bg-[#e4e4e4]" title="Edit image"><PencilIcon className="h-5 mr-2" /> Change Image</label>
                  <input id="imageUpload" className="hidden" type="file" onChange={handleFileSelect} />
                  <div className="flex flex-row mt-8 gap-2 items-center">
                    <div className={isSelected ?
                      'w-16 whitespace-nowrap overflow-hidden text-ellipsis' : 'hidden'
                    }>{fileName}</div>
                    <button type="submit" className={isSelected ?
                      "h-12 w-28 text-gray-900 shadow font-semibold bg-[#f8f8f8] flex flex-row justify-center items-center rounded-3xl hover:bg-[#e4e4e4]" :
                      "hidden"
                    }><ArrowUpOnSquareIcon className="h-5 mr-2" /> Upload</button>
                  </div>
                </form>
              </div>
              <div className="w-full m-8">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-semibold text-gray-500">Company Name:</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-700 sm:col-span-2 sm:mt-0">{data.name}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-semibold text-gray-500">Email:</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-700 sm:col-span-2 sm:mt-0">{data.email}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-semibold text-gray-500">Number of employees:</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-700 sm:col-span-2 sm:mt-0">{data.employees_num}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-semibold text-gray-500">About:</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-700 sm:col-span-2 sm:mt-0">{data.description}</dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-semibold text-gray-500">Web site:</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-700 sm:col-span-2 sm:mt-0">{data.web_site}</dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-semibold text-gray-500">Linkedin:</dt>
                    <dd className="mt-1 text-sm font-medium text-gray-700 sm:col-span-2 sm:mt-0">{data.linkedin}</dd>
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
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Company Name</label>
                          <Input defaultValue={data.name} id="name" name="name" type="text" required />
                        </div>
                        <div className="mt-4 w-[36%]">
                          <label htmlFor="employees_num" className="block text-sm font-medium text-gray-700">Number of Employees</label>
                          <Input defaultValue={data.employees_num ? data.employees_num : ''} id="employees_num" name="employees_num" type="number" required />
                        </div>
                      </div>
                      <div className=" w-full mt-4 flex flex-wrap justify-between gap-2">
                        <div className="mt-4 w-[48%]">
                          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">Linkedin</label>
                          <Input defaultValue={data.linkedin ? data.linkedin : ''} id="linkedin" name="linkedin" type="text" required />
                        </div>
                        <div className="mt-4 w-[48%]">
                          <label htmlFor="web_site" className="block text-sm font-medium text-gray-700">Web site</label>
                          <Input defaultValue={data.web_site ? data.web_site : ''} id="web_site" name="web_site" type="text" required />
                        </div>
                      </div>
                      <div className="mt-6 w-full">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <div className="mt-1">
                          <Textarea defaultValue={data.description} id="description" name="description" rows={5} placeholder="A brief description about your company" />
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

export default CompanyInformation;