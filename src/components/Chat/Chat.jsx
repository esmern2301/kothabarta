import profile from "../../assets/profile.png";
import login from "../../assets/login.png";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { TbTriangleFilled } from "react-icons/tb";
import ModalImage from "react-modal-image";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import moment from 'moment'
import { FcGallery } from "react-icons/fc";
import { getDownloadURL, getStorage, ref as sref, uploadBytes } from "firebase/storage";
import EmojiPicker from 'emoji-picker-react';
import { MdEmojiEmotions } from "react-icons/md";

const Chat = () => {
  const activeChat = useSelector((state) => state.activeChatSlice.active);
  const data = useSelector((state) => state.user.userInfo);
  const db = getDatabase();
  const storage = getStorage();
  console.log(activeChat);
  const [msg, setMsg] = useState("");
  const [singleMsg, setsingleMsg] = useState([]);
  const [showEmoji, setShowemoji] = useState(false)
  console.log(msg);
  const handleMsg = () => {
    console.log("ok cool");
    if (activeChat.status == "single") {
      set(push(ref(db, "singleMsg/")), {
        msg: msg,
        whosendid: data.uid,
        whosendname: data.displayName,
        whoreceiverid: activeChat.id,
        whoreceivername: activeChat.name,
        date: `${new Date().getFullYear()} - ${new Date().getMonth() + 1} - ${new Date().getDate()},  ${new Date().getHours()}: ${new Date().getMinutes()}`
      });
    } else {
      console.log("ami group smsg");
    }
  };

  useEffect(() => {
    const singleMsgRef = ref(db, "singleMsg/");
    onValue(singleMsgRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        if ((item.val().whosendid == data.uid && item.val().whoreceiverid == activeChat.id)
          || (item.val().whoreceiverid == data.uid && item.val().whosendid == activeChat.id)
        ) {
          arr.push(item.val());
        }
      });
      setsingleMsg(arr)
    });
  }, [activeChat.id])


  const handleImg = (e) => {
    const storageRef = sref(storage, 'some-child');

    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        set(push(ref(db, "singleMsg/")), {
          img: downloadURL,
          whosendid: data.uid,
          whosendname: data.displayName,
          whoreceiverid: activeChat.id,
          whoreceivername: activeChat.name,
          date: `${new Date().getFullYear()} - ${new Date().getMonth() + 1} - ${new Date().getDate()},  ${new Date().getHours()}: ${new Date().getMinutes()}`
        });
      });
    });
  }

  const handleEmoji = (emoji) =>{
    console.log(emoji.emoji, 'emgfkgfpkg');
    // setMsg(msg+emoji.emoji)
  }
  return (
    <div className="bg-white border rounded-[20px] px-[23px] py-[20px] drop-shadow-lg mb-4">
      <div className=" h-[900px] ">
        <div className="flex items-center justify-between border-b py-5">
          <div className="flex items-center">
            <img src={profile} alt="" />
            <div className="ml-[20px]">
              <h3 className="text-xl font-bold text-[20px] font-pops">
                {activeChat.name}
              </h3>
              <p className="text-gray-500 font-bold text-[14px] font-pops">
                Online
              </p>
            </div>
          </div>
          <div>
            <BiDotsVerticalRounded className="text-2xl text-primary" />
          </div>
        </div>

        <div className="pt-[50px] overflow-y-scroll h-[700px] px-[10px]">

          {
            singleMsg.map((item) => (
              item.whosendid == data.uid ?
                item.img ?
                  <div className="relative text-right mt-[30px]">
                    <p className="text-xl text-left font-bold text-[20px] font-pops bg-primary p-3 inline-block rounded-lg text-white w-[300px]">
                      <ModalImage small={item.img} large={item.img} />
                    </p>
                    <TbTriangleFilled className="absolute bottom-[3px] right-[-10px] text-2xl text-primary" />
                  </div>
                  :
                  <div className="text-right">
                    <div className="relative  mt-[30px]">
                      <p className="text-xl text-left font-bold text-[20px] font-pops bg-primary py-[20px] px-[50px] inline-block rounded-lg text-white w-[400px]">
                        {item.msg}
                      </p>
                      <TbTriangleFilled className="absolute bottom-[-3px] right-[-10px] text-2xl text-primary" />
                    </div>
                    <p>
                      {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                    </p>
                  </div>
                :


                item.img ?
                  <div className="relative">
                    <p className="text-xl font-bold text-[20px] font-pops bg-[#F1F1F1] p-4 inline-block rounded-lg w-[300px]">
                      <ModalImage small={item.img} large={item.img} />
                    </p>
                    <TbTriangleFilled className="absolute bottom-[4px] left-[-10px] text-2xl text-[#F1F1F1]" />
                  </div>
                  :
                  <div>
                    <div className="relative mt-[30px]">
                      <p className="text-xl font-bold text-[20px] font-pops bg-[#F1F1F1] py-[20px] px-[50px] inline-block rounded-lg w-[400px]">
                        {item.msg}
                      </p>
                      <TbTriangleFilled className="absolute bottom-[-3px] left-[-10px] text-2xl text-[#F1F1F1]" />
                    </div>
                    <p>
                      {moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                    </p>
                  </div>

            ))
          }
          {/* Receiver msg start */}

          {/* <div className="relative">
            <p className="text-xl font-bold text-[20px] font-pops bg-[#F1F1F1] py-[20px] px-[50px] inline-block rounded-lg w-[400px]">
              Hi there
            </p>
            <TbTriangleFilled className="absolute bottom-[-3px] left-[-10px] text-2xl text-[#F1F1F1]" />
          </div> */}
          {/* Receiver msg end */}

          {/* SENDER msg start */}
          {/* <div className="relative text-right mt-[30px]">
            <p className="text-xl text-left font-bold text-[20px] font-pops bg-primary py-[20px] px-[50px] inline-block rounded-lg text-white w-[400px]">
              Hi there
            </p>
            <TbTriangleFilled className="absolute bottom-[-3px] right-[-10px] text-2xl text-primary" />
          </div> */}
          {/* SENDER msg end */}




          {/* Receiver img start */}
          {/* <div className="relative">
            <p className="text-xl font-bold text-[20px] font-pops bg-[#F1F1F1] p-4 inline-block rounded-lg w-[300px]">
              <ModalImage small={login} large={login} />
            </p>
            <TbTriangleFilled className="absolute bottom-[4px] left-[-10px] text-2xl text-[#F1F1F1]" />
          </div> */}
          {/* Receiver img end */}

          {/* SENDER msg start */}
          {/* <div className="relative text-right mt-[30px]">
            <p className="text-xl text-left font-bold text-[20px] font-pops bg-primary p-3 inline-block rounded-lg text-white w-[300px]">
              <ModalImage small={login} large={login} />
            </p>
            <TbTriangleFilled className="absolute bottom-[3px] right-[-10px] text-2xl text-primary" />
          </div> */}
          {/* SENDER msg end */}
        </div>
      </div>
      <div className="p-6 border-t border-red-600">
        <div className="flex">
          <div className="relative">
       
           <div>
              <MdEmojiEmotions onClick={()=>setShowemoji(!showEmoji)} className="absolute top-[10px] right-[50px] text-2xl text-orange-600"/>
            </div>
            {
              showEmoji &&
              <div className='absolute bottom-[50px] right-[20px]'>
              <EmojiPicker onEmojiClick={(emoji)=>handleEmoji(emoji)}/>
            </div>
            }
            <label>
              <input onChange={handleImg} type="file" className="hidden" />
              <FcGallery className="absolute top-[10px] right-[11px] text-2xl" />
            </label>

            <input
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
              type="text"
              className="border border-primary w-[650px] p-3 outline-none rounded-lg"
            />
          </div>
          <button
            onClick={handleMsg}
            className="bg-primary text-white p-3 rounded-lg ml-[30px]"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
