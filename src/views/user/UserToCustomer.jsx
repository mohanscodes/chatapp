import React, { useState, useRef, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { FaList } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

import {
  get_my_friends,
  add_friend,
  send_message,
  updateMessage,
  delete_my_msg,
  messageClear,
} from "../../store/Reducers/chatReducer";
import { socket } from "../../utils/utils";
// import toast from "react-hot-toast";
import { motion } from "framer-motion";

const UserToCustomer = () => {
  const scrollRef = useRef();
  const [show, setShow] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const {
    all_messages,
    currentFd,
    my_friends,
    successMessage,
    deleteMessage_event,
  } = useSelector((state) => state.chat);

  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const { friendId } = useParams();
  const [receverMessage, setReceverMessage] = useState("");
  const [activeUsers, setActiveUsers] = useState([]);
  const [activeMessageId, setActiveMessageId] = useState(null); // State to track active message ID
  const [deletebtnshow, setDeletebtnshow] = useState(false);
  const [updateDeleteMsg, setupdateDeleteMsg] = useState(false);

  // Function to handle message deletion
  const deleteBtn = (msgId) => {
    setActiveMessageId(msgId);
    setDeletebtnshow(!deletebtnshow);
  };

  // Register user to socket and get friends list
  useEffect(() => {
    if (userInfo._id) {
      // socket.connect();
      socket.emit("add_user", userInfo._id, userInfo);
      dispatch(get_my_friends(userInfo._id));
    } else {
      socket.disconnect();
      console.log("logout");
    }
  }, [userInfo._id, userInfo, dispatch]);

  // Listen for incoming messages and active users
  useEffect(() => {
    const handleReceiveMessage = (msg) => {
      setReceverMessage(msg);
    };

    const handleActiveUsers = (users) => {
      dispatch(get_my_friends(userInfo._id));
      setActiveUsers(users);
    };

    socket.on("resive_user_message", handleReceiveMessage);
    socket.on("activeUsers", handleActiveUsers);

    // Cleanup listeners on component unmount
    return () => {
      socket.off("resive_user_message", handleReceiveMessage);
      socket.off("activeUsers", handleActiveUsers);
    };
  }, [userInfo._id, userInfo, dispatch]);

  // Update messages when a new message is received
  useEffect(() => {
    if (receverMessage) {
      if (
        friendId === receverMessage.senderId &&
        userInfo._id === receverMessage.receverId
      ) {
        dispatch(updateMessage(receverMessage));
      }
      dispatch(messageClear());
    }
  }, [receverMessage, friendId, userInfo._id, dispatch]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [all_messages]);

  // Add friend by friendId
  useEffect(() => {
    dispatch(get_my_friends(userInfo._id));
    if (friendId) {
      dispatch(add_friend({ friendId, userId: userInfo._id }));
    }
  }, [dispatch, friendId, updateDeleteMsg, userInfo._id]);

  // Send message
  const send = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(
        send_message({
          userId: userInfo._id,
          name: userInfo.name,
          friendId: friendId,
          text: text,
        })
      );
      setText("");
    }
  };

  // Emit message to socket when successfully sent
  useEffect(() => {
    if (successMessage) {
      socket.emit("send_message", all_messages[all_messages.length - 1]);
      dispatch(messageClear());
    }
  }, [successMessage, all_messages, dispatch]);

  // Function to handle message deletion
  const deleteMessage = (msgId) => {
    dispatch(
      delete_my_msg({
        msgId,
        userId: userInfo._id,
        friendId,
      })
    );
  };
  // Emit delete message to socket when successfully sent
  useEffect(() => {
    if (deleteMessage_event) {
      socket.emit("delete_message", friendId);
      dispatch(messageClear());
    }
  }, [deleteMessage_event, friendId, dispatch]);

  useEffect(() => {
    const handleDeleteMessage = () => {
      if (friendId) {
        dispatch(add_friend({ friendId, userId: userInfo._id }));
      }
    };

    socket.on("delete_user_message", handleDeleteMessage);

    // Clean up the event listener when component unmounts
    return () => {
      socket.off("delete_user_message", handleDeleteMessage);
    };
  }, [friendId, userInfo._id, dispatch]);

  return (
    <div className="px-2 lg:px-4 py-5">
      <div className="w-full bg-[#6a5fdf] bg-opacity-30  backdrop-filter backdrop-blur-lg bg-blur-lg px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <div
            className={`w-[280px] h-full absolute z-10 ${
              show ? "-left-[16px]" : "-left-[336px]"
            } md:left-0 md:relative transition-all `}
          >
            <div className="w-full h-[calc(100vh-177px)] bg-[#6a5fdf] bg-opacity-70 md:bg-opacity-30 backdrop-filter backdrop-blur-lg bg-blur-lg rounded-md overflow-y-auto">
              <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white">
                <span
                  onClick={() => setShow(!show)}
                  className="block cursor-pointer md:hidden"
                >
                  <IoMdClose />
                </span>
              </div>

              {my_friends.map((c, i) => (
                <Link
                  key={i}
                  to={`/user/dashboard/chat-friends/${c.fdId}`}
                  className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-md cursor-pointer ${
                    c.fdId === friendId
                      ? " bg-purple-500 shadow-lg shadow-purple-500/50"
                      : ""
                  } `}
                >
                  <div className="relative">
                    <img
                      className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
                      src={c.image ? c.image : "http://res.cloudinary.com/dcisvww0d/image/upload/v1722336342/profile/e8om4gadqi6r7d7dzsxs.jpg"}
                      alt="friend-img"
                    />
                    {activeUsers.some((a) => a.myId === c.fdId) && (
                      <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                    )}
                  </div>

                  <div className="flex justify-center items-start flex-col w-full">
                    <div className="flex justify-between items-center w-full">
                      <h2 className="text-base font-semibold">{c.name}</h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Chat area start */}
          <div className="w-full md:w-[calc(100%-200px)] md:pl-4">
            {friendId ? (
              <div>
                {/* Current friend info start */}
                <div className="flex justify-between items-center">
                  <div className="flex justify-start items-center gap-3">
                    <div className="relative">
                      <img
                        className="w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] p-[2px] rounded-full"
                        src={
                          currentFd.image
                            ? currentFd.image
                            : "http://res.cloudinary.com/dcisvww0d/image/upload/v1722336342/profile/e8om4gadqi6r7d7dzsxs.jpg"
                        }
                        alt=""
                      />
                      {activeUsers.some((a) => a.myId === currentFd.fdId) && (
                        <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                      )}
                    </div>

                    <h2 className="text-base text-white font-semibold">
                      {currentFd.name}
                    </h2>
                  </div>
                  <div
                    onClick={() => setShow(!show)}
                    className="w-[35px] flex sm:hidden md:hidden lg:hidden h-[35px] rounded-sm bg-blue-500 shadow-lg hover:shadow-blue-500/50 justify-center cursor-pointer items-center text-white"
                  >
                    <span>
                      <FaList />
                    </span>
                  </div>
                </div>
                {/* Current friend info end */}

                {/* Messages start */}
                <div className="py-4">
                  <div className="bg-[#475569] bg-opacity-10 backdrop-filter backdrop-blur-lg bg-blur-lg h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                    {all_messages &&
                      all_messages.map((m, i) => (
                        <motion.div
                          key={i}
                          ref={scrollRef}
                          className={`w-full flex justify-start items-center ${
                            currentFd.fdId !== m.receverId
                              ? "justify-start"
                              : "justify-end"
                          }`}
                          initial={
                            currentFd.fdId !== m.receverId
                              ? { x: -100 }
                              : { y: -100 }
                          }
                          animate={
                            currentFd.fdId !== m.receverId
                              ? { x: 0 }
                              : { y: -0 }
                          }
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                          }}
                        >
                          <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                            <div>
                              <img
                                className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                                src={
                                  currentFd.fdId !== m.receverId
                                    ? currentFd.image
                                      ? currentFd.image
                                      : "http://res.cloudinary.com/dcisvww0d/image/upload/v1722336342/profile/e8om4gadqi6r7d7dzsxs.jpg"
                                    : userInfo.image
                                    ? userInfo.image
                                    : "http://res.cloudinary.com/dcisvww0d/image/upload/v1722336342/profile/e8om4gadqi6r7d7dzsxs.jpg"
                                }
                                alt="profile-image"
                              />
                            </div>

                            <div className="flex">
                              <div
                                className={`flex justify-center items-start flex-col w-full ${
                                  currentFd.fdId !== m.receverId
                                    ? " bg-blue-500 shadow-lg shadow-blue-500/50"
                                    : " bg-purple-500 shadow-lg shadow-purple-500/50"
                                } text-white py-1 px-2 rounded-md`}
                                onClick={() => deleteBtn(m._id)}
                              >
                                <span>{m.message} </span>
                              </div>

                              {currentFd.fdId === m.receverId &&
                                deletebtnshow &&
                                activeMessageId === m._id && (
                                  // Render delete button if activeMessageId matches current message ID
                                  <div className="ml-2">
                                    <MdDeleteForever
                                      style={{ fontSize: "20px", color: "red" }}
                                      onClick={() => deleteMessage(m._id)}
                                    />
                                  </div>
                                )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
                {/* Messages end */}

                {/* Message send form start */}
                <form onSubmit={send} className="flex gap-3">
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="
                    bg-[#a855f7]
                    w-full flex 
                    justify-between 
                    px-2 
                    border 
                    border-black-900 
                    items-center 
                    py-[5px]
                    focus:border-blue-900
                    rounded-md 
                    outline-none 
                    text-bold
                    text-[#ffffff]"
                    type="text"
                    placeholder="Input Your Message"
                  />
                  <button className="shadow-lg bg-[#06b6d4] hover:shadow-cyan-500/50 text-semibold w-[75px] h-[35px] rounded-md text-white flex justify-center items-center">
                    Send
                  </button>
                </form>
                {/* Message send form end */}
              </div>
            ) : (
              // If no friend selected
              <div className="py-0">
                <div
                  onClick={() => setShow(!show)}
                  className="bg-[#475569] bg-opacity-10 backdrop-filter backdrop-blur-lg bg-blur-lg h-[calc(100vh-177px)] rounded-md p-3 overflow-y-auto"
                >
                  <div className="cursor-pointer w-full h-full flex justify-center items-center text-white gap-2 flex-col">
                    <strong>Select Friend </strong>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Chat area end */}
        </div>
      </div>
    </div>
  );
};

export default UserToCustomer;
