import React from 'react';

function Categories() {
  const [activeCategory, setActiveCategory] = React.useState(0);

  const onClickCategory = (param) => {
    setActiveCategory(param);
  }

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  
    return (
      <div className="categories">
            <ul>
                 {
                  categories.map((value, i) => (
                    <li key={value} onClick={() => onClickCategory(i)} className={activeCategory === i ? 'active' : ''}>
                      {value}
                    </li>
                  ))
                 }
            </ul>
      </div>
    )
  }

  export default Categories;