import React, { InputHTMLAttributes, ReactNode, forwardRef } from 'react';

export interface InputProps {
  /**
   * Input label
   */
  label?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  /**
   * Content to prepend to the input field
   */
  prefix?: ReactNode;
  /**
   * Content to append to the input field 
   */
  suffix?: ReactNode;
  /**
   * Additional classes for the input container
   */
  containerClassName?: string;
  /**
   * Whether the input is required
   */
  required?: boolean;
  /**
   * Whether the input is full width
   */
  fullWidth?: boolean;
  /**
   * Native HTML input props
   */
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  /**
   * Input ID
   */
  id?: string;
  /**
   * Input className
   */
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  prefix,
  suffix,
  containerClassName = '',
  className = '',
  id,
  required = false,
  fullWidth = true,
  inputProps = {},
  ...restProps
}, ref) => {
  // Generate a unique ID if none provided
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  // Base input classes
  const inputClasses = [
    error ? 'form-input-error' : 'form-input',
    className
  ].join(' ');
  
  // Container classes
  const containerClasses = [
    'mb-4',
    fullWidth ? 'w-full' : '',
    containerClassName
  ].join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      {(prefix || suffix) ? (
        <div className="input-group">
          {prefix && (
            <span className="input-group-text">{prefix}</span>
          )}
          <input
            id={inputId}
            ref={ref}
            className={inputClasses}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...inputProps}
            {...restProps}
          />
          {suffix && (
            <span className="input-group-text">{suffix}</span>
          )}
        </div>
      ) : (
        <input
          id={inputId}
          ref={ref}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...inputProps}
          {...restProps}
        />
      )}
      
      {error && (
        <p id={`${inputId}-error`} className="form-feedback-error">
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p id={`${inputId}-helper`} className="form-feedback">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 