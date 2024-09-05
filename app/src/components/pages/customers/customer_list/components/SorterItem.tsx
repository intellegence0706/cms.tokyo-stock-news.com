interface Props {
    label: string;
    current: string;
    value: string;
}

const SorterItem = ({ label, value, current, }: Props) => {
    
    return (
        <div className='w-full flex items-center gap-[8px] cursor-pointer'>
            <span className=' whitespace-nowrap'>{label}</span>

            {current === value}

        </div>
    );
};

export default SorterItem;
