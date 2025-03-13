import { LogoutButton } from "./logout-button";
import { UserButton } from "./user-button";

export const Header = () => {
  return (
    <div className=" p-2 max-w-5xl w-full mx-auto flex items-center justify-between">
      <UserButton />
      <LogoutButton />
    </div>
  );
};
