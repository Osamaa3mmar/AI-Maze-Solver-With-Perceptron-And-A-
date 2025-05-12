import React from 'react';
import styles from './style.module.css';
import { Link } from 'react-router-dom';

const MazeSolverLanding = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.header}>Maze Solver AI</h1>
        <Link to={"/main"}>
        <button className={styles.button}>Start</button>
        </Link>
      </div>
    </div>
  );
};

export default MazeSolverLanding;