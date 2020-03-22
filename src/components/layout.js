/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { Helmet } from 'react-helmet';

const Layout = ({ children }) => (
  <>
    <Helmet>
      <title>El almud - Datos de pequeñas y mediana empresas</title>
      <link href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700&display=swap" rel="stylesheet" />
    </Helmet>
    {children}
  </>
);

export default Layout
