import { formatDate } from "../utilities/helperFunctions";

const ListItems = ({ columns, rowIndex }) => {
  const convertToDateString = (dt) => {
    return formatDate(dt);
  };

  const handleChange = (columnValue, selectedIndex) => {
    const elem = document.getElementById(`clicable-list-item-${rowIndex}`);
    if (elem) {
      if (columnValue === "-") {
        elem.classList.add("noaction-identifier");
      } else {
        elem.classList.remove("noaction-identifier");
      }
    }
  };
  return (
    <div className="list-items-container">
      <ul className="list-items">
        {columns.map((column, index) => {
          return (
            <div key={`list-items-${index}`}>
              <li className="list-item-title" key={`title-${index}`}>
                {column.name}
              </li>
              <li onChange={handleChange(column.value)} key={`value-${index}`}>
                {column.type === "date"
                  ? convertToDateString(column.value)
                  : column.value}
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default ListItems;
