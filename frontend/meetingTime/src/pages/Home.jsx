import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GoPlus } from "react-icons/go";

import { FaRegUser } from "react-icons/fa";
import { FaMapPin } from "react-icons/fa6";
import { CiCircleCheck } from "react-icons/ci";
import React, { useEffect, useState } from "react";
import {
  getMyFriends,
  getRecommededUsers,
  getUserFriends,
  getongoingRequests,
  sendFriendRequest,
} from "../utils/api";
import { Link } from "react-router-dom";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
// const capitialize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
function Home() {
  const queryClient = useQueryClient();
  const [outGoingRequestIds, setoutGoingRequestIds] = useState(new Set());

 

  const { data: friends = [], isLoading: loadingFriends } = useQuery({

    
    queryKey: ["friends"],
    queryFn: getMyFriends,
  });


  
  const { data: recommededUser = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommededUsers,
  });
 
  

  const { data: ongoingRequests } = useQuery({
    queryKey: ["ongoingRequests"],
    queryFn: getongoingRequests,
  });
  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["ongoingRequests"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if (ongoingRequests && ongoingRequests.length > 0) {
      ongoingRequests.forEach((req) => {
    
       

        outgoingIds.add(req.recipient?._id);
      });
      setoutGoingRequestIds(outgoingIds);
    }
  }, [ongoingRequests]);
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <FaRegUser className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <p>No Friends</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends?.friends?.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        <section>
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Meet New Learners
                </h2>
                <p className="opacity-70">
                  Discover perfect language exchange partners based on your
                  profile
                </p>
              </div>
            </div>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : recommededUser?.length === 0 ? (
            <div className="card bg-base-200 p-6 text-center">
              <h3 className="font-semibold text-lg mb-2">
                No recommendations available
              </h3>
              <p className="text-base-content opacity-70">
                Check back later for new language partners!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommededUser?.map((user) => {
                
                
                const hasRequestBeenSent = outGoingRequestIds.has(user?._id);
             

                return (
                  <div
                    key={user._id}
                    className="card bg-base-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="card-body p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar size-16 rounded-full">
                          <img src={user.profileImage} alt={user.name} />
                        </div>

                        <div>
                          <h3 className="font-semibold text-lg">{user.name}</h3>
                          {user.location && (
                            <div className="flex items-center text-xs opacity-70 mt-1">
                              <FaMapPin className="size-3 mr-1" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Languages with flags */}
                      <div className="flex flex-wrap gap-1.5">
                        <span className="badge badge-secondary">
                          {getLanguageFlag(user.nativeLanguage)}
                          Native: {(user.nativeLanguage)}
                        </span>
                        <span className="badge badge-outline">
                          {getLanguageFlag(user.learningLanguage)}
                          Learning: {(user.learningLanguage)}
                        </span>
                      </div>

                      {user.bio && (
                        <p className="text-sm opacity-70">{user.bio}</p>
                      )}

                      {/* Action button */}
                      <button
                        className={`btn w-full mt-2 ${
                          hasRequestBeenSent ? "btn-disabled" : "btn-primary"
                        } `}
                        onClick={() => sendRequestMutation(user._id)}
                        disabled={hasRequestBeenSent || isPending}
                      >
                        {hasRequestBeenSent ? (
                          <>
                            <CiCircleCheck className="size-4 mr-2" />
                            Request Sent
                          </>
                        ) : (
                          <>
                            <GoPlus  className="size-4 mr-2" />
                            Send Friend Request
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Home;
