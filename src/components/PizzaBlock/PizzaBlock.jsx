/** @format */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPizzaBlock } from "../../redux/reducers/counterSlice";
import {
  setPizzas,
  setPrice,
  setSize,
  setType,
} from "../../redux/reducers/pizzaSlice";

function PizzaBlock({ id, title, prices, imageUrl, sizes, types }) {
  const [activeSize, setActiveSize] = useState(0);
  const [activeType, setActiveType] = useState(0);
  const [activePrice, setActivePrice] = useState(0);

  const typeNames = ["тонкое", "традиционное"];
  const { pizzasBlock } = useSelector((state) => state.counterSlice);
  const { pizzas } = useSelector((state) => state.pizzaSlice);
  const dispatch = useDispatch();
  // let counterPrices = 0;
  const handlerIncrement = () => {
    const counters = pizzasBlock.map((el) => {
      if (el.index === id) {
        return {
          ...el,
          counter: el.counter + 1,
        };
      } else {
        return el;
      }
    });
    let items = [];

    console.log("pizzas", pizzas);
    if (pizzas.length === 1) {
      items = counters.map((el) => {
        return {
          ...el,
          index: el.index,
          counter: el.counter,
          type: [],
          size: [],
          price: [],
        };
      });
    }
    if (pizzas.length > 1) {
      items = pizzas;
    }

    console.log("items", items);
    let newVar = items.map((el) => {
      if (el.index === id && (el.type.length >= 1 || el.size.length >= 1)) {
        return {
          ...el,
          type: [...pizzas[id].type, activeType],
          size: [...pizzas[id].size, activeSize],
          price: [...pizzas[id].price, activePrice],
        };
      } else if (el.index === id) {
        return {
          ...el,
          type: [activeType],
          size: [activeSize],
          price: [activePrice],
        };
      } else {
        return el;
      }
    });

    console.log("newVar", newVar);
    dispatch(setPizzas(newVar));

    dispatch(setPizzaBlock(counters));
  };

  // const pizz = [{ index: null, type: 0, size: 0, price: 0 }];
  // useEffect(() => {
  //   // let indexItem, sizeItem, typeItem, priceItem;
  //   let items = [];
  //   console.log(pizzas.length);
  //   console.log(pizzas);
  //   if (pizzas.length <= 1) {
  //     items = pizzasBlock.map((el) => {
  //       if (el.index === id) {
  //         return {
  //           index: id,
  //           type: activeType,
  //           size: activeSize,
  //           price: activePrice,
  //         };
  //       }
  //     });
  //   }
  //   console.log("items", items);
  //   // } else {
  //   //   items = pizzas.map((el) => {
  //   //     return {
  //   //       index: el.id,
  //   //       type: activeType,
  //   //       size: activeSize,
  //   //       price: activePrice,
  //   //     };
  //   //   });
  //   // }
  //   // console.log("items ", items);
  //   //dispatch(setPizzas(items));
  // }, [pizzasBlock]);
  // }, [activeType, activeSize, activePrice]);

  // console.log("pizzOut ", pizz);

  useEffect(() => {
    setActivePrice(prices[activeSize]);
  }, [activeSize]);

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((el) => (
              <li
                key={el}
                onClick={() => setActiveType(el)}
                className={activeType === el ? "active" : ""}
              >
                {typeNames[el]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((el, i) => (
              <li
                key={el}
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? "active" : ""}
              >
                {el} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{activePrice} ₽</div>
          <button
            onClick={handlerIncrement}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {pizzasBlock.map((el) =>
              el.index === id ? <i>{el.counter}</i> : ""
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
