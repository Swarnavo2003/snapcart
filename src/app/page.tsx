import { auth } from "@/auth";
import { EditRoleMobile } from "@/components/edit-role-mobile";
import { Navbar } from "@/components/navbar";
import connectDB from "@/lib/db";
import User from "@/models/user.model";
import { redirect } from "next/navigation";

export default async function Home() {
  await connectDB();
  const session = await auth();

  const user = await User.findById(session?.user?.id);
  if (!user) {
    redirect("/login");
  }

  const incomplete =
    !user.mobile || !user.role || (!user.mobile && user.role == "user");

  if (incomplete) {
    return <EditRoleMobile />;
  }

  const plainUser = JSON.parse(JSON.stringify(user));

  return (
    <div>
      <Navbar user={plainUser} />
    </div>
  );
}
