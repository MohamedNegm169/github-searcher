import React, { useEffect, useState } from "react";
import HomeServices from "../../services/pagesServices/homeService";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "../../store/filters/actions";
import { setList } from "../../store/List/actions";
import Logo from "../../assets/logo.png";
import "./index.scss";
// add it in constants
const options = [
  { value: "issues", label: "issues" },
  { value: "repositories", label: "respository" },
  { value: "users", label: "users" },
];

const Home = () => {
  const searchList = useSelector((state) => state.list.searchList);
  const selectedFilter = useSelector((state) => state.filters.filter);
  const dispatch = useDispatch();
  const [searchType, setSearchType] = useState(selectedFilter.category);
  const [searchText, setSearchText] = useState(selectedFilter.searchKey);
  const [searchParams, setSearchParams] = useState(null);

  const homeService = new HomeServices();

  useEffect(() => {
    if (searchText.length >= 3 && searchType) {
      const deponce = setTimeout(() => {
        setSearchParams((params) => ({
          ...params,
          q: searchText,
        }));
        dispatch(setFilters({ category: searchType, searchKey: searchText }));
      }, 1000);

      return () => clearTimeout(deponce);
    }
    dispatch(setFilters({ category: searchType, searchKey: searchText }));
  }, [searchText, searchType]);

  useEffect(() => {
    if (searchParams) {
      homeService.getData(searchType.value, searchParams).then((res) => {
        dispatch(setList(res.data.items));
      });
    }
  }, [searchParams]);

  return (
    <form>
      <div className="home-Page">
        <div className="header_intro">
          <div className="header-img">
            <img src={Logo} alt="github logo" />
          </div>
          <div>
            <p className="title">github searcher</p>
            <p className="sub-title">search users or repository blow</p>
          </div>
        </div>
        <div className="header-container">
          <div className="search-input">
            <input
              value={searchText}
              placeholder="Start typing to search .."
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
          </div>
          <div className="select-input">
            <Select
              onChange={(data) => {
                setSearchText("");
                setSearchType(data);
                dispatch(setList([]));
              }}
              value={searchType}
              options={options}
            />
          </div>
        </div>
        <div className="list-container">
          {searchList?.length > 0 &&
            searchList?.map((item, index) => {
              return <div key={index} className="card"></div>;
            })}
        </div>
      </div>
    </form>
  );
};
export default Home;
