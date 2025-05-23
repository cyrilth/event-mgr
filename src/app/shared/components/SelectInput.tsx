import clsx from "clsx";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  rows?: number;
  label: string;
  options: { key: string; label: string }[];
} & UseControllerProps<T>;

export default function SelectInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });

  return (
    <label className="floating-label text-left w-full">
      <span>{props.label}</span>
      <select
        {...field}
        value={field.value || `Select a ${props.label}`}
        className={clsx("select select-lg w-full", {
          "input-error": !!fieldState.error,
          "input-success": !fieldState.error && fieldState.isDirty,
        })}
      >
        <option disabled>Select a {props.label}</option>
        {props.options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
      {fieldState.error && (
        //wired issue where validator-hint remains not visible, therefore needed to add visible class
        <div className="validator-hint text-error visible">
          {fieldState.error.message}
        </div>
      )}
    </label>
  );
}
