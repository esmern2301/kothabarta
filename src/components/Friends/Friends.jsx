/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import profile from "../../assets/profile.png";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { activeChat } from "../../slices/activeChatSlice";

const Friends = () => {
  const data = useSelector((state) => state.user.userInfo);
  const db = getDatabase();
  const dispatch = useDispatch();

  const [friendList, setFriendList] = useState([]);
  useEffect(() => {
    const friendRef = ref(db, "friend/");
    onValue(friendRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        //    console.log(item.val(), 'frlist');
        if (
          data.uid == item.val().receiverid ||
          data.uid == item.val().senderid
        ) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setFriendList(arr);
    });
  }, []);

  const handleBlock = (item) => {
    console.log(item);
    if (data.uid == item.senderid) {
      set(push(ref(db, "block/")), {
        block: item.receivername,
        blockid: item.receiverid,
        blockby: item.sendername,
        blockbyid: item.senderid,
      }).then(() => {
        remove(ref(db, "friend/" + item.key));
      });
    } else {
      set(push(ref(db, "block/")), {
        block: item.sendername,
        blockid: item.senderid,
        blockby: item.receivername,
        blockbyid: item.receiverid,
      }).then(() => {
        remove(ref(db, "friend/" + item.key));
      });
    }
  };

  const handleActive = (item) => {
    console.log(item);
    if (item.receiverid == data.uid) {
      dispatch(
        activeChat({
          status: "single",
          id: item.senderid,
          name: item.sendername,
        })
      );
    } else {
      dispatch(
        activeChat({
          status: "single",
          id: item.receiverid,
          name: item.receivername,
        })
      );
    }
  };
  return (
    <div className=" bg-white border rounded-[20px] px-[23px] py-[20px] drop-shadow-lg mb-4 ">
      <div className="flex items-center justify-between">
        <h3 className="text-[24px] font-pops font-semibold">Friends</h3>
        <BiDotsVerticalRounded className="text-2xl text-primary" />
      </div>

      <div className="mt-[20px] h-[400px] overflow-y-scroll">
        {friendList.map((item) => (
          <div
            onClick={() => handleActive(item)}
            className="flex items-center justify-between border-b-gray-300 border border-x-0 border-t-0 last:border-none py-[10px] mb-[10px]"
          >
            <div>
              <img src={profile} className="rounded-full" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[20px] font-pops">
                {data.uid == item.senderid
                  ? item.receivername
                  : item.sendername}
              </h3>
              <p className="text-gray-500 font-bold text-[14px] font-pops">
                Hi Guys, Wassup!
              </p>
            </div>
            <div>
              <button
                onClick={() => handleBlock(item)}
                className="bg-primary text-white px-[22px] font-pops rounded text-[20px]"
              >
                Block
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
