import clsx from "clsx";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import type { Suggestion } from "../../../lib/types";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "../../../lib/util/util";

type Props<T extends FieldValues> = {
  type?: string;
  label: string;
} & UseControllerProps<T>;

export default function PlaceInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });

  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [inputValue, setInputValue] = useState(field.value || "");

  useEffect(() => {
    if (field.value && typeof field.value === "object") {
      setInputValue(field.value.venue);
    } else {
      setInputValue(field.value || "");
    }
  }, [field.value]);

  const locationUrl = `https://api.locationiq.com/v1/autocomplete?dedupe=1&limit=6&key=pk.a5efa3f8376503ae66b11e39780b8068`;

  const fetchSuggestions = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query || query.length < 3) {
          setSuggestions([]);
          return;
        }

        setLoading(true);
        try {
          const response = await fetch(`${locationUrl}&q=${query}`);
          const data = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        } finally {
          setLoading(false);
        }
      }, 1000),
    [locationUrl]
  );

  const handleChange = async (value: string) => {
    setInputValue(value);
    field.onChange({ venue: value });
    await fetchSuggestions(value);
  };

  const handleSelect = (location: Suggestion) => {
    const venue = location.display_name;
    const city = location.address.city;
    const latitude = parseFloat(location.lat);
    const longitude = parseFloat(location.lon);
    field.onChange({ venue, city, latitude, longitude });
    setSuggestions([]);
  };

  return (
    <label className="floating-label text-left">
      <span>{props.label}</span>
      <input
        {...field}
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        type={props.type}
        className={clsx("input input-lg w-full", {
          "input-error": !!fieldState.error,
          "input-success": !fieldState.error && fieldState.isDirty,
        })}
        placeholder={props.label}
      />
      {loading && <div className="loading loading-spinner loading-sm"></div>}
      {suggestions.length > 0 && (
        <ul className="list rounded-box p-1 shadow-md">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
              className="list-row p-1 cursor-pointer hover:bg-base-300"
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
      {fieldState.error && (
        //wired issue where validator-hint remains not visible, therefore needed to add visible class
        <div className="validator-hint text-error visible">
          {fieldState.error.message}
        </div>
      )}
    </label>
  );
}
