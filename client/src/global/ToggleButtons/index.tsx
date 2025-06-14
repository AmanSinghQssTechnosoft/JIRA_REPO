
import './togglebuttons.scss';

interface ToggleProps {
  active: 'yearly' | 'weekly';
  setActive: (value: 'yearly' | 'weekly') => void;
}
const ToggleButtons = ({active,setActive}:ToggleProps) => {

  return (
    <div className="toggle-buttons">
      <button
        className={active === 'yearly' ? 'active' : ''}
        onClick={() => setActive('yearly')}
      >
        Yearly
      </button>
      <button
        className={active === 'weekly' ? 'active' : ''}
        onClick={() => setActive('weekly')}
      >
        Weekly
      </button>
    </div>
  );
};

export default ToggleButtons;
