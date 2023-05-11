import { isError } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProfileImage } from "./ProfileImage";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";

type Tweet = {
  id: string;
  content: string;
  createdAt: Date;
  likeCount: number;
  likedByMe: boolean;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

type InfiniteTweetListProps = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean;
  tweets?: Tweet[];
  fetchNewTweets: () => Promise<unknown>;
};

export const InfiniteTweets = ({
  isLoading,
  isError,
  hasMore,
  tweets,
  fetchNewTweets,
}: InfiniteTweetListProps) => {
  if (isError) return <div>Some error...</div>;
  if (isLoading) return <div>Loading...</div>;
  if (tweets.length === 0 || !tweets)
    return (
      <h2 className="my-4 text-center text-2xl text-gray-500"> No Tweets</h2>
    );

  return (
    <ul>
      <InfiniteScroll
        dataLength={tweets.length}
        next={fetchNewTweets}
        hasMore={hasMore}
        loader="Loading"
      >
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} {...tweet} />
        ))}
      </InfiniteScroll>
    </ul>
  );
};

const dataTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
});

const TweetCard = ({
  id,
  content,
  createdAt,
  likeCount,
  likedByMe,
  user,
}: Tweet) => {
  return (
    <li className="flex gap-2 border-b px-4 py-4">
      <Link href={`/profile/${user.id}`}>
        <ProfileImage src={user.image} />
      </Link>
      <div className="flex flex-grow flex-col">
        <div className="flex gap-1">
          <Link
            href={`profile/${user.id}`}
            className="font-bold hover:underline focus-visible:underline"
          >
            {user.name}
          </Link>
          <span className="text-gray-500">
            {dataTimeFormatter.format(createdAt)}
          </span>
        </div>
        <p className="flex whitespace-pre-wrap">{content}</p>
        <HeartButton likeCount={likeCount} likedByMe={likedByMe} />
      </div>
    </li>
  );
};

type HeartButtonProps = { likedByMe: boolean; likeCount: number };

const HeartButton = ({ likedByMe, likeCount }: HeartButtonProps) => {
  const session = useSession();
  const HeartIcon = likedByMe ? VscHeartFilled : VscHeart;

  if (session.status !== "authenticated") {
    return (
      <div className="mb-1 mt-1 flex items-center gap-3 self-start text-gray-500">
        <HeartIcon />
        <span>{likeCount}</span>
      </div>
    );
  }
  return (
    <>
      <div
        className={`item-center group gap-1 self-start transition-all ${
          likedByMe
            ? "text-red-500"
            : "focus:text:red-500 text-gray-500 hover:text-red-500"
        } `}
      >
        <HeartIcon
          className={`transition-all ${
            likedByMe
              ? "fill-red-500"
              : "group-hover:fill-500 fill-gray-500 group-focus-visible:fill-red-500"
          }`}
        />
        <span>{likeCount}</span>
      </div>
    </>
  );
};
