import * as React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

/**
 * Form input primitive with optional label and error text.
 */
export const FormInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & {
    label?: string
    error?: string
    containerClassName?: string
  }
>(({ label, error, id, className, containerClassName, ...props }, ref) => {
  return (
    <div className={cn('space-y-2', containerClassName)}>
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      <Input ref={ref} id={id} className={cn(error && 'border-destructive', className)} {...props} />
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  )
})
FormInput.displayName = 'FormInput'

/**
 * Form textarea primitive with optional label and error text.
 */
export const FormTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'> & {
    label?: string
    error?: string
    containerClassName?: string
  }
>(({ label, error, id, className, containerClassName, ...props }, ref) => {
  return (
    <div className={cn('space-y-2', containerClassName)}>
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      <Textarea ref={ref} id={id} className={cn(error && 'border-destructive', className)} {...props} />
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  )
})
FormTextarea.displayName = 'FormTextarea'

/**
 * Form select primitive with optional label and error text.
 */
export function FormSelect({
  label,
  error,
  placeholder,
  value,
  onValueChange,
  options,
  triggerClassName,
}: {
  label?: string
  error?: string
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  options: Array<{ label: string; value: string }>
  triggerClassName?: string
}) {
  return (
    <div className="space-y-2">
      {label ? <Label>{label}</Label> : null}
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className={cn('w-full', error && 'border-destructive', triggerClassName)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  )
}
