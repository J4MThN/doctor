import {points } from "@/src/modules/Admin/data/users";

interface EditeProps {
    id:string;
}

export const EditPoint = ({id}:EditeProps) => {

    const selectPoint = points.find((item) => String(item.key) === id)

  return (
    <>
    عنوان :  {selectPoint?.title}
    </>
  );
};
