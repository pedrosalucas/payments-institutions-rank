import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Text } from "@geist-ui/core";
import styles from "@/styles/Home.module.css";

const Filter = ({ title, value, options, setName, disabled, isLoading, callbackOnChange }: {
  title: string,
  value: string | null,
  options: string[],
  setName: Dispatch<SetStateAction<string | null>>,
  disabled: boolean,
  isLoading: boolean,
  callbackOnChange: () => void
}) => {
  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const newValue = e.target.value;
    console.log(newValue);

    if (newValue === '') {
      callbackOnChange();
    }

    setName(newValue);
  };

  return (
    <div style={{ flexGrow: '1', margin: '0 10px 0', zIndex: '99999' }}>
      <Text h3>{title}</Text>

      <select
        className={styles.select_map}
        onChange={handleChange}
        value={value || ''}
        disabled={disabled}
      >
        <option className={styles.option} value=""></option>
        {options.map((option: string) => {
          return (
            <option className={styles.option} key={option} value={option}>
              {option.replace(/\b\w/g, l => l.toUpperCase())}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Filter;
