import { cn } from '@/helper/utils'

interface I_Button {
    children: React.ReactNode,
    className?: string
}

function Button({ children, className,...arg }:I_Button) {
    return (
        <button
        className={cn("",className)}
        {...arg}
        >
            {children}
        </button>
    )
}

export default Button
