import Image from 'next/image'
import {MouseEventHandler} from 'react'

type Props = {
  label: string
  type?: 'button' | 'submit'
  leftIcon?: string | null
  rightIcon?: string | null
  handleClick?: MouseEventHandler
  isSubmitting?: boolean
  bgColor?: string
  textColor?: string
}

const Button = ({label, type, leftIcon, rightIcon, handleClick, isSubmitting, bgColor, textColor}: Props) => {
  return (
    <button
      type={type || 'button'}
      disabled={isSubmitting}
      className={`
      flexCenter gap-3 px-4 py-3 
      ${textColor || 'text-white'}
      ${isSubmitting ? 'bg-black/50' : bgColor || 'bg-primary-purple'}
      rounded-xl text-sm font-medium max-md:w-full}
    `}
      onClick={handleClick}>
      {leftIcon && <Image src={leftIcon} width={14} height={14} alt="Left Icon" />}
      {label}
      {rightIcon && <Image src={rightIcon} width={14} height={14} alt="Right Icon" />}
    </button>
  )
}

export default Button
