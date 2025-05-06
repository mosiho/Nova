import React, { forwardRef } from 'react';

// Form control layout component
interface FormControlProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const FormControl: React.FC<FormControlProps> = ({
  children,
  className = '',
  id
}) => {
  return (
    <div className={`mb-4 ${className}`} id={id}>
      {children}
    </div>
  );
};

// Form label component
interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

export const FormLabel: React.FC<FormLabelProps> = ({
  children,
  required = false,
  className = '',
  ...props
}) => {
  return (
    <label className={`form-label ${className}`} {...props}>
      {children}
      {required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
      {required && <span className="sr-only">(required)</span>}
    </label>
  );
};

// Form input component
interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  isError?: boolean;
  size?: 'sm' | 'md' | 'lg';
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  className?: string;
  errorMessage?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ isError = false, size = 'md', leftAddon, rightAddon, className = '', errorMessage, id, ...props }, ref) => {
    // Generate a random ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${inputId}-error`;
    
    // If there's an addon, we need to wrap in input-group
    if (leftAddon || rightAddon) {
      return (
        <div className="input-group">
          {leftAddon && (
            <span className="input-group-text" aria-hidden="true">{leftAddon}</span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`${isError ? 'form-input-error' : 'form-input'} ${className}`}
            aria-invalid={isError}
            aria-describedby={isError && errorMessage ? errorId : undefined}
            {...props}
          />
          {rightAddon && (
            <span className="input-group-text" aria-hidden="true">{rightAddon}</span>
          )}
          {isError && errorMessage && (
            <div id={errorId} className="form-feedback-error" role="alert">
              {errorMessage}
            </div>
          )}
        </div>
      );
    }

    // Simple input without addons
    return (
      <>
        <input
          ref={ref}
          id={inputId}
          className={`${isError ? 'form-input-error' : 'form-input'} ${className}`}
          aria-invalid={isError}
          aria-describedby={isError && errorMessage ? errorId : undefined}
          {...props}
        />
        {isError && errorMessage && (
          <div id={errorId} className="form-feedback-error" role="alert">
            {errorMessage}
          </div>
        )}
      </>
    );
  }
);

FormInput.displayName = 'FormInput';

// Form select component
interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string | number; label: string }>;
  isError?: boolean;
  placeholder?: string;
  className?: string;
  errorMessage?: string;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ options = [], isError = false, placeholder, className = '', errorMessage, id, ...props }, ref) => {
    // Generate a random ID if not provided
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${selectId}-error`;
    
    return (
      <>
        <select
          ref={ref}
          id={selectId}
          className={`form-select ${isError ? 'border-red-300' : ''} ${className}`}
          aria-invalid={isError}
          aria-describedby={isError && errorMessage ? errorId : undefined}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {isError && errorMessage && (
          <div id={errorId} className="form-feedback-error" role="alert">
            {errorMessage}
          </div>
        )}
      </>
    );
  }
);

FormSelect.displayName = 'FormSelect';

// Form textarea component
interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  isError?: boolean;
  className?: string;
  errorMessage?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ isError = false, className = '', errorMessage, id, ...props }, ref) => {
    // Generate a random ID if not provided
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${textareaId}-error`;
    
    return (
      <>
        <textarea
          ref={ref}
          id={textareaId}
          className={`form-textarea ${isError ? 'border-red-300' : ''} ${className}`}
          aria-invalid={isError}
          aria-describedby={isError && errorMessage ? errorId : undefined}
          {...props}
        />
        {isError && errorMessage && (
          <div id={errorId} className="form-feedback-error" role="alert">
            {errorMessage}
          </div>
        )}
      </>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

// Form checkbox component
interface FormCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: React.ReactNode;
  isError?: boolean;
  className?: string;
  errorMessage?: string;
}

export const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ label, isError = false, className = '', errorMessage, id, ...props }, ref) => {
    // Generate a random ID if not provided
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = `${checkboxId}-error`;
    
    return (
      <div className={`flex flex-col ${className}`}>
        <div className="flex items-center">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className={`form-checkbox ${isError ? 'border-red-300' : ''}`}
            aria-invalid={isError}
            aria-describedby={isError && errorMessage ? errorId : undefined}
            {...props}
          />
          <label htmlFor={checkboxId} className="ml-2 block text-sm text-gray-700">
            {label}
          </label>
        </div>
        {isError && errorMessage && (
          <div id={errorId} className="form-feedback-error mt-1" role="alert">
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
);

FormCheckbox.displayName = 'FormCheckbox';

// Form feedback component
interface FormFeedbackProps {
  children: React.ReactNode;
  type?: 'error' | 'success' | 'info';
  className?: string;
  id?: string;
}

export const FormFeedback: React.FC<FormFeedbackProps> = ({
  children,
  type = 'error',
  className = '',
  id
}) => {
  const feedbackClass = {
    error: 'form-feedback-error',
    success: 'form-feedback-success',
    info: 'form-feedback-info',
  }[type];

  const role = type === 'error' ? 'alert' : 'status';

  return (
    <div className={`${feedbackClass} ${className}`} id={id} role={role}>
      {children}
    </div>
  );
};

// Reexport all form components
const FormControls = {
  Control: FormControl,
  Label: FormLabel,
  Input: FormInput,
  Select: FormSelect,
  Textarea: FormTextarea,
  Checkbox: FormCheckbox,
  Feedback: FormFeedback,
};

export default FormControls; 