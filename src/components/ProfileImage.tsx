import Image from "next/image";

type ProfileImageProps = {
  src?: string | undefined;
  className?: string;
};

export const ProfileImage = ({ src, className = "" }: ProfileImageProps) => {
  return (
    <div
      className={`relative h-12 w-12 overflow-hidden rounded-full ${className}`}
    >
      {!src ? "" : <Image src={src} quality={100} alt="profile image" fill />}
    </div>
  );
};
