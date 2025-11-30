
import { Controller } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";


interface EditableFieldProps {
  label: string;
  name: string;
  control: any;
  isEditing: boolean;
  rules?: any;
}

export function EditableField({ label, name, control, isEditing, rules }: EditableFieldProps) {
  return (
    <div 
    className="flex flex-col flex-1">
      <Label className="text-base text-muted-foreground">{label}</Label>
      {isEditing ? (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field, fieldState }) => (
            <div className="flex flex-col">
              <Input {...field} placeholder={`Enter your ${label}`}/>
              {fieldState.error && (
                <span className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />
      ) : (
        <p className="font-medium text-lg">{control._formValues[name] == '' ? <span className="text-muted-foreground font-normal">not available</span> : control._formValues[name]}</p>
      )}
    </div>
  );
}
