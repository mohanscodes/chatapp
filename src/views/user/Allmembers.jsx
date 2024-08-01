import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_all_members } from "../../store/Reducers/memberReducer";

const AllMembers = () => {
  const dispatch = useDispatch();
  const { members, loader } = useSelector((state) => state.members);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      dispatch(get_all_members(userInfo._id));
    }
  }, [dispatch, userInfo]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center text-white">All Members</h1>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-4 gap-8">
        {members && members.length > 0 ? (
          members.map((member) => (
            <Link
              key={member._id}
              to={`/user/dashboard/chat-friends/${member._id}`}
              className="relative rounded-full overflow-hidden bg-cover bg-center border-4 border-white"
              style={{
                width: "200px",
                height: "200px",
                backgroundImage: `url(${member.image ? (member.image) : "http://res.cloudinary.com/dcisvww0d/image/upload/v1722336342/profile/e8om4gadqi6r7d7dzsxs.jpg"})`
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-0 transition duration-300">
                <span className="text-white text-center">{member.name}</span>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-white">No members found.</p>
        )}
      </div>
    </div>
  );
};

export default AllMembers;
