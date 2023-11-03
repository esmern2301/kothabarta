import React, { useState, createRef } from 'react'
import profile from '../../assets/profile.png'
import { AiOutlineHome, AiFillMessage, AiOutlineBell, AiOutlineSetting, AiOutlineLogout } from 'react-icons/ai'
import { BsCloudUploadFill } from 'react-icons/bs'
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
// profile photo upload
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getStorage, ref, uploadString ,getDownloadURL} from "firebase/storage";


const Sidebar = () => {
  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();

  let [ profilePic,setProfilePic]=useState('')


  let [profileModal, setProfileModal] = useState(false)
  const auth = getAuth();
  const navigate = useNavigate()
  const handleSingout = () => {
    signOut(auth).then(() => {
      console.log('signout done');
      setTimeout(() => {
        navigate('/login')
      }, 2000)

    }).catch((error) => {
      console.log(error.code);
    });

  }

  let handleProfileModal = () => {
    setProfileModal(true)
  }


  const onPhotoChange = (e) => {

    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const storage = getStorage();
      const storageRef = ref(storage, 'some-child');

      const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setProfilePic(downloadURL)
        });
    
      });

    }
  };



  console.log(profilePic);



  return (
    <div className=' h-screen w-full rounded py-[20px] overflow-hidden'>
      {profileModal ?
        <div className='w-full h-screen bg-primary absolute top-0 left-0 flex justify-center items-center '>
          <div className='w-[500px]  bg-white rounded-3xl p-10 '>
            <h1 className='font-nunito text-2xl font-bold mb-5 '>Upload your Profile Photo </h1>
            <input onChange={onPhotoChange} className='block mb-5' type="file" />

            <div
              className="img-preview w-[90px] h-[90px] rounded-full mx-auto  overflow-hidden"
            />
            <Cropper
              ref={cropperRef}
              style={{ height: 400, width: "100%" }}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              guides={true}
            />
            <button onClick={getCropData} className='py-3 px-5 bg-primary text-white mt-5'>Upload </button>
            <button onClick={() => setProfileModal(false)} className='py-3 px-5 bg-red-500 text-white mt-5 ml-5'>Cancel </button>
          </div>
        </div>
        :
        <div className='bg-primary h-full rounded'>

          <div className='relative w-full flex justify-center '>
            <div className='mt-10 w-[100px] h-[100px] rounded-full relative group'>
              <img src={profilePic} alt="" className='rounded-full ' />

              <div onClick={handleProfileModal} className='w-0  group-hover:w-[100px] h-[100px] bg-[rgba(0,0,0,.5)] absolute top-0 left-0 rounded-full flex justify-center items-center'>
                <BsCloudUploadFill className='text-white' />
              </div>
            </div>
          </div>



          <div className='mt-[78px] relative z-[1] py-[20px] after:absolute after:content-[""] after:top-0 after:left-[25px] after:rounded-l-lg after:bg-white after:h-full after:w-full after:z-[-1] before:absolute before:content-[""] before:top-0 before:right-0 before:bg-primary before:z-[1] before:h-full before:w-[8px] before:rounded-l-lg'>
            <AiOutlineHome className=' text-[46px] text-primary mx-auto' />
          </div>
          <div className='mt-[57px]'>
            <AiFillMessage className='text-[46px] text-[#BAD1FF] mx-auto' />
          </div>
          <div className='mt-[57px]'>
            <AiOutlineBell className='text-[46px] text-[#BAD1FF] mx-auto' />
          </div>
          <div className='mt-[57px]'>
            <AiOutlineSetting className='text-[46px] text-[#BAD1FF] mx-auto' />
          </div>
          <div className='mt-[100px]'>
            <AiOutlineLogout onClick={handleSingout} className='text-[46px] text-[#BAD1FF] mx-auto cursor-pointer' />
          </div>
        </div>
      }
    </div>
  )
}

export default Sidebar