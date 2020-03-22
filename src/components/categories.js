import React, { Component } from 'react'; 
import Select from 'react-select';
import { StaticQuery, graphql } from 'gatsby';

import Suppliers from './suppliers';

const setSelectorValues = list => list.map(item =>
  ({ value: item.node.id, label: item.node.name }),
);

const Categories = ({ children }) => (
  <StaticQuery
    query={graphql`
      query CategoriesQuery {
        allCategoriesJson {
          edges {
            node {
              id
              name
              backgroundColor
              color
            }
          }
        }
      }
    `}
    render={data => (
      <div>
        {children(data)}
      </div>
    )}
  />
);

const colourStyles = {
  control: styles => ({
    ...styles, 
    backgroundColor: '#0064c3',
    color: 'white',
    border: '2px solid white',
    height: '50px'
  }),
  placeholder: styles => ({ ...styles, color: 'white' }),
};

class CategoriesSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryIds: [],
      categories: []
    };
  }

  onChange = (value) => {
    if (value !== null) {
      const categoriesIds = value.map(i => i.value);

      this.setState({
        categoryIds: categoriesIds,
        categories: value,
      });
    } else {
      this.setState({
        categoryIds: [],
        categories: [],
      });     
    }
  }

  render = () => (
    <div>
      <Categories>
        {(data) => (
          <div>
            <h3 className="f3 white tc mb4">¿Qué buscas?</h3>
            <div className="ph2 ph2-ns mw7-ns center ph5-ns">
              <div className="w-100">
                <div className="" style={{ width: '100%' }}>
                  <Select
                    isMulti
                    placeholder="Selecciona una categoría"
                    options={setSelectorValues(data.allCategoriesJson.edges)}
                    onChange={this.onChange}
                    styles={colourStyles}
                    value={this.state.categories}
                    className="basic-multi-select"
                  />
                </div>
              </div>
            </div>
            <Suppliers categories={data.allCategoriesJson.edges} categoryIds={this.state.categoryIds}/>
          </div>
        )}
      </Categories>
    </div>
  );
}

export default CategoriesSelector;