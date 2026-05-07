import { ReactNode } from 'react'

interface FormInputProps {
  label?: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  required?: boolean
  disabled?: boolean
  icon?: ReactNode
  className?: string
}

export function FormInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required,
  disabled,
  icon,
  className = '',
}: FormInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="label-md block mb-2">
          {label}
          {required && <span className="text-primary ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`input-base ${icon ? 'pl-12' : ''} ${
            error ? 'border-primary focus:ring-primary' : ''
          } ${className}`}
        />
      </div>
      {error && <p className="text-primary text-sm mt-2">{error}</p>}
    </div>
  )
}
