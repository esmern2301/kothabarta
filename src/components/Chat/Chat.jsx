import profile from "../../assets/profile.png";
import login from "../../assets/login.png";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { TbTriangleFilled } from "react-icons/tb";
import ModalImage from "react-modal-image";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getDatabase, push, ref, set } from "firebase/database";

const Chat = () => {
  const activeChat = useSelector((state) => state.activeChatSlice.active);
  const data = useSelector((state) => state.user.userInfo);
  const db = getDatabase();
  console.log(activeChat);
  const [msg, setMsg] = useState("");
  console.log(msg);
  const handleMsg = () => {
    console.log("ok cool");
    if (activeChat.status == "single") {
      set(push(ref(db, "singleMsg/")), {
        msg: msg,
      });
    } else {
      console.log("ami group smsg");
    }
  };
  return (
    <div className="bg-white border rounded-[20px] px-[23px] py-[20px] drop-shadow-lg mb-4">
      <div className=" h-screen overflow-y-scroll">
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

        <div className="pt-[50px] px-[10px]">
          {/* Receiver msg start */}
          <div className="relative">
            <p className="text-xl font-bold text-[20px] font-pops bg-[#F1F1F1] py-[20px] px-[50px] inline-block rounded-lg w-[400px]">
              Hi there
            </p>
            <TbTriangleFilled className="absolute bottom-[-3px] left-[-10px] text-2xl text-[#F1F1F1]" />
          </div>
          {/* Receiver msg end */}

          {/* SENDER msg start */}
          <div className="relative text-right mt-[30px]">
            <p className="text-xl text-left font-bold text-[20px] font-pops bg-primary py-[20px] px-[50px] inline-block rounded-lg text-white w-[400px]">
              Hi there
            </p>
            <TbTriangleFilled className="absolute bottom-[-3px] right-[-10px] text-2xl text-primary" />
          </div>
          {/* SENDER msg end */}

          {/* Receiver img start */}
          <div className="relative">
            <p className="text-xl font-bold text-[20px] font-pops bg-[#F1F1F1] p-4 inline-block rounded-lg w-[300px]">
              <ModalImage small={login} large={login} />
            </p>
            <TbTriangleFilled className="absolute bottom-[4px] left-[-10px] text-2xl text-[#F1F1F1]" />
          </div>
          {/* Receiver img end */}

          {/* SENDER msg start */}
          <div className="relative text-right mt-[30px]">
            <p className="text-xl text-left font-bold text-[20px] font-pops bg-primary p-3 inline-block rounded-lg text-white w-[300px]">
              <ModalImage small={login} large={login} />
            </p>
            <TbTriangleFilled className="absolute bottom-[3px] right-[-10px] text-2xl text-primary" />
          </div>
          {/* SENDER msg end */}
        </div>
      </div>
      <div className="p-6 border-t border-red-600">
        <div className="flex">
          <div>
            <input
              onChange={(e) => setMsg(e.target.value)}
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
