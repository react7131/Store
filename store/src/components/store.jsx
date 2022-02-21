import React, { useEffect, useState } from "react";
import Product from "./product";
import svg from '../images/404.svg';
import api from "../api";
import { filterItems } from "../services";

const Store = () => {
    const [products, setProducts] =  useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brnds, setBrnds] = useState([]);
    const [cats, setCats] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {  
        (async () => {
            const response = await api.get(`products?title_like=${search}`)
            setProducts(response.data);
            setFilteredProducts(response.data);
            const brandResponse = await api.get("brands")
            setBrands(brandResponse.data);
            const categoryResponse = await api.get("categories")
            setCategories(categoryResponse.data);
        })();
    }, [search])


    useEffect (() => {
        productToShow()
    },[brnds, cats])

    const updateBrandIsChecked = (e) => {
        if(brnds.includes(e.target.value)){
            setBrnds(filterItems(brnds, e.target.value))
        }else {
            setBrnds([...brnds, e.target.value])
        }
    }

    const updateCategoryIsChecked = (e) => {
        if(cats.includes(e.target.value)){
            setCats(filterItems(cats, e.target.value))
        }else {
            setCats([...cats, e.target.value])
        }
    }

    const renderedProducts = filteredProducts.map( product => <Product key={product.id} product={product}/>)
    const renderedBrands = brands.map( brand => (
        <li key={brand.id} className="list-group-item ">
            <input 
                type="checkbox" 
                className="form-check-input" 
                value= {brand.id}
                checked= {brnds.includes(brand.id.toString())}
                id={`${brand.id}`}
                onChange={updateBrandIsChecked}
            />
            <label 
                htmlFor={`${brand.id}`}
                className="form-check-label ms-3"
            >
                {brand.brandName}
            </label>
        </li>
    ))

    const renderedCategories =  categories.map( category => (
        <li key={category.id} className="list-group-item">
            
            <input 
                type="checkbox" 
                className="form-check-input" 
                value= {category.id}
                checked = {cats.includes(category.id.toString())}
                id={`category${category.id}`}
                onChange={updateCategoryIsChecked}
            />
            <label 
                htmlFor={`category${category.id}`}
                className="form-check-label ms-2"
            >
                {category.categoryName}
            </label>
        </li>
    ))

    const productToShow = () => { 
        const filteredProduct = products.filter( product => {
            if(brnds.length === 0 && cats.length === 0) { return product }
            if(brnds.length> 0 && cats.length > 0) {
                return brnds.includes(product.brandId.toString()) && cats.includes(product.categoryId.toString())
            }
        return (
            brnds.includes(product.brandId.toString()) | cats.includes(product.categoryId.toString())
        )   
        })
        setFilteredProducts(filteredProduct)
    }
     

    
    return (
        <>
            <div className="row p-3 col-12 ">
                <div className="col-md-9 mx-auto">
                    <input 
                        type="search" 
                        placeholder="search product" 
                        className="form-control b-0"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="row g-4 py-3">
                <div className="col-md-4">
                    <div className="rounded-3 bg-white p-4">
                        <div className="py-3">
                            <h5>Brands</h5>
                            <ul className="list-group list-group-flush">
                                {renderedBrands}
                            </ul>
                        </div>
                        <div className="py-3">
                            <h5>Categories</h5>
                            <ul className="list-group list-group-flush">
                                {renderedCategories}
                            </ul>
                        </div>
                    </div>
                    
                </div>
                <div className="col-md-8">
                    <div className="row g-2">
                        {renderedProducts.length ? renderedProducts : <div className="d-flex flex-column justify-content-center align-items-center">
                            <img src={svg} alt="" />
                            <h5>No Results</h5>
                            <p>use more general terms</p>
                        </div>}
                    </div>
                     
                </div>
            </div>
        </>   
    )
}

export default Store;