import { useRouter } from 'next/navigation';
import { IMailInbox } from '@/interfaces';

import { Avatar, AvatarGroup, Badge } from '@mui/material';
import { deepOrange, deepPurple } from '@mui/material/colors';
import moment from 'moment';

interface Props {
    item: IMailInbox;
    className?: string;
}

const MailInboxListItem = ({ item, className }: Props) => {
    const router = useRouter();

    const handleItemClick = () => {
        router.push(`/mail/inbox/${item.id}`);
    };

    return (
        <tr
            className='w-full flex items-center border-t border-b border-solid border-[#E5EAF2] mb-[-1px] cursor-pointer hover:bg-[#919eab19] transition-all duration-500 ease-out'
            onClick={handleItemClick}
        >
            <td className='px-[8px] py-[20px]'>
                <Badge badgeContent={item.new_message_cnt} color='secondary'>
                    {item.last_message?.customers.length == 1 ? (
                        <Avatar sx={{ bgcolor: deepOrange[500], color: 'white' }}>
                            {item.last_message?.customers[0]?.name?.charAt(0)}
                        </Avatar>
                    ) : (
                        <AvatarGroup total={item.last_message?.customers.length}>
                            {item.last_message?.customers.slice(0, 2).map((customer, index) => (
                                <Avatar key={index} sx={{ bgcolor: deepPurple[500], color: 'white' }}>
                                    {customer?.name?.charAt(0)}
                                </Avatar>
                            ))}
                        </AvatarGroup>
                    )}
                </Badge>
            </td>
            <td className='px-[16px] min-w-[200px] line-clamp-1'>
                <div className='w-full flex items-baseline gap-[8px] text-[#212b36] '>
                    <span className='text-[14px] line-clamp-1'>
                        {item.last_message?.customers.map(customer => customer.name).join(', ')}
                    </span>

                    <span className='text-[12px] '>( {item.message_cnt} 件 )</span>
                </div>
            </td>
            <td className='px-[16px] min-w-[200px] w-full'>
                <div className='w-full flex flex-col'>
                    <h3 className='text-[#212b36] text-[14px]'>{item.last_message?.subject}</h3>
                    <p className=' line-clamp-1 text-[#9192ab] text-[12px] italic'>{item.last_message?.body}</p>
                </div>
            </td>
            <td className='px-[4px]' valign='bottom'>
                <span className='text-[12px] whitespace-nowrap'>
                    {moment(item.last_message?.created_at).format('YYYY-MM-DD')}
                </span>
            </td>
        </tr>
    );
};

export default MailInboxListItem;
