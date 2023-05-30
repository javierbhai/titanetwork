import React from 'react';
import './styles.css'

const Filter = ({ tags, onChange }) => (
    <>
        <h4>Filter by tags</h4>
        <select onChange={onChange}>
            <option value=''>All</option>
            {tags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
        </select>
    </>
);

export default Filter;
