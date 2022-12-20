import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "../../../components/Dashboard/DashboardHeader";
import JobsSearch from "../../../components/JobsSearch";
import Loading from "../../../components/Loading";
import api from "../../../services/api";
import { getUpload, userNavigation } from "../../../utils/Utils";
import { IUserResponseDTO } from "../../User/Dashboard";

function UserSearchJobs() {
  const cookies = new Cookies();
  const token = cookies.get('token') as string;

  const [data, setData] = useState<IUserResponseDTO>();

  const navigate = useNavigate();

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
      api.get('/users/information', { headers: { "Authorization": `Bearer ${token}` } }).then(response => {
        setData(response.data)
      });
    } catch (error) {
      alert("Company not found");
    }
  }

  if (data) {
    return (
      <div className="bg-[#f8f8f8] max-w-full min-h-screen">
        <DashboardHeader logo={getUpload(data.pic, "avatars")} navigation={userNavigation} type="user" />
        <JobsSearch jobRoute="user" token={token} />
      </div>
    )
  } else {
    return <Loading />
  }
}

export default UserSearchJobs;