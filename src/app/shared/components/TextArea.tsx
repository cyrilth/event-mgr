import clsx from "clsx";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  rows?: number;
  label: string;
} & UseControllerProps<T>;

export default function TextArea<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });

  return (
    <label className="floating-label text-left">
      <span>{props.label}</span>
      <textarea
        {...field}
        value={field.value ?? ""}
        rows={props.rows}
        className={clsx("textarea textarea-lg w-full", {
          "input-error": !!fieldState.error,
          "input-success": !fieldState.error && fieldState.isDirty,
        })}
        placeholder={props.label}
      />
      {fieldState.error && (
        //wired issue where validator-hint remains not visible, therefore needed to add visible class
        <div className="validator-hint text-error visible">
          {fieldState.error.message}
        </div>
      )}
    </label>
  );
}
