interface Props {
    children: React.ReactNode;
    className?: string;
}

const TitleBar = ({ children, className }: Props) => {
    return (
        <div className='w-full flex items-center gap-[8px] bg-white rounded-lg px-[16px] sm:px-[24px] py-[16px] mb-[24px]'>
            <h2 className=' whitespace-nowrap font-bold text-[20px] '>{children}</h2>
        </div>
    );
};

export default TitleBar;
