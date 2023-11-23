import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useSelector } from "react-redux";
import profile from "../../assets/profile.png";
const MyGroups = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.user.userInfo);
  const [mygroup, setMygroup] = useState([]);
  useEffect(() => {
    const groupRef = ref(db, "group/");
    onValue(groupRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().adminid) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setMygroup(arr);
    });
  }, []);
  console.log(mygroup);
  return (
    <div className=" bg-white border rounded-[20px] px-[23px] py-[20px] drop-shadow-lg mb-4 ">
      <div className="flex items-center justify-between">
        <h3 className="text-[24px] font-pops font-semibold">My Groups</h3>
        <BiDotsVerticalRounded className="text-2xl text-primary" />
      </div>

      <div className="mt-[20px] h-[400px] overflow-y-scroll">
        {mygroup.map((item) => (
          // eslint-disable-next-line react/jsx-key
          <div className="flex items-center border-b-gray-300 border border-x-0 border-t-0 last:border-none py-[10px] mb-[10px]">
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
      </div>
    </div>
  );
};

export default MyGroups;
