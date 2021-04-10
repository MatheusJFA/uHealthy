import React, { useState } from 'react';

export default function Footer() {
  const [ano, setAno] = useState(new Date().getFullYear());
  return (
    <footer>
      Todos os direitos reservados &copy; uHealthy - {ano}
    </footer>
  )
}