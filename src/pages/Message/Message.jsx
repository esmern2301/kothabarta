import Friends from "../../components/Friends/Friends";
import GroupList from "../../components/GroupList/GroupList";
import Sidebar from "../../components/Sidebar/Sidebar";

const Message = () => {
  return (
    <div>
      <div className="flex px-[20px]">
        <div className="w-[186px]">
          <Sidebar />
        </div>
        <div className="w-[500px] p-[20px]">
          <GroupList />
          <Friends />
        </div>
        <div className="w-[500px] p-[20px]">gfgfg</div>
        <div className="w-[500px] p-[20px]">fgfg</div>
      </div>
    </div>
  );
};

export default Message;
