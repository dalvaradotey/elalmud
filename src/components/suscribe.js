import React from 'react';
import { Link } from 'gatsby';

const Suscribe = () => (
  <div className="mt5 tc pv5" style={{ backgroundColor: '#025bb1' }}>
    <h2 className="f-headline lh-solid f2 white mb3">¿Eres un proveedor o conoces alguno?</h2>
    <p className="f4 white mb3">Si no está en la lista, ayúdanos completando el formulario de registro.</p>
    <Link
      to="/suscribe/"
      state={{
        modal: true
      }}
    >
      <button className="btn grow br-pill bn pv3 ph4">
        Registrar aquí
      </button>
    </Link>
  </div>
);

export default Suscribe;