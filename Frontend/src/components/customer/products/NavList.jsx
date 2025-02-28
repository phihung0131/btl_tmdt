const NavItem = ({ title, isActive, onClick }) => {
  return (
    <li className={` ${isActive ? "border border-[#FF3D00]" : ""} px-3 py-3`}>
      <button
        onClick={onClick}
        className={`block w-full text-base font-bold transition-colors duration-200 ${
          isActive ? "text-[#FF3D00]" : "text-black hover:text-[#FF3D00]"
        }`}
      >
        {title}
      </button>
    </li>
  );
};

const NavList = ({ items, activeItem }) => {
  return (
    <ul className="scrollbar-hide flex items-center justify-center overflow-x-auto whitespace-nowrap px-4">
      {items.map((item, index) => (
        <NavItem
          key={index}
          title={item.title}
          isActive={activeItem === item.title}
          onClick={item.onClick}
        />
      ))}
    </ul>
  );
};

export default NavList;
