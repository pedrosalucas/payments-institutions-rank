import React, { Dispatch, SetStateAction } from 'react';
import Select from "react-select";
import { Text } from "@geist-ui/core";

const Filter = ({title, setName, setCoordinates}: {
  title: string,
  setName: Dispatch<SetStateAction<string>>
  setCoordinates: Dispatch<SetStateAction<[number, number]>>
}) => {

  const handleChange = (newValue: any| null) => {
    if(newValue !== null) {
      const { value } = newValue as { value: string; label: string };
      setName(value);
      setCoordinates([-10.9267, -37.0729]);
    }
  };

  const options = [
    { value: '', label: 'Nenhum' },
    { value: 'aracaju', label: 'Aracaju' },
  ];

  return (
    <div style={{ flexGrow: '1', margin: '0 10px 0', zIndex: '99999'}}>
      <Text h3>{title}</Text>

      <Select
        options={options}
        onChange={handleChange}
        isClearable={true}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles, backgroundColor: 'black',
            color: 'white',
          }),
          input: (provided) => ({ ...provided, color: 'white' }),
          option: (baseStyles, state) => ({
            ...baseStyles, color: 'white',
            backgroundColor: 'black'
          }),
          singleValue: (provided) => ({ ...provided, color: 'white' })
        }}
      />
    </div>
  );
};

export default Filter;
