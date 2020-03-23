require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Abastece tu hogar con estos datos`,
    description: `Datos de pequeñas y medianas empresas para que puedas abastecer tu hogar.`,
    author: `@dalvaradotey`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#0082FF`,
        theme_color: `#0082FF`,
        display: `minimal-ui`,
        icon: `src/images/elalmud.png`, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/
        },
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    `gatsby-plugin-modal-routing`,
  ],
}
