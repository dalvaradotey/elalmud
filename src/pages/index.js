import React, { Fragment } from "react";
import { Helmet } from 'react-helmet';

import SEO from '../components/seo';
import Categories from "../components/categories";
import Suscribe from "../components/suscribe";

const Logo = () => (
  <Fragment>
    <Helmet>
      <link href="https://fonts.googleapis.com/css?family=Carter+One|Rock+Salt&display=swap" rel="stylesheet" />
    </Helmet>
    <div className="mb4">
      <h1 className="tc white f-headline lh-solid mb1" style={{ fontFamily: 'Carter One' }}>El almud</h1>
      <p className="tc white f4">Encuentra datos de pequeñas y medianas empresas de Santiago para abastecer tu hogar en esta cuarentena.</p>
    </div>
  </Fragment>
);

const IndexPage = () => (
  <Fragment>
    <div style={{ bakgroundImage: 'url("/images/feria")' }}>
      <SEO title="El almud" keywords={[]} />
      <Logo />
      <Categories />
      <Suscribe />
    </div>
  </Fragment>
)

export default IndexPage;
