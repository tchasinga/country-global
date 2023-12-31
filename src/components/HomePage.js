import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uuid4 from 'uuid4';
import { NavLink } from 'react-router-dom';
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import styles from '../styles/HomePage.module.css';
import { fetchCountries } from '../redux/Home/homeSlice';
import Searching from './Searching';

const HomePage = () => {
  const { home } = useSelector((store) => store.home);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };
  return (
    <>
      <div className={styles.home}>
        <h1>County in the world</h1>
        <h2>Take a visit around the world</h2>
        <input
          type="search"
          name="search"
          value={text}
          onChange={handleSearch}
          placeholder="search by country name"
        />
      </div>
      <div className={styles.container}>
        {text.length <= 0 ? (
          home.map((item) => (
            <div key={uuid4()}>
              <NavLink
                to="details"
                state={{ country: item }}
                className={styles.link}
              >
                <FaRegArrowAltCircleRight />
                {' '}
                <span>{item.flag}</span>
                <p>
                  <br />
                  <br />
                  {item.name.common}
                  {' '}
                  <br />
                  {item.population}
                  {' '}
                  people
                </p>
              </NavLink>
            </div>
          ))
        ) : (
          <Searching myArray={home} text={text} />
        )}
      </div>
    </>
  );
};

export default HomePage;
