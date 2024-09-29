import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const Header = async () => {
  const user = await getCurrentUser();
  return (
    <header className="px-4 py-6">
      <nav className="flex justify-between items-center  max-w-5xl mx-auto">
        <Link href="/" className="text-2xl font-bold">
          My Blogs
        </Link>

        <ul className="flex space-x-4 items-center">
          <li>
            <Link href="/blogs" className="">
              Create Post
            </Link>
          </li>
          {user?.name ? (
            <>
              <span className="">{user?.name}</span> <LogoutButton />
            </>
          ) : (
            <li>
              <Link href="/api/auth/signin" className="">
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
