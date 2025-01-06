/** @format */

import React from 'react';
import { Controller, FieldPath } from 'react-hook-form';
import { FormControl, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import { authFormSchema } from '@/lib/utils';

interface CustomInputProps {
  control: Control<z.infer<typeof authFormSchema>>;
  name: FieldPath<z.infer<typeof authFormSchema>>;
  label: string;
  placeholder: string;
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
}: CustomInputProps) => {
  return (
    <div className="form-item">
      <FormLabel className="form-label">{label}</FormLabel>

      <div className="flex w-full flex-col">
        <FormControl>
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <Input
                {...field}
                placeholder={placeholder}
                type={name === 'password' ? 'password' : 'text'}
                className="input-class"
              />
            )}
          />
        </FormControl>
        <FormMessage className="form-message mt-2" />
      </div>
    </div>
  );
};

export default CustomInput;
