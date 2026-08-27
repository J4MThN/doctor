interface NavProps {
  title: string;
}

export default function Nav({ title }: NavProps) {
  return (
      <div className="flex w-full h-7.5 bg-[#F9F9FB] items-center pr-4 mt-2">
        <span className="flex text-[12px] mt-1"> خانه / {title}</span>
      </div>
  );
}
