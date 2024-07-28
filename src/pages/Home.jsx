import React from 'react';

import Sort from '../components/Sort.jsx';
import Categories from '../components/Categories.jsx';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock.jsx';
import SkeletonLoad from '../components/PizzaBlock/Skeleton.jsx';

function Home() {

  let [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    
    fetch('https://65d118f5ab7beba3d5e4176b.mockapi.io/items')
      .then((res) => {
      return res.json();
    })
    .then((arr) => {
      setItems(arr)
      setLoading(false);
    })
  }, []);

    return (
        <>
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {
                loading ? [...new Array(6)].map((_, id) => <SkeletonLoad key={id}/>)
                : items.map((element) => <PizzaBlock key={element.id} {...element}/>)
              }
          </div>
        </>
    )
}

export default Home;