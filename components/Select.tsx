import React from 'react';

type Props = {
  label: string;
};

export default function Select({ label }: Props) {
  return (
    <div className="flex flex-col my-3">
      <label className="text-gray-500 text-sm" htmlFor={label}>
        {label}
      </label>
      <div className="flex">
        <select
          className="max-w-fit bg-gray-200 p-1.5 mr-1.5"
          name={label}
          id={label}
        >
          <option value="12:00">12:00</option>
          <option value="12:30">12:30</option>
          <option value="1:00">1:00</option>
          <option value="1:30">1:30</option>
          <option value="2:00">2:00</option>
          <option value="2:30">2:30</option>
          <option value="3:00">3:00</option>
          <option value="3:30">3:30</option>
          <option value="4:00">4:00</option>
          <option value="4:30">4:30</option>
          <option value="5:00">5:00</option>
          <option value="5:30">5:30</option>
          <option value="5:00">6:00</option>
          <option value="5:30">6:30</option>
          <option value="5:00">7:00</option>
          <option value="5:30">7:30</option>
          <option value="5:00">8:00</option>
          <option value="5:30">8:30</option>
          <option value="5:00">9:00</option>
          <option value="5:30">9:30</option>
          <option value="5:00">10:00</option>
          <option value="5:30">10:30</option>
          <option value="5:00">11:00</option>
          <option value="5:30">11:30</option>
        </select>

        <select className="max-w-fit bg-gray-200 p-1.5" name="ampm" id="ampm">
          <option value="am">am</option>
          <option value="pm">pm</option>
        </select>
      </div>
    </div>
  );
}
