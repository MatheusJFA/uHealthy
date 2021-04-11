import React, { useState } from 'react';

export default function Footer() {
  const [ano] = useState(new Date().getFullYear());
  return (
    <footer className="bg-red-500 flex justify-center">
      <p className="text-gray-50 p-2"> Todos os direitos reservados &copy; uHealthy - {ano} </p>
    </footer>
  )
}