import { ArrowUpOnSquareIcon, PencilIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

interface IAvatarData {
  token: string;
  avatar: any;
  route: string;
  routeFileName: string;
}

function AvatarProfile({ token, avatar, route, routeFileName }: IAvatarData) {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [fileName, setFileName] = useState();

  function handleFileSelect(event: any) {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name)
    setIsSelected(true);
  }

  async function handleChangeLogo(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData();

    formData.append(routeFileName, selectedFile!);

    try {
      api.patch(route, formData, {
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

  return (
    <div className="m-12 flex flex-col">
      <img className="inline-block h-48 w-48 rounded-full ring-2 ring-white" src={avatar} alt="" />
      <form onSubmit={handleChangeLogo}>
        <label htmlFor="imageUpload" className="cursor-pointer mt-8 h-12 w-48 text-gray-700 shadow font-semibold bg-[#f8f8f8] flex flex-row justify-center items-center rounded-3xl hover:bg-[#e4e4e4]" title="Edit image"><PencilIcon className="h-5 mr-2" /> Change Image</label>
        <input id="imageUpload" className="hidden" type="file" onChange={handleFileSelect} />
        <div className="flex flex-row mt-8 gap-2 items-center">
          <div className={isSelected ?
            'w-16 whitespace-nowrap overflow-hidden text-ellipsis' : 'hidden'
          }>{fileName}</div>
          <button type="submit" className={isSelected ?
            "h-12 w-28 text-gray-700 shadow font-semibold bg-[#f8f8f8] flex flex-row justify-center items-center rounded-3xl hover:bg-[#e4e4e4]" :
            "hidden"
          }><ArrowUpOnSquareIcon className="h-5 mr-2" /> Upload</button>
        </div>
      </form>
    </div>
  );
}

export default AvatarProfile;