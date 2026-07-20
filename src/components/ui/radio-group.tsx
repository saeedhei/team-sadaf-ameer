import React from 'react';

interface RadioGroupProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function RadioGroup({ value, onValueChange, children, className = '' }: RadioGroupProps) {
  return (
    <div className={`space-y-2.5 ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            selectedValue: value,
            onChange: onValueChange
          });
        }
        return child;
      })}
    </div>
  );
}

interface RadioGroupItemProps {
  value: string;
  id: string;
  selectedValue?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function RadioGroupItem({
  value,
  id,
  selectedValue,
  onChange,
  children,
  className = ''
}: RadioGroupItemProps) {
  const isSelected = selectedValue === value;

  return (
    <div
      onClick={() => onChange?.(value)}
      id={id}
      className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all duration-150 cursor-pointer ${
        isSelected
          ? 'bg-blue-50/40 border-blue-600 text-slate-900 shadow-sm'
          : 'bg-white hover:bg-slate-50 border-blue-100 text-slate-700 hover:border-blue-200'
      } ${className}`}
    >
      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
        isSelected ? 'border-blue-600' : 'border-slate-300'
      }`}>
        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
      </div>
      <div className="flex-1 text-xs sm:text-sm font-semibold leading-none select-none">
        {children}
      </div>
    </div>
  );
}
