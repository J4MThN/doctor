
interface NavProps {
  title: string;
}

export default function Nav({ title }: NavProps) {
  return (
    <div className="flex h-[30px] bg-[#F9F9FB] w-full  items-center  pr-4 ">
      <span className="flex text-[11px] "> خانه  / {title}</span>
    </div>
  );
}