/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import profile from "../../assets/profile.png";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";

const GroupList = () => {
  const data = useSelector((state) => state.user.userInfo);
  const db = getDatabase();
  const [show, setShow] = useState(false);
  const [groupname, setGroupname] = useState("");
  const [groupTagname, setGroupTagname] = useState("");
  const [groupList, setGroupList] = useState([]);

  const handlegroup = () => {
    setShow(!show);
  };

  const handleCreateGroup = () => {
    set(push(ref(db, "group/")), {
      groupname: groupname,
      groupTagname: groupTagname,
      adminname: data.displayName,
      adminid: data.uid,
    });
  };

  useEffect(() => {
    const groupRef = ref(db, "group/");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid != item.val().adminid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setGroupList(arr);
    });
  }, []);
  return (
    <div className=" bg-white border rounded-[20px] px-[23px] py-[20px] drop-shadow-lg mb-4 ">
      <div className="flex items-center justify-between">
        <h3 className="text-[24px] font-pops font-semibold">Group List</h3>
        {show ? (
          <button
            onClick={handlegroup}
            className="bg-green-500 p-3 text-white rounded-lg"
          >
            Go Back
          </button>
        ) : (
          <button
            onClick={handlegroup}
            className="bg-primary p-3 text-white rounded-lg"
          >
            Create Group
          </button>
        )}
      </div>

      <div className="mt-[20px] h-[400px] overflow-y-scroll">
        {show ? (
          <div>
            <input
              onChange={(e) => setGroupname(e.target.value)}
              type="text"
              className=" w-full p-3 rounded-lg border border-[#b8bacf]  outline-none my-3"
              placeholder="GroupName"
            />
            <input
              onChange={(e) => setGroupTagname(e.target.value)}
              type="text"
              className=" w-full p-3 border rounded-lg border-[#b8bacf]  outline-none my-3"
              placeholder="GroupTagname"
            />
            <button
              onClick={handleCreateGroup}
              className="w-full p-5 bg-primary text-white rounded-lg"
            >
              Create Group
            </button>
          </div>
        ) : (
          <>
            {groupList.map((item) => (
              <div className="flex items-center  border-b-gray-300 border border-x-0 border-t-0 last:border-none py-[10px] mb-[10px]">
                <div>
                  <img src={profile} className="rounded-full" />
                </div>
                <div className="ml-5">
                  <p className="text-gray-500 font-bold text-[14px] font-pops">
                    Adminname: {item.adminname}
                  </p>
                  <h3 className="text-xl font-bold text-[20px] font-pops">
                    {item.groupname}
                  </h3>
                  <p className="text-gray-500 font-bold text-[14px] font-pops">
                    {item.groupTagname}
                  </p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default GroupList;
