import Chat from "../../components/Chat/Chat";
import Friends from "../../components/Friends/Friends";
import GroupList from "../../components/GroupList/GroupList";
import Sidebar from "../../components/Sidebar/Sidebar";

const Message = () => {
  return (
    <div>
      <div className="flex px-[20px]">
        <div className="w-[186px]">
          <Sidebar active='msg'/>
        </div>
        <div className="w-[500px] p-[20px]">
          <GroupList />
          <Friends />
        </div>
        <div className="w-[900px] p-[20px]">
          <Chat/>
        </div>
      </div>
    </div>
  );
};

export default Message;
