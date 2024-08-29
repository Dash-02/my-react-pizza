/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import imgTrash from "../assets/img/trash.svg";
import {
  setClearCart,
  setCountCart,
  setCountCartMinus,
  setPizzaCart,
  setRemovePizza,
} from "../redux/reducers/pizzaCart";
import { setCount } from "../redux/reducers/counterSlice";
import { setPrices } from "../redux/reducers/pizzaSlice";

function Cart() {
  let [sumPrice, setSumPrice] = useState(0);
  const { pizzasBlock } = useSelector((state) => state.counterSlice);
  const { pizzas } = useSelector((state) => state.pizzaSlice);
  const { pizzasCart } = useSelector((state) => state.pizzaCartSlice);
  const [sumCount, setSumCount] = useState(0);
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(0);

  useEffect(() => {
    let sum = 0;
    const counters = pizzasBlock.map((el) => {
      sum += el.counter;
    });
    setSumCount(sum);
  }, [pizzasBlock]);

  useEffect(() => {
    if (pizzasCart.length >= 0) {
      const sumuy = pizzasCart.reduce((acc, pizza) => {
        if (pizza.price > 0) {
          return acc + pizza.price * pizza.counter;
        } else {
          return acc;
        }
      }, 0);
      setSumPrice(sumuy);
    }
  }, [pizzasCart]);

  const handleClicked = (arg) => {
    dispatch(setCountCart(arg));
    setIsClicked(isClicked + 1);
  };

  const handleClickedMinus = (arg) => {
    dispatch(setCountCartMinus(arg));
    setIsClicked(isClicked + 1);
  };

  const handleRemove = (arg) => {
    dispatch(setRemovePizza(arg));
    setIsClicked(isClicked + 1);
  };

  const handleClearAll = () => {
    dispatch(setClearCart());
    console.log(pizzasCart.length);
    if (pizzasCart.length > 0) {
      setIsClicked(isClicked + 1);
    }
  };

  useEffect(() => {
    if (isClicked > 0) {
      dispatch(setCount(pizzasCart));
    }
  }, [isClicked]);

  // useEffect(() => {
  //   const items = pizzas.map((pizza, index1) => {
  //     if (pizza.price.length > 1) {
  //       let combinedPizza = null;
  //       return {
  //         ...pizza.price.map((el, index) => {
  //           if (pizza.price.indexOf(el) === index) {
  //             combinedPizza = {
  //               ...pizza,
  //               price: pizza.price[index],
  //               counter: 1,
  //               type: pizza.type[index],
  //               size: pizza.size[index],
  //             };
  //           } else if (el === pizza.price[index]) {
  //             //пицца с 1 ценой попалась более 1го раза
  //             combinedPizza.counter += 1;
  //             return {
  //               ...pizza,
  //               counter: 0,
  //               title: "",
  //               image: "",
  //               type: 0,
  //               size: 0,
  //               price: 0,
  //             };
  //           }
  //           return combinedPizza;
  //         }),
  //       };
  //     } else if (pizza.price.length < 1) {
  //       return pizza;
  //     } else {
  //       return {
  //         ...pizza,
  //         counter: 1,
  //         title: pizza.title,
  //         type: pizza.type[0],
  //         size: pizza.size[0],
  //         price: pizza.price[0],
  //       };
  //     }
  //   });
  //   console.log("cart ", items);
  //   dispatch(setPizzaCart(items));
  // }, [pizzas]);

  useEffect(() => {
    const items = [];
    const priceCounter = {}; // Объект для хранения счетчиков по уникальным ценам

    pizzas.forEach((pizza) => {
      if (pizza.price.length > 1) {
        pizza.price.forEach((el, index) => {
          if (!priceCounter[el]) {
            priceCounter[el] = {
              ...pizza,
              price: el,
              counter: 1,
              type: pizza.type[index],
              size: pizza.size[index],
            };
            items.push(priceCounter[el]); // Добавляем уникальную цену в массив items
          } else {
            // Если цена уже существует, увеличиваем счетчик
            priceCounter[el].counter += 1;
          }
        });
      } else if (pizza.price.length < 1) {
        items.push(pizza); // Если нет цен, просто добавляем пиццу
      } else {
        items.push({
          ...pizza,
          counter: 1,
          title: pizza.title,
          type: pizza.type[0],
          size: pizza.size[0],
          price: pizza.price[0],
        });
      }
    });

    const lrt = items.map((pizza, index) => {
      return { ...pizza, index: index };
    });

    console.log("cart ", lrt);
    dispatch(setPizzaCart(lrt));
  }, [pizzas]);

  return (
    <div class="container container--cart">
      <div class="cart">
        <div class="cart__top">
          <h2 class="content__title">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                stroke="white"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                stroke="white"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                stroke="white"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            Корзина
          </h2>
          <div onClick={() => handleClearAll()} class="cart__clear">
            <img src={imgTrash} alt="" />
            <span>Очистить корзину</span>
          </div>
        </div>

        <div class="content__items">
          {pizzasCart.map((element) => {
            if (
              Object.keys(element).length > 0 &&
              element.index !== null &&
              typeof Object.keys(element) === "object" &&
              element.counter > 0
            ) {
              return (
                <div class="cart__item" key={element.index}>
                  <div class="cart__item-img">
                    <img
                      class="pizza-block__image"
                      src={element.imageUrl}
                      alt="Pizza"
                    />
                  </div>
                  <div class="cart__item-info">
                    <h3>{element.title}</h3>
                    <p>
                      {element.type}, {element.size} см.
                    </p>
                  </div>
                  <div class="cart__item-count">
                    <div
                      onClick={() => handleClickedMinus(element.index)}
                      class="button button--outline button--circle cart__item-count-minus"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                          fill="#EB5A1E"
                        ></path>
                        <path
                          d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                          fill="#EB5A1E"
                        ></path>
                      </svg>
                    </div>
                    <b>{element.counter}</b>
                    <div
                      onClick={() => handleClicked(element.index)}
                      class="button button--outline button--circle cart__item-count-plus"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                          fill="#EB5A1E"
                        ></path>
                        <path
                          d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                          fill="#EB5A1E"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div class="cart__item-price">
                    <b>{element.price} ₽</b>
                  </div>
                  <div
                    onClick={() => handleRemove(element.index)}
                    class="cart__item-remove"
                  >
                    <div class="button button--outline button--circle">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                          fill="#EB5A1E"
                        ></path>
                        <path
                          d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                          fill="#EB5A1E"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              );
            } else if (element.counter === 1) {
              return (
                <div class="cart__item" key={element.index}>
                  <div class="cart__item-img">
                    <img
                      class="pizza-block__image"
                      src={element.imageUrl}
                      alt="Pizza"
                    />
                  </div>
                  <div class="cart__item-info">
                    <h3>{element.title}</h3>
                    <p>
                      {element.type}, {element.size} см.
                    </p>
                  </div>
                  <div class="cart__item-count">
                    <div
                      onClick={() => handleClickedMinus(element.index)}
                      class="button button--outline button--circle cart__item-count-minus"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                          fill="#EB5A1E"
                        ></path>
                        <path
                          d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                          fill="#EB5A1E"
                        ></path>
                      </svg>
                    </div>
                    <b>{element.counter}</b>
                    <div
                      onClick={() => handleClicked(element.index)}
                      class="button button--outline button--circle cart__item-count-plus"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                          fill="#EB5A1E"
                        ></path>
                        <path
                          d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                          fill="#EB5A1E"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div class="cart__item-price">
                    <b>{element.price} ₽</b>
                  </div>
                  <div
                    onClick={() => handleRemove(element.index)}
                    class="cart__item-remove"
                  >
                    <div class="button button--outline button--circle">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                          fill="#EB5A1E"
                        ></path>
                        <path
                          d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                          fill="#EB5A1E"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              );
            } else {
              return <></>;
            }
          })}
        </div>
        <div class="cart__bottom">
          <div class="cart__bottom-details">
            <span>
              {" "}
              Всего пицц: <b>{sumCount} шт.</b>{" "}
            </span>
            <span>
              {" "}
              Сумма заказа: <b>{sumPrice} ₽</b>{" "}
            </span>
          </div>
          <div class="cart__bottom-buttons">
            <a href="/" class="button button--outline button--add go-back-btn">
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 13L1 6.93015L6.86175 1"
                  stroke="#D3D3D3"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>

              <span>Вернуться назад</span>
            </a>
            <div class="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
