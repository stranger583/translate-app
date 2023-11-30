import { cn } from '@/helper/utils'

interface I_Select {
    children: React.ReactNode,
    className?: string
}

function Select({ children, className,...arg }:I_Select) {
    return (
        <select
        className={cn("",className)}
        {...arg}
        >
            {children}
        </select>
    )
}

export default Select