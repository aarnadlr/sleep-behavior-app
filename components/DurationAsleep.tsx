import React, { useEffect, useState } from 'react';
import { dataObj } from '../helpers/dataObj';

type Props = {
  label: string;
  setStateFunction: (value: number) => void;
  durationInBed: number;
  durationAsleep: number;
  isDisabled: boolean;
};

export default function Select({
  label,
  setStateFunction,
  durationInBed,
  durationAsleep,
  isDisabled,
}: Props) {
  // const [durationInBedContent, setDurationInBedContent] = useState();

  const handleChange = (e) => {
    setStateFunction(Number(e.target.value));
    // setDurationInBedContent(e.target.name);
  };

  return (
    <div className="flex flex-col my-3">
      <label className="text-gray-500 text-sm" htmlFor={label}>
        {label}
      </label>

      <div className="flex">
        <select
          data-testid={label}
          className="max-w-fit bg-gray-200 p-1.5 mr-1.5"
          name={label}
          id={label}
          value={label === 'Duration In Bed' ? durationInBed : durationAsleep}
          onChange={handleChange}
          disabled={isDisabled}
        >
          {!durationInBed ? (
            <option value={0}>
              0 mins
            </option>
          ) : (
            Object.entries(dataObj)
              .filter((item) => {
                return Number(item[0]) <= durationInBed;
              })
              .map((item, index) => {
                return (
                  <option key={index} value={item[0]}>
                    {item[1]}
                  </option>
                );
              })
          )}

          {/* {
            Object.entries(dataObj).filter((item, index) => {
              
               
              return (
                <= stateValue 
                
                <option key={index} value={item[0]}>{item[1]}</option>
              )

            })
          } */}

          {/* <option value="0">0 mins</option>
          <option value="30">30 mins</option>
          <option value="60">1 hour</option>
          <option value="90">1.5 hours</option>
          <option value="120">2 hours</option>
          <option value="150">2.5 hours</option>
          <option value="180">3 hours</option>
          <option value="210">3.5 hours</option>
          <option value="240">4 hours</option>
          <option value="270">4.5 hours</option>
          <option value="300">5 hours</option>
          <option value="330">5.5 hours</option>
          <option value="360">6 hours</option>
          <option value="390">6.5 hours</option>
          <option value="420">7 hours</option>
          <option value="450">7.5 hours</option>
          <option value="480">8 hours</option>
          <option value="510">8.5 hours</option>
          <option value="540">9 hours</option>
          <option value="570">9.5 hours</option>
          <option value="600">10 hours</option>
          <option value="630">10.5 hours</option>
          <option value="660">11 hours</option>
          <option value="690">11.5 hours</option>
          <option value="720">12 hours</option>
          <option value="750">12.5 hours</option>
          <option value="780">13 hours</option>
          <option value="810">13.5 hours</option>
          <option value="840">14 hours</option>
          <option value="870">14.5 hours</option>
          <option value="900">15 hours</option>
          <option value="930">15.5 hours</option>
          <option value="960">16 hours</option>
          <option value="990">16.5 hours</option>
          <option value="1020">17 hours</option>
          <option value="1050">17.5 hours</option>
          <option value="1080">18 hours</option>
          <option value="1110">18.5 hours</option>
          <option value="1140">19 hours</option>
          <option value="1170">19.5 hours</option>
          <option value="1200">20 hours</option>
          <option value="1230">20.5 hours</option>
          <option value="1260">21 hours</option>
          <option value="1290">21.5 hours</option>
          <option value="1320">22 hours</option>
          <option value="1350">22.5 hours</option>
          <option value="1380">23 hours</option>
          <option value="1410">23.5 hours</option>
          <option value="1440">24 hours</option> */}
        </select>
      </div>
    </div>
  );
}
