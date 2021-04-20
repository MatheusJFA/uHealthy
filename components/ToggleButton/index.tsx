import React, { useState } from "react";

export default function ToggleButton({ value = false, setValue }) {
  function toggle() {
    setValue(!value);
    console.log(value);
  }

  return (
    <div className="flex items-center justify-center">
      <label htmlFor="toggle" className="flex items-center cursor-pointer">
        <div className="relative">
          <input id="toggle" type="checkbox" className="sr-only" onClick={() => toggle()} />
          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div className="dot absolute w-6 h-6 bg-gray-200 rounded-full shadow -left-1 -top-1 transition"></div>
        </div>
        <div className="ml-3 text-gray-700 font-medium">Obrigatória</div>
      </label>
    </div>
  );
}