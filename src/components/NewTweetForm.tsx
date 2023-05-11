import { useSession } from "next-auth/react";
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { text } from "stream/consumers";
import { api } from "~/utils/api";
import { Button } from "./Button";
import { ProfileImage } from "./ProfileImage";

const updateTextArea = (textArea?: HTMLTextAreaElement) => {
  if (!textArea) return;
  textArea.style.height = "0";
  textArea.style.height = `${textArea.scrollHeight}px`;
};

export const NewTweetForm = () => {
  const session = useSession();
  if (session.status !== "authenticated" && session !== null) return null;

  return <Form />;
};

const Form = () => {
  const session = useSession();
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();

  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextArea(textArea);
    textAreaRef.current = textArea;
  }, []);

  useLayoutEffect(() => {
    updateTextArea(textAreaRef.current);
  }, [inputValue]);

  const createTweet = api.tweet.create.useMutation({
    onSuccess: (newTweet) => {
      setInputValue("");
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    createTweet.mutate({ content: inputValue });
  };

  if (session.status !== "authenticated" && session !== null) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 border-b px-4 py-2"
    >
      <div className="flex gap-4"></div>
      <ProfileImage src={session.data.user.image} />
      <textarea
        ref={inputRef}
        style={{ height: 0 }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-grow resize-none overflow-hidden text-lg outline-none"
        placeholder="whats is happening?"
      />
      <Button className="self-end">Tweet</Button>
    </form>
  );
};
