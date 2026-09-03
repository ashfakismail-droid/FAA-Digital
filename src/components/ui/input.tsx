"use client";

import { forwardRef, useId, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
  className?: string;
}

function FieldWrapper({ label, htmlFor, required, hint, children, className }: FieldWrapperProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-1 text-brand-500" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, required, id, className, ...props }, ref) => {
    const autoId = useId();
    const fieldId = id ?? autoId;
    return (
      <FieldWrapper label={label} htmlFor={fieldId} required={required} hint={hint}>
        <input ref={ref} id={fieldId} required={required} className={cn("input-base", className)} {...props} />
      </FieldWrapper>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, required, id, className, ...props }, ref) => {
    const autoId = useId();
    const fieldId = id ?? autoId;
    return (
      <FieldWrapper label={label} htmlFor={fieldId} required={required} hint={hint}>
        <textarea
          ref={ref}
          id={fieldId}
          required={required}
          rows={5}
          className={cn("input-base resize-none", className)}
          {...props}
        />
      </FieldWrapper>
    );
  }
);
Textarea.displayName = "Textarea";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, required, id, className, options, placeholder, ...props }, ref) => {
    const autoId = useId();
    const fieldId = id ?? autoId;
    return (
      <FieldWrapper label={label} htmlFor={fieldId} required={required} hint={hint}>
        <select ref={ref} id={fieldId} required={required} className={cn("input-base appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23888%22 stroke-width=%222%22%3E%3Cpath d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-10", className)} {...props}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </FieldWrapper>
    );
  }
);
Select.displayName = "Select";
