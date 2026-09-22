"use client";

import { ListCycleid } from "@/src/modules/Admin/admin/components/Cycle/ListCycleid/ListCycleid";

import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    return null;
  }

  return <ListCycleid id={id} />;
};

export default Page;
