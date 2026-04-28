"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DashboardHeader() {
  const [name, setName] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      const fullName =
        user?.user_metadata?.full_name ||
        user?.user_metadata?.name ||
        user?.email?.split("@")[0] ||
        "there";
      setName(fullName.split(" ")[0]);
    });
  }, []);

  return (
    <div>
      <h1 className="text-[2.2rem] font-medium text-neutral-900 dark:text-white font-inter">
        Good Day, {name}!
      </h1>
    </div>
  );
}
