import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import s from "./Navbar.module.css";
import { BsChevronDown } from "react-icons/bs";
import { getCategories } from "../../store/actions/categoryActions";
// import { getFavorites } from "../../store/actions/favoriteActions";
import Dropdown from "./Dropdown";

const Navbar = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  // const favorites = useSelector((state) => state.favorite.favorites);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
    // dispatch(getFavorites());
  }, [dispatch]);

  const handleMouseEnter = () => {
    setShowCategories(true);
  };

  const handleMouseLeave = () => {
    setShowCategories(false);
  }

  return (
    <div className={s.container}>
      {/* <div className={s.link} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        Categorías <BsChevronDown className={s.icon} />
        {showCategories && <Dropdown categories={categories} />}
      </div> */}
      {/* <Link to="/tienda" className={s.link}>Tienda</Link> */}
      <Link to="/tienda" className={s.link}>Tienda</Link>
      <Link to="/packs" className={s.link}>Packs</Link>
      <Link to="/fabricantes" className={s.link}>Fabricantes</Link>
      <Link to="/preguntas-frecuentes" className={s.link}>Ayuda</Link>
    </div>
  )
};


export default Navbar;