import { XCircleIcon } from "@heroicons/react/24/outline";
import { FormEvent, useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import { Input } from "../../components/form";
import Loading from "../../components/Loading";
import api from "../../services/api";
import { companyNavigation, getUpload } from "../../utils/Utils";
import { ICompanyResponseDTO } from "./Dashboard";

function CreateJob() {
  const cookies = new Cookies();
  const token = cookies.get('token');

  const [data, setData] = useState<ICompanyResponseDTO>();
  const navigate = useNavigate();

  const [technologies, setTechnologies] = useState<string[]>([]);
  const [newTechnology, setNewTechnology] = useState<string>();

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

  function addTechnology() {
    if (newTechnology) {
      setTechnologies([...technologies, newTechnology]);
    }
  }

  async function handleSubmitJob(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const { title, description, level, location, home_office } = Object.fromEntries(formData);

    try {
      await api.post("/jobs", {
        title,
        description,
        level,
        location,
        technologies,
        home_office: home_office === "on" ? true : false,
      }, { headers: { "Authorization": `Bearer ${token}` } });

      navigate(0);
    } catch (error) {
      alert("Could not post")
    }
  }

  if (data) {
    return (
      <div className="bg-[#f8f8f8] max-w-full min-h-screen">
        <DashboardHeader type="company" logo={getUpload(data.logo, "logos")} navigation={companyNavigation} />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg flex flex-row w-full">
              <div className="w-full flex flex-col p-8">
                <h1 className="text-2xl font-semibold text-gray-800">Post a new Job</h1>
                <form onSubmit={handleSubmitJob} className="flex flex-wrap justify-center text-left">
                  <div className="mt-4 h-20 w-[60%]">
                    <input className="w-full border-b h-16 p-4 text-xl font-semibold text-gray-700 outline-0" placeholder="Job Title" id="title" name="title" type="text" required />
                  </div>
                  <div className="mt-4 w-4/5">
                    <textarea className="outline-0 w-full border p-4 shadow rounded-lg text-md font-semibold text-gray-900" placeholder="Job description..." id="description" name="description" rows={18} required />
                  </div>
                  <div className="mt-6 w-4/5 flex flex-wrap flex-col justify-center">
                    <h3 className="font-semibold mb-3 text-gray-900">Technologies</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {technologies ? technologies.map((technology, i) => {
                        return (
                          <div key={i} className="bg-gray-200 flex flex-row justify-center text-sm items-center rounded-3xl max-w-fit p-2 pl-3">
                            {technology}
                            <button key={i} title={technology} onClick={() => setTechnologies(technologies.filter(item => item !== technology))} type="button"><XCircleIcon className="ml-1 h-5 rounded-full hover:text-white hover:bg-gray-900" /></button>
                          </div>
                        );
                      }) : ''}
                    </div>
                    <div className="flex  flex-row">
                      <div className="w-[60%] mr-4">
                        <Input className="p-2 w-1/2" onChange={(event) => setNewTechnology(event.target.value)} id="technologies" type="text" placeholder="New Technology" />
                      </div>
                      <button className="text-sm rounded-2xl bg-gray-700 text-white p-3 hover:bg-gray-900" onClick={addTechnology} title="addLanguage" type="button">Add Technology</button>
                    </div>
                  </div>
                  <div className="flex w-4/5 mt-6 flex-row">
                    <div className="w-[60%] mr-4">
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location (optional)</label>
                      <Input className="p-2 w-1/2" id="location" name="location" type="text" placeholder="Job Location" />
                    </div>
                  </div>
                  <div className="mt-6 w-4/5 flex flex-wrap flex-col justify-center">
                    <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level</label>
                    <div className="flex flex-row flex-wrap gap-4">
                      <select
                        id="level"
                        name="level"
                        defaultValue="Junior"
                        className="mt-1 block w-40 rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      >
                        <option value="Senior">Senior</option>
                        <option value="Middle">Middle</option>
                        <option value="Junior">Junior</option>
                      </select>
                      <div className="flex items-center justify-right my-auto ml-6">
                        <div className="flex items-center">
                          <input
                            id="home_office"
                            name="home_office"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label htmlFor="home_office" className="ml-2 block text-sm text-gray-900">
                            Home Office
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-6 w-4/5 justify-end">
                    <button type="submit" className="p-3 w-28 text-sm rounded-lg bg-[#1958c2] font-medium text-white shadow-sm hover:bg-[#12408f] focus:outline-none focus:ring-2 focus:ring-[#12408f] focus:ring-offset-2">
                      Post Job
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  } else {
    return <Loading />
  }
}

export default CreateJob;