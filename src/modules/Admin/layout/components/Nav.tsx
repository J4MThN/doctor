interface NavProps {
  items: string[];
}

export default function Nav({ items }: NavProps) {
  return (
    <div className="flex w-full h-7.5 text-[12px] bg-[#F9F9FB] items-center pr-4 mt-2">
      {items.map((item, index) => {
        const isLast = index === items.length - 1 ;;
        return (
          <div key={`${item}-${index}`} className="flex items-center">
             {index !== 0 && (<span className="mt-1 text-[#4d4d4d] ml-1">/</span>)}
            <span
              className={`mt-1 ml-1 ${ isLast ? "text-[#606060]" : "text-[#aeaeb2]"}`}
            >
              {item}
            </span>
           
          </div>
        );
      })}
    </div>
  );
}
