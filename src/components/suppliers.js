import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from "./image";

import FacebookIcon from '../../assets/facebook.svg';
import InstagramIcon from '../../assets/instagram.svg';
import WebsiteIcon from '../../assets/website.svg';
import WhatsappIcon from '../../assets/whatsapp.svg';

const checkIfFindCategory = ({ supplierCategories, selectedCategories }) => {
  for (const supplierCategory of supplierCategories) {
    const findIndex = selectedCategories.findIndex(i => parseInt(i) === parseInt(supplierCategory));

    if (findIndex !== -1) {
      return true;
    }
  }

  return false;
}

const SuppliersContainer = (props) => {
  const data = useStaticQuery(
    graphql`
      query { 
        allSuppliersJson {
          edges {
            node {
              id
              categories
              name
              email
              website
              phone
              facebook
              whatsapp
              instagram
            }
          }
        }
      }`
  );

  const suppliers = data.allSuppliersJson.edges.filter(
    i => checkIfFindCategory({ supplierCategories: i.node.categories, selectedCategories: props.categoryIds})
  );

  return (
    <div className="ma4">
      {suppliers.map((item, key) => <SupplierCard key={key} allCategories={props.categories} {...item} />)}
    </div>
  );
}

const SocialMedias = (props) => (
  <div className="flex mv2">
    {(props.node.website !== null && props.node.website) && (
      <a href={props.node.website} target="_blank" rel="noopener noreferrer" className="mh1" style={{ width: '25px' }}>
        <WebsiteIcon />
      </a>
    )}
    {(props.node.facebook !== null && props.node.facebook !== '') && (
      <a href={props.node.facebook} target="_blank" rel="noopener noreferrer" className="mh1" style={{ width: '25px' }}>
        <FacebookIcon />
      </a>
    )}
    {(props.node.instagram !== null && props.node.instagram !== '') && (
      <a href={props.node.instagram} target="_blank" rel="noopener noreferrer" className="mh1" style={{ width: '25px' }}>
        <InstagramIcon />
      </a>
    )}
    {(props.node.whatsapp !== null && props.node.whatsapp !== '') && (
      <a href={props.node.whatsapp} target="_blank" rel="noopener noreferrer" className="mh1" style={{ width: '25px' }}>
        <WhatsappIcon />
      </a>
    )}
  </div>
);

const setCategoryBox = ({ allCategories, item }) => {
  const category = allCategories.find(i => parseInt(i.node.id) === parseInt(item));

  if (category) {
    return (
      <div
        className="f7 br2 pa1 mr1"
        style={{
          backgroundColor: category.node.backgroundColor,
          color: category.node.color
        }}
      >
        {category.node.name}
      </div>
    );
  }

  return '';
}

const Categories = (props) => (
  <div className="flex mb2">
    {props.node.categories.map(item => setCategoryBox({ allCategories: props.allCategories, item }))}
  </div>
);

const SupplierCard = (props) => (
  <div className="fl w-20-l w-50-m w-100 pa2 ma3-ns mh0 bg-white br3">
    <Image filename="no-image.png" />
    <h2 className="b f4 mv2">{props.node.name}</h2>
    <Categories {...props} />
    <ul>
      <li>{props.node.email}</li>
      <li>{props.node.phone}</li>
      <li>{props.node.website}</li>
    </ul>
    <SocialMedias {...props} />
  </div>
);

export default SuppliersContainer;