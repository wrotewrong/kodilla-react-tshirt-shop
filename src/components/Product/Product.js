import styles from './Product.module.scss';
import clsx from 'clsx';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Product = ({ id, name, title, basePrice, colors, sizes }) => {
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentSize, setCurrentSize] = useState(sizes[0].name);

  console.log(`${name} ${currentColor} shirt`);

  const prepareColorClassName = (color) => {
    return styles[
      'color' + color[0].toUpperCase() + color.substr(1).toLowerCase()
    ];
  };

  const getPrice = (basePrice, additionalPrice) => {
    return basePrice + additionalPrice;
  };

  return (
    <article className={styles.product}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          alt={`${name} ${currentColor} shirt`}
          src={`${process.env.PUBLIC_URL}/images/products/shirt-${name}--${currentColor}.jpg`}
        />
      </div>
      <div>
        <header>
          <h2 className={styles.name}>{title}</h2>
          <span className={styles.price}>
            Price:
            {getPrice(
              basePrice,
              sizes.find((item) => item.name === currentSize).additionalPrice
            )}
            $
          </span>
        </header>
        <form>
          <div className={styles.sizes}>
            <h3 className={styles.optionLabel}>Sizes</h3>
            <ul className={styles.choices}>
              {sizes.map((size) => {
                return (
                  <li key={size.name}>
                    <button
                      type='button'
                      className={clsx(
                        size.name === currentSize && styles.active
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentSize(size.name);
                      }}
                    >
                      {size.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.colors}>
            <h3 className={styles.optionLabel}>Colors</h3>
            <ul className={styles.choices}>
              {colors.map((color) => {
                return (
                  <li key={color}>
                    <button
                      className={clsx(
                        prepareColorClassName(color),
                        color === currentColor && styles.active
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentColor(color);
                      }}
                    ></button>
                  </li>
                );
              })}
            </ul>
          </div>
          <Button className={styles.button}>
            <span className='fa fa-shopping-cart' />
          </Button>
        </form>
      </div>
    </article>
  );
};

Product.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  basePrice: PropTypes.number.isRequired,
  colors: PropTypes.array.isRequired,
  sizes: PropTypes.array.isRequired,
};

export default Product;
